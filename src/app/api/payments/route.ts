import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// GET /api/payments - Get payments for employer
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'EMPLOYER') {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const employerProfile = await prisma.employerProfile.findUnique({
      where: { userId: session.user.id },
    });

    if (!employerProfile) {
      return NextResponse.json({ success: false, error: 'Employer profile not found' }, { status: 404 });
    }

    const payments = await prisma.payment.findMany({
      where: { employerProfileId: employerProfile.id },
      include: {
        candidate: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    // Calculate totals
    const totalPending = payments
      .filter(p => p.status === 'PENDING')
      .reduce((sum, p) => sum + p.total, 0);
    const totalPaid = payments
      .filter(p => p.status === 'COMPLETED')
      .reduce((sum, p) => sum + p.total, 0);

    return NextResponse.json({
      success: true,
      data: {
        payments,
        stats: {
          totalPending,
          totalPaid,
          totalPayments: payments.length,
        },
      },
    });
  } catch (error) {
    console.error('Error fetching payments:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch payments' }, { status: 500 });
  }
}

// POST /api/payments - Create payment (trigger on hire)
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'EMPLOYER') {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { applicationId, candidateProfileId, amount } = body;

    const employerProfile = await prisma.employerProfile.findUnique({
      where: { userId: session.user.id },
    });

    if (!employerProfile) {
      return NextResponse.json({ success: false, error: 'Employer profile not found' }, { status: 404 });
    }

    // Calculate 12% fee
    const fee = Math.round(amount * 0.12);
    const total = amount + fee;

    const payment = await prisma.payment.create({
      data: {
        employerProfileId: employerProfile.id,
        type: 'HIRE_FEE',
        amount,
        fee,
        total,
        candidateProfileId,
        applicationId,
        status: 'PENDING',
      },
    });

    return NextResponse.json({ success: true, data: payment });
  } catch (error) {
    console.error('Error creating payment:', error);
    return NextResponse.json({ success: false, error: 'Failed to create payment' }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// GET /api/applications - Get all applications for employer's jobs
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

    const applications = await prisma.application.findMany({
      where: {
        job: {
          employerProfileId: employerProfile.id,
        },
      },
      include: {
        candidateProfile: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            phone: true,
            location: true,
            yearsOfExperience: true,
            extractedSkills: true,
            cvUrl: true,
          },
        },
        job: {
          select: {
            id: true,
            title: true,
          },
        },
      },
      orderBy: { appliedAt: 'desc' },
    });

    return NextResponse.json({ success: true, data: applications });
  } catch (error) {
    console.error('Error fetching applications:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch applications' }, { status: 500 });
  }
}

// PATCH /api/applications - Update application status
export async function PATCH(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'EMPLOYER') {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { applicationId, status, interviewDate, interviewNotes } = body;

    if (!applicationId || !status) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }

    // Verify the employer owns the job
    const application = await prisma.application.findUnique({
      where: { id: applicationId },
      include: {
        job: {
          include: {
            employerProfile: true,
          },
        },
      },
    });

    if (!application) {
      return NextResponse.json({ success: false, error: 'Application not found' }, { status: 404 });
    }

    const employerProfile = await prisma.employerProfile.findUnique({
      where: { userId: session.user.id },
    });

    if (application.job.employerProfileId !== employerProfile?.id) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 403 });
    }

    // Update the application
    const updated = await prisma.application.update({
      where: { id: applicationId },
      data: {
        status,
        ...(interviewDate && { interviewDate: new Date(interviewDate) }),
        ...(interviewNotes && { interviewNotes }),
      },
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error('Error updating application:', error);
    return NextResponse.json({ success: false, error: 'Failed to update application' }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, role, firstName, lastName, companyName, industry, nationality, contactPerson, contactPhone } = body;

    // Validate required fields
    if (!email || !password || !role) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { success: false, error: 'Email already registered' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user based on role
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role,
        ...(role === 'CANDIDATE' && {
          candidateProfile: {
            create: {
              firstName,
              lastName,
              nationality,
              email,
              profileCompletion: 10,
            },
          },
        }),
        ...(role === 'EMPLOYER' && {
          employerProfile: {
            create: {
              companyName,
              industry,
              contactPerson,
              contactPhone,
              contactEmail: email,
            },
          },
        }),
      },
      include: {
        candidateProfile: true,
        employerProfile: true,
      },
    });

    return NextResponse.json({
      success: true,
      data: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      message: 'Registration successful',
    });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

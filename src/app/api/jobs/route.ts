import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// GET /api/jobs - List all active jobs
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const location = searchParams.get('location');
    const industry = searchParams.get('industry');
    const workType = searchParams.get('workType');
    const search = searchParams.get('search');

    const where: any = {
      status: 'ACTIVE',
    };

    if (location) {
      where.location = { contains: location, mode: 'insensitive' };
    }

    if (industry) {
      where.employerProfile = {
        industry: { contains: industry, mode: 'insensitive' },
      };
    }

    if (workType) {
      where.workType = workType;
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { requirements: { contains: search, mode: 'insensitive' } },
      ];
    }

    const jobs = await prisma.job.findMany({
      where,
      include: {
        employerProfile: {
          select: {
            companyName: true,
            companyLogoUrl: true,
            industry: true,
          },
        },
        _count: {
          select: { applications: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ success: true, data: jobs });
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch jobs' }, { status: 500 });
  }
}

// POST /api/jobs - Create a new job
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'EMPLOYER') {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { title, department, description, requirements, location, workType, experienceMin, experienceMax, salaryMin, salaryMax, parsedSkills } = body;

    const employerProfile = await prisma.employerProfile.findUnique({
      where: { userId: session.user.id },
    });

    if (!employerProfile) {
      return NextResponse.json({ success: false, error: 'Employer profile not found' }, { status: 404 });
    }

    const job = await prisma.job.create({
      data: {
        employerProfileId: employerProfile.id,
        title,
        department,
        description,
        requirements,
        location,
        workType: workType || 'ON_SITE',
        experienceMin,
        experienceMax,
        salaryMin,
        salaryMax,
        parsedSkills: parsedSkills || [],
        status: 'ACTIVE',
      },
    });

    return NextResponse.json({ success: true, data: job });
  } catch (error) {
    console.error('Error creating job:', error);
    return NextResponse.json({ success: false, error: 'Failed to create job' }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// GET /api/candidates - List candidates for CV pool
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'EMPLOYER') {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get('search');
    const location = searchParams.get('location');
    const experience = searchParams.get('experience');
    const skills = searchParams.get('skills');
    const minSalary = searchParams.get('minSalary');
    const maxSalary = searchParams.get('maxSalary');

    const where: any = {
      status: { not: 'DRAFT' },
    };

    if (search) {
      where.OR = [
        { firstName: { contains: search, mode: 'insensitive' } },
        { lastName: { contains: search, mode: 'insensitive' } },
        { extractedSkills: { hasSome: [search] } },
      ];
    }

    if (location) {
      where.location = { contains: location, mode: 'insensitive' };
    }

    if (experience) {
      const [min, max] = experience.split('-').map(Number);
      if (experience.includes('+')) {
        where.yearsOfExperience = { gte: min };
      } else {
        where.yearsOfExperience = { gte: min, lte: max };
      }
    }

    if (minSalary) {
      where.expectedSalary = { gte: parseInt(minSalary) };
    }

    if (maxSalary) {
      where.expectedSalary = { ...where.expectedSalary, lte: parseInt(maxSalary) };
    }

    const candidates = await prisma.candidateProfile.findMany({
      where,
      select: {
        id: true,
        firstName: true,
        lastName: true,
        photoUrl: true,
        location: true,
        nationality: true,
        yearsOfExperience: true,
        expectedSalary: true,
        extractedSkills: true,
        education: true,
        profileCompletion: true,
        phone: true,
      },
      orderBy: { profileCompletion: 'desc' },
      take: 50,
    });

    // Check which candidates are already unlocked by this employer
    const employerProfile = await prisma.employerProfile.findUnique({
      where: { userId: session.user.id },
      include: {
        unlocks: {
          where: {
            expiresAt: { gt: new Date() },
          },
          select: {
            candidateProfileId: true,
          },
        },
      },
    });

    const unlockedIds = new Set(employerProfile?.unlocks.map(u => u.candidateProfileId) || []);

    const candidatesWithMask = candidates.map(c => ({
      ...c,
      isUnlocked: unlockedIds.has(c.id),
      email: unlockedIds.has(c.id) ? undefined : '••••••••@••••.•••',
      phone: unlockedIds.has(c.id) ? c.phone : '•••• ••• ••••',
    }));

    return NextResponse.json({ success: true, data: candidatesWithMask });
  } catch (error) {
    console.error('Error fetching candidates:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch candidates' }, { status: 500 });
  }
}

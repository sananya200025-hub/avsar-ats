import 'next-auth';

declare module 'next-auth' {
  interface User {
    id: string;
    role: string;
  }

  interface Session {
    user: {
      id: string;
      email: string;
      name?: string | null;
      image?: string | null;
      role: string;
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    role: string;
  }
}

// Role types
export type UserRole = 'CANDIDATE' | 'EMPLOYER' | 'ADMIN';

// Status types
export type CandidateStatus =
  | 'DRAFT'
  | 'PROFILE_COMPLETE'
  | 'APPLICATION_SUBMITTED'
  | 'SCREENING'
  | 'INTERVIEW'
  | 'OFFER'
  | 'HIRED'
  | 'REJECTED'
  | 'WITHDRAWN';

export type ApplicationStatus =
  | 'APPLIED'
  | 'SCREENING'
  | 'INTERVIEW'
  | 'OFFER'
  | 'HIRED'
  | 'REJECTED'
  | 'WITHDRAWN';

export type JobStatus =
  | 'DRAFT'
  | 'ACTIVE'
  | 'PAUSED'
  | 'CLOSED'
  | 'ARCHIVED';

export type OfferStatus =
  | 'DRAFT'
  | 'SENT'
  | 'VIEWED'
  | 'SIGNED'
  | 'ACCEPTED'
  | 'DECLINED'
  | 'EXPIRED';

export type PaymentStatus =
  | 'PENDING'
  | 'PROCESSING'
  | 'COMPLETED'
  | 'FAILED'
  | 'REFUNDED';

export type VisaStatus =
  | 'VISITOR'
  | 'EMPLOYMENT_VISA'
  | 'RESIDENT_VISA'
  | 'GOLDEN_VISA'
  | 'SPONSORED'
  | 'CANCELLED';

// Form types
export interface RegisterCandidateInput {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  nationality: string;
}

export interface RegisterEmployerInput {
  email: string;
  password: string;
  companyName: string;
  industry: string;
  contactPerson: string;
  contactPhone: string;
}

// API Response types
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Dashboard stats
export interface DashboardStats {
  activeJobs: number;
  totalApplications: number;
  interviewsScheduled: number;
  hiresThisMonth: number;
  pendingPayments: number;
  complianceAlerts: number;
}

export type LeadStatus = 'new' | 'contacted' | 'in_progress' | 'completed' | 'cancelled';

export interface LeadSubmission {
  id?: string;
  fullName: string;
  email?: string;
  whatsapp: string;
  fiverrProfileUrl?: string;
  fiverrGigUrl?: string;
  niche: string;
  improvementGoal?: string;
  activeGigsCount?: string;
  currentOrdersStatus?: string;
  interestedServices?: string[];
  paymentMethod?: string;
  paymentScreenshot?: string;
  transactionId?: string;
  isPaymentVerified?: boolean;
  verificationNote?: string;
  status?: LeadStatus;
  notes?: string;
  price?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  clientName: string;
  handle: string;
  category: string;
  badgeLevel: string;
  rating: number;
  reviewCount: number;
  ratePerHour?: string;
  tagline: string;
  skills: string[];
  description: string;
  country: string;
  languages: string[];
  highlight: string;
  type: 'profile' | 'gig' | 'seo' | 'thumbnail' | 'before_after' | 'analytics';
  isOnline?: boolean;
  statusTime?: string;
  extraSkillsCount?: number;
  hasConsultation?: boolean;
  avatarColor?: string;
  levelBadgeText?: string;
  dashboardStats?: {
    impressions: string;
    impressionsGrowth: string;
    clicks: string;
    clicksGrowth: string;
    ordersCompleted: string;
    orderCompletionRate: string;
    onTimeDelivery: string;
    responseRate: string;
    responseTime: string;
    topRankingRank: string;
    topKeywords: string[];
    activeOrdersCount: number;
    activeOrdersList: Array<{
      orderId: string;
      gigTitle: string;
      price: string;
      dueIn: string;
      buyerCountry: string;
      status: string;
    }>;
    gigsList: Array<{
      gigTitle: string;
      impressions: string;
      clicks: string;
      orders: string;
      conversionRate: string;
    }>;
    caseStudy: {
      challenge: string;
      solution: string;
      outcomes: string[];
    };
  };
}

export interface CompanyPartner {
  id: string;
  name: string;
  subtext: string;
  type: string;
  color: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

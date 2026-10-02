export interface Deliverable {
  id: string;
  number: string;
  title: string;
  points?: string[];
  lessons: string[];
}

export type Module = Deliverable;

export interface ReviewItem {
  id: string;
  img: string;
  title: string;
  note: string;
  tag: string;
}

export interface TestimonialStudent {
  n: string;
  c: string;
  r: string;
  q: string;
  money: string;
}

export interface OutcomeItem {
  emoji: string;
  title: string;
  range: string;
  desc: string;
}

export interface IncomeCard {
  title: string;
  range: string;
  desc: string;
}

export interface RoadmapStep {
  day: string;
  num: string;
  title: string;
  desc: string;
}

export interface PersonaItem {
  tag: string;
  title: string;
  desc: string;
}

export interface FaqItem {
  id: string;
  q: string;
  a: string;
  category: 'ranking' | 'editing' | 'safety' | 'new_seller' | 'conversion' | 'payment';
  categoryLabel: string;
  tags: string[];
  popular?: boolean;
}

export const TECHPULSE_CONFIG = {
  courseName: "Smart SEO Solutions — Fiverr Profile & Gig Optimization",
  badge: "🇵🇰 Pakistan's Proven Fiverr Agency — Get Your 1st Client Fast",
  heroTitle: "Get Your 1st Client With Full Fiverr Optimization",
  heroSubtitle: "Complete Done-For-You Profile & Gig Optimization: Convert dead profiles and zero-click gigs into active dollar orders. 5 low-competition buyer tags, high-converting descriptions, 3-tier decoy pricing, and high-CTR thumbnail strategy.",
  videoUrl: "https://www.youtube.com/embed/zlNDZqFWb0A?rel=0&modestbranding=1&playsinline=1&enablejsapi=1",
  pricePKR: 8000,
  originalPricePKR: 16000,
  discountPercentage: "50% OFF",
  slotsTotal: 100,
  slotsFilled: 94,
  slotsLeft: 6,
  spotsRemainingBadge: "⚡ Limited Time: Only 6 Client Slots Remaining This Week",
  whatsappNumber: "+92 306 0880466",
  whatsappEnrollNumber: "+92 306 0880466",
  bankDetails: {
    bankName: "Meezan Bank",
    accountTitle: "Zeenat yasmin",
    accountNumber: "PK20MEZN0000300114121316",
    iban: "PK20MEZN0000300114121316",
    feeAmount: 8000,
    instructions: "Transfer Rs. 8,000 via Meezan Bank, Easypaisa, JazzCash, SadaPay, NayaPay, or any Pakistani banking app."
  }
};

export const DELIVERABLES: Deliverable[] = [
  {
    id: "mod-01",
    number: "Service 01",
    title: "Deep Fiverr Profile & Bio Optimization",
    lessons: [
      "Professional Profile Photo & Authority Bio Copywriting",
      "Tagline & Description Framing: Positioning from Task Worker to Authority Consultant",
      "Strategic Hourly Consultation Rate (PKR 5,000–7,000+/hr) to Attract Premium High-End Buyers"
    ]
  },
  {
    id: "mod-02",
    number: "Service 02",
    title: "High-Intent Buyer Keyword Research",
    lessons: [
      "Filtering Low Competition + High Purchasing Intent Search Tags",
      "Competitor Intelligence: Extracting Hidden Keywords from Top-Ranking US/UK Gigs",
      "Eliminating Negative Keywords & Generic Buzzwords That Drain Impressions"
    ]
  },
  {
    id: "mod-03",
    number: "Service 03",
    title: "SEO-Friendly Gig Title & Permanent URL Setup",
    lessons: [
      "Locking Primary High-Volume Keywords into Permanent Gig URL Permalinks",
      "Clean, Keyword-Rich Titles Engineered for Search Algorithms and Human Clicks",
      "Search Snippet Optimization to Maximize Organic Search CTR"
    ]
  },
  {
    id: "mod-04",
    number: "Service 04",
    title: "5 Secret Search Tags & Keyword Placement",
    lessons: [
      "Exact Alignment of 5 Primary Search Tags Without Algorithmic Stuffing",
      "Natural Keyword Infiltration in the First 3 Lines of Gig Descriptions",
      "Tagging Compliant with Fiverr Algorithm 2026 Quality Score Guidelines"
    ]
  },
  {
    id: "mod-05",
    number: "Service 05",
    title: "High-Converting Gig Description (AIDA Copywriting)",
    lessons: [
      "Attention-Grabbing Hook: Directly Addressing Buyer Pain Points in Line 1",
      "Clear Project Scope, Bulleted Deliverables, and Value-Add Bonus Inclusions",
      "Psychological Call-To-Action Triggering Immediate Inquiries and Orders"
    ]
  },
  {
    id: "mod-06",
    number: "Service 06",
    title: "3-Tier Decoy Pricing & Package Strategy",
    lessons: [
      "Strategic Basic ($25–$50), Standard ($150–$250) & Premium ($400–$600+) Package Framing",
      "Decoy Pricing Psychology: Guiding Inbound Buyers to Highest-Margin Tiers",
      "Gig Extras, Commercial Rights, and Fast-Track Delivery Add-on Configuration"
    ]
  },
  {
    id: "mod-07",
    number: "Service 07",
    title: "FAQ Optimization with Embedded Search Terms",
    lessons: [
      "Preemptively Resolving Top 6 Buyer Objections (Revisions, Timelines, Source Files)",
      "Naturally Embedding LSI Keywords in FAQ Answers to Double Search Visibility",
      "Crystal-Clear Pre-Order Requirements to Eliminate Misunderstandings and Cancellations"
    ]
  },
  {
    id: "mod-08",
    number: "Service 08",
    title: "CTR Exploding Thumbnail Strategy & Visual Hierarchy",
    lessons: [
      "High-Contrast Thumbnail Visual Architecture for Mobile App & Desktop Viewports",
      "Authentic Proof Badges, Before/After Showcases, and High-Readability Typography",
      "Embedding PDF Portfolio Documents to Expand Gig Gallery Engagement"
    ]
  },
  {
    id: "mod-09",
    number: "Service 09",
    title: "Algorithmic Momentum & First 3 Orders Push",
    lessons: [
      "Initial Algorithmic Kickstart Protocols Post Gig Launch or Update",
      "Maintaining Inbox Response Cadence and Rapid Conversion Velocity",
      "5-Star Private Review Strategy & Success Score Account Safety Protocols"
    ]
  },
  {
    id: "mod-10",
    number: "Service 10",
    title: "Monthly Retainer Conversion & Dollar Payouts",
    lessons: [
      "Converting One-Time Project Buyers into $500–$2,000 Recurring Monthly Retainers",
      "Fulfilling Fast-Track Eligibility Criteria for Level 1 and Level 2 Seller Badges",
      "Direct Zero-Hassle USD Withdrawals from Payoneer to Pakistani Local Banks (Meezan/Easypaisa)"
    ]
  }
];

export const MODULES = DELIVERABLES;

export const BONUS_DELIVERABLE = {
  badge: "🎁 Included With Package",
  title: "Live AnyDesk Screen-Share Setup & Profile Audit",
  desc: "100% Transparent: We can connect live on AnyDesk or TeamViewer to implement every keyword, SEO description, tag, and package directly in front of your eyes.",
  originalValue: "Rs. 4,000",
  currentPrice: "FREE WITH RS. 8,000 PACKAGE"
};

export const BONUS_MODULE = BONUS_DELIVERABLE;

export const REVIEWS: ReviewItem[] = [
  {
    id: "rev-48",
    img: "/techpulse-assets/fiverr-earnings-proof.svg",
    title: "From Zero Impressions to 42,800 Impressions & Level 2 Seller!",
    note: "Hamza Saeed (@saqibshahid08) — WordPress & Laravel Developer: My Fiverr gig was completely dormant with zero search clicks. I booked the done-for-you optimization service from Smart SEO Solutions — within 30 days, impressions surged by +340% and direct $350 and $600 international orders lined up in queue!",
    tag: "Level 2 Seller"
  },
  {
    id: "rev-47",
    img: "/techpulse-assets/fiverr-ranking-proof.svg",
    title: "Page 1 #4 Rank — Recurring International Retainers!",
    note: "Sikandar Usman (@sikandarusman1) — Cinematic Video Editor: In a crowded video editing niche, my gig ranked on Page 1, Spot #4. Search clicks grew by +210%, and I secured recurring monthly clients from the US and Canada!",
    tag: "Page 1 Rank"
  },
  {
    id: "rev-46",
    img: "/techpulse-assets/fiverr-first-order.svg",
    title: "First Order from International Customer — $250 Order!",
    note: "Bushra Bano — UI/UX Designer: Just 5 days after having my profile & gig optimized, I won my first client from the UK for $250 — the Rs. 8,000 optimization fee was completely recovered from that very first order!",
    tag: "First Dollar Order"
  },
  {
    id: "rev-45",
    img: "/techpulse-assets/fiverr-seo-tags-proof.svg",
    title: "Outstanding Fiverr Optimization Service & 5 Buyer Tags",
    note: "Babar Zafar — Full Stack Dev: In-depth keyword research and the exact alignment of 5 buyer search tags brought my dormant gig back into active search results. The Smart SEO Solutions team delivered exceptional work!",
    tag: "Fiverr SEO"
  },
  {
    id: "rev-44",
    img: "/techpulse-assets/fiverr-clicks-surge.svg",
    title: "Clicks Grew by +265% in 2 Weeks",
    note: "Allah Bachaya — Voiceover Artist: My gigs used to get 2-3 clicks per day. Following optimization, I receive 40+ genuine buyer clicks daily and continuous inbox inquiries from potential clients.",
    tag: "Traffic Surge"
  },
  {
    id: "rev-43",
    img: "/techpulse-assets/fiverr-buyer-chat.svg",
    title: "Professional Fiverr Positioning & $350 US Client Inbox",
    note: "Jaffer Hussain — Content Specialist: There are many false claims online, but here they work on real 2026 Fiverr algorithm rules and buyer psychology. A US buyer reached out directly with a $350 project offer!",
    tag: "High-Ticket Client"
  },
  {
    id: "rev-42",
    img: "/techpulse-assets/fiverr-anydesk-audit.svg",
    title: "Detailed 10-Point Gig Audit & Live AnyDesk Setup",
    note: "Muhammad Bilal — MERN Developer: A detailed audit was delivered for every gig tag, title, and description. During the live AnyDesk session, the specialist applied every change right in front of my eyes.",
    tag: "AnyDesk Setup"
  },
  {
    id: "rev-25",
    img: "/techpulse-assets/fiverr-custom-offer-180.svg",
    title: "First $180 Custom Offer Closed With US Client",
    note: "Zainab Ali — Graphic Designer: After the profile overhaul, a US client approached me directly in inbox and accepted my $180 custom offer without any price negotiations.",
    tag: "First Dollar Order"
  },
  {
    id: "rev-26",
    img: "/techpulse-assets/fiverr-keyword-blueprint.svg",
    title: "Clear Optimization Deliverables & Keyword Sheet",
    note: "Saad Javed — SEO Content: A clear spreadsheet of low-competition keywords and buyer tags was provided. Once applied, search impressions climbed immediately and I closed a $320 client.",
    tag: "Optimization Blueprint"
  },
  {
    id: "rev-27",
    img: "/techpulse-assets/fiverr-search-top3.svg",
    title: "Gig Ranked in Top 3 Search Results",
    note: "Asad Ullah — Shopify Dev: For my targeted low-competition search phrase, my gig started appearing in Page 1 top 3 results — 100% white-hat algorithmic results!",
    tag: "Top 3 Rank"
  },
  {
    id: "rev-28",
    img: "/techpulse-assets/fiverr-queue-orders.svg",
    title: "Consistent Orders In Queue Every Week ($720 Active)",
    note: "Farhan Ali — Shopify Specialist: Since the optimization went live, inquiries and orders come in weekly — I now maintain 4 active client orders in progress at all times!",
    tag: "Consistency"
  },
  {
    id: "rev-29",
    img: "/techpulse-assets/fiverr-pricing-strategy.svg",
    title: "Direct WhatsApp Client Support & 3-Tier Decoy Pricing",
    note: "Moiz Ahmed — WordPress Dev: The SEO team structured my 3-tier decoy pricing so buyers bypass the Basic $35 package and order the $220 Premium package directly.",
    tag: "Pricing Strategy"
  },
  {
    id: "rev-30",
    img: "/techpulse-assets/fiverr-green-arrows.svg",
    title: "Clicks & Impressions Surged Within 48 Hours",
    note: "Haris Riaz — Logo Designer: Within 48 hours of publishing updates, Fiverr analytics showed green upward trend indicators with a +380% impressions spike.",
    tag: "Fast Ranking"
  },
  {
    id: "rev-31",
    img: "/techpulse-assets/fiverr-roi-cleared.svg",
    title: "Best Rs. 8,000 Investment — $850 Cleared & Withdrawn",
    note: "Usman Khan — Video Editor: For just Rs. 8,000, I received such a comprehensive profile overhaul and keyword blueprint that in my first month I withdrew $850 directly to my bank.",
    tag: "Best Value"
  },
  {
    id: "rev-32",
    img: "/techpulse-assets/fiverr-consultation-call.svg",
    title: "Hourly Consultation Optimized to PKR 7,290/hr ($35/hr)",
    note: "Tariq Abbas — Tech Consultant: After optimizing my profile bio and consultation pricing, US clients started booking 60-minute video sessions which converted into major retainers.",
    tag: "High Ticket"
  },
  {
    id: "rev-33",
    img: "/techpulse-assets/fiverr-whitehat-health.svg",
    title: "100% Genuine & TOS-Safe Algorithmic Optimization",
    note: "Mudassar Ali — Fiverr Seller: No fake reviews or black-hat hacks are used. My account health is 100% protected and fully compliant with Fiverr Terms of Service.",
    tag: "Safe & Verified"
  },
  {
    id: "rev-34",
    img: "/techpulse-assets/fiverr-competitor-edge.svg",
    title: "Competitor Research Angle — $380 Package Won",
    note: "Nabeel Khan — App UI/UX: By finding gaps in top US competitor listings, we built a description so compelling that a buyer skipped competitors to buy our $380 Premium package.",
    tag: "High Conversion"
  },
  {
    id: "rev-35",
    img: "/techpulse-assets/fiverr-permalink-slug.svg",
    title: "Tag Density and Search URL Permalink Setup ($450 Deal)",
    note: "Kamran Ashraf — Laravel Dev: Locking the primary search keyword into the URL permalink really works — a German buyer found me via search and awarded a $450 project.",
    tag: "Fiverr SEO"
  },
  {
    id: "rev-36",
    img: "/techpulse-assets/fiverr-first-client-won.svg",
    title: "From 0 Orders to 1st Client Won ($280 Order)",
    note: "Waqas Khan — Mobile Dev: My gig had been dormant for 3 months. Just 7 days after the Smart SEO Solutions optimization, I won my 1st client for $280 with a 5-star review!",
    tag: "First Dollar Order"
  }
];

export const TESTIMONIALS_18: TestimonialStudent[] = [
  { n: "Hamza Saeed", c: "Karachi", r: "Full Stack Developer", q: "My gig was dead. After optimization, within 30 days impressions climbed +340% and I received active orders of $350 and $600.", money: "$1.15K" },
  { n: "Sikandar Usman", c: "Lahore", r: "Video Editor", q: "Achieved Page 1, Spot #4. Secured recurring monthly video editing retainers from clients in Canada and the USA.", money: "$850" },
  { n: "Bilal Ahmed", c: "Islamabad", r: "WordPress Developer", q: "Positioned my hourly consultation at PKR 7,200/hr. US buyers now reach out directly asking for custom offers.", money: "$1.4K" },
  { n: "Fatima Sheikh", c: "Lahore", r: "Graphic Designer", q: "Upgraded thumbnail visual contrast and closed 2 direct client orders within my first 10 days!", money: "Rs. 32K" },
  { n: "Hassan Ali", c: "Faisalabad", r: "New Freelancer", q: "Started from zero impressions. With low-competition search tags, delivered my first order in week one.", money: "Rs. 45K" },
  { n: "Maria Tariq", c: "Multan", r: "Content Writer", q: "Signed a monthly retainer client paying $600 each month on a recurring basis. Outstanding service!", money: "$600/mo" },
  { n: "Usman Javed", c: "Rawalpindi", r: "SEO Specialist", q: "Technical gig audit and keyword placement are 100% white-hat and algorithm-safe. Highly recommended!", money: "Rs. 58K" },
  { n: "Zainab Iqbal", c: "Lahore", r: "Social Media Manager", q: "With the 3-tier pricing strategy, clients skip the $50 basic tier and choose my $250 Premium package directly.", money: "$750" },
  { n: "Sana Khan", c: "Karachi", r: "Voiceover Artist", q: "Correcting search tags immediately propelled my gig rankings onto the first page of search results.", money: "Rs. 28K" },
  { n: "Talha Mehmood", c: "Peshawar", r: "Shopify Expert", q: "The competitor research strategy revealed high-volume tags where direct competition was minimal.", money: "$900" },
  { n: "Rabia Aslam", c: "Sialkot", r: "Virtual Assistant", q: "WhatsApp support is extremely responsive. My profile bio draft was reviewed and finalized promptly.", money: "Rs. 24K" },
  { n: "Imran Qureshi", c: "Karachi", r: "Dollar Earner", q: "Became a Level 2 Seller on Fiverr. Daily impressions now comfortably exceed 2,000+ views.", money: "$2.2K/mo" },
  { n: "Hira Yousuf", c: "Lahore", r: "Student Freelancer", q: "Working 1-2 hours in the evening and earning reliable income in dollars. Very grateful!", money: "Rs. 38K" },
  { n: "Saad Anwar", c: "Karachi", r: "Web Designer", q: "Instead of searching for work, high-value international client orders now come straight into my queue.", money: "$1.6K" },
  { n: "Nimra Hassan", c: "Islamabad", r: "UI/UX Designer", q: "Re-designed thumbnail typography and clicks doubled the very next day.", money: "Rs. 72K" },
  { n: "Hamza Tariq", c: "Lahore", r: "Beginner", q: "Clear deliverables and transparent AnyDesk screen-sharing made the entire setup effortless.", money: "Rs. 21K" },
  { n: "Aisha Noor", c: "Karachi", r: "Virtual Assistant", q: "Payoneer to Pakistani local bank withdrawal guidance was completely seamless. USD deposits straight to bank.", money: "$850" },
  { n: "Faisal Mehboob", c: "Multan", r: "Digital Marketer", q: "The most authentic, practical, and effective Fiverr ranking system in Pakistan.", money: "Level 2" }
];

export const OUTCOMES: OutcomeItem[] = [
  { emoji: "🚀", title: "Fiverr Page 1 Ranking", range: "Top 5 Rank", desc: "Rank your core service gigs in the top search rows of your niche." },
  { emoji: "📈", title: "+300% Organic Impressions", range: "15K–50K+", desc: "Dramatically increase keyword visibility without paying for Fiverr promoted ads." },
  { emoji: "🎯", title: "High-CTR Gig Thumbnails", range: "5%–9% CTR", desc: "Thumbnails engineered to capture buyer clicks over competitor search results." },
  { emoji: "💰", title: "High-Ticket Package Upgrades", range: "$150–$600+", desc: "Shift from $5 cheap orders to high-value $200–$500 comprehensive client orders." },
  { emoji: "⭐", title: "Level 1 & Level 2 Fast-Track", range: "Level 2 Seller", desc: "Systematic review score and on-time delivery mechanics to unlock badges fast." },
  { emoji: "🤝", title: "Monthly Client Retainers", range: "$500–$2,000", desc: "Turn one-time gig buyers into recurring monthly retainer clients." },
  { emoji: "💵", title: "Direct Dollar Payouts", range: "$500–$3,000+", desc: "Effortlessly withdraw USD earnings directly into Pakistani bank accounts via Payoneer." },
  { emoji: "🛡️", title: "Zero Algorithmic Penalties", range: "100% Safe", desc: "Strictly adhere to Fiverr Terms of Service with ethical white-hat SEO tactics." }
];

export const INCOME_CARDS: IncomeCard[] = [
  {
    title: "Custom Fiverr Gig Order",
    range: "$150 – $400",
    desc: "Single client order for web development, video editing, design, SEO or writing services."
  },
  {
    title: "High-Ticket Service Package",
    range: "$400 – $900",
    desc: "Premium 3-tier gig packages bought directly by verified US, UK and European clients."
  },
  {
    title: "Monthly Freelance Retainer",
    range: "$800 – $2,500",
    desc: "Recurring monthly client management, content delivery, or technical support contract."
  },
  {
    title: "Level 2 Agency Scaling",
    range: "$2,000 – $5,000+",
    desc: "Manage multiple ranked gigs in parallel, hiring local teammates while earning in dollars."
  }
];

export const ROADMAP_STEPS: RoadmapStep[] = [
  {
    day: "Day 1–3",
    num: "01",
    title: "Audit & Niche Keywords",
    desc: "We audit your current profile and extract 5 low-competition, high-intent buyer search tags."
  },
  {
    day: "Day 4–7",
    num: "02",
    title: "Full Gig Revamp",
    desc: "We re-write titles, inject keywords into description top lines, and build psychological 3-tier pricing."
  },
  {
    day: "Day 8–10",
    num: "03",
    title: "High-CTR Visuals",
    desc: "Deploy bold contrast thumbnails, portfolio proof slides, and test mobile readability."
  },
  {
    day: "Day 11–14",
    num: "04",
    title: "Orders & Ranking Push",
    desc: "Trigger algorithmic momentum, close your first international buyer, and push onto Page 1."
  }
];

export const PERSONAS: PersonaItem[] = [
  {
    tag: "New Freelancer",
    title: "Starting From Scratch",
    desc: "Get your profile and gigs professionally optimized from day one without wasting months on trial & error."
  },
  {
    tag: "Stuck Gigs (0 Orders)",
    title: "Revive Dead Accounts",
    desc: "If your gigs have zero impressions and no buyer messages, our keyword SEO breaks the algorithm deadlock."
  },
  {
    tag: "Pakistani Student",
    title: "Earn Side Income in Dollars",
    desc: "Spend 1-2 hours per evening. Build an online freelance income stream from your laptop."
  },
  {
    tag: "Level 1 / Level 2",
    title: "Scale to $2,000+/Month",
    desc: "Upgrade from low-ticket $10 gigs to $300+ enterprise client packages and monthly retainers."
  },
  {
    tag: "Skilled Professional",
    title: "Coders, Editors & Designers",
    desc: "You have the technical skill; we give you the marketing, SEO, and positioning to attract paying clients."
  },
  {
    tag: "Agency Builder",
    title: "Build a Freelance Team",
    desc: "Create an inbound order pipeline that generates more work than one person can handle."
  }
];

export const FAQS: FaqItem[] = [
  {
    id: "faq-01",
    q: "My Fiverr gig has 0 impressions or seems frozen — can optimization revive it?",
    a: "Yes, 100%! The Fiverr search algorithm deprioritizes gigs with outdated generic tags, low keyword relevance, or mismatched category metadata. During optimization, we re-index your gig using low-to-medium competition buyer search terms and algorithmic tags. Once your metadata matches active buyer search intent, the algorithm pushes your gig into fresh search streams to capture real impressions.",
    category: "ranking",
    categoryLabel: "Gig Ranking & Impressions",
    tags: ["impressions", "zero impressions", "dead gig", "revive", "freeze", "views"],
    popular: true
  },
  {
    id: "faq-02",
    q: "If I edit my existing gig, will Fiverr de-rank it or remove it from search?",
    a: "This is the single biggest myth and fear among freelancers! If your gig is already receiving zero orders, leaving it untouched only wastes valuable time. When we update your title, description, and tags according to official Fiverr algorithm rules, the system enters a temporary 24–48 hour re-indexing mode. As soon as the crawler verifies the new relevant keywords, your gig appears in higher, more relevant search positions. We never alter your permanent URL permalink, ensuring your account authority stays completely protected.",
    category: "editing",
    categoryLabel: "Editing Fears & De-ranking",
    tags: ["edit", "derank", "de-ranking", "safe", "existing gig", "lost ranking"],
    popular: true
  },
  {
    id: "faq-03",
    q: "How long does it take after optimization to rank on Fiverr Page 1?",
    a: "Fiverr search crawlers process changes within 24 to 72 hours. In micro-niches and long-tail buyer queries, optimized gigs often secure Page 1 visibility within 24–48 hours. In broader categories, impressions steadily climb over 3 to 7 days, with sustainable organic buyer messages arriving in 7 to 14 days. This is why we provide a structured 20–25 days evaluation window with a money-back guarantee.",
    category: "ranking",
    categoryLabel: "Gig Ranking & Impressions",
    tags: ["time", "timeline", "page 1", "how long", "24 hours", "ranking", "index"],
    popular: true
  },
  {
    id: "faq-04",
    q: "Is this optimization 100% compliant with Fiverr Terms of Service (TOS)?",
    a: "Absolutely! We strictly use 100% White-Hat Fiverr SEO and ethical copywriting. We do not use fake reviews, bots, automated proxies, or artificial clicks that violate Fiverr TOS. Every optimization is built on natural search engine compliance, buyer conversion psychology, and official Fiverr seller guidelines.",
    category: "safety",
    categoryLabel: "Fiverr TOS & Account Safety",
    tags: ["tos", "safety", "warning", "ban", "safe", "white-hat", "policy", "terms"],
    popular: true
  },
  {
    id: "faq-05",
    q: "I am a brand new seller with 0 reviews — will international buyers still order?",
    a: "Definitely! Top-rated sellers dominate broad keywords (such as 'Logo Designer' or 'WordPress Developer') where there are 50,000+ competing gigs. Our strategy is 'Micro-Niche Penetration' — we target high-intent search queries where competition is only 200–700 gigs, but US/UK buyers search daily. Combined with psychological 3-tier pricing and a compelling portfolio, buyers trust and order without hesitation.",
    category: "new_seller",
    categoryLabel: "New Sellers & 0 Reviews",
    tags: ["new seller", "zero reviews", "first order", "beginner", "no reviews", "fresh account"],
    popular: true
  },
  {
    id: "faq-06",
    q: "What is specifically delivered in the profile and gig optimization package?",
    a: "Our done-for-you service delivers a complete 360-degree overhaul: (1) Niche-specific buyer keyword research (2) High-CTR SEO title and permalink setup (3) 5 Strategic high-volume search tags (4) 1,200-character persuasive description with ideal keyword density (5) Psychological 3-tier package pricing (Basic, Standard, Premium) (6) Objection-handling FAQs with embedded keywords (7) High-contrast thumbnail visual guide (8) Complete profile bio, authority tagline, and skills revamp.",
    category: "conversion",
    categoryLabel: "Conversions & Inquiries",
    tags: ["scope", "deliverables", "services", "what included", "tags", "title", "description", "packages"],
    popular: false
  },
  {
    id: "faq-07",
    q: "I receive impressions and clicks but no inquiries or orders — where is the problem?",
    a: "This is a classic conversion rate (CVR) problem. Having impressions and clicks means your thumbnail and title are working, but once a buyer arrives on the gig page, weak copywriting, unclear deliverables, confusing pricing, or buyer hesitation causes them to bounce. Optimization tightens the copy hooks and transforms your packages into clear, compelling value propositions that trigger action.",
    category: "conversion",
    categoryLabel: "Conversions & Inquiries",
    tags: ["clicks but no orders", "conversion", "no messages", "inquiries", "bounce rate", "cvr"],
    popular: true
  },
  {
    id: "faq-08",
    q: "How do you rank in competitive niches like Graphic Design, Video Editing, or Web Development?",
    a: "New or Level 1 sellers struggle to rank for broad keywords (like 'Video Editor'). We utilize a 'Long-Tail Keyword Stacking' technique — for example, 'Real Estate Drone Video Editing' or 'SaaS Explainer Video Editing'. This attracts targeted, high-budget international buyers and achieves top-row placement within 24–48 hours.",
    category: "ranking",
    categoryLabel: "Gig Ranking & Impressions",
    tags: ["high competition", "graphic design", "video editing", "web development", "long-tail", "niche"],
    popular: false
  },
  {
    id: "faq-09",
    q: "What role do gig thumbnails and image metadata play in Fiverr ranking?",
    a: "A huge role! The Fiverr algorithm places immense weight on Click-Through Rate (CTR). If your gig appears in search results but the thumbnail is dull and buyers skip past it, the algorithm demotes your gig to lower pages. We provide high-contrast guidelines, 3-second readability hierarchies, and image SEO metadata recommendations that can triple your CTR.",
    category: "conversion",
    categoryLabel: "Conversions & Inquiries",
    tags: ["thumbnail", "ctr", "image seo", "visuals", "clicks", "design", "photo"],
    popular: false
  },
  {
    id: "faq-10",
    q: "How is account access handled for optimization? Can it be done via AnyDesk?",
    a: "Your security and privacy are 100% guaranteed. You can either provide direct credentials for a hands-free experience, or connect with our team on a live AnyDesk or TeamViewer screen-share session where every change is applied directly in front of your eyes. The choice is completely yours!",
    category: "safety",
    categoryLabel: "Fiverr TOS & Account Safety",
    tags: ["anydesk", "teamviewer", "login", "account access", "security", "privacy", "credentials"],
    popular: true
  },
  {
    id: "faq-11",
    q: "How does gig optimization support Fiverr's Success Score system?",
    a: "Fiverr's Success Score depends heavily on private buyer reviews, effective communication, and low cancellation rates. By making deliverables 100% transparent and setting realistic pricing tiers in the description, client expectations align perfectly. This minimizes order disputes and boosts private 5-star feedback, stabilizing your gig in search algorithms long-term.",
    category: "safety",
    categoryLabel: "Fiverr TOS & Account Safety",
    tags: ["success score", "algorithm 2026", "cancellation", "private reviews", "fiverr update", "metric"],
    popular: false
  },
  {
    id: "faq-12",
    q: "How do I withdraw dollar earnings to Pakistan and how do I pay the service fee?",
    a: "Our service fee (Rs. 8,000 package) can be paid in 1-click via Meezan Bank, Easypaisa, JazzCash, SadaPay, NayaPay, or any Pakistani commercial bank via IBFT/Raast. Once you earn on Fiverr, your USD earnings can be transferred via Payoneer directly into Meezan Bank, JazzCash, or any Pakistani bank account at live interbank rates.",
    category: "payment",
    categoryLabel: "Payments, AnyDesk & Guarantee",
    tags: ["easypaisa", "jazzcash", "meezan bank", "payment", "payoneer", "withdrawal", "pkr", "dollars"],
    popular: false
  },
  {
    id: "faq-13",
    q: "What if my gig doesn't rank or improve after optimization — is there a refund?",
    a: "Yes, 100% Money-Back Guarantee! If you implement our optimized blueprint and do not experience positive organic search impression growth or buyer inquiries within the 20–25 day indexation window, simply message us on WhatsApp for an immediate 100% refund. Zero hassle, zero questions asked.",
    category: "payment",
    categoryLabel: "Payments, AnyDesk & Guarantee",
    tags: ["refund", "money back guarantee", "risk free", "guarantee", "whatsapp support", "policy"],
    popular: true
  },
  {
    id: "faq-14",
    q: "Should I edit my Fiverr gig using the mobile app or a desktop browser?",
    a: "Always use a desktop or laptop browser! The Fiverr mobile app restricts key advanced fields such as search tags, FAQ sections, portfolio attachments, and pricing metadata. Editing from a desktop browser ensures all algorithmic fields are thoroughly filled for maximum search visibility.",
    category: "editing",
    categoryLabel: "Editing Fears & De-ranking",
    tags: ["mobile app", "laptop", "desktop", "edit gig", "browser", "mobile vs desktop"],
    popular: false
  }
];

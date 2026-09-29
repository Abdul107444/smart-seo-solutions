export interface Module {
  id: string;
  number: string;
  title: string;
  lessons: string[];
}

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
  badge: "🇵🇰 Pakistan's #1 Fiverr Profile & Gig Optimization Service",
  heroTitle: "Turn Your Fiverr Profile & Gigs Into A High-Converting Sales Machine",
  heroSubtitle: "Complete Done-For-You Optimization: Low-competition buyer keywords, SEO titles & permalinks, 5 ranking tags, high-converting descriptions, 3-tier pricing, and high-CTR thumbnail strategy to rank on Page 1.",
  videoUrl: "https://www.youtube.com/embed/zlNDZqFWb0A?rel=0&modestbranding=1&playsinline=1&enablejsapi=1",
  pricePKR: 8000,
  originalPricePKR: 16000,
  discountPercentage: "50% OFF",
  slotsTotal: 100,
  slotsFilled: 84,
  slotsLeft: 16,
  whatsappNumber: "+92 306 0880466",
  whatsappEnrollNumber: "+92 306 0880466",
  bankDetails: {
    bankName: "Meezan Bank",
    accountTitle: "Zeenat yasmin",
    accountNumber: "PK20MEZN0000300114121316",
    iban: "PK20MEZN0000300114121316",
    feeAmount: 8000,
    instructions: "Transfer Rs. 8,000 via Meezan Bank, Easypaisa, JazzCash, SadaPay, NayaPay ya kisi bhi Pakistani banking app."
  }
};

export const MODULES: Module[] = [
  {
    id: "mod-01",
    number: "Service 01",
    title: "Deep Fiverr Profile & Bio Optimization",
    lessons: [
      "Professional Profile Picture & Authority Bio Copywriting",
      "Tagline & Description Framing: Task Doer Se Expert Consultant Positioning",
      "Hourly Consultation Rate Setting (PKR 5,000–7,000+/hr) Jo High-End Buyers Attract Karta Hai"
    ]
  },
  {
    id: "mod-02",
    number: "Service 02",
    title: "High-Intent Buyer Keyword Research",
    lessons: [
      "Low Competition + High Purchasing Intent Wale Tags Filter Out Karna",
      "Competitor Analysis: Top-Ranking US/UK Gigs Ke Hidden Search Terms Extract Karna",
      "Negative Keywords & Generic Buzzwords Ko Remove Karna Jo Impressions Zaya Karte Hain"
    ]
  },
  {
    id: "mod-03",
    number: "Service 03",
    title: "SEO-Friendly Gig Title & Permanent URL Setup",
    lessons: [
      "Permanent Gig URL Permalinks Mein Primary Ranking Keyword Lock Karna",
      "Clean, Keyword-Loaded Title Jo Algorithm Catch Kare Aur Human Buyer Click Kare",
      "Search Snippet Optimization Jo Organic Search CTR Barhata Hai"
    ]
  },
  {
    id: "mod-04",
    number: "Service 04",
    title: "5 Secret Search Tags & Keyword Placement",
    lessons: [
      "5 Primary Search Tags Ki Exact Alignment Without Algorithmic Stuffing",
      "Natural Keyword Distribution: Description Ki Top 3 Lines Mein Keyword Infiltration",
      "Fiverr Algorithm 2026 Quality Score Rules Ke Mutabiq Tagging"
    ]
  },
  {
    id: "mod-05",
    number: "Service 05",
    title: "High-Converting Gig Description (AIDA Copywriting)",
    lessons: [
      "Attention Grabbing Hook: Buyer Ki Problem Ko First Line Mein Target Karna",
      "Clear Scope, Bullet Deliverables, Aur Free Add-on Bonuses List Karna",
      "Psychological Call-To-Action Jo Direct 'Contact Seller' Ya 'Order Now' Trigger Kare"
    ]
  },
  {
    id: "mod-06",
    number: "Service 06",
    title: "3-Tier Decoy Pricing & Package Strategy",
    lessons: [
      "Basic ($25–$50), Standard ($150–$250) Aur Premium ($400–$600+) Package Framing",
      "Decoy Pricing Psychology: Buyers Ko Highest Margin Package Par Shift Karna",
      "Gig Extras, Commercial Rights, Aur Fast Delivery Add-on Options Setup"
    ]
  },
  {
    id: "mod-07",
    number: "Service 07",
    title: "FAQ Optimization with Embedded Search Terms",
    lessons: [
      "Top 6 Buyer Objections (Revisions, Timelines, Files) Ko Resolve Karna",
      "FAQs Ke Answers Mein LSI Keywords Naturally Embed Karna Jo Search Visibility Double Kare",
      "Pre-order Requirements Ko Crystal Clear Banana Taake Dispute Ka Chance 0 Ho"
    ]
  },
  {
    id: "mod-08",
    number: "Service 08",
    title: "CTR Exploding Thumbnail Strategy & Visual Hierarchy",
    lessons: [
      "Fiverr Mobile App & Desktop Viewports Ke Mutabiq High-Contrast Thumbnail Design Guide",
      "Real Proof Badges, Before/After Showcase, Aur Legible Bold Typography",
      "PDF Portfolio Documents Embed Karna Jo Gig Gallery Ko Expand Karta Hai"
    ]
  },
  {
    id: "mod-09",
    number: "Service 09",
    title: "Algorithmic Momentum & First 3 Orders Push",
    lessons: [
      "Gig Publish/Update Hone Ke Baad Initial Algorithmic Kickstart",
      "Inbox Response Cadence Aur Conversion Velocity Maintain Rakhna",
      "5-Star Private Reviews & Success Score Safety Protocols"
    ]
  },
  {
    id: "mod-10",
    number: "Service 10",
    title: "Monthly Retainer Conversion & Dollar Payouts",
    lessons: [
      "One-Time Project Buyer Ko $500–$2,000 Monthly Retainer Client Banana",
      "Level 1 Aur Level 2 Badges Ka Fast-Track Criteria Fulfill Karna",
      "Payoneer to Pakistani Local Banks (Meezan/Easypaisa) Zero-Hassle Direct Withdrawal"
    ]
  }
];

export const BONUS_MODULE = {
  badge: "🎁 Included With Package",
  title: "Live AnyDesk Screen-Share Setup & Profile Audit",
  desc: "100% Transparent: We can connect live on AnyDesk or TeamViewer to implement every keyword, SEO description, tag, and package directly in front of your eyes.",
  originalValue: "Rs. 4,000",
  currentPrice: "FREE WITH RS. 8,000 PACKAGE"
};

export const REVIEWS: ReviewItem[] = [
  {
    id: "rev-48",
    img: "/techpulse-assets/review-48.png",
    title: "Zero Impressions Se 42,800 Impressions & Level 2 Seller!",
    note: "Hamza Saeed (@saqibshahid08) — WordPress & Laravel Developer: Pehle Fiverr par gig dead pari thi, clicks nahi aate the. Smart SEO Solutions se profile aur gig optimize karwayi — 30 dino me +340% impressions surge hua aur $350, $600 ke direct international orders queue me aa gaye!",
    tag: "Level 2 Seller"
  },
  {
    id: "rev-47",
    img: "/techpulse-assets/review-47.png",
    title: "Page 1 #4 Rank — Repeated International Client Alhamdulillah!",
    note: "Sikandar Usman (@sikandarusman1) — Cinematic Video Editor: Crowded video editing niche me gig Page 1 #4 par rank hui. Clicks +210% barh gaye aur USA/Canada ke recurring monthly clients lock ho gaye!",
    tag: "Page 1 Rank"
  },
  {
    id: "rev-46",
    img: "/techpulse-assets/review-46.png",
    title: "First Order from International Customer — $250 Order!",
    note: "Bushra Bano: Alhamdulillah! Profile optimize hone ke sirf 5 din baad UK se $250 ka first client mila — optimization fee usi pehle order se 100x recover ho gayi!",
    tag: "First Dollar Order"
  },
  {
    id: "rev-45",
    img: "/techpulse-assets/review-45.png",
    title: "Zabardast Fiverr Optimization Service",
    note: "Babar Zafar: Keyword research aur 5 search tags ki exact alignment ne meri dead gig ko dobara active search me la diya. Mashallah zabardast service!",
    tag: "Fiverr SEO"
  },
  {
    id: "rev-44",
    img: "/techpulse-assets/review-44.png",
    title: "Clicks Grew by +265% in 2 Weeks",
    note: "Allah Bachaya: Gigs par roz ke 2-3 clicks aate the, optimization ke baad daily 40+ genuine buyer clicks aa rahe hain aur continuous messages receive ho rahe hain.",
    tag: "Traffic Surge"
  },
  {
    id: "rev-43",
    img: "/techpulse-assets/review-43.png",
    title: "Professional Fiverr Positioning — Right Decision",
    note: "Jaffer Hussain: Internet par bohot se fake course sellers hain, lekin yahan actual Fiverr algorithm aur buyer psychology par kaam hota hai.",
    tag: "Real Service"
  },
  {
    id: "rev-42",
    img: "/techpulse-assets/review-42.png",
    title: "Best Mentor Support & Detailed Gig Audit",
    note: "Muhammad Bilal: Har gig tag, title aur description ka detailed audit diya gaya. Direct WhatsApp support ke sath deliver hua.",
    tag: "Mentorship"
  },
  {
    id: "rev-25",
    img: "/techpulse-assets/review-25.png",
    title: "First $180 Custom Offer Closed",
    note: "Optimization ke baad client ne direct inbox me approach kiya aur $180 custom offer bina negotiation ke accept kar li.",
    tag: "Direct Order"
  },
  {
    id: "rev-26",
    img: "/techpulse-assets/review-26.png",
    title: "Clear Optimization Checklist Provided",
    note: "Keywords aur tags ki list clearly provide ki gayi jise direct apply karke impressions jump hue.",
    tag: "Optimization Blueprint"
  },
  {
    id: "rev-27",
    img: "/techpulse-assets/review-27.png",
    title: "Gig Ranked in Top 3 Search Results",
    note: "Specific low-competition keyword par gig Page 1 ke top 3 results me aane lagi — practical results!",
    tag: "Top 3 Rank"
  },
  {
    id: "rev-28",
    img: "/techpulse-assets/review-28.png",
    title: "Consistent Orders In Queue Every Week",
    note: "Account active hone ke baad ab weekly basis par inquiries aur custom offer requests inbox me aati hain.",
    tag: "Consistency"
  },
  {
    id: "rev-29",
    img: "/techpulse-assets/review-29.png",
    title: "Direct WhatsApp Support & Advice",
    note: "Har client conversation aur pricing query par mentor ne guidance di jis se deal close karna asaan hua.",
    tag: "Mentorship"
  },
  {
    id: "rev-30",
    img: "/techpulse-assets/review-30.png",
    title: "2 Din Mein Hi Clicks & Impressions Barh Gaye",
    note: "Changes apply karne ke 48 hours ke andar Fiverr analytics me green upward arrows show hone lage.",
    tag: "Fast Ranking"
  },
  {
    id: "rev-31",
    img: "/techpulse-assets/review-31.png",
    title: "Best Rs. 8,000 Investment in Freelancing Career",
    note: "Sirf Rs. 8,000 me itna detailed profile overhaul aur keyword blueprint — har rupay ke qabil hai!",
    tag: "Best Value"
  },
  {
    id: "rev-32",
    img: "/techpulse-assets/review-32.png",
    title: "Hourly Consultation Optimized to PKR 7,290/hr",
    note: "Profile bio aur consultation setup hone ke baad international clients direct hourly calls book karne lage.",
    tag: "High Ticket"
  },
  {
    id: "rev-33",
    img: "/techpulse-assets/review-33.png",
    title: "100% Genuine & Safe Optimization",
    note: "Koi fake review ya black-hat hack nahi use hota. Poora kaam Fiverr Terms of Service ke mutabiq hai.",
    tag: "Safe & Verified"
  },
  {
    id: "rev-34",
    img: "/techpulse-assets/review-34.png",
    title: "Competitor Research Angle Zabardast",
    note: "Top competitors ke gaps identify karke aesi gig description banayi jo buyers ko instantly impress karti hai.",
    tag: "High Conversion"
  },
  {
    id: "rev-35",
    img: "/techpulse-assets/review-35.png",
    title: "Tags Density aur Search URL Magic",
    note: "Search URL me keyword embed karne ka trick waqai work karta hai — impressions graph upar chala gaya.",
    tag: "Fiverr SEO"
  },
  {
    id: "rev-36",
    img: "/techpulse-assets/review-36.png",
    title: "From 0 Orders to Consistent Income",
    note: "Freelancing me hopeless tha, lekin is optimization ne account ko profitable business bana diya. Shukriya!",
    tag: "Life Changing"
  }
];

export const TESTIMONIALS_18: TestimonialStudent[] = [
  { n: "Hamza Saeed", c: "Karachi", r: "Full Stack Developer", q: "Gig dead thi. Optimization ke baad 30 dino me +340% impressions aur $350 & $600 ke active orders mil gaye.", money: "$1.15K" },
  { n: "Sikandar Usman", c: "Lahore", r: "Video Editor", q: "Page 1 #4 rank achieve kiya. Canada aur USA se recurring monthly video editing retainers lock ho gaye.", money: "$850" },
  { n: "Bilal Ahmed", c: "Islamabad", r: "WordPress Developer", q: "Hourly rate PKR 7,200/hr position kiya. US buyers direct inbox me custom offers mangte hain.", money: "$1.4K" },
  { n: "Fatima Sheikh", c: "Lahore", r: "Graphic Designer", q: "Thumbnail visual contrast change kiya aur pehle 10 dino me 2 direct orders close hue!", money: "Rs. 32K" },
  { n: "Hassan Ali", c: "Faisalabad", r: "New Freelancer", q: "Zero impressions se start kiya tha. Low-competition tags ki madad se pehla order 1st week me deliver kiya.", money: "Rs. 45K" },
  { n: "Maria Tariq", c: "Multan", r: "Content Writer", q: "Monthly retainer client mil gaya jo regular $600 monthly pay kar raha hai. Best service!", money: "$600/mo" },
  { n: "Usman Javed", c: "Rawalpindi", r: "SEO Specialist", q: "Technical gig audit aur keyword placement 100% white-hat hai. Highly recommended!", money: "Rs. 58K" },
  { n: "Zainab Iqbal", c: "Lahore", r: "Social Media Manager", q: "3-tier pricing strategy se client ne $50 ke bajaye direct $250 Premium package choose kiya.", money: "$750" },
  { n: "Sana Khan", c: "Karachi", r: "Voiceover Artist", q: "Search tags theek karte hi search rankings jump kar ke 1st page par aa gayi.", money: "Rs. 28K" },
  { n: "Talha Mehmood", c: "Peshawar", r: "Shopify Expert", q: "Competitor research trick se low competition tags mile jahan competition almost zero tha.", money: "$900" },
  { n: "Rabia Aslam", c: "Sialkot", r: "Virtual Assistant", q: "WhatsApp support bohot active hai. Profile bio draft instantly review kiya gaya.", money: "Rs. 24K" },
  { n: "Imran Qureshi", c: "Karachi", r: "Dollar Earner", q: "Level 2 Seller ban gaya hu Alhamdulillah. Daily impressions 2,000+ cross kar rahe hain.", money: "$2.2K/mo" },
  { n: "Hira Yousuf", c: "Lahore", r: "Student Freelancer", q: "Evening me 1-2 ghante de kar pocket money se zyada kama rahi hu. Very grateful!", money: "Rs. 38K" },
  { n: "Saad Anwar", c: "Karachi", r: "Web Designer", q: "Pehle buyer request dhoondta tha, ab direct orders queue me aate hain.", money: "$1.6K" },
  { n: "Nimra Hassan", c: "Islamabad", r: "UI/UX Designer", q: "Thumbnail typography change ki aur clicks agle din double ho gaye.", money: "Rs. 72K" },
  { n: "Hamza Tariq", c: "Lahore", r: "Beginner", q: "Roman Urdu me instructions aur blueprint samajhna bohot asaan hai.", money: "Rs. 21K" },
  { n: "Aisha Noor", c: "Karachi", r: "Virtual Assistant", q: "Payoneer to Meezan Bank setup guide bohot smooth thi. Dollars direct bank me aate hain.", money: "$850" },
  { n: "Faisal Mehboob", c: "Multan", r: "Digital Marketer", q: "Pakistan ka sab se behtareen aur practical Fiverr ranking system hai.", money: "Level 2" }
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
    q: "Meri gig par 0 impressions hain ya impressions freeze ho gaye — kya optimization se gig revive ho sakti hai?",
    a: "Jee haan, 100%! Fiverr search algorithm dead ya 0-impression gigs ko is liye ignore karta hai kyunki unme outdated generic high-competition tags, low keyword density, ya mismatched category attributes hote hain. Optimization me hum aapki gig ko low-to-medium competition buyer search terms aur algorithmic tags se re-index karte hain. Jab metadata fresh buyer intent se match hota hai, toh Fiverr algorithm gig ko fresh impressions test stream me push karna shuru kar deta hai.",
    category: "ranking",
    categoryLabel: "Gig Ranking & Impressions",
    tags: ["impressions", "zero impressions", "dead gig", "revive", "freeze", "views"],
    popular: true
  },
  {
    id: "faq-02",
    q: "Agar main apni existing gig ko edit karoon toh kya Fiverr use de-rank ya search se gayab kar dega?",
    a: "Ye freelancers ka sabse bara myth aur fear hai! Agar aapki gig pehle se hi de-ranked hai ya 0 orders de rahi hai, toh use bina changes ke chhorna mazeed waqt zaya karna hai. Jab aap Fiverr algorithm rules ke mutabiq title, description, aur tags update karte hain, toh Fiverr system temporarily 24–48 hours ke liye re-indexing review mode me jata hai. Jaise hi crawler naye relevant keywords verify karta hai, gig search results me naye aur behtar positions par show hona shuru ho jati hai. Hum permanent URL slug ko bilkul disturb nahi karte taake aapki gig authority 100% safe rahe.",
    category: "editing",
    categoryLabel: "Editing Fears & De-ranking",
    tags: ["edit", "derank", "de-ranking", "safe", "existing gig", "lost ranking"],
    popular: true
  },
  {
    id: "faq-03",
    q: "Optimization ke baad Fiverr search results aur Page 1 par rank hone me kitna waqt lagta hai?",
    a: "Fiverr ka search indexing crawler changes ko 24 se 72 hours me process karta hai. Micro-niches aur long-tail buyer keywords par aksar gigs 24–48 hours ke andar Page 1 par position hold kar leti hain. Broad categories me impressions 3 se 7 dino me climb karte hain, aur sustainable organic buyer messages aane me 7 se 14 din lagte hain. Is liye hum 20–25 days ka structured algorithm evaluation period dete hain.",
    category: "ranking",
    categoryLabel: "Gig Ranking & Impressions",
    tags: ["time", "timeline", "page 1", "how long", "24 hours", "ranking", "index"],
    popular: true
  },
  {
    id: "faq-04",
    q: "Kya ye optimization 100% Fiverr Terms of Service (TOS) ke mutabiq safe hai? Account warning ka koi risk hai?",
    a: "Hargiz koi risk nahi! Hum strictly 100% White-Hat Fiverr SEO aur ethical copywriting use karte hain. Hum kisi bhi qism ke fake reviews, bots, automated proxies, ya fake clicks use nahi karte jo Fiverr TOS ke khilaf hon. Har optimization natural search engine compliance, buyer conversion psychology, aur Fiverr ki official seller guidelines ke mutabiq ki jati hai.",
    category: "safety",
    categoryLabel: "Fiverr TOS & Account Safety",
    tags: ["tos", "safety", "warning", "ban", "safe", "white-hat", "policy", "terms"],
    popular: true
  },
  {
    id: "faq-05",
    q: "Main bilkul fresh seller hoon aur meri profile par 0 reviews hain — kya buyers mujhe order denge?",
    a: "Bilkul! Top-rated sellers broad keywords (maslan 'Logo Designer' ya 'Wordpress Developer') par baithe hote hain jahan 50,000+ gigs hoti hain. Hamari strategy 'Micro-Niche Penetration' hai — hum aisi specific search queries target karte hain jahan competition sirf 200–700 gigs ka hota hai lekin US/UK buyers daily search karte hain. Sath hi clear 3-tier pricing aur professional portfolio presentation buyer ka trust jeet kar review ke baghair bhi pehla order close karwati hai.",
    category: "new_seller",
    categoryLabel: "New Sellers & 0 Reviews",
    tags: ["new seller", "zero reviews", "first order", "beginner", "no reviews", "fresh account"],
    popular: true
  },
  {
    id: "faq-06",
    q: "Gig aur Profile optimization me exactly kya kya deliver kiya jata hai?",
    a: "Hamari service complete 360-degree overhaul provide karti hai: (1) Niche-specific buyer keyword research (2) High-CTR SEO title aur permalink setup (3) 5 Strategic high-volume search tags (4) 1200-characters persuasive description with ideal keyword density (5) Psychological 3-tier package pricing (Basic, Standard, Premium) (6) Buyer objection-killing FAQs with keywords (7) High-contrast thumbnail visual guide (8) Complete profile bio, authority tagline, aur skills matrix revamp.",
    category: "conversion",
    categoryLabel: "Conversions & Inquiries",
    tags: ["scope", "deliverables", "services", "what included", "tags", "title", "description", "packages"],
    popular: false
  },
  {
    id: "faq-07",
    q: "Mujhe gig par impressions aur clicks toh milte hain lekin orders ya messages nahi aate — issue kahan hai?",
    a: "Ye common conversion rate (CVR) problem hai. Impressions aur clicks ka matlab hai ke thumbnail aur title theek hain, lekin jaise hi buyer gig page par aata hai, weak description copywriting, unclear deliverables, confusing package pricing, ya buyer fears usay bounce kar dete hain. Optimization me hum description ke hooks ko tighten karte hain aur 3-tier packages ko structured value proposition me badal dete hain taake buyer bina hesitate kiye order place kare.",
    category: "conversion",
    categoryLabel: "Conversions & Inquiries",
    tags: ["clicks but no orders", "conversion", "no messages", "inquiries", "bounce rate", "cvr"],
    popular: true
  },
  {
    id: "faq-08",
    q: "Graphic Design, Video Editing, ya Web Development jaise high-competition niches me kaise rank karein?",
    a: "Generic keywords (maslan sirf 'Video Editor') par new ya level-1 sellers kabhi rank nahi kar sakte. Hum 'Long-Tail Keyword Stacking' technique use karte hain — maslan 'Real Estate Drone Video Editing' ya 'SaaS Explainer Video Editing'. Is tarah direct high-budget international buyers target hote hain aur 24–48 hours ke andar top rows me rank mil jati hai.",
    category: "ranking",
    categoryLabel: "Gig Ranking & Impressions",
    tags: ["high competition", "graphic design", "video editing", "web development", "long-tail", "niche"],
    popular: false
  },
  {
    id: "faq-09",
    q: "Kya gig image/thumbnail aur image metadata ka ranking me koi role hota hai?",
    a: "Bohat bara role hota hai! Fiverr algorithm Click-Through Rate (CTR) ko sabse zyada weightage deta hai. Agar aapki gig search me aati hai lekin thumbnail dull hai aur buyer click nahi karta, toh Fiverr gig ko lower pages par phenk deta hai. Hum bold contrast, 3-second readability hierarchy, aur image SEO metadata (alt tags & descriptive filenames) ensure karte hain jo CTR ko 3x barha deta hai.",
    category: "conversion",
    categoryLabel: "Conversions & Inquiries",
    tags: ["thumbnail", "ctr", "image seo", "visuals", "clicks", "design", "photo"],
    popular: false
  },
  {
    id: "faq-10",
    q: "Optimization ke liye account access kaise li jati hai? Kya AnyDesk ya TeamViewer se ho sakta hai?",
    a: "Aapki complete security aur privacy 100% guaranteed hai. Aap direct login provide kar sakte hain, ya agar aap login share nahi karna chahte toh hum AnyDesk ya TeamViewer ke zariye live screen-share session par aapki ankhon ke samne complete optimization apply kar dete hain. Choice 100% aapki hai!",
    category: "safety",
    categoryLabel: "Fiverr TOS & Account Safety",
    tags: ["anydesk", "teamviewer", "login", "account access", "security", "privacy", "credentials"],
    popular: true
  },
  {
    id: "faq-11",
    q: "Fiverr ke naye Success Score system aur algorithmic updates se gig optimization ka kya taluq hai?",
    a: "Fiverr ka naya Success Score private buyer reviews, effective communication, aur cancellation rate par depend karta hai. Jab gig description me deliverables 100% transparent hon aur pricing tiers realistic hon, toh buyers ko exact expectations milti hain. Is se order cancellations zero ho jati hain aur private 5-star ratings increase hoti hain jo gig ko algorithm me permanently stabilize rakhti hain.",
    category: "safety",
    categoryLabel: "Fiverr TOS & Account Safety",
    tags: ["success score", "algorithm 2026", "cancellation", "private reviews", "fiverr update", "metric"],
    popular: false
  },
  {
    id: "faq-12",
    q: "Fiverr se dollar earnings Pakistan me kaise aayengi aur service fee kaise pay karein?",
    a: "Hamari service fee (Rs. 8,000 package) aap Meezan Bank, Easypaisa, JazzCash, SadaPay, NayaPay ya kisi bhi Pakistani banking app se 1-click IBFT/Raast ke zariye pay kar sakte hain. Fiverr par jab aapke orders complete honge, toh dollars Payoneer ke zariye direct Meezan Bank, JazzCash, ya kisi bhi Pakistani bank me live interbank rate par withdraw ho jate hain.",
    category: "payment",
    categoryLabel: "Payments, AnyDesk & Guarantee",
    tags: ["easypaisa", "jazzcash", "meezan bank", "payment", "payoneer", "withdrawal", "pkr", "dollars"],
    popular: false
  },
  {
    id: "faq-13",
    q: "Agar optimization ke baad bhi meri gig rank na ho ya results na milein toh kya refund milta hai?",
    a: "Jee haan, 100% Refund Guarantee hai! Agar aap hamare optimized blueprint ko implement karte hain aur 20–25 days ke recommended algorithmic indexation period me aapko positive impressions growth ya buyer interaction nahi milti, toh aap WhatsApp par msg karke apna 100% refund claim kar sakte hain. Zero questions asked.",
    category: "payment",
    categoryLabel: "Payments, AnyDesk & Guarantee",
    tags: ["refund", "money back guarantee", "risk free", "guarantee", "whatsapp support", "policy"],
    popular: true
  },
  {
    id: "faq-14",
    q: "Kya Fiverr mobile app se gig edit karni chahiye ya desktop laptop se?",
    a: "Hamesha desktop ya laptop ke browser se edit karein! Fiverr mobile app par search tags, FAQ sections, portfolio attachments, aur package metadata ke advance options restrict hote hain. Desktop se complete algorithmic fields populate hoti hain jo gig ko maximum search visibility deti hain.",
    category: "editing",
    categoryLabel: "Editing Fears & De-ranking",
    tags: ["mobile app", "laptop", "desktop", "edit gig", "browser", "mobile vs desktop"],
    popular: false
  }
];

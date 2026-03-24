// ─── ALL-LEADS CONVERSATION DATA ──────────────────────────────────────────────
// Full conversation histories for every lead, across WhatsApp, Email, Chat, Voice.
// Consumed by the OmniChannel page's channel sub-components.

// ── Types ──────────────────────────────────────────────────────────────────────

export interface ChatMessage {
  id: number;
  role: "user" | "ai";
  text: string;
  time: string;
}

export interface OmniMessage {
  from: string;
  text: string;
  time: string;
  isAI?: boolean;
}

export interface VoiceLine {
  time: string;
  speaker: string;
  text: string;
}

export interface LeadConversationData {
  leadId: number;
  leadName: string;
  leadInitials: string;
  company: string;
  role: string;
  score: number;
  whatsapp: OmniMessage[];
  email: OmniMessage[];
  chat: ChatMessage[];
  voice: VoiceLine[];
}

// ── Quick-reply chips per channel ──────────────────────────────────────────────

export const channelQuickReplies: Record<string, string[]> = {
  whatsapp: ["Share brochure", "Schedule call", "Send specs", "Connect to sales"],
  email:    ["Send proposal PDF", "Share costing", "Confirm meeting", "Follow up"],
  chat:     ["Tell me about pricing", "Show portfolio", "Schedule site visit", "Connect to sales"],
  voice:    [],
};

export const defaultAIReply =
  "Thank you for your message! Our AI is analysing your query and will provide a detailed response tailored to your construction project needs shortly.";

// ── Lead 1 — Rajesh Mehta (Vikram Industries) — score 87 ─────────────────────

const rajeshMehta: LeadConversationData = {
  leadId: 1,
  leadName: "Rajesh Mehta",
  leadInitials: "RM",
  company: "Vikram Industries",
  role: "CEO",
  score: 87,

  whatsapp: [
    {
      from: "Rajesh Mehta",
      text: "Hi, saw your ad on LinkedIn. We're evaluating precast for a 50k sqft commercial complex in Pune.",
      time: "Yesterday, 10:10 AM",
    },
    {
      from: "AI Agent",
      text: "Hello Rajesh! Great timing — we've delivered 3 similar commercial projects in Maharashtra this year alone. Could you share the approximate timeline and budget?",
      time: "Yesterday, 10:10 AM",
      isAI: true,
    },
    {
      from: "Rajesh Mehta",
      text: "Budget is ₹25-30 Cr, 18-month delivery. Seismic Zone III compliance is mandatory.",
      time: "Yesterday, 10:13 AM",
    },
    {
      from: "AI Agent",
      text: "Perfect fit! Our Zone IV-certified systems exceed Zone III requirements. I'll send a detailed proposal with a cost breakdown. Can I schedule a call with our Pune team for tomorrow?",
      time: "Yesterday, 10:13 AM",
      isAI: true,
    },
    {
      from: "Rajesh Mehta",
      text: "Yes, tomorrow 2 PM works. Please also send the technical datasheet.",
      time: "Yesterday, 10:15 AM",
    },
    {
      from: "AI Agent",
      text: "Done! Meeting confirmed for tomorrow at 2 PM IST. Technical datasheets + project references have been sent to your WhatsApp. Looking forward to it! 🏗️",
      time: "Yesterday, 10:15 AM",
      isAI: true,
    },
  ],

  email: [
    {
      from: "AI Agent",
      text: "Subject: Precast Proposal — 50,000 sq ft Commercial Complex, Pune\n\nDear Rajesh,\n\nThank you for your interest. Following our WhatsApp conversation, please find attached:\n\n• Detailed cost estimate (₹24.8 Cr – ₹28.5 Cr range)\n• Seismic Zone III/IV compliance certificate\n• Case study: Nagpur Business Park (52,000 sq ft, delivered in 15 months)\n\nOur Sr. Architect Ankit Sharma will join tomorrow's 2 PM call to walk you through structural options.\n\nWarm regards,\nSmartBuild AI",
      time: "Yesterday, 10:30 AM",
      isAI: true,
    },
    {
      from: "Rajesh Mehta",
      text: "Received the documents. The Nagpur case study is very relevant. Budget looks acceptable. Will confirm after the call tomorrow.",
      time: "Today, 9:15 AM",
    },
    {
      from: "AI Agent",
      text: "Subject: RE: Precast Proposal — Documents Received Confirmation\n\nThank you for confirming, Rajesh! We're excited about this opportunity. A pre-call briefing document has been shared with Ankit. See you at 2 PM. 📅",
      time: "Today, 9:20 AM",
      isAI: true,
    },
  ],

  chat: [
    {
      id: 1,
      role: "user",
      text: "Hi, I'm Rajesh from Vikram Industries. We're looking at precast solutions for a new 50,000 sq ft commercial complex in Pune.",
      time: "10:32 AM",
    },
    {
      id: 2,
      role: "ai",
      text: "Hello Rajesh! Thank you for reaching out. A 50,000 sq ft commercial complex is a significant project. Based on our experience with similar projects in Maharashtra, precast concrete solutions can reduce your construction timeline by 30–40% and costs by approximately 15–20%.\n\nCould you share more about:\n1. Your expected project timeline?\n2. Approximate budget range?\n3. Any specific structural requirements?",
      time: "10:32 AM",
    },
    {
      id: 3,
      role: "user",
      text: "Timeline is 18 months, budget around ₹25-30 Crore. We need earthquake-resistant design for Zone III.",
      time: "10:33 AM",
    },
    {
      id: 4,
      role: "ai",
      text: "Excellent! Based on your requirements:\n\n✅ Budget Fit: ₹25-30 Cr is well within range\n✅ Timeline: 18 months is achievable — precast delivers in 14-16 months\n✅ Seismic Zone III: Our systems are certified for Zone IV\n\n📊 Lead Score: 87/100 — High-value opportunity\n\nI'd recommend scheduling a meeting with our Sr. Solutions Architect. Would tomorrow at 2:00 PM work?",
      time: "10:33 AM",
    },
    {
      id: 5,
      role: "user",
      text: "Tomorrow 2 PM works perfectly. Can you also send the technical specs via email?",
      time: "10:34 AM",
    },
    {
      id: 6,
      role: "ai",
      text: "Perfect! Meeting confirmed for tomorrow at 2:00 PM IST.\n\n📧 Technical specs queued for your email\n📅 Calendar invite sent to rajesh@vikramindustries.com\n👤 You'll meet Ankit Sharma, Senior Solutions Architect\n\nIs there anything else before the meeting?",
      time: "10:34 AM",
    },
  ],

  voice: [
    { time: "0:00", speaker: "AI", text: "Good afternoon! This is SmartBuild AI calling for Rajesh Mehta regarding the Pune commercial complex project. Am I speaking with Rajesh?" },
    { time: "0:08", speaker: "Rajesh", text: "Yes, speaking." },
    { time: "0:10", speaker: "AI", text: "Wonderful! Thank you for your time. I wanted to follow up on the proposal we sent this morning. Did you get a chance to review the Nagpur Business Park case study?" },
    { time: "0:20", speaker: "Rajesh", text: "Yes, I did. The 15-month delivery is impressive. My concern is whether the Pune site's soil conditions will affect the precast foundation design." },
    { time: "0:32", speaker: "AI", text: "Great question. For Pune's typical black cotton soil, we use a pile-supported precast grid system that's been proven in 6 projects in the region. Our geotechnical team can do a site assessment within 48 hours of your approval." },
    { time: "0:50", speaker: "Rajesh", text: "That sounds good. Let's proceed with tomorrow's 2 PM meeting and discuss this in detail." },
    { time: "0:58", speaker: "AI", text: "Absolutely. I've noted your soil concern and briefed Ankit Sharma accordingly. See you tomorrow at 2 PM. Have a great day, Rajesh!" },
  ],
};

// ── Lead 2 — Priya Shah (Shah Constructions) — score 82 ──────────────────────

const priyaShah: LeadConversationData = {
  leadId: 2,
  leadName: "Priya Shah",
  leadInitials: "PS",
  company: "Shah Constructions",
  role: "MD",
  score: 82,

  whatsapp: [
    {
      from: "Priya Shah",
      text: "Hello! We're working on a residential tower project in Mumbai. Heard SmartBuild is good with high-rises.",
      time: "Today, 8:05 AM",
    },
    {
      from: "AI Agent",
      text: "Hi Priya! Yes, we've completed 12 high-rise residential projects in MMR. Precast is especially effective for repetitive floor plates. How many floors are you planning?",
      time: "Today, 8:05 AM",
      isAI: true,
    },
    {
      from: "Priya Shah",
      text: "25 floors, 180 apartments. Budget ₹15-20 Cr for structure. Need to be done in under 2 years.",
      time: "Today, 8:09 AM",
    },
    {
      from: "AI Agent",
      text: "That's a great scope for precast! With our tunnel-form + precast hybrid system we delivered a 22-floor tower in Thane in 19 months. I'll send you the case study. Available for a site call this week?",
      time: "Today, 8:09 AM",
      isAI: true,
    },
    {
      from: "Priya Shah",
      text: "Wednesday 11 AM works for me.",
      time: "Today, 8:12 AM",
    },
    {
      from: "AI Agent",
      text: "Confirmed! Wednesday 11 AM IST. I've also sent you our Mumbai high-rise portfolio on WhatsApp. Looking forward to the conversation! 🏙️",
      time: "Today, 8:12 AM",
      isAI: true,
    },
  ],

  email: [
    {
      from: "AI Agent",
      text: "Subject: Residential Tower Proposal — 25-Floor, Mumbai\n\nDear Priya,\n\nFollowing our WhatsApp exchange, I'm sharing:\n\n• Hybrid precast proposal for 25G + 3B podium structure\n• Cost estimate: ₹16.2 Cr – ₹18.9 Cr\n• Timeline: 21 months (structure + MEP rough-in)\n• Reference: Thane Symphony Tower, 22 floors, 178 units, delivered in 19 months\n\nLooking forward to Wednesday's call.\n\nBest,\nSmartBuild AI",
      time: "Today, 9:00 AM",
      isAI: true,
    },
    {
      from: "Priya Shah",
      text: "Proposal looks detailed. The Thane project timeline is encouraging. Can you also share the cost per sq ft for precast vs conventional RCC?",
      time: "Today, 9:45 AM",
    },
    {
      from: "AI Agent",
      text: "Subject: RE: Cost Comparison — Precast vs Conventional RCC\n\nDear Priya,\n\nCertainly! Here's a quick summary:\n\n• Conventional RCC: ₹1,850–₹2,100/sq ft (structure only)\n• SmartBuild Precast: ₹1,650–₹1,900/sq ft (structure + faster delivery saves ₹80–120L in financing costs)\n\nFull comparison sheet attached. See you Wednesday!",
      time: "Today, 10:00 AM",
      isAI: true,
    },
  ],

  chat: [
    {
      id: 1,
      role: "user",
      text: "Hi, Priya Shah from Shah Constructions. We need precast for a 25-floor residential tower in Mumbai.",
      time: "8:02 AM",
    },
    {
      id: 2,
      role: "ai",
      text: "Welcome Priya! A 25-floor residential tower is right in our sweet spot. Our hybrid precast system delivers up to 40% faster than conventional RCC for repetitive floor plates.\n\nCould you share:\n1. Number of units per floor?\n2. Budget for structural works?\n3. Target completion date?",
      time: "8:02 AM",
    },
    {
      id: 3,
      role: "user",
      text: "180 units total, ₹15-20 Cr budget, need completion by June 2026.",
      time: "8:05 AM",
    },
    {
      id: 4,
      role: "ai",
      text: "Excellent fit! Here's what I can confirm:\n\n✅ 180 units — ideal repetition for precast efficiency\n✅ Budget ₹15-20 Cr — within our ₹16.2-18.9 Cr estimate\n✅ June 2026 — achievable with our 21-month programme\n\n📊 Lead Score: 82/100\n\nShall I schedule a detailed call with our Mumbai project team?",
      time: "8:05 AM",
    },
    {
      id: 5,
      role: "user",
      text: "Yes please, Wednesday 11 AM.",
      time: "8:07 AM",
    },
    {
      id: 6,
      role: "ai",
      text: "Wednesday 11 AM confirmed! ✅\n\n📧 Full proposal sent to your email\n📅 Calendar invite dispatched\n👤 You'll speak with Siddharth Rao, Mumbai Regional Head\n\nAnything else you'd like before the call?",
      time: "8:07 AM",
    },
  ],

  voice: [
    { time: "0:00", speaker: "AI", text: "Good morning! SmartBuild AI calling for Priya Shah regarding the Mumbai residential tower project. Is this Priya?" },
    { time: "0:07", speaker: "Priya", text: "Yes, this is Priya." },
    { time: "0:09", speaker: "AI", text: "Thank you, Priya. I'm calling ahead of Wednesday's meeting to understand if you have any preliminary questions about our hybrid precast proposal." },
    { time: "0:18", speaker: "Priya", text: "Yes — I need clarity on the façade options. We want exposed concrete finish for 8 floors and conventional plastered for the rest." },
    { time: "0:28", speaker: "AI", text: "Absolutely possible. Our architectural precast panels support both exposed aggregate and plastered finishes within the same structural system. I'll add this to Wednesday's agenda with sample visuals for Siddharth to present." },
    { time: "0:42", speaker: "Priya", text: "Great. Also, can you accommodate our in-house MEP contractors?" },
    { time: "0:48", speaker: "AI", text: "Yes, we work with client-nominated MEP contractors regularly. We'll provide pre-coordinated sleeves and block-outs in the precast panels. See you Wednesday at 11, Priya!" },
  ],
};

// ── Lead 3 — Arjun Patel (Patel Infrastructure) — score 65 ───────────────────

const arjunPatel: LeadConversationData = {
  leadId: 3,
  leadName: "Arjun Patel",
  leadInitials: "AP",
  company: "Patel Infrastructure",
  role: "VP",
  score: 65,

  whatsapp: [
    {
      from: "Arjun Patel",
      text: "Hi, I received your brochure. Very interested in precast for our warehouse project.",
      time: "Yesterday, 3:45 PM",
    },
    {
      from: "AI Agent",
      text: "Thank you, Mr. Patel! I'd love to discuss how precast can accelerate your warehouse project. Could you share the approximate size and location?",
      time: "Yesterday, 3:45 PM",
      isAI: true,
    },
    {
      from: "Arjun Patel",
      text: "It's a 30,000 sq ft facility in Ahmedabad's industrial zone.",
      time: "Yesterday, 3:48 PM",
    },
    {
      from: "AI Agent",
      text: "30,000 sq ft in Ahmedabad — great location! We've done several similar projects in Gujarat. I'll send you a detailed proposal. Would you be available for a call tomorrow?",
      time: "Yesterday, 3:48 PM",
      isAI: true,
    },
    {
      from: "Arjun Patel",
      text: "Sure, call me between 10-11 AM.",
      time: "Yesterday, 3:52 PM",
    },
    {
      from: "AI Agent",
      text: "Perfect! Call scheduled for tomorrow 10 AM. Proposal and Gujarat warehouse references have been sent. Talk soon! 🏭",
      time: "Yesterday, 3:52 PM",
      isAI: true,
    },
  ],

  email: [
    {
      from: "AI Agent",
      text: "Subject: Precast Solutions for Your Ahmedabad Warehouse\n\nDear Mr. Patel,\n\nFollowing our WhatsApp conversation, I'm sharing the detailed specifications and cost estimate for your 30,000 sq ft warehouse project:\n\n• Precast column + beam frame with insulated sandwich wall panels\n• Cost estimate: ₹9.8 Cr – ₹11.4 Cr\n• Timeline: 8–10 months\n• Reference: Sanand Industrial Hub, 28,000 sq ft, delivered in 9 months\n\nLooking forward to tomorrow's call.\n\nRegards,\nSmartBuild AI",
      time: "Yesterday, 4:15 PM",
      isAI: true,
    },
    {
      from: "Arjun Patel",
      text: "Thanks for the quick turnaround. The proposal looks comprehensive. Let me review with my team and get back.",
      time: "Today, 9:30 AM",
    },
    {
      from: "AI Agent",
      text: "Subject: RE: Precast Proposal — Happy to Assist!\n\nDear Mr. Patel,\n\nOf course, take your time reviewing. I'm also attaching our seismic Zone III compliance certificate since Ahmedabad falls in that zone.\n\nIf your team has any technical questions, our structural team is available on a shared doc here. Look forward to hearing from you!",
      time: "Today, 9:45 AM",
      isAI: true,
    },
  ],

  chat: [
    {
      id: 1,
      role: "ai",
      text: "Welcome back, Mr. Patel! I noticed you viewed the proposal we sent. Do you have any questions about the specifications?",
      time: "10:15 AM",
    },
    {
      id: 2,
      role: "user",
      text: "Yes, what about seismic compliance? Ahmedabad is in Zone III.",
      time: "10:17 AM",
    },
    {
      id: 3,
      role: "ai",
      text: "All our precast systems are designed for Zone IV compliance, which exceeds Zone III requirements. I can share our structural certification documents if needed.",
      time: "10:17 AM",
    },
    {
      id: 4,
      role: "user",
      text: "That's reassuring. What's the crane requirement during erection?",
      time: "10:20 AM",
    },
    {
      id: 5,
      role: "ai",
      text: "For a 30,000 sq ft warehouse, we typically deploy:\n\n🏗️ 1 × 50T mobile crane for columns\n🏗️ 1 × 25T crane for wall panels\n\nBoth can be sourced locally in Ahmedabad. We coordinate crane logistics as part of our turnkey service at no extra cost.",
      time: "10:20 AM",
    },
    {
      id: 6,
      role: "user",
      text: "Good to know. Let's move ahead with the site visit discussion.",
      time: "10:22 AM",
    },
    {
      id: 7,
      role: "ai",
      text: "Great! I'll coordinate with our Gujarat site team. Expect a confirmation for the site visit within 24 hours. Would Thursday or Friday work better for you?",
      time: "10:22 AM",
    },
  ],

  voice: [
    { time: "0:00", speaker: "AI", text: "Good morning, Mr. Patel. SmartBuild AI calling to follow up on your warehouse project in Ahmedabad. Is now a good time?" },
    { time: "0:09", speaker: "Arjun", text: "Yes, go ahead." },
    { time: "0:11", speaker: "AI", text: "Thank you. I wanted to discuss your seismic zone concerns mentioned in the chat. Our Zone IV-certified precast system exceeds Ahmedabad's Zone III requirement, and I'd like to walk you through the structural calculations." },
    { time: "0:25", speaker: "Arjun", text: "That's useful. What about the erection timeline? We can't afford a long shutdown of the adjacent facility." },
    { time: "0:33", speaker: "AI", text: "Understood. Our precast erection for 30,000 sq ft typically takes 6–8 weeks, much faster than RCC. We can sequence it to work away from your operational areas first." },
    { time: "0:45", speaker: "Arjun", text: "That works. Let's schedule the site visit for Thursday." },
    { time: "0:50", speaker: "AI", text: "Thursday it is! I'll confirm with our Gujarat team and send you the visit agenda by tomorrow morning. Thank you, Mr. Patel!" },
  ],
};

// ── Lead 4 — Suresh Kumar (Kumar Builders) — score 58 ────────────────────────

const sureshKumar: LeadConversationData = {
  leadId: 4,
  leadName: "Suresh Kumar",
  leadInitials: "SK",
  company: "Kumar Builders",
  role: "CTO",
  score: 58,

  whatsapp: [
    {
      from: "Suresh Kumar",
      text: "Hello, we're building a school in Delhi. Does SmartBuild do educational projects?",
      time: "Yesterday, 2:00 PM",
    },
    {
      from: "AI Agent",
      text: "Hi Suresh! Absolutely — educational buildings are a great use case for precast due to repetitive classroom layouts and strict safety codes. What's the scale of the project?",
      time: "Yesterday, 2:00 PM",
      isAI: true,
    },
    {
      from: "Suresh Kumar",
      text: "G+3 school building, 40 classrooms, ~₹9 Crore budget.",
      time: "Yesterday, 2:05 PM",
    },
    {
      from: "AI Agent",
      text: "Good scope! Precast is ideal for this — modular classrooms reduce noise disruption during construction too. I'll send you an education sector case study. Can we schedule a consultation call?",
      time: "Yesterday, 2:05 PM",
      isAI: true,
    },
    {
      from: "Suresh Kumar",
      text: "Sure. Friday afternoon works.",
      time: "Yesterday, 2:10 PM",
    },
    {
      from: "AI Agent",
      text: "Friday afternoon confirmed! Case study and school-specific precast brochure sent to WhatsApp. See you then! 🏫",
      time: "Yesterday, 2:10 PM",
      isAI: true,
    },
  ],

  email: [
    {
      from: "AI Agent",
      text: "Subject: Precast for Educational Buildings — Kumar Builders\n\nDear Suresh,\n\nThank you for enquiring about our educational project capabilities. Please find attached:\n\n• G+3 school precast structural proposal\n• Cost estimate: ₹8.1 Cr – ₹9.3 Cr\n• NBC 2016 & IS 1893 compliance certificate\n• Reference: Gurugram Public School, 38 classrooms, delivered in 11 months\n\nLooking forward to Friday's call.\n\nRegards,\nSmartBuild AI",
      time: "Yesterday, 2:30 PM",
      isAI: true,
    },
    {
      from: "Suresh Kumar",
      text: "Looks good. We also need acoustic treatment between classrooms. Is that handled in precast?",
      time: "Today, 11:00 AM",
    },
    {
      from: "AI Agent",
      text: "Subject: RE: Acoustic Treatment in Precast Classrooms\n\nDear Suresh,\n\nGreat question! Our precast wall panels can incorporate acoustic insulation (STC 45–52 dB) directly during manufacturing — no separate trade needed. This actually saves cost vs conventional methods.\n\nI've updated the proposal with acoustic panel specs. See you Friday!",
      time: "Today, 11:15 AM",
      isAI: true,
    },
  ],

  chat: [
    {
      id: 1,
      role: "user",
      text: "Hi, Suresh Kumar here. Evaluating precast for a Delhi school project — G+3, 40 classrooms.",
      time: "2:00 PM",
    },
    {
      id: 2,
      role: "ai",
      text: "Hello Suresh! Educational buildings are one of our strongest segments. Precast delivers:\n\n✅ Faster construction — minimal classroom disruption\n✅ Built-in acoustic panels (STC 45-52 dB)\n✅ Fire-rated walls (2-hour minimum)\n✅ NBC 2016 compliance guaranteed\n\nWhat's your target completion and budget?",
      time: "2:00 PM",
    },
    {
      id: 3,
      role: "user",
      text: "₹8-10 Cr budget, need it ready before the next academic year — August 2025.",
      time: "2:03 PM",
    },
    {
      id: 4,
      role: "ai",
      text: "That's a tight but achievable timeline! Our modular precast system for a G+3 school typically erects in 9–11 months.\n\n📊 Lead Score: 58/100 — Medium opportunity\n\nI'd recommend a Friday consultation to map out the exact programme. Sound good?",
      time: "2:03 PM",
    },
    {
      id: 5,
      role: "user",
      text: "Yes, Friday works. What documents should I prepare?",
      time: "2:05 PM",
    },
    {
      id: 6,
      role: "ai",
      text: "For Friday, please bring:\n\n📐 Site plan / plot dimensions\n📋 Architectural concept drawings (if available)\n🏛️ Any Delhi municipal approvals in progress\n\nEven rough drawings help us give a more accurate estimate. See you Friday!",
      time: "2:05 PM",
    },
  ],

  voice: [
    { time: "0:00", speaker: "AI", text: "Good afternoon, Suresh. SmartBuild AI calling ahead of Friday's consultation for your Delhi school project. Got a moment?" },
    { time: "0:09", speaker: "Suresh", text: "Yes, briefly." },
    { time: "0:11", speaker: "AI", text: "Perfect. I wanted to flag that Delhi's seismic Zone IV classification requires special detailing in precast connections — our Delhi team is already experienced with NDMC requirements. This won't affect your budget." },
    { time: "0:24", speaker: "Suresh", text: "That's important — we had issues with approvals on our last project. Can your team assist with the structural drawings for submission?" },
    { time: "0:33", speaker: "AI", text: "Absolutely. We provide stamped structural drawings by our empanelled Delhi structural consultant at no extra charge. This has helped our clients get approvals 30% faster." },
    { time: "0:44", speaker: "Suresh", text: "That's very helpful. Looking forward to Friday." },
    { time: "0:48", speaker: "AI", text: "Same here, Suresh! I'll ensure the full Delhi approval documentation support is on Friday's agenda. Have a great day!" },
  ],
};

// ── Lead 5 — Anita Desai (Desai Group) — score 91 ────────────────────────────

const anitaDesai: LeadConversationData = {
  leadId: 5,
  leadName: "Anita Desai",
  leadInitials: "AD",
  company: "Desai Group",
  role: "CFO",
  score: 91,

  whatsapp: [
    {
      from: "Anita Desai",
      text: "Hi! We're planning a 200-acre township near Bangalore. We need precast at scale. Can SmartBuild handle this?",
      time: "Today, 9:00 AM",
    },
    {
      from: "AI Agent",
      text: "Hello Anita! A 200-acre township is a flagship project — absolutely within our scope. We've supplied precast for 3 integrated townships in South India. What's the phasing plan and budget?",
      time: "Today, 9:00 AM",
      isAI: true,
    },
    {
      from: "Anita Desai",
      text: "₹40-50 Crore for Phase 1 — 500 units, community centre, and 2 schools. Need to start in Q3 this year.",
      time: "Today, 9:05 AM",
    },
    {
      from: "AI Agent",
      text: "Impressive scope! Our dedicated precast plant can be set up on-site for large townships, reducing transport costs by 20%. I'd like to set up a C-suite meeting with our MD. When are you available this week?",
      time: "Today, 9:05 AM",
      isAI: true,
    },
    {
      from: "Anita Desai",
      text: "Thursday 3 PM works for a video call. Please send our CFO the financial modelling too.",
      time: "Today, 9:10 AM",
    },
    {
      from: "AI Agent",
      text: "Thursday 3 PM confirmed with our MD and CFO! Financial model with IRR and payback analysis sent to your email. This is going to be a fantastic project! 🌆",
      time: "Today, 9:10 AM",
      isAI: true,
    },
  ],

  email: [
    {
      from: "AI Agent",
      text: "Subject: Township Precast Proposal — Phase 1, Bangalore\n\nDear Anita,\n\nExcited to partner on this landmark project! Please find attached:\n\n• Phase 1 precast master plan (500 units + community + 2 schools)\n• Cost estimate: ₹43.5 Cr – ₹48.2 Cr\n• On-site precast plant feasibility study (saves ₹3.8 Cr in transport)\n• Financial model: 18.4% IRR, 2.8-year payback\n• Reference: Prestige Serene Meadows, 600 units, Mysore (on-site plant model)\n\nThursday 3 PM — our MD and CFO will both be present.\n\nWarm regards,\nSmartBuild AI",
      time: "Today, 9:30 AM",
      isAI: true,
    },
    {
      from: "Anita Desai",
      text: "Excellent documentation. The on-site plant model is exactly what we were hoping for. CFO reviewed the IRR — very attractive. See you Thursday.",
      time: "Today, 1:00 PM",
    },
    {
      from: "AI Agent",
      text: "Subject: RE: Thursday Meeting Confirmation\n\nDear Anita,\n\nDelighted to hear the financial modelling resonates! I've also prepared a risk register and phased cash flow schedule for Thursday's discussion. This will be a landmark partnership for both organizations. Looking forward to it!",
      time: "Today, 1:15 PM",
      isAI: true,
    },
  ],

  chat: [
    {
      id: 1,
      role: "user",
      text: "Hi, Anita Desai from Desai Group. We're planning a 200-acre township near Bangalore — Phase 1 is ₹40-50 Cr.",
      time: "9:00 AM",
    },
    {
      id: 2,
      role: "ai",
      text: "Welcome Anita! A township of this scale is exactly where precast delivers maximum value:\n\n🏗️ On-site precast plant option — saves 15–20% on transport\n⚡ Parallel production — multiple buildings simultaneously\n📐 Standardized components — reduced design cost across phases\n\nCould you share Phase 1 unit count and community infrastructure requirements?",
      time: "9:00 AM",
    },
    {
      id: 3,
      role: "user",
      text: "500 residential units, a community centre, and 2 schools. Q3 start. Need financial modelling too.",
      time: "9:03 AM",
    },
    {
      id: 4,
      role: "ai",
      text: "Excellent! Here's a quick snapshot:\n\n✅ 500 units — perfect for on-site plant economics\n✅ Community + schools — our mixed-use township experience applies directly\n✅ Q3 start — feasible with 6-week mobilisation\n💰 Preliminary IRR: ~18.4% | Payback: ~2.8 years\n\n📊 Lead Score: 91/100 — Priority opportunity!\n\nI'd like to arrange a meeting with our MD. Available Thursday 3 PM?",
      time: "9:03 AM",
    },
    {
      id: 5,
      role: "user",
      text: "Thursday 3 PM works. Please involve your CFO too for financial discussions.",
      time: "9:06 AM",
    },
    {
      id: 6,
      role: "ai",
      text: "Done! Thursday 3 PM — MD + CFO confirmed on our side.\n\n📧 Full financial model + township proposal sent to your email\n📊 Risk register and phased cash flow included\n📅 Video call link dispatched\n\nThis is going to be a landmark project! See you Thursday 🌆",
      time: "9:06 AM",
    },
  ],

  voice: [
    { time: "0:00", speaker: "AI", text: "Good morning, Anita! SmartBuild AI calling regarding the Bangalore township project. Is this a good time?" },
    { time: "0:08", speaker: "Anita", text: "Yes, briefly. We're very interested." },
    { time: "0:11", speaker: "AI", text: "Wonderful! I wanted to highlight our on-site precast plant model — for 500+ units, setting up a temporary plant on the 200-acre site saves ₹3.8 Cr vs trucking. It also gives you production visibility and zero supply chain risk." },
    { time: "0:26", speaker: "Anita", text: "That's a significant saving. What's the plant setup time and cost?" },
    { time: "0:32", speaker: "AI", text: "Plant setup takes 8–10 weeks and costs approximately ₹2.2 Cr. This is amortised across Phase 1 production, giving net savings of ₹1.6 Cr. Fully owned by SmartBuild — no capital outlay from Desai Group." },
    { time: "0:47", speaker: "Anita", text: "Very attractive. We'll definitely discuss this Thursday." },
    { time: "0:51", speaker: "AI", text: "Perfect! I've added the plant economics to Thursday's agenda. Our CFO will have the full P&L model ready. Thank you, Anita — looking forward to a great partnership!" },
  ],
};

// ── Lead 6 — Vikram Singh (Singh & Co) — score 34 ────────────────────────────

const vikramSingh: LeadConversationData = {
  leadId: 6,
  leadName: "Vikram Singh",
  leadInitials: "VS",
  company: "Singh & Co",
  role: "Director",
  score: 34,

  whatsapp: [
    {
      from: "Vikram Singh",
      text: "Hi, we saw your website. Do you do small retail spaces in Jaipur?",
      time: "2 days ago, 4:30 PM",
    },
    {
      from: "AI Agent",
      text: "Hello Vikram! Yes, we do retail projects of all sizes. Precast is very effective for commercial strips with repetitive bays. What's the sq ft and timeline?",
      time: "2 days ago, 4:30 PM",
      isAI: true,
    },
    {
      from: "Vikram Singh",
      text: "Around 8,000 sq ft, budget ₹5-7 Cr. Not in a hurry.",
      time: "2 days ago, 4:35 PM",
    },
    {
      from: "AI Agent",
      text: "Understood! For a project this size, our standard precast panel system is cost-effective. Let me share a basic information pack and you can reach out when you're ready to take next steps.",
      time: "2 days ago, 4:35 PM",
      isAI: true,
    },
  ],

  email: [
    {
      from: "AI Agent",
      text: "Subject: Retail Space Precast Information — Singh & Co\n\nDear Vikram,\n\nThank you for enquiring. For an 8,000 sq ft retail strip:\n\n• Estimate: ₹5.2 Cr – ₹6.4 Cr\n• Timeline: 6–7 months\n• Jaipur reference available on request\n\nWhen you're ready to explore further, feel free to reply or call our Jaipur office.\n\nBest,\nSmartBuild AI",
      time: "2 days ago, 5:00 PM",
      isAI: true,
    },
    {
      from: "Vikram Singh",
      text: "Thanks, will review and come back.",
      time: "Yesterday, 10:00 AM",
    },
  ],

  chat: [
    {
      id: 1,
      role: "user",
      text: "Vikram Singh, Singh & Co. Looking at precast for a small retail project in Jaipur.",
      time: "4:30 PM",
    },
    {
      id: 2,
      role: "ai",
      text: "Hello Vikram! Happy to help. For retail projects, precast offers:\n\n✅ Fast erection — minimal disruption to adjacent businesses\n✅ Clean aesthetic finishes straight from the mould\n✅ Flexible bay sizes\n\nWhat scale and budget are you working with?",
      time: "4:30 PM",
    },
    {
      id: 3,
      role: "user",
      text: "About 8,000 sq ft, ₹5-7 Cr. Still in early stages.",
      time: "4:32 PM",
    },
    {
      id: 4,
      role: "ai",
      text: "Good to know! At ₹5-7 Cr for 8,000 sq ft we have a comfortable fit.\n\n📊 Lead Score: 34/100 — Early-stage enquiry\n\nI'll send you an information pack for now. When you're closer to a decision, we can set up a detailed consultation. Sound good?",
      time: "4:32 PM",
    },
  ],

  voice: [
    { time: "0:00", speaker: "AI", text: "Good afternoon, Vikram. SmartBuild AI following up on your Jaipur retail enquiry. Is now a good time?" },
    { time: "0:08", speaker: "Vikram", text: "Yes, briefly. We're still early stage." },
    { time: "0:11", speaker: "AI", text: "Understood. I just wanted to make sure you received our information pack and to let you know we have a Jaipur project manager available for a no-obligation site walk when you're ready." },
    { time: "0:22", speaker: "Vikram", text: "That's helpful. We'll probably be more certain in about 2 months." },
    { time: "0:28", speaker: "AI", text: "No problem at all! I'll set a follow-up reminder for 2 months. Reach out anytime before then. Have a great day, Vikram!" },
  ],
};

// ── Lead 7 — Neha Gupta (Gupta Realty) — score 79 ────────────────────────────

const nehaGupta: LeadConversationData = {
  leadId: 7,
  leadName: "Neha Gupta",
  leadInitials: "NG",
  company: "Gupta Realty",
  role: "CEO",
  score: 79,

  whatsapp: [
    {
      from: "Neha Gupta",
      text: "Hello! Neha from Gupta Realty. We're developing an IT park in Hyderabad. Looking for precast specialists.",
      time: "Today, 9:45 AM",
    },
    {
      from: "AI Agent",
      text: "Hi Neha! IT parks are a strong segment for us — column-and-beam precast with raised floors and large spans. Could you share the GFA and number of blocks?",
      time: "Today, 9:45 AM",
      isAI: true,
    },
    {
      from: "Neha Gupta",
      text: "3 blocks, 5 floors each, 1.2 lakh sq ft total. Budget ₹20-25 Cr.",
      time: "Today, 9:50 AM",
    },
    {
      from: "AI Agent",
      text: "Great fit! For IT parks we use long-span precast (up to 12m) enabling column-free open floors — exactly what tech tenants want. I'll send the IT park case study and arrange a technical briefing.",
      time: "Today, 9:50 AM",
      isAI: true,
    },
    {
      from: "Neha Gupta",
      text: "Sounds good. Tomorrow morning?",
      time: "Today, 9:53 AM",
    },
    {
      from: "AI Agent",
      text: "Tomorrow morning confirmed! Case study, span capability datasheet, and Hyderabad RERA compliance note sent. Looking forward to the conversation! 💻",
      time: "Today, 9:53 AM",
      isAI: true,
    },
  ],

  email: [
    {
      from: "AI Agent",
      text: "Subject: IT Park Precast Proposal — Gupta Realty, Hyderabad\n\nDear Neha,\n\nExcited about the IT park opportunity! Here's what we've prepared:\n\n• 3-block, G+4 precast frame proposal with 12m span\n• Cost estimate: ₹21.3 Cr – ₹24.8 Cr\n• Timeline: 16–18 months for all 3 blocks\n• IGBC Green Mark compliance pathway included\n• Reference: Mindspace IT Park Phase 3, Madhapur\n\nLooking forward to tomorrow's briefing.\n\nBest,\nSmartBuild AI",
      time: "Today, 10:00 AM",
      isAI: true,
    },
    {
      from: "Neha Gupta",
      text: "The IGBC pathway is a bonus — our tenants expect green certification. Can precast help achieve this faster?",
      time: "Today, 11:30 AM",
    },
    {
      from: "AI Agent",
      text: "Subject: RE: IGBC Green Mark via Precast\n\nDear Neha,\n\nAbsolutely! Precast contributes to:\n\n• Materials & Resources credits (plant-controlled waste)\n• Innovation credits (offsite manufacturing)\n• IEQ credits (reduced site dust & noise)\n\nThese typically shave 3–4 months off the IGBC certification process. Full credit matrix attached. See you tomorrow!",
      time: "Today, 11:45 AM",
      isAI: true,
    },
  ],

  chat: [
    {
      id: 1,
      role: "user",
      text: "Hi, Neha Gupta from Gupta Realty. We're planning a 1.2 lakh sqft IT park in Hyderabad, ₹20-25 Cr budget.",
      time: "9:45 AM",
    },
    {
      id: 2,
      role: "ai",
      text: "Welcome Neha! IT parks are a sweet spot for long-span precast:\n\n✅ 12m+ column-free spans — ideal for open floor plates\n✅ Precast raised floor cores\n✅ IGBC Green Mark compatible\n✅ Faster occupancy — 16–18 months for 3 blocks\n\nCould you confirm floors per block and any anchor tenant requirements?",
      time: "9:45 AM",
    },
    {
      id: 3,
      role: "user",
      text: "5 floors each, we're targeting a major MNC anchor tenant — they need LEED or IGBC certification.",
      time: "9:48 AM",
    },
    {
      id: 4,
      role: "ai",
      text: "Perfect! Precast specifically accelerates IGBC certification:\n\n🌿 Credits from offsite manufacturing, waste reduction, and IEQ\n⚡ 3-4 months faster certification vs conventional construction\n📊 Lead Score: 79/100 — Strong opportunity\n\nI'd love to schedule a technical briefing. Tomorrow morning?",
      time: "9:48 AM",
    },
    {
      id: 5,
      role: "user",
      text: "Yes, tomorrow 10 AM. Please loop in your sustainability consultant.",
      time: "9:51 AM",
    },
    {
      id: 6,
      role: "ai",
      text: "Done! Tomorrow 10 AM with our structural team + sustainability consultant.\n\n📧 Full proposal + IGBC credit matrix sent to your email\n📅 Calendar invite dispatched\n🌿 Green Mark pathway doc included\n\nSee you tomorrow, Neha!",
      time: "9:51 AM",
    },
  ],

  voice: [
    { time: "0:00", speaker: "AI", text: "Good morning, Neha! SmartBuild AI here. Calling to prepare for tomorrow's IT park briefing. Do you have 2 minutes?" },
    { time: "0:08", speaker: "Neha", text: "Sure, go ahead." },
    { time: "0:10", speaker: "AI", text: "Thank you. For your MNC anchor tenant's IGBC requirement, I wanted to flag that our precast system is already IGBC pre-certified — which means your documentation process is significantly streamlined. We'll have the certification manager on the call tomorrow." },
    { time: "0:24", speaker: "Neha", text: "That's excellent. The anchor tenant's lease is conditional on Green Mark. What rating level can you support?" },
    { time: "0:32", speaker: "AI", text: "We can comfortably target IGBC Gold. With further design optimisations we've achieved Platinum on 2 IT parks. I'll bring both case studies tomorrow." },
    { time: "0:42", speaker: "Neha", text: "Platinum would be a strong differentiator. Please do bring those case studies." },
    { time: "0:48", speaker: "AI", text: "Will do! See you at 10 AM tomorrow, Neha. Have a great evening!" },
  ],
};

// ── Lead 8 — Deepak Nair (Nair Constructions) — score 72 ─────────────────────

const deepakNair: LeadConversationData = {
  leadId: 8,
  leadName: "Deepak Nair",
  leadInitials: "DN",
  company: "Nair Constructions",
  role: "MD",
  score: 72,

  whatsapp: [
    {
      from: "Deepak Nair",
      text: "Hi! We're developing luxury villas in Kochi. Can precast work for high-end residential?",
      time: "Today, 10:30 AM",
    },
    {
      from: "AI Agent",
      text: "Hi Deepak! Absolutely — architectural precast with customised finishes is increasingly popular for luxury villas. We've done timber-look, stone-texture, and white concrete finishes. How many villas and what's the approx build area?",
      time: "Today, 10:30 AM",
      isAI: true,
    },
    {
      from: "Deepak Nair",
      text: "18 villas, each about 3,500 sq ft. Budget ₹12-15 Cr total for structure.",
      time: "Today, 10:35 AM",
    },
    {
      from: "AI Agent",
      text: "Perfect for precast! The repetition across 18 units makes this very economical. Customised façades per villa are also possible. Want to see our luxury residential finish catalogue?",
      time: "Today, 10:35 AM",
      isAI: true,
    },
    {
      from: "Deepak Nair",
      text: "Yes please! And schedule a call for this week.",
      time: "Today, 10:38 AM",
    },
    {
      from: "AI Agent",
      text: "Finish catalogue sent! Friday 2 PM works — I'll also bring digital renders of villa-specific precast facades for Kerala's coastal context. 🏝️",
      time: "Today, 10:38 AM",
      isAI: true,
    },
  ],

  email: [
    {
      from: "AI Agent",
      text: "Subject: Luxury Villa Precast Proposal — Nair Constructions, Kochi\n\nDear Deepak,\n\nFor your 18-villa luxury development, here is our proposal:\n\n• Architectural precast frame + customised panel facades\n• Cost estimate: ₹11.8 Cr – ₹14.2 Cr\n• Timeline: 14 months (all 18 villas)\n• Finish options: exposed board-form, natural stone texture, smooth white concrete\n• Coastal durability: chloride-resistant concrete (IS 456 Exposure E2)\n• Reference: Elysium Lagoon, 22 villas, Trivandrum\n\nFriday 2 PM — can't wait to show you the renders!\n\nWarm regards,\nSmartBuild AI",
      time: "Today, 11:00 AM",
      isAI: true,
    },
    {
      from: "Deepak Nair",
      text: "The coastal durability point is very important — Kochi is near the backwaters. The Trivandrum reference is reassuring.",
      time: "Today, 12:30 PM",
    },
    {
      from: "AI Agent",
      text: "Subject: RE: Coastal Durability Details\n\nDear Deepak,\n\nAbsolutely! For backwater proximity, we use:\n\n• 50 MPa chloride-resistant concrete mix\n• Epoxy-coated rebar\n• Sealant-treated joints\n\nThis gives a design life of 75+ years with minimal maintenance — a strong selling point for your buyers. Full spec note attached. See you Friday!",
      time: "Today, 12:45 PM",
      isAI: true,
    },
  ],

  chat: [
    {
      id: 1,
      role: "user",
      text: "Hi, Deepak Nair, Nair Constructions. We're doing luxury villas in Kochi — can precast deliver high-end finishes?",
      time: "10:30 AM",
    },
    {
      id: 2,
      role: "ai",
      text: "Hello Deepak! Luxury architectural precast is one of our specialities:\n\n🎨 Board-form, stone-texture, and smooth white concrete finishes\n🌊 Coastal-grade chloride-resistant concrete\n🏡 Custom façade panels per villa\n✅ IS 456 Exposure E2 certified\n\nHow many villas and what's the GFA?",
      time: "10:30 AM",
    },
    {
      id: 3,
      role: "user",
      text: "18 villas, 3,500 sqft each. Budget ₹12-15 Cr. Very close to the backwaters.",
      time: "10:33 AM",
    },
    {
      id: 4,
      role: "ai",
      text: "Excellent! Backwater proximity means coastal durability is paramount — we have exactly the right mix design:\n\n✅ 50 MPa chloride-resistant concrete\n✅ Epoxy-coated rebar\n✅ 75+ year design life\n✅ Budget: ₹11.8-14.2 Cr — well within range\n\n📊 Lead Score: 72/100\n\nShall I prepare villa renders and schedule a Friday call?",
      time: "10:33 AM",
    },
    {
      id: 5,
      role: "user",
      text: "Yes, Friday 2 PM. Can you show different facade options digitally?",
      time: "10:36 AM",
    },
    {
      id: 6,
      role: "ai",
      text: "Absolutely! Friday 2 PM confirmed.\n\n🎨 3 facade render options prepared for your Kochi context\n📧 Proposal + coastal spec note sent to email\n📅 Calendar invite dispatched\n\nLooking forward to it, Deepak!",
      time: "10:36 AM",
    },
  ],

  voice: [
    { time: "0:00", speaker: "AI", text: "Good afternoon, Deepak! SmartBuild AI calling ahead of Friday's luxury villa presentation. Is now a good time?" },
    { time: "0:08", speaker: "Deepak", text: "Yes, briefly." },
    { time: "0:10", speaker: "AI", text: "Thank you. I wanted to confirm the 3 facade render styles we're preparing: board-form concrete, natural laterite-texture, and smooth white coastal. Which direction would you like us to explore further?" },
    { time: "0:22", speaker: "Deepak", text: "The laterite texture — that's very Kerala. And the white contemporary. Skip the board-form." },
    { time: "0:29", speaker: "AI", text: "Perfect! Two render directions: laterite-texture for traditional villas and smooth white contemporary for the modern range. I'll also bring material samples Friday so you can feel the finish quality." },
    { time: "0:40", speaker: "Deepak", text: "Excellent. Looking forward to Friday." },
    { time: "0:43", speaker: "AI", text: "Same here! See you Friday at 2 PM, Deepak. Have a great day!" },
  ],
};

// ── Lead 9 — Suman Reddy (Reddy Infra) — score 85 ────────────────────────────

const sumanReddy: LeadConversationData = {
  leadId: 9,
  leadName: "Suman Reddy",
  leadInitials: "SR",
  company: "Reddy Infra",
  role: "CEO",
  score: 85,

  whatsapp: [
    {
      from: "Suman Reddy",
      text: "Hello! Suman from Reddy Infra. We have a major SEZ project coming up in Vizag — ₹30-35 Cr budget.",
      time: "Today, 11:00 AM",
    },
    {
      from: "AI Agent",
      text: "Hi Suman! An SEZ in Vizag — exciting! We've done industrial and SEZ precast across Andhra Pradesh. What's the built-up area and typology — industrial sheds, office blocks, or mixed?",
      time: "Today, 11:00 AM",
      isAI: true,
    },
    {
      from: "Suman Reddy",
      text: "Mixed — 4 lakh sq ft of industrial sheds + 60,000 sq ft of office buildings.",
      time: "Today, 11:05 AM",
    },
    {
      from: "AI Agent",
      text: "Perfect for precast — we can use different systems: large-span precast portal frames for the sheds and column-beam for offices, all from one supplier. I'll get our Vizag team to prepare a full master plan proposal.",
      time: "Today, 11:05 AM",
      isAI: true,
    },
    {
      from: "Suman Reddy",
      text: "This week itself if possible. We're on a fast track.",
      time: "Today, 11:08 AM",
    },
    {
      from: "AI Agent",
      text: "Understood — fast track mode activated! Meeting with our Vizag regional head set for Wednesday 10 AM. Master plan proposal will be ready by then. 🏭",
      time: "Today, 11:08 AM",
      isAI: true,
    },
  ],

  email: [
    {
      from: "AI Agent",
      text: "Subject: SEZ Development Precast Master Plan — Reddy Infra, Vizag\n\nDear Suman,\n\nFor your 4.6 lakh sq ft SEZ development, here is our preliminary master plan:\n\n• Industrial sheds: Portal frame precast, spans up to 24m, clear height 9m\n• Office blocks: G+4 column-beam precast, 1,200 sq ft typical floor plate\n• Combined estimate: ₹31.4 Cr – ₹34.6 Cr\n• Timeline: 18–22 months (phased delivery possible)\n• Reference: Brandix SEZ Phase 2, Atchutapuram (3.8 lakh sq ft)\n\nWednesday 10 AM — our Vizag regional head will present.\n\nBest regards,\nSmartBuild AI",
      time: "Today, 11:30 AM",
      isAI: true,
    },
    {
      from: "Suman Reddy",
      text: "The Brandix reference is very relevant. Can you share the Atchutapuram project photos and structural drawings? We'll review before Wednesday.",
      time: "Today, 1:30 PM",
    },
    {
      from: "AI Agent",
      text: "Subject: RE: Brandix Atchutapuram Project Documents\n\nDear Suman,\n\nSharing the Atchutapuram project pack:\n\n• 45 project photos across construction stages\n• As-built structural drawings (NDA-protected, please acknowledge)\n• Client testimonial from Brandix India\n• Final cost reconciliation (came in 4% under budget)\n\nDocuments attached. See you Wednesday at 10!",
      time: "Today, 1:45 PM",
      isAI: true,
    },
  ],

  chat: [
    {
      id: 1,
      role: "user",
      text: "Hi, Suman Reddy, Reddy Infra. Planning a major SEZ in Vizag — 4 lakh sqft industrial + 60k sqft office. Budget ₹30-35 Cr.",
      time: "11:00 AM",
    },
    {
      id: 2,
      role: "ai",
      text: "Welcome Suman! This is exactly the kind of large-scale project where precast delivers transformative results:\n\n🏭 Industrial sheds: Portal frames up to 24m span, 9m clear height\n🏢 Office blocks: Column-beam, column-free floors\n🔗 Single supplier for both typologies — design coordination advantage\n⚡ Phased delivery for early occupancy\n\nWhat's your desired possession date for Phase 1?",
      time: "11:00 AM",
    },
    {
      id: 3,
      role: "user",
      text: "Phase 1 (sheds) by month 14. Office blocks can follow. We're fast track.",
      time: "11:03 AM",
    },
    {
      id: 4,
      role: "ai",
      text: "Fast track is our specialty!\n\n✅ Industrial sheds Phase 1: 14 months — achievable\n✅ Office blocks Phase 2: months 12-22 (overlapping)\n✅ Budget ₹31.4-34.6 Cr — fits your range\n\n📊 Lead Score: 85/100 — High priority!\n\nCan we meet this week with our Vizag regional head?",
      time: "11:03 AM",
    },
    {
      id: 5,
      role: "user",
      text: "Wednesday 10 AM. Please bring the Atchutapuram case study.",
      time: "11:06 AM",
    },
    {
      id: 6,
      role: "ai",
      text: "Wednesday 10 AM — confirmed!\n\n📧 Full SEZ master plan + Atchutapuram documents sent to email\n📅 Calendar invite dispatched\n👤 Vizag regional head + structural lead will attend\n\nSee you Wednesday, Suman! 🏭",
      time: "11:06 AM",
    },
  ],

  voice: [
    { time: "0:00", speaker: "AI", text: "Good morning, Suman! SmartBuild AI calling to prepare for Wednesday's SEZ presentation. Is this a good time?" },
    { time: "0:08", speaker: "Suman", text: "Yes, quickly." },
    { time: "0:10", speaker: "AI", text: "Thank you. I wanted to confirm the site constraints for Vizag. Is the SEZ plot in the Brandix corridor near Atchutapuram, or a different industrial zone?" },
    { time: "0:20", speaker: "Suman", text: "It's in the VSEZ — Visakhapatnam SEZ, near Bheemunipatnam. Coastal exposure." },
    { time: "0:28", speaker: "AI", text: "Excellent. Coastal exposure means we'll use our marine-grade precast with higher concrete cover and epoxy-coated connections — same system used at the Gangavaram Port project. I'll update the proposal accordingly before Wednesday." },
    { time: "0:40", speaker: "Suman", text: "Very good. See you Wednesday." },
    { time: "0:43", speaker: "AI", text: "Looking forward to it! Marine-grade specs will be in the updated proposal by tomorrow EOD. Wednesday 10 AM — see you then, Suman!" },
  ],
};

// ── Lead 10 — Kavya Iyer (Iyer Developers) — score 41 ────────────────────────

const kavyaIyer: LeadConversationData = {
  leadId: 10,
  leadName: "Kavya Iyer",
  leadInitials: "KI",
  company: "Iyer Developers",
  role: "Director",
  score: 41,

  whatsapp: [
    {
      from: "Kavya Iyer",
      text: "Hi! We're planning a retail strip in Chennai. Is precast suitable for a small project?",
      time: "1 day ago, 3:00 PM",
    },
    {
      from: "AI Agent",
      text: "Hi Kavya! Yes, precast works well for retail strips of any size. What's the approximate area and budget?",
      time: "1 day ago, 3:00 PM",
      isAI: true,
    },
    {
      from: "Kavya Iyer",
      text: "Around 10,000 sq ft, ₹6-8 Cr. G+1 structure.",
      time: "1 day ago, 3:05 PM",
    },
    {
      from: "AI Agent",
      text: "Good scope! For a G+1 retail strip, precast gives you a clean shop-front aesthetic and very fast erection — typically 8-10 weeks. I'll send our retail strip brochure for Chennai.",
      time: "1 day ago, 3:05 PM",
      isAI: true,
    },
    {
      from: "Kavya Iyer",
      text: "Thanks, will review.",
      time: "1 day ago, 3:10 PM",
    },
  ],

  email: [
    {
      from: "AI Agent",
      text: "Subject: Retail Strip Precast Proposal — Iyer Developers, Chennai\n\nDear Kavya,\n\nFor your 10,000 sq ft G+1 retail strip:\n\n• Precast frame + architectural façade panels\n• Estimate: ₹6.1 Cr – ₹7.4 Cr\n• Erection timeline: 8–10 weeks\n• Reference: OMR Retail Hub, 12,000 sq ft, Chennai\n• CMDA structural drawings support available\n\nLet me know when you'd like to take next steps!\n\nBest,\nSmartBuild AI",
      time: "1 day ago, 3:30 PM",
      isAI: true,
    },
    {
      from: "Kavya Iyer",
      text: "Thank you. Still evaluating options. Will come back in a few weeks.",
      time: "Today, 10:00 AM",
    },
  ],

  chat: [
    {
      id: 1,
      role: "user",
      text: "Hi, Kavya Iyer from Iyer Developers. Looking at a small retail strip in Chennai — 10,000 sqft G+1.",
      time: "3:00 PM",
    },
    {
      id: 2,
      role: "ai",
      text: "Hello Kavya! A G+1 retail strip is a great application for precast:\n\n✅ Clean, modern shopfront aesthetics\n✅ Fast erection — 8–10 weeks\n✅ No plastering or brickwork delays\n✅ CMDA approval support available\n\nWhat's your budget and target opening date?",
      time: "3:00 PM",
    },
    {
      id: 3,
      role: "user",
      text: "Budget ₹6-8 Cr. Still evaluating, no firm date yet.",
      time: "3:03 PM",
    },
    {
      id: 4,
      role: "ai",
      text: "Understood! Budget fits comfortably at ₹6.1-7.4 Cr.\n\n📊 Lead Score: 41/100 — Early-stage\n\nI'll send you the information pack and our Chennai retail reference. Reach out whenever you're ready to explore further!",
      time: "3:03 PM",
    },
  ],

  voice: [
    { time: "0:00", speaker: "AI", text: "Good afternoon, Kavya. SmartBuild AI following up on your Chennai retail strip enquiry. Got a moment?" },
    { time: "0:08", speaker: "Kavya", text: "Yes, briefly. We're still early." },
    { time: "0:11", speaker: "AI", text: "Absolutely, no pressure. I just wanted to mention that our Chennai team is currently finishing an OMR retail project — if you'd like a site visit to see precast quality firsthand, we can arrange that whenever it suits you." },
    { time: "0:23", speaker: "Kavya", text: "That's actually useful. Can we do it next week?" },
    { time: "0:28", speaker: "AI", text: "Definitely! I'll coordinate with the OMR project team and send you 2-3 slot options by tomorrow. It'll be a great way to evaluate the finish quality before committing." },
    { time: "0:38", speaker: "Kavya", text: "Sounds good. Please send the slots." },
    { time: "0:41", speaker: "AI", text: "Will do! Expect an email by tomorrow morning with the visit options. Have a great day, Kavya!" },
  ],
};

// ── Master export ──────────────────────────────────────────────────────────────

export const allLeadConversations: LeadConversationData[] = [
  rajeshMehta,
  priyaShah,
  arjunPatel,
  sureshKumar,
  anitaDesai,
  vikramSingh,
  nehaGupta,
  deepakNair,
  sumanReddy,
  kavyaIyer,
];

export const leadConversationMap: Record<number, LeadConversationData> = Object.fromEntries(
  allLeadConversations.map((l) => [l.leadId, l])
);
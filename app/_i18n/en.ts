export const en = {
  nav: {
    calculator: "MRR Calculator",
    services: "Services",
    infrastructure: "Infrastructure",
    performance: "Performance",
    partnership: "Operating Model",
    faq: "FAQ",
    help: "Help",
    about: "About",
    book: "Book",
    bookCta: "Book Strategy Call",
    language: "Language",
  },
  footer: {
    blurb: "The revenue infrastructure behind creator-led businesses.",
    bookCta: "Book Strategy Call",
    platform: "Platform",
    services: "Services",
    company: "Company",
    about: "About",
    faq: "FAQ",
    contact: "Initiate",
    monetization: "Monetization Architecture",
    intelligence: "Audience Intelligence",
    operations: "Agentic Operations",
    retention: "Retention Engineering",
    strategyCall: "Strategy Call",
    rights: "All rights reserved.",
    built: "Built for creators",
    expertsIn: "Experts in:",
  },
  help: {
    close: "Close",
    closeDialog: "Close dialog",
    title: "Not sure where to start?",
    paths: [
      {
        title: "Install the infrastructure",
        href: "/book",
      },
      {
        title: "See what the audience is worth",
        href: "/calculator",
      },
      {
        title: "A question first",
        href: "/faq",
      },
    ],
  },
  calc: {
    title: "Infrastructure Leak",
    ready: "Ready",
    analyzing: "Analyzing",
    live: "Live",
    q1: "Audience size",
    q1hint:
      "Followers, subscribers, or the audience already attached to your name.",
    followers: "Audience size",
    followersValue: "people",
    q2: "Current monthly revenue",
    q2hint: "What the business actually collects in a typical month. Zero is fine.",
    revenueLabel: "Current monthly revenue",
    q3: "Owned audience (email / SMS)",
    q3hint:
      "People you can reach without the algorithm. Type the number you actually have.",
    contacts: "contacts",
    listLabel: "Owned audience (email / SMS)",
    q4: "How the audience pays you now",
    q4hint: "How money comes in today, even if it is inconsistent. Select one.",
    q5: "Primary platform",
    q5hint: "Where the audience lives today. Select one.",
    q6: "Where does a new follower land?",
    q6hint: "After they follow. Before anyone pays you. Select one.",
    q7: "Backend automation status",
    q7hint: "How inbound is handled after someone finds you. Select one.",
    q8: "Churn and failed payments",
    q8hint: "Whether failed Stripe charges and cancellations are being recovered.",
    platform: {
      instagram: "Instagram",
      tiktok: "TikTok",
      youtube: "YouTube",
      linkedin: "LinkedIn",
    },
    delivery: {
      none: "Nothing yet",
      brand: "Brand deals",
      digital: "Digital products",
      subscriptions: "Subscriptions",
      coaching: "Coaching / services",
    },
    landing: {
      feed: "They stay in the feed",
      bio: "A link in bio",
      owned: "A list I own",
    },
    automation: {
      automated: "Fully Automated",
      bio: "Basic Link-in-Bio",
      manual: "Manual DMs",
      nothing: "Nothing",
    },
    retentionStatus: {
      recovered: "Actively Recovered",
      untracked: "I don't track this",
    },
    of: "of",
    needNumber: "Enter a number to continue.",
    needChoice: "Select one to continue.",
    progressLabel: "Estimate progress",
    cta: "Generate Leak Report",
    metaTitle: "MRR Calculator — Open System",
    metaDescription:
      "See the monthly revenue currently going uncaptured. Audience size is enough. No email required.",
    pageBody:
      "We estimate the monthly revenue currently going uncaptured — capture, follow-up, and retention. Audience size is enough. No email required.",
    pageEstimate:
      "The number is an estimate, not a quote. It models capture, follow-up, and retention against the audience you already have. No email required.",
    pageBeats: [
      {
        title: "Your current setup",
        body: "Audience, how you sell, and how inbound is handled today. Enough to estimate the leak.",
      },
      {
        title: "A leak report, not a quote",
        body: "We break uncaptured MRR into capture, follow-up, and retention — with a diagnosis for each leak and what would close it.",
      },
      {
        title: "Then decide",
        body: "If you want the systems installed, book a strategy call. The report is the first look. The engagement is optional.",
      },
    ],
    runMetaTitle: "Infrastructure Leak — Open System",
    runMetaDescription:
      "Estimate the monthly revenue currently going uncaptured. Audience size is enough. No email required.",
    next: "Next",
    back: "Back",
    lockedLabel: "Uncaptured monthly MRR",
    lockedBody:
      "You do not need an offer yet. Audience size is enough to estimate what is uncaptured.",
    floatTitle: "Uncovered Revenue Leak",
    floatBody:
      "Calculate how much monthly recurring revenue your current systems are missing.",
    floatCta: "Run Estimate",
    floatDismiss: "Dismiss",
    processingTitle: "Building your leak report",
    processingBody:
      "We are mapping owned reach, inbound handling, and whether failed payments are being recovered.",
    steps: [
      "Reading the audience",
      "Measuring owned reach",
      "Scoring capture",
      "Modeling follow-up",
      "Checking retention",
      "Writing the report",
    ],
    reportLabel: "Leak Report",
    leakLabel: "Uncaptured every month",
    leakFront: "Capture",
    leakOps: "Follow-up",
    leakRetention: "Retention",
    aYear: "leaves over the next twelve months if nothing is installed",
    today: "What you collect today",
    uncapturedBar: "What you are missing",
    canReach: "owned contacts, out of",
    findingsTitle: "Where it is leaking",
    installLabel: "What closes it",
    findings: {
      listGap: "Most of the following is not a contact you can sell to.",
      lowOwned: "Owned reach is under 10% of the audience.",
      timeBound: "Follow-up still depends on your time, not a system.",
      untracked: "Failed payments leave without a recovery pass.",
      noOffer: "There is no recurring offer under the attention.",
      brandReset: "Revenue resets when the next brand deal is not booked.",
      feedDeath: "New followers stay in the feed instead of entering a system.",
      bioOnly: "The owned path is a static link in bio — not a capture system.",
    },
    lost: {
      capture:
        "{uncaptured} people in the {audience} audience are not a record you own. {platform} traffic dies in the feed or a static bio. That gap is {amount} / month that never reaches checkout.",
      captureFix:
        "Intake funnel, application, and CRM so a click becomes owned data — not a follower who disappears.",
      followup:
        "Inbound still waits on you. DMs, comments, and form fills sit until you get to them. That delay is {amount} / month that never gets a second touch or a route to checkout.",
      followupZero:
        "You are not collecting monthly revenue yet, and inbound still sits until you handle it. Unanswered demand from this audience is {amount} / month left on the table.",
      followupFix:
        "Qualification agents and a GoHighLevel pipeline that vets intent and sends high-fit buyers to a call or paywall without you in the thread.",
      retention:
        "Failed Stripe charges are not being recovered. Against {revenue} / month in current revenue, that is {amount} walking out before anyone sees the card failed.",
      retentionFix:
        "Dunning, win-back sequences, and a living retention score that acts before the cancellation request lands.",
    },
    clear: {
      capture:
        "Capture is contained. New attention is already converting into a list you own, so the intake leak is not the primary gap.",
      captureFix:
        "Keep the owned path. The remaining work is downstream — follow-up and recovery.",
      followup:
        "Follow-up is running as a system. Inbound is not sitting in DMs waiting on you, so there is no estimated leak from unanswered demand.",
      followupFix:
        "Leave routing in place. Pressure moves to capture quality and failed-payment recovery.",
      retention:
        "Failed payments are being recovered. Churn is treated as a process, so the retention leak is contained on current revenue.",
      retentionFix:
        "Keep recovery live. The remaining value is in capture and the first follow-up.",
    },
    verdict: {
      none: "The audience is already there. There is no checkout path and no owned list large enough to sell into. Attention hits the feed and stops.",
      brand:
        "Brand deals reset to zero. There is no recurring checkout under the following, so every month starts over.",
      digital:
        "The product sells once. There is no place for buyers to stay and keep paying, so revenue does not compound.",
      subscriptions:
        "The membership model is right, but most of the audience never enters it. Capture is the leak.",
      coaching:
        "Coaching is capped by your calendar. The rest of the audience has no way to buy without a call.",
    },
    plugCta: "Book Strategy Call",
    homeCta: "Back to homepage",
    gapTitle: "This number repeats every month.",
    gapBody:
      "Capture, follow-up, and recovery are not installed. Until they are, this revenue stays uncaptured. We wire the stack. You stay on content.",
    recalculate: "Recalculate",
  },
  book: {
    label: "Strategy Call",
    title: "Book a strategy call.",
    titleAccent: "We will review your setup.",
    body: "Thirty minutes. We review your audience, your current offer, and whether it makes sense to install the infrastructure.",
    call: "The call",
    covers: "What the call covers",
    beats: [
      {
        title: "Map the stack",
        body: "Where members, payments, and recovery actually live today.",
      },
      {
        title: "Size the gap",
        body: "The monthly revenue already inside the following — uncaptured.",
      },
      {
        title: "Decide the engagement",
        body: "If the fit is there, the build starts the following week.",
      },
    ],
    four: "Four engagements per quarter.",
    request: "Request a time",
    tellUs: "Tell us where you are.",
    name: "Name",
    namePlaceholder: "Your name",
    email: "Email",
    audience: "Audience size",
    sell: "How you sell today",
    note: "Anything we should know",
    optional: "Optional",
    submit: "Request Strategy Call",
    loading: "Loading Calendar...",
    choose: "Choose a slot.",
    chooseBody: "Thirty minutes. Name and email are already filled in.",
    audienceOpts: ["Under 50K", "50K – 150K", "150K – 500K", "500K+"],
    deliveryOpts: [
      "Nothing yet",
      "Low-ticket products",
      "A course",
      "1:1 coaching",
      "A membership",
    ],
  },
  thanks: {
    label: "Confirmed",
    title: "Thank you for booking.",
    titleAccent: "We'll contact you shortly.",
    body: "The strategy call is on the calendar. A confirmation is on its way to your inbox — we will review your intake before we meet.",
    next: "What happens next",
    steps: [
      {
        title: "The invite",
        body: "Check your email for the calendar hold and the call link.",
      },
      {
        title: "We prepare",
        body: "We read the intake — audience, how you sell, anything you flagged.",
      },
      {
        title: "Thirty minutes",
        body: "We review where revenue is being lost and decide if the infrastructure is worth installing.",
      },
    ],
    home: "Back home",
    faq: "Read the FAQ",
  },
  notFound: {
    label: "404",
    title: "Dead End.",
    body: "This node does not exist in the system.",
    home: "Return to Operations",
    book: "Book Strategy Call",
  },
  home: {
    label: "Creator Revenue Infrastructure",
    heroTitle: "You own the attention.",
    heroAccent: "We build the engine.",
    heroBody:
      "We are the revenue infrastructure behind creator-led businesses. Existing attention, turned into compounding enterprise value.",
    bookCta: "Book Strategy Call",
    calcCta: "Calculate Missing Revenue",
    servicesCta: "See the services",
    detailsOpen: "Expand",
    detailsClose: "Close",
    trusted: "Operating exclusively with high-leverage creators (20k+ audience).",
    fromPractice: "From the practice",
    testimonials: [
      {
        quote:
          "We stopped launching. The membership just renews. That was the whole point.",
        name: "Maya Chen",
        detail: "Fitness · 240K",
      },
      {
        quote:
          "Failed payments were the leak. They recovered them before I knew people were leaving.",
        name: "James Okonkwo",
        detail: "Business education · 410K",
      },
      {
        quote:
          "I still make the content. They run the backend. First month it felt like a different company.",
        name: "Elena Voss",
        detail: "Beauty · 520K",
      },
      {
        quote:
          "The storefront closed without me. That was the first week I believed it.",
        name: "Sam Rivera",
        detail: "Personal finance · 95K",
      },
      {
        quote:
          "Paid only started after the backend held. That order is the whole engagement.",
        name: "Noah Park",
        detail: "Creative studio · 120K",
      },
      {
        quote: "I thought we had a membership. We had a leak. They closed it.",
        name: "Aisha Rahman",
        detail: "Faith & lifestyle · 180K",
      },
    ],
    calcLabel: "Revenue estimate",
    calcTitle: "See what the audience",
    calcTitleAccent: "is currently worth.",
    calcBody:
      "We install the systems that capture, convert, and retain revenue. This estimate shows the monthly amount currently going uncaptured. No email required.",
    teaserTitle: "Discover your uncaptured revenue.",
    teaserBody:
      "Find out exactly how much monthly recurring revenue is leaking from your current systems.",
    teaserCta: "Launch Calculator",
    scaleLabel: "The practice",
    scaleTitle: "We operate globally.",
    scaleTitleAccent: "One infrastructure.",
    scaleBody:
      "Creator businesses across markets. Audience, checkout, and recovery running as the same system — not a local agency stack.",
    scaleLive: "Systems online",
    scaleFoot:
      "North America, Europe, the Gulf, and APAC. The operating layer does not change with the time zone.",
    scaleStats: [
      {
        value: 62,
        decimals: 0,
        prefix: "",
        suffix: "M+",
        label: "Views attributed",
        detail: "On the properties we operate — not rented reach.",
      },
      {
        value: 2.5,
        decimals: 1,
        prefix: "",
        suffix: "M+",
        label: "Audience reach",
        detail: "Combined following across the twelve live systems.",
      },
      {
        value: 3.8,
        decimals: 1,
        prefix: "$",
        suffix: "M+",
        label: "Revenue processed",
        detail: "Checkout, plans, and recovered MRR this year.",
      },
      {
        value: 12,
        decimals: 0,
        prefix: "",
        suffix: "",
        label: "Systems live",
        detail: "Creator businesses with the stack installed now.",
      },
    ],
    scaleMarkets: [
      "New York",
      "Los Angeles",
      "London",
      "Dubai",
      "Toronto",
      "Berlin",
      "Singapore",
      "Sydney",
      "Miami",
      "Lisbon",
    ],
    servicesLabel: "Services",
    serviceKicker: "Service",
    servicesTitle:
      "The revenue infrastructure behind creator businesses.",
    servicesTitleAccent: "",
    servicesBody: "Four systems. You make content. We run the rest.",
    pillars: [
      {
        title: "Audience Intelligence",
        summary:
          "Your audience is a comment section, not a database. We turn it into one.",
        deliverables: [
          "Buyer qualification",
          "Intake and application",
          "Checkout and payment plans",
        ],
      },
      {
        title: "Monetization Architecture",
        summary:
          "A Stripe link and a Skool page isn't a system. We build the one that runs itself.",
        deliverables: [
          "High-ticket offer design",
          "Community deployment",
          "Positioning and promise",
        ],
      },
      {
        title: "Agentic Operations",
        summary:
          "Every unanswered DM is money you already made. We make sure it gets collected.",
        deliverables: [
          "Master CRM",
          "Revenue automations",
          "Failed-payment recovery",
        ],
      },
      {
        title: "Retention Engineering",
        summary:
          "Members don't cancel loudly — they go quiet. We catch it before you would.",
        deliverables: ["Churn recovery", "Activation sequences", "Paid scale"],
      },
    ],
    pillarNames: {
      Strategy: "Strategy",
      Backend: "Backend",
      Retention: "Retention",
      Amplifier: "Amplifier",
    },
    stackLabel: "The operating stack",
    stackTitle: "The systems we install",
    stackTitleAccent: "and operate.",
    stackBody: "Installed, monitored, and documented so the business can run them.",
    typicalMember: "Typical member price",
    typicalValue: "$2,000 / mo",
    recovered: "recovered",
    stack: [
      {
        title: "High-Ticket Offer Architecture",
        description:
          "We design the financial plumbing for high-ticket applications and recurring memberships.",
        detail:
          "The offer, the price, and the promise sit in one structure the rest of the stack can run — not a custom pitch every time.",
      },
      {
        title: "Community Deployment",
        description:
          "Whop and Skool ecosystem staging. Tiers, access cadences, and weekly rhythms designed as a compounding asset.",
        detail:
          "Access, cadence, and what members receive each month are specified as part of the system, not left informal.",
      },
      {
        title: "Storefront",
        description: "A checkout that closes without a call.",
        detail:
          "We build the offer page, the application, and the checkout path so a qualified buyer can pay without waiting on you. Plan selection, order bumps, and confirmation live on one surface.",
      },
      {
        title: "Intake & Qualification",
        description: "Unqualified buyers are filtered before they reach you.",
        detail:
          "Autonomous intake that asks the questions that matter, scores intent, and routes high-fit buyers forward. Tire-kickers get a clean no. High-ticket applicants land in the right lane before a call is booked.",
      },
      {
        title: "Payment Plans",
        description: "High-ticket offers can be paid in installments.",
        detail:
          "We install the billing logic — deposits, installments, and recurring collection — so cash flow is designed, not improvised. Plan changes and failed charges are handled in the same system as the offer.",
      },
      {
        title: "The Master CRM",
        description:
          "One centralized record per member. Payment history, status, and conversational context living in one source of truth. No spreadsheet exports.",
        detail:
          "Operators and automations read the same source. Plan, status, and where they came from — one record.",
      },
      {
        title: "Agentic Operations",
        description: "Checkout, CRM, and messaging run without your daily involvement.",
        detail:
          "We wire checkout, CRM, and outbound into agents that qualify, follow up, and update records without a VA in the loop. The work that used to sit in your DMs runs as infrastructure.",
      },
      {
        title: "Churn Recovery",
        description: "Members receive a save path before they cancel.",
        detail:
          "Sequences that fire on cancel intent, usage drop, and renewal windows. The save offer, the pause option, and the reason capture are specified — so churn is a process, not a surprise.",
      },
      {
        title: "Failed Payment Recovery",
        description: "Revenue you already earned, brought back automatically.",
        detail:
          "Dunning that retries, notifies, and recovers cards before the member is marked lost. Recovery is an operating system we install — not a dashboard you check after the money is gone.",
      },
      {
        title: "Onboarding & Activation",
        description: "New members see value in the first week.",
        detail:
          "The first-week path: access, a first result, and a recurring ritual. We specify what happens at hour one, day three, and day seven so new members stay active.",
      },
      {
        title: "Creative System",
        description: "Winning angles stay in rotation.",
        detail:
          "A working library of proven angles, offers, and assets — with a cadence for testing new ones. Creative doesn't reset every campaign. What converted last month stays in the stack.",
      },
      {
        title: "Paid Scale",
        description: "Ad spend is set against a known member value.",
        detail:
          "Once LTV and payback are known, we set a ceiling for paid acquisition. Campaigns, audiences, and spend rules sit on top of retention math so scale is planned.",
      },
      {
        title: "Attribution",
        description:
          "Member-level tracking from first touch to paid plan. Eliminate vanity metrics and identify exactly which funnels yield enterprise revenue.",
        detail:
          "You see which content, lists, and paths produced members who paid — not clicks that never converted.",
      },
      {
        title: "Retention Scoring",
        description:
          "A living health score on engagement and risk. Autonomous agents act on members about to churn before the cancellation request ever lands.",
        detail:
          "Engagement, payment health, and risk in one score. Operators and agents act before the cancel request lands.",
      },
      {
        title: "Documentation & Handover",
        description:
          "Every workflow is documented so the business can run without us in the room.",
        detail:
          "The stack is documented as an operating system: what runs, who owns it, and how to change it. When we step back, the infrastructure stays.",
      },
    ],
    proofLabel: "Performance",
    proofTitle: "What the system looks like",
    proofTitleAccent: "when it is running.",
    proofBody: "Members, payments, and recovery — running as one surface.",
    standardTitle: "The Backend Standard",
    standardAccent: "Engineering predictable revenue.",
    leakLabel: "The Leak",
    systemLabel: "The System",
    beforeAfter: [
      {
        leak: "Manual DM outreach",
        system: "Automated lead qualification",
      },
      {
        leak: "Dead link-in-bio traffic",
        system: "Owned email acquisition",
      },
      {
        leak: "Unmonitored failed payments",
        system: "Algorithmic churn recovery",
      },
      {
        leak: "Renting algorithms",
        system: "Owned asset valuation",
      },
    ],
    clientTags: [
      "Fitness · 240K",
      "Business education · 410K",
      "Creative studio · 120K",
      "Faith & lifestyle · 180K",
      "Personal finance · 95K",
      "Beauty · 520K",
      "Music production · 310K",
      "Gaming · 640K",
    ],
    proofTrust:
      "Operating exclusively with high-leverage creators (20k+ audience).",
    proofCta: "Book Strategy Call",
    partnerLabel: "The Operating Model",
    partnerTitle: "Tied to your growth.",
    partnerTitleAccent: "You own the attention.",
    partnerPitch:
      "We operate on performance baselines and revenue-share models. If our infrastructure does not successfully expand your monthly recurring revenue, we do not expand the engagement. Zero technical debt. Pure operational alignment.",
    partnerPipeline: [
      {
        step: "01",
        kicker: "The Infrastructure Audit",
        title: "Map the Leaks.",
        body: "We do not guess. We map your current attention flow, auditing your link-in-bio, inbound DM volume, and calendar drop-offs to mathematically identify exactly where revenue is slipping through the cracks.",
      },
      {
        step: "02",
        kicker: "Deployment & Wiring",
        title: "Deploy the Engine.",
        body: "We build the custom architecture. We integrate GoHighLevel CRM, wire the Zapier webhooks, and deploy AI qualification agents to turn manual follow-ups into an automated, zero-latency machine.",
      },
      {
        step: "03",
        kicker: "Fractional Operation",
        title: "Run the Backend.",
        body: "Software decays without an operator. We integrate directly into your business to monitor the pipelines daily, handle technical troubleshooting, and systematically rescue failed Stripe payments. You shoot content; we manage the friction.",
      },
    ],
    partnerPoints: [
      {
        label: "01",
        title: "Traffic & Intake",
        body: "We engineer the automated systems that capture inbound traffic. From link-in-bio funnels to calendar setups, we plug the leaks where attention fails to convert into owned data.",
      },
      {
        label: "02",
        title: "Qualification & Routing",
        body: "Software is useless if it requires your time. We deploy AI qualification agents and automated GoHighLevel pipelines to vet leads in your DMs and route them directly to checkout or sales calls.",
      },
      {
        label: "03",
        title: "Retention & Recovery",
        body: "A business is valued on its Annual Recurring Revenue. We implement algorithmic churn recovery and systematic follow-ups to rescue failed Stripe payments and compound your enterprise valuation.",
      },
    ],
    partnerCardTitle: "We are responsible for the result, not just the software.",
    partnerP1: "We run the backend. You own the attention.",
    partnerP2:
      "We don't sell you software to run. We run it for you. Every month, we handle the backend — the leads, the follow-up, the failed payments — and a person checks the work before you ever see it. You pay for the result. Not the access.",
    partnerCta: "Audit Your Infrastructure",
    partnerBento: [
      {
        title: "Map the Leaks",
        pain: "You rent attention. You don't capture it.",
        body: "We find exactly where it's leaking — link-in-bio, DMs, calendar. You don't audit anything. We hand you the number, and what it's costing you.",
      },
      {
        title: "Deploy the Engine",
        pain: "You don't need a CRM. You need it handled.",
        body: "We install the qualification, the follow-up, the checkout — then we run all of it. No dashboard to learn. No software to manage. Just the job, done.",
      },
      {
        title: "Run the Backend",
        pain: "Software rots. Operators don't.",
        body: "Cards expire, tools break, leads go cold. We catch it first — a system watching, a person checking — every day, for as long as you're growing.",
      },
      {
        title: "Tied to your growth.",
        body: "Pure operational alignment. We operate on performance baselines and revenue-share models. If our infrastructure does not scale your monthly recurring revenue, we do not expand the engagement.",
      },
    ],
    engagement: "Engagement model",
    phases: [
      {
        phase: "Phase I: The Map",
        timing: "Week 1",
        detail:
          "We map your current revenue leakage. We identify the exact gaps between your audience's attention and your bank account.",
      },
      {
        phase: "Phase II: Deployment",
        timing: "Weeks 2–4",
        detail:
          "We stage the architecture. We wire the CRMs, deploy the qualification agents, and transition your audience into the new ecosystem.",
      },
      {
        phase: "Phase III: Compounding",
        timing: "Ongoing",
        detail:
          "We run the systems after they are installed. We optimize retention, recover lost payments, and grow lifetime value with you.",
      },
    ],
    skillsLabel: "Mechanics",
    skillsTitle: "How the engagement works",
    skills: [
      {
        title: "Fees tied to results",
        body: "We operate on a rev-share or a baseline retainer. If the infrastructure does not grow your monthly recurring revenue, we do not expand the engagement.",
      },
      {
        title: "Less work on your plate",
        body: "Your role is content and audience. We handle routing, the tech stack, and troubleshooting.",
      },
      {
        title: "Immediate bottleneck fix",
        body: "We deploy a first improvement as soon as the engagement begins—such as recovering a dormant email list or a high-ticket DM script.",
      },
      {
        title: "You own your data",
        body: "You own your list, your community, and your Stripe account. We manage the data. We do not lock you out of it.",
      },
      {
        title: "Operations stay off your inbox",
        body: "Failed payments, technical support, and day-to-day operational issues are routed into our systems instead of your inbox.",
      },
      {
        title: "We use the tools your model needs",
        body: "We are not tied to one software vendor. We assemble the combination of tools and custom APIs that fit your business.",
      },
      {
        title: "A clear weekly update",
        body: "You receive a structured Friday summary covering lifetime value, recovered churn, and net new monthly recurring revenue. No open-ended Slack threads.",
      },
      {
        title: "A full operating team",
        body: "You get the output of a growth team, run behind the scenes by our operators.",
      },
    ],
    partnerRecovered: "recovered",
    partnerRecoveredLabel: "Failed payments",
    partnerTrendLabel: "Your role",
    partnerTrendNote:
      "You stay focused on content and the audience. We build and run the systems that capture the rest.",
    partnerOperateLabel: "Our role",
    partnerOperateItems: [
      "Complete management of the intake and checkout flow.",
      "Continuous split-testing of pricing and offer tiers.",
      "Handling all failed payments and involuntary churn.",
      "Architecting the AI agents that qualify your DMs.",
    ],
    mapTitle: "Start with a strategy call",
    mapBody: "In the first week we map your stack and show where revenue is being lost.",
    fourEngagements: "Four engagements per quarter",
  },
  os: {
    synced: "Synced",
    tabs: ["Revenue", "Members", "Recovery"],
    recurring: "Recurring revenue",
    thisMonth: "18.4% this month",
    members: "Active members",
    tiers: "Across three tiers",
    recovered: "Revenue recovered",
    failedCards: "Failed cards and win-backs",
    churn: "Monthly churn",
    downFrom: "Down from 9.1%",
    trend: "Revenue trend",
    last12: "Last 12 months",
    activity: "Activity",
    events: [
      { event: "Payment recovered", source: "Checkout" },
      { event: "New member — Inner Circle", source: "Checkout" },
      { event: "Win-back SMS sent to 24 members", source: "Automations" },
      { event: "Member record synced", source: "CRM" },
      { event: "Failed card retry scheduled", source: "Automations" },
      { event: "Application approved", source: "Intake funnel" },
    ],
  },
  about: {
    label: "About",
    title: "We build creator revenue infrastructure.",
    titleAccent: "",
    body: "Open System is the operating layer behind creator-led businesses. We install the systems that capture, convert, and retain revenue — and we run them after they are live.",
    whoWeAre: "Who we are",
    whoWeAreBody:
      "A fractional growth operator. Not an agency, and not a software vendor. We stay in the background. You remain the public brand. Operators run intake, checkout, recovery, and retention as one backend.",
    started: "When it started",
    startedBody:
      "The work began inside creator businesses that already had an audience and still leaked revenue. Open System is that operating practice, built as infrastructure: one engagement, one team, one system.",
    mission: "The mission",
    missionBody:
      "Build the missing revenue layer for creator-led companies. Capture demand, convert it, recover what would have been lost, and retain members — so existing attention compounds into enterprise value.",
    how: "How we work",
    hold: "We install the systems and operate them.",
    principles: [
      {
        title: "We are responsible for results",
        body: "We do not hand over a dashboard or charge only for advice. We operate as a fractional growth team, with fees tied to performance.",
      },
      {
        title: "You focus on the audience",
        body: "You create content and stay in front of your community. We handle routing, payment recovery, and the technical systems.",
      },
      {
        title: "You get a full operating team",
        body: "Operators run the work behind the scenes so you can stay on camera.",
      },
      {
        title: "We grow only when you grow",
        body: "We work on a rev-share or a baseline retainer. If the systems do not increase recurring revenue, we do not expand the engagement.",
      },
    ],
    who: "Who we work with",
    whoTitle: "Established creators.",
    whoAccent: "20,000 or more followers.",
    criteria: [
      "You have an audience, but capture and conversion are incomplete.",
      "Revenue still resets every month, or there is no offer yet.",
      "You want an operating system, not another software tool.",
    ],
    bookCta: "Book Strategy Call",
  },
  faq: {
    label: "FAQ",
    title: "Common questions",
    body: "Straightforward answers about how we work, who we work with, and what to expect.",
    items: [
      {
        question: "Do you take equity?",
        answer:
          "No. We work on a performance rev-share or a baseline retainer. If the infrastructure does not grow your monthly recurring revenue, we do not expand the engagement.",
      },
      {
        question: "How fast do we see a return?",
        answer:
          "We deploy a first improvement within 24 hours of starting, usually by recovering revenue that is already being lost.",
      },
      {
        question: "Do I have to learn the software?",
        answer:
          "No. You continue creating content and working with your audience. We operate the systems.",
      },
      {
        question: "What is Open System?",
        answer:
          "We build and run the revenue systems behind creator businesses. You remain the public brand.",
      },
      {
        question: "Who do you work with?",
        answer:
          "Creators with an audience of 20,000 or more, where there is a clear gap between attention and revenue.",
      },
      {
        question: "How does the strategy call work?",
        answer:
          "Thirty minutes. We review your audience and current setup. If there is a real opportunity, we propose an engagement. If not, we will say so.",
      },
      {
        question: "Are you an agency?",
        answer:
          "No. We do not produce campaigns or creative assets. We install and operate the revenue infrastructure.",
      },
    ],
    wrongDoor: "Looking for something else?",
    wrongBody: "Creators book a strategy call.",
    bookCta: "Book Strategy Call",
  },
  contact: {
    label: "Initiate",
    title: "Submit your public metrics.",
    body: "If there is a clear gap between your audience size and your revenue, we will show you how to capture it.",
    paths: [
      {
        title: "Creators",
        body: "Audience of 20,000 or more, and a gap we can measure. A thirty-minute call, then a plan for the first week.",
        cta: "Book Strategy Call",
        href: "/book",
      },
    ],
  },
};

export type Messages = typeof en;

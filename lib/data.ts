// lib/data.ts

export const wtoOverviewStats = [
  { label: "Member Countries", value: "166", description: "Almost every nation on earth" }, //[cite: 7]
  { label: "Foundation Year", value: "1995", description: "Replaced the older GATT agreement" }, //[cite: 7]
  { label: "Global Trade Coverage", value: "98%", description: "Nearly all global trade runs under WTO rules" } //[cite: 7]
];

export const corePrinciples = [
  {
    title: "Most-Favoured-Nation (MFN)",
    description: "If you give a better deal to one country, you must give that exact same deal to every WTO member.", //[cite: 7]
    example: "If the US lowers its import tax on French wine, it must immediately lower it for wine from every other WTO country — Morocco, Argentina, Japan, everyone." //[cite: 7]
  },
  {
    title: "National Treatment",
    description: "Once foreign goods arrive inside a country, they must be treated the same as local goods — no extra taxes, no unfair rules.", //[cite: 7]
    example: "Morocco cannot charge a higher sales tax on imported Spanish olive oil than on locally produced Moroccan olive oil." //[cite: 7]
  }
];

export const historicalTimeline = [
  { year: "1947", event: "GATT Created", details: "23 countries sign the General Agreement on Tariffs and Trade after WW2 to prevent economic nationalism." }, //[cite: 7]
  { year: "1986", event: "Uruguay Round", details: "The biggest trade negotiations ever begin — covering goods, services, and intellectual property." }, //[cite: 7]
  { year: "1995", event: "WTO Opens", details: "GATT is replaced by the WTO — a permanent institution with a real legal dispute system and far wider reach." }, //[cite: 7]
  { year: "2001", event: "Doha Round", details: "New talks begin to help developing countries benefit from trade. They remain unfinished over 20 years later." } //[cite: 7]
];

export const keyAgreements = [
  {
    acronym: "GATT",
    name: "General Agreement on Tariffs & Trade",
    scope: "Physical Goods",
    details: "Covers everything you can put in a shipping container. Sets maximum import taxes and bans unfair trade practices." //[cite: 7]
  },
  {
    acronym: "GATS",
    name: "General Agreement on Trade in Services",
    scope: "Services",
    details: "Covers banking, education, tourism, telecom. Countries choose which sectors they're willing to open up to foreign competition." //[cite: 7]
  },
  {
    acronym: "TRIPS",
    name: "Trade-Related Intellectual Property Rights",
    scope: "Ideas & IP",
    details: "Protects patents, trademarks, and copyright across borders in all 166 member countries." //[cite: 7]
  }
];

export const disputeResolutionSteps = [
  { step: 1, action: "Talk first", duration: "60 days", description: "The two countries must try to resolve it directly before anything else." }, //[cite: 7]
  { step: 2, action: "Panel convened", duration: "6–9 months", description: "Three independent experts study the case and write their findings." }, //[cite: 7]
  { step: 3, action: "Ruling issued", duration: "+3 months", description: "The WTO formally adopts the panel's decision." }, //[cite: 7]
  { step: 4, action: "Appeal", duration: "60–90 days", description: "Either side can challenge the ruling at a higher level." }, //[cite: 7]
  { step: 5, action: "Comply or face consequences", duration: "15 months", description: "The losing side must change its policy or face authorised trade penalties." } //[cite: 7]
];

export const landmarkCases = [
  {
    title: "Subsidies: USA vs EU",
    subject: "Boeing & Airbus",
    verdict: "Both the US and EU were secretly giving billions to their aircraft manufacturers. The WTO found both parties guilty. Both sides had to restructure their state funding." //[cite: 7]
  },
  {
    title: "Intellectual Property: USA vs China",
    subject: "Stolen Technology",
    verdict: "China was forcing foreign companies to hand over their technology as a condition of doing business. The WTO ruled this violated TRIPS." //[cite: 7]
  },
  {
    title: "Health Exception: Countries vs Australia",
    subject: "Plain Cigarette Packs",
    verdict: "Australia removed all branding from cigarette packaging. The WTO sided with Australia, ruling that protecting public health is a legitimate reason to override normal trade rules." //[cite: 7]
  }
];

export const modernChallenges = [
  {
    issue: "No judges",
    problem: "Since 2019 the WTO's appeals court has had no sitting judges because the US blocked new appointments. Disputes get stuck at appeal.", //[cite: 7]
    response: "50+ countries built a parallel temporary appeals system (MPIA) while working to restore the official court." //[cite: 7]
  },
  {
    issue: "Digital trade gap",
    problem: "There are almost no WTO rules for e-commerce, data flows, or online services.", //[cite: 7]
    response: "90+ countries are now writing new rules for e-commerce and online services." //[cite: 7]
  }
];
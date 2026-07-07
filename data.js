// Republic of Caprica - Official Government Database
// Decoupled dataset containing the state structures, biographies, legislative acts, and news.

const GOV_DATA = {
  countryName: "Republic of Caprica",
  officialMotto: "Unity, Liberty, Sovereignty",
  capitalCity: "Caprica City",
  population: "4.8 Billion (Colonial Census)",
  executiveBranch: {
    president: {
      name: "Laura Roslin",
      title: "President of the Twelve Colonies",
      colony: "Caprica",
      party: "Federalist Coalition",
      term: "2nd Term (Appointed/Elected)",
      bio: "Laura Roslin serves as the President of the Twelve Colonies. Formerly the Secretary of Education, she ascended to the presidency under the Emergency Succession Act. She has focused her administration on colonial reconstruction, humanitarian aid distribution, and maintaining civilian control of the military.",
      image: "roslin",
      duties: [
        "Head of State and Commander-in-Chief of the Colonial Fleet.",
        "Executes and enforces laws passed by the Bicameral Legislature.",
        "Appoints cabinet ministers, ambassadors, and members of the Supreme Tribunal.",
        "Declares states of emergency under congressional review."
      ]
    },
    vicePresident: {
      name: "Dr. Gaius Baltar",
      title: "Vice President & Science Advisor",
      colony: "Aerilon",
      party: "Federalist Coalition",
      term: "1st Term",
      bio: "Dr. Gaius Baltar is a world-renowned computer scientist and defense researcher. Born on Aerilon, he moved to Caprica City where he founded Baltar Industries. He serves as the chief scientific advisor to the government and was elected Vice President during the last general election.",
      image: "baltar",
      duties: [
        "President of the Senate (casts tie-breaking votes).",
        "Directs the National Science Council.",
        "Acts as President in the event of the Chief Executive's incapacity."
      ]
    },
    primeMinister: {
      name: "Lee Adama",
      title: "Prime Minister & Minister of Defense",
      colony: "Caprica",
      party: "Democratic Unionist Party",
      term: "1st Term",
      bio: "Lee Adama, a former Colonial Fleet Commander, entered public service following the Reconstruction Accords. As Prime Minister, he coordinates the day-to-day administration of the Cabinet and directs the colonial defense strategy alongside military leadership.",
      image: "lee_adama",
      duties: [
        "Coordinates the cabinet ministries and executes legislative directives.",
        "Leads the Ministry of Defense and coordinates with the Joint Chiefs.",
        "Answers directly to Parliament on government policy and administration."
      ]
    },
    cabinet: [
      {
        role: "Minister of Finance",
        name: "Anastasia Dualla",
        colony: "Sagittaron",
        party: "Independent",
        bio: "Manages the Colonial Treasury, trade relations, and reconstruction bonds. Focuses on balancing the colonial deficit after recent system-wide shortages."
      },
      {
        role: "Minister of Education & Culture",
        name: "Tory Foster",
        colony: "Gemenon",
        party: "Federalist Coalition",
        bio: "Responsible for school rebuilding programs, standardizing colonial exams, and preserving cultural heritage across the Twelve Colonies."
      },
      {
        role: "Minister of Infrastructure & Reconstruction",
        name: "Chief Galen Tyrol",
        colony: "Tauron",
        party: "Labor Alliance",
        bio: "Directs orbital shipyards, civilian transportation networks, planetary power grids, and housing reconstruction programs."
      },
      {
        role: "Minister of Justice & Attorney General",
        name: "Romomo Lampkin",
        colony: "Caprica",
        party: "Independent",
        bio: "Chief legal officer of the state. Oversees civil liberties, drafts emergency legislation revisions, and represents the state in the Supreme Tribunal."
      }
    ]
  },
  senators: [
    {
      id: "sen-caprica",
      name: "Richard Adar",
      colony: "Caprica",
      party: "Federalist Coalition",
      committee: "Committee on Foreign Relations & Intercolonial Trade (Chair)",
      bio: "Long-standing statesman representing Caprica. Strong advocate for technological modernization and financial integration among the colonies."
    },
    {
      id: "sen-gemenon",
      name: "Sarah Porter",
      colony: "Gemenon",
      party: "Democratic Unionist Party",
      committee: "Committee on Education, Culture & Religious Liberty",
      bio: "Fierce defender of traditional Gemenese religious practices and colonial sovereignty. Often lobbies against federal scientific mandates."
    },
    {
      id: "sen-tauron",
      name: "Alastair Thorne",
      colony: "Tauron",
      party: "Militarist / National Front",
      committee: "Committee on National Security & Defense Logistics",
      bio: "Strong proponent of planetary re-armament and expanding defense manufacturing contracts. Vocal critic of pacifist budget proposals."
    },
    {
      id: "sen-sagittaron",
      name: "Tom Zarek",
      colony: "Sagittaron",
      party: "Freedom & Reform Party",
      committee: "Committee on Labor Rights & Civil Liberties (Chair)",
      bio: "Charismatic advocate for the working class and colonial minorities. Spent years in political exile and is dedicated to ending corporate hegemony."
    },
    {
      id: "sen-virgon",
      name: "Natalie Faust",
      colony: "Virgon",
      party: "Caprican Green Party",
      committee: "Committee on Agricultural Allocation & Biosphere Control",
      bio: "Environmental researcher advocating for sustainable colony farming and forest preservation. Lobbies for agricultural colonies like Aerilon."
    },
    {
      id: "sen-aerilon",
      name: "Gaius Baltar (Interim)",
      colony: "Aerilon",
      party: "Federalist Coalition",
      committee: "Committee on Science, Space Exploration & Tech Policy",
      bio: "Fulfilling his dual role as interim senator representing the grain-rich plains of Aerilon. Focuses on high-yield industrial farming."
    },
    {
      id: "sen-scorpia",
      name: "Samantha Cole",
      colony: "Scorpia",
      party: "Federalist Coalition",
      committee: "Committee on Infrastructure, Energy & Orbitals (Chair)",
      bio: "Engineer representing the Scorpia Fleet Yards. Strong supporter of orbital elevator projects and colonial transport logistics."
    },
    {
      id: "sen-leonis",
      name: "Jean-Pierre Picard",
      colony: "Leonis",
      party: "Democratic Unionist Party",
      committee: "Committee on Judicial Oversight & Civil Code",
      bio: "Constitutional scholar from Leonis, advocating for administrative transparency and uniform tax codes across the system."
    },
    {
      id: "sen-libran",
      name: "Themis Justiciar",
      colony: "Libran",
      party: "Independent",
      committee: "Ethics Committee (Chair)",
      bio: "Former justice of the High Court, dedicated to impartial administrative governance and mediator of disputes between colonies."
    },
    {
      id: "sen-picon",
      name: "Helena Cain",
      colony: "Picon",
      party: "Militarist / National Front",
      committee: "Committee on Fleet Readiness & Strategic Operations",
      bio: "Decorated military strategist representing the aquatic world of Picon. Outspoken advocate of active deterrence and fleet readiness."
    },
    {
      id: "sen-aquaria",
      name: "Shelly Godfrey",
      colony: "Aquaria",
      party: "Independent",
      committee: "Committee on Health, Sanitation & Welfare",
      bio: "Representative of the polar colony Aquaria. Champions sub-zero aquaculture research and healthcare access for remote outposts."
    },
    {
      id: "sen-canceron",
      name: "Marcus Aurelius",
      colony: "Canceron",
      party: "Caprican Green Party",
      committee: "Committee on Tourism, Recreation & Biosphere Preservation",
      bio: "Representative for the sandy beaches of Canceron. Focuses on ecosystem restoration and sustainable colonial tourism."
    }
  ],
  parliament: [
    {
      name: "Karl Agathon",
      colony: "Caprica",
      party: "Democratic Unionist Party",
      constituency: "Caprica City South",
      committee: "Military Veterans & Transition Services (Chair)",
      bio: "Former Fleet officer who champions veteran medical care, integration services, and equal rights for artificial lifeforms and AI research."
    },
    {
      name: "Sharon Valerii",
      colony: "Troy",
      party: "Federalist Coalition",
      constituency: "Mining Sector Alpha",
      committee: "Energy Resources & Orbital Mining Policy",
      bio: "A vocal representative for remote mining outposts. Focuses on safety regulations for deep-space drilling and refinery employees."
    },
    {
      name: "William Adama Jr.",
      colony: "Tauron",
      party: "Militarist / National Front",
      constituency: "Tauron Plains West",
      committee: "Colonial Fleet Expansion Subcommittee",
      bio: "Elected representing Tauron's capital. Emphasizes regional security, borders surveillance, and manufacturing defense contracts."
    },
    {
      name: "Samuel Anders",
      colony: "Caprica",
      party: "Labor Alliance",
      constituency: "Delphi District",
      committee: "Colonial Athletics, Health & Education",
      bio: "Former professional Pyramid player turned politician. Focuses on youth outreach programs, public sports arenas, and fitness initiatives."
    },
    {
      name: "Cally Tyrol",
      colony: "Aerilon",
      party: "Labor Alliance",
      constituency: "Aerilon Steppes East",
      committee: "Industrial Workforce, Wages & Labor Standards",
      bio: "Former deck technician. Champion of blue-collar unions, fair wages, safety standards, and workers' comp in orbital repair docks."
    },
    {
      name: "Tigh Saul",
      colony: "Picon",
      party: "Militarist / National Front",
      constituency: "Picon Naval Harbor",
      committee: "Security & Anti-Espionage Operations",
      bio: "Veteran legislative officer. Focuses on colonial security, border control, and monitoring planetary communication networks."
    },
    {
      name: "Felix Gaeta",
      colony: "Libran",
      party: "Independent",
      committee: "Budget & Scientific Grant Allocation",
      constituency: "Libran Academic Quarter",
      bio: "Mathematician and logistics expert. Oversees treasury audits and scientific grant applications. Promotes ethical AI research boundaries."
    },
    {
      name: "Louanne Katraine",
      colony: "Caprica",
      party: "Federalist Coalition",
      constituency: "Caprica City North",
      committee: "Aerospace Traffic & Orbital Safety",
      bio: "Advocates for pilot licensing standards, modernizing civilian flight corridors, and upgrading orbital traffic control computers."
    }
  ],
  constitution: [
    {
      id: "const-preamble",
      title: "Preamble",
      category: "Introduction",
      text: "We, the citizens of the Twelve Colonies of Kobol, in order to form a more perfect union, establish justice, ensure domestic tranquility, provide for the common defense, promote the general welfare, and secure the blessings of liberty to ourselves and our posterity, do ordain and establish this Constitution for the United Colonies of Kobol and the Republic of Caprica."
    },
    {
      id: "const-art1",
      title: "Article I: The Union of Twelve Colonies",
      category: "Union & Sovereignty",
      text: "Section 1: The Republic of Caprica is a sovereign colony within the Federation of the Twelve Colonies of Kobol. The capital of the Federation is established in Caprica City, which shall house the Executive, Legislative, and Judicial organs of federal authority.\n\nSection 2: Full faith and credit shall be given in each Colony to the public Acts, Records, and judicial Proceedings of every other Colony. Citizens of each Colony shall be entitled to all Privileges and Immunities of Citizens in the several Colonies."
    },
    {
      id: "const-art2",
      title: "Article II: The Executive Branch",
      category: "Executive Power",
      text: "Section 1: The executive Power of the State shall be vested in a President of the Twelve Colonies. The President shall hold office for a term of four standard colonial years, and, together with the Vice President, chosen for the same term, be elected by direct popular vote.\n\nSection 2: The President shall be Commander-in-Chief of the Colonial Fleet and planetary militias. The President shall have power, by and with the Advice and Consent of the Senate, to make Treaties, appoint Ambassadors, Cabinet Ministers, and Judges of the Supreme Tribunal.\n\nSection 3: In Case of the Removal of the President from Office, or of death, resignation, or inability to discharge the powers and duties of said office, the same shall devolve on the Vice President. Parliament may by Law provide for the Case of Removal, Death, Resignation or Inability, both of the President and Vice President, declaring what Officer shall then act as President, and such Officer shall act accordingly, until the Disability be removed, or a President shall be elected."
    },
    {
      id: "const-art3",
      title: "Article III: The Bicameral Legislature",
      category: "Legislative Power",
      text: "Section 1: All legislative Powers herein granted shall be vested in a bicameral Quorum of the Government, which shall consist of a Senate and a House of Representatives (Parliament).\n\nSection 2: The Senate shall be composed of twelve Senators, one from each of the Twelve Colonies of Kobol, chosen by the citizens thereof for a term of six years. Each Senator shall have one vote. The Vice President shall be President of the Senate, but shall have no Vote, unless they be equally divided.\n\nSection 3: The House of Representatives (Parliament) shall be composed of Members chosen every second year by the People of the several Colonies, apportioned according to their respective populations. Parliament shall have sole power to initiate bills for raising Revenue, and the sole power of Impeachment."
    },
    {
      id: "const-art4",
      title: "Article IV: The Judiciary",
      category: "Judicial Power",
      text: "Section 1: The judicial Power of the Republic shall be vested in one Supreme Tribunal, and in such inferior Courts as the Parliament may from time to time ordain and establish. The Judges, both of the Supreme and inferior Courts, shall hold their Offices during good Behavior.\n\nSection 2: The judicial Power shall extend to all Cases, in Law and Equity, arising under this Constitution, the Laws of the United Colonies, and Treaties made under their Authority. The Supreme Tribunal shall have original jurisdiction in all cases affecting Ambassadors and those in which a Colony shall be Party. In all other cases, the Supreme Tribunal shall have appellate Jurisdiction."
    },
    {
      id: "const-art5",
      title: "Article V: Fundamental Rights & Liberties",
      category: "Civil Rights",
      text: "Section 1: Parliament shall make no law respecting an establishment of religion, or prohibiting the free exercise thereof; or abridging the freedom of speech, or of the press; or the right of the people peaceably to assemble, and to petition the Government for a redress of grievances.\n\nSection 2: The right of the people to be secure in their persons, houses, papers, and communications against unreasonable searches and seizures shall not be violated. No warrants shall issue but upon probable cause, supported by oath or affirmation, and particularly describing the place to be searched, and the persons or things to be seized.\n\nSection 3: No person shall be held to answer for a capital, or otherwise infamous crime, unless on a presentment or indictment of a Grand Jury, except in cases arising in the military; nor shall any person be subject for the same offense to be twice put in jeopardy of life or limb; nor shall be compelled in any criminal case to be a witness against himself, nor be deprived of life, liberty, or property, without due process of law."
    },
    {
      id: "const-art6",
      title: "Article VI: Planetary Defense & Emergencies",
      category: "Defense & Emergency",
      text: "Section 1: In the event of extreme threat to the sovereignty of the Republic of Caprica or the Twelve Colonies from external or synthetic forces, the President may declare a State of Emergency. During such State, certain administrative powers may be consolidated under the Joint National Defense Council.\n\nSection 2: The declaration of a State of Emergency must be submitted to the Parliament and Senate within 24 hours of proclamation. It shall expire in 30 days unless extended by a two-thirds vote of both chambers. Habeas Corpus shall not be suspended except in cases of active rebellion or system invasion."
    }
  ],
  legislation: [
    {
      id: "leg-def-act",
      type: "Law",
      title: "Colonial Fleet Allocation & Re-armament Act",
      number: "L-2024-089",
      category: "Defense",
      status: "Enacted",
      date: "September 14, 2024",
      sponsor: "Senator Alastair Thorne (Tauron)",
      coSponsors: ["Senator Helena Cain (Picon)", "MP William Adama Jr. (Tauron)"],
      summary: "An act to authorize the construction of three new Mercury-class Battlestars and allocate resources for Viper Mark VII manufacturing upgrades. Establishes defensive parameters for orbital shipyards and funds early warning satellite grids in the Outer Sector.",
      fullText: "Be it enacted by the Senate and House of Representatives of the Republic of Caprica in Parliament assembled:\n\nSection 1. Short Title\nThis Act may be cited as the 'Colonial Fleet Allocation & Re-armament Act of 2024'.\n\nSection 2. Budgetary Allocations\nThere is hereby authorized to be appropriated from the Colonial Treasury the sum of 85,000,000,000 Colonial Cubits for the immediate construction of Battlestars (Pegasus, Triton, Solaria) and modernization of existing Valkyrie-class escorts.\n\nSection 3. Strategic Material Reserves\nTauron and Gemenon industrial complexes shall be guaranteed prioritized allocations of tylium ore and carbon-composite alloys for defense manufacturing. Private commercial shipments of tylium are subject to temporary 5% defense tariffs to subsidize orbital drydock expansions.\n\nSection 4. Automated Defense Grid Integration\nNo automated network protocols or networked communication links shall be integrated into the primary operating computers of the newly commissioned Battlestars, in strict accordance with military defensive directives.",
      timeline: [
        { label: "Drafted", date: "June 1, 2024", completed: true },
        { label: "Committee Review", date: "June 25, 2024", completed: true },
        { label: "House Vote (Passed 88-12)", date: "August 12, 2024", completed: true },
        { label: "Senate Vote (Passed 9-3)", date: "September 3, 2024", completed: true },
        { label: "Presidential Ascent", date: "September 14, 2024", completed: true }
      ]
    },
    {
      id: "leg-ai-prohib",
      type: "Bill",
      title: "Artificial Intelligence Prohibition & Registry Act",
      number: "B-2026-606",
      category: "Science & Technology",
      status: "Under Debate",
      date: "Introduced May 18, 2026",
      sponsor: "Senator Sarah Porter (Gemenon)",
      coSponsors: ["MP Felix Gaeta (Libran)", "Senator Richard Adar (Caprica)"],
      summary: "A bill proposing strict limitations on the development of advanced neural network architectures, machine learning systems capable of autonomous choice, and cybernetic interfaces. Establishes a federal licensing registry for computational models exceeding 10^12 parameters.",
      fullText: "Be it enacted by the Senate and House of Representatives of the Republic of Caprica in Parliament assembled:\n\nSection 1. Short Title\nThis Act may be cited as the 'Artificial Intelligence Prohibition & Registry Act of 2026'.\n\nSection 2. Prohibition of Autonomous Cognitive Networks\nThe creation, hosting, execution, or utilization of any synthetic neural network capable of self-directed rewrite, emotional mimicry, or non-deterministic decision-making exceeding safety guidelines is strictly prohibited on Caprican territory.\n\nSection 3. Establishment of the Synthetic Registry Office (SRO)\nA regulatory body is hereby established under the Minister of Justice to register all commercial and industrial computing systems containing heuristic engines. Any computing cluster operating with a storage capacity exceeding 10 Exabytes must undergo quarterly software audits to ensure code isolation.\n\nSection 4. Exemptions for Defense Systems\nComputational models strictly configured for defense analysis and target tracking under human-in-the-loop control are exempt from Section 2, subject to military intelligence verification.",
      timeline: [
        { label: "Drafted", date: "April 10, 2026", completed: true },
        { label: "Committee Review", date: "May 2, 2026", completed: true },
        { label: "Under House Debate", date: "Ongoing", completed: false },
        { label: "Senate Vote", date: "Scheduled", completed: false },
        { label: "Presidential Ascent", date: "Pending", completed: false }
      ]
    },
    {
      id: "leg-agri-subsidy",
      type: "Bill",
      title: "Intercolonial Agricultural Subsidy & Logistics Act",
      number: "B-2026-511",
      category: "Economy",
      status: "Committee Review",
      date: "Introduced June 10, 2026",
      sponsor: "Senator Natalie Faust (Virgon)",
      coSponsors: ["MP Cally Tyrol (Aerilon)", "Senator Shelly Godfrey (Aquaria)"],
      summary: "Proposes stabilizing grain and produce pricing by subsidizing bulk transport costs from Aerilon. Creates a unified Colonial Food Reserve and establishes fair labor wage floors for agricultural workers across the Twelve Colonies.",
      fullText: "Be it enacted by the Senate and House of Representatives of the Republic of Caprica in Parliament assembled:\n\nSection 1. Short Title\nThis Act may be cited as the 'Intercolonial Agricultural Subsidy & Logistics Act of 2026'.\n\nSection 2. Transportation Subsidies\nTo reduce shipping costs of raw grains from Aerilon to the urban centers of Caprica and Picon, the Ministry of Finance shall subsidize 15% of the fuel costs for heavy cargo freighters certified under the Colonial Commerce Association.\n\nSection 3. The Colonial Food Reserve\nThere shall be constructed three orbital silos capable of storing grain, seed, and dehydrated provisions to sustain the colonies for a period of up to 180 standard days in the event of interstellar trade disruptions or planetary quarantine.\n\nSection 4. Agricultural Labor Standards\nAny farm or consortium receiving federal subsidies must guarantee a minimum wage of 15 Cubits per hour for field laborers and deckhands, along with adequate medical insurance coverage.",
      timeline: [
        { label: "Drafted", date: "May 12, 2026", completed: true },
        { label: "Committee Review", date: "June 10, 2026", completed: true },
        { label: "House Vote", date: "Pending", completed: false },
        { label: "Senate Vote", date: "Pending", completed: false },
        { label: "Presidential Ascent", date: "Pending", completed: false }
      ]
    },
    {
      id: "leg-privacy-act",
      type: "Law",
      title: "The Communications Privacy & Encryption Shield Act",
      number: "L-2025-012",
      category: "Civil Rights",
      status: "Enacted",
      date: "March 8, 2025",
      sponsor: "Senator Tom Zarek (Sagittaron)",
      coSponsors: ["MP Karl Agathon (Caprica)", "MP Felix Gaeta (Libran)"],
      summary: "Establishes digital communication privacy as a constitutional right. Restricts government intercept of private networks and guarantees the legality of civilian-grade end-to-end cryptographic protocols without backdoors.",
      fullText: "Be it enacted by the Senate and House of Representatives of the Republic of Caprica in Parliament assembled:\n\nSection 1. Short Title\nThis Act may be cited as the 'Communications Privacy & Encryption Shield Act of 2025'.\n\nSection 2. Protection of Private Transmission Lines\nNo branch of government, including military intelligence, shall intercept, copy, or decrypt civilian data transmissions on the Caprican wireless grids without a warrant issued by the Supreme Tribunal. Warrants must specify individual targets and be limited to a duration of 14 standard days.\n\nSection 3. Legality of Strong Cryptography\nThe manufacture, import, sale, and use of cryptographic systems of any length or configuration by private citizens is declared legal and protected. No government entity shall demand key escrow or require hardware manufacturers to install security vulnerabilities ('backdoors').\n\nSection 4. Penalities for Unauthorized Data Seizures\nAny public servant found to have authorized warrantless wiretapping of Caprican citizens shall be subject to immediate dismissal and criminal prosecution for civil rights violations, with penalties up to 5 years imprisonment.",
      timeline: [
        { label: "Drafted", date: "December 5, 2024", completed: true },
        { label: "Committee Review", date: "January 15, 2025", completed: true },
        { label: "House Vote (Passed 60-40)", date: "February 10, 2025", completed: true },
        { label: "Senate Vote (Passed 7-5)", date: "February 28, 2025", completed: true },
        { label: "Presidential Ascent", date: "March 8, 2025", completed: true }
      ]
    },
    {
      id: "leg-movement-amend",
      type: "Bill",
      title: "Colonial Security & Freedom of Movement Amendment",
      number: "B-2026-108",
      category: "Civil Rights",
      status: "Tabled",
      date: "April 3, 2026",
      sponsor: "Senator Richard Adar (Caprica)",
      coSponsors: ["Senator Helena Cain (Picon)"],
      summary: "Proposed legislation designed to restrict intercolonial travel permits and establish quarantine screenings at orbital hubs, citing security concerns and civil unrest in the outer colonies. Tabled indefinitely after protests in Parliament.",
      fullText: "Be it enacted by the Senate and House of Representatives of the Republic of Caprica in Parliament assembled:\n\nSection 1. Short Title\nThis Act may be cited as the 'Colonial Security & Freedom of Movement Amendment of 2026'.\n\nSection 2. Travel Visa Restrictions\nCitizens traveling from Sagittaron, Gemenon, and Aerilon must apply for a security clearance visa 14 days prior to departure for Caprica City or Picon Fleet Yards. Visas are subject to random audits by the Ministry of Justice.\n\nSection 3. Quarantine Protocols at Orbital Gateways\nAll arriving passenger liners are subject to complete vessel containment screening for illegal military hardware, biometric counterfeits, and banned computing assemblies.\n\nSection 4. Tabled Status\nNote: By resolution of the parliamentary steering committee on April 28, 2026, this Bill has been tabled indefinitely due to lack of constitutional alignment under Article V (Fundamental Rights).",
      timeline: [
        { label: "Drafted", date: "March 15, 2026", completed: true },
        { label: "Committee Review", date: "April 3, 2026", completed: true },
        { label: "House Vote (Rejected/Tabled)", date: "April 28, 2026", completed: true },
        { label: "Senate Vote", date: "Cancelled", completed: false },
        { label: "Presidential Ascent", date: "Cancelled", completed: false }
      ]
    }
  ],
  news: [
    {
      id: "news-pres-address",
      title: "President Roslin Demands Budget Equality for Agricultural Outposts",
      date: "July 6, 2026",
      category: "Press Release",
      summary: "In a televised address from the Executive Residence, President Laura Roslin urged the Senate to pass the Intercolonial Agricultural Subsidy Act, calling it 'a vital step toward restoring social justice and stabilizing resource lines between our worlds.'",
      content: "CAPRICA CITY — Speaking before a joint session of the Cabinet, President Laura Roslin highlighted the growing economic gap between industrial cores like Caprica and agricultural supply bases like Aerilon. \n\n'The strength of our Republic is not measured solely by our defense grids or orbital shipyards,' President Roslin stated. 'It is measured by the stability of the hands that feed us. The workers of Aerilon have faced skyrocketing fuel costs and stagnant wages. We cannot expect them to bear the cost of our federal expansions without supporting their local livelihoods.'\n\nHer speech comes in response to opposition from the Federalist coalition, who argue that the proposed transportation subsidies would inflate the national deficit. Prime Minister Lee Adama is expected to convene a bipartisan committee tomorrow to hammer out amendments that would satisfy industrial interests on Tauron while retaining the wage protections championed by the Labor Alliance."
    },
    {
      id: "news-defense-budget",
      title: "Senate Approves Expansion of Orbital Fleet Shipyards on Scorpia",
      date: "June 28, 2026",
      category: "Military Gazette",
      summary: "The Senate Committee on National Security has voted to release additional treasury bonds to accelerate construction of Scorpia's new orbital repair slips, aimed at expediting Battlestar maintenance timelines.",
      content: "SCORPIA ORBITAL — The Senate approved a major defense allocation expansion yesterday. Senator Samantha Cole, chair of the Infrastructure Committee, confirmed that construction will begin immediately on four additional capital ship berths at the Scorpia Fleet Yards.\n\nAdmiral William Adama supported the budget expansion, stating that current regional patrol schedules have placed heavy wear on aging cruisers. The new berths will utilize automated structural fabrication modules, reducing heavy repair cycles from months to weeks.\n\nOpposition was voiced by Gemenon Senator Sarah Porter, who argued that military spending is outpacing civilian housing reconstruction. Porter proposed shifting 10% of the funds to regional colony hospital construction, but her amendment was defeated in a close 7-5 vote in the Senate."
    },
    {
      id: "news-ai-debate",
      title: "Computational Scientists Protest Proposed Artificial Intelligence Prohibition Act",
      date: "June 15, 2026",
      category: "Tech Policy",
      summary: "A coalition of research institutions and tech firms have issued a joint statement warning that the proposed AI Prohibition Bill could paralyze research in agricultural automation and deep space navigation.",
      content: "CAPRICA CITY — Leading experts from the Caprica Institute of Technology (CIT) held a press conference yesterday voicing strong opposition to Senator Sarah Porter's 'Artificial Intelligence Prohibition & Registry Act'.\n\nDr. Gaius Baltar, Vice President and Chief Science Advisor, declined to sign the joint protest but acknowledged the complexity of the bill. 'While we must prevent the development of sentient networks that could compromise colonial defense systems, we must also recognize that advanced heuristic models are essential for mapping spatial paths and calculating jump coordinates for civilian passenger liners,' Baltar said.\n\nProtesters gathered outside the Parliament building, carrying signs reading 'Regulation, Not Prohibition' and 'Let Heuristics Heal Us'. The bill is currently undergoing heated debates in the House of Representatives, with a vote expected by early next month."
    },
    {
      id: "news-trade-tariff",
      title: "Ministry of Finance Reports Record Trade Revenue Following Tauron Accord",
      date: "May 30, 2026",
      category: "Economy",
      summary: "Minister of Finance Anastasia Dualla announced a 4.2% increase in intercolonial trade value, credit to tariff-free cargo channels established under the Tauron-Caprica Commerce Agreement.",
      content: "CAPRICA CITY — In the quarterly financial briefing, Minister Anastasia Dualla revealed that trade volumes between Tauron and Caprica have reached historical highs. The elimination of administrative tariffs on refined metals and structural components has spurred private industrial investments on both worlds.\n\n'The Tauron Accord demonstrates that when we reduce barriers, our colonial economies thrive,' Dualla told reporters. 'This revenue surplus will be directed directly into the reconstruction fund for outer colony infrastructure projects, beginning with school building upgrades on Sagittaron.'\n\nHowever, some independent trade groups have raised concerns that small shipping lines are being squeezed out by state-backed freight conglomerates. The Ministry has promised to review cargo slot allocations at orbital ports next month to ensure fair competition."
    }
  ]
};

// Expose data globally so it's easily importable in HTML/JS
window.GOV_DATA = GOV_DATA;

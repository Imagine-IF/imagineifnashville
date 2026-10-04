"""Render the eight Frontier Days experience pages from one shared template."""
from pathlib import Path
from html import escape
import re

ROOT = Path(__file__).resolve().parents[1]
BASE = ROOT / 'if27'
HOME = BASE / 'index.html'

# All agenda items are illustrative proposals, not confirmed programming.
EXPERIENCES = [
('power-of-payments', 'Power of Payments', 'Making Bitcoin work as everyday money.',
 'Follow a payment from the person spending to the business receiving it. This experience brings payment builders and merchants into the same conversation about reliability, privacy, and adoption. Explore Lightning infrastructure, cross-border settlement, and the practical work of making Bitcoin useful at the point of sale. Leave with a clearer understanding of what people need from a payment system and where builders can help.',
 [('09:00','Opening conversation','Bitcoin at the checkout','What merchants and customers need to use Bitcoin day to day.'),('09:30','Panel','Building reliable payment infrastructure','Routing, liquidity, and integration challenges for payment teams.'),('10:30','Demonstration','From wallet to point of sale','Walk through the customer and merchant experience.'),('11:30','Breakout','Payments across borders','Explore settlement and practical adoption barriers.'),('13:00','Workshop','Design a merchant rollout','Work through onboarding, staff training, and support.'),('14:15','Roundtable','What comes next for payments?','Compare lessons and identify opportunities to collaborate.')]),
('custody-treasury', 'Custody & Treasury', 'Holding Bitcoin with confidence, from personal savings to the corporate balance sheet.',
 'A focused day for individuals, businesses, and institutions responsible for Bitcoin. Compare custody designs and work through governance, liquidity, and operational decisions. Sessions connect technical safeguards with business realities, including insurance and succession. Bring the questions your household or treasury team needs to answer before choosing how to hold Bitcoin.',
 [('09:00','Opening briefing','Custody: risk and responsibility','Frame the decisions facing holders and treasury teams.'),('09:20','Panel','Choosing a custody model','Compare cold storage, multisignature arrangements, and MPC.'),('10:05','Discussion','Shared keys and governance','Define approvals and recovery responsibilities.'),('10:45','Break','Coffee and conversation',''),('11:05','Case studies','Bitcoin on the business balance sheet','Examine accounting, liquidity, and operational controls.'),('11:50','Panel','Insurance and counterparty risk','Evaluate protections, exclusions, and diligence.'),('12:30','Break','Lunch break',''),('13:30','Workshop','Design your treasury playbook','Work through reserve policies and incident response.'),('14:20','Discussion','Inheritance and business continuity','Prepare for succession and unavailable signers.'),('15:00','Break','Coffee and conversation',''),('15:20','Closing roundtable','Long-term custody resilience','Identify practical next steps for households and businesses.'),('16:00','Close','Summit concludes','')]),
('global-compute', 'Global Compute', 'The energy, hardware, and infrastructure powering AI and Bitcoin.',
 'Meet the operators building compute infrastructure around the world. Explore how power availability, chip supply, and grid constraints shape the economics of AI and Bitcoin mining. Compare large data centers with distributed deployments, and discuss what it takes to bring new capacity online responsibly. The focus is on the physical systems and operating decisions behind the next wave of compute.',
 [('09:00','Opening briefing','The geography of compute','How energy and infrastructure shape where operators build.'),('09:30','Panel','From power supply to operating capacity','Compare grid connections, equipment, and development timelines.'),('10:30','Case studies','AI and Bitcoin at the same site','Explore workload requirements and operating trade-offs.'),('11:30','Discussion','Distributed compute in practice','Examine smaller deployments and local ownership.'),('13:00','Workshop','Evaluate a compute project','Work through power, hardware, cooling, and utilization.'),('14:15','Roundtable','Building the next generation of capacity','Identify obstacles and opportunities across regions.')]),
('capital-at-the-frontier', 'Capital at the Frontier', 'Investing with conviction across AI, energy, Bitcoin, and beyond.',
 'Bring investment theses into conversation with the people building the underlying businesses. Explore how capital allocators evaluate emerging technologies, price uncertainty, and choose time horizons. From early research to physical infrastructure, discuss how different projects need different forms of capital. Share frameworks for diligence and the questions that help separate compelling ideas from durable opportunities.',
 [('09:00','Opening conversation','Building a frontier investment thesis','Define the assumptions behind an allocation.'),('09:30','Panel','Different projects, different capital','Compare venture, infrastructure, and long-term ownership.'),('10:30','Case studies','From technical progress to a business','Examine adoption and commercial milestones.'),('11:30','Discussion','Risk across the frontier','Consider concentration, regulation, and time horizons.'),('13:00','Workshop','Pressure-test an investment thesis','Identify evidence, dependencies, and unanswered questions.'),('14:15','Roundtable','Funding the work ahead','Connect capital needs with investment mandates.')]),
('show-and-tell', 'Show & Tell', 'Meet the builders. Try the tools. Share what you learn.',
 'A place for builders to put their work in front of people who will ask useful questions. Explore live demonstrations and early prototypes, then talk directly with the people making them. Share feedback, test assumptions, and find collaborators. Whether you arrive with something to demonstrate or a problem you want to solve, this experience makes room for practical discovery.',
 [('09:00','Welcome','Meet the builders','Introduce projects and the problems they address.'),('09:30','Live demos','First look','Short demonstrations followed by audience questions.'),('10:30','Hands-on','Try it yourself','Explore tools with their builders.'),('11:30','Feedback session','What works? What is missing?','Offer specific feedback on usability and usefulness.'),('13:00','Live demos','Work in progress','Share prototypes and lessons from building.'),('14:15','Open session','Find your next collaborator','Connect project needs with people who can help.')]),
('grassroots-bitcoin', 'Grassroots Bitcoin', 'Growing Bitcoin adoption, one community at a time.',
 'Learn from the organizers and educators helping their neighbors use Bitcoin. Exchange lessons on sustaining meetups, supporting merchants, and teaching self-custody. Explore how circular economies develop around local needs and relationships. Bring your community’s challenges into working conversations with people doing similar work in different places.',
 [('09:00','Opening stories','Bitcoin where we live','Community organizers share their local context.'),('09:30','Roundtable','Building a meetup that lasts','Discuss hosts, venues, and sustainable participation.'),('10:30','Workshop','Teaching self-custody','Design clear, practical learning experiences.'),('11:30','Case studies','Local merchants and circular economies','Explore adoption through everyday relationships.'),('13:00','Working session','Your community’s next step','Develop a practical plan around a local need.'),('14:15','Exchange','Share resources and lessons','Connect organizers for continued collaboration.')]),
('alt-health', 'Alt Health', 'Taking greater ownership of our health through sound money and open intelligence.',
 'Explore nutrition and metabolic health alongside strength, recovery, and longevity. Practitioners and builders examine how people can better understand their own biology and make informed decisions for themselves and their families. Discuss the role of personal data and open intelligence, with attention to evidence, privacy, and the limits of new tools. The focus is on building lasting health and greater personal agency.',
 [('09:00','Opening conversation','Taking ownership of health','Explore agency and a long-term approach to well-being.'),('09:30','Discussion','Nutrition and metabolic health','Examine evidence and questions worth asking.'),('10:30','Panel','Strength, recovery, and longevity','Discuss sustainable practices and individual differences.'),('11:30','Demonstration','Understanding personal health data','Explore useful measurements and their limitations.'),('13:00','Workshop','Open intelligence for health literacy','Practice evaluating information while protecting privacy.'),('14:15','Roundtable','Building for lasting health','Connect practitioners and builders around real needs.')]),
('freedom-tech', 'Freedom Tech', 'Practical tools for privacy, independence, and individual freedom.',
 'Start with the experiences of people facing censorship and surveillance, then meet the builders developing tools to help. Explore Bitcoin, private communications, and open-source AI through real-world stories and practical demonstrations. Hands-on sessions examine how to retain control of money and data, run intelligence on your own hardware, and choose tools suited to the risks people face.',
 [('09:00','Firsthand stories','Technology under pressure','Explore the needs of people facing repression.'),('09:30','Conversation','Build around the people using the tools','Connect human rights challenges with design decisions.'),('10:30','Demonstrations','Private communications and open protocols','Examine practical tools and their trade-offs.'),('11:30','Discussion','Open intelligence and the right to compute','Explore local models, ownership, and access.'),('13:00','Hands-on workshop','Run and inspect your own tools','Work through a local AI or privacy-tool demonstration.'),('14:15','Working groups','From needs to useful prototypes','Pair concrete problems with builders and next steps.')]),
]

EXTRA_TOPICS = {
    'power-of-payments': [('Payment privacy in practice', 'Consider what each participant can learn from a payment.'), ('Merchant operations', 'Discuss reconciliation and day-to-day support.'), ('A payment integration in ten minutes', 'Follow a focused demonstration from setup to settlement.'), ('Lessons to take home', 'Identify a practical next step for your business or project.')],
    'custody-treasury': [('A custody controls checklist', 'Review evidence of access controls and recovery readiness.'), ('From policy to practice', 'Identify the next custody decision for your household or business.')],
    'global-compute': [('Power procurement and local constraints', 'Compare how operators secure and manage energy supply.'), ('Operating for reliability', 'Examine maintenance and infrastructure dependencies.'), ('Inside a compute deployment', 'Follow a focused operating case study.'), ('Decisions for the next build', 'Identify practical questions to resolve before deployment.')],
    'capital-at-the-frontier': [('Conviction and position sizing', 'Discuss how allocators translate a thesis into exposure.'), ('Evaluating the people building', 'Compare approaches to teams, incentives, and governance.'), ('A diligence checklist', 'Review the evidence needed to support an investment decision.'), ('The questions still open', 'Identify assumptions that require further investigation.')],
    'show-and-tell': [('Building for real users', 'Compare how builders respond to feedback and adoption.'), ('From prototype to release', 'Discuss the decisions involved in shipping useful tools.'), ('A closer look at one tool', 'Follow a focused solo demonstration.'), ('What to build next', 'Share concrete needs and opportunities for collaboration.')],
    'grassroots-bitcoin': [('Teaching across communities', 'Compare approaches for different audiences and local needs.'), ('Sustaining the work', 'Discuss organizer capacity and long-term participation.'), ('A local adoption story', 'Share one practical example of community progress.'), ('Bring it home', 'Identify the next step for your own community.')],
    'alt-health': [('Personal data and informed choices', 'Discuss interpreting measurements with appropriate context.'), ('Tools, evidence, and their limits', 'Compare how practitioners and builders evaluate new approaches.'), ('A closer look at a health tool', 'Demonstrate an educational tool and explain its limitations.'), ('Questions for your own health', 'Identify informed questions to explore with qualified practitioners.')],
    'freedom-tech': [('Privacy in everyday practice', 'Discuss how people choose tools for their circumstances.'), ('Designing with human rights defenders', 'Compare field needs with technical and usability constraints.'), ('Local intelligence in ten minutes', 'Follow a focused demonstration of AI running on local hardware.'), ('Tools to explore next', 'Identify practical resources and opportunities to collaborate.')],
}

FORMATS = [('Solo presentation',10), ('Three-person panel',35), ('Fireside',25), ('Four-person panel',40), ('Solo presentation',10), ('Three-person panel',35), ('Fireside',25), ('Four-person panel',40), ('Solo presentation',10), ('Solo presentation',10)]

def clock_label(minutes):
    hour, minute = divmod(minutes,60)
    return f'{hour % 12 or 12}:{minute:02d} {"a.m." if hour < 12 else "p.m."}'

def build_agenda(slug, original):
    topics = [(name,desc) for _,kind,name,desc in original if kind not in ('Break','Close')] + EXTRA_TOPICS[slug]
    assert len(topics) == len(FORMATS) == 10
    rows = [(540,600,'Arrival','Doors open · Coffee served','Arrive, enjoy coffee, and meet fellow attendees.')]
    now = 600
    for i,((name,desc),(kind,duration)) in enumerate(zip(topics,FORMATS)):
        if i == 5:
            assert now == 720
            rows.append((720,780,'Lunch','Lunch included','Lunch is included in your summit experience.'))
            now = 780
        rows.append((now,now+duration,kind,name,desc))
        now += duration
    assert now == 900
    assert all(a[1] == b[0] for a,b in zip(rows,rows[1:]))
    return rows

def render(slug, title, line, abstract, agenda):
    about_heading = '<p class="eyebrow">The experience</p><h2>Go deeper.</h2>' if slug != 'power-of-payments' else ''
    venue_note = '<p class="fact-note">Summit Day spans separate, walkable venues in and around Vanderbilt University, Bitcoin Park, and Belmont University. The venue for this experience will be confirmed.</p>' if slug != 'power-of-payments' else ''
    partner = '<p class="experience-partner">In partnership with <strong>Noble Origins</strong></p>' if slug == 'alt-health' else ''
    partner_name = 'Noble Origins' if slug == 'alt-health' else 'To be announced'
    speaker = '<div><h2>Speakers</h2><p><a href="../../speakers/">Brett Ender &amp; Harry Gray · Noble Origins ↗</a></p></div>' if slug == 'alt-health' else ''
    source = ''
    if slug == 'custody-treasury':
        source = '<p class="agenda-source">Adapted into a one-day example from the <a href="https://bitcoinpark.com/custody-treasury/custody-treasury-summit.html">September 17–18, 2025 Custody &amp; Treasury Summit</a>. Prior speakers and supporters are not confirmed for 2027.</p>'
    rows = ''.join(f'<li><div class="session-time"><span>{clock_label(start)}–{clock_label(end)}</span><span class="session-duration">{end-start} minutes</span></div><div><span class="session-format">{escape(kind)}</span><h3>{escape(name)}</h3>{"<p>"+escape(desc)+"</p>" if desc else ""}</div></li>' for start,end,kind,name,desc in build_agenda(slug,agenda))
    return f'''<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>{escape(title)} — Frontier Days 2027</title><meta name="description" content="{escape(line, quote=True)}">
<link rel="icon" href="../../assets/favicon.png"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Rethink+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet"><link rel="stylesheet" href="../../styles.css?v=nav-8"><link rel="stylesheet" href="../experience.css?v=4"></head>
<body class="summit-page"><a class="skip" href="#about">Skip to experience</a>
<header><a class="brand" href="../../" aria-label="Frontier Days home"><img src="../../assets/logo-white.png" alt="Imagine IF" width="160" height="54"></a><nav aria-label="Main navigation"><a href="../../#fp-summits">All experiences</a><a href="../../speakers/">Speakers</a><a href="#agenda">Example agenda</a><a href="../../#fp-tickets">Tickets — TBA</a></nav><a class="header-date" href="../../">Frontier Days · 2027</a></header>
<main><section class="experience-hero section"><p class="eyebrow">Summit Day / Friday, October 22, 2027</p><h1>{escape(title)}</h1>{partner}<p class="experience-line">{escape(line)}</p><p class="experience-hours">Doors &amp; coffee: 9 a.m. · Sessions: 10 a.m.–3 p.m. · Lunch included</p></section>
<section class="experience-body section" id="about"><div class="experience-about">{about_heading}<p>{escape(abstract)}</p></div><aside class="experience-facts" aria-label="Experience details"><div><h2>Venue</h2><p>To be announced</p>{venue_note}</div><div><h2>In partnership with</h2><p>{partner_name}</p></div>{speaker}<div><h2>Supported by</h2><p>To be announced</p></div></aside></section>
<section class="experience-agenda section" id="agenda"><div class="agenda-heading"><div><p class="eyebrow">A look at the day</p><h2>Example agenda</h2></div><span class="agenda-label">Illustrative · Not confirmed</span></div><p class="agenda-intro">Doors open at 9 a.m. with coffee served. Programming runs from 10 a.m. to 3 p.m., with an included lunch from noon to 1 p.m. All times are Central. This is an example program; session topics and speakers are not confirmed.</p>{source}<ol class="agenda-list">{rows}</ol></section>
<section class="experience-cta section"><div><p class="eyebrow">October 19–22 / Nashville</p><h2>Make it part of your<br>Frontier Days.</h2></div><a class="apply-button" href="../../#fp-tickets">Ticket Details — TBA</a></section></main>
<footer><img src="../../assets/logo-white.png" alt="Imagine IF" width="132" height="45"><p>Nashville, Tennessee · 2027</p><a href="../../#fp-summits">All summit experiences</a><a href="../../#refunds">Refund policy</a></footer></body></html>'''

home = HOME.read_text()
for slug,title,line,abstract,agenda in EXPERIENCES:
    directory = BASE / 'experiences' / slug
    directory.mkdir(parents=True, exist_ok=True)
    (directory/'index.html').write_text(render(slug,title,line,abstract,agenda))
    heading = f'<h3>{escape(title)}</h3>'
    linked = f'<h3><a href="experiences/{slug}/">{escape(title)}</a></h3>'
    # Make rerunning the shared generator safe.
    home = home.replace(heading, linked)
    pattern = r'('+re.escape(linked)+r'<p>.*?</p>)(?!<a class="experience-detail")'
    home = re.sub(pattern, lambda m:m[1]+f'<a class="experience-detail" href="experiences/{slug}/">Explore experience <span aria-hidden="true">↗</span></a>',home)
home = re.sub(r'styles\.css\?v=[^\"]+', 'styles.css?v=nav-8', home)
HOME.write_text(home)
print('Rendered 8 experience pages and linked their homepage cards.')

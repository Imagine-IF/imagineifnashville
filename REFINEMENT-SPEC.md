# Imagine IF 2026 — Site Refinement Spec

**Date:** 2026-05-17
**Scope:** Refinement pass across all pages of the Claude Design–generated React site at `~/Desktop/iif-site/`.
**Guiding rule:** Keep it simple. No fluff. Single funnel.

---

## The single-funnel rule

Every CTA on every page points to one of three destinations:

| Destination | URL |
|---|---|
| Waitlist (Luma) | `https://luma.com/uanee3xb?tk=yqFBKj` |
| Press | `mailto:community@bitcoinpark.com` |
| DM Rod | *no link — styled non-functional button* |

No "Apply to speak". No "Sponsor inquiry". No newsletter signup. No multi-step in-page form.

---

## Home page

### Hero
- **Ship the Cycling variant only.** Kill Static + Split + tweaks panel entirely.
- Wire real trailer: `uploads/trailer.mp4` (175MB — flag for compression to ~30–50MB + add poster frame before launch).
- Trailer caption: remove "Rod needs to think through". Replace second line with just `Trailer · 2026` (final runtime swaps in once trailer is compressed).
- Primary CTA copy: `Attend Imagine IF` → Luma. (Replaces "Join waitlist".)
- Secondary CTA: `What is Imagine IF?` → links to merged Idea/About page.
- Cycling prompts: **REPLACE all 5 originals with these 10 locked prompts**, anchored to specific 2026 talks. Cycle through all 10 (3.6s each = 36s full loop):
  1. *intelligence, humanity, and money became one rail.* — Gladstein, Freedom Tech & the Convergence
  2. *intelligence became electricity — and you owned the meter.* — Jensen Huang + David Sacks
  3. *the cheapest energy in history rewrote the dollar.* — Casey Handmer, Energy Were Free
  4. *bitcoin worked for the next eight billion.* — Obi Nwosu (Fedi)
  5. *technology outlived the quantum decade.* — Adam Back + Andrew Poelstra + Peter Chapman
  6. *we built the life we have imagined.* — Thoreau echo + "we built it" loop
  7. *AI worked for you, not on you.* — Open Source AI panel
  8. *energy stopped being the binding constraint.* — Handmer abundance thesis
  9. *atoms came back to the grid edge.* — Oklo / TerraPower / Valar Atomics
  10. *privacy was the floor, not the fight.* — Privacy Is the Last Civil Right (Day 1 opener)

### Hero subhead (NEW copy)
- Replace current: *"Two days at the convergence of Bitcoin · AI · Energy · Freedom Tech."*
- With: *"Three rails of freedom tech — **intelligence, humanity, and money** — converging in one room."*
- Sets up the mental model the rest of the page reinforces.

### The Convergence strip — restructure as 3 rails → 1 outcome
- Was: flat 4-up grid (Bitcoin / AI / Energy / Freedom Tech).
- Becomes: **3 rails laid out horizontally** (Intelligence / Humanity / Money) with **Freedom Tech as the synthesis below** — visually they converge.
- Copy:
  - **Intelligence (AI)** — *The substrate every consequential decision now runs on.*
  - **Humanity (Energy)** — *The work of being alive — and the cost of doing it.*
  - **Money (Bitcoin)** — *Sound rails for sovereign capital.*
  - **Freedom Tech** — *What you get when all three are open.*
- Add a paper-background section between the dark hero and this section to avoid back-to-back dark sections.

### The Format (NEW section, before Prompt Reel)
- Anchors on the three-rails framing.
- Short explicit explanation: every talk belongs to one of the three rails. Every talk opens with an *Imagine IF…* prompt — the human-scale articulation of what each rail unlocks. Imagination plus agency.
- One paragraph, eyebrow + h2 + body. No CTAs.

### Prompt Reel
- Remove the 4 prompts that duplicate the hero cycling list (Cathie, Booth, Gladstein, Hash).
- Keep Scott Harrison + Gideon Powell prompts. Add 4 fresh ones from new/different speakers.

### Featured Speakers mosaic
- Update to match new speaker list (see "Speaker data sync" section below).
- Keep abstract `SpeakerArt` as fallback. Add real headshots when available.
- "+ more · 75 confirmed by October" tile: keep but adjust copy if 75 number changes.

### Social Proof strip (NEW section, after Featured Speakers)
- Pull 3-4 standout past Ignite Talk titles from `data.js` `pastTalks` array.
- Render as quote-style cards with speaker attribution.

### At-a-Glance stats
- **Fix the "75 speakers" lie.** Either:
  - Drop the speakers cell entirely (3-up grid: 2 days / 2 stages / 40 sessions), OR
  - Reframe: `~75 by October` with explicit framing, not as confirmed fact.

### Agenda Tease
- Agenda data is NOT public. Show a "coming together" placeholder section instead of session previews.
- Stage names: Main Theatre + Second Stage (no Ten31/OpenSats).
- Full agenda + session list will be added at a later date.

### Sponsor strip
- Keep marquee. Logo lockups when assets exist; text-only marquee until then.

### Proceeds CTA section
- Keep. Update button copy: `Attend Imagine IF` → Luma. Keep `About BP & AFL` secondary.

---

## Tickets page (full rewrite, mirror imagineifnashville.com/tickets.html)

**Kill:** existing General/Patron/Founder tiers, the multi-step form, the proceeds bar, the modal/done flow, Zaprite checkout mention.

**Build:** Three tier cards, all sharing identical feature bullets.

### Shared feature list (all tiers)
- All-Access to Two Day Summit
- Main Theatre Stage Presentations & Panels
- Second Stage Presentations & Panels  *(Ten31/OpenSats branding REMOVED)*
- Connect: Natural Collisions With Investors, Engineers, Policymakers, and Entrepreneurs
- Full Hospitality: Breakfast, Lunch, Coffee & Drinks While Onsite

### Tier cards

| Tier | Price | Subtitle | Callout | CTA | CTA destination |
|---|---|---|---|---|---|
| I am a Bitcoin Park Member | Free | Complimentary for Park members. | — | `DM Rod` | none (styled button) |
| Student Pass | Discounted | Discounted pass for students. | — | `Join Waitlist` | Luma |
| Summit Pass | $5,000 | Full access ticket to the summit. | — | `Join Waitlist` | Luma |

**Note:** No "100% of Proceeds Support Bitcoin Park" callout on Summit Pass (removed per Rod).

### Tickets page hero
- Keep simple. Eyebrow + h1 + short paragraph + scroll-to-tiers button.
- Remove "Skip ahead — join the waitlist" secondary button.

---

## Information architecture

### Nav: 9 items → 8 items

| # | Old | New |
|---|---|---|
| 01 | Home | Home |
| 02 | The Imagine IF Idea | **The Imagine IF Idea** *(absorbs About content)* |
| 03 | Speakers | Speakers |
| 04 | Agenda | Agenda |
| 05 | Sponsors | Sponsors |
| 06 | Tickets | Tickets |
| 07 | Venue & Nashville | Venue & Nashville |
| 08 | About | — *(merged into #02)* |
| 09 | Past Ignite Talks | Past Ignite Talks |

- Update drawer nav (`chrome.jsx`).
- Update footer "Event" + "Practical" lists.
- Remove `page-about.jsx`, fold any unique content into `page-idea.jsx`.

### Footer cleanup
- Remove dead `#` links: AI Freedom Lab, Newsletter, Press kit.
- AI Freedom Lab: **drop from Family block** until AFL has a public site. (Family block becomes thin — just `Bitcoin Park ↗`. Acceptable, or move Press into Family. Recommend: collapse Family into Practical with `Bitcoin Park ↗` and `Press` as the only family items.)
- Newsletter: **remove**. Single-funnel rule.
- Press kit: **replace with `mailto:community@bitcoinpark.com`** labelled `Press`.
- Code of conduct / Terms / Privacy: **remove the legal row** for v1 (no real pages behind them; better silent than dead-linked).

---

## Speaker data sync (data.js update)

Align `data.js` speakers to the live imagineifnashville.com list. **9 confirmed + TBA placeholder.**

### Keep + update titles
| Name | Role | Org |
|---|---|---|
| Cathie Wood | Founder, CEO, and CIO | ARK Invest |
| Jeff Booth | Author & Entrepreneur | The Price of Tomorrow |
| Alex Gladstein | Chief Strategy Officer | Human Rights Foundation |
| Scott Harrison | Founder and CEO | charity: water |
| Art Laffer | Founder and Chairman | Laffer Associates |
| Gideon Powell | CEO | Cholla Inc. |

### Update
- **Hash Hashemian**: `Co-founder, Cholla Inc.` → `President, American Nuclear Society`
- **Joe Liemandt**: `Founder, ESW Capital` → `Principal, Alpha School`

### Add
- **Obi Nwoso** — `CEO, Fedi`. (Note: Fedi also appears in sponsors — that's fine, both roles can coexist.)

### Drop
- **Preston Pysh** — not on the public speaker list.

### Bios + talk prompts
- Keep existing bios/prompts for speakers retained.
- Hash + Joe + Obi: need new bios/prompts. Placeholder text marked `TBD` in data.js until copy is written.

---

## Brand alignment fixes

### Logo treatment
- Current: white PNG + CSS filter hack to fake midnight blue. Fragile.
- **Action:** Note as known issue. Get a proper midnight-blue logo file from Leah Dorrian / brand assets. Until then, the filter works — leave it but tag the CSS rule with a `/* TODO */` comment.

### "75 speakers" honesty
- Fixed in At-a-Glance and Speaker mosaic (see Home page section).

### Stage naming (Ten31/OpenSats removal)
- `data.js` `event.stages`: `['Main Theater', 'Ballroom']` — keep as-is internally.
- Public-facing copy: refer to stages as `Main Theatre Stage` and `Second Stage` (consistent everywhere).
- Search & replace anywhere "Ten31" or "OpenSats" appears as a stage name and remove. (Note: Ten31 stays in `data.js` sponsors list — that's a sponsor entity, separate from stage branding.)

---

## What stays untouched

- Color system (all 5 IIF brand colors + paper neutrals)
- Typography (Rethink Sans / Cormorant Garamond / Encode Sans Expanded)
- Art components: `HeroOrb`, `GradientField`, `SpeakerArt`, `Convergence`, `Spark`, `Door`
- Button system, pill system, card system
- Animation: reveal-on-scroll, hero entrance keyframes, page transitions
- Pages NOT being restructured: `page-speakers`, `page-agenda`, `page-sponsors`, `page-venue`, `page-past`
- Footer structure (only content updates, no layout changes)

---

## Open follow-ups (post-launch or pre-launch deps)

1. **Trailer compression** — `uploads/trailer.mp4` is 175MB. Compress to ~30-50MB before any public link.
2. **Trailer poster frame** — extract a key frame for the `<video poster>` attribute.
3. **Real speaker headshots** — replace abstract `SpeakerArt` as photos become available.
4. **Hash / Joe / Obi bios + prompts** — write 2-line bios and "Imagine IF…" prompts.
5. **Cycling prompts revision** — Rod to revise once agenda sheet is accessible (currently auth-gated).
6. **Real logo file** — midnight-blue version from brand assets.
7. **Sponsor logo lockups** — replace text-only marquee with actual logos.

---

## Implementation order (suggested)

1. Tickets page rewrite (highest-leverage, smallest blast radius)
2. Nav + footer + IA merge (Idea+About → one page, remove tweaks panel)
3. Home page hero — wire real trailer, fix caption, swap CTA copy
4. Home page content fixes — duplicate prompts, fake stats, new "The Format" section, Social Proof strip
5. Speaker data sync (data.js)
6. Stage name cleanup (search & replace)
7. Footer dead-link cleanup
8. Final pass: brand-voice review of every copy block

# CMAC Containers — Coming Soon Landing Page

## Session: June 11, 2026

### Goal
Build a temporary "Coming Soon" landing page for **cmaccontainers.com** that feels premium and on-brand — not a generic placeholder.

### Design Decisions

| Decision | Rationale |
|----------|-----------|
| **Aesthetic: Industrial Editorial** | Matches CMAC's architectural brochure (red accents, sketch renderings, blueprint precision). Hybrid of "Exaggerated Minimalism" + "Industrial Utilitarian" from frontend-design playbook. |
| **Brand red `#E31E24`** | Taken from CMAC brochure/logo — not generic orange from design-system search. |
| **Fonts: Archivo + DM Sans** | Archivo for bold industrial headlines; DM Sans for readable body (Google Fonts, `font-display: swap`). |
| **Signature move: Blueprint grid + red rules** | Subtle coordinate grid background + horizontal red dividers echo brochure layout. |
| **Horizontal anatomy scroll** | "Horizontal Scroll Journey" pattern from ui-ux-pro-max — lets the breakout diagram breathe on mobile. |
| **Bento feature grid** | Scannable value props: turn-key delivery, workforce housing, modular construction, 2–4 week build stat. |
| **Spec ticker** | Pulled from anatomy infographic: 320 sq ft, 40×8×8.5ft, 7ft ceiling, 2–4 weeks, 250-mile delivery. |

### Assets Used
- `assets/images/flagship.png` — Hero flagship render
- `assets/images/anatomy.png` — Exploded construction diagram
- `assets/images/brochure.png` — Architectural sketch brochure spread
- `assets/images/logo.png` — CMAC logo (header + footer)

### File Structure
```
index.html          — Semantic page structure
css/styles.css      — Design tokens, layout, motion
js/main.js          — Scroll reveals, form handling, localStorage waitlist
assets/images/      — Optimized asset copies
```

### Form Behavior
Email capture stores addresses in `localStorage` under key `cmac_waitlist` until a backend (e.g. Mailchimp, Formspree, Supabase) is connected. Shows loading/success/error states per UX guidelines.

### Accessibility
- Skip link, semantic landmarks, labeled inputs, `aria-live` form status
- `prefers-reduced-motion` disables ticker, reveals, hover transforms
- Focus-visible rings on interactive elements
- Descriptive alt text on all images

### Deployment
Static files — deploy to any host (Netlify, Vercel, S3, cPanel). Point `cmaccontainers.com` DNS to hosting. No build step required.

### Future Hooks
- Replace localStorage form with API endpoint
- Add Google Analytics / Meta Pixel when ad campaigns launch
- Swap "Coming Soon" strip for launch date when confirmed


### Session: June 23, 2026 — Financing Addition (Fix)

**Problem:** Financing HTML was deployed without matching CSS, causing unstyled SVG icons to render at full viewport size in the hero.

**Fix:**
- Removed broken hero finance card (unstyled SVGs)
- Removed AI-generated banner image from financing section (off-brand)
- Added complete financing CSS: ribbon, section, stats panel, nav link
- Restored original 4-card bento grid
- Financing touchpoints: fixed ribbon, nav link (#financing), ticker item, dedicated section, footer link

**Financing URL:** Ascentium Capital partner landing page (integration.financepartners.com)

### Session: July 8, 2026 — Switch to First Citizens Equipment Finance

**Change:** Replaced all Ascentium Capital / Finance Partners links and copy with CMAC’s First Citizens Equipment Finance portal.

**Research notes:**
- `https://cmac.firstcitizensef.com/` is a CMAC-co-branded First Citizens Equipment Finance application portal (online credit app). It does **not** publish productized limits such as “$2M financing,” “$400K application-only,” “$0 down,” “100% bundle,” or tax write-off claims.
- Those figures came from the previous Ascentium marketing page and were **removed** so the site does not overstate First Citizens terms.
- Public First Citizens Equipment Finance materials describe commercial equipment loans/leases; specific CMAC deal terms are determined in application underwriting.

**Site updates:**
- All Apply for Financing links → `https://cmac.firstcitizensef.com/`
- Partner name → First Citizens Equipment Finance
- Benefits + stats rewritten to process/partner facts only (no invented dollar amounts)
- Ribbon copy no longer references Ascentium $0-down language

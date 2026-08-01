# Brand Memory

**VERIFIED** — Real brand assets exist in Drive under `00-KNOWLEDGE/02-BRANDING` and the Blueprint vault's `20-BRANDING/` (confirmed 2026-07-23, unlike most top-level Drive folders which are empty placeholders).

**VERIFIED** — `platform/design-system` is the frozen-architecture home for brand tokens/component library in code ([ADR-0001](../../docs/decisions/ADR-0001-eta-system-target-architecture.md)); as of the last structural scan it remains a stub with no `src/`.

**RESOLVED (2026-07-27)** — The above UNKNOWN is now answered. Color values were extracted directly from the official `Logo.svg` (`/Users/ali/Documents/ETA/00-KNOWLEDGE/02-BRANDING/Logo/Logo.svg`): ink `#021F21`, petrol `#022022`/`#023D3C`/`#04403F`/`#085857`, teal `#28A09A`, orange `#FF7001`, orange-mid `#FD9802`, amber `#FEA808`, rust `#932402`. Typography is specified in `20-BRANDING/04-Visual-Identity/Typography.md` (ETA-VISUAL-002, Approved): Inter / Vazirmatn / JetBrains Mono.

**⚠️ CONFLICT (2026-07-27)** — `20-BRANDING/04-Visual-Identity/Colors.md` (ETA-VISUAL-001, **status: Approved v1.0**) specifies Navy `#0F172A` + Copper `#C57B39`. **Neither value appears anywhere in the official logo.** The most recent approved artifact — `20-BRANDING/02-Company-Profile/ETA-Company-Profile.html` (2026-07-25) — had already abandoned Colors.md and tokenised the real logo palette, matching the extraction above exactly. Resolution applied in `docs/website/DESIGN_SYSTEM.md`: **the logo governs**, per direct user instruction ("Logo colors are the base"). Superseding ETA-VISUAL-001 is a version bump + re-approval, not a silent edit — flagged as Gate D2 in `docs/website/IMPLEMENTATION_ROADMAP.md`.

**Contrast finding (verified by calculation, 2026-07-27)** — `--eta-orange` `#FF7001` on white is **2.8:1 and FAILS WCAG AA for text**. On light surfaces, orange text must be `--eta-rust` `#932402` (8.4:1). Orange remains correct as a *button fill* with white text. Full matrix in `docs/website/DESIGN_SYSTEM.md` §2.5.

**Physical asset gap (still open)** — only the 9-file logo family is produced. Colors/Fonts/Icons/Images/Videos folders are empty; `Brandbook.md` is 0 bytes; **no industrial photography or video exists in any form.** This is the longest-lead blocker for the website redesign.

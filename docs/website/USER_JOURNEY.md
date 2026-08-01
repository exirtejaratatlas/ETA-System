---
document_id: ETA-WEB-UJ-003
title: User Journeys
version: 0.1
status: Draft — awaiting approval
owner: Exir Tejarat Atlas
classification: Internal
last_updated: 2026-07-27
---

# ETA Digital Headquarters — User Journeys

Four personas, four journeys. Each is traced from trigger to outcome, with the **doubt** that kills it at each step and the **content that resolves that doubt**.

The governing insight: an industrial buyer is not looking for a supplier. They are looking for **a reason not to be blamed**. Every journey below is designed around de-risking a decision that someone else will audit.

---

## Journey 1 — Procurement Manager, urgent replacement *(P1, highest volume)*

### Context

A pump has failed at a petrochemical complex. Production is affected. The buyer has a datasheet, a tag number, and a deadline measured in days. They are evaluating three or four possible suppliers in a single afternoon.

**Emotional state:** time pressure, low patience, high scepticism. They have been let down before.
**Real question:** *"Can these people actually get me this item, and will I be embarrassed for having chosen them?"*

### Trace

| # | Step | Doubt | What resolves it |
|---|------|-------|------------------|
| 1 | Arrives from search or referral, lands on Home or a category page | *"Is this a real company or a broker with a website?"* | Cinematic industrial hero. Real facilities, not stock. Specific capability statement, not slogans. Trade-terms bar visible without scrolling. |
| 2 | Scans for the item category | *"Do they even handle rotating equipment?"* | Two business lines visible immediately. Equipment categories named in the buyer's own vocabulary — *rotating*, *static*, *instrumentation* — never "solutions". |
| 3 | Opens Rotating Equipment | *"Generic list, or do they know what they're talking about?"* | Sub-types, typical services, the standards they work to. Technical language used correctly. **This page is where credibility is won or lost.** |
| 4 | Checks whether ETA can deliver | *"Sourcing takes months. I have weeks."* | Logistics & Trade Terms: Incoterms EXW/FOB/CIF/DDP/DAP, documentation set, inspection regime, 12-month warranty. Concrete, verifiable, unusual to publish. |
| 5 | Looks for proof | *"Who else has trusted them?"* | **⚠️ THE GAP.** No projects, no references, no certifications exist. This is the weakest point in the entire journey — see §5. |
| 6 | Decides to enquire | *"How much of my afternoon does this cost?"* | Request a Quote, one click, always present. No account. Category pre-filled from the page they came from. |
| 7 | Completes the RFQ | *"Will my datasheet actually reach an engineer?"* | Drag-and-drop upload, files listed by name, visible progress. Identity requested **last**. |
| 8 | Submits | *"Did that go anywhere? Who has it?"* | Reference `ETA-RFQ-2026-0001` on screen and by email. Stated response commitment. Copy of the submission returned to them. |

### Success criteria

- Home → RFQ submitted in **under four minutes**
- No more than **three clicks** to reach the form
- Zero account creation
- Datasheet upload succeeds first time on a constrained connection

### Failure modes to design against

| Failure | Consequence |
|---------|-------------|
| Contact fields before requirement fields | Immediate abandonment — the buyer is not ready to identify themselves |
| Slow or silent upload | Assumes failure, leaves, does not return |
| No reference number | No proof of submission; cannot chase; cannot report internally |
| Generic marketing copy on the category page | Reads as a broker; loses on credibility before the form |

---

## Journey 2 — EPC Project Engineer, capital project *(P2, highest value)*

### Context

An EPC contractor is building a vendor list for a project package. The engineer will shortlist three to five suppliers, issue a formal enquiry with a full technical specification, and defend that shortlist to a project manager. The decision horizon is weeks. The order value is large.

**Emotional state:** methodical, evidence-driven, risk-averse.
**Real question:** *"Can I put this company on a vendor list without it becoming my problem?"*

### Trace

| # | Step | Doubt | What resolves it |
|---|------|-------|------------------|
| 1 | Arrives via technical search or industry route | *"Is this a serious counterparty?"* | Enterprise-grade first impression. Restraint reads as seriousness; decoration reads as sales. |
| 2 | Goes to Industries → EPC Projects | *"Have they worked in my environment?"* | EPC-specific language: package scope, vendor qualification, expediting, documentation submittals. |
| 3 | Assesses technical depth | *"Do they understand specifications, or just resell?"* | **Engineering & Technical Evaluation** page. The verified differentiator: ETA issues an **unpriced technical offer separately from the commercial offer**. That single fact answers this doubt better than any claim. |
| 4 | Checks sourcing reach | *"Where do they actually source from?"* | Equipment: Europe / China / UAE, project-based, no warehouse inventory. Steel: named Iranian mills. Honest and specific beats vague and global. |
| 5 | Checks compliance & QA | *"Inspection? Certificates? Documentation?"* | FAT inspection; Commercial Invoice, Packing List, COO, COC, Test Report; 12-month warranty from delivery/commissioning. |
| 6 | Checks commercial standing | *"Can they handle an LC and a performance bond?"* | 30% advance + 70% before shipment, or LC at sight. Performance and prepayment bonds via a first-class SWIFT-enabled bank. **Very few competitors publish this.** |
| 7 | Verifies legitimacy | *"Registered? Certified? Real?"* | **⚠️ GAP.** No registration number, no ISO, no certifications documented. |
| 8 | Issues a formal enquiry | *"I have a 40-page spec and a BOQ."* | RFQ accepts ZIP, multi-file, DWG, XLSX. Project name and tender reference are first-class fields. |
| 9 | Expects a technical dialogue | *"Will an engineer read this, or a salesperson?"* | Confirmation names the response path and commits to engineering review. |

### Success criteria

- Every question in a standard vendor pre-qualification form is answerable from the public site
- Technical depth is evident within two pages
- Large multi-file uploads (100 MB+) succeed
- Project and tender references are captured structurally, not in a free-text box

---

## Journey 3 — Supplier / Manufacturer *(P3)*

### Context

An OEM, agent, or mill representative wants to sell *to* ETA or be represented by it.

**Real question:** *"Is this a serious buyer worth my time, and how do I register?"*

### Trace

| # | Step | Doubt | What resolves it |
|---|------|-------|------------------|
| 1 | Arrives at Home or Become a Supplier | *"Are they a real buyer or a lead broker?"* | Scale and industry signals. Project-based model stated plainly. |
| 2 | Assesses fit | *"Do they buy what I sell?"* | Both business lines with full category trees. |
| 3 | Reviews the process | *"What does qualification involve?"* | Qualification steps, required documents, expected timeline. |
| 4 | Registers | *"How long is this form?"* | Short structured form: company, country, categories, certifications, catalogue upload. |
| 5 | Waits | *"Did anyone receive it?"* | Reference number, confirmation email, stated review window. |

### Design note

Supplier registration is **deliberately less prominent than the RFQ**. A supplier is a cost of doing business; a buyer is revenue. Suppliers will find the page — buyers must be caught. Supplier entry lives in the footer and on `/become-a-supplier`, never in the primary conversion path.

---

## Journey 4 — Existing customer, portal access *(P4)*

### Context

An existing customer needs the status of a quote, an order, or a document. They may be on a phone, in a plant, in a hurry.

**Real question:** *"Where is my thing?"*

### Trace

| # | Step | Requirement |
|---|------|-------------|
| 1 | Arrives with intent to log in | **Portal** visible in the utility rail on every page, every viewport |
| 2 | Clicks Portal | One click. Never buried under About or Contact. |
| 3 | Authenticates | Fast. Persian-first if that is their profile language. **⚠️ See Decision D2** — Odoo-direct vs. Keycloak is unresolved. |
| 4 | Enters the workspace | Clear visual transition into the application shell. No marketing chrome. |
| 5 | Finds the item | Quotes, orders, invoices, documents, RFQ history — sourced from Odoo, the system of record (ADR-0016/0017). |

### Boundary rule

The marketing site's only responsibility here is to **get the user to the login without friction**. It must never attempt to render portal data, and no marketing page may be gated behind authentication.

---

## 5. The credibility gap — the single largest risk

Three of the four journeys stall at the same step: **the search for proof.**

| Journey | Stalls at | Missing |
|---------|-----------|---------|
| P1 Procurement Manager | Step 5 | Projects, references, certifications |
| P2 EPC Engineer | Step 7 | Registration, ISO, vendor approvals |
| P3 Supplier | Step 1 | Client-side credibility signals |

No repository file, Drive document, or live page contains a single project case study, client reference, certification, or industrial photograph. This is not a design problem and cannot be solved by design.

### What must be commissioned

| Asset | Journey impact | Priority |
|-------|---------------|----------|
| **Industrial photography** — real facilities, equipment, steel, operations | Every hero on the site. The entire cinematic concept depends on it. | **P0** |
| **3–5 project case studies** — even anonymised (*"petrochemical complex, Khuzestan"*) | Resolves the P1 and P2 stall directly | **P0** |
| **Certifications / registration** | Resolves the P2 legitimacy check | **P0** |
| **Equipment OEM / manufacturer list** | Unblocks the entire Manufacturers section | **P1** |
| **Client references or logos** | Home trust bar | **P1** |
| **RFQ response SLA** | Confirmation credibility | **P1** |

### Interim position

Until these exist, the site leads with **what is verifiable**: trade terms, payment instruments, documentation set, inspection regime, warranty, the separate unpriced technical offer, named steel mills, and the project-based no-inventory model.

That is a genuinely strong hand, and it is currently invisible on the live site. A specific, verifiable trade-terms section outperforms a vague "trusted by industry leaders" claim with no logos behind it — and it carries no risk of being caught overstating.

**Do not build empty Projects or Manufacturers pages.** An empty proof page is worse than a missing one: it advertises the absence.

---

## 6. Cross-journey principles

1. **RFQ is always one click away.** Every page, every viewport, both languages.
2. **Never ask who before what.** Requirement first, identity last, in every form.
3. **Never require an account for a commercial action.** Registration walls are for portals, not enquiries.
4. **Specifics beat adjectives.** "LC at sight, 12-month warranty, FAT inspection" outperforms "world-class quality" with every one of these four personas.
5. **Speed is a trust signal.** A slow site reads as an unserious company — and the audience is on constrained connections.
6. **Persian is not a translation.** Half the primary audience will never read the English pages.
7. **Every claim must be defensible.** These buyers verify. One overstatement discovered destroys the rest.

---

## 7. Journey instrumentation

Measured with self-hosted analytics (IA §12).

| Metric | Definition | Target |
|--------|-----------|--------|
| **RFQ conversion** | Sessions submitting an RFQ ÷ total sessions | Baseline first, then improve |
| **RFQ start→finish** | Started ÷ completed | > 60 % |
| **Time to RFQ** | Landing → submission | < 4 min (P1) |
| **Upload success** | Attempted ÷ succeeded | > 98 % |
| **Category → RFQ** | Which categories generate enquiries | Ranked |
| **Language split** | FA vs EN sessions | Informs content investment |
| **Portal click-through** | Portal clicks ÷ sessions | Indicates P4 volume |
| **Search zero-results** | Queries returning nothing | **Highest-value list on the site** — it is a literal record of demand ETA is not visibly serving |
| **Proof-page exit rate** | Exits from Projects / Manufacturers | Quantifies the §5 gap |

---

*Next: `PAGE_SPECIFICATIONS.md` — section-by-section build specification for each template.*

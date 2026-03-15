# TattooLog — Product Roadmap

## Vision
TattooLog is a professional client-history and tattoo-record platform for tattoo shops and artists. It provides fast, reliable access to a client's full tattoo history — previous sessions, needle configurations, ink usage, healing outcomes, allergies, and more.

**Primary users:** Tattoo artists and front-desk/reception staff
**Data model:** Client-centric — client profiles are the top-level entity, with multiple tattoo session records nested under each client
**Persistence:** Frontend-only (localStorage) for now, architected to support a backend later

---

## Current State (MVP)
- Search page: look up a client by phone or email
- Account creation modal (name, DOB, email, phone)
- Account detail page showing basic client info
- localStorage persistence
- shadcn/ui components, Tailwind CSS, branded theme (Averia Serif Libre, eggshell/ink palette)

---

## Phase 1: Tattoo Session Records
**Priority:** Highest — this is the core value of the app.

### 1.1 Session Data Model
Each client can have multiple tattoo session records. A session captures:

**Basic info:**
- Date of session
- Artist name (selected from shop config)
- Brief description / title (e.g., "Sleeve continuation — koi fish")

**Technical details:**
- Body placement (e.g., left forearm, upper back)
- Tattoo size (approximate dimensions or small/medium/large)
- Needle configuration (liner, shader, mag, size — e.g., "7RL, 15M1")
- Ink brands and colors used
- Machine type / settings (optional)
- Stencil method (freehand, thermal, iPad, etc.)
- Session duration

**Photos:**
- Reference/design images
- Stencil placement photo
- Fresh tattoo photo
- Healed tattoo photos (added later)

**Healing & follow-up:**
- Healing outcome (good / minor issues / complications)
- Healing notes (free text)
- Touch-up needed (yes/no + notes)
- Follow-up date (simple date field, not a scheduler)

### 1.2 Session Creation Wizard
Multi-step form to reduce overwhelm:
1. **Basics** — date, artist, description, body placement, size
2. **Technical** — needle config, inks, machine, stencil method, duration
3. **Photos** — upload reference, stencil, and fresh tattoo photos
4. **Notes** — healing notes, complications, touch-up needed, follow-up date

Each step should be saveable independently (user can skip ahead or come back).

### 1.3 Session List View
On the client profile page, show a chronological list of all sessions:
- Date, description, artist, body placement as a summary card
- Thumbnail of the tattoo photo if available
- Click to expand full session details
- Ability to add a new session from the client profile

---

## Phase 2: Client Health Profile
Expand the client profile with medical/safety information.

### 2.1 Allergies & Skin Notes
- Known allergies (latex, specific ink brands, adhesives, etc.)
- Skin type / sensitivity notes
- Free-text field for additional skin observations

### 2.2 Medical Flags
- Relevant conditions: blood thinners, diabetes, autoimmune conditions, pregnancy, etc.
- Checkbox list of common flags + free-text for others
- Displayed prominently on the client profile (visible at a glance before starting work)

### 2.3 Consent & Waiver Tracking
- Record whether the client has signed a waiver
- Date of last signed waiver
- Notes field (e.g., "signed paper waiver, filed in cabinet 3")
- Visual indicator on client profile: current / expired / missing

---

## Phase 3: Photo Management
Photos are essential to the app's value.

### 3.1 Photo Upload & Storage
- Support image uploads (camera or file picker) for tattoo sessions
- Store photos in localStorage as base64 or use IndexedDB for blob storage (localStorage has size limits)
- Consider IndexedDB migration for this phase due to photo size

### 3.2 Photo Categories per Session
- Reference / design art
- Stencil placement
- Fresh tattoo (day-of)
- Healed progress (can add multiple over time with dates)

### 3.3 Photo Gallery View
- Grid view of all photos for a client across sessions
- Filter by session or photo type
- Tap to view full-size

---

## Phase 4: Search & Navigation Improvements

### 4.1 Enhanced Search
- Add **name search** to the existing phone/email lookup
- Search should match partial names (e.g., "Joh" finds "John Doe")
- Single search input that detects query type (name, email, or phone)

### 4.2 Recent Clients
- Show a list of recently viewed / recently created clients below the search bar on the landing page
- Persist recent list in localStorage (last 10–20 clients)
- Each entry shows name, last visit date, and a quick link to their profile

---

## Non-Goals (For Now)
- **Authentication / login** — no user accounts, no passwords
- **Cloud sync / backend** — all data stays in the browser
- **Appointment scheduling** — this is a records tool, not a calendar
- **Client self-service** — clients don't interact with the app directly
- **Reporting / analytics** — no dashboards with charts or business metrics

---

## Technical Notes

### Storage Strategy
- **Phases 1–2:** Continue using localStorage with JSON serialization
- **Phase 3 (Photos):** Migrate to IndexedDB for blob/photo storage; localStorage has a ~5MB limit that photos will quickly exceed
- **All phases:** Keep the `useAccounts` hook pattern — swap the storage backend inside the hook without changing component code

### Data Model IDs
- Use `crypto.randomUUID()` for all entity IDs (clients, sessions, photos)
- Add `shopId` and `artistId` fields from Phase 1 onward, even if shop config isn't built yet (use defaults)

### Photo Handling
- Accept JPEG/PNG from file input or device camera
- Compress/resize on the client side before storing (e.g., max 1200px wide) to manage storage limits
- Consider a `usePhotos` hook backed by IndexedDB, separate from the account data hook

---

## Implementation Order Summary
| Phase | Focus | Key Deliverable |
|-------|-------|----------------|
| 1 | Tattoo session records | Multi-step wizard, session list on client profile |
| 2 | Client health profile | Allergies, medical flags, consent tracking |
| 3 | Photo management | Upload, categorize, and view tattoo photos |
| 4 | Search & navigation | Name search, recent clients list |
| 5 | Shop & artist config | Settings page, artist dropdown, shop scoping |

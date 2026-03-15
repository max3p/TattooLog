# TattooLog — UI Branding Guidelines

## Brand Overview
**Product name:** TattooLog

**Product purpose:**  
TattooLog is a professional client-history and tattoo-record platform for tattoo shops and artists. It helps artists access a client’s tattoo history quickly and reliably, including details like previous needle configurations, ink usage, tattoo size, healing outcomes, allergies, and complications.

**Brand personality:**  
- Trustworthy  
- Calm  
- Professional  
- Slightly artisanal  
- Human, not clinical  
- Dark, premium, and tactile

The product should feel like a cross between:
- a **modern records system**
- a **premium tattoo studio notebook**
- a **subtle hand-crafted tool**

It should **not** feel flashy, neon, gamer-like, or overly medical.

---

## Core Visual Direction
Use **shadcn/ui** as the component foundation, then apply a strong visual identity through typography, color, texture, borders, and icon treatment.

### Visual keywords
- Black ink
- Eggshell paper
- Sketchbook
- Ledger
- Studio logbook
- Hand-drawn accents
- Minimal but warm
- Professional with texture

---

## Color System

### Primary palette
Use a restrained palette built around **black** and **off-white / eggshell** tones.

#### Base colors
- **Ink Black:** `#0D0D0D`
- **Soft Black:** `#171717`
- **Charcoal:** `#262626`
- **Eggshell:** `#F3EBDD`
- **Warm Paper:** `#E9DDCB`
- **Muted Beige:** `#D8C8B0`

#### Supporting neutrals
- **Border Taupe:** `#B7A58D`
- **Dust Brown:** `#8D7B66`
- **Muted Stone:** `#6F665C`

### Functional colors
Use semantic colors sparingly and keep them muted so they fit the brand.

- **Success:** muted olive/green, e.g. `#5F7154`
- **Warning:** muted amber, e.g. `#A67C37`
- **Error:** earthy red, e.g. `#8C4B42`
- **Info:** desaturated slate blue, e.g. `#5F6C7B`

### Usage rules
- Default background should lean **eggshell**, not pure white.
- Major surfaces can alternate between **eggshell** and **soft black** depending on layout mode.
- Avoid stark white (`#FFFFFF`) except where absolutely needed.
- Avoid bright saturated accent colors.
- Primary contrast should come from **light vs dark surfaces**, not vivid colors.

---

## Theme Approach

### Overall theme
The app should support a signature **dark editorial theme**:
- dark headers / dark nav / dark cards in some contexts
- eggshell content surfaces
- black typography and linework
- subtle warmth in all neutrals

### Recommended layout behavior
- **Sidebar / shell:** black or soft black
- **Main content area:** eggshell
- **Cards / records / tables:** slightly darker or lighter paper-toned surfaces
- **Dialogs / overlays:** dark charcoal with warm off-white text, or eggshell with dark borders depending on emphasis

---

## Typography

### Primary typeface
Use:

```css
font-family: 'Averia Serif Libre', serif;
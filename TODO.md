# TODO — The Unusual Things Around Us (Cape Town Edition)

Tracking against the WPR261 Project brief (100 marks total).

---

## Milestone 1 — HTML Structure & CSS Styling (30 marks)

### HTML structure
- [x] Header
- [x] Nav bar (sticky, hover underline)
- [x] Search section (markup only, no JS yet)
- [x] Results section (static sample cards: title, short description, thumbnail placeholder)
- [ ] Detailed information section (full description, 3+ facts, image, location/origin)
- [ ] Favourites section (visual "saved items" area)
- [ ] Comparison section (side-by-side layout for 2 items)
- [ ] "Why we chose this theme / how we gathered the information" page or section

### CSS styling
- [x] Header styled
- [x] Nav styled (sticky, hover state)
- [x] Search bar styled
- [x] Results grid + card styling
- [ ] Detail section styling
- [ ] Favourites section styling
- [ ] Comparison section styling
- [ ] Overall visual theme pass (make sure it reads as "Cape Town hidden attractions", not generic)

### Original research evidence (needed to avoid 20% penalty)
- [ ] Photograph 1 (with real photo, replacing "Photo coming soon" placeholders)
- [ ] Photograph 2
- [ ] Interview summary or personal observation
- [ ] Field notes from visiting a location
- [ ] Self-created comparison criteria for the theme

## Milestone 2 — JavaScript Implementation (40 marks)

- [ ] Event listener on Search button → filters items by search query
- [ ] Update results list dynamically using `document.createElement` + `appendChild` (no innerHTML dumps)
- [ ] Event listener on each item title/card → shows detailed info in the dedicated section, same page, no reload
- [ ] Favourites: class-toggling to add/remove items from the favourites section
- [ ] Print button → `window.print()` triggers print of the currently displayed item
- [ ] Compare feature: select any 2 items → show side-by-side using theme-appropriate criteria (e.g. Location, Year, Rarity)

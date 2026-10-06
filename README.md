# The Africa Explorers NG 🌍✨

A travel, exploration, community, and local discovery platform designed to help people discover, explore, and experience Nigeria through its states, culture, places, tours, events, spots, and local businesses.

---

## 🚀 Key Highlights & PRD Implementation

- **Dual-Currency Engine ($ USD / ₦ NGN):** Dynamic global toggle across all views with fixed benchmark ($25 = ₦30,000 / year => $1 = ₦1,200).
- **Annual Explorer Membership Pass:** $25 / ₦30,000 per year pass unlocking member-exclusive tour discounts (20–30% savings), digital passport privileges, and secret events.
- **Universal Explorer Identity:** Fixed Home State citizen identity (`Explorer in [HomeState]`) with dynamic statuses (`Visitor in [OtherState]`, `Wants to visit [WishlistState]`).
- **Tours & Visits Engine:** Dedicated itineraries distinct from events (Lagos Island Historic Walk, Lekki Canopy & Cruise, Erin Ijesha 7-Tiers Waterfall Trek, Osun-Osogbo Grove UNESCO tour, Ilesa Ancient Kingdom).
- **Location-Based Discovery Engine:** *"I'm going here, what do I need around here?"* with instant category grouping for **Stay**, **Eat**, **Experience & Guides**, and **Essentials** around key anchor sites.
- **Business Partner Ecosystem:** 8 PRD discovery pillars (Attractions, Accommodation, Food, Nightlife, Entertainment, Lifestyle, Shopping, Work) and 3 listing tiers (Basic ₦15k, Premium ₦35k, Featured ₦75k) with interactive partner analytics.
- **Admin Command Center:** Unified administration portal for state chapter unlocking, business moderation, tour bookings, explorer passport management, and financial reconciliation.

---

## 📂 Project Architecture

```text
├── index.html         # Homepage: hero, active chapters, tours, membership, events
├── lagos.html         # Lagos State chapter hub & diary
├── osun.html          # Osun State chapter hub, waterfalls & cultural tours
├── spots.html         # Spot discovery engine (8 categories + location anchors)
├── business.html      # Business onboarding wizard & partner performance dashboard
├── join.html          # Passport registration with live digital passport preview
├── dashboard.html     # Explorer dashboard: membership pass, bookings, journey timeline, wishlist
├── admin.html         # Admin command center: federation deployment, tours, moderation, financials
├── style.css          # Design system & responsive layout styles
└── script.js           # Dual currency engine, tour booking modal, location anchor logic, admin sync
```

---

## 🛠️ Getting Started

Open `index.html` in any modern web browser or serve locally with any static HTTP server:

```bash
# Using Python
python -m http.server 8080

# Using Node.js
npx serve .
```

---

## 📜 License & Ownership
Copyright © The Africa Explorers NG. All rights reserved.

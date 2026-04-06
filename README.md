# The Wild Oasis Website

**The Wild Oasis Website** is a modern hotel reservation platform where users can browse luxury cabins, view cabin details, authenticate with Google, make reservations, manage bookings, and update their profile — all built using Next.js and Supabase.

🎯 This repo contains the **customer-facing front-end** of the Wild Oasis project — a beautifully styled booking experience for guests of a fictional cabin retreat.

---

## 🚀 Features

- 🏡 **Browse Cabins** – Responsive cabin listing with images and availability.
- 📅 **Reservation System** – Users can select dates and book cabins.
- 🔐 **Authentication** – Google login with secure session management (NextAuth.js).
- 👤 **User Profile** – Guests can update their profile and view past/future reservations.
- ✏️ **Manage Bookings** – Users can edit or cancel their reservations.
- 📱 **Responsive UI** – Works on desktop and mobile.
- ⚡ **Fast Performance** – Built with Next.js (App Router) and Tailwind CSS. :contentReference[oaicite:1]{index=1}

---

## 📦 Technology Stack

| Layer | Technology |
|-------|------------|
| Frontend Framework | Next.js (App Router) |
| Styling | Tailwind CSS |
| Authentication | NextAuth.js (Google OAuth) |
| Backend | Supabase (Database + Auth) |
| UI Components | React & Utility Hooks |
| Utils | date-fns, React Day Picker | :contentReference[oaicite:2]{index=2}

---

## 📁 Project Structure
```bash
/
├─ app/ # Next.js App Router pages
├─ public/ # Static assets
├─ components/ # Reusable UI components
├─ styles/ # Global and Tailwind config
├─ .env.example # Sample environment variables
├─ next.config.mjs # Next.js configuration
├─ tailwind.config.js # Tailwind setup
├─ package.json # Dependencies & scrip
```

---

This project is open-source and available under the MIT License.

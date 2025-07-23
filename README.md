# 🧠 Personal Dashboard
Dashboard app built with React + Vite, styled with Tailwind CSS, routed with React Router, and enhanced by a growing set of custom hooks, charts, and UX touches like toast notifications.

This project is structured as a learning/portfolio build: modular, incremental, and focused on core frontend skills (state, effects, persistence, async, forms, theming, testing).

---

## 📚 Features
✅ App & Layout
Routing with React Router.

Persistent Sidebar layout (now includes Login & Signup links).

Global Theme system (light / dark / auto via system).

✅ Dashboard (/)
📊 Stats & charts (Recharts) themed dynamically.

🎞️ Slider (Swiper).

🔁 Data fetched via custom useApi.

🔢 Summary cards.

✅ Profile (/profile)
📝 Editable form (ProfileEditor).

✅ Validation via useForm.

💾 Persistence with useLocalStorage.

Header no longer shows user info (by design change).

✅ Notes (/notes)
🗂️ Notes stored in localStorage.

➕ Create notes via NotesForm.

🚮 Delete notes.

⏳ Search with debounced input (useDebounce).

🧠 Validation via useNotesForm.

🎨 Priority-based note styling.

🔔 Toast notifications (success/error, no-matches search).

✅ Settings (/settings)
Theme selection (Light / Dark / System).

Toast notification on theme change.

✅ Auth Views (UI only)
🔐 Login (/login) and Signup (/signup) pages created (visual components; no auth logic yet).

Branded with asset images.

---
## 🔔 Notifications
Integrated lightweight toast notifications using Sonner:

Feedback on note actions (create/delete).

Validation errors on forms.

Theme change confirmations.

Configurable duration & style overrides (supports dark mode).

---
## 🧪 Testing
Project includes unit tests for custom hooks using Vitest + Testing Library + JSDOM.

Tested hooks:

useLocalStorage – init, update, read existing.

useApi – success, HTTP error, network error (mocked fetch).

useDebounce – timing & value updates with fake timers.

useForm – validation & change handling.

useNotesForm – field validation, submit behavior.

useTheme – user prefs, system auto mode, DOM <html>.dark class (mocked matchMedia + useLocalStorage).

---
🔧 Run tests:
npm test

---
🛠 Technologies

⚛️ React + Vite | App scaffold & dev server
🎨 Tailwind CSS | Styling & theme-aware utilities
🔀 React Router | DOM Routing
📈 Recharts | Data visualizations
🎠 Swiper |	Slider/Carousel
🔔 Sonner |	Toast notifications
🧵 Custom Hooks | useApi, useForm, useLocalStorage, useNotesForm, useDebounce, useTheme
🧪 Vitest + Testing Library | Unit testing for hooks

## 🚀 Getting Started

1. Clone the repository:

**bash
git clone https://github.com/tu-usuario/personal-dashboard.git
cd personal-dashboard


2. Install dependencies:

npm install

3. Run dev

npm run dev
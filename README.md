# 🧠 Personal Dashboard

Dashboard app built with **React**, **Vite**, **Tailwind CSS**, and **React Router DOM**.

This project showcases key frontend skills through a clean layout, custom hooks, charts, and reusable components. It is organized into multiple feature pages and includes visual elements like interactive sliders and dynamic charts.

---

## 📚 Features (so far)

- ✅ App structure with routing using **React Router**
- ✅ Persistent `Sidebar` and `Header` via layout system
- ✅ Dashboard (`/`) with:
  - 📊 Chart components using **Recharts**
  - 🎞️ Slider component using **Swiper**
  - 🔁 Custom `useApi` hook for data fetching
  - 🔢 `SummaryCard` components to display total counts
- ✅ Profile page (`/profile`) with:
  - 📝 Editable form using `ProfileEditor`
  - ✅ Validation via custom `useForm` hook
  - 💾 Persistence using `useLocalStorage`
  - 👤 Header displays user information dynamically
- ✅ Notes and Settings pages (layout structure ready)

---

## 🧱 Technologies

- ⚛️ React + Vite
- 🎨 Tailwind CSS
- 🔀 React Router DOM
- 📈 Recharts
- 🎠 Swiper
- 📦 Custom Hooks: `useApi`, `useForm`, `useLocalStorage`

---

## 🚀 How to run

1. Clone the repository:

**bash
git clone https://github.com/tu-usuario/personal-dashboard.git
cd personal-dashboard


2. Install dependencies:

npm install

3. Run dev

npm run dev
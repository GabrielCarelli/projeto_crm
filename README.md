# Car Dealership CRM

A modern, web-based CRM tailored for car dealerships and internal sales teams. Built with **Next.js**, **Tailwind CSS**, and **SQLite**, this system helps manage sales tracking, client interests, and seller records — all secured with **Clerk** authentication.

---

## ✨ Features

- 🔐 **Authentication**: Secure login/signup using Clerk.
- 🚗 **Car Listings**: View and manage available vehicles.
- 📈 **Sales Tracking**: Monitor and record sales activities.
- 🧍 **Client Interests**: Capture and track potential buyer interest.
- 🧾 **Seller Registry**: Maintain profiles of all sales personnel.

---

## 🖥️ Tech Stack

- **Frontend**: [Next.js](https://nextjs.org/), [Tailwind CSS](https://tailwindcss.com/)
- **Database**: SQLite
- **Auth**: [Clerk](https://clerk.dev/)
- **Deployment**: [Vercel](https://vercel.com/)

---

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18
- SQLite installed (or use with Prisma)

### Installation

1. **Clone the repo**
   ```bash
   git clone https://github.com/your-username/car-dealership-crm.git
   cd car-dealership-crm
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:

   ```env
   CLERK_PUBLISHABLE_KEY=your-clerk-publishable-key
   CLERK_SECRET_KEY=your-clerk-secret-key
   NEXT_PUBLIC_CLERK_FRONTEND_API=your-clerk-frontend-api
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 Database

This project uses SQLite via Prisma (or any other ORM you're using). To initialize:

```bash
npx prisma migrate dev --name init
```

Make sure your `prisma/schema.prisma` is set up accordingly.

---

## ☁️ Deployment

Deploy easily on **Vercel**:

1. Push your code to GitHub
2. Import your project on [vercel.com](https://vercel.com/)
3. Add the environment variables from `.env.local` to the Vercel dashboard
4. Deploy!

---

## 🤝 Contributing

Contributions are welcome! Please open an issue or pull request for suggestions, improvements, or bug reports.

---

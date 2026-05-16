# مسابقة الماهر بالقرآن الكريم 2025

A production-ready Arabic RTL registration website for a yearly Quran competition, built with React, TypeScript, Tailwind CSS, and Supabase.

## Tech Stack

- **React 19** + **TypeScript**
- **Vite** (build tool)
- **Tailwind CSS v4** (styling)
- **React Router v7** (routing)
- **Supabase** (database & auth-ready)
- **xlsx** (Excel export)
- **jsPDF + jspdf-autotable** (PDF export)
- **lucide-react** (icons)

## Pages

- `/` — Landing page with competition details
- `/register` — Registration form
- `/success/:registrationNumber` — Success confirmation page
- `/admin` — Admin dashboard with stats, search, filters, export

## Setup Instructions

### 1. Install dependencies

```bash
npm install
```

### 2. Create a Supabase project

Go to [supabase.com](https://supabase.com) and create a new project.

### 3. Run the SQL schema

1. In your Supabase dashboard, open the **SQL Editor**
2. Copy the contents of `supabase/schema.sql`
3. Paste and run the script
4. This creates the `registrations` table with all constraints and indexes

### 4. Configure environment variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Fill in your Supabase project credentials:

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_ADMIN_PASSWORD=your-secure-admin-password
```

> **Note:** For development, the default admin password is `admin123` if `VITE_ADMIN_PASSWORD` is not set. **Change this in production.**

### 5. Run the development server

```bash
npm run dev
```

### 6. Build for production

```bash
npm run build
```

### 7. Deploy to Vercel

1. Push to a Git repository
2. Import into Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

## Database Schema

The `registrations` table includes:

| Column | Type | Notes |
|--------|------|-------|
| `id` | UUID | Primary key, auto-generated |
| `registration_number` | TEXT | Unique, format: `MQ-2025-XXXX` |
| `full_name` | TEXT | اسم رباعي |
| `age` | INTEGER | 3-100 |
| `gender` | TEXT | `male` or `female` |
| `national_id` | TEXT | Unique, 14 digits |
| `address` | TEXT | Full address |
| `phone` | TEXT | Unique, Egyptian mobile format |
| `has_whatsapp` | BOOLEAN | Whether phone has WhatsApp |
| `sheikh_name` | TEXT | Name of reciter/sheikh |
| `participated_before` | BOOLEAN | Previous participation |
| `status` | TEXT | `pending`, `approved`, or `rejected` |
| `created_at` | TIMESTAMPTZ | Auto-generated timestamp |

## Admin Dashboard

- Accessible at `/admin`
- Password-protected via `VITE_ADMIN_PASSWORD` environment variable
- View statistics, search, filter, update statuses, delete entries
- Export filtered data to **Excel** (.xlsx) or **PDF**

## Project Structure

```
src/
├── components/
│   ├── layout/      # Layout, Header, Footer
│   └── ui/          # Button, Card, Input, Toast
├── lib/
│   ├── supabase.ts  # Supabase client
│   └── registrations.ts  # API helpers
├── pages/
│   ├── Landing.tsx  # Landing page
│   ├── Register.tsx # Registration form
│   ├── Success.tsx  # Success confirmation
│   └── Admin.tsx    # Admin dashboard
├── types/
│   └── index.ts     # TypeScript types
├── App.tsx          # Routes
├── main.tsx         # Entry point
└── index.css        # Global styles & Tailwind theme
```

## Design

- RTL (Right-to-Left) Arabic-first UI
- Warm color palette: ivory, brown, muted gold
- Islamic-inspired subtle geometric pattern background
- Cairo font from Google Fonts
- Mobile-first responsive design
- Accessible form labels and focus states

## License

Private — for the Quran school's competition use.

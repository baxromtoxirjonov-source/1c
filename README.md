# TizimLug'at — Biznes Tizimlari Ensiklopediyasi & Katalogi

> O‘zbekiston korporativ bozori uchun ERP, CRM, POS, WMS, DMS va boshqa boshqaruv tizimlari katalogi hamda taqqoslash platformasi.

---

## 🚀 Texnologiyalar Steki (Tech Stack)

- **Framework:** Next.js 14+ (App Router)
- **Til:** TypeScript (strict mode)
- **Uslublash:** Tailwind CSS (Stitch dizayn tizimi tokenlari asosida)
- **Ma'lumotlar bazasi & Auth:** Supabase (PostgreSQL + RLS + Full-text Trigram Search RPC)
- **Komponentlar & Ikonkalar:** Lucide-react, Next-themes (Dark/Light mode)
- **Animatsiyalar:** Framer Motion & CSS keyframes
- **Validatsiya:** Zod
- **Deploy:** Vercel

---

## 📁 Loyiha Strukturasi

```
├── app/
│   ├── layout.tsx                # Root layout (Google Fonts, ThemeProvider, Header, Footer)
│   ├── page.tsx                  # Bosh sahifa (Hero, Arxitektura, Tizimlar, Platformalar, Wizard)
│   ├── tizimlar/
│   │   ├── page.tsx              # Tizim turlari katalogi (filter chips bilan)
│   │   └── [slug]/page.tsx       # Tizim batafsil sahifasi (FAQ accordion, JSON-LD)
│   ├── platformalar/
│   │   ├── page.tsx              # Xalqaro platformalar katalogi
│   │   └── [slug]/page.tsx       # Platforma tahlili va xususiyatlari
│   ├── ozbekiston/
│   │   └── page.tsx              # O'zbekiston milliy dasturlari (BILLZ, Didox, Modme...)
│   ├── taqqoslash/
│   │   └── page.tsx              # Interaktiv taqqoslash matritsasi (?items=...)
│   ├── qidiruv/
│   │   └── page.tsx              # Qidiruv natijalari sahifasi
│   ├── sitemap.ts & robots.ts    # SEO indeksatsiya
│   ├── loading.tsx & error.tsx   # Yuklanish va xatolik holatlari
│   └── not-found.tsx             # 404 sahifasi
├── components/
│   ├── cards/                    # SystemTypeCard, PlatformCard, LocalSystemCard
│   ├── layout/                   # Header, Footer, LayoutShell
│   ├── sections/                 # Hero, ArchitectureShowcase, RecommendationWizard, CompareView
│   └── ui/                       # SearchCommandPalette, CategoryFilterChips, FloatingCompareBar
├── lib/
│   ├── data/                     # Offline & SSR fallback ma'lumotlar to'plami
│   ├── supabase/                 # Supabase client & server factory (@supabase/ssr)
│   ├── queries.ts                # Keshlanuvchi so'rovlar (ISR 1 hour)
│   ├── recommend.ts              # Deterministik 3-bosqichli tavsiya algoritmi
│   └── utils.ts                  # cn() yordamchisi
├── messages/
│   └── uz.json                   # Barcha UI matnlari (hardcoded matnlarsiz)
├── supabase/
│   ├── migrations/               # PostgreSQL jadvallar, RLS va search_all RPC
│   └── seed.sql                  # 14 ta tizim, 11 ta platforma, 6 ta mahalliy yechim
└── types/
    └── database.ts               # Strict TypeScript ma'lumotlar bazasi modellari
```

---

## 🛠 O‘rnatish va Ishga Tushirish (Local Setup)

### 1. Bog‘liqliklarni o‘rnatish:
```bash
npm install
```

### 2. Muhit o‘zgaruvchilarini sozlash:
`.env.example` faylidan nusxa olib `.env.local` yarating:
```bash
cp .env.example .env.local
```

`.env.local` tarkibi:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
NEXT_PUBLIC_TELEGRAM_LINK=https://t.me/tizimlugat
```

*(Eslatma: Agar Supabase ulanmagan bo‘lsa ham, ilova avtomatik tarzda to‘liq ma'lumotlar to‘plamiga ega bo‘lgan offline fallback orqali 100% xatosiz ishlayveradi).*

### 3. Supabase Migratsiya va Seed ma'lumotlarini yuklash:
Supabase Dashboard SQL Editor bo‘limida quyidagi fayllarni navbati bilan bajaring:
1. `supabase/migrations/20240101000000_init_schema.sql` (jadvallar, indekslar, RLS va qidiruv RPC)
2. `supabase/seed.sql` (boshlang‘ich ma'lumotlar)

### 4. Dasturni ishga tushirish:
```bash
npm run dev
```
Brauzerda [http://localhost:3000](http://localhost:3000) manzilini oching.

### 5. Ishlab chiqarishga yig‘ish (Production Build):
```bash
npm run build
npm run start
```

---

## 🌐 Vercel Deploy Qadamlari

1. Kodni GitHub repozitoriyasiga yuklang (`git push`).
2. [Vercel Dashboard](https://vercel.com) orqali repozitoriyani import qiling.
3. **Environment Variables** bo‘limiga quyidagilarni kiriting:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_TELEGRAM_LINK`
4. **Deploy** tugmasini bosing. Next.js 14 App Router avtomatik tarzda statik sahifalarni (SSG) va ISR keshini qurib beradi.

---

## 📜 Litsenziya
MIT © 2026 TizimLug'at.

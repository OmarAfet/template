## About This Project
A simple web development starter template using React 19, Next.js 15, TailwindCSS, and Shadcn UI. I created this for my personal projects, but it's published for anyone who wants to use it.

Everything is pre-configured so you can focus on building features rather than setting up the technical foundation.

## Quick Start

```bash
git clone https://github.com/OmarAfet/template.git .
git remote rm origin
bun install
bun dev
```

## Supabase Requirement

**This template requires Supabase credentials to work properly.** Without them, you'll see an error message.

### Option 1: Use Supabase (Recommended)
1. Create a free account at [supabase.com](https://supabase.com)
2. Create a new project
3. Copy your project URL and anon key from [Project Settings > API](https://supabase.com/dashboard/project/_/settings/api)
4. Create a `.env.local` file in your project root:

```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

### Option 2: Remove Supabase
If you don't want to use Supabase, delete these files:
- `src/utils/supabase/` (entire folder)
- `src/actions/auth.ts`
- `src/app/auth/` (entire folder)
- `src/app/(app)/profile/` (entire folder)
- `src/components/profile/` (entire folder)
- `src/components/common/Supabase*` files
- `src/middleware.ts`

Then remove Supabase dependencies:
```bash
bun remove @supabase/ssr @supabase/supabase-js
```
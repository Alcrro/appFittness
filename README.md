# AppFitness

Aplicație web de tracking fitness, construită cu React, TypeScript și Supabase.

## Funcționalități

- **Planuri de antrenament** — creează și gestionează planuri personalizate
- **Sesiuni active** — urmărește antrenamentul în timp real cu timer de odihnă
- **Logare seturi** — greutate, repetări și RPE pentru fiecare set
- **Istoric sesiuni** — vizualizează toate antrenamentele anterioare
- **Progres** — grafice de evoluție per exercițiu și greutate corporală
- **Exerciții cu imagini** — bibliotecă extinsă cu gantere + aparate pentru toate grupele musculare
- **Exerciții custom** — adaugă propriile exerciții

## Tech Stack

| Layer | Tehnologie |
|-------|-----------|
| UI | React 18 + TypeScript |
| Styling | Tailwind CSS (dark theme, accent portocaliu) |
| Routing | React Router DOM v6 |
| Charts | Recharts |
| Icons | Lucide React |
| Backend | Supabase (PostgreSQL + Auth) |
| Build | Vite |

## Instalare

```bash
# Clonează repo-ul
git clone https://github.com/Alcrro/appFittness.git
cd appFittness

# Instalează dependențele
npm install

# Configurează variabilele de mediu
cp .env.example .env
# Editează .env cu credențialele Supabase

# Pornește dev server
npm run dev
```

## Variabile de mediu

Creează un fișier `.env` în root:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Baza de date

Schema SQL se găsește în `supabase-schema.sql`. Rulează-o în **Supabase SQL Editor** pentru a crea tabelele.

Pentru a popula biblioteca de exerciții, rulează `supabase_seed_chest.sql`.

## Scripturi

```bash
npm run dev      # Development server
npm run build    # Build pentru producție
npm run preview  # Preview build local
```

## Structură

```
src/
  App.tsx                  # Routing principal
  context/AuthContext.tsx  # Autentificare globală
  hooks/                   # Data fetching (Supabase)
  components/
    layout/                # Layout, Header, BottomNav
    ui/                    # Button, Card, Input, Modal
    workout/               # ExerciseSelector
    session/               # RestTimer
  pages/                   # Dashboard, Workouts, History, Progress, Profile
  lib/
    supabase.ts            # Client Supabase
    exercises.ts           # Biblioteca exerciții
    exercise_images.ts     # Mapping imagini exerciții
  types/index.ts           # Tipuri TypeScript
```

## Grupele musculare acoperite

Piept · Spate · Umeri · Biceps · Triceps · Picioare · Abdomen

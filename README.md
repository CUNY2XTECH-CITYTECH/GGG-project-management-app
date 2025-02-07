# GitGalaxyGuardians

/my-fullstack-app
│── /frontend/             # Next.js Frontend
│   ├── public/            # Static assets
│   ├── src/               
│   │   ├── app/           # (If using App Router - Next.js 13+)
│   │   ├── pages/         # (If using Pages Router - Next.js 12)
│   │   ├── components/    # Reusable UI components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── context/       # Global state (React Context)
│   │   ├── styles/        # SCSS/CSS styling
│   │   ├── lib/           # Frontend utilities (API calls, helpers)
│   │   ├── types/         # TypeScript interfaces
│   │── .env               # Frontend environment variables
│   │── package.json       # Frontend dependencies
│   │── next.config.js     # Next.js config
│   
│── /backend/              # Backend (Next.js API routes + Drizzle)
│   ├── src/               
│   │   ├── db/            # Drizzle ORM setup
│   │   │   ├── schema.ts  # Database schema (Drizzle)
│   │   │   ├── migrations/ # Migration files
│   │   │   ├── drizzle.ts # Database connection setup
│   │   ├── api/           # API routes (if using Next.js API)
│   │   │   ├── auth.ts    # Authentication API
│   │   │   ├── users.ts   # User-related API endpoints
│   │   ├── middleware/    # Middleware (auth, validation, logging)
│   │   ├── services/      # Business logic & API service handlers
│   │   ├── utils/         # Utility functions
│   │   ├── config/        # Configurations (e.g., database, auth)
│   │── drizzle.config.ts  # Drizzle configuration
│   │── .env               # Backend environment variables
│   │── package.json       # Backend dependencies
│   │── tsconfig.json      # TypeScript config
│
│── /database/             # (Optional) Database setup if separate
│   ├── migrations/        # Drizzle ORM migrations
│   ├── seed.ts            # Seeding script
│
│── /docker/               # (Optional) Docker setup for database
│── package.json           # Monorepo dependencies (if shared)
│── README.md              # Documentation

# Storygram - Instagram Stories Clone

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?logo=vercel)](https://instagram-stories-teal.vercel.app/)  
*A performant Instagram Stories clone built with Next.js*

## 🚀 Features

- 📱 Stories will change automatically every 5 seconds
- 🖼️ Tapping left will switch the story to previous one & tapping on right will switch to the next story.
- ↔️ Touch and keyboard navigation
- ⚡ Performance-optimized components
## 🛠 Setup & Installation

### Prerequisites
- Node.js ≥18.x
- npm/yarn/pnpm

### 1. Clone the repository
```
git clone https://github.com/Sharmaryan/instagram-stories.git
```

```
cd storygram
```

### 2. Install dependencies

```
npm install
 or
yarn install
 or
pnpm install
```

### 3. Run the development server

```
npm run dev
 or
yarn dev
 or
pnpm dev
```

### 4. Run tests

```
npm run test:e2e
 or
yarn test:e2e
 or
pnpm test:e2e
```

### 5. Run e2e tests in browser

```
npm run cypress
 or
yarn cypress
 or
pnpm cypress
```

## 🏗️ Production Build

```
npm run build
 or
yarn build
 or
pnpm build
```

## 🛠 Tech Stack

- Framework: Next.js (App Router)
- Styling: Tailwind CSS
- State Management: Custom Hooks
- Testing: Cypress
- Hosting: Vercel

## 🧠 Design Decisions & Performance Optimization
### Performance
- Lazy loaded heavy components using next's dynamic()
- Memoized functions using react's useCallback() hook
- Optimized Image (eager loading, set quality,priority fetch,etc)
### Design
- Took the inspiration from instagram, made changes in color, background color and kept the design simple.
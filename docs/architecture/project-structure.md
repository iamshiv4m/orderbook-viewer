# Project Structure

## 📁 Directory Organization

The Orderbook Viewer follows a feature-based architecture with clear separation of concerns. Here's the complete project structure:

```
orderbook-viewer/
├── docs/                          # Documentation
│   ├── architecture/             # Architecture documentation
│   ├── features/                 # Feature documentation
│   ├── development/              # Development guides
│   └── README.md                 # Main documentation index
├── public/                       # Static assets
│   ├── favicon.ico
│   ├── next.svg
│   └── *.svg                     # Icon assets
├── src/                          # Source code
│   ├── app/                      # Next.js App Router
│   │   ├── favicon.ico
│   │   ├── globals.css          # Global styles
│   │   ├── layout.tsx           # Root layout
│   │   └── page.tsx             # Home page
│   ├── features/                 # Feature-based modules
│   │   ├── market-depth/        # Market depth visualization
│   │   ├── order-simulation/    # Order simulation feature
│   │   └── orderbook/           # Orderbook display feature
│   └── shared/                  # Shared utilities and components
│       ├── components/          # Reusable UI components
│       ├── utils/               # Utility functions
│       └── types/               # Shared type definitions
├── .gitignore                   # Git ignore rules
├── eslint.config.mjs            # ESLint configuration
├── next.config.ts               # Next.js configuration
├── package.json                 # Dependencies and scripts
├── postcss.config.mjs           # PostCSS configuration
├── README.md                    # Project README
└── tsconfig.json               # TypeScript configuration
```

## 🏗️ Feature-Based Architecture

### Feature Structure Pattern

Each feature follows a consistent structure:

```
features/
└── feature-name/
    ├── components/              # Feature-specific components
    │   ├── ComponentName.tsx
    │   ├── ComponentNameSkeleton.tsx
    │   └── index.ts            # Component exports
    ├── hooks/                   # Custom hooks
    │   └── useFeatureData.ts
    ├── services/                # API services
    │   └── featureApi.ts
    ├── types/                   # Feature-specific types
    │   └── featureTypes.ts
    ├── utils/                   # Feature utilities
    │   └── featureUtils.ts
    └── index.ts                 # Feature exports
```

### Feature Organization Principles

1. **Self-contained**: Each feature contains all related code
2. **Cohesive**: Related functionality is grouped together
3. **Loose coupling**: Features depend minimally on each other
4. **High cohesion**: Feature components work together closely

## 📦 Feature Modules

### 🎯 Orderbook Feature

**Purpose**: Real-time orderbook data display and management

```
features/orderbook/
├── components/
│   ├── OrderbookTable.tsx      # Orderbook table display
│   ├── OrderbookViewer.tsx     # Main orderbook viewer
│   ├── OrderbookSkeleton.tsx   # Loading skeleton
│   └── OrderbookViewerSkeleton.tsx
├── hooks/
│   └── useOrderbookData.ts     # Orderbook data hook
├── services/
│   └── exchangeApis.ts         # Exchange API services
├── types/
│   └── orderbook.ts            # Orderbook type definitions
├── utils/
│   └── orderbookUtils.ts       # Orderbook utilities
└── index.ts                    # Feature exports
```

**Key Responsibilities**:

- Real-time orderbook data fetching
- Multi-venue exchange integration
- WebSocket connection management
- Orderbook visualization

### 🎮 Order Simulation Feature

**Purpose**: Order simulation and impact analysis

```
features/order-simulation/
├── components/
│   ├── OrderSimulationForm.tsx      # Order form
│   ├── OrderImpactMetrics.tsx       # Impact analysis
│   ├── OrderSimulationFormSkeleton.tsx
│   └── OrderImpactMetricsSkeleton.tsx
├── types/
│   └── orderSimulation.ts           # Simulation types
├── utils/
│   └── impactCalculationUtils.ts    # Impact calculations
└── index.ts                         # Feature exports
```

**Key Responsibilities**:

- Order form handling and validation
- Impact calculation and analysis
- Order visualization in orderbook
- Risk assessment and warnings

### 📈 Market Depth Feature

**Purpose**: Market depth visualization and analysis

```
features/market-depth/
├── components/
│   ├── MarketDepthChart.tsx         # Depth chart
│   ├── MarketDepthTooltip.tsx       # Chart tooltip
│   └── MarketDepthChartSkeleton.tsx
├── types/
│   └── marketDepth.ts               # Depth chart types
├── utils/
│   └── depthDataUtils.ts            # Data preparation
└── index.ts                         # Feature exports
```

**Key Responsibilities**:

- Market depth data preparation
- Interactive chart visualization
- Cumulative volume analysis
- Price level insights

## 🔧 Shared Module

### Shared Components

```
shared/components/
├── ErrorBoundary.tsx           # Error boundary component
├── LoadingSpinner.tsx          # Loading spinner
├── Skeleton.tsx                # Skeleton loading component
└── index.ts                    # Component exports
```

### Shared Utilities

```
shared/utils/
├── cn.ts                       # Class name utility
├── formatters.ts               # Data formatting utilities
├── strings/
│   ├── stringUtils.ts          # String utilities
│   └── stringValidation.ts     # String validation
└── index.ts                    # Utility exports
```

## 🎨 Styling Architecture

### CSS Organization

```
src/app/globals.css             # Global styles and CSS variables
```

**CSS Variables Structure**:

```css
:root {
  /* Color System */
  --color-bg-primary: #ffffff;
  --color-bg-secondary: #f8f9fa;
  --color-text-primary: #1a1a1a;
  --color-text-secondary: #666666;

  /* Trading Colors */
  --color-buy: #10b981;
  --color-sell: #ef4444;
  --color-warning: #f59e0b;
  --color-error: #ef4444;
  --color-success: #10b981;
}
```

### Tailwind Configuration

The project uses Tailwind CSS with custom configuration for:

- Trading-specific colors
- Responsive breakpoints
- Custom animations
- Component variants

## 📱 Component Architecture

### Component Patterns

1. **Container Components**: Handle data fetching and state management
2. **Presentation Components**: Pure UI components
3. **Skeleton Components**: Loading state components
4. **Error Boundaries**: Error handling components

### Component Structure

```typescript
// Standard component structure
interface ComponentProps {
  // Props definition
}

export default function ComponentName({}: // Props destructuring
ComponentProps) {
  // Hooks and state
  // Event handlers
  // Render logic
}
```

## 🔄 State Management

### State Organization

1. **Local State**: Component-level state with useState
2. **Custom Hooks**: Reusable state logic
3. **Context**: Shared state when needed
4. **Server State**: API data management

### State Flow

```
API Data → Custom Hook → Component State → UI Update
     ↓           ↓            ↓           ↓
  Fetching   Processing   Rendering   User Interaction
```

## 🧪 Testing Structure

### Test Organization

```
__tests__/
├── components/                 # Component tests
├── features/                   # Feature tests
├── utils/                      # Utility tests
└── integration/               # Integration tests
```

### Testing Patterns

1. **Unit Tests**: Individual component and utility tests
2. **Integration Tests**: Feature interaction tests
3. **E2E Tests**: End-to-end user flow tests
4. **Visual Tests**: UI component snapshot tests

## 📦 Build Configuration

### Next.js Configuration

```typescript
// next.config.ts
const nextConfig = {
  experimental: {
    turbo: {
      rules: {
        "*.svg": {
          loaders: ["@svgr/webpack"],
          as: "*.js",
        },
      },
    },
  },
  env: {
    // Environment variables
  },
  images: {
    domains: ["www.okx.com", "api.bybit.com", "www.deribit.com"],
  },
};
```

### TypeScript Configuration

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["dom", "dom.iterable", "es6"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

## 🚀 Development Workflow

### File Naming Conventions

- **Components**: PascalCase (e.g., `OrderbookTable.tsx`)
- **Hooks**: camelCase with `use` prefix (e.g., `useOrderbookData.ts`)
- **Utilities**: camelCase (e.g., `orderbookUtils.ts`)
- **Types**: camelCase with `.ts` extension (e.g., `orderbook.ts`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `API_ENDPOINTS.ts`)

### Import Organization

```typescript
// 1. React and Next.js imports
import React from "react";
import { useState, useEffect } from "react";

// 2. Third-party library imports
import { useForm } from "react-hook-form";
import { z } from "zod";

// 3. Internal feature imports
import { OrderbookData } from "../types/orderbook";

// 4. Shared utility imports
import { formatPrice } from "@/shared/utils/formatters";

// 5. Component imports
import OrderbookTable from "./OrderbookTable";
```

## 📊 Performance Considerations

### Bundle Optimization

1. **Code Splitting**: Dynamic imports for large components
2. **Tree Shaking**: Unused code elimination
3. **Lazy Loading**: Component lazy loading
4. **Bundle Analysis**: Regular bundle size monitoring

### Caching Strategy

1. **API Response Caching**: TTL-based caching
2. **Component Memoization**: React.memo for expensive components
3. **Hook Memoization**: useMemo and useCallback optimization
4. **Static Asset Caching**: CDN caching for assets

## 🔒 Security Architecture

### Input Validation

1. **Client-side**: Zod schema validation
2. **Server-side**: API input sanitization
3. **Type Safety**: TypeScript strict mode
4. **Error Boundaries**: Graceful error handling

### API Security

1. **Rate Limiting**: Request throttling
2. **CORS**: Proper cross-origin handling
3. **HTTPS**: Secure connections
4. **Input Sanitization**: XSS prevention

---

This architecture provides a scalable, maintainable, and performant foundation for the Orderbook Viewer application.

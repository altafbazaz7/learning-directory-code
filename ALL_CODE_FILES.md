# Complete Source Code for Learning Support Provider Directory

## Setup Instructions
1. Create directory: `mkdir learning-support-directory && cd learning-support-directory`
2. Copy all files below into the correct structure
3. Run: `npm install && npm run dev`
4. Open: `http://localhost:5000`

---

## File: package.json
```json
{
  "name": "learning-support-directory",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "NODE_ENV=development tsx server/index.ts",
    "build": "tsc && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "@radix-ui/react-select": "^2.0.0",
    "@radix-ui/react-slot": "^1.0.2",
    "@radix-ui/react-toast": "^1.1.5",
    "@radix-ui/react-alert-dialog": "^1.0.5",
    "@tanstack/react-query": "^5.0.0",
    "@types/express": "^4.17.21",
    "@types/node": "^20.0.0",
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@vitejs/plugin-react": "^4.2.0",
    "autoprefixer": "^10.4.16",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.0.0",
    "express": "^4.18.2",
    "framer-motion": "^10.16.0",
    "lucide-react": "^0.294.0",
    "postcss": "^8.4.32",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-hook-form": "^7.48.0",
    "tailwind-merge": "^2.2.0",
    "tailwindcss": "^3.4.0",
    "tailwindcss-animate": "^1.0.7",
    "tsx": "^4.6.0",
    "typescript": "^5.3.0",
    "vite": "^5.0.0",
    "wouter": "^3.0.0",
    "zod": "^3.22.0"
  }
}
```

## File: tsconfig.json
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": false,
    "noUnusedParameters": false,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./client/src/*"],
      "@shared/*": ["./shared/*"]
    }
  },
  "include": ["client/src", "server", "shared"]
}
```

## File: vite.config.ts
```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./client/src"),
      "@shared": path.resolve(__dirname, "./shared"),
    },
  },
  root: "./client",
  build: {
    outDir: "../dist/client",
  },
});
```

## File: tailwind.config.ts
```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./client/src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [],
} satisfies Config;

export default config;
```

## File: postcss.config.js
```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

## File: shared/schema.ts
```typescript
import { z } from "zod";

export const providerSchema = z.object({
  id: z.number(),
  name: z.string(),
  specialization: z.string(),
  location: z.string(),
  rating: z.string(),
  shortDescription: z.string(),
  longDescription: z.string(),
  contactEmail: z.string(),
  phoneNumber: z.string(),
  available: z.boolean(),
  reviewCount: z.number(),
});

export type Provider = z.infer<typeof providerSchema>;

export const insertProviderSchema = providerSchema.omit({ id: true });
export type InsertProvider = z.infer<typeof insertProviderSchema>;
```

## File: client/index.html
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Learning Support Provider Directory - Habot Connect</title>
    <meta name="description" content="Find qualified learning support professionals to help children with learning difficulties. Connect with dyslexia specialists, ADHD coaches, and more in Dubai.">
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

## File: client/src/main.tsx
```typescript
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

## File: client/src/App.tsx
```typescript
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import ProvidersPage from "@/pages/providers";
import ProviderDetailPage from "@/pages/provider-detail";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={ProvidersPage} />
      <Route path="/providers" component={ProvidersPage} />
      <Route path="/providers/:id" component={ProviderDetailPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <Router />
    </QueryClientProvider>
  );
}

export default App;
```

## File: client/src/index.css
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --background: hsl(0, 0%, 100%);
  --foreground: hsl(222.2, 84%, 4.9%);
  --muted: hsl(210, 40%, 98%);
  --muted-foreground: hsl(215.4, 16.3%, 46.9%);
  --popover: hsl(0, 0%, 100%);
  --popover-foreground: hsl(222.2, 84%, 4.9%);
  --card: hsl(0, 0%, 100%);
  --card-foreground: hsl(222.2, 84%, 4.9%);
  --border: hsl(214.3, 31.8%, 91.4%);
  --input: hsl(214.3, 31.8%, 91.4%);
  --primary: hsl(207, 90%, 54%);
  --primary-foreground: hsl(211, 100%, 99%);
  --secondary: hsl(153, 60%, 53%);
  --secondary-foreground: hsl(24, 9.8%, 10%);
  --accent: hsl(33, 95%, 52%);
  --accent-foreground: hsl(24, 9.8%, 10%);
  --destructive: hsl(0, 84.2%, 60.2%);
  --destructive-foreground: hsl(60, 9.1%, 97.8%);
  --ring: hsl(222.2, 84%, 4.9%);
  --radius: 0.5rem;
}

.dark {
  --background: hsl(222.2, 84%, 4.9%);
  --foreground: hsl(210, 40%, 98%);
  --muted: hsl(217.2, 32.6%, 17.5%);
  --muted-foreground: hsl(215, 20.2%, 65.1%);
  --popover: hsl(222.2, 84%, 4.9%);
  --popover-foreground: hsl(210, 40%, 98%);
  --card: hsl(222.2, 84%, 4.9%);
  --card-foreground: hsl(210, 40%, 98%);
  --border: hsl(217.2, 32.6%, 17.5%);
  --input: hsl(217.2, 32.6%, 17.5%);
  --primary: hsl(207, 90%, 54%);
  --primary-foreground: hsl(211, 100%, 99%);
  --secondary: hsl(153, 60%, 53%);
  --secondary-foreground: hsl(0, 0%, 98%);
  --accent: hsl(33, 95%, 52%);
  --accent-foreground: hsl(0, 0%, 98%);
  --destructive: hsl(0, 62.8%, 30.6%);
  --destructive-foreground: hsl(0, 0%, 98%);
  --ring: hsl(212.7, 26.8%, 83.9%);
}

@layer base {
  * {
    @apply border-border;
  }

  body {
    @apply font-sans antialiased bg-background text-foreground;
    font-family: 'Inter', sans-serif;
  }
}

@layer utilities {
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
}
```

## File: client/src/lib/utils.ts
```typescript
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

## File: client/src/lib/queryClient.ts
```typescript
import { QueryClient } from "@tanstack/react-query";

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    throw new Error(`${res.status}: ${await res.text()}`);
  }
}

export async function apiRequest(
  path: string,
  options: RequestInit & { params?: Record<string, string> } = {}
) {
  const { params, ...init } = options;
  const url = new URL(path, window.location.origin);
  
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.set(key, value);
    });
  }

  const res = await fetch(url, init);
  await throwIfResNotOk(res);
  return res.json();
}

type UnauthorizedBehavior = "returnNull" | "throw";

export const getQueryFn = <T>(options: { 
  on401: UnauthorizedBehavior;
}) => async ({ queryKey }: { queryKey: readonly unknown[] }): Promise<T> => {
  const [path, ...params] = queryKey as [string, ...unknown[]];
  
  try {
    return await apiRequest(path, { 
      params: params.length > 0 ? 
        Object.fromEntries(params.map((p, i) => [`param${i}`, String(p)])) : 
        undefined 
    });
  } catch (error: any) {
    if (error.message.includes("401") && options.on401 === "returnNull") {
      return null as T;
    }
    throw error;
  }
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      staleTime: 5 * 60 * 1000,
      retry: false,
    },
  },
});
```

## File: client/src/lib/api.ts
```typescript
import { Provider } from "@shared/schema";
import providersData from "../data/providers.json";

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  async getProviders(): Promise<Provider[]> {
    await delay(800);
    return providersData as Provider[];
  },

  async getProvider(id: number): Promise<Provider | null> {
    await delay(500);
    const provider = providersData.find(p => p.id === id);
    return provider ? (provider as Provider) : null;
  },

  async searchProviders(query: string, specialization?: string): Promise<Provider[]> {
    await delay(600);
    let filtered = providersData as Provider[];

    if (query) {
      const searchLower = query.toLowerCase();
      filtered = filtered.filter(provider => 
        provider.name.toLowerCase().includes(searchLower) ||
        provider.specialization.toLowerCase().includes(searchLower)
      );
    }

    if (specialization && specialization !== '') {
      const specializationLower = specialization.toLowerCase();
      filtered = filtered.filter(provider =>
        provider.specialization.toLowerCase().includes(specializationLower)
      );
    }

    return filtered;
  }
};
```

## Continue in next message for remaining files...
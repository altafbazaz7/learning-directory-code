# Complete Code Files for Learning Support Provider Directory

## 1. package.json
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
    "@hookform/resolvers": "^3.3.2",
    "@radix-ui/react-select": "^2.0.0",
    "@radix-ui/react-slot": "^1.0.2",
    "@radix-ui/react-toast": "^1.1.5",
    "@radix-ui/react-tooltip": "^1.0.7",
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

## 2. shared/schema.ts
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

## 3. client/src/data/providers.json
```json
[
  {
    "id": 1,
    "name": "Sarah Thompson",
    "specialization": "Dyslexia Support Specialist",
    "location": "Dubai Marina",
    "rating": "4.8",
    "reviewCount": 32,
    "shortDescription": "Experienced learning specialist with 8+ years helping children overcome reading difficulties through personalized approaches.",
    "longDescription": "Sarah is a dedicated learning specialist with over 8 years of experience helping children overcome reading difficulties. She holds a Master's degree in Special Education and is certified in the Orton-Gillingham approach to dyslexia intervention. Sarah believes in creating a supportive, encouraging environment where children can build confidence while developing essential reading skills. Her approach combines evidence-based methods with creative teaching strategies, tailored to each child's unique learning style. Sarah has successfully helped over 200 children improve their reading abilities and develop a love for learning.",
    "contactEmail": "sarah.thompson@habotconnect.ae",
    "phoneNumber": "+971 50 123 4567",
    "available": true
  },
  {
    "id": 2,
    "name": "Dr. Michael Chen",
    "specialization": "ADHD Coaching & Behavioral Support",
    "location": "JLT - Jumeirah Lake Towers",
    "rating": "5.0",
    "reviewCount": 48,
    "shortDescription": "Licensed psychologist specializing in ADHD management and executive function skills for children and teens.",
    "longDescription": "Dr. Michael Chen is a licensed psychologist with extensive experience in ADHD coaching and behavioral support. He specializes in helping children and teenagers develop executive function skills, emotional regulation, and coping strategies. Dr. Chen uses evidence-based approaches including cognitive behavioral therapy and mindfulness techniques to support his clients in achieving their academic and personal goals.",
    "contactEmail": "michael.chen@habotconnect.ae",
    "phoneNumber": "+971 50 234 5678",
    "available": true
  },
  {
    "id": 3,
    "name": "Lisa Rodriguez",
    "specialization": "Speech & Language Therapy",
    "location": "Business Bay",
    "rating": "4.9",
    "reviewCount": 28,
    "shortDescription": "Certified speech-language pathologist with expertise in articulation, language development, and communication disorders.",
    "longDescription": "Lisa Rodriguez is a certified speech-language pathologist with over 6 years of experience working with children of all ages. She specializes in articulation disorders, language development delays, and communication difficulties. Lisa uses play-based therapy techniques and innovative technology to make sessions engaging and effective for her young clients.",
    "contactEmail": "lisa.rodriguez@habotconnect.ae",
    "phoneNumber": "+971 50 345 6789",
    "available": false
  },
  {
    "id": 4,
    "name": "Ahmed Al-Mansouri",
    "specialization": "Autism Support Specialist",
    "location": "Al Barsha",
    "rating": "4.7",
    "reviewCount": 15,
    "shortDescription": "Board-certified behavioral analyst specializing in ABA therapy and social skills development for children on the autism spectrum.",
    "longDescription": "Ahmed Al-Mansouri is a board-certified behavioral analyst with specialized training in Applied Behavior Analysis (ABA) therapy. He has dedicated his career to supporting children on the autism spectrum and their families. Ahmed's approach focuses on developing communication skills, social interaction, and independence through evidence-based interventions tailored to each child's unique needs.",
    "contactEmail": "ahmed.almansouri@habotconnect.ae",
    "phoneNumber": "+971 50 456 7890",
    "available": true
  },
  {
    "id": 5,
    "name": "Rachel Johnson",
    "specialization": "Learning Disabilities Coach",
    "location": "Downtown Dubai",
    "rating": "4.9",
    "reviewCount": 41,
    "shortDescription": "Educational consultant with expertise in learning differences, study skills, and academic accommodation strategies.",
    "longDescription": "Rachel Johnson is an educational consultant with over 10 years of experience supporting students with various learning differences. She specializes in developing personalized learning strategies, study skills training, and advocating for appropriate academic accommodations. Rachel works closely with students, families, and schools to create comprehensive support plans that promote academic success and confidence.",
    "contactEmail": "rachel.johnson@habotconnect.ae",
    "phoneNumber": "+971 50 567 8901",
    "available": true
  },
  {
    "id": 6,
    "name": "Dr. Elena Popov",
    "specialization": "Educational Psychologist",
    "location": "DIFC",
    "rating": "5.0",
    "reviewCount": 23,
    "shortDescription": "Licensed educational psychologist providing comprehensive assessments and intervention strategies for learning challenges.",
    "longDescription": "Dr. Elena Popov is a licensed educational psychologist with expertise in psychological assessments and intervention planning for children with learning challenges. She conducts comprehensive evaluations to identify learning differences and develops evidence-based intervention strategies. Dr. Popov works collaboratively with families and educational teams to ensure children receive the support they need to succeed academically and emotionally.",
    "contactEmail": "elena.popov@habotconnect.ae",
    "phoneNumber": "+971 50 678 9012",
    "available": false
  }
]
```

## 4. client/index.html
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

## 5. client/src/main.tsx
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

## 6. client/src/index.css
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

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

## 7. server/index.ts
```typescript
import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }
      log(logLine);
    }
  });

  next();
});

(async () => {
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    log(`Unhandled application error: ${err}`, "error");
    res.status(status).json({ message });
  });

  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  const PORT = 5000;
  server.listen(PORT, "0.0.0.0", () => {
    log(`serving on port ${PORT}`);
  });
})();
```

## 8. Continue in next message for remaining files...
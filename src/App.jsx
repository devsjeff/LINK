import { useState } from "react";

const topics = [
  {
    id: 1,
    emoji: "🚀",
    title: "What is Next.js & Why It Exists",
    color: "#61DAFB",
    theory: [
      "Next.js is a React framework built on top of React. React builds UI, Next.js adds everything else: routing, data fetching, server rendering, API routes, and deployment optimization.",
      "The biggest problem with plain React (Vite/CRA) is that it's a Single Page Application — the browser gets a blank HTML file and JavaScript builds the UI. Search engines and slow devices struggle with this.",
      "Next.js solves this with Server-Side Rendering (SSR) and Static Site Generation (SSG) — pages are pre-built on the server and sent as ready HTML. Users see content instantly.",
      "Next.js uses the App Router (introduced in Next.js 13). The app/ folder is your entire app — each folder is a route, each page.jsx is what renders. No router config needed.",
      "Think of Next.js as React + Routing + Server + API + Optimization all in one. You only need one tool instead of five.",
    ],
    notes: [
      "Install: npx create-next-app@latest my-app → answers a few prompts → picks App Router by default.",
      "Plain React (Vite): browser gets blank HTML, JS builds the page. Next.js: server sends filled HTML. Much faster first load.",
      "Next.js is made by Vercel. Deploying to Vercel is one command: vercel — it auto-detects Next.js and sets everything up.",
      "The app/ folder replaces the old pages/ folder. If you see pages/ in tutorials, that's the legacy Pages Router — the concepts are the same, the file structure is different.",
      "Key advantage: Next.js is a full-stack framework — you can write backend API code in the same project as your frontend.",
    ],
    code: `// Create a new Next.js project
// npx create-next-app@latest my-app
// cd my-app
// npm run dev  → runs at http://localhost:3000

// Folder structure after creation:
// my-app/
// ├── app/
// │   ├── layout.jsx     ← root layout, wraps every page
// │   ├── page.jsx       ← the "/" home route
// │   └── globals.css    ← global styles
// ├── public/            ← static files (images, fonts)
// ├── next.config.js     ← Next.js configuration
// └── package.json

// app/page.jsx — your first page
export default function HomePage() {
  return (
    <main>
      <h1>Hello from Next.js!</h1>
      <p>This HTML was sent from the server.</p>
    </main>
  );
}

// app/layout.jsx — wraps every page
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}`,
  },
  {
    id: 2,
    emoji: "📁",
    title: "File-Based Routing",
    color: "#F7DF1E",
    theory: [
      "Next.js routing is based on the file system inside the app/ folder. You don't configure routes — you just create folders and files.",
      "Every folder inside app/ becomes a URL segment. A file called page.jsx inside that folder is what renders at that URL.",
      "A folder named [id] creates a dynamic route — the value in the URL becomes a parameter you can read in your component.",
      "layout.jsx wraps all pages inside its folder and all nested folders. It persists across navigation — it doesn't re-render when you navigate between child pages.",
      "loading.jsx, error.jsx, and not-found.jsx are special files that automatically handle loading states, errors, and 404s for their folder segment.",
    ],
    notes: [
      "app/page.jsx → /",
      "app/about/page.jsx → /about",
      "app/blog/page.jsx → /blog",
      "app/blog/[id]/page.jsx → /blog/1, /blog/2, /blog/abc (dynamic)",
      "app/blog/[...slug]/page.jsx → /blog/a/b/c (catch-all dynamic route)",
      "app/(marketing)/page.jsx → / (route groups with () don't affect the URL, just organize files)",
      "layout.jsx → shared UI wrapper. loading.jsx → shown while page loads. error.jsx → shown on error.",
    ],
    code: `// File structure → URL mapping:

// app/
// ├── page.jsx              →  /
// ├── about/
// │   └── page.jsx          →  /about
// ├── blog/
// │   ├── page.jsx          →  /blog
// │   └── [id]/
// │       └── page.jsx      →  /blog/1, /blog/42, etc.
// ├── shop/
// │   └── [...slug]/
// │       └── page.jsx      →  /shop/a/b/c
// └── (auth)/               ← route group — doesn't affect URL
//     ├── login/page.jsx    →  /login
//     └── register/page.jsx →  /register

// app/blog/[id]/page.jsx — reading URL params
export default function BlogPost({ params }) {
  return <h1>Post ID: {params.id}</h1>;
}

// app/blog/layout.jsx — wraps ALL blog pages
export default function BlogLayout({ children }) {
  return (
    <div>
      <nav>Blog Navigation</nav>
      {children}  {/* page content goes here */}
    </div>
  );
}

// app/blog/loading.jsx — auto shown while blog pages load
export default function Loading() {
  return <p>Loading post...</p>;
}`,
  },
  {
    id: 3,
    emoji: "🖥️",
    title: "Server Components vs Client Components",
    color: "#FF6B6B",
    theory: [
      "This is the most important concept in Next.js App Router. Every component is a Server Component by default — it runs only on the server, never in the browser.",
      "Server Components fetch data directly, access databases, use secrets/API keys safely — because they never ship JavaScript to the browser. Zero JS bundle size for these components.",
      "Client Components run in the browser and are needed for interactivity: useState, useEffect, onClick, onChange — anything that needs the browser or user interaction.",
      "To make a Client Component, add 'use client' as the very first line of the file. This tells Next.js to include this component's JS in the browser bundle.",
      "The pattern: Server Components for data fetching and static content (most of your app), Client Components only for interactive parts (forms, buttons, modals). Keep the tree as server-heavy as possible.",
    ],
    notes: [
      "'use client' at the top of a file makes it and ALL its imports into client components.",
      "Server Components CAN import Client Components. Client Components CANNOT import Server Components.",
      "You can pass Server Component data down to Client Components as props — that's the bridge.",
      "Server Components: async/await, direct DB access, no hooks, no browser APIs.",
      "Client Components: hooks (useState, useEffect), event handlers, browser APIs, localStorage.",
      "Rule of thumb: start with Server Component. Add 'use client' only when you need interactivity.",
    ],
    code: `// ✅ SERVER COMPONENT (default — no 'use client')
// Runs only on server. Can be async. Can fetch data directly.
async function UserProfile({ userId }) {
  // Fetch directly — no useEffect needed!
  const user = await fetch(\`https://api.example.com/users/\${userId}\`);
  const data = await user.json();

  return (
    <div>
      <h1>{data.name}</h1>
      <p>{data.email}</p>
      {/* Can render client components inside */}
      <LikeButton postId={data.id} />
    </div>
  );
}

// ✅ CLIENT COMPONENT — needs 'use client' for interactivity
"use client";  // MUST be the very first line

import { useState } from "react";

function LikeButton({ postId }) {
  const [liked, setLiked] = useState(false);

  return (
    <button onClick={() => setLiked(!liked)}>
      {liked ? "❤️ Liked" : "🤍 Like"}
    </button>
  );
}

// ❌ WRONG — can't use hooks in Server Component
async function Bad() {
  const [x, setX] = useState(0); // Error! No 'use client'
  return <div>{x}</div>;
}`,
  },
  {
    id: 4,
    emoji: "📡",
    title: "Data Fetching",
    color: "#A78BFA",
    theory: [
      "In Next.js App Router, data fetching happens directly inside Server Components using async/await — no useEffect, no loading state boilerplate.",
      "fetch() in Next.js is extended — it has built-in caching. By default, fetch results are cached. You control this with the cache option.",
      "Static fetching (cache: 'force-cache' or default): data fetched once at build time. Fast, CDN-cached. Good for data that rarely changes.",
      "Dynamic fetching (cache: 'no-store'): data fetched on every request. Always fresh. Good for user-specific or real-time data.",
      "Revalidation (next: { revalidate: 60 }): data is cached but regenerated in the background after N seconds. Best of both worlds — fast delivery + fresh data.",
    ],
    notes: [
      "No more: useEffect + useState + setLoading + setError. Just async/await in the component.",
      "fetch('url') → cached forever (static). fetch('url', { cache: 'no-store' }) → dynamic, always fresh.",
      "fetch('url', { next: { revalidate: 60 } }) → ISR (Incremental Static Regeneration) — refresh every 60s.",
      "For databases (Prisma, MongoDB), just call them directly in a Server Component — no API layer needed.",
      "Multiple fetches in one component run in parallel with Promise.all() — don't chain awaits unnecessarily.",
      "loading.jsx in the folder auto-wraps your page in a Suspense boundary — you get free loading UI.",
    ],
    code: `// app/users/page.jsx — Server Component with data fetch

// Static (cached at build time)
async function StaticPage() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const users = await res.json();

  return (
    <ul>
      {users.map((u) => <li key={u.id}>{u.name}</li>)}
    </ul>
  );
}

// Dynamic (fresh on every request)
async function DynamicPage() {
  const res = await fetch("https://api.example.com/live-data", {
    cache: "no-store",
  });
  const data = await res.json();
  return <div>{data.value}</div>;
}

// ISR — revalidate every 60 seconds
async function ISRPage() {
  const res = await fetch("https://api.example.com/posts", {
    next: { revalidate: 60 },
  });
  const posts = await res.json();
  return <ul>{posts.map(p => <li key={p.id}>{p.title}</li>)}</ul>;
}

// Parallel fetching (faster than sequential)
async function Dashboard() {
  const [userData, postsData] = await Promise.all([
    fetch("https://api.example.com/user").then(r => r.json()),
    fetch("https://api.example.com/posts").then(r => r.json()),
  ]);

  return (
    <div>
      <h1>{userData.name}</h1>
      <p>{postsData.length} posts</p>
    </div>
  );
}`,
  },
  {
    id: 5,
    emoji: "🔗",
    title: "Link & Navigation",
    color: "#34D399",
    theory: [
      "Next.js provides a <Link> component for client-side navigation — no full page reload, just like React Router's <Link>.",
      "useRouter() from next/navigation gives you programmatic navigation — redirect after form submit, go back, etc.",
      "usePathname() returns the current URL path — useful for highlighting active nav links.",
      "useSearchParams() reads query string parameters from the URL (?q=hello → searchParams.get('q')).",
      "useParams() reads dynamic route parameters — same as params prop but available anywhere in the component tree.",
    ],
    notes: [
      "Import Link from 'next/link' — NOT from react-router-dom. next/link is built-in, no install needed.",
      "Import navigation hooks from 'next/navigation' — NOT 'next/router' (that's the old Pages Router).",
      "Link prefetches pages in the background when they enter the viewport — navigation feels instant.",
      "useRouter, usePathname, useSearchParams — all require 'use client' since they're browser-side hooks.",
      "For server-side redirect: import { redirect } from 'next/navigation' and call redirect('/login').",
      "router.push('/path') → navigates and adds to history. router.replace('/path') → navigates without adding to history.",
    ],
    code: `// app/components/Navbar.jsx
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/",       label: "Home" },
  { href: "/about",  label: "About" },
  { href: "/blog",   label: "Blog" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav>
      {links.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          style={{ fontWeight: pathname === href ? "bold" : "normal" }}
        >
          {label}
        </Link>
      ))}
    </nav>
  );
}

// Programmatic navigation
"use client";
import { useRouter } from "next/navigation";

function LoginForm() {
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    await loginUser();
    router.push("/dashboard");    // redirect after login
  }

  return <form onSubmit={handleSubmit}>...</form>;
}

// Server-side redirect (no 'use client' needed)
import { redirect } from "next/navigation";

async function ProtectedPage() {
  const user = await getUser();
  if (!user) redirect("/login"); // server redirects before sending HTML
  return <h1>Welcome {user.name}</h1>;
}`,
  },
  {
    id: 6,
    emoji: "⚡",
    title: "Server Actions",
    color: "#FB923C",
    theory: [
      "Server Actions are async functions that run on the server but can be called directly from a Client Component — like calling a backend function from your frontend without writing an API route.",
      "You define a Server Action with 'use server' at the top of the function or file. Next.js creates a hidden API endpoint for it automatically.",
      "The most common use case: form submissions. Instead of an API route + fetch, you pass the Server Action directly to a form's action prop.",
      "Server Actions can mutate the database, send emails, revalidate cached data — anything a server-side function can do.",
      "After a mutation, call revalidatePath() or revalidateTag() to tell Next.js to regenerate the cached page with fresh data.",
    ],
    notes: [
      "'use server' goes at the top of the file (makes all exports Server Actions) or at the top of the function.",
      "Server Actions work with <form action={myAction}> — no JavaScript needed on the client for basic forms.",
      "In Client Components, call Server Actions like regular async functions: await createPost(data).",
      "revalidatePath('/blog') clears cache for /blog so next visit fetches fresh data.",
      "Never put 'use server' and 'use client' in the same file.",
      "Server Actions automatically handle CSRF protection — much safer than hand-rolled API endpoints.",
    ],
    code: `// app/actions.js — Server Actions file
"use server";

import { revalidatePath } from "next/cache";

// A Server Action — runs on server, called from anywhere
export async function createPost(formData) {
  const title = formData.get("title");
  const body  = formData.get("body");

  // Directly write to DB — no API route needed!
  await db.post.create({ data: { title, body } });

  // Clear the cached /blog page so it shows fresh data
  revalidatePath("/blog");
}

export async function deletePost(id) {
  await db.post.delete({ where: { id } });
  revalidatePath("/blog");
}

// app/blog/new/page.jsx — using Server Action in a form
import { createPost } from "../actions";

export default function NewPostPage() {
  return (
    // Pass Server Action directly to form — no JS needed!
    <form action={createPost}>
      <input name="title" placeholder="Post title" />
      <textarea name="body" placeholder="Post body" />
      <button type="submit">Create Post</button>
    </form>
  );
}

// From a Client Component — call like a function
"use client";
import { deletePost } from "@/app/actions";

function DeleteButton({ id }) {
  return (
    <button onClick={() => deletePost(id)}>
      Delete
    </button>
  );
}`,
  },
  {
    id: 7,
    emoji: "🛣️",
    title: "API Routes (Route Handlers)",
    color: "#EF4444",
    theory: [
      "Route Handlers let you build API endpoints inside your Next.js app — no separate backend needed. Create a file called route.js inside any folder in app/.",
      "Each exported function name corresponds to an HTTP method: GET, POST, PUT, DELETE, PATCH. Next.js automatically routes the request to the right function.",
      "Route Handlers receive a Web standard Request object and return a Web standard Response — no Express-style req/res.",
      "Use Route Handlers when you need a public API (for mobile apps, third parties, or JS fetch calls from Client Components). For internal mutations, prefer Server Actions.",
      "Dynamic API routes work the same as page routes — a folder named [id] makes the segment dynamic.",
    ],
    notes: [
      "File: app/api/users/route.js → URL: /api/users",
      "File: app/api/users/[id]/route.js → URL: /api/users/1, /api/users/42",
      "Return Response.json(data) or new Response(body, { status: 404 }).",
      "GET requests are cached by default. POST/PUT/DELETE are never cached.",
      "Read request body: const body = await request.json()",
      "Read query params: const { searchParams } = new URL(request.url); searchParams.get('q')",
      "Add headers: return Response.json(data, { headers: { 'X-Custom': 'value' } })",
    ],
    code: `// app/api/users/route.js

// GET /api/users
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const limit = searchParams.get("limit") || 10;

  const users = await db.user.findMany({ take: Number(limit) });
  return Response.json(users);
}

// POST /api/users
export async function POST(request) {
  const body = await request.json();
  const { name, email } = body;

  if (!name || !email) {
    return Response.json(
      { error: "name and email are required" },
      { status: 400 }
    );
  }

  const user = await db.user.create({ data: { name, email } });
  return Response.json(user, { status: 201 });
}

// app/api/users/[id]/route.js — dynamic route

// GET /api/users/42
export async function GET(request, { params }) {
  const user = await db.user.findUnique({
    where: { id: Number(params.id) },
  });

  if (!user) {
    return Response.json({ error: "User not found" }, { status: 404 });
  }

  return Response.json(user);
}

// DELETE /api/users/42
export async function DELETE(request, { params }) {
  await db.user.delete({ where: { id: Number(params.id) } });
  return Response.json({ deleted: true });
}`,
  },
  {
    id: 8,
    emoji: "🖼️",
    title: "Image & Font Optimization",
    color: "#06B6D4",
    theory: [
      "next/image provides an optimized <Image> component that automatically resizes, compresses, converts to modern formats (WebP/AVIF), and lazy-loads images — zero manual work.",
      "The Image component prevents Cumulative Layout Shift (CLS) — the annoying page jump when images load. You provide width and height, Next.js reserves the space.",
      "For images that fill their container (like hero backgrounds or cards), use fill={true} with a positioned parent — no fixed width/height needed.",
      "next/font loads Google Fonts and local fonts at build time, self-hosts them, and inlines the CSS — no external network request, no layout shift from font loading.",
      "Both are zero-config performance wins. You get lighthouse scores that take weeks to achieve manually, built-in by default.",
    ],
    notes: [
      "Use <Image> from 'next/image' instead of <img> — automatic optimization.",
      "width and height props are required (unless using fill) — prevents layout shift.",
      "fill={true} + parent has position:relative + sizes prop → responsive fill image.",
      "Remote images need domains allowlisted in next.config.js under images.remotePatterns.",
      "next/font: import { Inter } from 'next/font/google' → const inter = Inter({ subsets: ['latin'] }) → apply className.",
      "Local fonts: import localFont from 'next/font/local' → specify src path.",
      "Fonts are loaded once, cached, self-hosted — zero FOUT (Flash of Unstyled Text).",
    ],
    code: `// next/image — basic usage
import Image from "next/image";

function UserAvatar({ src, name }) {
  return (
    <Image
      src={src}
      alt={name}
      width={80}
      height={80}
      style={{ borderRadius: "50%" }}
    />
  );
}

// Fill mode (for responsive hero images)
function HeroBanner() {
  return (
    <div style={{ position: "relative", width: "100%", height: "400px" }}>
      <Image
        src="/hero.jpg"
        alt="Hero banner"
        fill
        style={{ objectFit: "cover" }}
        priority   // preload — use for above-the-fold images
      />
    </div>
  );
}

// Remote image (needs next.config.js allowlist)
// next.config.js:
// images: { remotePatterns: [{ protocol:'https', hostname:'images.unsplash.com' }] }

// next/font — Google Font
import { Geist, Fira_Code } from "next/font/google";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });
const firaCode = Fira_Code({ subsets: ["latin"], weight: ["400", "700"] });

// app/layout.jsx
export default function RootLayout({ children }) {
  return (
    <html lang="en" className={geist.variable}>
      <body className={firaCode.className}>{children}</body>
    </html>
  );
}`,
  },
  {
    id: 9,
    emoji: "🔒",
    title: "Middleware & Auth Basics",
    color: "#8B5CF6",
    theory: [
      "Middleware in Next.js is a function that runs before every request hits a page or API route. It's the perfect place to check authentication, redirect users, or modify headers.",
      "Create a file called middleware.js at the root of your project (not inside app/). It exports a middleware function and optionally a config object that specifies which routes to run on.",
      "The most common use: redirect unauthenticated users away from protected pages. Check for a session cookie → if missing, redirect to /login.",
      "Middleware runs on the Edge Runtime — it's extremely fast (runs at the CDN level) but has limited Node.js APIs. You can't use Prisma or complex node modules here.",
      "For full authentication, libraries like NextAuth.js (Auth.js) integrate directly with Next.js, handling sessions, OAuth providers, and database storage with minimal configuration.",
    ],
    notes: [
      "File location: middleware.js at the project root (same level as app/).",
      "config.matcher controls which routes trigger middleware. Use it — don't run auth checks on static files.",
      "NextResponse.redirect(url) → redirects. NextResponse.next() → continues normally.",
      "Read cookies: request.cookies.get('session')?.value",
      "Set headers: response.headers.set('X-Custom', 'value')",
      "Auth.js (NextAuth): npm install next-auth → set up in app/api/auth/[...nextauth]/route.js → use getServerSession() in Server Components.",
      "Never trust client-side auth checks alone — always verify on the server.",
    ],
    code: `// middleware.js — at the project root

import { NextResponse } from "next/server";

export function middleware(request) {
  const pathname = request.nextUrl.pathname;

  // Check for session cookie
  const session = request.cookies.get("session")?.value;

  // Protected routes — redirect to login if no session
  if (!session && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Already logged in — don't let them see login page
  if (session && pathname === "/login") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next(); // continue as normal
}

// Only run middleware on these routes (not on static files)
export const config = {
  matcher: ["/dashboard/:path*", "/login"],
};


// NextAuth.js setup (simplified)
// app/api/auth/[...nextauth]/route.js
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

const handler = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
});

export { handler as GET, handler as POST };

// Using session in a Server Component
import { getServerSession } from "next-auth";

async function ProfilePage() {
  const session = await getServerSession();
  if (!session) redirect("/login");
  return <h1>Hello, {session.user.name}</h1>;
}`,
  },
  {
    id: 10,
    emoji: "🏗️",
    title: "Rendering Strategies: SSG, SSR, ISR",
    color: "#10B981",
    theory: [
      "Next.js gives you three rendering strategies per page — you choose based on how fresh your data needs to be.",
      "Static Site Generation (SSG): page HTML is built once at deploy time. Fastest possible delivery — served from CDN. Best for blogs, docs, marketing pages that don't change often.",
      "Server-Side Rendering (SSR): HTML is generated fresh on every request. Always up-to-date. Best for personalized pages, dashboards, real-time data. Slightly slower than SSG.",
      "Incremental Static Regeneration (ISR): starts as static, but regenerates in the background after a set time. You get SSG speed + SSR freshness. Best of both worlds.",
      "In App Router, you don't set a renderingMode flag — the strategy is determined by how you fetch data (cached vs uncached) and whether you export dynamic config variables.",
    ],
    notes: [
      "SSG: fetch with default cache (or no fetch at all) → page built at build time.",
      "SSR: export const dynamic = 'force-dynamic' OR fetch with cache: 'no-store' → page renders on every request.",
      "ISR: fetch with next: { revalidate: N } → regenerated every N seconds in background.",
      "export const revalidate = 60 at the top of page.jsx → entire page revalidates every 60s (ISR shorthand).",
      "generateStaticParams() → pre-generates dynamic routes at build time (like getStaticPaths in Pages Router).",
      "Check rendering: run npm run build → ./ (static), ƒ (dynamic/SSR), ○ (ISR) symbols in build output.",
    ],
    code: `// ── SSG (Static — built once at deploy) ──────────────
// app/blog/page.jsx
// Default fetch = cached = SSG
async function BlogPage() {
  const posts = await fetch("https://api.example.com/posts").then(r => r.json());
  return <ul>{posts.map(p => <li key={p.id}>{p.title}</li>)}</ul>;
}

// Pre-generate dynamic routes at build time
export async function generateStaticParams() {
  const posts = await fetch("https://api.example.com/posts").then(r => r.json());
  return posts.map(p => ({ id: String(p.id) }));
}

// ── SSR (Server — fresh on every request) ─────────────
// app/dashboard/page.jsx
export const dynamic = "force-dynamic"; // OR use cache: 'no-store' in fetch

async function DashboardPage() {
  const data = await fetch("https://api.example.com/user", {
    cache: "no-store",  // never cache
  }).then(r => r.json());
  return <h1>Hello, {data.name}</h1>;
}

// ── ISR (Incremental — regenerate every N seconds) ────
// app/news/page.jsx
export const revalidate = 30; // regenerate every 30 seconds

async function NewsPage() {
  const news = await fetch("https://api.example.com/news").then(r => r.json());
  return (
    <ul>
      {news.map(n => <li key={n.id}>{n.headline}</li>)}
    </ul>
  );
}`,
  },
  {
    id: 11,
    emoji: "🌍",
    title: "Environment Variables & Config",
    color: "#F59E0B",
    theory: [
      "Environment variables store secrets (API keys, DB URLs) outside your code so they're never committed to Git.",
      "Next.js loads .env.local automatically. Variables defined here are only available on the server — they're never sent to the browser.",
      "To expose a variable to the browser (Client Components), prefix it with NEXT_PUBLIC_. Without this prefix, the variable is server-only.",
      "next.config.js is the main configuration file for Next.js — image domains, redirects, rewrites, headers, experimental features all go here.",
      "Never put secrets in NEXT_PUBLIC_ variables — anyone can see them in the browser's source. Only put public keys there (like a public analytics ID).",
    ],
    notes: [
      ".env.local → local dev only, not committed to git (add to .gitignore).",
      ".env → committed to git, base values (no secrets). .env.production → production overrides.",
      "Server: process.env.DATABASE_URL. Client: process.env.NEXT_PUBLIC_API_URL.",
      "NEXT_PUBLIC_ variables are baked into the JS bundle at build time — they can't change after build.",
      "On Vercel: add env vars in the project dashboard → Settings → Environment Variables.",
      "next.config.js changes require restarting the dev server.",
    ],
    code: `// .env.local (never commit this file!)
DATABASE_URL=postgresql://user:password@localhost:5432/mydb
JWT_SECRET=super-secret-key-123
STRIPE_SECRET_KEY=sk_test_abc123

// Public (safe to expose to browser)
NEXT_PUBLIC_API_URL=https://api.example.com
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

// Using env vars in Server Component
async function ServerPage() {
  // Works — server only
  const db = new Database(process.env.DATABASE_URL);
  const data = await db.query("SELECT * FROM users");
  return <ul>{data.map(u => <li key={u.id}>{u.name}</li>)}</ul>;
}

// Using env vars in Client Component
"use client";
function ClientPage() {
  // Only NEXT_PUBLIC_ vars work here
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  return <p>API: {apiUrl}</p>;
}

// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
    ],
  },
  async redirects() {
    return [
      { source: "/old-blog/:slug", destination: "/blog/:slug", permanent: true },
    ];
  },
  async headers() {
    return [
      { source: "/api/:path*",
        headers: [{ key: "Access-Control-Allow-Origin", value: "*" }] },
    ];
  },
};

export default nextConfig;`,
  },
  {
    id: 12,
    emoji: "📦",
    title: "Metadata & SEO",
    color: "#EC4899",
    theory: [
      "Next.js has a built-in Metadata API — export a metadata object or a generateMetadata function from any page.jsx or layout.jsx to set <head> tags.",
      "Static metadata: export const metadata = { title: '...', description: '...' } — simple and works for most pages.",
      "Dynamic metadata: export async function generateMetadata({ params }) — async function that can fetch data to build title/description for dynamic pages like blog posts.",
      "The metadata from layout.jsx is the base/default. Page-level metadata overrides it. Next.js merges them intelligently.",
      "OpenGraph and Twitter card metadata can be set in the same metadata object — Next.js generates all the right meta tags automatically.",
    ],
    notes: [
      "metadata or generateMetadata only works in Server Components (layout.jsx or page.jsx).",
      "title.template: '%s | My Site' → child pages set title: 'About' → renders as 'About | My Site'.",
      "openGraph.images needs a full absolute URL, not a relative path.",
      "robots: { index: true, follow: true } controls crawler behavior.",
      "viewport, themeColor, icons (favicon) all set in metadata too.",
      "Use next/og (ImageResponse) to generate dynamic social share images.",
    ],
    code: `// app/layout.jsx — base metadata (applies to all pages)
export const metadata = {
  title: {
    default: "My App",
    template: "%s | My App",   // "About | My App"
  },
  description: "A Next.js application",
  openGraph: {
    title: "My App",
    description: "A Next.js application",
    url: "https://myapp.com",
    siteName: "My App",
    images: [{ url: "https://myapp.com/og.png", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "My App",
    description: "A Next.js application",
    images: ["https://myapp.com/og.png"],
  },
  robots: { index: true, follow: true },
};

// app/about/page.jsx — static page metadata
export const metadata = {
  title: "About",       // renders as "About | My App" (from template)
  description: "Learn about our team",
};

// app/blog/[id]/page.jsx — dynamic metadata from data
export async function generateMetadata({ params }) {
  const post = await fetch(\`https://api.example.com/posts/\${params.id}\`)
    .then(r => r.json());

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      images: [{ url: post.coverImage }],
    },
  };
}

export default async function BlogPost({ params }) {
  const post = await fetch(\`https://api.example.com/posts/\${params.id}\`)
    .then(r => r.json());
  return <article><h1>{post.title}</h1><p>{post.body}</p></article>;
}`,
  },
];

export default function NextNotes() {
  const [selected, setSelected] = useState(0);
  const [tab, setTab] = useState("theory");

  const topic = topics[selected];

  return (
    <div
      style={{
        fontFamily: "'Fira Code', 'Courier New', monospace",
        background: "#0d1117",
        minHeight: "100vh",
        display: "flex",
        color: "#e6edf3",
      }}
    >
      {/* Sidebar */}
      <div
        style={{
          width: "220px",
          minWidth: "220px",
          background: "#161b22",
          borderRight: "1px solid #30363d",
          overflowY: "auto",
          padding: "16px 0",
        }}
      >
        <div
          style={{
            padding: "0 16px 16px",
            borderBottom: "1px solid #30363d",
            marginBottom: "8px",
          }}
        >
          <div
            style={{
              fontSize: "11px",
              color: "#8b949e",
              letterSpacing: "2px",
              textTransform: "uppercase",
            }}
          >
            Next.js
          </div>
          <div
            style={{
              fontSize: "18px",
              fontWeight: "700",
              color: "#61DAFB",
              marginTop: "4px",
            }}
          >
            Topics 1–12
          </div>
        </div>
        {topics.map((t, i) => (
          <button
            key={t.id}
            onClick={() => {
              setSelected(i);
              setTab("theory");
            }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              width: "100%",
              padding: "10px 16px",
              background: selected === i ? "#21262d" : "transparent",
              border: "none",
              borderLeft:
                selected === i
                  ? `3px solid ${t.color}`
                  : "3px solid transparent",
              color: selected === i ? "#e6edf3" : "#8b949e",
              cursor: "pointer",
              textAlign: "left",
              fontSize: "12px",
              transition: "all 0.15s",
            }}
          >
            <span style={{ fontSize: "16px" }}>{t.emoji}</span>
            <span style={{ lineHeight: "1.3" }}>
              {t.id}. {t.title}
            </span>
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, overflowY: "auto" }}>
        {/* Header */}
        <div
          style={{
            padding: "28px 32px 20px",
            borderBottom: "1px solid #30363d",
            background: "#0d1117",
            position: "sticky",
            top: 0,
            zIndex: 10,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "16px",
            }}
          >
            <span style={{ fontSize: "28px" }}>{topic.emoji}</span>
            <div>
              <span
                style={{
                  fontSize: "11px",
                  color: "#8b949e",
                  letterSpacing: "1px",
                }}
              >
                TOPIC {topic.id} OF {topics.length}
              </span>
              <h1
                style={{ margin: 0, fontSize: "22px", color: topic.color }}
              >
                {topic.title}
              </h1>
            </div>
          </div>
          {/* Tabs */}
          <div style={{ display: "flex", gap: "4px" }}>
            {["theory", "notes", "code"].map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                style={{
                  padding: "6px 16px",
                  borderRadius: "6px",
                  border: "1px solid",
                  borderColor: tab === t ? topic.color : "#30363d",
                  background:
                    tab === t ? topic.color + "22" : "transparent",
                  color: tab === t ? topic.color : "#8b949e",
                  cursor: "pointer",
                  fontSize: "12px",
                  fontFamily: "inherit",
                  textTransform: "capitalize",
                  letterSpacing: "0.5px",
                }}
              >
                {t === "theory"
                  ? "📖 Theory"
                  : t === "notes"
                  ? "📌 Notes"
                  : "💻 Code"}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div style={{ padding: "28px 32px" }}>
          {tab === "theory" && (
            <div>
              {topic.theory.map((point, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    gap: "14px",
                    marginBottom: "16px",
                    padding: "16px",
                    background: "#161b22",
                    borderRadius: "10px",
                    border: "1px solid #30363d",
                    borderLeft: `3px solid ${topic.color}`,
                  }}
                >
                  <span
                    style={{
                      color: topic.color,
                      fontWeight: "bold",
                      fontSize: "14px",
                      minWidth: "20px",
                    }}
                  >
                    {i + 1}.
                  </span>
                  <p
                    style={{
                      margin: 0,
                      color: "#c9d1d9",
                      lineHeight: "1.7",
                      fontSize: "14px",
                    }}
                  >
                    {point}
                  </p>
                </div>
              ))}
            </div>
          )}

          {tab === "notes" && (
            <div>
              <div
                style={{
                  background: "#161b22",
                  border: "1px solid #30363d",
                  borderRadius: "10px",
                  padding: "20px",
                }}
              >
                {topic.notes.map((note, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      gap: "10px",
                      padding: "10px 0",
                      borderBottom:
                        i < topic.notes.length - 1
                          ? "1px solid #21262d"
                          : "none",
                    }}
                  >
                    <span style={{ color: topic.color, fontSize: "16px" }}>
                      →
                    </span>
                    <p
                      style={{
                        margin: 0,
                        color: "#c9d1d9",
                        lineHeight: "1.7",
                        fontSize: "14px",
                      }}
                    >
                      {note}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === "code" && (
            <div>
              <div
                style={{
                  background: "#161b22",
                  border: "1px solid #30363d",
                  borderRadius: "10px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    background: "#21262d",
                    padding: "10px 16px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    borderBottom: "1px solid #30363d",
                  }}
                >
                  <span
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      background: "#ff5f57",
                      display: "inline-block",
                    }}
                  />
                  <span
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      background: "#febc2e",
                      display: "inline-block",
                    }}
                  />
                  <span
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      background: "#28c840",
                      display: "inline-block",
                    }}
                  />
                  <span
                    style={{
                      fontSize: "12px",
                      color: "#8b949e",
                      marginLeft: "8px",
                    }}
                  >
                    example.jsx
                  </span>
                </div>
                <pre
                  style={{
                    margin: 0,
                    padding: "20px",
                    overflowX: "auto",
                    fontSize: "13px",
                    lineHeight: "1.8",
                    color: "#e6edf3",
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word",
                  }}
                >
                  <code>{topic.code}</code>
                </pre>
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "20px 32px 32px",
            gap: "12px",
          }}
        >
          <button
            onClick={() => {
              setSelected(Math.max(0, selected - 1));
              setTab("theory");
            }}
            disabled={selected === 0}
            style={{
              padding: "10px 20px",
              borderRadius: "8px",
              border: "1px solid #30363d",
              background: selected === 0 ? "#161b22" : "#21262d",
              color: selected === 0 ? "#484f58" : "#c9d1d9",
              cursor: selected === 0 ? "not-allowed" : "pointer",
              fontSize: "13px",
              fontFamily: "inherit",
            }}
          >
            ← Previous
          </button>
          <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
            {topics.map((_, i) => (
              <div
                key={i}
                onClick={() => {
                  setSelected(i);
                  setTab("theory");
                }}
                style={{
                  width: selected === i ? "20px" : "8px",
                  height: "8px",
                  borderRadius: "4px",
                  background: selected === i ? topic.color : "#30363d",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              />
            ))}
          </div>
          <button
            onClick={() => {
              setSelected(Math.min(topics.length - 1, selected + 1));
              setTab("theory");
            }}
            disabled={selected === topics.length - 1}
            style={{
              padding: "10px 20px",
              borderRadius: "8px",
              border: "1px solid #30363d",
              background:
                selected === topics.length - 1 ? "#161b22" : "#21262d",
              color:
                selected === topics.length - 1 ? "#484f58" : "#c9d1d9",
              cursor:
                selected === topics.length - 1 ? "not-allowed" : "pointer",
              fontSize: "13px",
              fontFamily: "inherit",
            }}
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}

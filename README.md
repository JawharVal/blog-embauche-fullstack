# 🚀 Full-Stack Blog Platform

Next.js 16 (App Router) + Strapi v5 + TailwindCSS + TypeScript

A complete blog platform including content modeling, typed API integration, SEO, ISR, RSS, Sitemap, newsletter form, and dark mode.

---

## ⭐ Features

* **Next.js 16 App Router** (TypeScript)
* **Strapi v5 CMS** (Posts, Categories, Tags, Authors, Subscribers)
* **Zod-typed API fetching**
* **Dynamic SEO** (OpenGraph, Twitter, JSON-LD)
* **ISR (60 sec)** + Strapi **webhook** revalidation
* **Search** (title/excerpt/content)
* **Pagination** for category, tag, author
* **Newsletter form** stored in Strapi
* **next/image** for optimized Strapi media
* **Dark mode** (Context + localStorage)
* **Sitemap.xml** & **RSS.xml**
* **Readable architecture & model diagrams**

---

## 📦 Tech Stack

**Frontend:**

* Next.js 16 (App Router)
* TypeScript
* TailwindCSS
* Zod
* React Hook Form

**Backend:**

* Strapi v5 (TypeScript)
* SQLite/PostgreSQL
* REST API + API Tokens
* Webhooks

---

## 📂 Project Structure

```
next-blog-frontend/
│
├── app/
│   ├── page.tsx
│   ├── post/[slug]/page.tsx
│   ├── category/[slug]/page.tsx
│   ├── tag/[slug]/page.tsx
│   ├── author/[slug]/page.tsx
│   ├── search/page.tsx
│   ├── api/
│       ├── newsletter/route.ts
│       ├── sitemap.xml/route.ts
│       ├── rss.xml/route.ts
│       ├── revalidate/route.ts
│       └── revalidate-path/route.ts
│
├── components/
│   ├── NewsletterForm.tsx
│   ├── ThemeProvider.tsx
│   └── ThemeToggle.tsx
│
├── lib/
│   ├── strapiTyped.ts
│   ├── posts.ts
│   ├── categories.ts
│   ├── tags.ts
│   ├── authors.ts
│   └── schemas.ts
│
└── README.md
```

---

## 🔐 Environment Variables

Create a **`.env.local`** file:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
STRAPI_URL=http://localhost:1337
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=YOUR_TOKEN_HERE
REVALIDATE_SECRET=mysecret123
```

---

## ▶️ Running the project

### **Start Strapi**

```
cd strapi-backend
npm install
npm run develop
```

### **Start Next.js**

```
cd next-blog-frontend
npm install
npm run dev
```

---

## 🧱 Strapi Content Models

### **Post**

* title
* slug
* excerpt
* content (Blocks)
* cover (Media)
* author → relation
* category → relation
* tags → many-to-many
* publishedAt

### **Category**

* name
* slug
* description

### **Tag**

* name
* slug

### **Author**

* name
* slug
* bio
* avatar (media)

### **Subscriber**

* email

---

## 🔒 Typed Strapi Fetching (Zod)

All API responses validated client-side:

```ts
export async function fetchStrapiTyped<T>(path: string, schema: ZodSchema<T>) {
    const url = new URL(process.env.STRAPI_URL + "/api" + path);

    const res = await fetch(url.toString(), {
        headers: { Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}` }
    });

    return schema.parse(await res.json());
}
```

---

## 🧭 Sitemap & RSS

### **Sitemap**

* `/api/sitemap.xml`
* Includes posts, categories, tags, authors
* Auto-updates on revalidation

### **RSS**

* `/api/rss.xml`
* RSS 2.0 compliant
* Includes posts with description + CDATA encoded content

---

## 🔍 Search

Full-text search on:

* title
* excerpt
* content

Query sent as:

```ts
"filters[$or][0][title][$containsi]": query
```

---

## 🌓 Dark Mode

Implemented using a global context:

```ts
document.documentElement.classList.toggle("dark");
localStorage.setItem("theme", next);
```

Tailwind classes:

```
dark:bg-black dark:text-white
```

---

## ✉️ Newsletter Form

React Hook Form + Zod:

```
POST /api/newsletter
```

Stored in Strapi “Subscribers” collection.

---

## 🛰 ISR + Webhooks

### Strapi → Webhook → Next.js

Webhook URL:

```
POST /api/revalidate?secret=mysecret123
```

Payload example:

```json
{
  "model": "post",
  "entry": { "slug": "my-post" }
}
```

Next.js automatically revalidates:

* `/`
* `/post/[slug]`
* `/category/[slug]`
* `/tag/[slug]`
* `/author/[slug]`

---

# 📊 Diagrams

All diagrams provided in PlantUML + PNG.

---

### **1. Data Model Diagram**

<img width="660" height="525" alt="Model Diagram" src="https://github.com/user-attachments/assets/6ac6b138-2038-452d-99b6-6c4dc9cfc54b" />

---

### **2. Architecture Diagram**

<img width="1407" height="735" alt="Architecture Diagram" src="https://github.com/user-attachments/assets/271cd79e-500d-4b40-bbc2-fee9dd8a4738" />

---

### **3. Publishing Flow**

<img width="1401" height="718" alt="Content Publishing Flow" src="https://github.com/user-attachments/assets/29fd1c8a-13f3-4ccd-9764-a466f1a0269e" />

---

# 🚀 Deployment

### **Frontend — Vercel**

* Add `.env` variables
* Build command: `npm run build`
* Output: `.next`

### **Strapi — Render / Railway**

* Deploy backend
* Configure `STRAPI_URL`
* Add webhook to Next.js URL

---

# 🎥 Demo Recording

---

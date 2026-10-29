# Zorvyn

A demo e-commerce store for sneakers and denim — built with React, TypeScript, Vite and Tailwind CSS.

**Live:** https://mojumder01.github.io/Zorvyn/

> Demo store: products and prices (৳) are samples. Checkout does not send an order or take a payment.

## Features

- Product grid with category filter (Sneakers / Jeans), search and sort
- Product details with size and quantity
- Cart drawer, saved in the browser (localStorage)
- Checkout form with Bangladeshi mobile-number check, delivery area fee and an order confirmation
- Shop by category, deal of the week with countdown, reviews, size guide, FAQ and a newsletter sign-up (demo)
- Responsive, keyboard friendly (native `<dialog>`)

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deploy

Every push to `main` builds the site and publishes it to GitHub Pages
(`.github/workflows/deploy.yml`). One-time setup: **Settings → Pages → Source: GitHub Actions**.

## Edit products

Products live in `src/data/products.ts`; photos in `public/products/` (square, about 1000×1000 px).

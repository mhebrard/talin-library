# Talin Library — Comic Reading Order Tracker

A fast, responsive web application hosted on **GitHub Pages** for tracking multi-series comic reading orders, starting with Marvel's **X-Men: From the Ashes (2024)** era.

🌐 **Live Website:** [https://mhebrard.github.io/talin-library/](https://mhebrard.github.io/talin-library/)

---

## Features

- **Chronological Reading Order:** Displays issues in the master recommended reading sequence across interwoven series (*X-Men*, *Uncanny X-Men*, *Exceptional X-Men*, *X-Force*, *X-Factor*, *Phoenix*, *NYX*, *Wolverine*, *Storm*, and miniseries).
- **Phased Story Structure:** Browse by story phase (Phase 1: *The First Wave*, Phase 2: *Secondary Waves*) or view the complete era sequence.
- **Dynamic Progression HUD:** Click on any comic (e.g. *X-Factor #3*) to set your reading point:
  - **Phase Progress:** Shows your percentage and issue count in the active phase.
  - **Overall Era Progress:** Tracks your overall progress through the *From the Ashes* era.
  - **Series Progress:** Visualizes your progress within that specific series.
  - **Previous / Next Controls:** Quickly navigate step-by-step through the reading order.
- **Direct Library Links:** Every issue card features a direct link to digital online libraries (e.g., Marvel Unlimited).
- **Shareable & Bookmarkable URLs:** Reading positions and series filters are deep-linked with distinct parameters:
  - `?series=x-men-2024&issue=1` (sets your reading position to *X-Men 2024 #1*)
  - `?series=x-factor-2024&issue=3` (sets your reading position to *X-Factor 2024 #3*)
- **Series Filtering & Live Search:** Filter by specific series or instantly search across titles, creators, and issue numbers.
- **Zero-Dependency Backend:** 100% static React + Vite application with GitHub Actions deployment.

---

## Tech Stack

- **Framework:** React 19 + TypeScript + Vite
- **Styling:** Tailwind CSS (Modern dark comic-reader theme)
- **Icons:** Lucide React
- **Hosting & CI/CD:** GitHub Pages + GitHub Actions (`.github/workflows/deploy.yml`)

---

## Getting Started Locally

```bash
# Clone the repository
git clone https://github.com/mhebrard/talin-library.git
cd talin-library

# Install dependencies
npm install

# Start local dev server
npm run dev

# Build for production
npm run build
```

---

## Deployment to GitHub Pages

The repository includes a GitHub Actions workflow in `.github/workflows/deploy.yml` that automatically builds and deploys to GitHub Pages upon pushing to the `main` branch.

To enable GitHub Pages in your repository settings:
1. Go to **Settings** > **Pages** in the GitHub repository.
2. Under **Build and deployment** > **Source**, choose **GitHub Actions**.
3. Push to `main` to trigger the automatic deployment.

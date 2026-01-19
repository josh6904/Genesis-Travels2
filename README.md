# Genesis Expedition Kenya 🇰🇪

A premium, boutique travel platform and CRM handcrafted for high-grade Kenyan safaris, alpine expeditions, and coastal heritage retreats. Built with a focus on an **indie, tactile aesthetic** and powered by **Google Gemini AI**.

## 🌐 Vercel Deployment Guide

This project is optimized for Vercel. Follow these steps for a seamless deployment:

### 1. Environment Variable Setup
The application requires a Google Gemini API key to generate itineraries and provide CRM insights.
- **Key Name**: `API_KEY`
- **Link**: Get your key at [Google AI Studio](https://aistudio.google.com/).
- **Vercel Console**: Go to **Settings > Environment Variables** and add `API_KEY` with your secret value.

### 2. Configuration Files
The repository includes:
- `vercel.json`: Handles SPA routing rewrites.
- `vite.config.ts`: Configures the build pipeline and environment variable injection.

### 3. One-Click Deploy
If you are importing this into Vercel:
- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`

## 🛠️ Local Development

1. **Install Dependencies**:
   ```bash
   npm install
   ```
2. **Environment Setup**:
   Create a `.env` file in the root:
   ```env
   API_KEY=your_gemini_api_key_here
   ```
3. **Start Development Server**:
   ```bash
   npm run dev
   ```

## 🎨 Design Philosophy: "The Indie Loom"
- **Tactile UI**: Custom SVG grain filters and Fraunces serif typography evoke a printed-journal feel.
- **Micro-interactions**: Framer Motion powered transitions for "weaving" states and smooth modal entries.
- **Kenya-Centric Palette**: Muted Savannah greens (`#5d6d4e`), desert sands (`#d4a373`), and deep obsidian (`#2d2a26`).

---
*Handcrafted by Genesis Expedition Ltd. Weaving Kenyan Realities Since The Beginning.*
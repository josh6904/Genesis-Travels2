# Application Functionalities

Genesis Expedition Kenya is a dual-purpose platform: a high-end travel discovery/booking site for customers and a comprehensive CRM for agency staff.

## 1. Customer Experience

### **Responsive Booking Engine**
- **Smart Date Calculation**: Automatically calculates trip duration and handles "Flash 1-Day" expeditions vs. multi-day journeys.
- **Dynamic Pricing**: Real-time price updates based on guest count, duration, and group-tier discounts (e.g., 15% off for groups of 5+).
- **Heritage Confirmation**: Upon booking, users receive an immediate visual confirmation that their "thread is woven" into the ledger.

### **AI-Powered Itineraries**
- **Personalized Journeys**: Every confirmed booking triggers the Gemini 3 Flash model to generate a custom itinerary based on the destination's unique attractions and the user's group size.
- **Indie Tone**: The AI is prompted to maintain a poetic, adventurous, and distinctly Kenyan voice.

### **Exploration Features**
- **Favorites System**: Users can "heart" destinations to save them to their local storage.
- **Cart/Ledger**: A sliding panel allows users to view their active "threads" (bookings) and manage their heritage history.

## 2. Staff CRM (Portal)

### **Analytics Dashboard**
- **Visual Intelligence**: Interactive charts (Recharts) showing revenue growth and destination popularity.
- **AI Business Insights**: The CRM analyzes current booking data and provides 3 strategic growth recommendations using Gemini.

### **Order Tracker**
- **Status Lifecycle**: Staff can transition bookings through `Pending`, `Confirmed`, and `Cancelled` states.
- **Audit Trail**: Every order is assigned a unique Receipt ID for heritage tracking.

### **Destination CMS (The Loom)**
- **Rich Media Management**: Full control over package titles, descriptions, pricing, and gallery archives.
- **AI Tag Discovery**: Staff can request "AI Suggested Tokens" based on a destination's description to improve SEO and discoverability.
- **Intuitive UI**: 
    - **Drag-and-Drop**: Reorder attractions and tags using a tactile "grabbing" interface.
    - **Required Indicators**: Clear visual cues for mandatory data fields.
    - **Visual Feedback**: Real-time image previews and interactive tag removal.

## 3. Automation & Integration

### **Google Forms Bridge**
- **Lead Capture**: Optionally dispatches booking data to a Google Form via `no-cors` POST requests for external spreadsheet tracking.
- **Staff Authentication**: Secure portal access with a rotatable Protocol Key (default: `wander2024`).

## 4. Technical Stack
- **Framework**: React 19 + Vite.
- **State Management**: React Hooks (State, Memo, Callback) + LocalStorage for persistence.
- **Animations**: Framer Motion 12.
- **AI Integration**: @google/genai (Gemini 3 Flash).
- **Styling**: Tailwind CSS + custom indie CSS filters.
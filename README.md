
# Mahabharat GPT

Mahabharat GPT is a Next.js web application that allows users to ask questions or share their concerns and receive guidance and wisdom derived from the epic Mahabharata. The application leverages Generative AI (via Genkit and Google's Gemini models) to interpret user queries and provide relevant passages, teachings, or stories from the Mahabharata.

## Features

*   **AI-Powered Wisdom:** Ask life questions or seek advice and get answers inspired by the Mahabharata.
*   **Chat Interface:** Interact with the AI through a user-friendly chat interface.
*   **Verse Bookmarking:** Save insightful verses or teachings that resonate with you for later review.
*   **Mahabharata Overview:** A dedicated page providing a brief overview of the epic (currently focused on the Bhagavad Gita, with plans for expansion).
*   **Customizable UI:**
    *   Light/Dark mode theme toggle.
    *   Adjustable text size for better readability.
*   **Responsive Design:** Works across various devices and screen sizes.

## Tech Stack

*   **Framework:** [Next.js](https://nextjs.org/) (App Router)
*   **Language:** [TypeScript](https://www.typescriptlang.org/)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **UI Components:** [ShadCN UI](https://ui.shadcn.com/)
*   **Generative AI:** [Genkit (by Google)](https://firebase.google.com/docs/genkit) with Google Gemini models.
*   **State Management:** React Context API (for theme, text size, bookmarks).
*   **Local Storage:** Used for persisting bookmarks, theme, and text size preferences.

## Getting Started

### Prerequisites

*   Node.js (v18 or newer recommended)
*   npm or yarn

### Setup

1.  **Clone the repository (if applicable):**
    ```bash
    git clone <your-repository-url>
    cd <repository-name>
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    # yarn install
    ```

3.  **Set up Environment Variables:**
    Create a `.env.local` file in the root of your project. You'll need to add your Firebase project configuration keys here.
    The application currently uses hardcoded Firebase credentials in `src/lib/firebase.ts` for development/debugging ease due to previous troubleshooting. **For production, it is strongly recommended to remove these hardcoded keys and use environment variables from `.env.local` as shown below.**

    Example `.env.local`:
    ```env
    NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
    NEXT_PUBLIC_FIREBASE_DATABASE_URL=https://your-project-id-default-rtdb.firebaseio.com
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
    NEXT_PUBLIC_FIREBASE_APP_ID=1:your-app-id

    # Genkit/Google AI Configuration (if needed for local Genkit dev flow)
    # GOOGLE_API_KEY=your_google_ai_studio_api_key
    ```
    *   Replace placeholder values with your actual Firebase project credentials.
    *   The `GOOGLE_API_KEY` is for the Google AI Studio API key, which Genkit will use. This is usually configured when setting up Genkit.

### Running the Development Server

1.  **Start the Next.js application:**
    ```bash
    npm run dev
    ```
    The application will typically be available at `http://localhost:9002`.

2.  **Start the Genkit development flow (in a separate terminal):**
    For the AI functionalities to work, Genkit needs to be running.
    ```bash
    npm run genkit:dev
    # or for auto-reloading on changes
    # npm run genkit:watch
    ```
    This starts the Genkit development server, typically on `http://localhost:3100` (flow server) and `http://localhost:4100` (Genkit Inspector).

## AI Functionality

The core AI logic is managed by Genkit flows located in `src/ai/flows/`.

*   **`generate-mahabharat-wisdom.ts`:** This flow takes a user's query and uses a Google Gemini model to generate relevant wisdom, passages, or stories from the Mahabharata.
*   _Previously, `generate-relevant-verses.ts` existed, which was more specific to the Bhagavad Gita._

Genkit is initialized in `src/ai/genkit.ts` and development flows are registered in `src/ai/dev.ts`.

## Key Components & Providers

*   **`src/app/page.tsx`:** The main chat interface where users interact with the AI.
*   **`src/app/bookmarks/page.tsx`:** Displays bookmarked verses.
*   **`src/app/overview/page.tsx`:** Provides an overview of the Mahabharata.
*   **`src/components/verse-card.tsx`:** Component to display AI-generated wisdom and allow bookmarking.
*   **`src/components/layout/navbar.tsx`:** Application navigation bar.
*   **`src/components/layout/footer.tsx`:** Application footer.
*   **`src/providers/`:**
    *   `bookmark-provider.tsx`: Manages bookmark state using React Context and Local Storage.
    *   `text-size-provider.tsx`: Manages text size preference using React Context and Local Storage.
    *   `theme-provider.tsx`: Manages light/dark theme using `next-themes`, React Context, and Local Storage.
*   **`src/lib/firebase.ts`:** Initializes Firebase services. (Currently uses hardcoded credentials; see "Setup" for production advice).

## Project Structure

\`\`\`
.
├── src/
│   ├── ai/                     # Genkit AI flows and configuration
│   │   ├── flows/              # Specific AI flows
│   │   ├── dev.ts              # Genkit development flow registration
│   │   └── genkit.ts           # Genkit initialization
│   ├── app/                    # Next.js App Router pages and layouts
│   │   ├── (main)/             # Route groups if any
│   │   │   ├── page.tsx        # Home page (chat interface)
│   │   │   └── layout.tsx      # Main layout for these routes
│   │   ├── bookmarks/
│   │   ├── overview/
│   │   ├── login/              # Placeholder login page
│   │   ├── register/           # Placeholder register page
│   │   ├── globals.css         # Global styles and Tailwind theme
│   │   ├── layout.tsx          # Root layout
│   │   └── actions.ts          # Server Actions
│   ├── components/             # Reusable UI components
│   │   ├── icons/              # Custom SVG icons
│   │   ├── layout/             # Layout components (Navbar, Footer)
│   │   ├── ui/                 # ShadCN UI components
│   │   └── ...                 # Other shared components
│   ├── hooks/                  # Custom React hooks
│   ├── lib/                    # Utility functions, types, constants
│   ├── providers/              # React Context providers
├── public/                     # Static assets
├── .env.local.example          # Example environment variables
├── next.config.ts              # Next.js configuration
├── package.json
├── tailwind.config.ts          # Tailwind CSS configuration
└── tsconfig.json               # TypeScript configuration
\`\`\`

## Future Considerations / Improvements

*   Revert Firebase credentials from hardcoded values to `.env.local` for production.
*   Expand the "Overview" page to cover the entire Mahabharata, not just the Bhagavad Gita.
*   Potentially add more sophisticated state management if the app grows.
*   Implement more comprehensive error handling for AI flows.
*   Unit and integration tests.

This README provides a good overview of your Mahabharat GPT application.

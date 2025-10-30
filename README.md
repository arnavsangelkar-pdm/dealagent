# Deal Agent - Deal Intelligence

A deal intelligence application with Google Drive integration. This application features a Drive workspace and Q&A chat interface for analyzing deal materials.

## Features

- **Google Drive Integration**: Browse and search through deal folders and files
- **Intelligent Chat**: Ask questions about deals and get responses with file citations
- **Suggested Questions**: 6 prompts to help get started with common questions
- **Dark Mode**: Full dark mode support with persistent theme preference
- **Responsive Design**: Works on mobile, tablet, and desktop
- **Polished UI**: Skeleton loaders, animations, and smooth transitions

## Tech Stack

- **Next.js 14+** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **shadcn/ui** for UI components
- **lucide-react** for icons
- **framer-motion** for animations

## Getting Started

### Prerequisites

- Node.js 20+ 
- npm, yarn, or pnpm

### Installation

1. Install dependencies:

```bash
npm install
# or
pnpm install
# or
yarn install
```

2. Run the development server:

```bash
npm run dev
# or
pnpm dev
# or
yarn dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
# or
pnpm build
pnpm start
```

## Deployment on Render

To deploy this application on Render:

1. Connect your repository to Render
2. Configure the service with these settings:
   - **Root Directory**: project root
   - **Build Command**: `npm install && npm run build` (or `pnpm install && pnpm build`)
   - **Start Command**: `npm start` (or `pnpm start`)
   - **Runtime**: Node 20+
3. No environment variables are required

## Project Structure

```
/
├── app/
│   ├── api/           # API routes
│   │   ├── chat/      # Chat endpoint
│   │   ├── connect/   # Drive connection endpoint
│   │   ├── drive/     # Drive data endpoint
│   │   ├── questions/ # Suggested questions endpoint
│   │   └── search/    # Search endpoint
│   ├── globals.css    # Global styles and theme
│   ├── layout.tsx     # Root layout
│   └── page.tsx       # Main page
├── components/
│   ├── ui/            # shadcn/ui components
│   ├── ChatPanel.tsx # Chat interface
│   ├── DriveSidebar.tsx # Drive file browser
│   └── Navbar.tsx    # Top navigation
├── data/
│   ├── hardcodedQA.json # Q&A pairs
│   └── mockDrive.json  # Drive structure
├── lib/
│   ├── googleDrive.ts  # Drive service functions
│   ├── qa.ts          # Q&A matching logic
│   └── utils.ts       # Utility functions
└── public/
    └── mock/          # File previews
```

## Usage

1. **Browse Files**: Use the left sidebar to navigate through deal folders and files
2. **Search**: Type in the search box to find files by name
3. **Ask Questions**: Use the suggested questions or type your own question in the chat
4. **View Citations**: Review citation chips in chat responses to see referenced files

## Data

All data is stored locally in JSON files:
- `/data/mockDrive.json` - Google Drive structure
- `/data/hardcodedQA.json` - Q&A pairs

## Development Notes

- All API routes use data from local JSON files
- Chat responses are streamed with a typing effect
- Dark mode preference is stored in localStorage

## License

Private project for internal use.
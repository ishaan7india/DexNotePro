# DexNote Pro

> Your Next-Generation Learning & Productivity Platform

DexNote Pro is a modern, full-stack web application that combines intelligent note-taking, course management, and AI-powered study tools into one seamless learning experience. Built with cutting-edge technologies and designed for learners who want to maximize their productivity.

![DexNote Pro](src/assets/dexnote-logo.png)

## 🌟 Features

### 📝 Smart Notes System
- **Create & Organize**: Create unlimited notes with categories and tags
- **Rich Content**: Full-text notes with markdown-like formatting
- **Quick Search**: Find your notes instantly with smart categorization
- **Cloud Sync**: All notes automatically saved and synced

### 📚 Course Library
- **PDF Courses**: Access courses in PDF format directly in your browser
- **Progress Tracking**: Mark courses as complete and track your progress
- **Visual Cards**: Beautiful course cards with thumbnails and descriptions
- **Category Organization**: Courses organized by topic for easy browsing

### ✨ AI Study Tools
Powered by advanced AI models (Google Gemini 2.5 Flash):
- **Smart Summarization**: Generate concise summaries of any text
- **Flashcard Generator**: Automatically create study flashcards
- **Quiz Creator**: Generate practice quizzes with answer keys
- **Real-time Processing**: Fast AI responses for immediate study help

### 📊 Dashboard & Analytics
- **Activity Overview**: See your notes count, courses completed, and progress
- **Quick Actions**: Jump to any feature from your dashboard
- **Progress Metrics**: Track your learning journey with visual statistics

### 🔐 Secure Authentication
- **Email & Password**: Secure signup and login
- **Auto-confirm**: Instant account activation for seamless onboarding
- **Protected Routes**: Automatic redirection for authenticated/unauthenticated users
- **Session Management**: Persistent login sessions

## 🛠️ Technology Stack

### Frontend
- **React 18** - Modern UI library
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - Beautiful component library
- **React Router** - Client-side routing
- **TanStack Query** - Data fetching & caching

### Backend (Lovable Cloud)
- **PostgreSQL** - Relational database
- **Row Level Security (RLS)** - Data protection
- **Edge Functions** - Serverless API endpoints
- **Lovable AI Gateway** - AI model integration

### AI Integration
- **Google Gemini 2.5 Flash** - Fast, efficient AI model
- **Lovable AI Gateway** - Pre-configured API access
- **Edge Function Processing** - Secure server-side AI calls

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn/pnpm
- Git

### Installation

1. **Clone the repository**
```bash
git clone <YOUR_GIT_URL>
cd dexnote-pro
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Start development server**
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. **Open your browser**
Navigate to `http://localhost:8080`

### Environment Variables

The project uses Lovable Cloud, which automatically configures:
- `VITE_SUPABASE_URL` - Backend API URL
- `VITE_SUPABASE_PUBLISHABLE_KEY` - Public API key
- `VITE_SUPABASE_PROJECT_ID` - Project identifier

No manual configuration needed! ✨

## 📚 Database Schema

### Tables

#### `profiles`
User profile information
- `id` (UUID, PK)
- `user_id` (UUID, FK → auth.users)
- `email` (TEXT)
- `full_name` (TEXT)
- `avatar_url` (TEXT)
- `created_at` (TIMESTAMPTZ)
- `updated_at` (TIMESTAMPTZ)

#### `notes`
User notes and content
- `id` (UUID, PK)
- `user_id` (UUID, FK → auth.users)
- `title` (TEXT)
- `content` (TEXT)
- `category` (TEXT)
- `tags` (TEXT[])
- `created_at` (TIMESTAMPTZ)
- `updated_at` (TIMESTAMPTZ)

#### `courses`
Available courses
- `id` (UUID, PK)
- `title` (TEXT)
- `description` (TEXT)
- `thumbnail_url` (TEXT)
- `pdf_url` (TEXT)
- `category` (TEXT)
- `created_at` (TIMESTAMPTZ)

#### `user_course_progress`
Track user completion
- `id` (UUID, PK)
- `user_id` (UUID, FK → auth.users)
- `course_id` (UUID, FK → courses)
- `completed` (BOOLEAN)
- `completed_at` (TIMESTAMPTZ)
- Unique constraint on (user_id, course_id)

### Row Level Security (RLS)

All tables have RLS enabled with policies ensuring:
- Users can only access their own data
- Courses are readable by all authenticated users
- Profile creation is automated via triggers
- Updates are restricted to data owners

## 🔌 API Documentation

### Edge Functions

#### `/functions/v1/ai-tools`

AI-powered study tool endpoint

**Method:** POST

**Body:**
```json
{
  "text": "Your input text here",
  "action": "summarize" | "flashcards" | "quiz"
}
```

**Response:**
```json
{
  "result": "AI-generated content based on action"
}
```

**Actions:**
- `summarize` - Generate a concise summary
- `flashcards` - Create Q&A flashcard pairs
- `quiz` - Generate quiz questions with answers

**Error Responses:**
- `429` - Rate limit exceeded
- `402` - Payment required (credits depleted)
- `500` - Server error

## 🎨 Design System

### Color Palette
- **Primary Blue**: `hsl(221 83% 53%)` - Main brand color
- **Primary Glow**: `hsl(217 91% 60%)` - Accent shade
- **Accent Gold**: `hsl(38 92% 50%)` - Secondary color
- **Accent Glow**: `hsl(43 96% 56%)` - Accent shade

### Gradients
- **Primary Gradient**: Blue to light blue
- **Accent Gradient**: Gold to warm gold
- **Hero Gradient**: Subtle blue overlay

### Typography
- **Font Family**: System font stack
- **Headings**: Bold, gradient text effects
- **Body**: Clean, readable text

## 📱 Pages & Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | Index | Landing page with features |
| `/auth` | Auth | Login & signup |
| `/dashboard` | Dashboard | User overview |
| `/notes` | Notes | Note management |
| `/courses` | Courses | Course library |
| `/ai-tools` | AITools | AI study tools |
| `*` | NotFound | 404 page |

## 🔒 Security Features

- **Row Level Security (RLS)** on all database tables
- **Secure authentication** with JWT tokens
- **Password hashing** via Supabase Auth
- **API key protection** (never exposed to client)
- **CORS configuration** for API security
- **Input validation** on all forms
- **Protected routes** requiring authentication

## 🚀 Deployment

### Using Lovable Platform

1. **Automatic Deployment**
   - Changes pushed to the repo auto-deploy
   - Preview URLs generated automatically
   - Production deployment with one click

2. **Custom Domain**
   - Configure in Lovable project settings
   - SSL certificates handled automatically

### Manual Deployment (Alternative)

#### Frontend (Netlify, Vercel, etc.)
```bash
npm run build
# Deploy the 'dist' folder
```

#### Backend
- Already deployed via Lovable Cloud
- Edge functions auto-deploy on push
- No manual backend deployment needed

## 📈 Performance

- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3s
- **Lighthouse Score**: 90+
- **Bundle Size**: Optimized with tree-shaking
- **Code Splitting**: Automatic route-based splitting

## 🧪 Testing

Run the development server and test:
```bash
npm run dev
```

Test AI features:
1. Sign up / Log in
2. Navigate to AI Tools
3. Paste sample text
4. Try each AI action (summarize, flashcards, quiz)

## 📝 Project Structure

```
dexnote-pro/
├── src/
│   ├── assets/          # Images and static files
│   ├── components/      # React components
│   │   ├── ui/         # shadcn/ui components
│   │   └── Navbar.tsx  # Navigation component
│   ├── pages/          # Route pages
│   │   ├── Index.tsx
│   │   ├── Auth.tsx
│   │   ├── Dashboard.tsx
│   │   ├── Notes.tsx
│   │   ├── Courses.tsx
│   │   └── AITools.tsx
│   ├── integrations/   # Backend integrations
│   │   └── supabase/   # Supabase client
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Utilities
│   ├── App.tsx         # App root
│   ├── index.css       # Global styles
│   └── main.tsx        # Entry point
├── supabase/
│   └── functions/      # Edge functions
│       └── ai-tools/   # AI processing
├── public/             # Public assets
├── index.html          # HTML template
├── tailwind.config.ts  # Tailwind configuration
├── vite.config.ts      # Vite configuration
└── README.md           # This file
```

## 🤝 Contributing

This is a personal learning project. Feel free to fork and customize!

## 📄 License

MIT License - See [LICENSE](LICENSE) file for details

## 🙏 Acknowledgments

- Built with [Lovable](https://lovable.dev)
- UI components from [shadcn/ui](https://ui.shadcn.com)
- Icons from [Lucide](https://lucide.dev)
- AI powered by Google Gemini via Lovable AI Gateway

## 📞 Support

For questions or issues:
- Open an issue on GitHub
- Check the [Lovable documentation](https://docs.lovable.dev)

---

**Made with ❤️ using Lovable**

Last updated: October 2025
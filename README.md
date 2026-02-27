# Shikshya

**Shikshya** is a comprehensive monolithic web application architected to facilitate seamless interaction between academic stakeholders. Ideally suited for educational institutions, it combines course management, interactive study tools, and AI-powered assistance into a unified, secure platform.

## System Overview

The platform serves as a central hub for academic operations, facilitating:
- **Course Administration**: Enabling instructors to manage curricula, distribute resources (PDFs), and monitor student engagement metrics.
- **Student Portal**: Providing enrollment management, syllabus tracking, and an integrated study environment.
- **AI-Assisted Learning**: Implementing Retrieval-Augmented Generation (RAG) flows to provide context-aware explanations of course materials via the Google Gemini API.
- **Role-Based Access Control**: Strictly typed enforcement of permissions for Admin, Teacher, and Student roles.

## Table of Contents

- [Features](#features)
- [Technical Architecture](#technical-architecture)
  - [Core Infrastructure](#core-infrastructure)
  - [Frontend Layer](#frontend-layer)
  - [Backend Layer](#backend-layer)
  - [Artificial Intelligence](#artificial-intelligence)
- [Functional Specifications](#functional-specifications)
  - [Authentication & Security](#authentication--security)
  - [Course Management Module](#course-management-module)
  - [Interactive Study Workspace](#interactive-study-workspace)
- [Engineering Optimizations](#engineering-optimizations)
- [Installation & Setup](#installation--setup)
  - [Prerequisites](#prerequisites)
  - [Local Development](#local-development)
- [Environment Configuration](#environment-configuration)

## Features

### For Students
- **Course Enrollment**: Browse and enroll in available courses with real-time availability
- **Interactive Study Environment**: Resizable split-pane workspace with PDF viewer and AI chat
- **AI-Powered Learning Assistant**: Get instant explanations of course materials using context-aware AI
- **Text-to-Explanation**: Select any text in PDFs to receive detailed AI explanations
- **Syllabus Management**: Track course syllabi and upcoming topics
- **Personal Dashboard**: View enrolled courses, upcoming deadlines, and personalized learning progress

### For Teachers
- **Course Creation & Management**: Create, update, and delete courses with rich metadata
- **PDF Resource Upload**: Upload and manage learning materials for each course
- **Student Analytics**: Monitor student enrollment and engagement metrics
- **Course Customization**: Organize courses by nested folder setup
- **Todo Management**: Track teaching tasks and course preparation items

### For Administrators
- **User Management**: Oversee student and teacher accounts
- **System Analytics**: Monitor platform usage and performance metrics
- **Role Assignment**: Manage user permissions and access levels
- **Platform Configuration**: Control system-wide settings and features

### AI-Powered Features
- **Contextual Chat**: AI assistant understands the context of currently viewed PDF materials
- **RAG Implementation**: Retrieval-Augmented Generation for accurate, source-based responses
- **LaTeX Support**: Render mathematical equations and scientific notation in chat
- **Streaming Responses**: Real-time AI response streaming for better user experience
- **Multi-turn Conversations**: Maintain conversation context across multiple interactions

### Study Tools
- **PDF Viewer**: High-fidelity document rendering with zoom, navigation, and page controls
- **Resizable Workspace**: Drag-to-resize panels for optimal viewing experience
- **Text Selection**: Select and interact with PDF text for explanations
- **Responsive Design**: Seamless experience across desktop and tablet devices

### Security & Authentication
- **Multi-Provider Authentication**: Email/Password and Google OAuth support
- **Session Management**: Secure, encrypted session handling with Better Auth
- **Role-Based Access Control (RBAC)**: Granular permissions for Admin, Teacher, and Student
- **Route Protection**: Middleware-enforced access validation on protected routes
- **Input Sanitization**: Comprehensive Zod schema validation across all forms and APIs

## Technical Architecture

### Core Infrastructure
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript (Strict Mode)
- **Runtime**: Node.js
- **Package Manager**: pnpm

### Frontend Layer
- **UI Library**: React 19
- **Styling Engine**: Tailwind CSS 4
- **Component System**: Shadcn UI (Headless UI + Radix Primitives)
- **State Management**: React Query (TanStack Query) for server state; URL-based state for UI.
- **Animations**: Framer Motion

### Backend Layer
- **API Architecture**: tRPC (End-to-end type safety)
- **Database**: PostgreSQL (Relational Data Store)
- **ORM**: Drizzle ORM
- **Authentication**: Better Auth (Secure session management)
- **File Storage**: UploadThing (Object storage abstraction)

### Artificial Intelligence
- **Provider**: Google Generative AI (Gemini)
- **SDK**: Vercel AI SDK
- **Integration**: Custom, context-aware query resolution for document Interaction.

## Functional Specifications

### Authentication & Security
- **Secure Authentication Flows**: Integrated robust sign-up/sign-in using Email/Password and OAuth (Google).
- **Input Validation**: Enforced rigorous validation using Zod schemas at both API and form levels to ensure data integrity.
- **Route Protection**: Middleware-based access validation.

### Course Management Module
- **CRUD Operations**: Comprehensive creation, read, update, and delete functionality for course content.
- **Optimistic UI Updates**: Immediate feedback during state mutations (e.g., course creation) prior to server confirmation.
- **Visual Integration**: Utilized `react-pdf` and `pdfjs-dist` for high-fidelity rendering of academic materials within the browser.

### Interactive Study Workspace
- **Split-Pane Layout**: Engineered a resizable interface enabling simultaneous document viewing and chat interaction.
- **Mathematical Rendering**: Integrated LaTeX support for displaying complex equations within chat streams.
- **Context-Aware Explanations**: Select-to-explain functionality triggers AI interpretation of specific document sections.

## Engineering Optimizations

- **Type Safety**: Achieved full-stack type safety through tRPC and shared Zod schemas, significantly reducing runtime anomalies.
- **Performance**:
    - **Server Components**: Leveraged React Server Components (RSC) to minimize client-side bundle size.
    - **Streaming & Suspense**: Utilized granular loading states and streaming responses for non-blocking UI rendering.
    - **Efficient Data Fetching**: Implemented TanStack Query for optimal caching and request deduplication.
- **Scalability**: Designed the database schema with Drizzle ORM to support future extensions and complex relationships.

## Installation & Setup

### Prerequisites
- Node.js (v18+)
- pnpm
- Docker (for local PostgreSQL instance)

### Local Development

1. **Clone Repository**
   ```bash
   git clone https://github.com/Gr1shma/shikshya.git
   cd shikshya
   ```

2. **Install Dependencies**
   ```bash
   pnpm install
   ```

3. **Database Initialization**
   ```bash
   ./start-database.sh
   # Initializes a Postgres container on port 5432
   ```

4. **Environment Configuration**
   ```bash
   cp .env.example .env
   # Update .env with valid credentials
   ```

5. **Schema Migration**
   ```bash
   pnpm db:push
   ```

6. **Start Development Server**
   ```bash
   pnpm dev
   ```

## Environment Configuration

Create a `.env` file in the root directory with the following variables:

### Database Configuration
- `DATABASE_URL`: Connection string for PostgreSQL.

### Authentication (Better Auth)
- `BETTER_AUTH_SECRET`: Cryptographic secret for session security.

### Google OAuth Credentials
- `GOOGLE_CLIENT_ID`: OAuth Client ID from Google Cloud Console.
- `GOOGLE_CLIENT_SECRET`: OAuth Client Secret.

### AI Integration
- `GOOGLE_GENERATIVE_AI_API_KEY`: API key for Google Gemini model access.

### File Storage
- `UPLOADTHING_TOKEN`: API token for file upload service.

### Credential Generation

**Auth Secret**:
Generate via OpenSSL:
```bash
openssl rand -base64 32
```

**Google OAuth**:
1. Configure a new Project in Google Cloud Console.
2. Enable OAuth 2.0 APIs.
3. Set Authorized Redirect URIs to `http://localhost:3000/api/auth/callback/google`.

---

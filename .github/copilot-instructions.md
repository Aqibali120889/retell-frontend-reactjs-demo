# Retell AI Frontend Demo - AI Coding Agent Instructions

## Project Architecture

This is a **React + Node.js voice AI demo** using the Retell AI Web Client SDK. The project consists of:

### Backend (`example_backend/`)
- **Express server** on port 8080 serving as API proxy
- **Single endpoint**: `POST /create-web-call` → calls Retell API with Bearer token
- **Key requirement**: Update `index.js` line 29 with actual Retell API key (currently placeholder `key_d85d0e5c9b89e537...`)

### Frontend (`frontend_demo/`)
- **React 18** with TypeScript, TailwindCSS, Framer Motion, Three.js
- **Core SDK**: `retell-client-js-sdk` for voice interactions
- **Key requirement**: Update `App.tsx` line 15 with actual Retell agent ID (currently `agent_690083bddb0a6f8326653b107c`)

## Critical Integration Patterns

### WebClient Lifecycle
The `RetellWebClient` in `App.tsx` follows this event-driven pattern:
- Initialize once with event listeners (lines 34-130)
- Call flow: `registerCall()` → `startCall()` → event handling
- State management: `isCalling`, `isListening`, `isSpeaking` drive UI animations

### Component Communication
- **Robot3D**: Receives `isListening`/`isSpeaking` props for 3D animations
- **ChatTranscript**: Real-time message updates from `retellWebClient.on("update")`
- **ControlPanel**: Triggers call start/stop via `toggleConversation()`

### Styling Architecture
- **TailwindCSS** with custom utilities in `lib/utils.ts`
- **Glass-morphism** pattern: `.glass-card` class for consistent UI
- **Gradient animations**: Custom CSS classes for dynamic backgrounds
- **Framer Motion**: `fadeInUp`, `staggerChildren` variants for page transitions

## Development Workflow

### Starting the App
1. **Backend**: `cd example_backend && node index.js` (port 8080)
2. **Frontend**: `cd frontend_demo && npm start` (port 3000)
3. **Dependencies**: Already installed, no need to run `npm install`

### Key Files to Modify
- `example_backend/index.js` → Update Retell API key
- `frontend_demo/src/App.tsx` → Update agent ID
- Components in `src/components/` → UI modifications
- `src/lib/utils.ts` → Utility functions and animations

### External Dependencies
- **Retell AI API**: Requires valid API key and agent ID
- **Three.js/React-Three-Fiber**: For 3D robot animations
- **Web Audio API**: Handled automatically by Retell SDK

## Common Patterns

### Error Handling
WebClient errors are handled in `App.tsx` lines 123-129 with automatic state cleanup.

### Message Deduplication
Transcript updates use content matching to prevent duplicate messages (lines 71-118).

### Responsive Design
Layout uses CSS Grid with `lg:grid-cols-3` for desktop, stacked mobile layout.
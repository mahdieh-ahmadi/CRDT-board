# CRDT Board

CRDT Board is a collaborative, real-time web application that lets multiple users edit and interact on a shared board simultaneously. The app uses Conflict-free Replicated Data Types (CRDTs) to keep the board state consistent across clients, enabling low-latency collaboration and robust offline/merge behavior.

**Why this project**

- **Real-time collaboration:** Multiple users can add, move, and edit items on the same board with changes synchronizing in near real time.
- **CRDT-based syncing:** State is merged automatically without conflicts, designed to work with CRDT libraries such as Yjs or Automerge.
- **Offline-friendly:** Local edits continue to work when offline and synchronize automatically when connectivity is restored.
- **Built with Next.js:** Modern React experience with server/client boundaries and a lightweight deployment surface.

**Highlights**

- **Multi-user editing:** Shared state updates propagate to all connected clients.
- **Presence & cursors:** (Optional) show who is online and where collaborators are pointing.
- **Persistent state:** Board contents can be persisted to a server or peer network depending on your chosen backend.

**Tech stack (example)**

- **Framework:** Next.js (React)
- **CRDT:** pluggable CRDT library (e.g., yjs or utomerge)
- **Realtime transport:** WebSocket / WebRTC or server relay

**Getting started (development)**

1. Install dependencies:

`ash
yarn install
`

2. Run the development server:

`ash
yarn dev
`

3. Open http://localhost:3000 in your browser and start collaborating.

Files to look at first:

- pp/page.tsx  main UI entry
- pp/layout.tsx  global layout and providers
- public/  static assets

**Build & deploy**

`ash
yarn build
yarn start
`

This app can be deployed to Vercel, Netlify, or any platform that supports Next.js. If you use a server-based CRDT relay (WebSocket server), deploy that service alongside the Next app.

**Contributing**

- Open an issue to discuss features or bugs.
- Fork the repo, create a feature branch, and send a pull request.

If you'd like, I can add a minimal example integration with a CRDT library (Yjs) and a simple WebSocket relay to demonstrate full end-to-end collaboration.

**License & contact**

This project is provided as-is. Add a LICENSE file if you want a specific license. For questions or suggestions, open an issue or contact the repository owner.


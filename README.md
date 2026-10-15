# AI Real-Time Avatar System

A production-oriented learning project for a browser-based conversational avatar.

## Product goal
A user speaks through the browser microphone, the system processes the input, generates an AI response, returns speech, and animates an avatar in sync with the response.

## Planned stack
- Frontend: React + TypeScript
- Backend/API: Python, Django, Django REST Framework
- Real-time transport: Django Channels + WebSocket
- Data: PostgreSQL
- Coordination/cache: Redis
- AI inference: Python services on RunPod GPU infrastructure
- Local infrastructure: Docker Compose
- CI/CD: GitHub Actions

## Architecture principles
1. Start with a modular Django backend and a separate AI worker boundary.
2. Use REST for normal request/response APIs; use WebSockets for real-time events.
3. Do not introduce infrastructure until a working end-to-end vertical slice needs it.
4. Keep secrets out of Git. Use `.env.example` for variable names only.
5. Add tests and acceptance criteria with each feature.
6. Measure latency before optimizing.

## Repository layout
```text
frontend/       React + TypeScript application
backend/        Django + DRF + Channels application
ai-service/     Python AI pipeline / RunPod integration
infra/          Docker and deployment configuration
tests/          Cross-service integration and end-to-end tests
docs/           Architecture, API contracts, and decisions
.github/        CI workflows and issue templates
```

## Current status
Stage 0 — project foundation. The folders are scaffolding; services will be implemented in later milestones.

## Local development
Prerequisites and exact setup commands will be added in Stage 1 after choosing the supported Node.js and Python versions for the environment.

## Security
Never commit `.env`, API keys, GPU provider tokens, private keys, user audio, or generated personal data.

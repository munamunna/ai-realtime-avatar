# Architecture (Stage 0)

## First vertical slice
Browser microphone / text input -> React client -> Django API -> AI adapter -> response text/audio -> avatar UI.

Build a text-based end-to-end slice before adding GPU inference and continuous audio streaming. This isolates frontend, API, persistence, and deployment risks early.

## Service responsibilities
- React + TypeScript: UI, microphone permissions, connection state, avatar presentation.
- Django + DRF: authentication, validation, REST resources, conversation/session persistence.
- Django Channels: WebSocket lifecycle and real-time events.
- Python AI adapter/worker: speech recognition, model calls, text-to-speech, inference orchestration.
- PostgreSQL: durable application data.
- Redis: channel layer, cache, and queue coordination when needed.
- RunPod: GPU-backed inference only; do not couple the main API's availability to a GPU worker being warm.
- Docker: repeatable local and deployment environments.
- GitHub Actions: quality checks and controlled deployments.

## Key decisions
1. REST and WebSocket have separate jobs: DRF for standard API operations; Channels for persistent real-time connections.
2. Start as a modular backend, not a large collection of microservices.
3. Keep provider-specific inference behind an adapter interface so the model/provider can change.
4. Do not add a Rust service; Rust was not part of the intended stack.
5. Do not claim production readiness until security, load, recovery, monitoring, and cost tests pass.

## Initial non-functional targets (to validate, not promises)
- Clear loading, error, reconnect, and permission-denied UI states.
- Request and inference timeouts.
- Structured logs with a request/session correlation ID.
- No secrets or raw audio in application logs.
- Measure end-to-end latency and p50/p95 before setting numeric SLOs.

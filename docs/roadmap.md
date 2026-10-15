# Roadmap and stage gates

## Stage 0 — Foundation
- [ ] Confirm product scope and avatar type
- [ ] Create GitHub repository
- [ ] Commit initial docs and scaffolding
- [ ] Record architecture decisions

**Gate:** README, architecture, repository hygiene, and initial commit exist.

## Stage 1 — Frontend shell
- [ ] React + TypeScript app
- [ ] Chat panel and avatar placeholder
- [ ] Listening / thinking / speaking / error states
- [ ] Frontend lint and tests

**Gate:** frontend starts locally and core UI states are tested.

## Stage 2 — Django API
- [ ] Django + DRF project
- [ ] PostgreSQL configuration and migrations
- [ ] Health endpoint
- [ ] Conversation/session API
- [ ] API tests

**Gate:** migrations and API tests pass in a clean environment.

## Stage 3 — Realtime transport
- [ ] Django Channels and Redis channel layer
- [ ] WebSocket connect/disconnect handling
- [ ] Event schema and reconnect behavior
- [ ] Integration tests

**Gate:** client can exchange validated real-time events.

## Stage 4 — AI vertical slice
- [ ] Provider-neutral AI adapter
- [ ] Speech-to-text, LLM, and text-to-speech integration
- [ ] Timeouts, retries where safe, and usage accounting
- [ ] Mocked tests that do not require a GPU

**Gate:** text/audio response flow works and provider failures are handled.

## Stage 5 — Avatar
- [ ] Select rendering approach
- [ ] Speaking/listening animation
- [ ] Audio-to-lip-sync timing
- [ ] Browser compatibility checks

**Gate:** generated speech and avatar animation are synchronized well enough for the chosen approach.

## Stage 6 — Containers and CI
- [ ] Dockerfiles and Compose
- [ ] Lint, tests, dependency checks, image build in GitHub Actions
- [ ] CI required on pull requests

**Gate:** clean checkout passes CI.

## Stage 7 — Staging and production
- [ ] Deploy frontend and backend
- [ ] Configure HTTPS, secrets, CORS, and allowed hosts
- [ ] Configure RunPod endpoint and cost limits
- [ ] Smoke tests and rollback plan

**Gate:** public staging URL works end-to-end.

## Stage 8 — Hardening
- [ ] Load and failure testing
- [ ] Rate limits and abuse controls
- [ ] Monitoring, alerts, backups, and restore drill
- [ ] p50/p95 latency and per-session cost report

**Gate:** reliability and operational limits are documented with measured evidence.

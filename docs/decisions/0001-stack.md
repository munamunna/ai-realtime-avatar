# ADR 0001: Initial technology stack

- Status: Accepted
- Date: 2026-10-15

## Context
The project is a real-time conversational avatar intended to demonstrate production-minded engineering.

## Decision
Use React + TypeScript, Python, Django, Django REST Framework, Django Channels, PostgreSQL, Redis, Docker, RunPod, and GitHub Actions.

## Rationale
This stack separates browser experience, standard APIs, real-time transport, durable storage, and GPU-bound inference while remaining approachable for incremental development.

## Consequences
- DRF handles conventional HTTP APIs.
- Django Channels handles WebSocket communication.
- GPU/model calls must have timeouts and should not block unrelated API requests.
- Rust is not included.
- Production readiness must be demonstrated through tests and operational evidence, not asserted from a live URL alone.

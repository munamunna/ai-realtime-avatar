
import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import App from './App'

afterEach(() => {
  cleanup()
  vi.unstubAllGlobals()
})

describe('AI Avatar application', () => {
  it('renders the avatar and conversation UI', () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          status: 'ok',
          service: 'ai-realtime-avatar-api',
          timestamp: new Date().toISOString(),
        }),
      }),
    )

    render(<App />)

    expect(
      screen.getByRole('heading', { name: 'Your AI Avatar' }),
    ).toBeInTheDocument()

    expect(
      screen.getByRole('heading', { name: 'Conversation' }),
    ).toBeInTheDocument()
  })

  it('shows connected status when the API responds successfully', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          status: 'ok',
          service: 'ai-realtime-avatar-api',
          timestamp: new Date().toISOString(),
        }),
      }),
    )

    render(<App />)

    await waitFor(() => {
      expect(screen.getByText('Backend connected')).toBeInTheDocument()
    })
  })

  it('adds a user message to the conversation', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          status: 'ok',
          service: 'ai-realtime-avatar-api',
          timestamp: new Date().toISOString(),
        }),
      }),
    )

    render(<App />)

    fireEvent.change(
      screen.getByRole('textbox', { name: 'Your message' }),
      { target: { value: 'Hello from the test' } },
    )

    fireEvent.click(screen.getByRole('button', { name: /send/i }))

    expect(
      screen.getByText('Hello from the test'),
    ).toBeInTheDocument()
  })
})

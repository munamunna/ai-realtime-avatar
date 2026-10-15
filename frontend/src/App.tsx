
import { useEffect, useState } from 'react'
import './App.css'

type Message = {
  role: 'user' | 'assistant'
  text: string
}

type HealthResponse = {
  status: string
  service: string
  timestamp: string
}

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000'

function App() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      text: 'Hello! I am your AI avatar. What would you like to talk about?',
    },
  ])

  const [isListening, setIsListening] = useState(false)

  const [backendStatus, setBackendStatus] = useState<
  'checking' | 'connected' | 'error'
>('checking')

const [backendMessage, setBackendMessage] = useState(
  'Checking backend connection...',
)

useEffect(() => {
  const controller = new AbortController()

  async function checkBackend() {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/health/`,
        { signal: controller.signal },
      )

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`)
      }

      const data: HealthResponse = await response.json()

      if (data.status !== 'ok') {
        throw new Error('Backend health check failed')
      }

      setBackendStatus('connected')
      setBackendMessage('Backend connected')
    } catch (error) {
      if (controller.signal.aborted) return

      setBackendStatus('error')
      setBackendMessage(
        error instanceof Error
          ? `Backend unavailable: ${error.message}`
          : 'Backend unavailable',
      )
    }
  }

  checkBackend()

  return () => controller.abort()
}, [])

  function sendMessage() {
    const text = input.trim()

    if (!text) return

    setMessages((previous) => [
      ...previous,
      { role: 'user', text },
    ])
    setInput('')
  }

  return (
    <main className="app">
      <header className="topbar">
        <div className="brand">
          <span className="brand-icon">A</span>
          <div>
            <h1>Avatar AI</h1>
            <p>Real-time AI companion</p>
          </div>
        </div>
        <span className="status">
          <span className="status-dot" />
          Prototype
        </span>
      </header>

      <section className="workspace">
        <section className="avatar-panel">
          <div className="section-label">YOUR AI COMPANION</div>

          <div className="avatar">
            <div className="avatar-glow" />
            <div className="avatar-face">
              <div className="avatar-hair" />
              <div className="eyes">
                <span />
                <span />
              </div>
              <div className="nose" />
              <div className="mouth" />
            </div>
          </div>

          <h2>Your AI Avatar</h2>
          <p className="avatar-description">
            Your conversational AI starts here.
          </p>

          <div className={`connection ${backendStatus}`}>
            <span className="status-dot" />
              {backendMessage}
          </div>

          <div className="feature-row">
            <span>AI Conversation</span>
            <span>Voice Ready</span>
            <span>Avatar UI</span>
          </div>
        </section>

        <section className="chat-panel">
          <div className="chat-heading">
            <div>
              <h2>Conversation</h2>
              <p>Talk to your AI companion</p>
            </div>
            <span className="chat-symbol">✦</span>
          </div>

          <div className="messages">
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`message ${message.role}`}
              >
                <span className="message-role">
                  {message.role === 'assistant' ? 'AVATAR' : 'YOU'}
                </span>
                <p>{message.text}</p>
              </div>
            ))}
          </div>

          <div className="chat-controls">
            <button
              className={`mic-button ${isListening ? 'active' : ''}`}
              onClick={() => setIsListening((value) => !value)}
              aria-label="Toggle microphone demo state"
              title="Demo only: does not access your microphone"
            >
              {isListening ? '■' : '🎙'}
            </button>

            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') sendMessage()
              }}
              placeholder="Type a message..."
              aria-label="Your message"
            />

            <button className="send-button" onClick={sendMessage}>
              Send <span>↗</span>
            </button>
          </div>

          <p className="prototype-note">
           React frontend · Django REST API
          </p>
        </section>
      </section>

      <footer>
        AI Real-Time Avatar System <span>·</span> Stage 1
      </footer>
    </main>
  )
}

export default App

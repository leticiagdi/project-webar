import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import './Login.css'

interface LoginPageProps {
  onNavigate: (page: 'home' | 'structures' | 'structure-detail' | 'tutorial' | 'info' | 'settings') => void
}

export const LoginPage = ({ onNavigate }: LoginPageProps) => {
  const [isLogin, setIsLogin] = useState(true) // true = login, false = cadastro
  const [formData, setFormData] = useState({
    nomeCompleto: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  
  const { login, register } = useAuth()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    setError('') // Limpa erro quando usuário digita
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      if (isLogin) {
        // Login
        const result = await login(formData.email, formData.password)
        if (result.success) {
          onNavigate('home') // Redireciona para home após login
        } else {
          setError(result.message || 'Erro no login')
        }
      } else {
        // Cadastro
        if (formData.password !== formData.confirmPassword) {
          setError('As senhas não coincidem')
          return
        }
        
        if (formData.password.length < 6) {
          setError('A senha deve ter pelo menos 6 caracteres')
          return
        }

        const result = await register(formData.nomeCompleto, formData.email, formData.password)
        if (result.success) {
          onNavigate('home') // Redireciona para home após cadastro
        } else {
          setError(result.message || 'Erro no cadastro')
        }
      }
    } catch (error) {
      setError('Erro de conexão com o servidor')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>🧬 WebAR UFCSPA</h1>
          <p>Plataforma Educativa de Ciências da Vida</p>
        </div>

        <div className="login-tabs">
          <button 
            className={`tab ${isLogin ? 'active' : ''}`}
            onClick={() => setIsLogin(true)}
          >
            Entrar
          </button>
          <button 
            className={`tab ${!isLogin ? 'active' : ''}`}
            onClick={() => setIsLogin(false)}
          >
            Cadastrar
          </button>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="nomeCompleto">Nome Completo</label>
              <input
                type="text"
                id="nomeCompleto"
                name="nomeCompleto"
                value={formData.nomeCompleto}
                onChange={handleInputChange}
                required={!isLogin}
                placeholder="Digite seu nome completo"
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              placeholder="Digite seu email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              placeholder="Digite sua senha"
            />
          </div>

          {!isLogin && (
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirmar Senha</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required={!isLogin}
                placeholder="Confirme sua senha"
              />
            </div>
          )}

          {error && (
            <div className="error-message">
              ⚠️ {error}
            </div>
          )}

          <button 
            type="submit" 
            className="submit-button"
            disabled={isLoading}
          >
            {isLoading ? '⏳ Aguarde...' : (isLogin ? '🚀 Entrar' : '📝 Cadastrar')}
          </button>
        </form>

        <div className="login-footer">
          <p>Desenvolvido pela UFCSPA</p>
          <button 
            className="guest-button"
            onClick={() => onNavigate('home')}
          >
            🔍 Continuar como Visitante
          </button>
        </div>
      </div>
    </div>
  )
}
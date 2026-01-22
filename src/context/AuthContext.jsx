import { createContext, useContext, useState } from "react"

const AuthContext = createContext()

export function AuthProvider({ children }) {
  // estado FAKE por enquanto
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // funções que no futuro vão chamar backend
  const login = () => setIsAuthenticated(true)
  const logout = () => setIsAuthenticated(false)

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}

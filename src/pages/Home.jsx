import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

export default function Home() {
  const { login } = useAuth()
  const navigate = useNavigate()

  function handleLogin() {
    login()
    navigate("/fichas")
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md space-y-8">

        {/* TÍTULO */}
        <div className="text-center">
          <h1 className="text-5xl font-bold tracking-wide">
            Redemption
          </h1>
          <h2 className="text-xl mt-2 opacity-70">
            O Horizonte Crescente
          </h2>
        </div>

        {/* LOGIN */}
        <div
          className="rounded-xl p-6 space-y-4"
          style={{ backgroundColor: "var(--surface)" }}
        >
          <h3 className="text-xl font-semibold text-center">
            Acesso
          </h3>

          <div className="space-y-3">
            <input
              type="text"
              placeholder="Email ou usuário"
              className="w-full px-4 py-2 rounded-md outline-none"
              style={{ backgroundColor: "var(--bg)" }}
            />

            <input
              type="password"
              placeholder="Senha"
              className="w-full px-4 py-2 rounded-md outline-none"
              style={{ backgroundColor: "var(--bg)" }}
            />
          </div>

        <button
        onClick={handleLogin}
        className="
        w-full
        py-2
        rounded-md
        font-semibold
        cursor-pointer
        transition
        bg-(--button)
        text-white
        hover:bg-(--button-hover)">
        Entrar
        </button>

          <div className="text-center text-sm opacity-70">
            <span>Não tem conta?</span>{" "}
            <button className="underline">
              Criar personagem
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}

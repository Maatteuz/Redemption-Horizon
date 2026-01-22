import { NavLink, Outlet } from "react-router-dom"

export default function Layout() {
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        backgroundColor: "var(--bg)",
        color: "var(--text)"
      }}
    >
      <header
        className="px-6 py-4 flex gap-6"
        style={{
          backgroundColor: "var(--surface)",
          borderBottom: "1px solid var(--text)"
        }}
      >
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "font-bold underline" : "opacity-70"
          }
        >
          Início
        </NavLink>

        <NavLink
          to="/fichas"
          className={({ isActive }) =>
            isActive ? "font-bold underline" : "opacity-70"
          }
        >
          Fichas
        </NavLink>
      </header>

      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  )
}

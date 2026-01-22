import { Routes, Route } from "react-router-dom"
import Layout from "./components/Layout"
import Home from "./pages/Home"
import Fichas from "./pages/Fichas/Fichas.jsx"
import ProtectedRoute from "./components/ProtectedRoute"

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />

        <Route
          path="/fichas"
          element={
            <ProtectedRoute>
              <Fichas />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  )
}

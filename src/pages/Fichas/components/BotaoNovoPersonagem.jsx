import { PlusCircle } from "lucide-react"

export default function BotaoNovoPersonagem({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="fixed top-20 right-6 px-4 py-2 rounded-lg bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all cursor-pointer flex items-center gap-2 text-sm font-semibold z-30"
      title="Criar novo personagem"
    >
      <PlusCircle size={18} />
      Novo
    </button>
  )
}
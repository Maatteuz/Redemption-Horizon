import { X } from "lucide-react"

export default function ModalNotas({ 
  aberto, 
  notas, 
  onFechar, 
  onNotasChange, 
  modificadoresPericia 
}) {
  if (!aberto) return null

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-(--surface) p-6 rounded-xl w-full max-w-md relative">
        <button
          onClick={onFechar}
          className="absolute top-4 right-4 p-1 rounded-full hover:bg-(--surface-alt) transition-colors cursor-pointer"
        >
          <X size={20} />
        </button>

        <h3 className="font-semibold text-lg mb-4">Anotações</h3>

        <textarea
          value={notas}
          onChange={onNotasChange}
          placeholder="Escreva suas anotações aqui..."
          className="w-full h-32 rounded-lg bg-(--surface-alt) p-3 resize-none border-none outline-none focus:ring-2 focus:ring-primary/50"
        />

        <h4 className="mt-4 font-semibold text-sm text-muted-foreground uppercase tracking-wider">
          Modificadores de Perícia
        </h4>
        <div className="mt-2 grid grid-cols-2 gap-2">
          {modificadoresPericia.map(({ key, label, modificador }) => (
            <div key={key} className="flex items-center justify-between bg-(--surface-alt) rounded px-3 py-2">
              <span className="text-sm font-medium">{label}</span>
              <span className={`text-sm font-bold ${modificador >= 0 ? 'text-stat-advantage' : 'text-stat-disadvantage'}`}>
                {modificador >= 0 ? "+" : ""}{modificador}
              </span>
            </div>
          ))}
        </div>

        <button
          onClick={onFechar}
          className="mt-6 w-full py-2 rounded bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer font-semibold transition-colors"
        >
          Fechar
        </button>
      </div>
    </div>
  )
}
import { X } from "lucide-react"
import { STATUS, STATUS_INICIAL } from '../../../constants/status'

export default function ModalDistribuicao({ 
  aberto, 
  baseStatus, 
  onFechar 
}) {
  if (!aberto) return null

  const detalhes = STATUS.map(s => ({
    label: s.label,
    valorBase: baseStatus[s.key],
    pontosAdicionados: baseStatus[s.key] - STATUS_INICIAL
  }))

  const totalDistribuido = detalhes.reduce((acc, item) => acc + item.pontosAdicionados, 0)

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-(--surface) p-6 rounded-xl w-full max-w-md relative">
        <button
          onClick={onFechar}
          className="absolute top-4 right-4 p-1 rounded-full hover:bg-(--surface-alt) transition-colors cursor-pointer"
        >
          <X size={20} />
        </button>

        <h3 className="font-semibold text-lg mb-4">Distribuição de Pontos</h3>

        <div className="space-y-2 mb-4">
          {detalhes.map(({ label, valorBase, pontosAdicionados }) => (
            <div 
              key={label} 
              className="flex items-center justify-between bg-(--surface-alt) rounded px-4 py-3"
            >
              <div className="flex items-center gap-3">
                <span className="font-semibold text-base">{label}</span>
                <span className="text-xs text-muted-foreground">
                  (Base: {STATUS_INICIAL})
                </span>
              </div>
              
              <div className="flex items-center gap-3">
                <span className="font-bold text-lg">{valorBase}</span>
                
                {pontosAdicionados !== 0 && (
                  <span 
                    className={`text-sm font-bold min-w-12 text-right
                      ${pontosAdicionados > 0 ? 'text-stat-advantage' : 'text-stat-disadvantage'}`}
                  >
                    ({pontosAdicionados > 0 ? '+' : ''}{pontosAdicionados})
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="pt-4 border-t border-gray-700">
          <div className="flex items-center justify-between text-base">
            <span className="font-semibold">Total de pontos distribuídos:</span>
            <span className={`font-bold text-xl
              ${totalDistribuido > 0 ? 'text-stat-advantage' : totalDistribuido < 0 ? 'text-stat-disadvantage' : 'text-foreground'}`}
            >
              {totalDistribuido > 0 ? '+' : ''}{totalDistribuido}
            </span>
          </div>
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
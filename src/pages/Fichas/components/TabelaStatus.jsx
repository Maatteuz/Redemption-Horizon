import { Info } from "lucide-react"
import { STATUS } from '../../../constants/status'
import LinhaStatus from './LinhaStatus'

export default function TabelaStatus({ 
  baseStatus, 
  distribuicao, 
  pontosDistribuidos, 
  distribuicaoValida, 
  onAlterarBase, 
  onMarcar, 
  onResetar, 
  onResetarFicha, 
  podeMarcar, 
  valorFinal,
  onAbrirModalDistribuicao
}) {
  return (
    <section className="rounded-xl p-4 bg-(--surface) overflow-x-auto">
      <h3 className="text-lg font-semibold text-center tracking-wide mb-4">
        STATUS
      </h3>

      <table className="w-full border-collapse">
        <thead>
          <tr className="text-xs text-muted-foreground uppercase tracking-wider">
            <th className="text-left pb-3 pl-2 w-20">Atrib.</th>
            <th className="pb-3 w-28">Base</th>
            <th className="pb-3 w-8"></th>
            <th className="pb-3 w-16">Final</th>
            <th className="pb-3" colSpan={2}>
              <div className="grid grid-cols-2 gap-4">
                <span className="text-stat-advantage">Vantagem</span>
                <span className="text-stat-disadvantage">Desvantagem</span>
              </div>
            </th>
            <th className="pb-3 w-10"></th>
          </tr>
        </thead>
        <tbody>
          {STATUS.map((status) => (
            <LinhaStatus
              key={status.key}
              status={status}
              valorBase={baseStatus[status.key]}
              valorFinal={valorFinal(status.key)}
              distribuicao={distribuicao}
              onAlterarBase={(valor) => onAlterarBase(status.key, valor)}
              onMarcar={(tipo) => onMarcar(tipo, status.key)}
              onResetar={() => onResetar(status.key)}
              podeMarcar={podeMarcar}
            />
          ))}
        </tbody>
      </table>

      <div className="text-sm text-muted-foreground mt-4 text-center flex items-center justify-center gap-2">
        <span>
          Pontos distribuídos: <strong className="text-foreground">{pontosDistribuidos}</strong>
        </span>
        
        <button
          onClick={onAbrirModalDistribuicao}
          className="w-5 h-5 rounded-full bg-(--surface-alt) hover:bg-(--surface-hover) transition-colors cursor-pointer flex items-center justify-center"
          title="Ver detalhes da distribuição"
        >
          <Info size={14} className="text-muted-foreground" />
        </button>
      </div>

      <div className="flex gap-3 mt-4">
        <button
          disabled={!distribuicaoValida}
          className={`flex-1 py-2 rounded font-semibold transition-colors
            ${distribuicaoValida
              ? "cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90"
              : "opacity-40 cursor-not-allowed bg-(--surface-alt)"}`}
        >
          Salvar
        </button>

        <button
          onClick={onResetarFicha}
          className="flex-1 py-2 rounded bg-(--surface-alt) hover:bg-(--surface-hover) cursor-pointer font-semibold transition-colors"
        >
          Resetar
        </button>
      </div>
    </section>
  )
}
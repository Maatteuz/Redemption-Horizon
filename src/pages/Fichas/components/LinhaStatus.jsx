import { RotateCcw } from "lucide-react"
import InputNumerico from '../../../components/ui/InputNumerico'
import BotaoDistribuicao from '../../../components/ui/BotaoDistribuição'

export default function LinhaStatus({ 
  status, 
  valorBase, 
  valorFinal, 
  distribuicao, 
  onAlterarBase, 
  onMarcar, 
  onResetar, 
  podeMarcar 
}) {
  const { key, label } = status

  return (
    <tr className="bg-(--surface-alt)">
      <td className="py-2 pl-2 rounded-l-lg">
        <span className="font-medium">{label}</span>
      </td>

      <td className="py-2">
        <InputNumerico 
          valor={valorBase} 
          onChange={onAlterarBase} 
        />
      </td>

      <td className="py-2 text-center text-muted-foreground">=</td>

      <td className="py-2 text-center">
        <span className="font-bold text-lg">{valorFinal}</span>
      </td>

      <td className="py-2" colSpan={2}>
        <div className="grid grid-cols-2 gap-4">
          {/* Vantagens */}
          <div className="flex gap-2 justify-center">
            {[["vantagem2", "+2"], ["vantagem1", "+1"]].map(([tipo, texto]) => (
              <BotaoDistribuicao
                key={tipo}
                tipo={tipo}
                texto={texto}
                ativo={distribuicao[tipo] === key}
                bloqueado={false}
                onClick={() => onMarcar(tipo)}
              />
            ))}
          </div>

          {/* Desvantagens */}
          <div className="flex gap-2 justify-center">
            {[["desvantagem2", "-2"], ["desvantagem1", "-1"]].map(([tipo, texto]) => (
              <BotaoDistribuicao
                key={tipo}
                tipo={tipo}
                texto={texto}
                ativo={distribuicao[tipo] === key}
                bloqueado={!podeMarcar(tipo)}
                onClick={() => onMarcar(tipo)}
              />
            ))}
          </div>
        </div>
      </td>

      <td className="py-2 pr-2 rounded-r-lg">
        <button
          onClick={onResetar}
          className="w-7 h-7 rounded bg-(--surface) hover:bg-(--surface-hover) transition-colors cursor-pointer flex items-center justify-center"
          title="Resetar atributo"
        >
          <RotateCcw size={14} className="text-muted-foreground" />
        </button>
      </td>
    </tr>
  )
}
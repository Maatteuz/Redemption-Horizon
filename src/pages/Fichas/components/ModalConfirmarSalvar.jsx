import { X } from "lucide-react"
import { useState } from "react"

export default function ModalConfirmarSalvar({ aberto, nome, onConfirmar, onCancelar }) {
  const [etapa, setEtapa] = useState(1) // 1 = confirmação, 2 = categoria
  const [categoria, setCategoria] = useState(null)

  if (!aberto) {
    // Reset ao fechar
    if (etapa !== 1) setEtapa(1)
    if (categoria !== null) setCategoria(null)
    return null
  }

  function handleConfirmar() {
    if (etapa === 1) {
      setEtapa(2)
    } else if (etapa === 2 && categoria) {
      onConfirmar(categoria)
      setEtapa(1)
      setCategoria(null)
    }
  }

  function handleCancelar() {
    setEtapa(1)
    setCategoria(null)
    onCancelar()
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-(--surface) p-6 rounded-xl w-full max-w-md relative">
        <button
          onClick={handleCancelar}
          className="absolute top-4 right-4 p-1 rounded-full hover:bg-(--surface-alt) transition-colors cursor-pointer"
        >
          <X size={20} />
        </button>

        {etapa === 1 ? (
          <>
            <h3 className="font-semibold text-lg mb-4">Confirmar Salvamento</h3>
            <p className="text-muted-foreground mb-6">
              Tem certeza que deseja salvar o personagem <strong className="text-foreground">"{nome}"</strong>?
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleCancelar}
                className="flex-1 py-2 rounded bg-(--surface-alt) hover:bg-(--surface-hover) cursor-pointer font-semibold transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmar}
                className="flex-1 py-2 rounded bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer font-semibold transition-colors"
              >
                Sim, salvar
              </button>
            </div>
          </>
        ) : (
          <>
            <h3 className="font-semibold text-lg mb-4">Selecione a Categoria</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Este personagem é um:
            </p>
            
            <div className="space-y-2 mb-6">
              {[
                { key: "player", label: "Player", desc: "Personagem jogável" },
                { key: "npc", label: "NPC", desc: "Personagem não-jogável" },
                { key: "outro", label: "Outro", desc: "Outra categoria" }
              ].map(({ key, label, desc }) => (
                <button
                  key={key}
                  onClick={() => setCategoria(key)}
                  className={`w-full p-3 rounded-lg text-left transition-all cursor-pointer
                    ${categoria === key 
                      ? "bg-primary text-primary-foreground shadow-md" 
                      : "bg-(--surface-alt) hover:bg-(--surface-hover)"}`}
                >
                  <div className="font-semibold">{label}</div>
                  <div className={`text-xs ${categoria === key ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                    {desc}
                  </div>
                </button>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setEtapa(1)}
                className="flex-1 py-2 rounded bg-(--surface-alt) hover:bg-(--surface-hover) cursor-pointer font-semibold transition-colors"
              >
                Voltar
              </button>
              <button
                onClick={handleConfirmar}
                disabled={!categoria}
                className={`flex-1 py-2 rounded font-semibold transition-colors
                  ${categoria
                    ? "bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer"
                    : "bg-(--surface-alt) opacity-40 cursor-not-allowed"}`}
              >
                Confirmar
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
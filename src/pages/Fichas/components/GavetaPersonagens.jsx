import { FolderOpen, X, Trash2 } from "lucide-react"
import { useState } from "react"

const CATEGORIAS = [
  { key: "player", label: "Players" },
  { key: "npc", label: "NPCs" },
  { key: "outro", label: "Outros" }
]

export default function GavetaPersonagens({ personagens, onCarregar, onExcluir }) {
  const [aberta, setAberta] = useState(false)
  const [categoriaAtiva, setCategoriaAtiva] = useState("player")
  const [selecionados, setSelecionados] = useState([])
  const [modoExclusao, setModoExclusao] = useState(false)

  const personagensPorCategoria = (categoria) => {
    return personagens
      .filter(p => p.categoria === categoria)
      .sort((a, b) => a.nome.localeCompare(b.nome))
  }

  const personagensFiltrados = personagensPorCategoria(categoriaAtiva)

  function toggleSelecionado(id) {
    setSelecionados(prev => 
      prev.includes(id) 
        ? prev.filter(i => i !== id)
        : [...prev, id]
    )
  }

  function handleExcluir() {
    if (selecionados.length === 0) return
    
    const confirmMsg = selecionados.length === 1 
      ? "Excluir 1 personagem?"
      : `Excluir ${selecionados.length} personagens?`
    
    if (confirm(confirmMsg)) {
      onExcluir(selecionados)
      setSelecionados([])
      setModoExclusao(false)
    }
  }

  function fechar() {
    setAberta(false)
    setSelecionados([])
    setModoExclusao(false)
  }

  if (!aberta) {
    return (
      <button
        onClick={() => setAberta(true)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all cursor-pointer flex items-center justify-center z-30"
        title="Abrir gaveta de personagens"
      >
        <FolderOpen size={24} />
        {personagens.length > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
            {personagens.length}
          </span>
        )}
      </button>
    )
  }

  return (
    <>
      <div className="fixed inset-0 bg-black/60 z-40" onClick={fechar} />
      
      <div className="fixed top-0 right-0 h-full w-96 bg-(--surface) shadow-2xl z-50 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-700 flex items-center justify-between">
          <h3 className="font-semibold text-lg flex items-center gap-2">
            <FolderOpen size={20} />
            Personagens
          </h3>
          <button
            onClick={fechar}
            className="p-1 rounded-full hover:bg-(--surface-alt) transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Categorias */}
        <div className="p-4 border-b border-gray-700">
          <div className="grid grid-cols-3 gap-2">
            {CATEGORIAS.map(({ key, label }) => {
              const total = personagensPorCategoria(key).length
              return (
                <button
                  key={key}
                  onClick={() => {
                    setCategoriaAtiva(key)
                    setSelecionados([])
                    setModoExclusao(false)
                  }}
                  className={`py-2 px-3 rounded text-sm font-semibold transition-all cursor-pointer relative
                    ${categoriaAtiva === key
                      ? "bg-primary text-primary-foreground"
                      : "bg-(--surface-alt) hover:bg-(--surface-hover)"}`}
                >
                  {label}
                  {total > 0 && (
                    <span className={`absolute -top-1 -right-1 w-4 h-4 rounded-full text-[10px] flex items-center justify-center font-bold
                      ${categoriaAtiva === key ? "bg-primary-foreground text-primary" : "bg-primary text-primary-foreground"}`}>
                      {total}
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* Lista */}
        <div className="flex-1 overflow-y-auto p-4">
          {personagensFiltrados.length === 0 ? (
            <p className="text-center text-muted-foreground text-sm py-8">
              Nenhum personagem nesta categoria
            </p>
          ) : (
            <div className="space-y-2">
              {personagensFiltrados.map((personagem) => {
                const selecionado = selecionados.includes(personagem.id)
                return (
                  <div
                    key={personagem.id}
                    className={`p-3 rounded-lg transition-all
                      ${selecionado ? "bg-primary/20 ring-2 ring-primary" : "bg-(--surface-alt) hover:bg-(--surface-hover)"}`}
                  >
                    <div className="flex items-center gap-3">
                      {modoExclusao && (
                        <input
                          type="checkbox"
                          checked={selecionado}
                          onChange={() => toggleSelecionado(personagem.id)}
                          className="w-4 h-4 cursor-pointer"
                        />
                      )}

                      {personagem.foto && (
                        <img
                          src={personagem.foto}
                          alt={personagem.nome}
                          className="w-10 h-10 rounded object-cover shrink-0"
                        />
                      )}

                      <button
                        onClick={() => {
                          if (!modoExclusao) {
                            onCarregar(personagem)
                            fechar()
                          }
                        }}
                        disabled={modoExclusao}
                        className={`flex-1 text-left ${modoExclusao ? "cursor-default" : "cursor-pointer"}`}
                      >
                        <p className="font-semibold truncate">{personagem.nome}</p>
                        <p className="text-xs text-muted-foreground">
                          {personagem.pontosDistribuidos || 0} pontos
                        </p>
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-700">
          {!modoExclusao ? (
            <button
              onClick={() => setModoExclusao(true)}
              disabled={personagensFiltrados.length === 0}
              className={`w-full py-2 rounded font-semibold transition-colors flex items-center justify-center gap-2
                ${personagensFiltrados.length > 0
                  ? "bg-red-500/20 text-red-500 hover:bg-red-500/30 cursor-pointer"
                  : "bg-(--surface-alt) text-muted-foreground opacity-40 cursor-not-allowed"}`}
            >
              <Trash2 size={16} />
              Excluir personagens
            </button>
          ) : (
            <div className="space-y-2">
              <button
                onClick={handleExcluir}
                disabled={selecionados.length === 0}
                className={`w-full py-2 rounded font-semibold transition-colors
                  ${selecionados.length > 0
                    ? "bg-red-500 text-white hover:bg-red-600 cursor-pointer"
                    : "bg-(--surface-alt) opacity-40 cursor-not-allowed"}`}
              >
                Excluir {selecionados.length > 0 ? `(${selecionados.length})` : ""}
              </button>
              <button
                onClick={() => {
                  setModoExclusao(false)
                  setSelecionados([])
                }}
                className="w-full py-2 rounded bg-(--surface-alt) hover:bg-(--surface-hover) cursor-pointer font-semibold transition-colors"
              >
                Cancelar
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
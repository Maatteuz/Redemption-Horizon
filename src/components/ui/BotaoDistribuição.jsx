export default function BotaoDistribuicao({ tipo, texto, ativo, bloqueado, onClick }) {
  const isVantagem = tipo.includes('vantagem')
  
  return (
    <button
      disabled={bloqueado}
      onClick={onClick}
      className={`w-8 h-8 rounded-full text-xs font-semibold transition-all
        ${bloqueado 
          ? "opacity-30 cursor-not-allowed bg-(--surface)" 
          : "cursor-pointer"}
        ${ativo 
          ? `${isVantagem ? 'bg-stat-advantage' : 'bg-stat-disadvantage'} text-white shadow-md` 
          : bloqueado ? "" : "bg-(--surface) hover:bg-(--surface-hover)"}`}
    >
      {texto}
    </button>
  )
}
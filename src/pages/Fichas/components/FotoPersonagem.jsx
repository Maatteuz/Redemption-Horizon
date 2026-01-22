import { Camera, StickyNote } from "lucide-react"

export default function FotoPersonagem({ 
  foto, 
  nome, 
  fileInputRef, 
  onFotoChange, 
  onNomeChange, 
  onAbrirNotas 
}) {
  function triggerFileInput() {
    fileInputRef.current?.click()
  }

  return (
    <section className="rounded-xl p-4 bg-(--surface)">
      <div className="relative aspect-square rounded-lg bg-(--surface-alt) flex items-center justify-center overflow-hidden group">
        {foto ? (
          <img src={foto} alt="Foto do personagem" className="object-cover w-full h-full" />
        ) : (
          <span className="opacity-60 text-muted-foreground">Foto</span>
        )}
        
        <button
          onClick={triggerFileInput}
          className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
        >
          <Camera size={32} className="text-white" />
        </button>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={onFotoChange}
        className="hidden"
      />

      <input
        value={nome}
        onChange={onNomeChange}
        placeholder="Nome do personagem"
        className="mt-3 w-full rounded px-3 py-2 bg-(--surface-alt) border-none outline-none focus:ring-2 focus:ring-primary/50"
      />

      <button
        onClick={onAbrirNotas}
        className="mt-3 w-full py-2 rounded bg-(--surface-alt) hover:bg-(--surface-hover) transition-colors cursor-pointer flex items-center justify-center gap-2"
      >
        <StickyNote size={16} />
        Anotações
      </button>
    </section>
  )
}
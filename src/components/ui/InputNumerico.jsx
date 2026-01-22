export default function InputNumerico({ valor, onChange, min = 1 }) {
  function handleChange(novoValor) {
    if (novoValor < min) return
    onChange(novoValor)
  }

  return (
    <div className="flex items-center justify-center gap-1">
      <button
        onClick={() => handleChange(valor - 1)}
        className="w-7 h-7 rounded bg-(--surface) hover:bg-(--surface-hover) transition-colors cursor-pointer flex items-center justify-center text-sm"
      >
        −
      </button>

      <input
        type="number"
        value={valor}
        onChange={e => handleChange(Number(e.target.value))}
        className="w-10 h-7 text-center rounded bg-(--surface) border-none outline-none
          [appearance:textfield]
          [&::-webkit-outer-spin-button]:appearance-none
          [&::-webkit-inner-spin-button]:appearance-none"
      />

      <button
        onClick={() => handleChange(valor + 1)}
        className="w-7 h-7 rounded bg-(--surface) hover:bg-(--surface-hover) transition-colors cursor-pointer flex items-center justify-center text-sm"
      >
        +
      </button>
    </div>
  )
}
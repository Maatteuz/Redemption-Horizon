import { useState, useRef } from "react"

// Componentes da página
import FotoPersonagem from './components/FotoPersonagem'
import TabelaStatus from './components/TabelaStatus'
import GraficoRadar from './components/GraficoRadar'
import ModalNotas from './components/ModalNotas'
import ModalDistribuicao from './components/ModalDistribuicao'

// Constantes
import { STATUS, STATUS_INICIAL } from '../../constants/status'

export default function Fichas() {
  const fileInputRef = useRef(null)
  
  const [baseStatus, setBaseStatus] = useState(
    Object.fromEntries(STATUS.map(s => [s.key, STATUS_INICIAL]))
  )

  const [distribuicao, setDistribuicao] = useState({
    vantagem2: null,
    vantagem1: null,
    desvantagem2: null,
    desvantagem1: null,
  })

  const [nome, setNome] = useState("")
  const [foto, setFoto] = useState(null)
  const [mostrarNotas, setMostrarNotas] = useState(false)
  const [mostrarDistribuicao, setMostrarDistribuicao] = useState(false)
  const [notas, setNotas] = useState("")

  /* ===================== STATUS ===================== */

  function alterarBase(status, valor) {
    if (valor < 1) return
    setBaseStatus(prev => ({ ...prev, [status]: valor }))
  }

  function resetarAtributo(status) {
    setBaseStatus(prev => ({ ...prev, [status]: STATUS_INICIAL }))
    setDistribuicao(prev => {
      const novo = { ...prev }
      Object.keys(novo).forEach(tipo => {
        if (novo[tipo] === status) novo[tipo] = null
      })
      return novo
    })
  }

  function modificador(status) {
    let mod = 0
    if (distribuicao.vantagem2 === status) mod += 2
    if (distribuicao.vantagem1 === status) mod += 1
    if (distribuicao.desvantagem2 === status) mod -= 2
    if (distribuicao.desvantagem1 === status) mod -= 1
    return mod
  }

  function valorFinal(status) {
    return baseStatus[status] + modificador(status)
  }

  function podeMarcar(tipo) {
    if (tipo === "desvantagem2" && !distribuicao.vantagem2) return false
    if (tipo === "desvantagem1" && !distribuicao.vantagem1) return false
    return true
  }

  function marcar(tipo, status) {
    if (
      Object.values(distribuicao).includes(status) &&
      distribuicao[tipo] !== status
    ) return

    if (!podeMarcar(tipo)) return

    setDistribuicao(prev => ({
      ...prev,
      [tipo]: prev[tipo] === status ? null : status,
    }))
  }

  const distribuicaoValida =
    (!!distribuicao.vantagem2 === !!distribuicao.desvantagem2) &&
    (!!distribuicao.vantagem1 === !!distribuicao.desvantagem1)

  function resetarFicha() {
    setBaseStatus(
      Object.fromEntries(STATUS.map(s => [s.key, STATUS_INICIAL]))
    )
    setDistribuicao({
      vantagem2: null,
      vantagem1: null,
      desvantagem2: null,
      desvantagem1: null,
    })
    setNome("")
    setFoto(null)
    setNotas("")
  }

  /* ===================== CONTADOR ===================== */

  const pontosDistribuidos = Object.values(baseStatus)
    .reduce((a, b) => a + b, 0) - STATUS.length * STATUS_INICIAL

  /* ===================== PERÍCIAS ===================== */

  function modificadorPericia(status) {
    const valor = valorFinal(status)
    if (valor <= 6) return -2
    return Math.floor((valor - 6) / 2) - 2
  }

  /* ===================== FOTO ===================== */

  function handleFoto(e) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setFoto(reader.result)
    reader.readAsDataURL(file)
  }

  /* ===================== DADOS PARA COMPONENTES ===================== */

  const dadosGrafico = STATUS.map(s => ({
    atributo: s.label,
    valor: valorFinal(s.key),
    fullMark: 20,
    icon: s.icon,
  }))

  const modificadoresPericia = STATUS.map(s => ({
    label: s.label,
    key: s.key,
    modificador: modificadorPericia(s.key)
  }))

  return (
    <div className="min-h-screen p-4 bg-background text-foreground">
      <h2 className="text-3xl font-bold text-center mb-6">
        Ficha do Personagem
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_2.4fr_1.2fr] gap-6 max-w-7xl mx-auto">
        
        <FotoPersonagem
          foto={foto}
          nome={nome}
          fileInputRef={fileInputRef}
          onFotoChange={handleFoto}
          onNomeChange={(e) => setNome(e.target.value)}
          onAbrirNotas={() => setMostrarNotas(true)}
        />

        <TabelaStatus
          baseStatus={baseStatus}
          distribuicao={distribuicao}
          pontosDistribuidos={pontosDistribuidos}
          distribuicaoValida={distribuicaoValida}
          onAlterarBase={alterarBase}
          onMarcar={marcar}
          onResetar={resetarAtributo}
          onResetarFicha={resetarFicha}
          podeMarcar={podeMarcar}
          valorFinal={valorFinal}
          onAbrirModalDistribuicao={() => setMostrarDistribuicao(true)}
        />

        <GraficoRadar dados={dadosGrafico} />
      </div>

      <ModalNotas
        aberto={mostrarNotas}
        notas={notas}
        onFechar={() => setMostrarNotas(false)}
        onNotasChange={(e) => setNotas(e.target.value)}
        modificadoresPericia={modificadoresPericia}
      />

      <ModalDistribuicao
        aberto={mostrarDistribuicao}
        baseStatus={baseStatus}
        onFechar={() => setMostrarDistribuicao(false)}
      />
    </div>
  )
} 
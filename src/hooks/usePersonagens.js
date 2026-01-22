import { useState, useEffect } from "react"

const STORAGE_KEY = 'fichas_personagens'

export function usePersonagens() {
  const [personagens, setPersonagens] = useState([])

  useEffect(() => {
    const salvos = localStorage.getItem(STORAGE_KEY)
    if (salvos) {
      try {
        setPersonagens(JSON.parse(salvos))
      } catch {
        setPersonagens([])
      }
    }
  }, [])

  function salvar(personagem) {
    const novoPersonagem = {
      ...personagem,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      dataSalvo: new Date().toISOString()
    }

    const novosPersonagens = [...personagens, novoPersonagem]
    setPersonagens(novosPersonagens)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(novosPersonagens))
    return novoPersonagem.id
  }

  function excluir(ids) {
    const idsArray = Array.isArray(ids) ? ids : [ids]
    const novosPersonagens = personagens.filter(p => !idsArray.includes(p.id))
    setPersonagens(novosPersonagens)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(novosPersonagens))
  }

  function buscar(id) {
    return personagens.find(p => p.id === id)
  }

  return { personagens, salvar, excluir, buscar }
}
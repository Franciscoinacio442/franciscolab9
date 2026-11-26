'use client'

import React, { useState, useEffect } from 'react'

export default function Relogio() {
  const [hora, setHora] = useState<string>('')

  useEffect(() => {
    function atualizarHora() {
      const agora = new Date()
      setHora(agora.toLocaleTimeString('pt-PT'))
    }

    atualizarHora()
    const intervalo = setInterval(atualizarHora, 1000)

    return () => clearInterval(intervalo)
  }, [])

  return (
    <span className="font-mono font-medium">
      {hora}
    </span>
  )
}
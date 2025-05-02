'use client'

import { useState } from 'react'
import Win3 from '../Components/ComingsoonComponents/win3'

export default function Win() {
  // Contoh: kita pakai state untuk show/hide Win3
  const [showWin, setShowWin] = useState(true)

  return (
    <>
      {showWin && (
        <Win3
          onPlayAgain={() => {
            // TODO: masukkan logika “play again” di sini,
            // misal sembunyikan Win3 dan tampilkan lagi opening:
            setShowWin(false)
            // atau navigasi ulang, dsb.
          }}
        />
      )}
    </>
  )
}

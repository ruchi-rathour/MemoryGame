import React, { useEffect, useState } from 'react'

const GRID_WIDTH = 10;
const GRID_HEIGHT = 20;
const INITIAL_POS = { x: 4, y: 0 }

const BlockGame = () => {
  const [block, setBlock] = useState(INITIAL_POS)
  const [grid, setGrid] = useState(Array(GRID_HEIGHT).fill().map(() => Array(GRID_WIDTH).fill(0)))
  const [score, setScore] = useState(0)

  const moveBlock = (direction) => {
    setBlock(prev => {
      let newPos = { ...prev }
      if (direction === 'left' && prev.x > 0) newPos.x--
      if (direction === 'right' && prev.x < GRID_WIDTH - 1) newPos.x++
      if (direction === 'down' && prev.y < GRID_HEIGHT - 1) newPos.y++
      return newPos
    })
  }

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowLeft') moveBlock('left')
      if (e.key === 'ArrowRight') moveBlock('right')
      if (e.key === 'ArrowDown') moveBlock('down')
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      moveBlock('down')
    }, 800)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col items-center mt-4">
      <h2 className="text-2xl font-bold mb-2 text-white">Score: {score}</h2>
      <div className="grid grid-cols-10 gap-[2px] bg-gray-700 p-1">
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => {
            const isBlock = block.x === colIndex && block.y === rowIndex
            return (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`w-6 h-6 ${isBlock ? 'bg-emerald-400' : 'bg-gray-900'} border border-gray-800`}
              ></div>
            )
          })
        )}
      </div>
    </div>
  )
}

export default BlockGame

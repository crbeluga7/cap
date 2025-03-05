"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

export default function PracticeTimer() {
  const [time, setTime] = useState(0)
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isActive) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1)
      }, 1000)
    }

    return () => clearInterval(interval)
  }, [isActive])

  const toggleTimer = () => {
    setIsActive(!isActive)
  }

  const resetTimer = () => {
    setIsActive(false)
    setTime(0)
  }

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const remainingSeconds = seconds % 60
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold mb-4">Practice Timer</h3>
      <div className="text-4xl font-bold mb-4 text-center">{formatTime(time)}</div>
      <div className="flex justify-center space-x-4">
        <Button onClick={toggleTimer}>{isActive ? "Pause" : "Start"}</Button>
        <Button onClick={resetTimer} variant="outline">
          Reset
        </Button>
      </div>
    </div>
  )
}


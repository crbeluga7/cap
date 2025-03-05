"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const scales = {
  'C Major': ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
  'G Major': ['G', 'A', 'B', 'C', 'D', 'E', 'F#'],
  'F Major': ['F', 'G', 'A', 'Bb', 'C', 'D', 'E'],
  'A Minor': ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
  'E Minor': ['E', 'F#', 'G', 'A', 'B', 'C','D'],
  'A Minor': ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
  'E Minor': ['E', 'F#', 'G', 'A', 'B', 'C', 'D'],
}

export default function ScaleExercise() {
  const [selectedScale, setSelectedScale] = useState('C Major')
  const [currentNote, setCurrentNote] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  const playScale = () => {
    setIsPlaying(true)
    let noteIndex = 0
    const interval = setInterval(() => {
      if (noteIndex < scales[selectedScale as keyof typeof scales].length) {
        // In a real implementation, we would play the actual note sound here
        console.log(`Playing ${scales[selectedScale as keyof typeof scales][noteIndex]}`)
        setCurrentNote(noteIndex)
        noteIndex++
      } else {
        clearInterval(interval)
        setIsPlaying(false)
        setCurrentNote(0)
      }
    }, 1000)
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold mb-4">Scale Exercise</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Select Scale</label>
          <Select value={selectedScale} onValueChange={setSelectedScale}>
            <SelectTrigger>
              <SelectValue placeholder="Select a scale" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(scales).map((scale) => (
                <SelectItem key={scale} value={scale}>{scale}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex justify-center space-x-2">
          {scales[selectedScale as keyof typeof scales].map((note, index) => (
            <div
              key={index}
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                index === currentNote && isPlaying ? 'bg-indigo-500 text-white' : 'bg-gray-200'
              }`}
            >
              {note}
            </div>
          ))}
        </div>
        <Button onClick={playScale} disabled={isPlaying} className="w-full">
          {isPlaying ? 'Playing...' : 'Play Scale'}
        </Button>
      </div>
    </div>
  )
}


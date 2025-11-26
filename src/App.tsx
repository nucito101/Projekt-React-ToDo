import { useState } from "react"
import "./App.css"
import type { Task } from "./types"

function App() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [inputValue, setInputValue] = useState("")

  const addTask = () => {
    if (inputValue.trim() === "") return // Prevent adding empty tasks

    const newTask: Task = {
      id: crypto.randomUUID(), // Generate a unique ID for the task
      description: inputValue,
      createdAt: new Date(),
      status: "open",
    }

    setTasks([...tasks, newTask])
    setInputValue("") // Clear the input field after adding the task
  }

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      addTask()
    }
  }

  return <></>
}

export default App

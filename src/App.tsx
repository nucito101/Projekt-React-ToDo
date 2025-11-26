import { useState } from "react"
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

  const toggleTaskStatus = (id: string) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, status: task.status === "open" ? "completed" : "open" } : task))
    )
  }

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      addTask()
    }
  }

  return (
    <>
      <div>
        <div>
          <h1>To-Do Liste</h1>
          <div>
            <div>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="add a task ..."
                aria-label="New Task"
              />
              <button onClick={addTask}>Add Task</button>
            </div>
          </div>

          <div>
            {tasks.map((task) => (
              <div key={task.id}>
                <div>
                  <p>{task.description}</p>
                  <p>createdAt {task.createdAt.toLocaleString("de-DE")}</p>
                  <p>Status: {task.status === "open" ? "Open" : "Completed"}</p>
                </div>
                <div>
                  <button onClick={() => toggleTaskStatus(task.id)}>
                    {task.status === "open" ? "Done" : "Restore"}
                  </button>
                  <button onClick={() => deleteTask(task.id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>

          {tasks.length === 0 && <p>No tasks available. Please add a task.</p>}
        </div>
      </div>
    </>
  )
}

export default App

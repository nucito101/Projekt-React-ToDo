import React, { useEffect, useState } from "react"
import type { Task } from "./types"

function App() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [inputValue, setInputValue] = useState("")
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null)
  const [editingValue, setEditingValue] = useState("")
  const [, forcedUpdtate] = useState({}) // State to force re-render

  useEffect(() => {
    const interval = setInterval(() => {
      forcedUpdtate({})
    }, 1000)
    return () => clearInterval(interval)
  }, []) // Re-render every second

  const isTaskUrgent = (task: Task): boolean => {
    if (task.status === "completed") return false
    const now = new Date()
    const createdTime = task.createdAt.getTime()
    const oneMinute = 60 * 1000
    return now.getTime() - createdTime > oneMinute
  }

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

  const startEditing = (task: Task) => {
    setEditingTaskId(task.id)
    setEditingValue(task.description)
  }

  const saveEditing = (id: string) => {
    if (editingValue.trim() === "") return // Prevent saving empty descriptions
    setTasks(tasks.map((task) => (task.id === id ? { ...task, description: editingValue } : task)))
    setEditingTaskId(null)
    setEditingValue("")
  }

  const cancelEditing = () => {
    setEditingTaskId(null)
    setEditingValue("")
  }

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      addTask()
    }
  }

  const handleEditingKeyPress = (event: React.KeyboardEvent<HTMLInputElement>, id: string) => {
    if (event.key === "Enter") {
      saveEditing(id)
    } else if (event.key === "Escape") {
      cancelEditing()
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
                  <div>
                    {editingTaskId === task.id ? (
                      <div>
                        <input
                          type="text"
                          value={editingValue}
                          onChange={(e) => setEditingValue(e.target.value)}
                          onKeyDown={(e) => handleEditingKeyPress(e, task.id)}
                          aria-label="Edit Task"
                        />
                        <div>
                          <button onClick={() => saveEditing(task.id)}>Save</button>
                          <button onClick={cancelEditing}>Cancel</button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <p>{task.description}</p>
                        <p>createdAt {task.createdAt.toLocaleString("de-DE")}</p>
                        {task.status === "open" && isTaskUrgent(task) && <span>Urgent</span>}
                      </>
                    )}
                  </div>

                  {editingTaskId !== task.id && (
                    <div>
                      {task.status === "open" && <button onClick={() => startEditing(task)}>Edit</button>}

                      <button
                        onClick={() => {
                          toggleTaskStatus(task.id)
                        }}>
                        {task.status === "open" ? "Done" : "Restore"}
                      </button>

                      <button onClick={() => deleteTask(task.id)}>Delete</button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div>{tasks.length === 0 && <p>No tasks available. Please add a task.</p>}</div>
        </div>
      </div>
    </>
  )
}

export default App

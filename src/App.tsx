import React, { useEffect, useState } from "react"
import type { Task } from "./types"
import { TaskSummary } from "./components/TaskSummary"

function App() {
  const CATEGORIES: string[] = ["Work", "Personal", "Shopping", "Others"]
  const [tasks, setTasks] = useState<Task[]>([])
  const [inputValue, setInputValue] = useState("")
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null)
  const [editingValue, setEditingValue] = useState("")
  const [, forcedUpdtate] = useState({}) // State to force re-render
  const [selectedCategory, setSelectedCategory] = useState<string>(CATEGORIES[0])

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
      category: selectedCategory,
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

  const changeCategory = (taskId: string, newCategory: string) => {
    setTasks(tasks.map((task) => (task.id === taskId ? { ...task, category: newCategory } : task)))
  }

  const getTasksByCategory = () => {
    const grouped: { [key: string]: Task[] } = {}
    CATEGORIES.forEach((category) => {
      grouped[category] = tasks.filter((task) => task.category === category)
    })
    return grouped
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
    <div className="max-w-4xl mx-auto p-8">
      <div className="border-4 border-black p-8 bg-white">
        {/* Header */}
        <h1 className="text-5xl font-black uppercase tracking-tighter mb-8 border-4 border-black p-6 bg-black text-white">
          To-Do Liste
        </h1>

        {/* Input Section */}
        <div className="mb-12 border-4 border-black p-6 bg-white">
          <div className="flex gap-4 flex-wrap">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="add a task ..."
              aria-label="New Task"
              className="flex-1 min-w-[200px] text-lg p-4 border-4 border-black bg-white text-black placeholder:text-gray-500 placeholder:uppercase focus:bg-black focus:text-white transition-all"
            />
            <select
              value={selectedCategory}
              onChange={(event) => setSelectedCategory(event.target.value)}
              aria-label="Select Category"
              className="px-4 py-4 border-4 border-black bg-white text-black font-bold uppercase text-base cursor-pointer transition-all hover:bg-black hover:text-white">
              {CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            <button
              onClick={addTask}
              className="px-6 py-4 border-4 border-black bg-black text-white font-bold uppercase text-base whitespace-nowrap cursor-pointer transition-all hover:bg-white hover:text-black hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0_black] active:translate-x-0 active:translate-y-0 active:shadow-none">
              Add Task
            </button>
          </div>
        </div>

        {/* Task Summary */}
        <TaskSummary tasks={tasks} />

        {/* Categories */}
        {Object.entries(getTasksByCategory()).map(([category, categoryTasks]) => (
          <div key={category} className="mb-8">
            <h2 className="text-3xl font-black uppercase tracking-tight mb-4 border-4 border-black p-4 bg-white text-black flex items-center justify-between">
              <span>{category}</span>
              <span className="text-2xl px-4 py-2 bg-black text-white border-4 border-black">
                {categoryTasks.length}
              </span>
            </h2>

            {categoryTasks.length === 0 ? (
              <div className="border-4 border-dashed border-black p-8 text-center bg-white mb-4">
                <p className="text-lg uppercase text-gray-600">No tasks in this category.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {categoryTasks.map((task) => (
                  <div
                    key={task.id}
                    className={`border-4 border-black p-6 bg-white relative ${
                      task.status === "completed" ? "bg-gray-100 opacity-70" : ""
                    }`}>
                    <div className="mb-4">
                      {editingTaskId === task.id ? (
                        <div className="flex flex-col gap-4">
                          <input
                            type="text"
                            value={editingValue}
                            onChange={(e) => setEditingValue(e.target.value)}
                            onKeyDown={(e) => handleEditingKeyPress(e, task.id)}
                            aria-label="Edit Task"
                            autoFocus
                            className="w-full text-lg p-4 border-4 border-black bg-white text-black"
                          />
                          <div className="flex gap-4">
                            <button
                              onClick={() => saveEditing(task.id)}
                              className="px-6 py-4 border-4 border-black bg-black text-white font-bold uppercase text-base cursor-pointer transition-all hover:bg-white hover:text-black hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0_black] active:translate-x-0 active:translate-y-0 active:shadow-none">
                              Save
                            </button>
                            <button
                              onClick={cancelEditing}
                              className="px-6 py-4 border-4 border-black bg-white text-black font-bold uppercase text-base cursor-pointer transition-all hover:bg-black hover:text-white hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0_black] active:translate-x-0 active:translate-y-0 active:shadow-none">
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <p
                            className={`text-xl font-bold mb-2 break-words ${
                              task.status === "completed" ? "line-through" : ""
                            }`}>
                            {task.description}
                          </p>
                          <p className="text-sm text-gray-600 uppercase mb-2">
                            <span className="sr-only">Created at: </span>
                            {task.createdAt.toLocaleString("de-DE")}
                          </p>
                          {task.status === "open" && isTaskUrgent(task) && (
                            <span
                              className="inline-block bg-red-600 text-white px-4 py-1 border-4 border-red-600 text-sm font-black uppercase mt-2 animate-brutal-pulse"
                              role="status"
                              aria-live="polite">
                              Urgent
                            </span>
                          )}

                          {task.status === "open" && (
                            <div className="mt-4 flex items-center gap-3">
                              <label htmlFor={`category-${task.id}`} className="text-sm font-bold uppercase">
                                Category:
                              </label>
                              <select
                                id={`category-${task.id}`}
                                value={task.category}
                                onChange={(e) => changeCategory(task.id, e.target.value)}
                                aria-label={`Change category for task: ${task.description}`}
                                className="px-3 py-2 border-4 border-black bg-white text-black font-bold uppercase text-sm cursor-pointer transition-all hover:bg-black hover:text-white">
                                {CATEGORIES.map((cat) => (
                                  <option key={cat} value={cat}>
                                    {cat}
                                  </option>
                                ))}
                              </select>
                            </div>
                          )}
                        </>
                      )}
                    </div>

                    {editingTaskId !== task.id && (
                      <div className="flex gap-4 flex-wrap mt-6">
                        {task.status === "open" && (
                          <button
                            onClick={() => startEditing(task)}
                            aria-label={`Edit task: ${task.description}`}
                            className="px-6 py-4 border-4 border-black bg-white text-black font-bold uppercase text-base cursor-pointer transition-all hover:bg-black hover:text-white hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0_black] active:translate-x-0 active:translate-y-0 active:shadow-none">
                            Edit
                          </button>
                        )}

                        <button
                          onClick={() => toggleTaskStatus(task.id)}
                          aria-label={
                            task.status === "open"
                              ? `Mark task as completed: ${task.description}`
                              : `Restore task: ${task.description}`
                          }
                          className={`px-6 py-4 border-4 border-black font-bold uppercase text-base cursor-pointer transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0_black] active:translate-x-0 active:translate-y-0 active:shadow-none ${
                            task.status === "open"
                              ? "bg-black text-white hover:bg-white hover:text-black"
                              : "bg-white text-black hover:bg-black hover:text-white"
                          }`}>
                          {task.status === "open" ? "Done" : "Restore"}
                        </button>

                        <button
                          onClick={() => deleteTask(task.id)}
                          aria-label={`Delete task: ${task.description}`}
                          className="px-6 py-4 border-4 border-red-600 bg-red-600 text-white font-bold uppercase text-base cursor-pointer transition-all hover:bg-white hover:text-red-600 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0_red-600] active:translate-x-0 active:translate-y-0 active:shadow-none">
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default App

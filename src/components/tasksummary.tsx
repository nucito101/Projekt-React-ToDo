import type { Task } from "../types"

interface TaskSummaryProps {
  tasks: Task[]
}

export function TaskSummary({ tasks }: TaskSummaryProps) {
  const openTasks = tasks.filter((task) => task.status === "open").length
  const completedTasks = tasks.filter((task) => task.status === "completed").length

  return (
    <div>
      <h2>Tasks Summary</h2>
      <div>
        <div>
          <p>Open Tasks: {openTasks}</p>
        </div>
        <div>
          <p>Completed Tasks: {completedTasks}</p>
        </div>
      </div>
    </div>
  )
}

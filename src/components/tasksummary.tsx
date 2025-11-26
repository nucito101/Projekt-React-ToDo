import type { Task } from "../types"

interface TaskSummaryProps {
  tasks: Task[]
}

export function TaskSummary({ tasks }: TaskSummaryProps) {
  const openTasks = tasks.filter((task) => task.status === "open").length
  const completedTasks = tasks.filter((task) => task.status === "completed").length

  return (
    <div className="mb-12 border-4 border-black p-6 bg-black text-white">
      <h2 className="text-3xl font-black uppercase tracking-tight mb-6">Tasks Summary</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border-4 border-white p-6 bg-black">
          <p className="text-xl font-bold text-white">
            <span className="block mb-2 text-sm uppercase tracking-wider">Open Tasks</span>
            <span className="text-4xl font-black">{openTasks}</span>
          </p>
        </div>
        <div className="border-4 border-white p-6 bg-black">
          <p className="text-xl font-bold text-white">
            <span className="block mb-2 text-sm uppercase tracking-wider">Completed Tasks</span>
            <span className="text-4xl font-black">{completedTasks}</span>
          </p>
        </div>
      </div>
    </div>
  )
}

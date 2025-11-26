export type TasksStatus = "open" | "completed"

export interface Task {
  id: string
  description: string
  createdAt: Date
  status: TasksStatus
  category: string
}

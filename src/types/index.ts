export type Task = {
  id: string
  text: string
  completed: boolean
}

export type Column = {
  id: string
  title: string
  taskIds: string[]
}

export type AppState = {
  tasks: Record<string, Task>
  columns: Record<string, Column>
  columnOrder: string[]
}

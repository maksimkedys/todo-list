export type TaskType = {
  id: string
  text: string
  completed: boolean
}

export type ColumnType = {
  id: string
  title: string
  tasks: TaskType[]
}

export enum ButtonVariant {
  Primary = 'primary',
  Secondary = 'secondary',
  OutlineDashed = 'outline-dashed',
  GhostIcon = 'ghost-icon',
}

export enum IconName {
  Trash = 'trash',
  Plus = 'plus',
  Search = 'search',
  Edit = 'edit',
}

export enum InputVariant {
  Default = 'default',
  Search = 'search',
}

export enum TaskFilter {
  All = 'all',
  Incomplete = 'incomplete',
  Completed = 'completed',
}

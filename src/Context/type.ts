export enum Priority {
  High = "High",
  Medium = "Medium",
  Low = "Low",
}

export interface TodoItem {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: Priority;
  dueDate: string;
}

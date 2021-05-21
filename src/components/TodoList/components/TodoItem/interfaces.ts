export interface TodoItemProps {
  text: string;
  checked: boolean;
  onToggle: (todoItem: TodoItemProps) => void;
  onRemove: (todoItem: TodoItemProps) => void;
}

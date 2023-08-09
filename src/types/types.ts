export type TodoItem = {
  id: number;
  content: string;
  isCompleted: boolean;
  createdDateTime: string;
  updatedDateTime: string;
};

export type TodoList = {
  value: TodoItem[];
  count: number;
  offset: number;
  limit: number;
  total: number;
};

export type TodoProps = {
  item: TodoItem;
  checked: boolean;
  contentRef: React.RefObject<HTMLInputElement>;
  onDeleteTodoList?: (id: number) => void;
  onChangeMode?: () => void;
  onHandleChangeContent?: (id: number, content: string, checked: boolean) => void;
};

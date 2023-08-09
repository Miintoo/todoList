import { useState } from 'react';
import TodoItemComponent from './../components/todoItem/TodoItem';
import TodoItemModifyComponent from './../components/todoItemModify/TodoItemModify';
import { TodoItem } from '../App';

export type TodoProps = {
  item: TodoItem;
  onDeleteTodoList?: (id: number) => void;
  onChangeMode?: () => void;
  onHandleChangeContent?: (id: number, content: string, checked: boolean) => void;
};

export default function TodoListContainer({ item, onDeleteTodoList, onHandleChangeContent }: TodoProps) {
  const [modifyMode, setModifyMode] = useState<boolean>(true);

  const handleChangeMode = () => {
    setModifyMode(!modifyMode);
  };

  return modifyMode === false ? (
    <TodoItemModifyComponent
      item={item}
      onDeleteTodoList={onDeleteTodoList}
      onChangeMode={handleChangeMode}
      onHandleChangeContent={onHandleChangeContent}
    />
  ) : (
    <TodoItemComponent item={item} onDeleteTodoList={onDeleteTodoList} onChangeMode={handleChangeMode} />
  );
}

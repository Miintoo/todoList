import axios from 'axios';
import { TodoProps, TodoItem } from '../types/types';

const BASE_URL = 'http://localhost:8080/api/v1';

export async function postTodoItem(content: string) {
  try {
    const { data } = await axios.post(`${BASE_URL}/todos`, {
      content
    });
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function getTodoList() {
  try {
    const { data } = await axios.get(`${BASE_URL}/todos?offset=0&limit=50`);
    data.value.sort((a: TodoItem, b: TodoItem) => {
      const todoA = new Date(a.createdDateTime);
      const todoB = new Date(b.createdDateTime);
      if (todoA.getDate() > todoB.getDate()) {
        return todoB.getDate() - todoA.getDate();
      } else if (todoA.getDate() < todoB.getDate()) {
        return todoB.getDate() - todoA.getDate();
      } else {
        if (todoA.getTime() < todoB.getTime()) {
          return todoB.getTime() - todoA.getTime();
        } else {
          return todoA.getTime() - todoB.getTime();
        }
      }
    });

    return data.value;
  } catch (error) {
    console.log(error);
  }
}

export async function patchTodoItem({
  item,
  contentRef,
  checked,
  onChangeMode,
  onHandleChangeContent,
  onDeleteTodoList
}: TodoProps) {
  const todoValue = contentRef.current?.value;
  try {
    const { data } = await axios.patch(`/todos/${item.id}`, {
      content: todoValue,
      isCompleted: checked
    });

    onChangeMode?.();
    onHandleChangeContent?.(data.id, data.content, data.isCompleted);
  } catch (error) {
    alert('이미 삭제된 [할 일]입니다.');
    onDeleteTodoList?.(item.id);
  }
}

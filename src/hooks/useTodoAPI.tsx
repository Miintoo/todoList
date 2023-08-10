import axios, { AxiosError } from 'axios';
import { TodoProps, TodoItem } from '../types/types';
import { useNavigate } from 'react-router-dom';

const BASE_URL = 'http://localhost:8080/api/v1';

export function useTodoAPI() {
  const navigate = useNavigate();

  async function postTodoItem(content: string) {
    try {
      const { data } = await axios.post(`${BASE_URL}/todos`, {
        content
      });
      return data;
    } catch (error) {
      alert('서버에 문제가 발생했습니다.');
      navigate('/serverError');
    }
  }

  async function getTodoList() {
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
      navigate('/serverError');
    }
  }

  async function patchTodoItem({
    item,
    contentRef,
    checked,
    onChangeMode,
    onHandleChangeContent,
    onDeleteTodoList
  }: TodoProps) {
    const todoValue = contentRef?.current?.value;
    try {
      const { data } = await axios.patch(`${BASE_URL}/todos/${item.id}`, {
        content: todoValue,
        isCompleted: checked
      });

      onChangeMode?.();
      onHandleChangeContent?.(data.id, data.content, data.isCompleted);
    } catch (error) {
      const axiosError = error as AxiosError;

      if (axiosError.code === 'ERR_BAD_REQUEST') {
        alert('이미 삭제된 [할 일]입니다.');
        onDeleteTodoList?.(item.id);
      } else {
        alert('서버에 문제가 발생했습니다.');
        navigate('/serverError');
      }
    }
  }

  async function deleteTodoItem({ item, onDeleteTodoList }: TodoProps) {
    const isDeleted = confirm('할 일을 삭제하시겠습니까? \n삭제한 할 일은 복구할 수 없습니다.');
    if (isDeleted) {
      try {
        await axios.delete(`${BASE_URL}/todos/${item.id}`);
        onDeleteTodoList?.(item.id);
      } catch (error) {
        const axiosError = error as AxiosError;
        if (axiosError.code === 'ERR_BAD_REQUEST') {
          alert('이미 삭제된 [할 일]입니다.');
          onDeleteTodoList?.(item.id);
        } else {
          alert('서버에 문제가 발생했습니다.');
          navigate('/serverError');
        }
      }
    }
  }

  return {
    postTodoItem,
    getTodoList,
    patchTodoItem,
    deleteTodoItem
  };
}

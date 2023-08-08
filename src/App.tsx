import { useEffect, useRef, useState } from 'react';
import Button from '@mui/material/Button';
import { OutlinedInput } from '@mui/material';
import styles from './app.module.scss';
import TodoItem from './components/todoItem/TodoItem';
import instance from './api/instance';

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

export default function App() {
  const [todoList, setTodoList] = useState<TodoItem[]>([]);
  const contentRef = useRef();

  const getTodoList = async () => {
    try {
      const { data } = await instance.get('/todos?offset=0&limit=50');
      setTodoList(data.value);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTodoList();
  }, []);

  const handleAddTodoList = async () => {
    const todoValue = contentRef.current?.value;
    try {
      const { data } = await instance.post('/todos', {
        content: todoValue
      });

      setTodoList([...todoList, data]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>ToDoList</h1>
      <main className={styles.main}>
        <section className={styles.search}>
          <OutlinedInput
            inputRef={contentRef}
            className={styles.textField}
            type="text"
            placeholder="내용을 입력한 후, 오른쪽에 [할 일 추가]를 클릭해 주세요."
            inputProps={{ maxLength: 50 }}
          />
          <Button className={styles.addButton} variant="outlined" onClick={handleAddTodoList}>
            할 일 추가
          </Button>
        </section>
        <section className={styles.todoList}>
          {todoList.map((item) => (
            <TodoItem todoItem={item} />
          ))}
        </section>
      </main>
    </div>
  );
}

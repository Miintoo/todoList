import { useEffect, useRef, useState } from 'react';
import Button from '@mui/material/Button';
import { OutlinedInput } from '@mui/material';
import styles from './app.module.scss';
// import TodoItemComponent from './components/todoItem/TodoItem';
import instance from './api/instance';
import TodoListContainer from './container/TodoListContainer';

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
  const contentRef = useRef<HTMLInputElement>();

  const getTodoList = async () => {
    try {
      const { data } = await instance.get('/todos?offset=0&limit=50');
      data.value.sort((a: TodoItem, b: TodoItem) => {
        const todoA = new Date(a.createdDateTime);
        const todoB = new Date(b.createdDateTime);
        if (todoA.getDate() > todoB.getDate()) {
          return todoB.getDate() - todoA.getDate();
        } else if (todoA.getDate() < todoB.getDate()) {
          return todoB.getDate() - todoA.getDate();
        } else {
          if (todoA.getTime() > todoB.getTime()) {
            return todoB.getTime() - todoA.getTime();
          } else {
            return todoA.getTime() - todoB.getTime();
          }
        }
      });

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
    if (todoList.length >= 10) {
      alert('[할 일]은 최대 10개까지 등록할 수 있습니다.');
    } else if (!todoValue) {
      alert('내용을 입력해 주세요.');
      contentRef.current?.focus();
    } else {
      try {
        const { data } = await instance.post('/todos', {
          content: todoValue
        });

        setTodoList([...todoList, data]);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleDeleteTodoList = (id: number) => {
    const newTodoList = todoList.filter((item) => item.id !== id);
    setTodoList(newTodoList);
  };

  const handleChangeContent = (id: number, content: string, checked: boolean) => {
    const newTodoList = todoList.map((item) => {
      if (item.id === id) {
        return { ...item, content, isCompleted: checked };
      }
      return item;
    });
    setTodoList(newTodoList);
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
          {todoList.length !== 0 ? (
            todoList.map((item) => {
              return (
                <TodoListContainer
                  key={item.id}
                  item={item}
                  onDeleteTodoList={handleDeleteTodoList}
                  onHandleChangeContent={handleChangeContent}
                />
              );
            })
          ) : (
            <p className={styles.emptyList}>등록된 [할 일]이 없습니다.</p>
          )}
        </section>
      </main>
    </div>
  );
}

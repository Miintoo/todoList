import Button from '@mui/material/Button';
import { OutlinedInput } from '@mui/material';
import styles from './app.module.scss';
import TodoItem from './components/todoItem/TodoItem';

function App() {

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>ToDoList</h1>
      <main className={styles.main}>
        <section className={styles.search}>
          <OutlinedInput className={styles.textField} type="text" placeholder="내용을 입력한 후, 오른쪽에 [할 일 추가]를 클릭해 주세요." inputProps={{maxLength: 50}}/>
          <Button className={styles.addButton} variant="outlined">할 일 추가</Button>
        </section>
        <section className={styles.todoList}>
          <TodoItem />
          <TodoItem />
          <TodoItem />
        </section>
      </main>
    </div>
  )
}

export default App

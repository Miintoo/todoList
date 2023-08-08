import Checkbox from '@mui/material/Checkbox';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import styles from './todoItem.module.scss';
import instance from '../../api/instance';
import { useState } from 'react';
import { TodoProps } from '../../container/TodoListContainer';

export default function TodoItemComponent({ item, onDeleteTodoList, onChangeMode }: TodoProps) {
  const [checked, setChecked] = useState(item.isCompleted);
  const handleDeleteTodoItem = async () => {
    const isDeleted = confirm('할 일을 삭제하시겠습니까? \n삭제한 할 일은 복구할 수 없습니다.');
    if (isDeleted) {
      try {
        await instance.delete(`/todos/${item.id}`);
        onDeleteTodoList?.(item.id);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleChangeMode = () => {
    onChangeMode?.();
  };

  const handleCheckboxChange = () => {
    setChecked(!checked);
  };

  return (
    <article className={styles.container}>
      <Checkbox checked={checked} onChange={handleCheckboxChange} />
      <Typography
        component="span"
        sx={{ textDecoration: checked ? 'line-through' : 'none' }}
        className={styles.content}
      >
        {item.content}
      </Typography>
      <Button className={styles.changeButton} variant="outlined" onClick={handleChangeMode}>
        수정
      </Button>
      <Button className={styles.deleteButton} variant="outlined" onClick={handleDeleteTodoItem}>
        삭제
      </Button>
    </article>
  );
}

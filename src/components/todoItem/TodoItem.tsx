import { useState } from 'react';
import { TodoProps } from '../../types/types';
import { deleteTodoItem } from '../../api/api';
import Checkbox from '@mui/material/Checkbox';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import styles from './todoItem.module.scss';

export default function TodoItemComponent({ item, onDeleteTodoList, onChangeMode }: TodoProps) {
  const [checked, setChecked] = useState(item.isCompleted);
  const handleDeleteTodoItem = async () => {
    deleteTodoItem({ item, onDeleteTodoList });
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

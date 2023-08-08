import { useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import { OutlinedInput } from '@mui/material';
import Button from '@mui/material/Button';
import styles from './todoItemModify.module.scss';
// import instance from '../../api/instance';
import { TodoProps } from '../../container/TodoListContainer';

export default function TodoItemModifyComponent({ item, onChangeMode }: TodoProps) {
  const [checked, setChecked] = useState(false);

  const handleCheckboxChange = () => {
    setChecked(!checked);
  };

  const handleChangeMode = () => {
    onChangeMode?.();
  };

  return (
    <article className={styles.container}>
      <Checkbox checked={checked} onChange={handleCheckboxChange} />
      <OutlinedInput className={styles.textField} value={item.content} />
      <Button className={styles.changeButton} variant="outlined">
        저장
      </Button>
      <Button className={styles.deleteButton} variant="outlined" onClick={handleChangeMode}>
        취소
      </Button>
    </article>
  );
}

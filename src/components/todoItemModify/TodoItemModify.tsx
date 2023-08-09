import { useState, useRef } from 'react';
import Checkbox from '@mui/material/Checkbox';
import { OutlinedInput } from '@mui/material';
import Button from '@mui/material/Button';
import styles from './todoItemModify.module.scss';
import { TodoProps } from '../../types/types';
import { patchTodoItem } from '../../api/api';

export default function TodoItemModifyComponent({
  item,
  onChangeMode,
  onDeleteTodoList,
  onHandleChangeContent
}: TodoProps) {
  const [checked, setChecked] = useState(item.isCompleted);
  const contentRef = useRef<HTMLInputElement>(null);

  const handleCheckboxChange = () => {
    setChecked(!checked);
  };

  const handleSaveContent = () => {
    patchTodoItem({ item, contentRef, checked, onChangeMode, onHandleChangeContent, onDeleteTodoList });
  };

  const handleChangeMode = () => {
    onChangeMode?.();
  };

  return (
    <article className={styles.container}>
      <Checkbox checked={checked} onChange={handleCheckboxChange} />
      <OutlinedInput
        inputRef={contentRef}
        className={styles.textField}
        defaultValue={item.content}
        type="text"
        inputProps={{ maxLength: 50 }}
      />
      <Button className={styles.changeButton} variant="outlined" onClick={handleSaveContent}>
        저장
      </Button>
      <Button className={styles.deleteButton} variant="outlined" onClick={handleChangeMode}>
        취소
      </Button>
    </article>
  );
}

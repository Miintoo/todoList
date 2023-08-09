import { useState, useRef } from 'react';
import Checkbox from '@mui/material/Checkbox';
import { OutlinedInput } from '@mui/material';
import Button from '@mui/material/Button';
import styles from './todoItemModify.module.scss';
// import instance from '../../api/instance';
import { TodoProps } from '../../container/TodoListContainer';
import instance from '../../api/instance';

export default function TodoItemModifyComponent({
  item,
  onChangeMode,
  onDeleteTodoList,
  onHandleChangeContent
}: TodoProps) {
  const [checked, setChecked] = useState(item.isCompleted);
  const contentRef = useRef<HTMLInputElement>();

  const handleCheckboxChange = () => {
    setChecked(!checked);
  };

  const handleSaveContent = async () => {
    const todoValue = contentRef.current?.value;

    try {
      const { data } = await instance.patch(`/todos/${item.id}`, {
        content: todoValue,
        isCompleted: checked
      });

      onChangeMode?.();
      onHandleChangeContent?.(data.id, data.content, data.isCompleted);
    } catch (error) {
      alert('이미 삭제된 [할 일]입니다.');
      onDeleteTodoList?.(item.id);
    }
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

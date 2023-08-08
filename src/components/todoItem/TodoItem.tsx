import Checkbox from '@mui/material/Checkbox';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import styles from './todoItem.module.scss';

export type Props = {
  todoItem: {
    content: string;
  };
};

export default function TodoItem({ todoItem }: Props) {
  return (
    <article className={styles.container}>
      <Checkbox />
      <Typography className={styles.content}>{todoItem.content}</Typography>
      <Button className={styles.changeButton} variant="outlined">
        수정
      </Button>
      <Button className={styles.deleteButton} variant="outlined">
        삭제
      </Button>
    </article>
  );
}

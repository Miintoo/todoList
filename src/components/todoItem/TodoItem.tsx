import Checkbox from '@mui/material/Checkbox';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import styles from './todoItem.module.scss';

export default function TodoItem() {
  
  return <article className={styles.container}>
    <Checkbox />
    <Typography className={styles.content}>여기 할일이 표기됩니다.1111111111111111111111</Typography>
    <Button className={styles.changeButton} variant="outlined">수정</Button>
    <Button className={styles.deleteButton} variant="outlined">삭제</Button>
  </article>;

}
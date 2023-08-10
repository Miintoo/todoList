import ServerError from '../../assets/images/serverError.png';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import styles from './serverErrorPage.module.scss';

export default function ServerErrorPage() {
  const history = useNavigate();
  const handleClickRetry = () => {
    history('/');
  };

  return (
    <div className={styles.container}>
      <img src={ServerError} alt="" />
      <h4>오우 이런!</h4>
      <p>찾고 있는 리소스에 문제가 있어 표시할 수 없습니다.</p>
      <p>사용자의 잘못이 아니라 걱정하지마세요!</p>
      <Button className={styles.retryBtn} variant="outlined" onClick={handleClickRetry}>
        다시 시도
      </Button>
    </div>
  );
}

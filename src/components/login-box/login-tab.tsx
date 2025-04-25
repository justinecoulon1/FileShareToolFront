import styles from './auth-tabs.module.css';
import { useState } from 'react';
import userService from '../../utils/api/services/user.service';
import { setLocalStorageItem } from '../../utils/local-storage/local-storage.utils';
import { useNavigate } from '@tanstack/react-router';

export function LoginTab() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const login = async () => {
    const loginResponse = await userService.login(email, password);
    setLocalStorageItem('user', loginResponse.user);
    setLocalStorageItem('accessToken', loginResponse.accessToken);
    await navigate({ to: '/' });
  };

  return (
    <form className={styles.form}>
      <div className={styles.loginFormInputsDiv}>
        <div className={styles.loginFormInputDiv}>
          <label htmlFor={'email'}>Email</label>
          <input
            placeholder={'Your email'}
            type={'text'}
            name={'email'}
            id={'email'}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className={styles.loginFormInputDiv}>
          <label htmlFor={'password'}>Password</label>
          <input
            placeholder={'Your password'}
            type={'password'}
            name={'password'}
            id={'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>

      <input
        type="submit"
        className={styles.submitLoginButton}
        onClick={(e) => {
          e.preventDefault();
          login();
        }}
        value={'LOGIN'}
      />
    </form>
  );
}

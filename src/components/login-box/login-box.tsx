import styles from './login-box.module.css';
import classNames from 'classnames';
import { useState } from 'react';
import { LoginTab } from './login-tab';
import { RegisterTab } from './register-tab';

export enum LightboxTabs {
  LOGIN = 'LOGIN',
  REGISTER = 'REGISTER',
}

export default function LoginBox() {
  const [loginTab, setLoginTab] = useState(LightboxTabs.LOGIN);
  return (
    <div className={classNames(styles.lightboxContainer)} onMouseDown={(e) => e.stopPropagation()}>
      <div className={styles.titleDiv}>
        <div
          className={classNames(styles.loginTab, styles.loginButtons, {
            [styles.selected]: loginTab === LightboxTabs.LOGIN,
          })}
          onClick={() => setLoginTab(LightboxTabs.LOGIN)}
        >
          Login
        </div>
        <div
          className={classNames(styles.registerTab, styles.loginButtons, {
            [styles.selected]: loginTab === LightboxTabs.REGISTER,
          })}
          onClick={() => setLoginTab(LightboxTabs.REGISTER)}
        >
          Register
        </div>
      </div>
      {loginTab === LightboxTabs.LOGIN && <LoginTab />}
      {loginTab === LightboxTabs.REGISTER && (
        <RegisterTab onRegisterSuccessful={() => setLoginTab(LightboxTabs.LOGIN)} />
      )}
    </div>
  );
}

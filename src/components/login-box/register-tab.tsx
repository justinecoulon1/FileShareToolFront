import styles from './auth-tabs.module.css';
import React, {useState} from 'react';
import {useNavigate} from "@tanstack/react-router";
import userService from "../../utils/api/services/user.service";


export function RegisterTab() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const navigate = useNavigate()

    const register = async () => {
        const registerResponse = await userService.register(name, email, password);

        await navigate({to: "/"})
    };
    return (
        <form className={styles.form}>
            <div className={styles.loginFormInputsDiv}>
                <div className={styles.loginFormInputDiv}>
                    <label htmlFor={'name'}>Name</label>
                    <input
                        type={'text'}
                        name={'name'}
                        id={"name"}
                        placeholder={"Your pseudonym"}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className={styles.loginFormInputDiv}>
                    <label htmlFor={'email'}>Email</label>
                    <input
                        type={'text'}
                        name={'email'}
                        id={"email"}
                        placeholder={"Your email"}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>


                <div className={styles.loginFormInputDiv}>
                    <label htmlFor={'email'}>Password</label>
                    <input
                        type={'password'}
                        name={'password'}
                        id={"password"}
                        placeholder={"Your password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>


                <div className={styles.loginFormInputDiv}>
                    <label htmlFor={'confirm-password'}>Confirm password</label>
                    <input
                        type={'password'}
                        name={'confirm-password'}
                        placeholder={"Confirm your password"}
                        id={"confirm-password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
            </div>

            <input type="submit" className={styles.submitLoginButton}
                   onClick={(e) => {
                       e.preventDefault();
                       register();
                   }} value={"REGISTER"}/>
        </form>
    );
}

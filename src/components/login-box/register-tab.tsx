import styles from './auth-tabs.module.css';
import React, {useActionState} from 'react';
import {RegisterStateForm} from "./auth-form-states";


export function RegisterTab({
                                onRegisterSuccessful = () => {
                                }
                            }: { onRegisterSuccessful?: () => void }) {

    const handleSend = async (state: RegisterStateForm, data: FormData): Promise<RegisterStateForm> => {
        // const registerResult = await register(state, data);
        // if (registerResult.error) {
        //     return registerResult;
        // }

        onRegisterSuccessful();
        return {};
    };

    const [formState, formAction, isPending] = useActionState(handleSend, {});

    return (
        <form action={formAction} className={styles.form}>
            <div className={styles.loginFormInputsDiv}>
                <div className={styles.loginFormInputDiv}>
                    <label htmlFor={'name'}>Email</label>
                    <input
                        type={'text'}
                        name={'name'}
                        id={"name"}
                        defaultValue={formState.name}
                    />
                </div>

                <div className={styles.loginFormInputDiv}>
                    <label htmlFor={'email'}>Email</label>
                    <input
                        type={'text'}
                        name={'email'}
                        id={"email"}
                        defaultValue={formState.email}
                    />
                </div>


                <div className={styles.loginFormInputDiv}>
                    <label htmlFor={'email'}>Password</label>
                    <input
                        type={'password'}
                        name={'password'}
                        id={"password"}
                        defaultValue={formState.password}
                    />
                </div>


                <div className={styles.loginFormInputDiv}>
                    <label htmlFor={'confirm-password'}>Confirm Password</label>
                    <input
                        type={'password'}
                        name={'confirm-password'}
                        id={"confirm-password"}
                        defaultValue={formState.confirmPassword}
                    />
                </div>
            </div>

            <button type="submit" disabled={isPending} className={styles.submitLoginButton}>
                {isPending ? 'Submitting' : 'Submit'}
            </button>
        </form>
    );
}

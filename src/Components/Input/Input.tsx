import React from 'react';
import styles from './Input.module.css';

type InputProps = {
  label?: string;
  error?: string;
  name?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input = ({ label, error, name, type, ...rest }: InputProps) => {
  return (
    <div className={styles.wrapper}>
      <label className={styles.label} htmlFor={name}>
        {label}
      </label>
      <input id={name} {...rest} className={styles.input} />
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default Input;

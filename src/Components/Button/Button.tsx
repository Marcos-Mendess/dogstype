import styles from './Button.module.css';

type Buttonprops = React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<Buttonprops> = ({ children, ...props }) => {
  return (
    <button className={styles.button} {...props}>
      {children}
    </button>
  );
};

export default Button;

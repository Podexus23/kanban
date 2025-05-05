import styles from "./Button.module.css";

const Button = ({ name, size, onClick, title = "" }) => {
  return (
    <button
      title={title}
      onClick={onClick}
      className={`${styles[size]} ${styles.button}`}
    >
      {name}
    </button>
  );
};

export default Button;

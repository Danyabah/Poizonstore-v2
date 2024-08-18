import { useState } from "react";
import styles from "./BasicCheckbox.module.scss";

export default function BasicCheckbox({ label, onChange, disabled }) {
  const [checked, setChecked] = useState(false);

  function handleChange() {
    setChecked((prev) => !prev);
    onChange(!checked);
  }

  return (
    <button
      type="button"
      className={
        checked
          ? styles.checkbox + " " + styles.checkboxActive
          : styles.checkbox
      }
      onClick={handleChange}
      disabled={disabled}
    >
      <div className={styles.checkboxIcon}>
        <svg
          width="14"
          height="11"
          viewBox="0 0 14 11"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M1.28558 4.66054L0 6.19263L5.36231 10.6921L13.0758 1.49961L11.5437 0.214032L5.1158 7.87448L1.28558 4.66054Z"
            fill="white"
          />
        </svg>
      </div>
      <span className={styles.checkboxText}>{label}</span>
    </button>
  );
}

import styles from "./LoginPage.module.scss";
import logo from "../../../assets/logo.svg";
import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <img className={styles.logo} src={logo} alt="" />
        <div className={styles.menu}>
          <h2 className={styles.md}>Авторизуйтесь</h2>
          <Link className="link" to={"/login/user"}>
            Покупатель
          </Link>
          <Link className="link" to={"/login/worker"}>
            Сотрудник
          </Link>
          <Link className="link" to={"/login/calculate"}>
            Рассчитать стоимость
          </Link>
        </div>
      </div>
    </div>
  );
}

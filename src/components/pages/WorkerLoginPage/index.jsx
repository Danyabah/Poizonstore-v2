import styles from "./WorkerLoginPage.module.scss";
import logo from "../../../assets/logo.svg";
import { Link } from "react-router-dom";
import { Field, Form, Formik } from "formik";
import BasicCheckbox from "../../ui/BasicCheckbox/BasicCheckbox";
import { useState } from "react";

export default function WorkerLoginPage() {
  const [visible, setVisible] = useState(false);

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <img className={styles.logo} src={logo} alt="" />
        <Formik>
          {() => {
            return (
              <Form>
                <div className={styles.menu}>
                  <h2 className={styles.md}>Авторизуйтесь</h2>
                  <Field type="text" placeholder="Логин" />
                  <div className={styles.password}>
                    <Field
                      type={visible ? "password" : "text"}
                      placeholder="Пароль"
                    />
                    <svg
                      className={
                        visible
                          ? styles.line
                          : styles.line + " " + styles.lineHide
                      }
                      width="24"
                      height="23"
                      viewBox="0 0 24 23"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M22.182 0.999878L1.34863 21.9999"
                        stroke="#888888"
                        strokeWidth="1.84694"
                        strokeLinecap="round"
                      />
                    </svg>
                    <svg
                      onClick={() => setVisible((prev) => !prev)}
                      className={styles.eye}
                      width="25"
                      height="17"
                      viewBox="0 0 25 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M24.2266 11.3749H24.2318H24.2214H24.2266ZM23.4922 10.8289C23.5964 11.1628 23.8964 11.3728 24.2266 11.3749C24.2995 11.3749 24.3797 11.3539 24.461 11.3329C24.8672 11.2069 25.0964 10.7554 24.961 10.3459C24.9297 10.2514 21.8047 0.874878 12.5005 0.874878C3.19632 0.874878 0.0702697 10.2514 0.0390196 10.3459C-0.0963975 10.7554 0.13277 11.1964 0.539021 11.3329C0.955689 11.4694 1.39319 11.2384 1.52861 10.8289L1.53173 10.8236C1.67028 10.4141 4.38278 2.44988 12.5109 2.44988C20.6797 2.44988 23.3776 10.4824 23.4922 10.8289ZM8.85467 11.3749C8.85467 10.4002 9.23879 9.46546 9.92252 8.77626C10.6062 8.08706 11.5336 7.69988 12.5005 7.69988C13.4675 7.69988 14.3948 8.08706 15.0785 8.77626C15.7623 9.46546 16.1464 10.4002 16.1464 11.3749C16.1464 12.3495 15.7623 13.2843 15.0785 13.9735C14.3948 14.6627 13.4675 15.0499 12.5005 15.0499C11.5336 15.0499 10.6062 14.6627 9.92252 13.9735C9.23879 13.2843 8.85467 12.3495 8.85467 11.3749ZM12.5005 6.12488C11.1192 6.12488 9.79442 6.678 8.81766 7.66257C7.8409 8.64713 7.29217 9.98249 7.29217 11.3749C7.29217 12.7673 7.8409 14.1026 8.81766 15.0872C9.79442 16.0718 11.1192 16.6249 12.5005 16.6249C13.8819 16.6249 15.2066 16.0718 16.1834 15.0872C17.1601 14.1026 17.7089 12.7673 17.7089 11.3749C17.7089 9.98249 17.1601 8.64713 16.1834 7.66257C15.2066 6.678 13.8819 6.12488 12.5005 6.12488Z"
                        fill="#848483"
                      />
                    </svg>
                  </div>

                  <BasicCheckbox label={"Запомнить меня"} />
                  <button type="submit" className="link">
                    Войти
                  </button>
                  <Link className={"link-under " + styles.link}>
                    Не помню пароль
                  </Link>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
}

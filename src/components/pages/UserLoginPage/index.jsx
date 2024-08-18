import styles from "./UserLoginPage.module.scss";
import logo from "../../../assets/logo.svg";
import tgWhite from "../../../assets/tg-white.svg";
import tgBlack from "../../../assets/tg-black.svg";
import shop from "../../../assets/shop-icon.svg";
import vk from "../../../assets/vk-icon.svg";
import inst from "../../../assets/inst-icon.svg";
// import svgOk from "../../../assets/svg-ok.svg";
import svgError from "../../../assets/svg-error.svg";

import { Link, useNavigate } from "react-router-dom";
import { ErrorMessage, Field, Form, Formik } from "formik";
import BasicCheckbox from "../../ui/BasicCheckbox/BasicCheckbox";
import { useState } from "react";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import {
  getMe,
  handleLogin,
  handleRegister,
  handleTgLogin,
} from "../../../redux/slices/userReducer";
import { setAccessToken } from "../../../axiosinstance";
import { LoginButton } from "@telegram-auth/react";

export default function UserLoginPage() {
  const [visible, setVisible] = useState(true);
  const [firstVisible, setFirstVisible] = useState(true);
  const [secondVisible, setSecondVisible] = useState(true);

  const [login, setLogin] = useState(false);
  const [register, setRegister] = useState(false);

  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const initialLoginValues = {
    email_or_phone: "",
    password: "",
  };

  const initialRegisterValues = {
    email: "",
    password: "",
    repeatEmail: "",
    repeatPassword: "",
  };

  function equalTo(ref, msg) {
    return this.test({
      name: "equalTo",
      exclusive: false,
      message: msg || "Поля должны совпадать",
      params: {
        reference: ref.path,
      },
      test: function (value) {
        return value === this.resolve(ref);
      },
    });
  }

  Yup.addMethod(Yup.string, "equalTo", equalTo);

  const validationLoginSchema = Yup.object().shape({
    email_or_phone: Yup.string().required("Необходимо указать логин"),

    password: Yup.string()
      .required("Необходимо указать пароль")
      .min(6, "Пароль слишком короткий"),
  });

  const validationRegisterSchema = Yup.object().shape({
    email: Yup.string()
      .email("Необходимо указать почту")
      .required("Необходимо указать почту"),
    repeatEmail: Yup.string().equalTo(Yup.ref("email")),
    password: Yup.string()
      .required("Необходимо указать пароль")
      .min(6, "Пароль слишком короткий"),
    repeatPassword: Yup.string().equalTo(Yup.ref("password")),
  });

  function handleLoginSubmit(values) {
    dispatch(handleLogin(values)).then((data) => {
      if (data.error) {
        alert.error("Проверьте введенный логин/пароль");
        return;
      }
      setAccessToken(data.payload.data.auth_token);
      dispatch(getMe()).then(() => {
        navigate("/user", { replace: true });
      });
    });
  }

  function handleLoginTgSubmit(values) {
    dispatch(handleTgLogin(values)).then((data) => {
      if (data.error) {
        alert.error("Проверьте введенный логин/пароль");
        return;
      }
      setAccessToken(data.payload.data.auth_token);
      dispatch(getMe()).then(() => {
        navigate("/user", { replace: true });
      });
    });
  }

  function handleRegisterSubmit(values) {
    dispatch(
      handleRegister({ password: values.password, email: values.email })
    ).then((data) => {
      if (data.payload?.response?.status === 400) {
        alert.error(data.payload.response.data.password);
        return;
      } else {
        alert.success("Вы успешно Зарегестроировались!");
        setRegister(false);
        setLogin(true);
      }
    });
  }

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <img className={styles.logo} src={logo} alt="" />
        {!login && !register && (
          <div className={styles.menu}>
            <h2 className={styles.md}>Авторизация</h2>
            {/* TODO Проверить */}
            <LoginButton
              botUsername={"dolphin_go_bot"}
              onAuthCallback={(data) => {
                console.log(data);
                // call your backend here to validate the data and sign in the user
                handleLoginTgSubmit(data);
              }}
              buttonSize="large" // "large" | "medium" | "small"
              cornerRadius={5} // 0 - 20
              showAvatar={false} // true | false
              lang="en"
            />
            {/* <button className="link">
              <img src={tgWhite} alt="" />
              <span>Телеграм</span>
            </button> */}
            <button
              onClick={() => setLogin(true)}
              className={"link " + styles.linkWhite}
            >
              <span>Почта/Телефон</span>
            </button>
          </div>
        )}
        <div className={styles.register}>
          {!login && !register && (
            <div className={styles.menu}>
              <h2 className={styles.md}>Регистрация</h2>
              <button onClick={() => setRegister(true)} className="link">
                <img src={tgWhite} alt="" />
                <span>Телеграм</span>
              </button>
            </div>
          )}

          {login && (
            <Formik
              initialValues={initialLoginValues}
              validationSchema={validationLoginSchema}
              onSubmit={handleLoginSubmit}
            >
              {() => {
                return (
                  <Form>
                    <div className={styles.menu}>
                      <h2 className={styles.md}>Авторизация</h2>
                      <Field
                        name="email_or_phone"
                        type="text"
                        placeholder="Электронная почта / Телефон"
                      />
                      <ErrorMessage name="email_or_phone">
                        {(msg) => (
                          <div className={styles.errors}>
                            <div className={styles.error}>
                              <img src={svgError} alt="" />
                              <span>{msg}</span>
                            </div>
                          </div>
                        )}
                      </ErrorMessage>
                      <div className={styles.password}>
                        <Field
                          name="password"
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
                      <ErrorMessage name="password">
                        {(msg) => (
                          <div className={styles.errors}>
                            <div className={styles.error}>
                              <img src={svgError} alt="" />
                              <span>{msg}</span>
                            </div>
                          </div>
                        )}
                      </ErrorMessage>

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
          )}
          {register && (
            <Formik
              initialValues={initialRegisterValues}
              validationSchema={validationRegisterSchema}
              onSubmit={handleRegisterSubmit}
            >
              {() => {
                return (
                  <Form>
                    <div className={styles.menu}>
                      <h2 className={styles.mdregister}>
                        заполните личные данные
                      </h2>
                      <Field
                        type="text"
                        placeholder="Электронная почта"
                        name="email"
                      />
                      <Field
                        className={styles.email}
                        type="text"
                        name="repeatEmail"
                        placeholder="Повторите электронную почту"
                      />
                      <ErrorMessage name="email">
                        {(msg) => (
                          <div className={styles.errors}>
                            <div className={styles.error}>
                              <img src={svgError} alt="" />
                              <span>{msg}</span>
                            </div>
                          </div>
                        )}
                      </ErrorMessage>
                      <ErrorMessage name="email">
                        {(msg) => (
                          <div className={styles.errors}>
                            <div className={styles.error}>
                              <img src={svgError} alt="" />
                              <span>{msg}</span>
                            </div>
                          </div>
                        )}
                      </ErrorMessage>
                      <ErrorMessage name="repeatEmail">
                        {(msg) => (
                          <div className={styles.errors}>
                            <div className={styles.error}>
                              <img src={svgError} alt="" />
                              <span>{msg}</span>
                            </div>
                          </div>
                        )}
                      </ErrorMessage>
                      <div className={styles.password}>
                        <Field
                          type={firstVisible ? "password" : "text"}
                          placeholder="Пароль"
                          name="password"
                        />
                        <svg
                          className={
                            firstVisible
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
                          onClick={() => setFirstVisible((prev) => !prev)}
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

                      <div className={styles.password}>
                        <Field
                          type={secondVisible ? "password" : "text"}
                          placeholder="Повторите пароль"
                          name="repeatPassword"
                        />
                        <svg
                          className={
                            secondVisible
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
                          onClick={() => setSecondVisible((prev) => !prev)}
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
                      <ErrorMessage name="password">
                        {(msg) => (
                          <div className={styles.errors}>
                            <div className={styles.error}>
                              <img src={svgError} alt="" />
                              <span>{msg}</span>
                            </div>
                          </div>
                        )}
                      </ErrorMessage>
                      <ErrorMessage name="repeatPassword">
                        {(msg) => (
                          <div className={styles.errors}>
                            <div className={styles.error}>
                              <img src={svgError} alt="" />
                              <span>{msg}</span>
                            </div>
                          </div>
                        )}
                      </ErrorMessage>
                      {/* <div className={styles.errors}>
                        <div className={styles.error + " " + styles.ok}>
                          <img src={svgOk} alt="" />
                          <span>Не меньше 8 символов</span>
                        </div>
                        
                      </div> */}
                      <button type="submit" className={"link"}>
                        Сохранить
                      </button>
                      <button
                        type="button"
                        className={"link " + styles.linkWhite}
                        onClick={() => setRegister(false)}
                      >
                        Закрыть
                      </button>
                    </div>
                  </Form>
                );
              }}
            </Formik>
          )}
          <div className={styles.btns}>
            <a
              className="link-icon"
              href="https://poizon-store.ru/"
              target="_blank"
            >
              <img src={shop} alt="" />
            </a>
            <a
              className="link-icon"
              href="https://t.me/poizoning"
              target="_blank"
            >
              <img src={tgBlack} alt="" />
            </a>
            <a
              className="link-icon"
              href="https://instagram.com/poizondewu?igshid=YmMyMTA2M2Y="
              target="_blank"
            >
              <img src={inst} alt="" />
            </a>
            <a
              className="link-icon"
              href="https://vk.com/poizoning"
              target="_blank"
            >
              <img src={vk} alt="" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

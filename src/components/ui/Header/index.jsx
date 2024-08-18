import styles from "./Header.module.scss";
import headerLogo from "../../../assets/logo-header.svg";
import headerUser from "../../../assets/header-user.svg";
import arrowDown from "../../../assets/arrow-down.svg";
import notification from "../../../assets/notification.svg";
import lcIcon from "../../../assets/lc-icon.svg";
import exitIcon from "../../../assets/exit-icon.svg";

import { getSettings } from "../../../redux/slices/settingsReducer";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Header() {
  const dispatch = useDispatch();

  const { settingsInfo } = useSelector((state) => state.settings);

  const [comboOpen, setComboOpen] = useState({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
  });

  useEffect(() => {
    dispatch(getSettings());
  }, []);

  function handleOpen(num) {
    setComboOpen((prev) => ({ ...prev, [num]: !prev[num] }));
  }

  return (
    <header className={styles.root}>
      <div className="container">
        <div className={styles.headerRow}>
          <div className={styles.logo}>
            <img src={headerLogo} alt="" />
          </div>
          <div className={styles.right}>
            <div className={styles.curs}>¥: {settingsInfo?.yuan_rate} ₽</div>
            <div className={styles.userInfo}>
              <div className="block">
                <img src={headerUser} alt="" />
              </div>
              <div className={styles.userText}>
                <p className="text-bold">Савочкин Илья Сергеевич</p>
                <p className="text-gray">bratche12416@gmail.com</p>
              </div>
              <img
                src={arrowDown}
                className={styles.down}
                alt=""
                onClick={() => handleOpen(1)}
              />
              <div
                className={
                  comboOpen[1]
                    ? styles.comboBody + " " + styles.comboBodyOpen
                    : styles.comboBody
                }
              >
                <div
                  onClick={() => {
                    handleOpen(1);
                  }}
                  className={styles.comboItem}
                >
                  <img src={lcIcon} alt="" />
                  <span>Личный кабинет</span>
                </div>
                <div
                  onClick={() => {
                    handleOpen(1);
                  }}
                  className={styles.comboItem}
                >
                  <img src={exitIcon} alt="" />
                  <span>Выход</span>
                </div>
              </div>
            </div>
            <div className={styles.not}>
              <div className={styles.notCount}>10</div>
              <div className="block">
                <img src={notification} alt="" />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.headerMenu}>
          <div className={styles.menuItem}>
            <p className="text-bold">Список заказов</p>
            <img
              src={arrowDown}
              className={styles.down}
              alt=""
              onClick={() => handleOpen(2)}
            />

            <div
              className={
                comboOpen[2]
                  ? styles.comboBody + " " + styles.comboBodyOpenBig
                  : styles.comboBody
              }
            >
              <div
                onClick={() => {
                  handleOpen(2);
                }}
                className={styles.comboItem}
              >
                <span>Заявки</span>
              </div>
              <div
                onClick={() => {
                  handleOpen(2);
                }}
                className={styles.comboItem}
              >
                <span>Заказы</span>
              </div>
              <div
                onClick={() => {
                  handleOpen(2);
                }}
                className={styles.comboItem}
              >
                <span>Черновики</span>
              </div>
            </div>
          </div>
          <div className={styles.menuItem}>
            <p className="text-bold">Склад</p>
            <img
              src={arrowDown}
              className={styles.down}
              alt=""
              onClick={() => handleOpen(3)}
            />
            <div
              className={
                comboOpen[3]
                  ? styles.comboBody + " " + styles.comboBodyOpen
                  : styles.comboBody
              }
            >
              <div
                onClick={() => {
                  handleOpen(3);
                }}
                className={styles.comboItem}
              >
                <span>Система склада</span>
              </div>
              <div
                onClick={() => {
                  handleOpen(3);
                }}
                className={styles.comboItem}
              >
                <span>Адрес склада</span>
              </div>
            </div>
          </div>
          <div className={styles.menuItem}>
            <p className="text-bold">Сканирование</p>
          </div>
          <div className={styles.menuItem}>
            <p className="text-bold">Клиенты</p>
            <img
              src={arrowDown}
              className={styles.down}
              alt=""
              onClick={() => handleOpen(4)}
            />
            <div
              className={
                comboOpen[4]
                  ? styles.comboBody + " " + styles.comboBodyOpen
                  : styles.comboBody
              }
            >
              <div
                onClick={() => {
                  handleOpen(4);
                }}
                className={styles.comboItem}
              >
                <span>Список пользователей</span>
              </div>
              <div
                onClick={() => {
                  handleOpen(4);
                }}
                className={styles.comboItem}
              >
                <span>Система лояльности</span>
              </div>
            </div>
          </div>
          <div className={styles.menuItem}>
            <p className="text-bold">Финансы</p>
            <img
              src={arrowDown}
              className={styles.down}
              alt=""
              onClick={() => handleOpen(5)}
            />
            <div
              className={
                comboOpen[5]
                  ? styles.comboBody + " " + styles.comboBodyOpen
                  : styles.comboBody
              }
            >
              <div
                onClick={() => {
                  handleOpen(5);
                }}
                className={styles.comboItem}
              >
                <span>Ценообразование</span>
              </div>
              <div
                onClick={() => {
                  handleOpen(5);
                }}
                className={styles.comboItem}
              >
                <span>Способы оплаты</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

import styles from "./CalulatePage.module.scss";
import tgBlack from "../../../assets/tg-black.svg";
import shop from "../../../assets/shop-icon.svg";
import vk from "../../../assets/vk-icon.svg";
import inst from "../../../assets/inst-icon.svg";
import miniLogo from "../../../assets/mini-logo.svg";
import pznLogo from "../../../assets/poizon.png";
import hint1 from "../../../assets/hint1.png";
import hint2 from "../../../assets/hint2.png";
import hint3 from "../../../assets/hint3.png";
import hintSvg from "../../../assets/hint-svg.svg";
import comboboxIcon from "../../../assets/combobox-icon.svg";

import { Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSettings } from "../../../redux/slices/settingsReducer";
import { getCategories } from "../../../redux/slices/categoriesReducer";

export default function CalulatePage() {
  const [openHint, setOpenHint] = useState({
    1: false,
    2: false,
    3: false,
    4: false,
  });
  const [comboOpen, setComboOpen] = useState(false);
  const [fullPrice, setFullPrice] = useState(0);

  const { settingsInfo } = useSelector((state) => state.settings);
  const { categories } = useSelector((state) => state.categories);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSettings());
    dispatch(getCategories());
  }, []);

  function handleOpen(num) {
    setOpenHint((prev) => ({ ...prev, [num]: !prev[num] }));
  }

  const initalValues = {
    link: "",
    category: "",
    price_yuan: "",
    size: "",
  };

  return (
    <div className={styles.root}>
      <div className="container">
        <header className={styles.header}>
          <div className={styles.left}>
            <Link to={"/login"} className="link-icon">
              <img src={miniLogo} alt="" />
            </Link>
            <div className={styles.curs}>¥: {settingsInfo?.yuan_rate} ₽</div>
          </div>

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
        </header>
        <div className={styles.top}>
          <div className={styles.block}>
            <div className={styles.img}>
              <img src={pznLogo} alt="" />
              <h2 className={styles.h2}>poizon ( de wu )</h2>
            </div>
            <div className={styles.btnContainer}>
              <a
                href="https://apps.apple.com/ru/app/%E5%BE%97%E7%89%A9-%E5%BE%97%E5%88%B0%E8%BF%90%E5%8A%A8x%E6%BD%AE%E6%B5%81x%E5%A5%BD%E7%89%A9/id1012871328"
                target="_blank"
                className={"link " + styles.linkBlue}
              >
                Открыть в AppStore
              </a>
              <a
                href="https://m.anxinapk.com/rj/12201303.html?_gl=1*e0de0p*_ga*OTk0NTE3NjM1LjE3MTc1MDY3ODk.*_ga_189TE4CGP3*MTcxNzUwNjc4OC4xLjAuMTcxNzUwNjc4OC4wLjAuMA"
                target="_blank"
                className="link"
              >
                Открыть для Android
              </a>
            </div>
          </div>
          <div className={styles.info}>
            <h2 className={styles.infoH2}>расчет стоимости</h2>
            <p className={styles.text}>
              Рассчитаем стоимость заказа в маркетплейсе Poizon, включая нашу
              комиссию и доставку.
            </p>
            <p className={styles.text}>
              Если у тебя еще нет приложения Poizon - скачивай по кнопке выше.
              Там есть любые кроссы и вещи, дешевле на 30-50% чем в РФ.
            </p>
            <p className={styles.text}>
              А если не хочешь заморачиваться - пиши в чат, какие кроссы или
              одежду хочешь. Можешь вообще просто скинуть фотку кроссовок, а мы
              сами все найдем, заполним и рассчитаем.
            </p>
            <a
              href="https://poizon-store.ru/useful-articles/registration-poizon"
              target="_blank"
              className={"link-under " + styles.link}
            >
              Как скачать и зарегистрироваться в Poizon?
            </a>
          </div>
        </div>
        <Formik initialValues={initalValues}>
          {({ values, setFieldValue }) => {
            //TODO Спросить формулу
            let cur3 = Math.round(
              values.price_yuan * settingsInfo?.yuan_rate,
              2
            );
            let com = settingsInfo?.commission_rub;
            if (values.category) {
              setFullPrice(
                cur3 +
                  values.category.delivery_price_CN_RU +
                  values.category.commission +
                  com
              );
            }
            return (
              <Form>
                <div className={styles.body}>
                  <div className={styles.inputContainer}>
                    <div className={styles.inputTop}>
                      <Field name="link" type="text" placeholder="Cсылка" />
                      <img
                        onClick={() => handleOpen(1)}
                        src={hintSvg}
                        className={styles.hintSvg}
                        alt=""
                      />
                    </div>
                    <div
                      className={
                        openHint[1]
                          ? styles.inputHint + " " + styles.inputHintOpen
                          : styles.inputHint
                      }
                    >
                      <p className={styles.hintText}>
                        Нажмите на товаре в Poizon кнопку «поделиться».
                        Скопируйте ссылку и вставьте сюда.
                      </p>
                      <img src={hint1} className={styles.hintImg} alt="" />
                    </div>
                  </div>
                  <div className={styles.inputContainer}>
                    <div className={styles.inputTop}>
                      <Field name="size" type="text" placeholder="Размер" />
                      <img
                        src={hintSvg}
                        onClick={() => handleOpen(2)}
                        className={styles.hintSvg}
                        alt=""
                      />
                    </div>
                    <div
                      className={
                        openHint[2]
                          ? styles.inputHint + " " + styles.inputHintOpen
                          : styles.inputHint
                      }
                    >
                      <p className={styles.hintText}>
                        Выберите размер. Чтобы подобрать правильный, загляните в
                        размерную сетку.
                      </p>
                      <img src={hint2} className={styles.hintImg} alt="" />
                    </div>
                  </div>
                  <div className={styles.inputContainer}>
                    <div className={styles.inputTop}>
                      <Field
                        name="price_yuan"
                        type="text"
                        placeholder="Цена в Юанях"
                      />
                      <img
                        src={hintSvg}
                        onClick={() => handleOpen(3)}
                        className={styles.hintSvg}
                        alt=""
                      />
                    </div>
                    <div
                      className={
                        openHint[3]
                          ? styles.inputHint + " " + styles.inputHintOpen
                          : styles.inputHint
                      }
                    >
                      <p className={styles.hintText}>
                        Выберите размер и укажите цену в юанях с бирюзовой
                        кнопки.
                      </p>
                      <img src={hint3} className={styles.hintImg} alt="" />
                    </div>
                  </div>
                  <div className={styles.inputContainer}>
                    <div className={styles.inputTop}>
                      <Field
                        name="category"
                        type="text"
                        readOnly
                        placeholder="Категория"
                        value={values.category?.name}
                      />
                      <img
                        src={hintSvg}
                        onClick={() => handleOpen(4)}
                        className={styles.hintSvg + " " + styles.comboHint}
                        alt=""
                      />
                      <img
                        src={comboboxIcon}
                        className={styles.comboboxIcon}
                        alt=""
                        onClick={() => setComboOpen((prev) => !prev)}
                      />
                      <div
                        className={
                          comboOpen
                            ? styles.comboBody + " " + styles.comboBodyOpen
                            : styles.comboBody
                        }
                      >
                        {categories.map((item) => {
                          return (
                            <div
                              onClick={() => {
                                setFieldValue("category", item);
                                setComboOpen(false);
                              }}
                              key={item.id}
                              className={styles.comboItem}
                            >
                              {item.name}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    <div
                      className={
                        openHint[4]
                          ? styles.inputHint + " " + styles.inputHintOpen
                          : styles.inputHint
                      }
                    >
                      <p className={styles.hintText}>
                        Выберите категорию товара. Нам это нужно для того, чтобы
                        правильно рассчитать цену доставки
                      </p>
                    </div>
                  </div>
                  <div className={styles.total}>
                    <div className={styles.totalTop}>
                      <h2 className={styles.totalH2}>итоговая стоимость:</h2>
                      <h2 className={styles.totalPrice}>
                        {fullPrice.toLocaleString()} руб
                      </h2>
                    </div>
                    <div className={styles.totalBtn}>
                      <button type="submit" className="link">
                        Cоздать заказ
                      </button>
                      <span className={"label " + styles.totalLabel}>
                        *С учетом комиссии сервиса и доставки до склада в рф
                      </span>
                    </div>
                  </div>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
}

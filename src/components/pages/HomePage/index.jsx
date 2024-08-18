import st from "./HomePage.module.scss";
import Header from "../../ui/Header";
import plus from "../../../assets/plus.svg";
import search from "../../../assets/search.svg";
import { useState } from "react";
import { statusHome } from "../../../utils/constants";
import classNames from "classnames";
import BasicSwitch from "../../ui/BasicSwitch";

export default function HomePage() {
  const statuses = Object.keys(statusHome);
  const [activeStatus, setActiveStatus] = useState(statuses[0]);
  const [filterActive, setFilterActive] = useState(false);

  console.log(filterActive);
  const handleChange = (e) => {
    setFilterActive(e.target.checked);
  };
  return (
    <div>
      <Header />
      <div className={st.root}>
        <div className="container">
          <div className={st.row}>
            <div className={st.rowItem}>
              <button className="button">
                <span>Создать заказ</span>
                <img src={plus} alt="" />
              </button>
            </div>
            <div className={st.rowItem}>
              <button className="button button-center">
                <span>Создать отчет</span>
              </button>
            </div>
            <div className={st.rowItem}>
              <div className={st.inputContainer}>
                <img src={search} alt="" />
                <input
                  type="text"
                  className={st.input}
                  placeholder="Поиск по номерам"
                />
              </div>
            </div>
          </div>
          <div className={st.statuses}>
            {statuses.map((key) => {
              return (
                <div
                  key={key}
                  onClick={() => setActiveStatus(key)}
                  className={
                    activeStatus === key
                      ? classNames(st.status, st.statusActive)
                      : st.status
                  }
                >
                  {statusHome[key]}
                </div>
              );
            })}
          </div>
          <div className={st.spaceBetwen}>
            <div className="switch">
              <BasicSwitch
                checked={filterActive}
                onChange={handleChange}
                label={"Фильтр"}
              />
            </div>
          </div>
          {/* to do отобразить список элементов */}
        </div>
      </div>
    </div>
  );
}

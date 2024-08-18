import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./theme/index.css";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";

import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

const options = {
  position: positions.TOP_CENTER,
  timeout: 2000,
  offset: "30px",
  transition: transitions.SCALE,
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <AlertProvider template={AlertTemplate} {...options}>
      <App />
    </AlertProvider>
  </Provider>
);

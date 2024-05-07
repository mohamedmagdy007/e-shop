import ReactDOM from "react-dom/client";
import AppRouter from "@routes/AppRouter";
import { Provider } from "react-redux";
import { store, persistor } from "@store/index";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <AppRouter />
    </PersistGate>
  </Provider>
);

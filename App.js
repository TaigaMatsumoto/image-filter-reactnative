import React from "react";
import Main from "./src/components/main";
import { Provider } from "react-redux";
import store from "./src/store/store";

const App = () => (
  <Provider store={store}>
    <Main />
  </Provider>
);

export default App;

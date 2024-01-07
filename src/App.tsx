import { Provider } from "react-redux";
import "./App.css";

import Main from "./component/Main";
import { store } from "./store";

function App() {
  return (
    <Provider store={store}>
      <Main />;
    </Provider>
  );
}

export default App;

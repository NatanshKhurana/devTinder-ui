import { BrowserRouter, Routes, Route } from "react-router";
import Body from "./Body";
import ErrorElement from "./ErrorElement";
import Login from "./Login";
import { Provider } from "react-redux";
import appStore from "../store/appStore";
import Feed from "./Feed";

function App() {
  return (
    <Provider store={appStore}>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Feed />} />
            <Route path="*" element={<ErrorElement />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;

import { BrowserRouter, Routes, Route } from "react-router";
import Body from "./Body";
import ErrorElement from "./ErrorElement";
import Login from "./Login";
import { Provider } from "react-redux";
import appStore from "../store/appStore";
import Feed from "./Feed";
import Profile from "./Profile";
import Connections from "./Connections";
import Requests from "./Requests";
import Chat from "./Chat";

function App() {
  return (
    <Provider store={appStore}>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />}/>
            <Route path="/connections" element={<Connections />}/>
            <Route path="/requests" element={<Requests />} />
            <Route path="/" element={<Feed />} />
            <Route path="*" element={<ErrorElement />} />
            <Route path="/chat/:targetUserId" element={<Chat />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;

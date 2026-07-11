import { BrowserRouter, Routes, Route } from "react-router";
import Body from "./Body";
import ErrorElement from "./ErrorElement";
import Login from "./Login";

function App() {
  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/login" element={<Login />} />
            <Route path="/test" element={<div>Test page</div>} />
            <Route path="*" element={<ErrorElement />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

import { BrowserRouter, Routes, Route } from "react-router";
import Body from "./Body";
import ErrorElement from "./ErrorElement";


function App() {
  return (
    <>
      <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Body />}>
          <Route path="/login" element={<div>Login page</div>}/>
          <Route path="/test" element={<div>Test page</div>}/>
          <Route path="*" element={<ErrorElement />}/>
        </Route>
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

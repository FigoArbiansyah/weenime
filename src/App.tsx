import { BrowserRouter, Routes, Route } from "react-router-dom";
import routes from "./helpers/Routes";
import Home from "./pages/Home";
import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          {routes?.map((route, index) => {
            const Element = route?.element;
            return (
              <Route key={index} path={route?.path} element={<Element />} />
            );
          })}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

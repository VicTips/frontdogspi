import "./App.css";
import { Routes, Route } from "react-router-dom";
import Landing from "./pages/landing/Landing";
import Home from "./pages/home/Home";
import Form from "./pages/form/Form";
import Detail from "./pages/detail/Detail";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/form" element={<Form />} />
        <Route path="/detail/:id" element={<Detail />} />
      </Routes>
    </div>
  );
}

export default App;

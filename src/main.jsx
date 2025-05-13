import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router";
import Users from "./pages/Users.jsx";
import About from "./pages/About";
import Home from "./pages/Home";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/Home" element={<Home />} />
      <Route path="/About" element={<About />} />
      <Route path="/users" element={<Users />} />
    </Routes>
    <App />
  </BrowserRouter>
);

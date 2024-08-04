import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Lp from "./pages/Lp";
import Calendar from "./pages/Calendar";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Lp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/calendar" element={<Calendar />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

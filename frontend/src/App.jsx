import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Lp from "./pages/Lp";
import Calendar from "./pages/Calendar";
import Layout from "./layout/Layout";
import Wordbank from "./pages/Wordbank";
import Collection from "./pages/Collection";
import Setting from "./pages/Setting";
import New from "./pages/New";
import LayoutWithNav from "./layout/LayoutWithNav";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import LpLayout from "./components/Lp/LpHeader";
import "nes.css/css/nes.min.css";
import "./index.css";
import VerDetail from "./pages/VerDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Lp />} />
        <Route path="/privacypolicy" element={<PrivacyPolicy />} />
        <Route path="" element={<LayoutWithNav />}>
          <Route path="/login" element={<Login />} />
          <Route path="/wordbank" element={<Wordbank />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/setting" element={<Setting />} />
        </Route>
        <Route path="" element={<Layout />}>
          <Route path="/new" element={<New />} />
          <Route path="/version/:id" element={<VerDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

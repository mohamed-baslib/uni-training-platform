import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import MainLayout from "./components/layouts/MainLayout";
import EmptyLayout from "./components/layouts/EmptyLayout";
import ScrollToTop from "./components/layouts/ScrollToTop";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Opportunities from "./pages/Opportunities";
import OpportunityDetails from "./pages/OpportunityDetails";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import ComingSoon from "./pages/ComingSoon";


function App() {
  return (
    <BrowserRouter>

      {/* للانتقال الى اعلى الصفحة مباشرة عند النقر على رايط الصفحة */}
      <ScrollToTop />

      <Routes>
        {/* صفحات تحتوي على Header و Footer */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/opportunities" element={<Opportunities />} />
        </Route>

        {/* صفحات بدون Header و Footer */}
        <Route element={<EmptyLayout /> }>
          <Route path="/login/:form" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/opportunity-details/:id" element={<OpportunityDetails />} />
          <Route path="/coming-soon" element={<ComingSoon />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;

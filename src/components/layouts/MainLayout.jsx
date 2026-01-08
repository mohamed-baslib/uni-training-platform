import { Outlet, useLocation } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import { useEffect } from "react";
import NoticeBubble from "../NoticeBubble";


const titles = {
  "/": "الرئيسية | منصة التدريب الجامعي",
  "/opportunities": "فرص التدريب | منصة التدريب الجامعي",
  "/about": "من نحن | منصة التدريب الجامعي",
  "/contact": "تواصل معنا | منصة التدريب الجامعي",
};

const MainLayout = () => {
    const location = useLocation();

    useEffect(() => {
    document.title = titles[location.pathname] || "منصة التدريب الجامعي";
  }, [location.pathname]);
    return (
        <>
            <Header />
            <NoticeBubble/>
            <Outlet />
            <Footer />
        </>
    )
}

export default MainLayout;
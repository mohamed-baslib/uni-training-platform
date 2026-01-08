import { Link } from "react-router-dom";
import React from "react";
import { useAuth } from "../contexts/useAuth";
export default function Footer() {
  const { isLoggedIn } = useAuth();
  const socialIcons = ["fab fa-instagram", "fab fa-youtube", "fab fa-linkedin"];

  const footerLinks = [
    {
      label: " استكشف الفرص",
      links: [
        { name: "فرص التقنية", to: "/opportunities" },
        { name: "فرص التصميم", to: "/opportunities" },
        { name: "فرص الإعلام", to: "/opportunities" },
        {
          name: "فرص الكتابة",
          to: "/opportunities",
        },
        {
          name: "فرص تعليم وتدريب",
          to: "/opportunities",
        },
      ],
    },
    {
      label: "خدماتنا",
      links: [
        {
          name: "تسجيل الطلاب",
          to: isLoggedIn ? "/coming-soon" : "/login/false",
        },
        { name: "التقديم على الفرص", to: "/coming-soon" },
        {
          name: "إدارة الملف الشخصي",
          to: isLoggedIn ? "/profile" : "/coming-soon",
        },
        { name: "الدعم الفني", to: "/coming-soon" },
        { name: "الإرشاد عبر الإنترنت", to: "/coming-soon" },
      ],
    },
    {
      label: "الدعم والمساعدة",
      links: [
        { name: "الأسئلة الشائعة", to: "/coming-soon" },
        { name: "سياسة الخصوصية", to: "/coming-soon" },
        { name: "الشروط والأحكام", to: "/coming-soon" },
        { name: "تواصل مع الإدارة", to: "/contact" },
        { name: "مركز المساعدة", to: "/coming-soon" },
      ],
    },
    {
      label: " روابط سريعة",
      links: [
        { name: "الرئيسية", to: "/" },
        { name: "الفرص", to: "/opportunities" },
        { name: "تسجيل", to: isLoggedIn ? "/coming-soon" : "/login/true" },
        { name: "عن المنصة", to: "/about" },
        { name: "تواصل", to: "/contact" },
      ],
    },
  ];

  return (
    <footer className="h-fit px-[40px] sm:px-[90px] py-[40px] bg-[linear-gradient(to_top_right,#000000,#001733,#000102,#011c42,#013e8a)]">
      <div className="flex flex-col  lg:flex-row-reverse justify-between items-center text-white pb-[20px] border-b border-white/50"></div>

      {/* روابط الفوتر */}
      <div className="flex flex-col lg:flex-row justify-between py-[80px] border-b border-white/50">
        <div className="flex flex-col items-center list-none">
          <img
            className="w-[100px] h-[100px] bg-white rounded-full"
            src="images/logo.png"
            alt="logo"
          />
          <h6 className="w-[200px] text-white text-[20px] text-center font-bold lg:text-[25px] mt-[20px]">
            منصة التدريب الجامعي
          </h6>

          <div className="flex flex-col items-center w-[120px] mt-5">
            <div className="w-full">
              {socialIcons.map((icon, index) => {
                return (
                  <a key={index}>
                    <i
                      className={`${icon} text-white/90 text-[23px] mx-[5px] transition duration-200 hover:text-blue-600 hover:scale-110 cursor-pointer`}
                    ></i>
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="w-full lg:w-[75%] grid md:grid-cols-2 lg:grid-cols-4 mx-auto gap-x-24 md:gap-x-0 items-center">
          {footerLinks.map((fo, ind) => {
            return (
              <ul
                key={ind}
                className="text-center lg:text-end mt-[50px] lg:mt-0 bg-blue-700/20 mx-4 p-5 rounded-lg"
              >
                <h3 className="ml-auto w-fit text-blue-600  text-center font-bold text-[16px] mb-[20px] capitalize flex items-center gap-x-2">
                  {fo.label}
                  <div className="bg-white w-2 h-2 rounded-[2px] rotate-45"></div>
                </h3>
                {fo.links.map((link, idx) => (
                  <li
                    className="flex justify-end items-center gap-x-1"
                    key={idx}
                  >
                    <Link
                      className="inline-block no-underline text-white text-[16px] leading-[30px] transition duration-300 capitalize hover:text-blue-400 hover:scale-105"
                      to={link.to}
                    >
                      {link.name}
                    </Link>
                    <div className="bg-blue-600 w-[5px] h-[5px] rounded-[2px] rotate-45"></div>
                  </li>
                ))}
              </ul>
            );
          })}
        </div>
      </div>

      {/* حقوق الطبع */}
      <div className="copy-right flex flex-col items-center">
        <p className="text-white text-center py-[30px] text-[17px]">
          جميع الحقوق محفوظة &copy; 2025{" "}
          <a className="no-underline text-blue-500 mr-[5px]">
            منصة التدريب الجامعي
          </a>
        </p>
      </div>
    </footer>
  );
}

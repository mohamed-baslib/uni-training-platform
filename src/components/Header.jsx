import { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";

const navPages = [
  { namePage: "الرئيسية", pathPage: "/" },
  { namePage: "فرص التدريب", pathPage: "/opportunities" },
  { namePage: "عن المنصة", pathPage: "/about" },
  { namePage: "تواصل معنا", pathPage: "/contact" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdawn] = useState(false);
  const location = useLocation();
  const boxRef = useRef(null);
  const buttonRef = useRef(null);

  const { user, logout, isLoggedIn } = useAuth();

  // لاخفاء قائمة الهيدر اذا كانت مفتوحة عند التحويل من الشاشات الصغيرة الى شاشة الحاسوب
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      } else {
        setOpenDropdawn(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        boxRef.current &&
        !boxRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setOpenDropdawn(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="w-full fixed z-[999] flex items-center px-5 pt-5">

      {/* الشعار */}
      <div className="w-[80px] h-[80px] lg:w-[80px] lg:h-[80px] rounded-full bg-white border-[10px] border-blue-600 absolute z-[99] overflow-hidden">
        <img className="w-full " src="/images/logo.png" alt="Logo" />
      </div>

      {/* الهيدر العلوي */}
      <div className="flex items-center justify-between bg-white px-[3%] rounded-br-[50px] ml-[65px] md:px-12 w-full h-[60px] border-b-[10px] border-b-blue-600 relative">
        {/* عنوان المنصة */}
        <h1 className="sm:bloc absolute z-[91] top-0 left-0 w-[160px] sm:w-[230px] h-[30px] sm:h-[35px] text-[12px] sm:text-[15px] flex justify-center items-center pb-1 bg-blue-600 text-white font-bold rounded-br-[50px]">
          منصة التدريب الجامعي
        </h1>

        {/* أيقونة الهامبرغر للهاتف */}
        <button
          aria-label="dropdown"
          className={`${
            isOpen ? "hidden" : "lg:hidden"
          } text-blue-600 text-2xl font-bold absolute right-8`}
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>

        {/* الروابط والأزرار */}
        <div
          className={`h-[100vh] lg:h-0 flex flex-col lg:flex-row items-center justify-between gap-2 lg:gap-6 w-screen lg:w-full absolute top-[-20px] lg:static bg-white lg:bg-transparent p-4 lg:p-0 transition-all duration-[1000ms] lg:duration-[0ms] ${
            isOpen ? "flex z-[90] left-[-90px]" : " lg:flex left-[850px]"
          }`}
        >
          <button
            aria-label="close menu"
            className={`${
              isOpen ? "block" : "hidden"
            } lg:hidden text-blue-600 text-2xl font-bold absolute top-8 right-10 z-[99]`}
            onClick={() => setIsOpen(!isOpen)}
          >
            <i className="fa-solid fa-xmark"></i>
          </button>

          {/* روابط التنقل */}
          <nav className="flex flex-col lg:flex-row lg:justify-end xl:justify-between items-center gap-4 lg:gap-6 w-full lg:w-[68%] xl:w-1/2 mt-[25vh] lg:mt-0 lg:ml-[100px] xl:ml-[250px]">
            {navPages.map((page, index) => {
              return (
                <NavLink
                  key={index}
                  to={page.pathPage}
                  className={`${
                    location.pathname == page.pathPage
                      ? "bg-blue-600 text-white lg:font-bold lg:text-blue-600"
                      : "font-normal"
                  }    text-[20px] lg:text-[18px] xl:text-[20px] border border-blue-600 lg:border-none w-[80%] lg:w-auto text-blue-600 rounded-lg p-1 text-center lg:bg-transparent transition duration-200 hover:text-blue-300`}
                  onClick={() => setIsOpen(false)}
                >
                  {page.namePage}
                </NavLink>
              );
            })}
          </nav>

          {/* للتحقق اذا المستخدم مسجل اخفي ازرار التسجيل واظهر معلوماته */}
          {!isLoggedIn ? (
            <div className="flex flex-col lg:flex-row gap-2 lg:gap-4 w-[200px] lg:w-[23%] mb-8 lg:mb-0 mt-2 lg:mt-0">
              <NavLink
                to="/login/login"
                className="font-bold p-1 text-center rounded-[10px] text-[14px] lg:text-[10px] xl:text-[14px] transition duration-100 text-[#0368e3] border border-blue-600 w-full lg:w-[48%] hover:opacity-70"
              >
                تسجيل
              </NavLink>
              <NavLink
                to="/login/signup"
                className="font-bold p-1 text-center rounded-[10px] text-[14px] lg:text-[10px] xl:text-[14px] transition duration-100 bg-blue-600 text-white w-full lg:w-[48%] hover:opacity-70"
              >
                إنشاء حساب
              </NavLink>
            </div>
          ) : (
            <>
              <div className="flex flex-col lg:flex-row items-center pb-3 lg:pb-0">
                <div className="flex flex-col lg:flex-row-reverse items-center mb-2 lg:mb-0">
                  <div className="w-[60px] h-[60px] lg:w-[40px] lg:h-[40px] rounded-full overflow-hidden border">
                    {user.profile.avatar ? (
                      <img className="w-full" src={user.profile.avatar} />
                    ) : (
                      <i className="fa-solid fa-circle-user text-[60px] lg:text-[40px] text-blue-600 w-full h-full flex justify-center items-center"></i>
                    )}
                  </div>
                  <div
                    className="flex items-center lg:cursor-pointer"
                    onClick={() => setOpenDropdawn(!openDropdown)}
                    ref={buttonRef}
                  >
                    <i
                      className={`fa-solid fa-chevron-down hidden lg:block text-[12px] mt-1 ${
                        openDropdown ? "rotate-180" : "rotate-0"
                      } duration-200`}
                    ></i>
                    <h4 className="font-bold text-[20px] lg:text-[18px] lg:mr-3 lg:ml-1">
                      {user.profile.name}
                    </h4>
                  </div>
                </div>
                <div
                  className={`lg:absolute lg:right-[60px] top-[50px] rounded-xl text-[14px] text-end overflow-hidden w-[250px] lg:w-[200px] h-[90px] lg:bg-white border-2 lg:border-4 ${
                    openDropdown
                      ? "opacity-100 translate-y-0 visible"
                      : "lg:opacity-0 lg:translate-y-[-20px] lg:invisible"
                  } transition-all duration-500`}
                  ref={boxRef}
                >
                  <NavLink
                    to="/profile"
                    className="w-full block pt-3 h-1/2 px-4 hover:bg-gray-200 border-b"
                  >
                    بروفايل <i className="far fa-user"></i>
                  </NavLink>
                  <NavLink
                    onClick={() => logout()}
                    to="/login/login"
                    className="w-full block pt-2 h-1/2 px-4 hover:bg-gray-200 border-t"
                  >
                    تسجيل الخروج <i className="fas fa-sign-out-alt"></i>
                  </NavLink>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

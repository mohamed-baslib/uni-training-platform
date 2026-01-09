import { useState } from "react";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";
import { storage, STORAGE_KEYS } from "../services/storage";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  password: "",
  password2: "",
  terms: false,
};

export default function Login() {
  const { form } = useParams();
  const isLoginModel = form === "login";
  const [showpassword, setShowpassword] = useState(false);
  const [formData, setFormData] = useState(initialForm);
  const [validation, setValidation] = useState(false);
  const { addUser, login, user, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const progressMap = isLoginModel
    ? ["email", "password"]
    : ["name", "email", "password", "password2", "terms"];

  const progressBar =
    (progressMap.filter((key) => formData[key]).length / progressMap.length) *
    100;

  const handleChange = (key) => (e) => {
    setFormData({
      ...formData,
      [key]: key.includes("password") ? e.target.value.trim() : e.target.value,
    });
  };
  function handleLogin(e) {
    e.preventDefault();
    setValidation(true);
    const userCurrent = storage
      .get(STORAGE_KEYS.USERS)
      .find(
        (item) =>
          item.auth.email === formData.email &&
          item.auth.password === formData.password
      );
    if (userCurrent) {
      login({
        id: userCurrent.id,
        name: userCurrent.profile.name,
        email: userCurrent.auth.email,
      });
      navigate("/");
    }
  }

  function handleSignup(e) {
    e.preventDefault();
    setValidation(true);
    if (
      formData.name.length >= 3 &&
      /\S+@\S+\.\S+/.test(formData.email) &&
      formData.password.length >= 6 &&
      formData.password === formData.password2 &&
      formData.terms
    ) {
      if (
        !storage
          .get(STORAGE_KEYS.USERS)
          .some((item) => item.auth.email === formData.email)
      ) {
        let sigunupUser = {
          ...user,
          id: Date.now(),
          profile: {
            ...user.profile,
            name: formData.name,
            phone: formData.phone,
          },
          auth: {
            ...user.auth,
            email: formData.email,
            password: formData.password,
          },
        };
        addUser(sigunupUser);
        navigate("/login/login");
      }
    }
  }

  if (isLoggedIn ) return ;
  return (
    <div
      dir="rtl"
      className="font-cairo flex flex-1 items-stretch bg-gradient-to-br from-white via-[#f2f6fc] to-[#e9eef7]"
    >
      {/* LEFT: Motion / Showcase  */}
      <section className="hidden lg:block flex-[0_0_55%] p-[56px_60px] text-slate-800 relative overflow-hidden">
        <div className="max-w-[520px] relative z-[2]">
          <div className="font-extrabold text-[20px] tracking-[1px] bg-blue-600 bg-clip-text text-transparent">
            مع منصة التدريب
          </div>

          <h1 className="text-[40px] my-[14px] leading-[1.05] font-bold drop-shadow-[0_2px_10px_rgba(0,0,0,0.08)]">
            ابدأ رحلتك المهنية
          </h1>
          <p className="text-slate-600 mb-5 text-[16px]">
            اكتشف فرص التدريب المناسبة لتخصصك، طوّر مهاراتك وابدأ العمل على
            مشاريع حقيقية مع جهات معتمدة.
          </p>

          <ul className="list-none pl-0 my-[25px]">
            <li className="flex items-center my-[15px] text-[#475569] font-medium mr-10">
              <span className="w-[8px] h-[8px] rounded-full bg-gradient-to-r from-[#4f46e5] to-[#0ea5e9] inline-block ml-[12px]"></span>{" "}
              فرص موثوقة من شركات عالمية
            </li>
            <li className="flex items-center my-[15px] text-[#475569] font-medium mr-10">
              <span className="w-[8px] h-[8px] rounded-full bg-gradient-to-r from-[#4f46e5] to-[#0ea5e9] inline-block ml-[12px]"></span>{" "}
              تدريب عملي وشهادات إتمام
            </li>
            <li className="flex items-center my-[15px] text-[#475569] font-medium mr-10">
              <span className="w-[8px] h-[8px] rounded-full bg-gradient-to-r from-[#4f46e5] to-[#0ea5e9] inline-block ml-[12px]"></span>{" "}
              دعم للطلاب عن بعد ومحليًا
            </li>
          </ul>

          {/* Animated illustrations (simple shapes + floating icons)  */}
          <div className="relative pt-5">
            <svg
              className="w-[260px] h-auto opacity-90 drop-shadow-[0_8px_20px_rgba(0,0,0,0.08)] rounded-xl"
              viewBox="0 0 260 160"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="g1" x1="0" x2="1">
                  <stop offset="0%" stopColor="#000" stopOpacity="0.08" />
                  <stop offset="100%" stopColor="#000" stopOpacity="0.02" />
                </linearGradient>
              </defs>
              <rect
                x="8"
                y="18"
                rx="12"
                ry="12"
                width="240"
                height="110"
                fill="url(#g1)"
                stroke="rgba(0, 0, 0, 0.05)"
              />
              <rect
                x="24"
                y="30"
                rx="6"
                width="80"
                height="16"
                fill="rgba(0,0,0,0.05)"
              />
              <rect
                x="24"
                y="56"
                rx="6"
                width="200"
                height="10"
                fill="rgba(0,0,0,0.05)"
              />
              <rect
                x="24"
                y="74"
                rx="6"
                width="160"
                height="10"
                fill="rgba(0,0,0,0.05)"
              />
              <circle cx="210" cy="50" r="14" fill="rgba(0,0,0,0.1)" />
            </svg>

            <div className="absolute right-[40px] top-[30px] w-[56px] text-center px-[14px] py-[10px] rounded-xl bg-black/5 backdrop-blur-sm text-blue-600 font-bold tracking-wide animate-float">
              تقنية
            </div>
            <div className="absolute right-[10px] top-[110px] w-[150px] text-center px-[14px] py-[10px] rounded-xl bg-black/5 backdrop-blur-sm text-blue-600 font-bold tracking-wide animate-float">
              مجالات متنوعة
            </div>
            <div className="absolute right-[120px] top-[50px] w-[72px] text-center px-[14px] py-[10px] rounded-xl bg-black/5 backdrop-blur-sm text-blue-600 font-bold tracking-wide animate-float">
             تصميم
            </div>
            <div className="absolute right-[170px] top-[100px] w-[72px] text-center px-[14px] py-[10px] rounded-xl bg-black/5 backdrop-blur-sm text-blue-600 font-bold tracking-wide animate-float">
             أدارة
            </div>
          </div>

          <div className="mt-[10px] text-black">
            {" "}
            <bdi>استكشف</bdi>
            <NavLink to="/opportunities" className="text-blue-600 mr-1">
              فرص التدريب
            </NavLink>
          </div>
        </div>
      </section>

      {/* RIGHT: Auth Panel  */}
      <section className="h-screen flex-1 lg:flex-[0_0_45%] flex items-center justify-center sm:p-12 pb-[87px] bg-gradient-to-b from-black/5 to-transparent relative">
        {/* Background gradient mesh (pseudo-element) */}
        <div className="absolute bg-[radial-gradient(600px_300px_at_10%_10%,rgba(99,102,241,0.18),transparent_10%),radial-gradient(400px_200px_at_80%_80%,rgba(6,182,212,0.12),transparent_10%)] filter blur-3xl opacity-95 -z-10"></div>

        <div className="w-[110%] sm:w-full lg:w-[420px] absolute sm:relative scale-[0.8] sm:scale-[0.9] mt-10 bg-white/70 rounded-[18px] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.15)] backdrop-blur-md text-slate-900 transition-all duration-500 hover:shadow-[0_8px_30px_rgba(99,102,241,0.4)]">
          {/* Card Header */}
          <div className="pb-3.5">
            <h2 className="text-[16px] sm:text-[20px] font-bold text-slate-900 mb-3">
              {isLoginModel ? "تسجيل الدخول" : "إنشاء حساب"}
            </h2>
            <div
              className="h-2 bg-black/5 rounded-full overflow-hidden"
              aria-hidden="true"
            >
              <div
                style={{ width: `${progressBar}%` }}
                className={`h-full bg-gradient-to-r from-indigo-500 to-blue-500 w-0 transition-all duration-300`}
              ></div>
            </div>
          </div>

          {/* LOGIN FORM */}
          <form
            className={`${
              isLoginModel ? "block" : "hidden"
            } auth-form active animate-slideIn pt-[10px] pb-[20px]`}
            noValidate
          >
            <div className="pb-3">
              <label className="block text-[13px] text-slate-700 mb-1.5">
                البريد الإلكتروني
              </label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange("email")}
                placeholder="example@mail.com"
                required
                className="text-[14px] font-bold h-[42px] w-full px-3 py-[10px] rounded-[10px] border border-black/12 bg-slate-50 text-slate-900 focus:border-indigo-500 focus:bg-white focus:shadow-md focus:-translate-y-[2px] transition-all duration-150"
              />
              <small className="block text-[12px] text-red-400 mt-1.5 h-3.5">
                {!/\S+@\S+\.\S+/.test(formData.email) && validation == true
                  ? "البريد غير صالح"
                  : ""}
              </small>
            </div>

            <div className="pb-3">
              <label className="block text-[13px] h-[42px] text-slate-700 mb-1.5">
                كلمة المرور
              </label>
              <div className="flex items-center gap-2">
                <input
                  name="password"
                  type={showpassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange("password")}
                  placeholder="••••••••"
                  required
                  className="text-[12px] font-bold flex-1 px-3 py-[10px] rounded-[10px] border border-black/12 bg-slate-50 text-slate-900 focus:border-indigo-500 focus:bg-white focus:shadow-md focus:-translate-y-[2px] transition-all duration-150"
                />
                <button
                  type="button"
                  aria-label="show password"
                  className="text-[12px] w-10 px-2 py-1 rounded-lg font-bold text-blue-500 bg-transparent"
                  onClick={() => setShowpassword(!showpassword)}
                >
                  {showpassword ? "إخفاء" : "عرض"}
                </button>
              </div>
              <small className="block text-[12px] text-red-500 mt-1.5 h-3.5">
                {user.id === 0 && validation
                  ? "هناك خطأ في البريد الإلكتروني او كلمة المرور"
                  : ""}
              </small>
            </div>

            <div className="flex justify-between items-center pb-4 text-black">
              <label className="flex items-center gap-2 text-[14px] sm:text-[16px]">
                <input name="remember" type="checkbox" className="ml-1" />{" "}
                تذكرني
              </label>
              <a href="#" className="text-blue-600 text-[14px]">
                نسيت كلمة المرور؟
              </a>
            </div>

            <button
              className="w-full py-3 rounded-xl bg-blue-600 text-white font-bold text-[13px] hover:-translate-y-1 transition-transform"
              onClick={handleLogin}
            >
              تسجيل الدخول
            </button>

            <p className="text-black text-[14px] text-center mt-3.5">
              ليس لديك حساب؟{" "}
              <NavLink
                to="/login/signup"
                className="font-bold text-indigo-500 cursor-pointer"
                onClick={() => {
                  setValidation(false);
                  setFormData(initialForm);
                }}
              >
                إنشاء حساب
              </NavLink>
            </p>
          </form>

          {/* SIGNUP FORM */}
          <form
            className={`${
              isLoginModel ? "hidden" : "block"
            } auth-form animate-slideIn pb-[20px]`}
            noValidate
          >
            <div className="mb-3">
              <label className="block text-[13px] text-slate-700 mb-1.5">
                الاسم الكامل
              </label>
              <input
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange("name")}
                placeholder="ادخل اسمك الكامل"
                required
                className="text-[13px] w-full h-[42px] px-3 py-3 rounded-[10px] border border-black/12 bg-slate-50 text-slate-900 focus:border-indigo-500 focus:bg-white focus:shadow-md focus:-translate-y-[2px] transition-all duration-150"
              />
              <small className="block text-[12px] text-red-400 mt-1.5 h-3.5">
                {(!formData.name && validation == true)
                  ? "قم بتعبئة خانة الاسم"
                  : ""}
              </small>
            </div>

            <div className="flex flex-row gap-3 mb-3">
              <div className="flex-1">
                <label className="block text-[13px] text-slate-700 mb-1.5">
                  البريد الإلكتروني
                </label>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange("email")}
                  placeholder="example@mail.com"
                  required
                  className="w-full h-[42px] px-3 py-3 text-[13px] rounded-[10px] border border-black/12 bg-slate-50 text-slate-900 focus:border-indigo-500 focus:bg-white focus:shadow-md focus:-translate-y-[2px] transition-all duration-150"
                />
                <small className="block text-[12px] text-red-400 mt-1.5 h-3.5">
                  {!/\S+@\S+\.\S+/.test(formData.email) && validation == true
                    ? "البريد غير صالح"
                    : ""}
                </small>
              </div>
              <div className="flex-1">
                <label className="block text-[13px] text-slate-700 mb-1.5">
                  رقم الهاتف (اختياري)
                </label>
                <input
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => {
                    if (
                      "1234567890+ ".includes(e.target.value.at(-1)) ||
                      e.target.value == ""
                    )
                      setFormData({ ...formData, phone: e.target.value });
                  }}
                  placeholder="+967 ..."
                  className="w-full h-[42px] px-3 py-3 text-[13px] rounded-[10px] border border-black/12 bg-slate-50 text-slate-900"
                />
              </div>
            </div>

            <div className="flex flex-row gap-3 mb-8">
              <div className="flex-1">
                <label className="block text-[13px] text-slate-700 mb-1.5">
                  كلمة المرور
                </label>
                <input
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange("password")}
                  placeholder="••••••••"
                  required
                  className="w-full h-[42px] px-3 py-3 text-[11px] rounded-[10px] border border-black/12 bg-slate-50 text-slate-900 focus:border-indigo-500 focus:bg-white focus:shadow-md focus:-translate-y-[2px] transition-all duration-150"
                />
                <small className="block text-[12px] text-red-400 mt-1.5 h-3.5">
                  {formData.password.length < 6 && validation == true
                    ? "كلمة المرور يجب أن تكون 6 أحرف على الأقل"
                    : ""}
                </small>
              </div>
              <div className="flex-1">
                <label className="block text-[13px] text-slate-700 mb-1.5">
                  تأكيد كلمة المرور
                </label>
                <input
                  name="config-password"
                  type="password"
                  value={formData.password2}
                  onChange={handleChange("password2")}
                  placeholder="••••••••"
                  required
                  className="w-full h-[42px] px-3 py-3 text-[11px] rounded-[10px] border border-black/12 bg-slate-50 text-slate-900 focus:border-indigo-500 focus:bg-white focus:shadow-md focus:-translate-y-[2px] transition-all duration-150"
                />
                <small className="block text-[12px] text-red-400 mt-1.5 h-3.5">
                  {formData.password !== formData.password2 &&
                  validation == true
                    ? "كلمة المرور غير متطابقة"
                    : ""}
                </small>
              </div>
            </div>

            <div className="flex items-center gap-2 mb-6 text-[14px] text-black relative">
              <input
                name="agree-terms"
                checked={formData.terms}
                onChange={(e) =>
                  setFormData({ ...formData, terms: e.target.checked })
                }
                type="checkbox"
              />
              <label htmlFor="suTerms" className="text-[12px] sm:text-[14px]">
                أوافق على الشروط والأحكام
              </label>
              <small className="absolute top-6 text-[12px] text-red-400">
                {!formData.terms && validation == true
                  ? "يجب الموافقة على الشروط"
                  : ""}
              </small>
            </div>

            <button
              className="w-full mt-3 py-3 rounded-xl bg-blue-600 text-white font-bold text-[13px] hover:-translate-y-1 transition-transform"
              onClick={handleSignup}
            >
              إنشاء حساب
            </button>

            <p className="text-black text-[14px] text-center mt-3.5">
              لديك حساب؟{" "}
              <NavLink
                to="/login/login"
                className="font-bold text-indigo-500 cursor-pointer"
                onClick={() => {
                  setValidation(false);
                  setFormData(initialForm);
                }}
              >
                تسجيل الدخول
              </NavLink>
            </p>
          </form>
        </div>
      </section>
    </div>
  );
}

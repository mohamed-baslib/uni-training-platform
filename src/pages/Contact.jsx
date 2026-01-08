import { useState } from "react";
import { useAuth } from "../contexts/useAuth";

export default function Contact() {
  const [successMessage, setSuccessMessage] = useState({showMsg:false, isSuccess:false});
  const { user } = useAuth()
const [msg, setMsg] = useState({
  name: user?.profile?.name || "",
  email: user?.auth?.email || "",
  major: user?.profile?.spec || "",
  topic: "",
  message: ""
})
const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(msg.email);

  return (
    <div className="pb-[100px] px-[10%] md:px-[20%] text-white pt-[150px] bg-gradient-to-tr from-black via-blue-900 to-black">
      <div className="text-center pb-[30px]">
        <h2 className="text-[25px] md:text-[35px] mb-[20px] font-bold">
          <i className="fas fa-envelope"></i> تواصل معنا
        </h2>
        <p className="text-[14px] md:text-[18px] text-[#e2e2e2]">
          يسعدنا جداً مساعدتك في أي استفسار متعلق بالتدريب الجامعي أو المشاكل
          التقنية.
        </p>
      </div>

      <div className="flex flex-col-reverse items-center flex-wrap gap-[20px] py-[100px]">
        {/* نموذج التواصل  */}
        <div className="bg-[#010f1fb8] border-[3px] rounded-[8px] p-[20px] flex-1 w-[100%]">
          <h3 className="mb-[20px]">أرسل رسالة</h3>

          <form id="contactForm">
            <div className="mb-[15px]">
              <label className="block mb-[5px] opacity-80">الاسم الكامل</label>
              <input
                className="w-full py-[5px] px-[10px] rounded-[6px] border-none bg-white text-black text-[15px]"
                type="text"
                id="name"
                value={msg.name}
                required
                onChange={(e) => setMsg({...msg, name: e.target.value})}
              />
            </div>

            <div className="mb-[15px]">
              <label className="block mb-[5px] opacity-80">
                البريد الإلكتروني
              </label>
              <input
                className="w-full py-[5px] px-[10px] rounded-[6px] border-none bg-white text-black text-[15px]"
                type="email"
                id="email"
                value={msg.email}
                required
                onChange={(e) => setMsg({...msg, email: e.target.value})}
              />
            </div>

            <div className="mb-[15px]">
              <label className="block mb-[5px] opacity-80">التخصص</label>
              <input
                className="w-full py-[5px] px-[10px] rounded-[6px] border-none bg-white text-black text-[15px]"
                type="text"
                id="major"
                value={msg.major}
                required
                onChange={(e) => setMsg({...msg, major: e.target.value})}
              />
            </div>

            <div className="mb-[15px]">
              <label className="block mb-[5px] opacity-80">موضوع الرسالة</label>
              <input
                className="w-full py-[5px] px-[10px] rounded-[6px] border-none bg-white text-black text-[15px]"
                type="text"
                id="subject"
                value={msg.topic}
                required
                onChange={(e) => setMsg({...msg, topic: e.target.value})}
              />
            </div>

            <div className="mb-[15px]">
              <label className="block mb-[5px] opacity-80">نص الرسالة</label>
              <textarea
                className="w-full py-[5px] px-[10px] rounded-[6px] border-none bg-white text-black text-[15px]"
                id="message"
                value={msg.message}
                rows="5"
                required
                onChange={(e) => setMsg({...msg, message: e.target.value})}
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-[#0368e3] text-white p-[5px] w-full rounded-[6px] border-none cursor-pointer text-[16px] mt-[10px] font-bold hover:opacity-90"
              onClick={(e) => {
                  e.preventDefault()
                  setSuccessMessage({...successMessage, showMsg: true})
                  if(msg.name && isValidEmail && msg.major && msg.topic && msg.message){
                      setSuccessMessage((prev) => ({...prev, isSuccess: true}))
                      setMsg({name: user.profile.name, email:user.auth.email, major:user.profile.spec, topic:"", message:""})
                    }

                setTimeout(() => {
                    setSuccessMessage({isSuccess:false, showMsg: false})
                }, 5000);
               
              }}
            >
              <i className="fas fa-paper-plane"></i> إرسال
            </button>

            <p id="successMessage" className={`${successMessage.showMsg ? "block" : "hidden"} ${successMessage.isSuccess ? "text-[#00ff99]" : "text-[#ff1b1b]"} mt-[10px]`}>
              {successMessage.isSuccess ? "✓ تم إرسال الرسالة بنجاح!" : "! يجب تعبئة جميع الحقول بشكل صحيح"}
            </p>
          </form>
        </div>

        {/* معلومات التواصل  */}
        <div className="bg-[#010f1fb8] border-[3px] rounded-[8px] p-[20px] flex-1 w-[100%]">
          <h3 className="mb-[20px]">
            <i className="fas fa-info-circle"></i> معلومات التواصل
          </h3>

          <ul className="list-none p-0 m-0">
            <li className="py-[10px] text-[15px] opacity-90">
              <i className="fas fa-envelope"></i> training@university.edu
            </li>
            <li className="py-[10px] text-[15px] opacity-90">
              <i className="fas fa-phone"></i> 774583231
            </li>
          </ul>

          <div className="mt-20">
            <a className="mr-[10px] text-white text-[24px] cursor-pointer">
              <i className="fab fa-facebook"></i>
            </a>
            <a className="mr-[10px] text-white text-[24px] cursor-pointer">
              <i className="fab fa-instagram"></i>
            </a>
            <a className="mr-[10px] text-white text-[24px] cursor-pointer">
              <i className="fab fa-twitter"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

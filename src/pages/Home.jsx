import { NavLink } from "react-router-dom";
import OpportunityCard from "../components/OpportunityCard";
import { opportunities } from "../data/opportunities";
import { useAuth } from "../contexts/useAuth";

export default function Home() {
  const { user, isLoggedIn } = useAuth()
  const featured = user.profile.country ? [...opportunities.filter(o => o.location.includes(user.profile.country) && o.cost == "مجاني"), ...opportunities.filter(o => o.cost == "مجاني")] : opportunities.filter(o => o.cost == "مجاني")
  return (
    <div className="bg-gradient-to-tr from-black via-blue-900 to-black">
      <main className="w-full md:h-screen bg-gradient-to-tr from-black via-black/99 via-black/80 to-[#ef8c0b60] pt-[100px] p-[50px] lg:p-[100px] flex-col md:flex-row flex sm:justify-between items-center">
        <div className="pl-[30px] sm:pl-0 p-[10px] lg:p-[50px] sm:w-[50%] lg:w-[50%]">
          <img className="w-full" src="images/image1.png" alt="الرئيسية hero image" />
        </div>
        
        <div className="sm:w-1/2 h-full text-white flex justify-start items-center">
          <div className="flex flex-col items-center text-center w-full">
            <h2 className="font-bold text-[25px] sm:text-[30px] lg:text-[45px] text-blue-600">
              <span className="block text-white">خطوتك الأولى من أجل</span>{" "}
              مستقبلك المهني
            </h2>
            <p className="text-[14px] lg:text-[18px] w-[90%] my-[20px] mb-[30px] leading-[40px] text-[#bdbdbd]">
              احصل على فرص تدريب تطوّر مهاراتك وتجهّزك لسوق العمل. المنصة
              تربطك مباشرة مع أفضل فرص التدريب من الشركات والجامعات.
            </p>
            <div className="w-[70%] flex-col lg:flex-row justify-center flex items-center gap-6">
              <NavLink
                to="/login/signup-form"
                className={`${isLoggedIn ? "hidden" : "block"} w-[200px] lg:w-full font-bold p-[10px] text-center rounded-[10px] text-[14px] sm:text-[16px] lg:text-[18px] bg-blue-600 text-white transition-all duration-500 hover:shadow-[0_0_10px_5px_#ffffff]`}
              >
               أبدا خطوتك الأولى
              </NavLink>

              <NavLink
                to="/Opportunities"
                className={`${isLoggedIn ? "lg:w-[60%] bg-blue-600" : "lg:w-full"} w-[200px] p-[10px] rounded-[10px] text-[14px] sm:text-[16px] lg:text-[18px] font-bold border-2 border-blue-600 text-white transition-all duration-500 hover:shadow-[0_0_10px_5px_#ffffff]`}
              >
                استكشف الفرص
              </NavLink>
            </div>
          </div>
        </div>
        
      </main>
      

      {/* section training card  */}

      <section className="w-full px-[30px] md:px-[100px] bg-gradient-to-t from-[#6e147600] to-black overflow-hidden py-[100px]">
        <div className="flex flex-col items-center ">
          <h2 className="text-white text-center pt-[50px] text-[25px] sm:text-[40px] font-bold">
           { isLoggedIn ? "فرص مجانية مقترحة" : "اكتشف فرص التدريب"}
          </h2>
          <p className="text-[#bdbdbd] text-center text-[14px] sm:text-[18px] my-[20px] w-[80%] md:w-[44%] leading-[40px]">
            اكتشف فرص التدريب المناسبة لك في مختلف المؤسسات داخل وخارج
            الجامعة وابدأ رحلتك المهنية من اليوم.
          </p>
        </div>

        <div
          className="flex flex-col md:flex-row items-center justify-center md:justify-between flex-wrap mt-[50px]"
          id="best-opportunities"
        >
          {/* اضافة الفرص المميزة */}
          {featured.slice(0, 3).map((opp) => <OpportunityCard key={opp.id} opp={opp} />)}
        </div>
        <div className="w-full text-center">
        <NavLink
                to="/Opportunities"
                className={`${isLoggedIn ? "lg:w-[60%] bg-blue-600" : "lg:w-full"} w-[200px] p-[10px] rounded-[10px] text-[14px] sm:text-[16px] lg:text-[18px] font-bold border-2 border-blue-600 text-white transition-all duration-500 hover:shadow-[0_0_10px_5px_#ffffff]`}
              >
               جميع فرص التدريب
              </NavLink>

        </div>
      </section>
      


      {/* about-section */}

      <section dir="rtl" className="w-full lg:h-[100vh]">
        <div className="flex flex-col lg:flex-row justify-between items-center h-full p-[30px] md:p-[100px]">
          <div className="w-[250px] md:w-1/2">
            <img className="w-full" src="images/image2.png" alt="من نحن" />
          </div>
          <div className="lg:w-1/2 text-white text-center flex flex-col items-center">
            <h2 className="text-[18px] md:text-[40px] text-white font-bold">
              ما هي منصة التدريب الجامعي؟
            </h2>
            <p className="text-[12px] md:text-[18px] text-[#bdbdbd] w-[80%] lg:w-4/5 leading-[22px] md:leading-[40px] my-5">
              منصة إلكترونية تساعد طلاب الجامعات في الوصول إلى فرص التدريب
              المناسبة لتخصصاتهم، سواء داخل الجامعة أو خارجها. تهدف المنصة إلى
              تسهيل عملية البحث عن التدريب، وبناء جسر تواصل بين الطلاب والجهات
              التدريبية، بما يسهم في تطوير مهارات الطلاب وتأهيلهم لسوق العمل.
            </p>

            <NavLink
              to="/about"
              className="w-[120px] p-[10px] text-[12px] md:text-[17px] font-bold bg-blue-600 text-white rounded-[10px] transition-all duration-500 hover:shadow-[0_0_10px_5px_#ffffff]"
            >
              اعرف أكثر
            </NavLink>
          </div>
        </div>
      </section>

             {/* قسم الإحصائيات */}
             <div className="flex flex-col items-center pt-[50px] pb-5">
          <h2 className="text-white text-center pt-[50px] text-[25px] sm:text-[40px] font-bold">
           الإحصائيات
          </h2>
          <p className="text-[#bdbdbd] text-center text-[14px] sm:text-[18px] my-[20px] w-[80%] md:w-[44%] leading-[40px]">
           الإحصائيات لأغراض العرض فقط.
          </p>
        </div>
<div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-white text-center px-[60px] sm:px-[100px]">
  
  <div className="bg-blue-700/20 p-6 rounded-xl transition duration-300 hover:scale-105">
    <h3 className="text-[32px] font-bold text-blue-500">+100</h3>
    <p className="mt-2 text-[14px]">فرصة تدريب</p>
  </div>

  <div className="bg-blue-700/20 p-6 rounded-xl transition duration-300 hover:scale-105">
    <h3 className="text-[32px] font-bold text-blue-500">+45</h3>
    <p className="mt-2 text-[14px]">جهة تدريبية</p>
  </div>

  <div className="bg-blue-700/20 p-6 rounded-xl transition duration-300 hover:scale-105">
    <h3 className="text-[32px] font-bold text-blue-500">+300</h3>
    <p className="mt-2 text-[14px]">طالب مسجّل</p>
  </div>

  <div className="bg-blue-700/20 p-6 rounded-xl transition duration-300 hover:scale-105">
    <h3 className="text-[32px] font-bold text-blue-500">9</h3>
    <p className="mt-2 text-[14px]">مجالات تدريب</p>
  </div>

</div>
      
    </div>
  );
}

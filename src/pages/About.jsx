const goals = [
  {
    icon: "fas fa-handshake",
    title: "ربط الطلاب بالشركات",
    desc: "تسهيل التواصل بين الطلاب والجهات التدريبية لفرص تدريب موثوقة.",
  },

  {
    icon: "fas fa-briefcase",
    title: "اكتساب الخبرة العملية",
    desc: "توفير فرص تدريبية تمكن الطلاب من اكتساب مهارات عملية قبل التخرج.",
  },

  {
    icon: "fas fa-globe",
    title: "تدريب محلي ودولي",
    desc: "تمكين الطلاب من الوصول إلى فرص التدريب داخل الجامعة وخارجها.",
  },

  {
    icon: "fas fa-clock",
    title: "توفير الوقت والجهد",
    desc: "جمع فرص التدريب في مكان واحد لتسهيل البحث والوصول إليها بسرعة.",
  },
];

export default function About() {
  return (
    <div className="bg-gradient-to-tr from-black via-blue-900 to-black">
      <section dir="rtl" className="w-full lg:h-[100vh]">
        <div className="flex flex-col lg:flex-row justify-between items-center h-full py-[100px] px-[50px] lg:px-[100px]">
          <div className="w-[250px] md:w-[500px] mt-[50px] lg:mt-[200px]">
            <img className="w-full" src="images/image2.png" alt="طلاب في بيئة تدريب جامعي" />
          </div>
          <div className="lg:w-1/2 text-white text-center flex flex-col items-center mt-[50px] lg:mt-[150px]">
            <h2 className="text-[25px] lg:text-[40px] text-white font-bold">
              من نحن؟
            </h2>
            <p className="text-[14px] md:text-[18px] text-[#cfcfcf] w-full lg:w-4/5 leading-[30px] md:leading-[40px] my-5">
              تم إنشاء منصة التدريب الجامعي لمساعدة الطلاب على العثور على فرص
              التدريب المناسبة لتخصصاتهم بسهولة. تهدف المنصة إلى تسهيل عملية
              البحث عن التدريب، وبناء جسر تواصل بين الطلاب والجهات التدريبية،
              بما يسهم في تطوير مهارات الطلاب وتأهيلهم لسوق العمل.
            </p>
          </div>
        </div>
      </section>

      {/* Main About */}
      <section className="main-about py-[200px] px-[50px] md:px-[150px]">
        {/* الأهداف  */}
        <h2 className="text-[25px] md:text-[40px] mb-[50px] text-center text-white font-bold">
         رؤيتنا وأهدافنا
        </h2>
        <section className="flex flex-wrap justify-between md:justify-evenly gap-[30px]">
          {goals.map((g) => {
            return (
              <div className="bg-white hover:bg-blue-600 flex-[1_1_100%] group md:flex-auto p-[12px] md:p-[20px] rounded-[15px] md:rounded-[20px] text-center shadow-[0_4px_8px_rgba(0,0,0,0.1)] transition-transform duration-300 ease-in-out hover:-translate-y-1">
                <i className={`text-[18px] md:text-[2rem] text-[#0368e3] group-hover:text-white md:mb-[10px] ${g.icon}`}></i>
                <h3 className="text-[12px] md:text-[1.2rem] mb-[5px] md:mb-[10px] text-[#0368e3] group-hover:text-white font-bold">
                 {g.title}
                </h3>
                <p className="text-[10px] md:text-[0.9rem] text-[#555] group-hover:text-white">
                 {g.desc}
                </p>
              </div>
            );
          })}
        </section>

        <section className="text-center h-[50vh] pt-[300px] flex flex-col items-center">
          <h2 className="text-[25px] md:text-[40px] mb-[30px] text-white font-bold">
            تصميم وتطوير
          </h2>
          <p className="md:text-[20px] w-[35%] text-center mb-[20px] text-[#bdbdbd]">
            <bdi>
              تم تصميم وتطوير هذا المشروع بواسطة {" "}
              <a
                href="https://www.linkedin.com/in/mohamed-basalib"
                className="no-underline text-blue-600 mr-[5px] hover:text-gray-300"
              >
                Front-End Developer.Mohamed Baslib
              </a>
            </bdi>
          </p>
        </section>
      </section>
    </div>
  );
}

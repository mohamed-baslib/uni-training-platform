import { useParams } from "react-router-dom";
import { opportunities } from "../data/opportunities";
import { useAuth } from "../contexts/useAuth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function OpportunityDetails() {
  const { id } = useParams();
  const oppDetails = opportunities.find((opp) => opp.id == id);
  const { user, updateUsers } = useAuth();
  const [isOpenApplayModel, setIsOpenApplayModel] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-[#f5f7fb] text-[#111] font-[Tajawal]"
    >
      {/* HEADER */}
      <header className="flex items-center justify-between px-[15px] sm:px-[30px] py-[20px] bg-white border-b-[3px] border-[#3a6bff]">
        <h3 className="font-bold sm:text-xl flex items-center">
          <i className="fa-solid fa-align-left ml-2 sm:text-2xl"></i>
          تفاصيل الفرصة
        </h3>

        <a
          href="#"
          className="font-bold text-[#3a6cff] sm:text-lg"
          onClick={() => history.back()}
        >
          ← العودة
        </a>
      </header>

      {/* CONTAINER */}
      <main className="max-w-[1150px] mx-auto mt-7 px-[18px]">
        {/* TOP CARD */}
        <section className="flex gap-5 md:items-start max-[980px]:flex-col">
          {/* LEFT */}
          <div className="flex-1 flex flex-col md:flex-row gap-[18px] md:items-start">
            <h1 className="w-full h-20 md:w-28 md:h-28 rounded-[10px] text-[20px] md:text-[15px] text-center flex justify-center items-center font-bold text-white bg-blue-600">
              {oppDetails.major}
            </h1>

            <div>
              <h1 className="sm:text-[26px] font-bold">
                {oppDetails.company} — {oppDetails.major}
              </h1>
              <p className="text-[#6b7280] pt-4 text-[14px] sm:text-[16px]">
                {oppDetails.company}
              </p>

              {/* BADGES */}
              <div className="flex flex-wrap gap-2 my-2">
                {[
                  ["fa-user-graduate", oppDetails.major],
                  ["fa-map-marker-alt", oppDetails.location],
                  ["fa-clock", oppDetails.type],
                  ["fa-coins", oppDetails.cost],
                ].map(([icon, text], i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-2 bg-[#3a6bff] text-white px-[10px] py-[6px] rounded-full text-[10px] sm:text-[13px] font-semibold"
                  >
                    <i className={`fas ${icon}`} />
                    {text}
                  </span>
                ))}
              </div>

              {/* META */}
              <div className="flex gap-[18px] text-[11px] sm:text-sm text-[#6b7280] mt-2 flex-wrap">
                <span>
                  <strong>تاريخ النشر:</strong> {oppDetails.postedAt}
                </span>
                <span>
                  <strong>المقاعد:</strong> {oppDetails.slots}
                </span>
                <span>
                  <strong>الموعد النهائي:</strong> {oppDetails.deadline}
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="w-[320px] max-[980px]:w-full">
            <div className="bg-white p-[18px] rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-black/5 ">
              <div className="font-bold mb-3">
                الحالة: {oppDetails.availability}
              </div>

              <div className="flex flex-col lg:flex-row gap-2 mb-3">
                <button
                  className={`${
                    user.opportunities.saved.some((s) => s == id)
                      ? "bg-gray-800 text-white"
                      : " bg-white text-blue-600 border-blue-600"
                  } lg:w-1/2 text-[12px] p-2 sm:p-3 rounded-xl border-2 font-bold transition-all duration-200
  hover:scale-95 active:scale-[1.03]`}
                  onClick={() => {
                    user.id === 0
                      ? navigate("/login/login")
                      : !user.opportunities.saved.some((s) => s == id)
                      ? updateUsers({
                          ...user,
                          opportunities: {
                            ...user.opportunities,
                            saved: [...user.opportunities.saved, id],
                          },
                        })
                      : updateUsers({
                          ...user,
                          opportunities: {
                            ...user.opportunities,
                            saved: user.opportunities.saved.filter(
                              (opp) => opp !== id
                            ),
                          },
                        });
                  }}
                >
                  <i className="far fa-bookmark ml-1" />
                  {user.opportunities.saved.some((s) => s == id)
                    ? "تم الحفظ"
                    : " حفظ"}
                </button>
                <button
                  className="lg:w-1/2 text-[12px] p-2 sm:p-3 rounded-xl font-bold
  text-white bg-blue-600 border
  border-blue-600
  transition-all duration-200
  hover:scale-95 active:scale-[1.03]"
                  onClick={() =>
                    user.id === 0
                      ? navigate("/login/login")
                      : setIsOpenApplayModel(true)
                  }
                >
                  <i className="fas fa-paper-plane ml-2 text-[10px]" />
                  قدّم الآن
                </button>
              </div>
            </div>
          </div>
          <div
            className={`${
              isOpenApplayModel ? "flex" : "hidden"
            } fixed inset-0 z-[500] items-center justify-center bg-[rgba(0,0,0,0.66)]`}
          >
            <div className="w-[720px] absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] max-w-[85%] sm:max-w-[94%] rounded-xl bg-white p-[18px] shadow-[0_16px_60px_rgba(2,6,23,0.5)]">
              {/* Header */}
              <header className="flex items-center justify-between">
                <h3 className="sm:text-lg font-semibold">تقديم على الفرصة</h3>
                <button
                  className="cursor-pointer border-0 bg-transparent text-[26px]"
                  onClick={() => setIsOpenApplayModel(false)}
                >
                  &times;
                </button>
              </header>

              {/* Form */}
              <form className="mt-4 space-y-3">
                <label className="block text-[12px] sm:text-sm text-gray-500">
                  السيرة الذاتية (PDF) — (اختياري) (
                  <span className="text-gray-700 text-[10px] sm:text-[12px]">
                    يمكنك تحديثها من صفحة البروفايل!
                  </span>
                  )
                </label>
                <p
                  className={`${
                    user.cv.data ? "bg-green-500 text-white" : "bg-[#f9fafb]"
                  } rounded-[10px] border border-[#e5e7eb] p-2 sm:p-3 text-[14px] sm:text-[16px]`}
                >
                  {user.cv.data
                    ? `${user.cv.name} — تم رفعه ${new Date(
                        user.cv.uploadedAt
                      ).toLocaleString()}`
                    : "لم يتم رفع سيرة ذاتية بعد."}
                </p>

                <label className="block text-[12px] sm:text-sm text-gray-500">
                  خطاب التقديم (جملة قصيرة)
                </label>
                <textarea
                  rows="5"
                  placeholder="اكتب رسالة قصيرة تبين اهتمامك..."
                  className="w-full text-[12px] sm:text-[16px] min-h-[110px] resize-y rounded-lg border border-black/10 p-2 focus:outline-blue-600"
                />

                {/* Actions */}
                <div className="mt-4 flex gap-3">
                  <button
                    type="button"
                    className="rounded-lg bg-blue-600 px-4 py-2 h-[35px] text-[12px] font-semibold text-white hover:bg-blue-500"
                    onClick={() => {
                      !user.opportunities.applied.some((s) => s == id)
                        ? updateUsers({
                            ...user,
                            opportunities: {
                              ...user.opportunities,
                              applied: [...user.opportunities.applied, id],
                            },
                          })
                        : updateUsers({
                            ...user,
                            opportunities: {
                              ...user.opportunities,
                              applied: [
                                ...user.opportunities.applied.map((u) =>
                                  u == id ? id : u
                                ),
                              ],
                            },
                          });
                      setIsOpenApplayModel(false);
                    }}
                  >
                    أرسل الطلب
                  </button>

                  <button
                    type="button"
                    className="rounded-lg border border-blue-600 px-4 py-2 h-[35px] text-[12px] font-semibold hover:bg-blue-200"
                    onClick={() => setIsOpenApplayModel(false)}
                  >
                    إلغاء
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* GRID */}
        <section className="grid grid-cols-[1fr_340px] gap-5 mt-5 max-[980px]:grid-cols-1 pb-[60px]">
          {/* MAIN */}
          <article
            className="bg-white p-[18px] pt-10 rounded-xl shadow border border-black/5 transition-all duration-300
  hover:-translate-y-1 hover:shadow-xl"
          >
            <h3 className="font-bold mb-2 text-lg">وصف الفرصة</h3>
            <p className="leading-[1.8] text-[13px] sm:text-[16px]">
              {oppDetails.description}
            </p>

            <div className="flex gap-6 flex-wrap mt-8">
              <div>
                <h4 className="font-bold mb-4 text-[14px] sm:text-[16px]">
                  المهام المتوقعة
                </h4>
                <ul className="list-disc pr-10">
                  {oppDetails.responsibilities.map((re, i) => {
                    return (
                      <li key={i} className="text-[14px] sm:text-[16px]">
                        {re}
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-4 text-[14px] sm:text-[16px]">
                  متطلبات التدريب
                </h4>
                <ul className="list-disc pr-10">
                  {oppDetails.requirements.map((re, i) => {
                    return (
                      <li key={i} className="text-[14px] sm:text-[16px]">
                        {re}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>

            <h4 className="font-bold mt-8 text-[14px] sm:text-[16px]">
              المهارات المطلوبة
            </h4>
            <div className="flex gap-2 flex-wrap my-2">
              {oppDetails.skills.map((re, i) => {
                return (
                  <span
                    key={i}
                    className="bg-[#eef4ff] text-[#1250d2] px-[10px] py-[6px] rounded-full font-semibold text-[13px]"
                  >
                    {re}
                  </span>
                );
              })}
            </div>

            <h4 className="font-bold my-4 text-[14px] sm:text-[16px]">
              مزايا التدريب
            </h4>
            <ul className="list-disc pr-10">
              {oppDetails.benefits.map((re, i) => {
                return (
                  <li key={i} className="text-[14px] sm:text-[16px]">
                    {re}
                  </li>
                );
              })}
            </ul>

            <h4 className="font-bold mt-8 text-[14px] sm:text-[16px]">
              معلومات إضافية
            </h4>

            <div className="grid grid-cols-2 text-[13px] sm:text-[16px] gap-2 bg-[#fbfcff] p-3 rounded-lg border border-black/5 mt-4">
              <div>
                <strong>نوع التقديم:</strong> عن بُعد
              </div>
              <div>
                <strong>مدة التدريب:</strong> {oppDetails.duration}
              </div>
              <div>
                <strong>اللغة:</strong> {oppDetails.language}
              </div>
            </div>

            {/* RELATED */}
            <div className="mt-4">
              <h4 className="font-bold text-[14px] sm:text-[16px]">
                فرص مشابهة
              </h4>
              <div className="flex flex-col gap-2 pt-5">
                {opportunities
                  .filter((o) => o.generalField === oppDetails.generalField).slice(0,3)
                  .map((opp) => {
                    return (
                      <div onClick={() => navigate(`/opportunity-details/${opp.id}`)} className="flex items-center gap-4 bg-blue-600/5 rounded-[10px] hover:bg-blue-500 hover:border-blue-200 border-white border-2 z-[10] hover:text-white group cursor-pointer hover:translate-x-[-10px] hover:translate-y-[-5px] duration-300">
                        <h1 className="w-20 h-20 float-left bg-white rounded-[10px] text-center text-[10px] flex items-center justify-center font-bold text-blue-600 border-2 border-blue-600">
                          {opp.major}
                        </h1>
                        <div>
                          <h3 className="font-bold text-blue-600 group-hover:text-white duration-300">{opp.company}</h3>
                          <p className="text-[14px]">{opp.major} — {opp.location}</p>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </article>

          {/* SIDE */}
          <aside
            className="space-y-3 bg-white rounded-xl p-4 shadow border border-black/5 transition-all duration-300
  hover:-translate-y-1 hover:shadow-xl"
          >
            {/* COMPANY */}
            <div className="p-3 py-10 rounded-xl ">
              <h1 className="w-20 h-20 float-left rounded-[10px] text-center text-[10px] flex items-center justify-center font-bold text-blue-600 border-2 border-blue-600">
                {oppDetails.company}
              </h1>
              <h4 className="font-bold ">{oppDetails.company}</h4>
              <p className="text-sm text-[#6b7280] my-4">
                {oppDetails.description}
              </p>
              <p className="text-sm">
                <strong>الموقع:</strong> {oppDetails.location}
              </p>
              <p className="text-sm my-4">
                <strong>الموقع الإلكتروني:</strong>{" "}
                <a className="text-[#3a6cff]">{oppDetails.companySite}</a>
              </p>
            </div>

            {/* RECRUITER */}
            <div className="p-3 border rounded-lg">
              <h5 className="font-bold mb-1 text-[14px] sm:text-[16px]">
                مسؤول التوظيف
              </h5>
              <p>{oppDetails.recruiter.name}</p>
              <a className="text-[#3a6cff] text-[13px] inline-block mt-1 cursor-pointer">
                {oppDetails.recruiter.email}
              </a>
            </div>

            {/* NOTES */}
            <div className="p-3 border rounded-lg">
              <h5 className="font-bold mb-2 text-[14px] sm:text-[16px]">
                ملاحظات سريعة
              </h5>
              <ul className="list-disc pr-4 text-sm text-[#6b7280]">
                <li>يفضل إجادة العمل الجماعي</li>
                <li>المقابلات عبر الإنترنت</li>
                <li>مقبول للطلاب والخريجين</li>
              </ul>
            </div>

            {/* MAP */}
            <div className="p-3 border rounded-lg">
              <h5 className="font-bold my-4 text-[14px]">موقع تقريبي</h5>
              <div className="p-3 py-16 border rounded-lg text-center text-[#6b7280] bg-gradient-to-r from-[#f0f4ff] to-white">
                خريطة (الموقع غير مضاف حالياً)
              </div>
            </div>
          </aside>
        </section>
      </main>
    </div>
  );
}

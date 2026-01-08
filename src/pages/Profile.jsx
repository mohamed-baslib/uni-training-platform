import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";
import { opportunities } from "../data/opportunities";
import { useState } from "react";
import EditProfileModal from "../components/EditProfileModal";
const allOpp = opportunities;
const personalInfoFields = [
  { label: "البريد", key: "email" },
  { label: "الهاتف", key: "phone" },
  { label: "العمر", key: "age" },
  { label: "الجنس", key: "gender" },
  { label: "الدولة", key: "country" },
];

const academicInfoFields = [
  { label: "الجامعة", key: "university" },
  { label: "التخصص", key: "spec" },
  { label: "المستوى", key: "level" },
  { label: "GPA", key: "gpa" },
  { label: "المهارات", key: "skills" },
  { label: "الدورات", key: "courses" },
];

export default function Profile() {
  const { user, updateUsers } = useAuth();
  const [isopenEditProfile, setIsOpenEditProfile] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  // دالة رفع صورة للبروفايل
  function handleFileChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Image = reader.result;

      // حفظها مع المستخدم
      updateUsers({
        ...user,
        profile: { ...user.profile, avatar: base64Image },
      });
    };

    reader.readAsDataURL(file);
  }

  // دالة رفع السيرة الذاتية
  function handleCvChange(e) {
    const input = e.target;
    const file = input.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      updateUsers({
        ...user,
        cv: {
          name: file.name,
          data: reader.result,
          uploadedAt: Date.now(),
        },
      });
      input.value = "";
    };
    reader.readAsDataURL(file);
  }

  // دالة تحميل السيرة الذاتية
  function handleDownloadCv() {
    const link = document.createElement("a");
    link.href = user.cv.data; // base64 PDF
    link.download = user.cv.name; // اسم الملف
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  return (
    <div dir="rtl" className={`${user.id === 0 ? "hidden" : "block"}`}>
      {/* HEADER */}
      <header className="flex items-center justify-between px-[15px] sm:px-[30px] py-[20px] bg-white border-b-[3px] border-blue-600">
        <h3 className="font-bold sm:text-xl flex items-center">
          <i className="fa-solid fa-align-left ml-2 sm:text-2xl"></i>
          البروفايل الشخصي
        </h3>

        <a
          href="#"
          className="font-bold text-blue-600 sm:text-lg"
          onClick={() => history.back()}
        >
          ← العودة
        </a>
      </header>

      {/* ---------- Profile Wrapper ----------  */}
      <main className=" py-[26px] pb-[80px] px-[20px] sm:px-[80px] relative rtl bg-[#f5f7fb] text-[#1f2937] font-['Tajawal'] animate-fadeIn">
        {/* Header */}
        <section className="flex gap-[22px] items-center mb-[18px]">
          <div className="relative">
            {user.profile.avatar ? (
              <img
                src={user.profile.avatar}
                alt="student-photo"
                className="w-[80px] h-[80px] sm:w-[120px] sm:h-[120px] rounded-full object-cover border-[3px] border-blue-600"
              />
            ) : (
              <i className="fa-solid fa-circle-user text-[80px] sm:text-[120px] text-blue-600 w-full h-full flex justify-center items-center"></i>
            )}

            {/* تغيير او حذف صورة البروفايل */}
            <div className="relative">
              {/* زر الكاميرا */}
              <div
                title="تعديل الصورة"
                className="w-[35x] h-[35px] text-[15px] z-10 absolute bottom-[-6px] left-[0px] text-blue-600 bg-white border-blue-600 border-2 cursor-pointer p-[7px] rounded-xl shadow-lg hover:text-blue-300"
                onClick={() => setOpen(!open)}
              >
                <i className="fa-solid fa-camera-rotate"></i>
              </div>

              {/* القائمة */}
              <div
                className={`
          absolute right-16 bottom-4 lg:bottom-[8px] lg:right-[112px] z-30 w-44 overflow-hidden rounded-xl bg-white shadow-xl
          transition-all duration-300 ease-out 
          ${
            open
              ? "scale-100 opacity-100 translate-y-0"
              : "scale-95 opacity-0 translate-y-2 pointer-events-none "
          }
          `}
              >
                <label
                  className="flex w-full items-center gap-2 px-4 py-3 text-sm hover:bg-blue-100 cursor-pointer"
                  htmlFor="profile-image"
                >
                  <input
                    accept="image/*"
                    type="file"
                    id="profile-image"
                    className="w-full absolute left-0 top-0 hidden"
                    onChange={handleFileChange}
                    onClick={() => setOpen(false)}
                  />
                  <i className="fa-solid fa-image text-blue-600"></i>
                  تغيير الصورة
                </label>

                <button
                  onClick={() => {
                    if (user.profile.avatar) {
                      setOpen(false);
                      updateUsers({
                        ...user,
                        profile: { ...user.profile, avatar: "" },
                      });
                    }
                  }}
                  className={`${
                    user.profile.avatar
                      ? "text-red-600 hover:bg-blue-100"
                      : "text-gray-500 cursor-default bg-gray-200"
                  } flex w-full items-center gap-2 px-4 py-3 text-sm`}
                >
                  <i className="fa-solid fa-trash"></i>
                  حذف الصورة
                </button>
              </div>
            </div>
            {/*  */}
          </div>

          <div>
            <h2 className="text-[20px] sm:text-[24px] font-semibold">
              {user.profile.name}
            </h2>
            <p className="text-[#6b7280] my-[6px]">
              {user.profile.spec || user.profile.university
                ? `${user.profile.spec} • ${user.profile.university}`
                : ""}
            </p>

            <div className="flex gap-[10px] mt-[8px]">
              <button
                className="text-[12px] h-[40px] px-[14px] py-[10px] rounded-[10px] font-semibold bg-blue-600 text-white shadow-md hover:bg-blue-500"
                onClick={() => setIsOpenEditProfile(true)}
              >
                <i className="fas fa-user-edit"></i> تعديل البروفايل
              </button>

              <button
                className={`${
                  user.cv.data ? "block" : "hidden"
                } text-[12px] h-[40px] px-[14px] py-[10px] rounded-[10px] font-semibold border border-blue-600 hover:bg-blue-200`}
                onClick={handleDownloadCv}
              >
                <i className="fas fa-file-download"></i> تحميل السيرة الذاتية
              </button>
            </div>
          </div>
        </section>

        {/* Columns */}
        <section className="flex flex-col lg:flex-row gap-[20px] items-start mt-10">
          {/* Left */}
          <div className="flex-1 w-full">
            <div className="bg-white p-[18px] rounded-[14px] shadow border border-[#e5e7eb] mb-[18px]  transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <h3 className="sm:text-[18px] mb-[12px] font-semibold">
                <i className="fas fa-id-card"></i> المعلومات الشخصية
              </h3>

              <div>
                {personalInfoFields.map((item, index) => (
                  <div
                    key={index}
                    className="text-[13px] sm:text-[16px] py-[8px] border-b border-dashed border-[#e5e7eb] last:border-none"
                  >
                    <strong>{item.label}:</strong>{" "}
                    {user.profile[item.key] || user.auth[item.key] || ""}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-[18px] rounded-[14px] shadow border border-[#e5e7eb]  transition-all duration-300
  hover:-translate-y-1 hover:shadow-lg">
              <h3 className="sm:text-[18px] mb-[12px] font-semibold">
                <i className="fas fa-graduation-cap"></i> البيانات الأكاديمية
              </h3>

              <div>
                {academicInfoFields.map((item, index) => (
                  <div
                    key={index}
                    className="text-[13px] sm:text-[16px] py-[8px] border-b border-dashed border-[#e5e7eb] last:border-none"
                  >
                    <strong dir="rtl">{item.label}:</strong>{" "}
                    {item.key !== "skills" && item.key !== "courses" ? (
                      user.profile[item.key] || ""
                    ) : (
                      <div className="flex flex-wrap gap-2 p-2">
                        {user.profile[item.key] == ""
                          ? ""
                          : user.profile[item.key].split(",").map((sk, ind) => {
                              return (
                                <span
                                  key={ind}
                                  className="bg-blue-500 text-white text-[12px] mx-1 font-bold p-1 px-2 text-center rounded-full"
                                >
                                  {sk}
                                </span>
                              );
                            })}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="flex-1 w-full">
            <div className="bg-white p-[18px] rounded-[14px] shadow border border-[#e5e7eb] mb-[18px]  transition-all duration-300
  hover:-translate-y-1 hover:shadow-lg">
              <h3 className="sm:text-[18px] mb-[12px] font-semibold">
                <i className="fas fa-file-alt"></i> السيرة الذاتية (CV)
              </h3>

              <p
                className={`${
                  user.cv.data ? "bg-blue-500 text-white" : "bg-[#f9fafb]"
                } text-[13px] sm:text-[16px] rounded-[10px] border border-[#e5e7eb] p-3`}
              >
                {user.cv.data
                  ? `${user.cv.name} — تم رفعه ${new Date(
                      user.cv.uploadedAt
                    ).toLocaleString()}`
                  : "لم يتم رفع سيرة ذاتية بعد."}
              </p>

              <div className="flex gap-[10px] mt-[12px]">
                <label
                  htmlFor="upload-cv"
                  className="cursor-pointer relative text-[10px] sm:text-[12px] sm:h-[40px] sm:w-[180px] px-[14px] py-[10px] rounded-[10px] border border-blue-600 font-semibold hover:bg-blue-200"
                >
                  <input
                    type="file"
                    accept=".pdf"
                    id="upload-cv"
                    className="absolute hidden w-full h-full left-0 top-0 "
                    onChange={handleCvChange}
                  />
                  <i className="fas fa-upload"></i> رفع السيرة الذاتية (PDF)
                </label>
                <button
                  className={`${
                    user.cv.data ? "block" : "hidden"
                  } text-[12px] h-[40px] px-[14px] py-[10px] rounded-[10px] bg-[#dc2626] text-white font-semibold`}
                  onClick={() =>
                    updateUsers({
                      ...user,
                      cv: { name: "", data: null, uploadedAt: "" },
                    })
                  }
                >
                  <i className="fas fa-trash"></i> حذف
                </button>
              </div>
            </div>

            <div className="bg-white p-[18px] rounded-[14px] shadow border border-[#e5e7eb] mb-[18px]  transition-all duration-300
  hover:-translate-y-1 hover:shadow-lg">
              <h3 className="sm:text-[18px] mb-[12px] font-semibold">
                <i className="fas fa-bookmark"></i> الفرص التي حفظتها
              </h3>
              <ul className="">
                {user.opportunities.saved.length > 0 ? (
                  user.opportunities.saved.map((s, index) => {
                    return (
                      <li
                        key={index}
                        className="text-[12px] sm:text-[16px] font-bold p-2 rounded-[10px] bg-[#f9fafb] flex justify-between items-center mb-2.5 border border-[#e5e7eb]"
                      >
                        {allOpp[s - 1].major} — {allOpp[s - 1].company}{" "}
                        <div className="flex items-center gap-x-2">
                          {/* ايقونة عرض التفاصيل */}
                          <i
                            className="fa-solid fa-eye w-8 h-8 text-blue-600 border-blue-600 border-2 p-2 text-[12px] rounded-lg cursor-pointer hover:text-blue-300"
                            title="عرض"
                            onClick={() =>
                              navigate(`/opportunity-details/${s}`)
                            }
                          ></i>

                          {/* ايقونة الحفظ */}
                          <i
                            className="fas fa-bookmark w-8 h-8 text-blue-600 border-blue-600 border-2 p-2 text-[12px] rounded-lg cursor-pointer hover:text-blue-300"
                            title="عدم الحفظ"
                            onClick={() =>
                              updateUsers({
                                ...user,
                                opportunities: {
                                  ...user.opportunities,
                                  saved: user.opportunities.saved.filter(
                                    (opp) => opp !== s
                                  ),
                                },
                              })
                            }
                          ></i>
                        </div>
                      </li>
                    );
                  })
                ) : (
                  <li className="text-[13px] sm:text-[16px] p-3 rounded-[10px] bg-[#f9fafb] flex justify-between items-center mb-2.5 border border-[#e5e7eb]">
                    لم تحفظ أي فرصة بعد.
                  </li>
                )}
              </ul>
            </div>

            <div className="bg-white p-[18px] rounded-[14px] shadow border border-[#e5e7eb]  transition-all duration-300
  hover:-translate-y-1 hover:shadow-lg">
              <h3 className="sm:text-[18px] mb-[12px] font-semibold">
                <i className="fas fa-briefcase"></i> الفرص التي تقدمت لها
              </h3>
              <ul>
                {user.opportunities.applied.length > 0 ? (
                  user.opportunities.applied.map((s, index) => {
                    return (
                      <li
                        key={index}
                        className="text-[12px] sm:text-[16px] font-bold p-2 rounded-[10px] bg-[#f9fafb] flex justify-between items-center mb-2.5 border border-[#e5e7eb]"
                      >
                        <p className="w-1/2">
                          {allOpp[s - 1].major} — {allOpp[s - 1].company}{" "}
                        </p>
                        <div className="w-[120px] sm:w-[150px] justify-end flex items-center gap-x-2">
                          <div className="bg-gray-400 text-center text-white p-2 leading-4 rounded-lg text-[10px] sm:text-[12px] font-bold">
                            قيد المراجعة
                          </div>

                          <i
                            className="fa-solid fa-trash-can w-8 h-8 text-blue-600 border-blue-600 border-2 p-2 text-[14px] rounded-lg cursor-pointer hover:text-blue-300"
                            title="حذف"
                            onClick={() =>
                              updateUsers({
                                ...user,
                                opportunities: {
                                  ...user.opportunities,
                                  applied: [
                                    ...user.opportunities.applied.filter(
                                      (u) => u != s
                                    ),
                                  ],
                                },
                              })
                            }
                          ></i>
                        </div>
                      </li>
                    );
                  })
                ) : (
                  <li className="text-[13px] sm:text-[16px] p-3 rounded-[10px] bg-[#f9fafb] flex justify-between items-center mb-2.5 border border-[#e5e7eb]">
                    لم تقدّم على أي فرصة بعد.
                  </li>
                )}
              </ul>
            </div>
          </div>
        </section>
      </main>
      <EditProfileModal
        isOpen={isopenEditProfile}
        onClose={() => setIsOpenEditProfile(false)}
        user={user}
        onSave={updateUsers}
      />
    </div>
  );
}

import { useEffect, useState } from "react";

export default function EditProfileModal({ isOpen, onClose, user, onSave }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    university: "",
    level: "",
    spec: "",
    gpa: "",
    country: "",
    gender: "",
    skills: "",
    courses: "",
  });

  /* تعبئة النموذج عند فتح المودال */
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.profile.name || "",
        email: user.auth.email || "",
        phone: user.profile.phone || "",
        university: user.profile?.university || "",
        age: user.profile?.age || "",
        level: user.profile?.level || "",
        spec: user.profile?.spec || "",
        gpa: user.profile?.gpa || "",
        country: user.profile?.country || "",
        gender: user.profile?.gender || "",
        skills: user.profile.skills,
        courses: user.profile.courses,
      });
    }
  }, [user, isOpen]);
  if (!isOpen) return null;

  /* تحديث الحقول */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* حفظ */
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData.skills);
    const updatedUser = {
      ...user,
      auth: { ...user.auth, email: formData.email },
      profile: {
        ...user.profile,
        phone: formData.phone,
        name: formData.name,
        university: formData.university,
        level: formData.level,
        age: formData.age,
        spec: formData.spec,
        gpa: formData.gpa,
        country: formData.country,
        gender: formData.gender,
        skills: formData.skills,
        courses: formData.courses,
      },
    };
    onSave(updatedUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-center bg-black/70 backdrop-blur-sm overflow-y-auto">
      <div className="w-[90%] sm:w-[70%] max-w-[96%] my-10 max-h-[90vh] overflow-y-auto rounded-2xl bg-white pb-10">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between sticky top-0 bg-blue-600 text-white z-10 py-6 px-10">
          <h3 className="text-lg font-semibold">تعديل البروفايل</h3>
          <button onClick={onClose} className="text-white hover:text-black">
            <i className="fas fa-times"></i>
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-2 flex flex-wrap items-center gap-2 px-10"
        >
          {/* الاسم */}
          <div className="w-full">
            <label className="mb-1 block text-sm">الاسم الكامل</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full text-[12px] sm:text-[16px] rounded-xl border px-3 py-2 bg-blue-50 text-black focus:outline-blue-600 focus:text-black focus:bg-white"
              required
            />
          </div>

          {/* الايميل */}
          <div className="w-full">
            <label className="mb-1 block text-sm">البريد الإلكتروني</label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full text-[12px] sm:text-[16px] rounded-xl border px-3 py-2 bg-blue-50 text-black focus:outline-blue-600 focus:text-black focus:bg-white"
              required
            />
          </div>

          {/* العمر*/}
          <div className="w-1/3 sm:w-1/5">
            <label className="mb-1 block text-sm">العمر</label>
            <input
              type="number"
              inputMode="numeric"
              pattern="[0-9]*"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="w-full text-[12px] sm:text-[16px] rounded-xl border px-3 py-2 bg-blue-50 text-black focus:outline-blue-600 focus:text-black focus:bg-white"
            />
          </div>
          {/* الدولة */}
          <div className="w-1/3 sm:w-1/4">
            <label className="mb-1 block text-sm">الدولة</label>
            <input
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="w-full text-[12px] sm:text-[16px] rounded-xl border px-3 py-2 bg-blue-50 text-black focus:outline-blue-600 focus:text-black focus:bg-white"
            />
          </div>

          {/* الهاتف */}
          <div className="sm:w-1/3">
            <label className="mb-1 block text-sm">الهاتف</label>
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full text-[12px] sm:text-[16px] rounded-xl border px-3 py-2 bg-blue-50 text-black focus:outline-blue-600 focus:text-black focus:bg-white"
            />
          </div>

          {/* gender */}
          <div className="w-full">
            <label className="mb-1 block text-sm">الجنس</label>

            <div className="flex gap-6">
              <label className="text-[12px] sm:text-[16px] flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value="ذكر"
                  checked={formData.gender === "ذكر"}
                  onChange={handleChange}
                />
                ذكر
              </label>

              <label className="text-[12px] sm:text-[16px] flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value="أنثى"
                  checked={formData.gender === "أنثى"}
                  onChange={handleChange}
                />
                أنثى
              </label>

              <label className="text-[12px] sm:text-[16px] flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value="غير محدد"
                  checked={formData.gender === "غير محدد"}
                  onChange={handleChange}
                />
                غير محدد
              </label>
            </div>
          </div>

          {/* جامعة + مستوى */}

          <div className="sm:w-1/2">
            <label className="mb-1 block text-sm">الجامعة</label>
            <input
              name="university"
              value={formData.university}
              onChange={handleChange}
              className="w-full text-[12px] sm:text-[16px] rounded-xl border px-3 py-2 bg-blue-50 text-black focus:outline-blue-600 focus:text-black focus:bg-white"
            />
          </div>
          {/* تخصص */}
          <div className="sm:w-1/2">
            <label className="mb-1 block text-sm">التخصص</label>
            <input
              name="spec"
              value={formData.spec}
              onChange={handleChange}
              className="w-full text-[12px] sm:text-[16px] rounded-xl border px-3 py-2 bg-blue-50 text-black focus:outline-blue-600 focus:text-black focus:bg-white"
            />
          </div>

          <div className="sm:w-1/3">
            <label className="mb-1 block text-sm">المستوى</label>
            <select
              name="level"
              value={formData.level}
              onChange={handleChange}
              className="w-full text-[12px] sm:text-[16px] rounded-xl border px-3 py-2 bg-blue-50 text-black focus:outline-blue-600 focus:text-black focus:bg-white"
            >
              <option value="">اختر المستوى</option>
              <option>سنة أولى</option>
              <option>سنة ثانية</option>
              <option>سنة ثالثة</option>
              <option>سنة رابعة</option>
              <option>خريج</option>
            </select>
          </div>

          {/* GPA + الدولة */}
          <div>
            <label className="mb-1 block text-sm">GPA</label>
            <input
              name="gpa"
              value={formData.gpa}
              onChange={handleChange}
              className="w-full text-[12px] sm:text-[16px] rounded-xl border px-3 py-2 bg-blue-50 text-black focus:outline-blue-600 focus:text-black focus:bg-white"
            />
          </div>

          {/* المهارات */}
          <div className="w-full">
            <label className="mb-1 block text-sm">
              المهارات #افصلهم بـفاصلة <b>(المهارة1, المهارة2, ...)</b>
            </label>
            <input
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              className="w-full text-[12px] sm:text-[16px] rounded-xl border px-3 py-2 bg-blue-50 text-black focus:outline-blue-600 focus:text-black focus:bg-white"
            />
          </div>

          {/* الدورات */}
          <div className="w-full">
            <label className="mb-1 block text-sm">
              الدورات #افصلهم بـفاصلة <b>(الدورة1, الدورة2, ...)</b>
            </label>{" "}
            <input
              name="courses"
              value={formData.courses}
              onChange={handleChange}
              className="w-full text-[12px] sm:text-[16px] rounded-xl border px-3 py-2 bg-blue-50 text-black focus:outline-blue-600 focus:text-black focus:bg-white"
            />
          </div>

          {/* Actions */}
          <div className="pt-4">
            <button className="rounded-xl bg-blue-600 px-6 py-2 text-white hover:bg-blue-700">
              <i className="fas fa-save ml-2"></i>
              حفظ التغييرات
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

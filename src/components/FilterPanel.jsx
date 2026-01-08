export default function FilterPanel({
  isOpen,
  onClose,
  tempFilters,
  setTempFilters,
  onApply,
  onReset,
}) {
  return (
    <>
      {/* Overlay */}
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } fixed inset-0 bg-black/50 z-[1000]`}
        onClick={onClose}
      />

      {/* Panel */}
      <aside
        className={` ${
          isOpen
            ? "sm:translate-x-0"
            : "translate-y-[100%] sm:translate-y-0 sm:translate-x-[100%]"
        }
        fixed z-[1001] bg-white text-black
        w-full sm:w-[340px] bottom-0 rounded-t-2xl p-5
        sm:top-0 sm:right-0 sm:h-screen  sm:rounded-none
        duration-500 sm:duration-1000 transition-all
      `}
      >
        {/* Header */}
        <header className="flex justify-between items-center mb-5">
          <h3 className="sm:text-lg font-bold">تصفية الفرص</h3>
          <button onClick={onClose} className="text-xl">
            ✕
          </button>
        </header>

        {/* الدولة */}
        <FilterSelect
          label="مجال الفرص"
          value={tempFilters.generalField}
          onChange={(v) => setTempFilters({ ...tempFilters, generalField: v })}
          options={[
            "كل المجالات",
            "التقنية والبرمجة",
            "التصميم والمونتاج",
            "التسويق والإعلام",
            "إدارة الأعمال",
            "التعليم والتدريب",
            "العمل التطوعي",
            "الهندسة",
            "الصحة",
            "القانون",
            "الترجمة واللغات",
            "الكتابة وصناعة المحتوى",
            "خدمة العملاء",
            "المحاسبة والمبيعات",
          ]}
        />

        {/* الدولة */}
        <FilterSelect
          label="الدولة"
          value={tempFilters.country}
          onChange={(v) => setTempFilters({ ...tempFilters, country: v })}
          options={[
            "اليمن",
            "السعودية",
            "الإمارات",
            "الأردن",
            "مصر",
            "تركيا",
            "ألمانيا",
            "الولايات المتحدة",
            "عن بُعد",
            "الكل",
          ]}
        />

        {/* نوع التدريب */}
        <FilterSelect
          label="نوع التدريب"
          value={tempFilters.trainType}
          onChange={(v) => setTempFilters({ ...tempFilters, trainType: v })}
          options={[
            "دوام كامل",
            "دوام جزئي",
            "تدريب أونلاين",
            "تدريب ميداني",
            "تدريب تعاوني",
            "الكل",
          ]}
        />

        {/* التكلفة */}
        <FilterSelect
          label="التكلفة"
          value={tempFilters.costs}
          onChange={(v) => setTempFilters({ ...tempFilters, costs: v })}
          options={["الكل", "مجاني", "مدفوع"]}
        />

        {/* التكلفة */}
        <FilterSelect
          label="المدة"
          value={tempFilters.period}
          onChange={(v) => setTempFilters({ ...tempFilters, period: v })}
          options={["أقل من شهر", "1 – 3 أشهر", "أكثر من 3 أشهر", "الكل"]}
        />

        {/* Footer */}
        <footer className="my-5 flex flex-col gap-3 text-[14px]">
          <button
            onClick={onApply}
            className="flex-1 bg-blue-600 border border-blue-600 text-white p-[5px] sm:py-2 rounded-lg font-bold"
          >
            تطبيق
          </button>

          <button
            onClick={onReset}
            className="flex-1 border border-blue-600 text-blue-600 p-[5px] sm:py-2 rounded-lg font-bold"
          >
            إعادة تعيين
          </button>
        </footer>
      </aside>
    </>
  );
}

/* عنصر مساعد */
function FilterSelect({ label, options, value, onChange }) {
  return (
    <div className="mb-4">
      <label className="block mb-1 font-bold text-[14px]">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-blue-200 text-black p-1 sm:p-2 text-[14px] rounded-lg"
      >
        {options.map((op) => (
          <option className="bg-white" key={op}>
            {op}
          </option>
        ))}
      </select>
    </div>
  );
}

import { useEffect, useRef, useState } from "react";
import FilterPanel from "./FilterPanel";

const generalFields = [
  "كل المجالات",
  "التقنية والبرمجة",
  "التصميم والمونتاج",
  "التسويق والإعلام",
  "إدارة الأعمال",
  "التعليم والتدريب",
  "العمل التطوعي",
  "الترجمة واللغات",
  "الكتابة وصناعة المحتوى",
  "المحاسبة والمبيعات",
];

const defaultFilters = {
  generalField: "كل المجالات",
  search: "",
  country: "الكل",
  costs: "الكل",
  trainType: "الكل",
  period: "الكل",
};

export default function SearchBar({ displayOpportunities }) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const listRef = useRef(null);
  const [filters, setFilters] = useState(defaultFilters);
  const [tempFilters, setTempFilters] = useState("");

  const [inputSearch, setInputSearch] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      displayOpportunities(filters);
    }, 500);
    return () => clearTimeout(timeout);
  }, [filters, displayOpportunities]);


  const scroll = (dir) => {
    const amount = 300; // مقدار التحريك
    listRef.current.scrollBy({
      left: dir === "right" ? amount : -amount,
      behavior: "smooth",
    });
  };

  const applyFilters = () => {
    setIsFilterOpen(false);
    setFilters(tempFilters);
  };

  const resetFilters = () => {
    setTempFilters(defaultFilters);
    setFilters(defaultFilters);
    setIsFilterOpen(false);
  };

  return (
    <>
      <div className="hidden md:flex relative mt-[100px] w-[80%] flex-row-reverse mx-auto gap-x-4">
        {/* سهم يسار */}
        <button
          onClick={() => scroll("left")}
          className="w-[30px] h-[30px] text-[12px] md:text-[16px] md:w-[35px] md:h-[35px] leading-4 text-center absolute left-0 top-1/2 -translate-y-1/2 z-10
        bg-white/50 hover:bg-white/80 shadow rounded-full p-2 hover:z-20"
        >
          <i className="fas fa-chevron-left"></i>
        </button>
        {/* الظل الأيسر */}
        <div className="pointer-events-none absolute left-6 top-0 z-1 h-full w-10 rounded-lg bg-gradient-to-r from-[#1d3884] to-transparent" />

        <div
          ref={listRef}
          className="w-[75%] md:w-[93%] px-6 flex flex-row-reverse whitespace-nowrap overflow-x-auto scroll-smooth scrollbar-hide touch-pan-x gap-x-5 mr-10"
        >
          {/* قائمة المجالات الخاصة بالفرص */}
          {generalFields.map((field, ind) => {
            return (
              <div
                key={ind}
                onClick={() => {
                  const changeGeneralField = {
                    ...defaultFilters,
                    search: inputSearch.toLowerCase().trim(),
                    generalField: field,
                  };
                  setFilters(changeGeneralField);
                }}
                className={`${
                  filters.generalField === field
                    ? "bg-blue-600"
                    : "bg-transparent"
                } h-[35px] sm:h-[45px] flex-shrink-0 pt-[8px] px-[15px] text-white sm:px-[12p] border border-blue-600 rounded-[10px] cursor-pointer transition duration-300 text-[11px] sm:text-[16px]`}
              >
               فرص في {field}
              </div>
            );
          })}
        </div>

        {/* سهم يمين */}
        <button
          onClick={() => scroll("right")}
          className="w-[30px] h-[30px] text-[12px] md:text-[16px] md:w-[35px] md:h-[35px] leading-4 absolute right-0 top-1/2 -translate-y-1/2 z-10
        bg-white/50 hover:bg-white/80 shadow rounded-full p-2 hover:z-20"
        >
          <i className="fas fa-chevron-right"></i>
        </button>
        {/* الظل الأيمن */}
        <div className="pointer-events-none absolute right-6 top-0 z-1 h-full w-10 rounded-lg bg-gradient-to-l from-[#0a142e] to-transparent" />
      </div>

      {/* search bar */}
      <div className="pt-[50px] pb-[20px] flex flex-col items-center">
        <div className="w-[80%] h-[40px] sm:h-[45px] bg-white rounded-[10px] overflow-hidden relative flex justify-between items-center">
          <button
            title="بحث متقدم"
            className="flex w-[11%] h-[45px] rounded-[10px] justify-center items-center gap-x-1 p-[10px] bg-white text-blue-600 border-none cursor-pointer font-bold text-[13px]"
            onClick={() => {
              setTempFilters(filters);
              setIsFilterOpen(!isFilterOpen);
            }}
          >
            <span className="hidden sm:block">تصفية</span>{" "}
            <i className="text-[16px] fa-solid fa-sliders"></i>
          </button>
          <input
            dir="rtl"
            value={inputSearch}
            className="w-[89%] sm:w-[85%] h-full px-[30px] pl-[15px] py-[12px] text-[13px] md:text-[17px] border-none outline-none absolute right-0"
            type="search"
            placeholder="قم بالبحث عن التدريب المناسب لك"
            onChange={(e) => {
              setInputSearch(e.target.value);
              setFilters({
                ...filters,
                search: e.target.value.toLowerCase().trim(),
              });
            }}
          />
        </div>
      </div>

      {/* الفلتر */}
      <FilterPanel
        isOpen={isFilterOpen}
        onClose={() => {
          setIsFilterOpen(false);
          setTempFilters(filters);
        }}
        filters={filters}
        tempFilters={tempFilters}
        setTempFilters={setTempFilters}
        onApply={applyFilters}
        onReset={resetFilters}
      />
    </>
  );
}

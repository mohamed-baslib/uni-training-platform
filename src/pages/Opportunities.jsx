import { useState, useCallback } from "react";
import OpportunityCard from "../components/OpportunityCard";
import SearchBar from "../components/SearchBar";
import { opportunities } from "../data/opportunities";
import { motion, AnimatePresence } from "framer-motion";

const ITEMS_PER_LOAD = 9;

export default function Opportunities() {
  const [showOpportunities, setShowOpportunities] = useState(opportunities);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_LOAD);
  const isShowAll = visibleCount >= showOpportunities.length;
  const displayOpportunities = useCallback((filters) => {
    let allOpportunities = opportunities.filter(
      (item) =>
        item.major.toLowerCase().includes(filters.search) ||
        item.company.toLowerCase().includes(filters.search) ||
        item.location.toLowerCase().includes(filters.search) ||
        item.description.toLowerCase().includes(filters.search)
    );

    allOpportunities = allOpportunities.filter(
      (item) =>
        (!filters.generalField ||
          filters.generalField === "كل المجالات" ||
          item.generalField === filters.generalField) &&
        (!filters.country ||
          filters.country === "الكل" ||
          item.location.includes(filters.country)) &&
        (!filters.costs ||
          filters.costs === "الكل" ||
          item.cost === filters.costs) &&
        (!filters.trainType ||
          filters.trainType === "الكل" ||
          item.type === filters.trainType) &&
        (!filters.period ||
          filters.period === "الكل" ||
          item.period === filters.period)
    );
    setShowOpportunities(allOpportunities);
    setVisibleCount(ITEMS_PER_LOAD);
  }, []);

  return (
    <section className="bg-gradient-to-tr from-black via-blue-900 to-black min-h-fit py-[100px] pb-[300px]">
      <div className="flex flex-col items-center">
        <h2 className="text-white font-bold text-center pt-[50px] text-[30px] sm:text-[40px]">
          فرص التدريب
        </h2>
        <p className="text-[#bdbdbd] text-center text-[16px] sm:text-[18px] my-[20px] w-[80%] md:w-[44%] leading-[40px]">
          اكتشف فرص التدريب المناسبة لتخصصك في مختلف المؤسسات داخل وخارج الجامعة
          وابدأ رحلتك المهنية من اليوم.
        </p>
      </div>
      {/* شريط البحث والتصفية */}
      <SearchBar displayOpportunities={displayOpportunities} />

      <div className="flex justify-center mt-32 relative pb-[50px]">
        {showOpportunities.length !== 0 ? (
          <>
            <div className="flex justify-center flex-col mt-16">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-[90px]">
                <AnimatePresence>
                  {showOpportunities.slice(0, visibleCount).map((opp) => (
                    <motion.div
                      key={opp.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 0.4 }}
                    >
                      <OpportunityCard key={opp.id} opp={opp} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
              <motion.button
                className={`${
                  isShowAll ? "hidden" : "block"
                } text-[12px] sm:text-[16px] sm:w-[250px] mx-auto px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() =>
                  setTimeout(() => setVisibleCount(visibleCount + 10), 1500)
                }
              >
                عرض المزيد من الفرص
              </motion.button>
            </div>
          </>
        ) : (
          <div className="w-full  mb-[500px] flex flex-col items-center">
            <h5 className="text-blue-300 sm:text-[30px]">
              😕 لم نجد فرص مطابقة حاليًا
            </h5>
            <p className="text-gray-300 mt-4 text-[12px] sm:text-[16px]">
              جرّب تعديل الفلاتر أو اختيار دولة أو مجال آخر
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

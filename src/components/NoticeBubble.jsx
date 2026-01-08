import { useEffect } from "react";
import { useState } from "react";

export default function NoticeBubble() {
    const [isBubbleOpen, setIsBubbleOpen] = useState(false)
    useEffect(() => {
        const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsBubbleOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
    }, [])
  return (
    <div className="w-[35px] h-[65px] fixed -bottom-[-10px] right-2 z-[99] rounded-full transition-all duration-1000 hover:w-[320px]">
        <button className={`${isBubbleOpen ? "opacity-100" : "opacity-50"} absolute z-[10] right-[3px] top-2 ml-5 rounded-full bg-white p-2 text-[11px] md:text-[14px] md:opacity-50 md:hover:opacity-100 peer`}
        onClick={() => window.innerWidth >= 768 ? null : setIsBubbleOpen(!isBubbleOpen)}
        >
          ⚠️
        </button>
      <div className={`${isBubbleOpen ? "block": "hidden"} absolute text-center top-[-75px] md:top-[-110px] right-[33px] md:right-[37px] md:w-[250px] w-[200px] px-[10px] p-2 md:p-4 text-white text-[13px] md:text-[16px] bg-blue-700 rounded-[20px] rounded-br-none peer-hover:md:block`}>
        <bdi>
          {" "}
          هذا المشروع هو نموذج تعليمي (Prototype) لأغراض التعلم فقط. جميع الفرص
          والبيانات المعروضة افتراضية ولا تمثل جهات حقيقية.
        </bdi>
      </div>
    </div>
  );
}

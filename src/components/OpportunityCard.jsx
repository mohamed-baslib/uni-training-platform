import { NavLink } from "react-router-dom";

export default function OpportunityCard({opp}) {
  return (
    <div className="scale-75 sm:scale-90 lg:scale-100 w-[300px] h-[400px] bg-white rounded-[20px] p-[10px] sm:mb-[100px] transition-all duration-500 transform hover:-translate-y-5">
      <h1 className="w-full h-[40%] rounded-[20px] text-[20px] font-bold text-white bg-blue-600 flex flex-col-reverse justify-center items-center gap-4"><span className="bg-white text-blue-600 p-1 px-3 rounded-full text-[12px]">{opp.company}</span> <span className="text-center">{opp.major}</span></h1>
      <div dir="rtl" className="px-[5px] py-[10px] flex flex-col justify-between h-[60%]">
        <div className="flex justify-between items-center">
          <div className="text-center min-w-[70px] text-[12px] font-bold bg-[#0368e338] px-[10px] py-[3px] rounded-[20px] text-blue-600">{opp.type}</div>
          <div className="text-center min-w-[70px] text-[12px] font-bold bg-blue-600 p-[4px] rounded-[20px] text-white">{opp.cost}</div>
        </div>
        <h4 className="text-[16px] md:text-[18px] font-bold">
          <i className="text-blue-500 ml-[5px] fas fa-laptop"></i>{opp.major}
        </h4>
        <p className="text-[#003677] w-full text-[14px]">{opp.description}</p>
        <div className="flex items-center justify-between gap-[5px]">
          <h6 className="train-address text-[13px]">
            <i className="text-blue-500 ml-[5px] fas fa-building"></i>{opp.company}
          </h6>
          <h6 className="ml-[20px] text-[13px]">
            <i className="text-blue-500 ml-[5px] fas fa-map-marker-alt"></i>{opp.location}
          </h6>
        </div>

        <NavLink to={`/opportunity-details/${opp.id}`} className="border-none p-[5px] rounded-[10px] bg-blue-600 text-white text-[15px] font-bold text-center cursor-pointer hover:bg-[#0048a0]">
             التفاصيل والتقديم
            </NavLink>
      </div>
    </div>
  );
}

const StatsCard = ({ title, value, icon, iconBg, valueColor = "text-ink-black-900" }) => {
     return (
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-bright-snow-100">
               <div className="flex items-center justify-between">
                    <div>
                         <p className="text-sm text-ink-black-600 mb-2">{title}</p>
                         <h3 className={`text-3xl font-bold ${valueColor}`}>{value}</h3>
                    </div>
                    {icon && (
                         <div
                              className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl ${iconBg}`}
                         >
                              {icon}
                         </div>
                    )}
               </div>
          </div>
     );
};

export default StatsCard;

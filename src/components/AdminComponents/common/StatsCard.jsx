const StatsCard = ({ title, value, icon, iconBg, valueColor = "text-ink-black-900" }) => {
     return (
          <div className="bg-white rounded-2xl p-6 shadow-md border border-bright-snow-100 hover:shadow-lg hover:border-sapphire-sky-200 transition-all duration-300">
               <div className="flex items-center justify-between">
                    <div>
                         <p className="text-sm text-ink-black-500 mb-2 font-medium">{title}</p>
                         <h3 className={`text-3xl font-bold ${valueColor}`}>{value}</h3>
                    </div>
                    {icon && (
                         <div
                              className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl ${iconBg} shadow-md`}
                         >
                              {icon}
                         </div>
                    )}
               </div>
          </div>
     );
};

export default StatsCard;

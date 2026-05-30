const StatsCard = ({ title, value, icon, iconBg, valueColor = "text-gray-900" }) => {
     return (
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-gray-200 transition-all duration-300">
               <div className="flex items-center justify-between">
                    <div>
                         <p className="text-sm text-blue-600 mb-2 font-medium">{title}</p>
                         <h3 className={`text-3xl font-bold ${valueColor}`}>{value}</h3>
                    </div>
                    {icon && (
                         <div
                              className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl ${iconBg} shadow-sm`}
                         >
                              {icon}
                         </div>
                    )}
               </div>
          </div>
     );
};

export default StatsCard;

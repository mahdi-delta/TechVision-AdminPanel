const StatsCard = ({ title, value, icon, iconBg, valueColor = "text-tech-text" }) => {
     return (
          <div className="bg-white rounded-2xl p-6 shadow-md border border-tech-bg hover:shadow-lg hover:border-tech-muted transition-all duration-300">
               <div className="flex items-center justify-between">
                    <div>
                         <p className="text-sm text-tech-test mb-2 font-medium">{title}</p>
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

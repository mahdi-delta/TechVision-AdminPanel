export const SettingsToggle = ({ icon, title, description, name, checked, onChange, disabled=false }) => (
     <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
          <div className="flex items-center gap-3">
               <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
                    {icon}
               </div>
               <div>
                    <p className="text-sm font-medium text-gray-900">{title}</p>
                    <p className="text-xs text-blue-600">{description}</p>
               </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
               <input
                    type="checkbox"
                    name={name}
                    checked={checked}
                    onChange={onChange}
                    className="sr-only peer"
                    disabled={disabled}
               />
               <div className="w-11 h-6 bg-tech-navy-melo/30 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-100 rounded-full peer peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:right-0.5 after:bg-white after:border-tech-navy-melo/30 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-tech-navy-melo"></div>
          </label>
     </div>
);

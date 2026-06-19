export const SettingsInput = ({ label, error, touched, isTextArea = false, ...props }) => {
     const baseClassName = `w-full px-4 py-2.5 rounded-xl  border border-tech-navy/20 outline-tech-navy-melo/40 outline-0 outline-offset-3 outline-solid focus:border-tech-navy-melo/70 focus:outline-tech-navy outline-none text-sm transition-colors ${
          props.disabled
               ? "bg-gray-50 text-tech-navy border-tech-navy-melo/30 cursor-not-allowed"
               : error && touched
                 ? "border-red-500 focus:border-red-500"
                 : "border-tech-navy-melo/30 focus:border-tech-accent"
     }`;

     return (
          <div>
               <label className="block text-xs md:text-sm font-medium text-gray-900 mb-2">
                    {label}
               </label>
               {isTextArea ? (
                    <textarea
                         rows={3}
                         className={`${baseClassName} rounded-3xl resize-none`}
                         {...props}
                    />
               ) : (
                    <input className={baseClassName} {...props} />
               )}
               {touched && error && <p className="text-red-500 text-xs mt-1.5 pr-2">{error}</p>}
          </div>
     );
};

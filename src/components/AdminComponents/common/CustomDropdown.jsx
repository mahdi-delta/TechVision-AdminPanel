import { useState, useRef } from "react";
import useClickOutside from "../../../hooks/useClickOutside";

const CustomDropdown = ({
     options = [],
     value,
     onChange,
     placeholder = "انتخاب کنید",
     className = "",
}) => {
     const [isOpen, setIsOpen] = useState(false);
     const dropdownRef = useRef(null);

     useClickOutside(dropdownRef, () => {
          if (isOpen) {
               setIsOpen(false);
          }
     });

     const handleSelect = (option) => {
          onChange(option);
          setIsOpen(false);
     };

     return (
          <div className={`relative ${className}`} ref={dropdownRef}>
               <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full px-4 py-2.5 bg-white border border-bright-snow-300 rounded-xl text-sm text-right flex items-center justify-between hover:border-sapphire-sky-400 focus:border-sapphire-sky-500 focus:ring-2 focus:ring-sapphire-sky-200 transition-all duration-200 outline-none"
               >
                    <span className="text-ink-black-700 font-medium">{value || placeholder}</span>
                    <svg
                         className={`w-4 h-4 text-ink-black-500 transition-transform duration-200 ${
                              isOpen ? "rotate-180" : ""
                         }`}
                         fill="none"
                         stroke="currentColor"
                         viewBox="0 0 24 24"
                    >
                         <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                         />
                    </svg>
               </button>

               {isOpen && (
                    <div className="absolute z-50 w-full mt-2 bg-white rounded-xl shadow-xl border border-bright-snow-200 overflow-hidden animate-fadeIn">
                         <div className="max-h-60 overflow-y-auto py-1">
                              {options.map((option, index) => (
                                   <button
                                        key={index}
                                        onClick={() => handleSelect(option)}
                                        className={`w-full px-4 py-2.5 text-right text-sm transition-colors ${
                                             value === option
                                                  ? "bg-sapphire-sky-50 text-sapphire-sky-700 font-medium"
                                                  : "text-ink-black-700 hover:bg-bright-snow-50"
                                        }`}
                                   >
                                        {option}
                                   </button>
                              ))}
                         </div>
                    </div>
               )}
          </div>
     );
};

export default CustomDropdown;

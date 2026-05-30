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
                    className="w-full px-4 py-2.5 bg-white border border-tech-navy-light rounded-xl text-sm text-right flex items-center justify-between hover:border-tech-navy-light hover:shadow-md focus:border-tech-accent focus:ring-2 focus:ring-tech-muted transition-all duration-200 outline-none"
               >
                    <span className="text-tech-navy font-medium">{value || placeholder}</span>
                    <svg
                         className={`w-4 h-4 text-tech-test transition-transform duration-200 ${
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
                    <div className="absolute z-50 w-full mt-2 bg-white rounded-xl shadow-lg border border-tech-muted overflow-hidden animate-fadeIn">
                         <div className="max-h-60 overflow-y-auto py-1">
                              {options.map((option, index) => (
                                   <button
                                        key={index}
                                        onClick={() => handleSelect(option)}
                                        className={`w-full px-4 py-2.5 text-right text-sm transition-colors ${
                                             value === option
                                                  ? "bg-tech-test text-white font-medium"
                                                  : "text-tech-navy hover:bg-tech-bg"
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

import { useState, useRef } from "react";
import { ChevronDown, Check } from "lucide-react";
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
                    className="w-full px-4 py-2 rounded-xl text-sm text-right flex items-center justify-between hover:border-gray-700 hover:shadow-md focus:border-tech-accent  focus:ring-tech-accent/20 transition-all duration-200 outline-none group"
               >
                    <span className="text-tech-navy font-semibold">{value || placeholder}</span>
                    <ChevronDown
                         className={`w-5 h-5 text-gray-600 group-hover:text-tech-accent transition-all duration-300 ${isOpen ? "rotate-180" : ""}`}
                    />
               </button>

               {isOpen && (
                    <div className="absolute z-999 w-full mt-2 bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden animate-fadeIn backdrop-blur-sm">
                         <div className="max-h-60 overflow-y-auto">
                              {options.map((option, index) => (
                                   <button
                                        key={index}
                                        onClick={() => handleSelect(option)}
                                        className={`w-full px-4 py-3 text-right text-sm transition-all duration-150 flex items-center gap-3 group ${
                                             value === option
                                                  ? "bg-linear-to-r from-tech-accent/10 to-blue-600/10 border-r-4 border-tech-accent text-tech-accent font-semibold"
                                                  : "text-gray-900 hover:bg-gray-50"
                                        }`}
                                   >
                                        <div className="flex items-center gap-2">
                                             {value === option && (
                                                  <Check className="w-4 h-4 text-tech-accent" />
                                             )}
                                        </div>
                                        <span>{option}</span>
                                   </button>
                              ))}
                         </div>
                    </div>
               )}
          </div>
     );
};

export default CustomDropdown;

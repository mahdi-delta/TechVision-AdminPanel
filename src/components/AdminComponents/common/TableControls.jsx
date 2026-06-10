import SearchInput from "./SearchInput";
import CustomDropdown from "./CustomDropdown";
import { Plus } from "lucide-react";

const TableControls = ({
     title,
     searchQuery,
     onSearchChange,
     filterValue,
     onFilterChange,
     filterOptions,
     addButtonText,
     onAddClick,
     searchPlaceholder = "جستجو...",
}) => {
     return (
          <div className="p-4 md:p-6 border-b border-gray-200">
               <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <h2 className="text-lg md:text-xl font-semibold text-gray-900">{title}</h2>
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
                         <div className="flex-1 sm:w-64">
                              <SearchInput
                                   value={searchQuery}
                                   onChange={(e) => onSearchChange(e.target.value)}
                                   placeholder={searchPlaceholder}
                              />
                         </div>
                         <div className="flex-1 sm:w-44">
                              <CustomDropdown
                                   options={filterOptions}
                                   value={filterValue}
                                   onChange={onFilterChange}
                                   className="w-full"
                              />
                         </div>
                         {addButtonText && (
                              <button
                                   onClick={onAddClick}
                                   className="flex justify-center items-center gap-2 px-4 py-2 bg-tech-navy-melo text-white rounded-lg hover:bg-tech-navy-melo/90 transition-colors text-sm shrink-0"
                              >
                                   <Plus className="w-5 h-5" />
                                   <span>{addButtonText}</span>
                              </button>
                         )}
                    </div>
               </div>
          </div>
     );
};

export default TableControls;

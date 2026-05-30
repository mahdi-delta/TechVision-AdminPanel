import { Search } from "lucide-react";

const SearchInput = ({ value, onChange, placeholder = "جستجو...", className = "" }) => {
     return (
          <div className={`relative ${className}`}>
               <input
                    type="text"
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    className="pl-4 pr-10 py-2.5 border border-gray-200 rounded-xl focus:border-tech-accent focus:ring-2 focus:ring-tech-accent/10 outline-none text-sm w-full bg-gray-50 hover:bg-white transition-colors"
               />
               <Search className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
     );
};

export default SearchInput;

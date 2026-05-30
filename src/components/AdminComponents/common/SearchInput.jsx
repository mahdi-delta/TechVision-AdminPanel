import { Search } from "lucide-react";

const SearchInput = ({ value, onChange, placeholder = "جستجو...", className = "" }) => {
     return (
          <div className={`relative ${className}`}>
               <input
                    type="text"
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    className="pl-4 pr-10 py-2 border border-tech-navy-light rounded-lg focus:border-tech-accent focus:ring-2 focus:ring-tech-muted outline-none text-sm w-full"
               />
               <Search className="w-5 h-5 absolute right-3 top-1/2 -translate-y-1/2 text-tech-navy-light" />
          </div>
     );
};

export default SearchInput;

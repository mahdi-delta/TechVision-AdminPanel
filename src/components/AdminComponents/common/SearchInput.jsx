import { Search } from "lucide-react";

const SearchInput = ({ value, onChange, placeholder = "جستجو...", className = "" }) => {
     return (
          <div className={`relative group ${className}`}>
               <input
                    type="text"
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    className="pl-10 pr-4 py-2.5 border border-tech-muted rounded-xl focus:border-tech-accent focus:ring-2 focus:ring-tech-accent/20 outline-none text-sm w-full bg-tech-bg hover:bg-white transition-colors shadow-sm group-focus-within:shadow-md"
               />
               <Search className="w-5 h-5 absolute right-3 top-1/2 -translate-y-1/2 text-tech-muted group-focus-within:text-tech-accent transition-colors" />
          </div>
     );
};

export default SearchInput;

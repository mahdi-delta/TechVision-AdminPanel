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
               <svg
                    className="w-5 h-5 absolute right-3 top-1/2 -translate-y-1/2 text-tech-navy-light"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
               >
                    <path
                         strokeLinecap="round"
                         strokeLinejoin="round"
                         strokeWidth={2}
                         d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
               </svg>
          </div>
     );
};

export default SearchInput;

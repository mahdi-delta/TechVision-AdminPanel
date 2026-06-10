const TablePagination = ({
     currentPage,
     setCurrentPage,
     totalPages,
     totalItems,
     shownCount,
     unitName = "ردیف", 
}) => {
     const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

     return (
          <div className="p-4 md:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white border-t border-gray-200">
               <p className="max-sm:text-center text-sm text-gray-600">
                    نمایش {shownCount} از {totalItems} {unitName}
               </p>
               <div className="max-sm:w-full flex justify-center items-center gap-2 flex-wrap self-end sm:self-auto">
                    <button
                         onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                         className="px-3 py-1 border-b-2 border-gray-200 text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-50 transition-colors"
                         disabled={currentPage === 1}
                    >
                         قبلی
                    </button>
                    {pageNumbers.map((num) => (
                         <button
                              key={num}
                              onClick={() => setCurrentPage(num)}
                              className={`px-3 py-1 text-sm transition-all ${
                                   currentPage === num
                                        ? "border-b-2 border-tech-navy-melo text-tech-navy font-medium"
                                        : "border-b-2 border-gray-200 hover:bg-gray-50"
                              }`}
                         >
                              {num}
                         </button>
                    ))}
                    <button
                         onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                         className="px-3 py-1 border-b-2 border-gray-200 text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-50 transition-colors"
                         disabled={currentPage === totalPages}
                    >
                         بعدی
                    </button>
               </div>
          </div>
     );
};

export default TablePagination;

const TableSkeleton = ({ rowsCount = 5, colsCount = 6 }) => {
     const rows = Array.from({ length: rowsCount });
     const cols = Array.from({ length: colsCount });

     return (
          <>
               {rows.map((_, rowIndex) => (
                    <tr key={rowIndex} className="animate-pulse">
                         {cols.map((_, colIndex) => (
                              <td key={colIndex} className="px-3 md:px-6 py-4">
                                   <div className="flex items-center gap-3">
                                        {colIndex === 0 && rowIndex % 2 === 0 ? (
                                             <div className="w-10 h-10 bg-gray-200 rounded-full shrink-0"></div>
                                        ) : null}
                                        <div className="w-full">
                                             <div className="h-4 bg-gray-200 rounded-full w-24 mb-1.5"></div>
                                             {colIndex === 0 && (
                                                  <div className="h-3 bg-gray-100 rounded-full w-16"></div>
                                             )}
                                        </div>
                                   </div>
                              </td>
                         ))}
                    </tr>
               ))}
          </>
     );
};

export default TableSkeleton;

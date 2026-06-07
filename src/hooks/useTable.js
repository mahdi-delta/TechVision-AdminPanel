import { useState, useEffect, useMemo } from "react";

export const useTable = ({ data, searchFields = [], filterField = "", defaultPageSize =5 }) => {
     const [searchQuery, setSearchQuery] = useState("");
     const [filterValue, setFilterValue] = useState("همه");
     const [sortField, setSortField] = useState(null);
     const [sortOrder, setSortOrder] = useState("asc"); // 'asc' | 'desc'
     const [currentPage, setCurrentPage] = useState(1);
     const [isLoading, setIsLoading] = useState(true);

     useEffect(() => {
          setIsLoading(true);
          const timer = setTimeout(() => {
               setIsLoading(false);
          }, 600); // ۶۰۰ میلی‌ثانیه تاخیر شبیه‌سازی شده
          return () => clearTimeout(timer);
     }, [searchQuery, filterValue, sortField, sortOrder]);

     useEffect(() => {
          setCurrentPage(1);
     }, [searchQuery, filterValue]);

     const filteredData = useMemo(() => {
          return data.filter((item) => {
               const matchesSearch = searchFields.some((field) => {
                    const value = item[field];
                    return value
                         ? value.toString().toLowerCase().includes(searchQuery.toLowerCase())
                         : false;
               });

               const matchesFilter =
                    filterValue === "همه" ||
                    filterValue === "همه دسته‌ها" ||
                    item[filterField] === filterValue;

               return matchesSearch && matchesFilter;
          });
     }, [data, searchQuery, filterValue, searchFields, filterField]);

     const sortedData = useMemo(() => {
          if (!sortField) return filteredData;

          const sorted = [...filteredData].sort((a, b) => {
               let valA = a[sortField];
               let valB = b[sortField];

               if (typeof valA === "string" && !isNaN(Number(valA.replace(/,/g, "")))) {
                    valA = Number(valA.replace(/,/g, ""));
                    valB = Number(valB.replace(/,/g, ""));
               }

               if (valA < valB) return sortOrder === "asc" ? -1 : 1;
               if (valA > valB) return sortOrder === "asc" ? 1 : -1;
               return 0;
          });

          return sorted;
     }, [filteredData, sortField, sortOrder]);

     const paginatedData = useMemo(() => {
          const startIndex = (currentPage - 1) * defaultPageSize;
          return sortedData.slice(startIndex, startIndex + defaultPageSize);
     }, [sortedData, currentPage, defaultPageSize]);

     const totalPages = Math.ceil(sortedData.length / defaultPageSize) || 1;

     const handleSort = (field) => {
          if (sortField === field) {
               setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
          } else {
               setSortField(field);
               setSortOrder("asc");
          }
     };

     return {
          processedData: paginatedData,
          totalItems: sortedData.length,
          totalPages,
          currentPage,
          setCurrentPage,
          searchQuery,
          setSearchQuery,
          filterValue,
          setFilterValue,
          sortField,
          sortOrder,
          handleSort,
          isLoading,
     };
};

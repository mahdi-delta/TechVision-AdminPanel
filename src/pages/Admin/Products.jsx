import { useState } from "react";
import { Edit2, Trash2 } from "lucide-react";
import { useProductStore } from "../../store/adminStore/useProductStore";
import { useTable } from "../../hooks/useTable";
import TableSkeleton from "../../components/AdminComponents/common/TableSkeleton";
import TableControls from "../../components/AdminComponents/common/TableControls";
import TablePagination from "../../components/AdminComponents/common/TablePagination";
import StatsCard from "../../components/AdminComponents/common/StatsCard";
import AddProductModal from "../../components/AdminComponents/products/AddProductModal";
import EditProductModal from "../../components/AdminComponents/products/EditProductModal";
import DeleteProductModal from "../../components/AdminComponents/products/DeleteProductModal";

const Products = () => {
     const products = useProductStore((state) => state.products);

     const [showAddModal, setShowAddModal] = useState(false);
     const [showEditModal, setShowEditModal] = useState(false);
     const [showDeleteModal, setShowDeleteModal] = useState(false);
     const [selectedProduct, setSelectedProduct] = useState(null);

     const {
          processedData: filteredProducts,
          totalItems,
          totalPages,
          currentPage,
          setCurrentPage,
          searchQuery,
          setSearchQuery,
          filterValue: categoryFilter,
          setFilterValue: setCategoryFilter,
          sortField,
          sortOrder,
          handleSort,
          isLoading,
     } = useTable({
          data: products,
          searchFields: ["name"],
          filterField: "category",
          defaultPageSize: 5,
     });

     const totalStock = filteredProducts.reduce((sum, p) => sum + p.stock, 0);
     const lowStock = filteredProducts.filter((p) => p.stock < 10).length;

     const handleOpenEditModal = (product) => {
          setSelectedProduct(product);
          setShowEditModal(true);
     };

     const handleOpenDeleteModal = (product) => {
          setSelectedProduct(product);
          setShowDeleteModal(true);
     };

     return (
          <div className="space-y-4 md:space-y-6">
               {/* Stats Grid */}
               <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 md:px-0">
                    <StatsCard title="کل محصولات" value={products.length} />
                    <StatsCard title="موجودی کل" value={totalStock} valueColor="text-blue-600" />
                    <StatsCard title="موجودی کم" value={lowStock} valueColor="text-orange-600" />
                    <StatsCard
                         title="دسته‌بندی‌ها"
                         value={new Set(products.map((p) => p.category)).size}
                         valueColor="text-purple-600"
                    />
               </div>

               {/* Main Card Container */}
               <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <TableControls
                         title="لیست محصولات"
                         searchQuery={searchQuery}
                         onSearchChange={setSearchQuery}
                         filterValue={categoryFilter}
                         onFilterChange={setCategoryFilter}
                         filterOptions={["همه دسته‌ها", "لپ‌تاپ", "لوازم جانبی", "مانیتور"]}
                         addButtonText="افزودن محصول"
                         onAddClick={() => setShowAddModal(true)}
                         searchPlaceholder="جستجو در محصولات..."
                    />

                    <div className="md:hidden space-y-3 p-3 bg-gray-50/50">
                         {isLoading ? (
                              [1, 2, 3].map((n) => (
                                   <div
                                        key={n}
                                        className="bg-white p-4 rounded-xl border border-gray-100 animate-pulse space-y-3"
                                   >
                                        <div className="flex items-center justify-between">
                                             <div className="flex items-center gap-3">
                                                  <div className="w-10 h-10 rounded-xl bg-gray-200"></div>
                                                  <div className="space-y-1.5">
                                                       <div className="h-4 bg-gray-200 rounded w-28"></div>
                                                       <div className="h-3 bg-gray-150 rounded w-16"></div>
                                                  </div>
                                             </div>
                                             <div className="h-6 bg-gray-200 rounded-lg w-16"></div>
                                        </div>
                                        <div className="border-t border-gray-100 pt-3 flex justify-between">
                                             <div className="space-y-1">
                                                  <div className="h-3 bg-gray-100 rounded w-8"></div>
                                                  <div className="h-4 bg-gray-200 rounded w-16"></div>
                                             </div>
                                             <div className="space-y-1 text-left">
                                                  <div className="h-3 bg-gray-100 rounded w-12"></div>
                                                  <div className="h-4 bg-gray-200 rounded w-14"></div>
                                             </div>
                                        </div>
                                   </div>
                              ))
                         ) : filteredProducts.length === 0 ? (
                              <div className="text-center py-8 text-gray-500 text-sm bg-white rounded-xl border border-gray-100">
                                   محصولی یافت نشد.
                              </div>
                         ) : (
                              filteredProducts.map((product) => (
                                   <div
                                        key={product.id}
                                        className="bg-white p-4 rounded-xl border border-gray-100 shadow-xs space-y-3"
                                   >
                                        <div className="flex items-center justify-between">
                                             <div className="flex items-center gap-3">
                                                  <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-lg shrink-0">
                                                       {product.image}
                                                  </div>
                                                  <div>
                                                       <h4 className="max-w-25 text-sm font-bold text-gray-900">
                                                            {product.name}
                                                       </h4>
                                                  </div>
                                             </div>
                                             <span className="px-2.5 py-0.5 rounded-lg bg-gray-50 text-gray-900 text-xs font-medium border border-gray-150">
                                                  {product.category}
                                             </span>
                                        </div>
                                        <div className="border-t border-gray-100 pt-3 flex justify-between items-center text-xs">
                                             <div className="space-y-1">
                                                  <p className="text-gray-500">قیمت</p>
                                                  <p className="font-bold text-gray-900">
                                                       {product.price} تومان
                                                  </p>
                                             </div>
                                             <div className="space-y-1 text-center">
                                                  <p className="text-gray-500">موجودی</p>
                                                  <span
                                                       className={`px-2.5 py-0.5 text-xs rounded-full font-medium inline-block ${product.stock > 20 ? "bg-green-50 text-green-700" : product.stock > 10 ? "bg-yellow-50 text-yellow-700" : "bg-red-50 text-red-700"}`}
                                                  >
                                                       {product.stock} عدد
                                                  </span>
                                             </div>
                                        </div>
                                        <div className="border-t border-gray-100 pt-3 flex justify-between items-center text-xs text-gray-600">
                                             <span>فروش: {product.sales} عدد</span>
                                             <div className="flex gap-2">
                                                  <button
                                                       onClick={() => handleOpenEditModal(product)}
                                                       className="px-3 py-1.5 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors"
                                                  >
                                                       <Edit2 className="w-3.5 h-3.5 text-blue-600" />
                                                       <span>ویرایش</span>
                                                  </button>
                                                  <button
                                                       onClick={() =>
                                                            handleOpenDeleteModal(product)
                                                       }
                                                       className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors"
                                                  >
                                                       <Trash2 className="w-3.5 h-3.5" />
                                                       <span>حذف</span>
                                                  </button>
                                             </div>
                                        </div>
                                   </div>
                              ))
                         )}
                    </div>

                    <div className="hidden md:block overflow-x-auto">
                         <table className="w-full">
                              <thead className="bg-gray-50">
                                   <tr>
                                        <th
                                             onClick={() => handleSort("name")}
                                             className="px-6 py-3 text-right text-xs font-semibold text-gray-600 cursor-pointer hover:bg-gray-100 transition-colors"
                                        >
                                             محصول{" "}
                                             {sortField === "name" &&
                                                  (sortOrder === "asc" ? "▲" : "▼")}
                                        </th>
                                        <th
                                             onClick={() => handleSort("category")}
                                             className="px-6 py-3 text-right text-xs font-semibold text-gray-600 cursor-pointer hover:bg-gray-100 transition-colors"
                                        >
                                             دسته‌بندی{" "}
                                             {sortField === "category" &&
                                                  (sortOrder === "asc" ? "▲" : "▼")}
                                        </th>
                                        <th
                                             onClick={() => handleSort("price")}
                                             className="px-6 py-3 text-right text-xs font-semibold text-gray-600 cursor-pointer hover:bg-gray-100 transition-colors"
                                        >
                                             قیمت (تومان){" "}
                                             {sortField === "price" &&
                                                  (sortOrder === "asc" ? "▲" : "▼")}
                                        </th>
                                        <th
                                             onClick={() => handleSort("stock")}
                                             className="px-6 py-3 text-right text-xs font-semibold text-gray-600 hidden lg:table-cell cursor-pointer hover:bg-gray-100 transition-colors"
                                        >
                                             موجودی{" "}
                                             {sortField === "stock" &&
                                                  (sortOrder === "asc" ? "▲" : "▼")}
                                        </th>
                                        <th
                                             onClick={() => handleSort("sales")}
                                             className="px-6 py-3 text-right text-xs font-semibold text-gray-600 hidden lg:table-cell cursor-pointer hover:bg-gray-100 transition-colors"
                                        >
                                             فروش{" "}
                                             {sortField === "sales" &&
                                                  (sortOrder === "asc" ? "▲" : "▼")}
                                        </th>
                                        <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600">
                                             عملیات
                                        </th>
                                   </tr>
                              </thead>
                              <tbody className="divide-y divide-gray-200">
                                   {isLoading ? (
                                        <TableSkeleton rowsCount={5} colsCount={6} />
                                   ) : filteredProducts.length === 0 ? (
                                        <tr>
                                             <td
                                                  colSpan={6}
                                                  className="text-center py-8 text-gray-500 text-sm"
                                             >
                                                  محصولی یافت نشد.
                                             </td>
                                        </tr>
                                   ) : (
                                        filteredProducts.map((product) => (
                                             <tr
                                                  key={product.id}
                                                  className="hover:bg-tech-navy-melo/5 transition-colors"
                                             >
                                                  <td className="px-6 py-4">
                                                       <div className="flex items-center gap-3">
                                                            <div className="w-11 h-11 rounded-xl bg-gray-50 flex items-center justify-center text-xl shrink-0">
                                                                 {product.image}
                                                            </div>
                                                            <div className="min-w-0">
                                                                 <p className="text-sm font-semibold text-gray-900 truncate">
                                                                      {product.name}
                                                                 </p>
                                                                 <p className="text-xs text-blue-600 mt-0.5">
                                                                      #{product.id}
                                                                 </p>
                                                            </div>
                                                       </div>
                                                  </td>
                                                  <td className="px-6 py-4 text-sm text-gray-700">
                                                       {product.category}
                                                  </td>
                                                  <td className="px-6 py-4 text-sm font-bold text-gray-900">
                                                       {product.price}
                                                  </td>
                                                  <td className="px-6 py-4 hidden lg:table-cell">
                                                       <span
                                                            className={`px-3 py-1 text-xs rounded-full font-medium inline-block ${product.stock > 20 ? "bg-green-50 text-green-700" : product.stock > 10 ? "bg-yellow-50 text-yellow-700" : "bg-red-50 text-red-700"}`}
                                                       >
                                                            {product.stock} عدد
                                                       </span>
                                                  </td>
                                                  <td className="px-6 py-4 text-sm text-gray-600 hidden lg:table-cell">
                                                       {product.sales}
                                                  </td>
                                                  <td className="px-6 py-4">
                                                       <div className="flex items-center gap-2">
                                                            <button
                                                                 onClick={() =>
                                                                      handleOpenEditModal(product)
                                                                 }
                                                                 className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                                            >
                                                                 <Edit2 className="w-4 h-4 text-blue-600" />
                                                            </button>
                                                            <button
                                                                 onClick={() =>
                                                                      handleOpenDeleteModal(product)
                                                                 }
                                                                 className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                                                            >
                                                                 <Trash2 className="w-4 h-4 text-red-600" />
                                                            </button>
                                                       </div>
                                                  </td>
                                             </tr>
                                        ))
                                   )}
                              </tbody>
                         </table>
                    </div>

                    <TablePagination
                         currentPage={currentPage}
                         setCurrentPage={setCurrentPage}
                         totalPages={totalPages}
                         totalItems={totalItems}
                         shownCount={filteredProducts.length}
                         unitName="محصول"
                    />
               </div>

               {/* Modals */}
               <AddProductModal show={showAddModal} onClose={() => setShowAddModal(false)} />
               <EditProductModal
                    show={showEditModal}
                    onClose={() => setShowEditModal(false)}
                    product={selectedProduct}
               />
               <DeleteProductModal
                    show={showDeleteModal}
                    onClose={() => setShowDeleteModal(false)}
                    product={selectedProduct}
               />
          </div>
     );
};

export default Products;

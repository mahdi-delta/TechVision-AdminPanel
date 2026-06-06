import { productsData } from "../../data/productsData";
import { useState } from "react";
import { Plus, Edit2, Trash2 } from "lucide-react";
import StatsCard from "../../components/AdminComponents/common/StatsCard";
import SearchInput from "../../components/AdminComponents/common/SearchInput";
import AddProductModal from "../../components/AdminComponents/products/AddProductModal";
import CustomDropdown from "../../components/AdminComponents/common/CustomDropdown";

const Products = () => {
     const [products, setProducts] = useState(productsData);
     const [searchQuery, setSearchQuery] = useState("");
     const [categoryFilter, setCategoryFilter] = useState("همه دسته‌ها");
     const [showAddModal, setShowAddModal] = useState(false);
     const [newProduct, setNewProduct] = useState({
          name: "",
          category: "لپ‌تاپ",
          price: "",
          stock: "",
          image: "💻",
     });

     // Filter products based on search and category
     const filteredProducts = products.filter((product) => {
          const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
          const matchesCategory =
               categoryFilter === "همه دسته‌ها" || product.category === categoryFilter;
          return matchesSearch && matchesCategory;
     });

     const totalStock = filteredProducts.reduce((sum, p) => sum + p.stock, 0);
     const lowStock = filteredProducts.filter((p) => p.stock < 10).length;

     const handleAddProduct = () => {
          const productToAdd = {
               id: products.length + 1,
               name: newProduct.name,
               category: newProduct.category,
               price: newProduct.price,
               stock: parseInt(newProduct.stock),
               sales: 0,
               image: newProduct.image,
          };

          setProducts([...products, productToAdd]);
          setShowAddModal(false);
          setNewProduct({
               name: "",
               category: "لپ‌تاپ",
               price: "",
               stock: "",
               image: "💻",
          });
          alert("محصول با موفقیت اضافه شد");
     };

     return (
          <div className="space-y-4 md:space-y-6">
               {/* Stats */}
               <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
                    <StatsCard title="کل محصولات" value={products.length} />
                    <StatsCard title="موجودی کل" value={totalStock} valueColor="text-blue-600" />
                    <StatsCard title="موجودی کم" value={lowStock} valueColor="text-orange-600" />
                    <StatsCard
                         title="دسته‌بندی‌ها"
                         value={new Set(products.map((p) => p.category)).size}
                         valueColor="text-purple-600"
                    />
               </div>

               {/* Main Table */}
               <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                    <div className="p-3 md:p-6 border-b border-gray-200">
                         <div className="flex justify-between gap-3 md:gap-4">
                              <h2 className="text-lg md:text-xl font-semibold text-gray-900">
                                   لیست محصولات
                              </h2>
                              <div className="flex flex-col md:flex-row items-stretch md:items-center gap-2 md:gap-3">
                                   <div className="flex-1 md:flex-none md:w-72">
                                        <SearchInput
                                             value={searchQuery}
                                             onChange={(e) => setSearchQuery(e.target.value)}
                                        />
                                   </div>
                                   <div className="flex-1 md:flex-none md:min-w-44">
                                        <CustomDropdown
                                             options={[
                                                  "همه دسته‌ها",
                                                  "لپ‌تاپ",
                                                  "لوازم جانبی",
                                                  "مانیتور",
                                             ]}
                                             value={categoryFilter}
                                             onChange={setCategoryFilter}
                                             className="w-full md:min-w-44"
                                        />
                                   </div>
                                   <button
                                        onClick={() => setShowAddModal(true)}
                                        className="px-3 md:px-4 py-2 bg-tech-navy-melo text-white rounded-lg hover:bg-tech-navy-melo transition-colors text-sm flex items-center justify-center md:justify-start gap-2 shrink-0"
                                   >
                                        <Plus className="w-5 h-5" />
                                        <span className="hidden md:inline">افزودن محصول</span>
                                   </button>
                              </div>
                         </div>
                    </div>
                    <div className="overflow-x-auto">
                         <table className="w-full">
                              <thead className="bg-gray-50 hidden md:table-header-group">
                                   <tr>
                                        <th className="px-3 md:px-6 py-3 text-right text-xs font-medium text-gray-600">
                                             محصول
                                        </th>
                                        <th className="px-3 md:px-6 py-3 text-right text-xs font-medium text-gray-600">
                                             دسته‌بندی
                                        </th>
                                        <th className="px-3 md:px-6 py-3 text-right text-xs font-medium text-gray-600">
                                             قیمت (تومان)
                                        </th>
                                        <th className="px-3 md:px-6 py-3 text-right text-xs font-medium text-gray-600 hidden lg:table-cell">
                                             موجودی
                                        </th>
                                        <th className="px-3 md:px-6 py-3 text-right text-xs font-medium text-gray-600 hidden lg:table-cell">
                                             فروش
                                        </th>
                                        <th className="px-3 md:px-6 py-3 text-right text-xs font-medium text-gray-600">
                                             عملیات
                                        </th>
                                   </tr>
                              </thead>
                              <tbody className="divide-y divide-gray-200">
                                   {filteredProducts.map((product) => (
                                        <tr
                                             key={product.id}
                                             className="hover:bg-gray-100 transition-colors block md:table-row border-b md:border-b border-gray-200 mb-3 md:mb-0 p-3 md:p-0 rounded-lg md:rounded-none md:border-0"
                                        >
                                             <td className="px-0 md:px-6 py-2 md:py-4 block md:table-cell text-right md:text-right before:content-attr(data-label) before:font-bold before:float-left md:before:content-none">
                                                  <div className="flex items-center gap-3">
                                                       <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gray-50 flex items-center justify-center text-lg md:text-2xl shrink-0">
                                                            {product.image}
                                                       </div>
                                                       <div className="min-w-0">
                                                            <p className="text-xs md:text-sm font-medium text-gray-900 truncate">
                                                                 {product.name}
                                                            </p>
                                                            <p className="text-xs text-blue-600">
                                                                 #{product.id}
                                                            </p>
                                                       </div>
                                                  </div>
                                             </td>
                                             <td className="px-0 md:px-6 py-2 md:py-4 block md:table-cell text-right text-xs md:text-sm">
                                                  <span className="px-2 md:px-3 py-1 rounded-lg bg-gray-50 text-gray-900 text-xs font-medium inline-block">
                                                       {product.category}
                                                  </span>
                                             </td>
                                             <td className="px-0 md:px-6 py-2 md:py-4 block md:table-cell text-right text-xs md:text-sm font-medium text-gray-900">
                                                  {product.price}
                                             </td>
                                             <td className="px-0 md:px-6 py-2 md:py-4 hidden lg:table-cell">
                                                  <span
                                                       className={`px-2 md:px-3 py-1 text-xs rounded-full font-medium inline-block ${
                                                            product.stock > 20
                                                                 ? "bg-green-50 text-green-700"
                                                                 : product.stock > 10
                                                                   ? "bg-yellow-50 text-yellow-700"
                                                                   : "bg-red-50 text-red-700"
                                                       }`}
                                                  >
                                                       {product.stock} عدد
                                                  </span>
                                             </td>
                                             <td className="px-0 md:px-6 py-2 md:py-4 hidden lg:table-cell text-xs md:text-sm text-gray-600">
                                                  {product.sales}
                                             </td>
                                             <td className="px-0 md:px-6 py-2 md:py-4 block md:table-cell">
                                                  <div className="flex items-center gap-2">
                                                       <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                                            <Edit2 className="w-4 h-4 text-blue-600" />
                                                       </button>
                                                       <button className="p-2 hover:bg-red-50 rounded-lg transition-colors">
                                                            <Trash2 className="w-4 h-4 text-red-600" />
                                                       </button>
                                                  </div>
                                             </td>
                                        </tr>
                                   ))}
                              </tbody>
                         </table>
                    </div>
               </div>

               {/* Add Product Modal */}
               <AddProductModal
                    show={showAddModal}
                    onClose={() => setShowAddModal(false)}
                    onSave={handleAddProduct}
                    product={newProduct}
                    setProduct={setNewProduct}
               />
          </div>
     );
};

export default Products;

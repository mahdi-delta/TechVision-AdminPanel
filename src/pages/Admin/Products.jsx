import { productsData } from "../../data/productsData";
import { useState } from "react";
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
          <div className="space-y-6">
               {/* Stats */}
               <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <StatsCard title="کل محصولات" value={products.length} />
                    <StatsCard
                         title="موجودی کل"
                         value={totalStock}
                         valueColor="text-tech-test"
                    />
                    <StatsCard title="موجودی کم" value={lowStock} valueColor="text-orange-600" />
                    <StatsCard
                         title="دسته‌بندی‌ها"
                         value={new Set(products.map((p) => p.category)).size}
                         valueColor="text-purple-600"
                    />
               </div>

               {/* Main Table */}
               <div className="bg-white rounded-2xl shadow-sm border border-tech-bg">
                    <div className="p-6 border-b border-tech-muted">
                         <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                              <h2 className="text-xl font-semibold text-tech-text">
                                   لیست محصولات
                              </h2>
                              <div className="flex items-center gap-3">
                                   <SearchInput
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                   />
                                   <CustomDropdown
                                        options={[
                                             "همه دسته‌ها",
                                             "لپ‌تاپ",
                                             "لوازم جانبی",
                                             "مانیتور",
                                        ]}
                                        value={categoryFilter}
                                        onChange={setCategoryFilter}
                                        className="min-w-44"
                                   />
                                   <button
                                        onClick={() => setShowAddModal(true)}
                                        className="px-4 py-2 bg-tech-test text-white rounded-lg hover:bg-tech-test transition-colors text-sm flex items-center gap-2"
                                   >
                                        <span>+</span>
                                        <span>افزودن محصول</span>
                                   </button>
                              </div>
                         </div>
                    </div>
                    <div className="overflow-x-auto">
                         <table className="w-full">
                              <thead className="bg-tech-bg">
                                   <tr>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-tech-navy-melo">
                                             محصول
                                        </th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-tech-navy-melo">
                                             دسته‌بندی
                                        </th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-tech-navy-melo">
                                             قیمت (تومان)
                                        </th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-tech-navy-melo">
                                             موجودی
                                        </th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-tech-navy-melo">
                                             فروش
                                        </th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-tech-navy-melo">
                                             عملیات
                                        </th>
                                   </tr>
                              </thead>
                              <tbody className="divide-y divide-tech-muted">
                                   {filteredProducts.map((product) => (
                                        <tr
                                             key={product.id}
                                             className="hover:bg-tech-bg transition-colors"
                                        >
                                             <td className="px-6 py-4">
                                                  <div className="flex items-center gap-3">
                                                       <div className="w-12 h-12 rounded-xl bg-tech-bg flex items-center justify-center text-2xl">
                                                            {product.image}
                                                       </div>
                                                       <div>
                                                            <p className="text-sm font-medium text-tech-text">
                                                                 {product.name}
                                                            </p>
                                                            <p className="text-xs text-tech-test">
                                                                 کد: #{product.id}
                                                            </p>
                                                       </div>
                                                  </div>
                                             </td>
                                             <td className="px-6 py-4">
                                                  <span className="px-3 py-1 rounded-lg bg-tech-bg text-tech-navy text-xs font-medium">
                                                       {product.category}
                                                  </span>
                                             </td>
                                             <td className="px-6 py-4 text-sm font-medium text-tech-text">
                                                  {product.price}
                                             </td>
                                             <td className="px-6 py-4">
                                                  <span
                                                       className={`px-3 py-1 text-xs rounded-full font-medium ${
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
                                             <td className="px-6 py-4 text-sm text-tech-navy-melo">
                                                  {product.sales} فروش
                                             </td>
                                             <td className="px-6 py-4">
                                                  <div className="flex items-center gap-2">
                                                       <button className="p-2 hover:bg-tech-bg rounded-lg transition-colors">
                                                            <svg
                                                                 className="w-4 h-4 text-tech-test"
                                                                 fill="none"
                                                                 stroke="currentColor"
                                                                 viewBox="0 0 24 24"
                                                            >
                                                                 <path
                                                                      strokeLinecap="round"
                                                                      strokeLinejoin="round"
                                                                      strokeWidth={2}
                                                                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                                                 />
                                                            </svg>
                                                       </button>
                                                       <button className="p-2 hover:bg-red-50 rounded-lg transition-colors">
                                                            <svg
                                                                 className="w-4 h-4 text-red-600"
                                                                 fill="none"
                                                                 stroke="currentColor"
                                                                 viewBox="0 0 24 24"
                                                            >
                                                                 <path
                                                                      strokeLinecap="round"
                                                                      strokeLinejoin="round"
                                                                      strokeWidth={2}
                                                                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                                 />
                                                            </svg>
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

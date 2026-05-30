import CustomDropdown from "../common/CustomDropdown";

const AddProductModal = ({ show, onClose, onSave, product, setProduct }) => {
     if (!show) return null;

     const handleSave = () => {
          if (!product.name || !product.price || !product.stock) {
               alert("لطفا تمام فیلدها را پر کنید");
               return;
          }
          onSave();
     };

     return (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
               <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
                    <div className="flex items-center justify-between mb-6">
                         <h3 className="text-xl font-bold text-tech-text">افزودن محصول جدید</h3>
                         <button
                              onClick={onClose}
                              className="text-tech-navy-light hover:text-tech-navy-melo"
                         >
                              <svg
                                   className="w-6 h-6"
                                   fill="none"
                                   stroke="currentColor"
                                   viewBox="0 0 24 24"
                              >
                                   <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                   />
                              </svg>
                         </button>
                    </div>

                    <div className="space-y-4">
                         <div>
                              <label className="block text-sm font-medium text-tech-navy mb-2">
                                   نام محصول
                              </label>
                              <input
                                   type="text"
                                   value={product.name}
                                   onChange={(e) =>
                                        setProduct({ ...product, name: e.target.value })
                                   }
                                   placeholder="مثال: لپ‌تاپ ایسوس"
                                   className="w-full px-4 py-2.5 border border-tech-navy-light rounded-xl focus:border-tech-accent focus:ring-2 focus:ring-tech-muted outline-none text-sm"
                              />
                         </div>

                         <div>
                              <label className="block text-sm font-medium text-tech-navy mb-2">
                                   دسته‌بندی
                              </label>
                              <CustomDropdown
                                   options={["لپ‌تاپ", "لوازم جانبی", "مانیتور"]}
                                   value={product.category}
                                   onChange={(val) => setProduct({ ...product, category: val })}
                                   placeholder="انتخاب دسته‌بندی"
                              />
                         </div>

                         <div className="grid grid-cols-2 gap-4">
                              <div>
                                   <label className="block text-sm font-medium text-tech-navy mb-2">
                                        قیمت (تومان)
                                   </label>
                                   <input
                                        type="text"
                                        value={product.price}
                                        onChange={(e) =>
                                             setProduct({ ...product, price: e.target.value })
                                        }
                                        placeholder="12,500,000"
                                        className="w-full px-4 py-2.5 border border-tech-navy-light rounded-xl focus:border-tech-accent focus:ring-2 focus:ring-tech-muted outline-none text-sm"
                                   />
                              </div>
                              <div>
                                   <label className="block text-sm font-medium text-tech-navy mb-2">
                                        موجودی
                                   </label>
                                   <input
                                        type="number"
                                        value={product.stock}
                                        onChange={(e) =>
                                             setProduct({ ...product, stock: e.target.value })
                                        }
                                        placeholder="25"
                                        className="w-full px-4 py-2.5 border border-tech-navy-light rounded-xl focus:border-tech-accent focus:ring-2 focus:ring-tech-muted outline-none text-sm"
                                   />
                              </div>
                         </div>

                         <div>
                              <label className="block text-sm font-medium text-tech-navy mb-2">
                                   آیکون محصول
                              </label>
                              <div className="flex gap-2">
                                   {["💻", "🖱️", "⌨️", "🖥️", "📱", "🎧"].map((icon) => (
                                        <button
                                             key={icon}
                                             onClick={() => setProduct({ ...product, image: icon })}
                                             className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl transition-all ${
                                                  product.image === icon
                                                       ? "bg-tech-bg border-2 border-tech-accent"
                                                       : "bg-tech-bg hover:bg-tech-muted"
                                             }`}
                                        >
                                             {icon}
                                        </button>
                                   ))}
                              </div>
                         </div>
                    </div>

                    <div className="flex gap-3 mt-6">
                         <button
                              onClick={onClose}
                              className="flex-1 px-4 py-2.5 border border-tech-navy-light text-tech-navy rounded-xl hover:bg-tech-bg transition-colors font-medium text-sm"
                         >
                              لغو
                         </button>
                         <button
                              onClick={handleSave}
                              className="flex-1 px-4 py-2.5 bg-tech-test text-white rounded-xl hover:bg-tech-test transition-colors font-medium text-sm"
                         >
                              افزودن محصول
                         </button>
                    </div>
               </div>
          </div>
     );
};

export default AddProductModal;

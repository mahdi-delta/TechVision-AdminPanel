import { X } from "lucide-react";
import { useEffect } from "react";
import { useFormik } from "formik";
import { productValidationSchema } from "../../../validation/productValidation";
import { useProductStore } from "../../../store/adminStore/useProductStore";
import CustomDropdown from "../common/CustomDropdown";

const EditProductModal = ({ show, onClose, product }) => {
     const updateProduct = useProductStore((state) => state.updateProduct);

     const formik = useFormik({
          initialValues: {
               id: "",
               name: "",
               category: "لپ‌تاپ",
               price: "",
               stock: "",
               image: "💻",
               sales: 0,
          },
          validationSchema: productValidationSchema,
          enableReinitialize: true,
          onSubmit: (values) => {
               updateProduct(values);
               onClose();
               alert("تغییرات محصول با موفقیت ذخیره شد");
          },
     });

     // همگام‌سازی استیت فرمیک به محض لود شدن محصول انتخابی
     useEffect(() => {
          if (product) {
               formik.setValues({
                    id: product.id,
                    name: product.name,
                    category: product.category,
                    price: product.price,
                    stock: product.stock,
                    image: product.image,
                    sales: product.sales || 0,
               });
          }
     }, [product]);

     if (!show) return null;

     return (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
               <div className="bg-white rounded-xl shadow-md max-w-md w-full p-6 border border-gray-200">
                    <div className="flex items-center justify-between mb-6">
                         <h3 className="text-xl font-bold text-gray-900">ویرایش محصول</h3>
                         <button onClick={onClose} className="text-gray-700 hover:text-gray-600">
                              <X className="w-6 h-6" />
                         </button>
                    </div>

                    <form onSubmit={formik.handleSubmit} className="space-y-4">
                         <div>
                              <label className="block text-sm font-medium text-gray-900 mb-2">
                                   نام محصول
                              </label>
                              <input
                                   type="text"
                                   name="name"
                                   value={formik.values.name}
                                   onChange={formik.handleChange}
                                   onBlur={formik.handleBlur}
                                   placeholder="مثال: لپ‌تاپ ایسوس"
                                   className={`w-full px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-gray-100 outline-none text-sm ${
                                        formik.touched.name && formik.errors.name
                                             ? "border-red-500"
                                             : "border-gray-200 focus:border-tech-accent"
                                   }`}
                              />
                              {formik.touched.name && formik.errors.name && (
                                   <p className="text-red-500 text-xs mt-1.5 pr-1">
                                        {formik.errors.name}
                                   </p>
                              )}
                         </div>

                         <div>
                              <label className="block text-sm font-medium text-gray-900 mb-2">
                                   دسته‌بندی
                              </label>
                              <CustomDropdown
                                   options={["لپ‌تاپ", "لوازم جانبی", "مانیتور"]}
                                   value={formik.values.category}
                                   onChange={(val) => formik.setFieldValue("category", val)}
                              />
                         </div>

                         <div className="grid grid-cols-2 gap-4">
                              <div>
                                   <label className="block text-sm font-medium text-gray-900 mb-2">
                                        قیمت (تومان)
                                   </label>
                                   <input
                                        type="text"
                                        name="price"
                                        value={formik.values.price}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        placeholder="مثال: ۴۵,۰۰۰,۰۰۰"
                                        className={`w-full px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-gray-100 outline-none text-sm ${
                                             formik.touched.price && formik.errors.price
                                                  ? "border-red-500"
                                                  : "border-gray-200 focus:border-tech-accent"
                                        }`}
                                   />
                                   {formik.touched.price && formik.errors.price && (
                                        <p className="text-red-500 text-xs mt-1.5 pr-1">
                                             {formik.errors.price}
                                        </p>
                                   )}
                              </div>
                              <div>
                                   <label className="block text-sm font-medium text-gray-900 mb-2">
                                        موجودی
                                   </label>
                                   <input
                                        type="number"
                                        name="stock"
                                        value={formik.values.stock}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        placeholder="مثال: ۱۵"
                                        className={`w-full px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-gray-100 outline-none text-sm ${
                                             formik.touched.stock && formik.errors.stock
                                                  ? "border-red-500"
                                                  : "border-gray-200 focus:border-tech-accent"
                                        }`}
                                   />
                                   {formik.touched.stock && formik.errors.stock && (
                                        <p className="text-red-500 text-xs mt-1.5 pr-1">
                                             {formik.errors.stock}
                                        </p>
                                   )}
                              </div>
                         </div>

                         <div>
                              <label className="block text-sm font-medium text-gray-900 mb-2">
                                   آیکون/تصویر (ایموجی)
                              </label>
                              <div className="flex gap-2">
                                   {["💻", "🖱️", "⌨️", "🖥️", "📱", "🎧"].map((icon) => (
                                        <button
                                             type="button"
                                             key={icon}
                                             onClick={() => formik.setFieldValue("image", icon)}
                                             className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl transition-all ${
                                                  formik.values.image === icon
                                                       ? "bg-gray-50 border-2 border-tech-accent"
                                                       : "bg-gray-50 hover:bg-gray-100 border border-gray-100"
                                             }`}
                                        >
                                             {icon}
                                        </button>
                                   ))}
                              </div>
                         </div>

                         <div className="flex gap-3 mt-6">
                              <button
                                   type="button"
                                   onClick={onClose}
                                   className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-900 rounded-xl hover:bg-gray-100 transition-colors font-medium text-sm"
                              >
                                   لغو
                              </button>
                              <button
                                   type="submit"
                                   className="flex-1 px-4 py-2.5 bg-tech-navy-melo text-white rounded-xl hover:bg-tech-navy/80 transition-colors font-medium text-sm"
                              >
                                   ذخیره تغییرات
                              </button>
                         </div>
                    </form>
               </div>
          </div>
     );
};

export default EditProductModal;

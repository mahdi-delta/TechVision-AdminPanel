import { X } from "lucide-react";
import { useEffect } from "react";
import { useFormik } from "formik";
import { userValidationSchema } from "../../../validation/usersValidation";
import { useUserStore } from "../../../store/adminStore/useUserStore";
import CustomDropdown from "../common/CustomDropdown";

const AddUserModal = ({ show, onClose, user, isEditing = false }) => {
     const addUser = useUserStore((state) => state.addUser);
     const updateUser = useUserStore((state) => state.updateUser);

     const formik = useFormik({
          initialValues: {
               id: "",
               name: "",
               email: "",
               role: "کاربر",
               status: "فعال",
               avatarImage: null,
          },
          validationSchema: userValidationSchema,
          enableReinitialize: true,
          onSubmit: (values, { resetForm }) => {
               if (isEditing) {
                    updateUser(values);
                    alert("تغییرات کاربر با موفقیت ذخیره شد");
               } else {
                    addUser(values);
                    alert("کاربر جدید با موفقیت اضافه شد");
               }
               resetForm();
               onClose();
          },
     });

     useEffect(() => {
          if (user && show) {
               formik.setValues({
                    id: user.id || "",
                    name: user.name || "",
                    email: user.email || "",
                    role: user.role || "کاربر",
                    status: user.status || "فعال",
                    avatarImage: user.avatarImage || null,
               });
          } else if (!isEditing && show) {
               formik.resetForm();
          }
     }, [user, show, isEditing]);

     if (!show) return null;

     const handleImageUpload = (e) => {
          const file = e.target.files[0];
          if (file) {
               const reader = new FileReader();
               reader.onloadend = () => {
                    formik.setFieldValue("avatarImage", reader.result);
               };
               reader.readAsDataURL(file);
          }
     };

     const handleRemoveImage = () => {
          formik.setFieldValue("avatarImage", null);
     };

     const getAvatarInitial = () => {
          return formik.values.name ? formik.values.name.charAt(0) : "ک";
     };

     const handleCancel = () => {
          formik.resetForm();
          onClose();
     };

     return (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
               <div className="bg-white rounded-xl shadow-md max-w-md w-full p-6 border border-gray-200">
                    <div className="flex items-center justify-between mb-6">
                         <h3 className="text-xl font-bold text-gray-900">
                              {isEditing ? "ویرایش کاربر" : "افزودن کاربر جدید"}
                         </h3>
                         <button
                              onClick={handleCancel}
                              className="text-gray-700 hover:text-gray-600"
                         >
                              <X className="w-6 h-6" />
                         </button>
                    </div>

                    <form onSubmit={formik.handleSubmit} className="space-y-4">
                         <div>
                              <label className="block text-sm font-medium text-gray-900 mb-2">
                                   نام و نام خانوادگی
                              </label>
                              <input
                                   type="text"
                                   name="name"
                                   value={formik.values.name}
                                   onChange={formik.handleChange}
                                   onBlur={formik.handleBlur}
                                   placeholder="مثال: علی احمدی"
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
                                   ایمیل
                              </label>
                              <input
                                   type="email"
                                   name="email"
                                   value={formik.values.email}
                                   onChange={formik.handleChange}
                                   onBlur={formik.handleBlur}
                                   placeholder="example@gmail.com"
                                   className={`w-full px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-gray-100 outline-none text-sm ${
                                        formik.touched.email && formik.errors.email
                                             ? "border-red-500"
                                             : "border-gray-200 focus:border-tech-accent"
                                   }`}
                              />
                              {formik.touched.email && formik.errors.email && (
                                   <p className="text-red-500 text-xs mt-1.5 pr-1">
                                        {formik.errors.email}
                                   </p>
                              )}
                         </div>

                         <div>
                              <label className="block text-sm font-medium text-gray-900 mb-2">
                                   نقش کاربری
                              </label>
                              <CustomDropdown
                                   options={["کاربر", "مدیر"]}
                                   value={formik.values.role}
                                   onChange={(val) => formik.setFieldValue("role", val)}
                              />
                         </div>

                         <div>
                              <label className="block text-sm font-medium text-gray-900 mb-2">
                                   وضعیت
                              </label>
                              <CustomDropdown
                                   options={["فعال", "غیرفعال"]}
                                   value={formik.values.status}
                                   onChange={(val) => formik.setFieldValue("status", val)}
                              />
                         </div>

                         <div>
                              <label className="block text-sm font-medium text-gray-900 mb-2">
                                   تصویر پروفایل (اختیاری)
                              </label>
                              <div className="flex items-center gap-4">
                                   <div className="shrink-0">
                                        {formik.values.avatarImage ? (
                                             <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-tech-accent">
                                                  <img
                                                       src={formik.values.avatarImage}
                                                       alt="Preview"
                                                       className="w-full h-full object-cover"
                                                  />
                                                  <button
                                                       type="button"
                                                       onClick={handleRemoveImage}
                                                       className="absolute top-0 right-0 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors text-xs"
                                                  >
                                                       ×
                                                  </button>
                                             </div>
                                        ) : (
                                             <div className="w-20 h-20 rounded-full bg-linear-to-br from-tech-navy to-tech-navy-melo flex items-center justify-center text-white font-bold text-2xl">
                                                  {getAvatarInitial()}
                                             </div>
                                        )}
                                   </div>
                                   <div className="flex-1">
                                        <input
                                             type="file"
                                             id="avatar-upload"
                                             accept="image/*"
                                             onChange={handleImageUpload}
                                             className="hidden"
                                        />
                                        <label
                                             htmlFor="avatar-upload"
                                             className="inline-block px-4 py-2.5 bg-gray-50 text-gray-900 rounded-xl hover:bg-gray-100 transition-colors font-medium text-sm cursor-pointer border border-gray-100"
                                        >
                                             {formik.values.avatarImage
                                                  ? "تغییر تصویر"
                                                  : "انتخاب تصویر"}
                                        </label>
                                        <p className="text-xs text-tech-accent mt-2">
                                             در صورت عدم انتخاب، حرف اول نام نمایش داده می‌شود
                                        </p>
                                   </div>
                              </div>
                         </div>

                         <div className="flex gap-3 mt-6">
                              <button
                                   type="button"
                                   onClick={handleCancel}
                                   className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-900 rounded-xl hover:bg-gray-100 transition-colors font-medium text-sm"
                              >
                                   لغو
                              </button>
                              <button
                                   type="submit"
                                   className="flex-1 px-4 py-2.5 bg-tech-navy-melo text-white rounded-xl hover:bg-tech-navy/80 transition-colors font-medium text-sm"
                              >
                                   {isEditing ? "ذخیره تغییرات" : "افزودن کاربر"}
                              </button>
                         </div>
                    </form>
               </div>
          </div>
     );
};

export default AddUserModal;

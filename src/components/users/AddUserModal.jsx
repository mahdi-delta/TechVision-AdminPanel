import CustomDropdown from "../common/CustomDropdown";

const AddUserModal = ({ show, onClose, onSave, user, setUser, isEditing = false }) => {
     if (!show) return null;

     const handleImageUpload = (e) => {
          const file = e.target.files[0];
          if (file) {
               const reader = new FileReader();
               reader.onloadend = () => {
                    setUser({ ...user, avatarImage: reader.result });
               };
               reader.readAsDataURL(file);
          }
     };

     const handleRemoveImage = () => {
          setUser({ ...user, avatarImage: null });
     };

     const getAvatarInitial = () => {
          return user.name ? user.name.charAt(0) : "ک";
     };

     const handleSave = () => {
          if (!user.name || !user.email || !user.role) {
               alert("لطفا تمام فیلدها را پر کنید");
               return;
          }
          // Validate email format
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(user.email)) {
               alert("لطفا یک ایمیل معتبر وارد کنید");
               return;
          }

          // Set avatar to first letter of name if no image uploaded
          if (!user.avatarImage) {
               setUser({ ...user, avatar: getAvatarInitial() });
          }

          onSave();
     };

     return (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
               <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
                    <div className="flex items-center justify-between mb-6">
                         <h3 className="text-xl font-bold text-ink-black-900">
                              {isEditing ? "ویرایش کاربر" : "افزودن کاربر جدید"}
                         </h3>
                         <button
                              onClick={onClose}
                              className="text-ink-black-400 hover:text-ink-black-600"
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
                              <label className="block text-sm font-medium text-ink-black-700 mb-2">
                                   نام و نام خانوادگی
                              </label>
                              <input
                                   type="text"
                                   value={user.name}
                                   onChange={(e) => setUser({ ...user, name: e.target.value })}
                                   placeholder="مثال: علی احمدی"
                                   className="w-full px-4 py-2.5 border border-bright-snow-300 rounded-xl focus:border-sapphire-sky-500 focus:ring-2 focus:ring-sapphire-sky-200 outline-none text-sm"
                              />
                         </div>

                         <div>
                              <label className="block text-sm font-medium text-ink-black-700 mb-2">
                                   ایمیل
                              </label>
                              <input
                                   type="email"
                                   value={user.email}
                                   onChange={(e) => setUser({ ...user, email: e.target.value })}
                                   placeholder="example@gmail.com"
                                   className="w-full px-4 py-2.5 border border-bright-snow-300 rounded-xl focus:border-sapphire-sky-500 focus:ring-2 focus:ring-sapphire-sky-200 outline-none text-sm"
                              />
                         </div>

                         <div>
                              <label className="block text-sm font-medium text-ink-black-700 mb-2">
                                   نقش کاربری
                              </label>
                              <CustomDropdown
                                   options={["کاربر", "مدیر"]}
                                   value={user.role}
                                   onChange={(val) => setUser({ ...user, role: val })}
                                   placeholder="انتخاب نقش"
                              />
                         </div>

                         <div>
                              <label className="block text-sm font-medium text-ink-black-700 mb-2">
                                   وضعیت
                              </label>
                              <CustomDropdown
                                   options={["فعال", "غیرفعال"]}
                                   value={user.status}
                                   onChange={(val) => setUser({ ...user, status: val })}
                              />
                         </div>

                         <div>
                              <label className="block text-sm font-medium text-ink-black-700 mb-2">
                                   تصویر پروفایل (اختیاری)
                              </label>
                              <div className="flex items-center gap-4">
                                   {/* Preview */}
                                   <div className="shrink-0">
                                        {user.avatarImage ? (
                                             <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-sapphire-sky-500">
                                                  <img
                                                       src={user.avatarImage}
                                                       alt="Preview"
                                                       className="w-full h-full object-cover"
                                                  />
                                                  <button
                                                       onClick={handleRemoveImage}
                                                       className="absolute top-0 right-0 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors text-xs"
                                                  >
                                                       ×
                                                  </button>
                                             </div>
                                        ) : (
                                             <div className="w-20 h-20 rounded-full bg-linear-to-br from-sapphire-sky-500 to-sapphire-sky-700 flex items-center justify-center text-white font-bold text-2xl">
                                                  {getAvatarInitial()}
                                             </div>
                                        )}
                                   </div>
                                   {/* Upload Button */}
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
                                             className="inline-block px-4 py-2.5 bg-bright-snow-100 text-ink-black-700 rounded-xl hover:bg-bright-snow-200 transition-colors font-medium text-sm cursor-pointer"
                                        >
                                             {user.avatarImage ? "تغییر تصویر" : "انتخاب تصویر"}
                                        </label>
                                        <p className="text-xs text-ink-black-500 mt-2">
                                             در صورت عدم انتخاب، حرف اول نام نمایش داده می‌شود
                                        </p>
                                   </div>
                              </div>
                         </div>
                    </div>

                    <div className="flex gap-3 mt-6">
                         <button
                              onClick={onClose}
                              className="flex-1 px-4 py-2.5 border border-bright-snow-300 text-ink-black-700 rounded-xl hover:bg-bright-snow-50 transition-colors font-medium text-sm"
                         >
                              لغو
                         </button>
                         <button
                              onClick={handleSave}
                              className="flex-1 px-4 py-2.5 bg-sapphire-sky-600 text-white rounded-xl hover:bg-sapphire-sky-700 transition-colors font-medium text-sm"
                         >
                              {isEditing ? "ذخیره تغییرات" : "افزودن کاربر"}
                         </button>
                    </div>
               </div>
          </div>
     );
};

export default AddUserModal;

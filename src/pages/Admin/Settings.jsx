import { useState } from "react";
import CustomDropdown from "../../components/AdminComponents/common/CustomDropdown";
import { currentUser } from "../../data/userData";

const Settings = () => {
     const [formData, setFormData] = useState(currentUser);
     const [language, setLanguage] = useState("فارسی");
     const [timezone, setTimezone] = useState("تهران (UTC+3:30)");

     const handleSave = () => {
          alert("تنظیمات با موفقیت ذخیره شد!");
     };

     const handleCancel = () => {
          setFormData({
               name: "مهدی رضایی",
               email: "mahdi@techvision.com",
               phone: "09123456789",
               siteName: "TechVision",
               siteDescription: "پنل مدیریتی فروشگاه آنلاین محصولات تکنولوژی",
          });
          alert("تغییرات لغو شد");
     };

     return (
          <div className="space-y-4 md:space-y-6">
               {/* Profile Settings */}
               <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 md:p-6 mx-3 md:mx-0">
                    <div className="flex items-center gap-3 mb-4 md:mb-6">
                         <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-xl">
                              👤
                         </div>
                         <h2 className="text-lg md:text-xl font-semibold text-gray-900">
                              اطلاعات پروفایل
                         </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
                         <div>
                              <label className="block text-sm font-medium text-gray-900 mb-2">
                                   نام و نام خانوادگی
                              </label>
                              <input
                                   type="text"
                                   value={formData.name}
                                   onChange={(e) =>
                                        setFormData({ ...formData, name: e.target.value })
                                   }
                                   className="w-full px-4 py-2.5 border border-gray-700 rounded-xl focus:border-tech-accent focus:ring-2 focus:ring-gray-100 outline-none text-sm"
                              />
                         </div>
                         <div>
                              <label className="block text-sm font-medium text-gray-900 mb-2">
                                   ایمیل
                              </label>
                              <input
                                   type="email"
                                   value={formData.email}
                                   onChange={(e) =>
                                        setFormData({ ...formData, email: e.target.value })
                                   }
                                   className="w-full px-4 py-2.5 border border-gray-700 rounded-xl focus:border-tech-accent focus:ring-2 focus:ring-gray-100 outline-none text-sm"
                              />
                         </div>
                         <div>
                              <label className="block text-sm font-medium text-gray-900 mb-2">
                                   شماره تلفن
                              </label>
                              <input
                                   type="tel"
                                   value={formData.phone}
                                   onChange={(e) =>
                                        setFormData({ ...formData, phone: e.target.value })
                                   }
                                   className="w-full px-4 py-2.5 border border-gray-700 rounded-xl focus:border-tech-accent focus:ring-2 focus:ring-gray-100 outline-none text-sm"
                              />
                         </div>
                         <div>
                              <label className="block text-sm font-medium text-gray-900 mb-2">
                                   نقش
                              </label>
                              <input
                                   type="text"
                                   defaultValue="مدیر سیستم"
                                   disabled
                                   className="w-full px-4 py-2.5 border border-gray-700 rounded-xl bg-gray-50 text-blue-600 text-sm"
                              />
                         </div>
                    </div>
               </div>

               {/* System Settings */}
               <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 md:p-6 mx-3 md:mx-0">
                    <div className="flex items-center gap-3 mb-4 md:mb-6">
                         <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center text-xl">
                              ⚙️
                         </div>
                         <h2 className="text-lg md:text-xl font-semibold text-gray-900">
                              تنظیمات سیستم
                         </h2>
                    </div>
                    <div className="space-y-3 md:space-y-4">
                         <div>
                              <label className="block text-xs md:text-sm font-medium text-gray-900 mb-2">
                                   نام سایت
                              </label>
                              <input
                                   type="text"
                                   value={formData.siteName}
                                   onChange={(e) =>
                                        setFormData({ ...formData, siteName: e.target.value })
                                   }
                                   className="w-full px-4 py-2.5 border border-gray-700 rounded-xl focus:border-tech-accent focus:ring-2 focus:ring-gray-100 outline-none text-sm"
                              />
                         </div>
                         <div>
                              <label className="block text-xs md:text-sm font-medium text-gray-900 mb-2">
                                   توضیحات سایت
                              </label>
                              <textarea
                                   rows={3}
                                   value={formData.siteDescription}
                                   onChange={(e) =>
                                        setFormData({
                                             ...formData,
                                             siteDescription: e.target.value,
                                        })
                                   }
                                   className="w-full px-4 py-2.5 border border-gray-700 rounded-xl focus:border-tech-accent focus:ring-2 focus:ring-gray-100 outline-none text-sm resize-none"
                              />
                         </div>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
                              <div>
                                   <label className="block text-sm font-medium text-gray-900 mb-2">
                                        زبان پیش‌فرض
                                   </label>
                                   <CustomDropdown
                                        options={["فارسی", "English"]}
                                        value={language}
                                        onChange={setLanguage}
                                   />
                              </div>
                              <div>
                                   <label className="block text-sm font-medium text-gray-900 mb-2">
                                        منطقه زمانی
                                   </label>
                                   <CustomDropdown
                                        options={["تهران (UTC+3:30)", "دبی (UTC+4:00)"]}
                                        value={timezone}
                                        onChange={setTimezone}
                                   />
                              </div>
                         </div>
                    </div>
               </div>

               {/* Display Settings */}
               <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 md:p-6 mx-3 md:mx-0">
                    <div className="flex items-center gap-3 mb-4 md:mb-6">
                         <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-xl">
                              🎨
                         </div>
                         <h2 className="text-lg md:text-xl font-semibold text-gray-900">
                              تنظیمات نمایش
                         </h2>
                    </div>
                    <div className="space-y-3 md:space-y-4">
                         <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                              <div className="flex items-center gap-3">
                                   <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
                                        🌙
                                   </div>
                                   <div>
                                        <p className="text-sm font-medium text-gray-900">
                                             حالت تاریک
                                        </p>
                                        <p className="text-xs text-blue-600">
                                             فعال‌سازی تم تیره برای محیط کار
                                        </p>
                                   </div>
                              </div>
                              <label className="relative inline-flex items-center cursor-pointer">
                                   <input type="checkbox" className="sr-only peer" />
                                   <div className="w-12 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-100 rounded-full peer peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:right-0.5 after:bg-white after:border-gray-700 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                              </label>
                         </div>

                         <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                              <div className="flex items-center gap-3">
                                   <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
                                        📊
                                   </div>
                                   <div>
                                        <p className="text-sm font-medium text-gray-900">
                                             نمایش آمار پیشرفته
                                        </p>
                                        <p className="text-xs text-blue-600">
                                             نمایش نمودارها و آمار تفصیلی در داشبورد
                                        </p>
                                   </div>
                              </div>
                              <label className="relative inline-flex items-center cursor-pointer">
                                   <input type="checkbox" defaultChecked className="sr-only peer" />
                                   <div className="w-12 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-100 rounded-full peer peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:right-0.5 after:bg-white after:border-gray-700 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                              </label>
                         </div>

                         <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                              <div className="flex items-center gap-3">
                                   <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
                                        📱
                                   </div>
                                   <div>
                                        <p className="text-sm font-medium text-gray-900">
                                             حالت فشرده
                                        </p>
                                        <p className="text-xs text-blue-600">
                                             کاهش فضای خالی برای نمایش بیشتر
                                        </p>
                                   </div>
                              </div>
                              <label className="relative inline-flex items-center cursor-pointer">
                                   <input type="checkbox" className="sr-only peer" />
                                   <div className="w-12 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-100 rounded-full peer peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:right-0.5 after:bg-white after:border-gray-700 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                              </label>
                         </div>
                    </div>
               </div>

               {/* Notification Settings */}
               <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 md:p-6 mx-3 md:mx-0">
                    <div className="flex items-center gap-3 mb-4 md:mb-6">
                         <div className="w-10 h-10 rounded-xl bg-yellow-100 flex items-center justify-center text-xl">
                              🔔
                         </div>
                         <h2 className="text-lg md:text-xl font-semibold text-gray-900">
                              اعلان‌ها
                         </h2>
                    </div>
                    <div className="space-y-3 md:space-y-4">
                         <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                              <div className="flex items-center gap-3">
                                   <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
                                        📧
                                   </div>
                                   <div>
                                        <p className="text-sm font-medium text-gray-900">
                                             اعلان‌های ایمیل
                                        </p>
                                        <p className="text-xs text-blue-600">
                                             دریافت اعلان‌ها از طریق ایمیل
                                        </p>
                                   </div>
                              </div>
                              <label className="relative inline-flex items-center cursor-pointer">
                                   <input type="checkbox" defaultChecked className="sr-only peer" />
                                   <div className="w-12 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-100 rounded-full peer peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:right-0.5 after:bg-white after:border-gray-700 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                              </label>
                         </div>

                         <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                              <div className="flex items-center gap-3">
                                   <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
                                        🛒
                                   </div>
                                   <div>
                                        <p className="text-sm font-medium text-gray-900">
                                             سفارشات جدید
                                        </p>
                                        <p className="text-xs text-blue-600">
                                             اطلاع از سفارشات جدید
                                        </p>
                                   </div>
                              </div>
                              <label className="relative inline-flex items-center cursor-pointer">
                                   <input type="checkbox" defaultChecked className="sr-only peer" />
                                   <div className="w-12 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-100 rounded-full peer peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:right-0.5 after:bg-white after:border-gray-700 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                              </label>
                         </div>

                         <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                              <div className="flex items-center gap-3">
                                   <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
                                        📦
                                   </div>
                                   <div>
                                        <p className="text-sm font-medium text-gray-900">
                                             موجودی محصولات
                                        </p>
                                        <p className="text-xs text-blue-600">
                                             هشدار کمبود موجودی محصولات
                                        </p>
                                   </div>
                              </div>
                              <label className="relative inline-flex items-center cursor-pointer">
                                   <input type="checkbox" defaultChecked className="sr-only peer" />
                                   <div className="w-12 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-100 rounded-full peer peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:right-0.5 after:bg-white after:border-gray-700 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                              </label>
                         </div>
                    </div>
               </div>

               {/* Security Settings */}
               <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 md:p-6 mx-3 md:mx-0">
                    <div className="flex items-center gap-3 mb-4 md:mb-6">
                         <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center text-xl">
                              🔒
                         </div>
                         <h2 className="text-lg md:text-xl font-semibold text-gray-900">امنیت</h2>
                    </div>
                    <div className="space-y-4 md:space-y-6">
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                              <div>
                                   <label className="block text-xs md:text-sm font-medium text-gray-900 mb-2">
                                        رمز عبور فعلی
                                   </label>
                                   <input
                                        type="password"
                                        placeholder="رمز عبور فعلی..."
                                        className="w-full px-4 py-2.5 border border-gray-700 rounded-xl focus:border-tech-accent focus:ring-2 focus:ring-gray-100 outline-none text-sm"
                                   />
                              </div>
                              <div>
                                   <label className="block text-xs md:text-sm font-medium text-gray-900 mb-2">
                                        رمز عبور جدید
                                   </label>
                                   <input
                                        type="password"
                                        placeholder="رمز عبور جدید..."
                                        className="w-full px-4 py-2.5 border border-gray-700 rounded-xl focus:border-tech-accent focus:ring-2 focus:ring-gray-100 outline-none text-sm"
                                   />
                              </div>
                         </div>

                         <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                              <div className="flex items-center gap-3">
                                   <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
                                        🔐
                                   </div>
                                   <div>
                                        <p className="text-sm font-medium text-gray-900">
                                             احراز هویت دو مرحله‌ای
                                        </p>
                                        <p className="text-xs text-blue-600">
                                             امنیت بیشتر با تایید دو مرحله‌ای
                                        </p>
                                   </div>
                              </div>
                              <label className="relative inline-flex items-center cursor-pointer">
                                   <input type="checkbox" className="sr-only peer" />
                                   <div className="w-12 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-100 rounded-full peer peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:right-0.5 after:bg-white after:border-gray-700 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                              </label>
                         </div>

                         <button className="w-full md:w-auto px-6 py-2.5 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors font-medium text-sm">
                              تغییر رمز عبور
                         </button>
                    </div>
               </div>

               {/* Action Buttons */}
               <div className="flex flex-col md:flex-row md:justify-end gap-3 px-3 md:px-0">
                    <button
                         onClick={handleCancel}
                         className="px-4 md:px-6 py-2.5 border border-gray-700 text-gray-900 rounded-xl hover:bg-gray-100 transition-colors font-medium text-sm"
                    >
                         انصراف
                    </button>
                    <button
                         onClick={handleSave}
                         className="px-4 md:px-6 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-600 transition-colors font-medium text-sm"
                    >
                         ذخیره تغییرات
                    </button>
               </div>
          </div>
     );
};

export default Settings;

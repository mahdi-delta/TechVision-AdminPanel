import { useState } from "react";

const Settings = () => {
     const [formData, setFormData] = useState({
          name: "مهدی رضایی",
          email: "mahdi@techvision.com",
          phone: "09123456789",
          siteName: "TechVision",
          siteDescription: "پنل مدیریتی فروشگاه آنلاین محصولات تکنولوژی",
     });

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
          <div className="space-y-6">
               {/* Profile Settings */}
               <div className="bg-white rounded-2xl shadow-sm border border-bright-snow-100 p-6">
                    <div className="flex items-center gap-3 mb-6">
                         <div className="w-10 h-10 rounded-xl bg-sapphire-sky-100 flex items-center justify-center text-xl">
                              👤
                         </div>
                         <h2 className="text-xl font-semibold text-ink-black-900">
                              اطلاعات پروفایل
                         </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         <div>
                              <label className="block text-sm font-medium text-ink-black-700 mb-2">
                                   نام و نام خانوادگی
                              </label>
                              <input
                                   type="text"
                                   value={formData.name}
                                   onChange={(e) =>
                                        setFormData({ ...formData, name: e.target.value })
                                   }
                                   className="w-full px-4 py-2.5 border border-bright-snow-300 rounded-xl focus:border-sapphire-sky-500 focus:ring-2 focus:ring-sapphire-sky-200 outline-none text-sm"
                              />
                         </div>
                         <div>
                              <label className="block text-sm font-medium text-ink-black-700 mb-2">
                                   ایمیل
                              </label>
                              <input
                                   type="email"
                                   value={formData.email}
                                   onChange={(e) =>
                                        setFormData({ ...formData, email: e.target.value })
                                   }
                                   className="w-full px-4 py-2.5 border border-bright-snow-300 rounded-xl focus:border-sapphire-sky-500 focus:ring-2 focus:ring-sapphire-sky-200 outline-none text-sm"
                              />
                         </div>
                         <div>
                              <label className="block text-sm font-medium text-ink-black-700 mb-2">
                                   شماره تلفن
                              </label>
                              <input
                                   type="tel"
                                   value={formData.phone}
                                   onChange={(e) =>
                                        setFormData({ ...formData, phone: e.target.value })
                                   }
                                   className="w-full px-4 py-2.5 border border-bright-snow-300 rounded-xl focus:border-sapphire-sky-500 focus:ring-2 focus:ring-sapphire-sky-200 outline-none text-sm"
                              />
                         </div>
                         <div>
                              <label className="block text-sm font-medium text-ink-black-700 mb-2">
                                   نقش
                              </label>
                              <input
                                   type="text"
                                   defaultValue="مدیر سیستم"
                                   disabled
                                   className="w-full px-4 py-2.5 border border-bright-snow-300 rounded-xl bg-bright-snow-50 text-ink-black-500 text-sm"
                              />
                         </div>
                    </div>
               </div>

               {/* System Settings */}
               <div className="bg-white rounded-2xl shadow-sm border border-bright-snow-100 p-6">
                    <div className="flex items-center gap-3 mb-6">
                         <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center text-xl">
                              ⚙️
                         </div>
                         <h2 className="text-xl font-semibold text-ink-black-900">تنظیمات سیستم</h2>
                    </div>
                    <div className="space-y-4">
                         <div>
                              <label className="block text-sm font-medium text-ink-black-700 mb-2">
                                   نام سایت
                              </label>
                              <input
                                   type="text"
                                   value={formData.siteName}
                                   onChange={(e) =>
                                        setFormData({ ...formData, siteName: e.target.value })
                                   }
                                   className="w-full px-4 py-2.5 border border-bright-snow-300 rounded-xl focus:border-sapphire-sky-500 focus:ring-2 focus:ring-sapphire-sky-200 outline-none text-sm"
                              />
                         </div>
                         <div>
                              <label className="block text-sm font-medium text-ink-black-700 mb-2">
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
                                   className="w-full px-4 py-2.5 border border-bright-snow-300 rounded-xl focus:border-sapphire-sky-500 focus:ring-2 focus:ring-sapphire-sky-200 outline-none text-sm resize-none"
                              />
                         </div>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                   <label className="block text-sm font-medium text-ink-black-700 mb-2">
                                        زبان پیش‌فرض
                                   </label>
                                   <select className="w-full px-4 py-2.5 border border-bright-snow-300 rounded-xl focus:border-sapphire-sky-500 outline-none text-sm">
                                        <option>فارسی</option>
                                        <option>English</option>
                                   </select>
                              </div>
                              <div>
                                   <label className="block text-sm font-medium text-ink-black-700 mb-2">
                                        منطقه زمانی
                                   </label>
                                   <select className="w-full px-4 py-2.5 border border-bright-snow-300 rounded-xl focus:border-sapphire-sky-500 outline-none text-sm">
                                        <option>تهران (UTC+3:30)</option>
                                        <option>دبی (UTC+4:00)</option>
                                   </select>
                              </div>
                         </div>
                    </div>
               </div>

               {/* Display Settings */}
               <div className="bg-white rounded-2xl shadow-sm border border-bright-snow-100 p-6">
                    <div className="flex items-center gap-3 mb-6">
                         <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-xl">
                              🎨
                         </div>
                         <h2 className="text-xl font-semibold text-ink-black-900">تنظیمات نمایش</h2>
                    </div>
                    <div className="space-y-4">
                         <div className="flex items-center justify-between p-4 bg-bright-snow-50 rounded-xl">
                              <div className="flex items-center gap-3">
                                   <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
                                        🌙
                                   </div>
                                   <div>
                                        <p className="text-sm font-medium text-ink-black-900">
                                             حالت تاریک
                                        </p>
                                        <p className="text-xs text-ink-black-500">
                                             فعال‌سازی تم تیره برای محیط کار
                                        </p>
                                   </div>
                              </div>
                              <label className="relative inline-flex items-center cursor-pointer">
                                   <input type="checkbox" className="sr-only peer" />
                                   <div className="w-12 h-6 bg-bright-snow-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-sapphire-sky-200 rounded-full peer peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:right-0.5 after:bg-white after:border-bright-snow-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sapphire-sky-600"></div>
                              </label>
                         </div>

                         <div className="flex items-center justify-between p-4 bg-bright-snow-50 rounded-xl">
                              <div className="flex items-center gap-3">
                                   <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
                                        📊
                                   </div>
                                   <div>
                                        <p className="text-sm font-medium text-ink-black-900">
                                             نمایش آمار پیشرفته
                                        </p>
                                        <p className="text-xs text-ink-black-500">
                                             نمایش نمودارها و آمار تفصیلی در داشبورد
                                        </p>
                                   </div>
                              </div>
                              <label className="relative inline-flex items-center cursor-pointer">
                                   <input type="checkbox" defaultChecked className="sr-only peer" />
                                   <div className="w-12 h-6 bg-bright-snow-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-sapphire-sky-200 rounded-full peer peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:right-0.5 after:bg-white after:border-bright-snow-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sapphire-sky-600"></div>
                              </label>
                         </div>

                         <div className="flex items-center justify-between p-4 bg-bright-snow-50 rounded-xl">
                              <div className="flex items-center gap-3">
                                   <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
                                        📱
                                   </div>
                                   <div>
                                        <p className="text-sm font-medium text-ink-black-900">
                                             حالت فشرده
                                        </p>
                                        <p className="text-xs text-ink-black-500">
                                             کاهش فضای خالی برای نمایش بیشتر
                                        </p>
                                   </div>
                              </div>
                              <label className="relative inline-flex items-center cursor-pointer">
                                   <input type="checkbox" className="sr-only peer" />
                                   <div className="w-12 h-6 bg-bright-snow-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-sapphire-sky-200 rounded-full peer peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:right-0.5 after:bg-white after:border-bright-snow-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sapphire-sky-600"></div>
                              </label>
                         </div>
                    </div>
               </div>

               {/* Notification Settings */}
               <div className="bg-white rounded-2xl shadow-sm border border-bright-snow-100 p-6">
                    <div className="flex items-center gap-3 mb-6">
                         <div className="w-10 h-10 rounded-xl bg-yellow-100 flex items-center justify-center text-xl">
                              🔔
                         </div>
                         <h2 className="text-xl font-semibold text-ink-black-900">اعلان‌ها</h2>
                    </div>
                    <div className="space-y-4">
                         <div className="flex items-center justify-between p-4 bg-bright-snow-50 rounded-xl">
                              <div className="flex items-center gap-3">
                                   <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
                                        📧
                                   </div>
                                   <div>
                                        <p className="text-sm font-medium text-ink-black-900">
                                             اعلان‌های ایمیل
                                        </p>
                                        <p className="text-xs text-ink-black-500">
                                             دریافت اعلان‌ها از طریق ایمیل
                                        </p>
                                   </div>
                              </div>
                              <label className="relative inline-flex items-center cursor-pointer">
                                   <input type="checkbox" defaultChecked className="sr-only peer" />
                                   <div className="w-12 h-6 bg-bright-snow-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-sapphire-sky-200 rounded-full peer peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:right-0.5 after:bg-white after:border-bright-snow-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sapphire-sky-600"></div>
                              </label>
                         </div>

                         <div className="flex items-center justify-between p-4 bg-bright-snow-50 rounded-xl">
                              <div className="flex items-center gap-3">
                                   <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
                                        🛒
                                   </div>
                                   <div>
                                        <p className="text-sm font-medium text-ink-black-900">
                                             سفارشات جدید
                                        </p>
                                        <p className="text-xs text-ink-black-500">
                                             اطلاع از سفارشات جدید
                                        </p>
                                   </div>
                              </div>
                              <label className="relative inline-flex items-center cursor-pointer">
                                   <input type="checkbox" defaultChecked className="sr-only peer" />
                                   <div className="w-12 h-6 bg-bright-snow-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-sapphire-sky-200 rounded-full peer peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:right-0.5 after:bg-white after:border-bright-snow-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sapphire-sky-600"></div>
                              </label>
                         </div>

                         <div className="flex items-center justify-between p-4 bg-bright-snow-50 rounded-xl">
                              <div className="flex items-center gap-3">
                                   <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
                                        📦
                                   </div>
                                   <div>
                                        <p className="text-sm font-medium text-ink-black-900">
                                             موجودی محصولات
                                        </p>
                                        <p className="text-xs text-ink-black-500">
                                             هشدار کمبود موجودی محصولات
                                        </p>
                                   </div>
                              </div>
                              <label className="relative inline-flex items-center cursor-pointer">
                                   <input type="checkbox" defaultChecked className="sr-only peer" />
                                   <div className="w-12 h-6 bg-bright-snow-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-sapphire-sky-200 rounded-full peer peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:right-0.5 after:bg-white after:border-bright-snow-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sapphire-sky-600"></div>
                              </label>
                         </div>
                    </div>
               </div>

               {/* Security Settings */}
               <div className="bg-white rounded-2xl shadow-sm border border-bright-snow-100 p-6">
                    <div className="flex items-center gap-3 mb-6">
                         <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center text-xl">
                              🔒
                         </div>
                         <h2 className="text-xl font-semibold text-ink-black-900">امنیت</h2>
                    </div>
                    <div className="space-y-6">
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                   <label className="block text-sm font-medium text-ink-black-700 mb-2">
                                        رمز عبور فعلی
                                   </label>
                                   <input
                                        type="password"
                                        placeholder="رمز عبور فعلی..."
                                        className="w-full px-4 py-2.5 border border-bright-snow-300 rounded-xl focus:border-sapphire-sky-500 focus:ring-2 focus:ring-sapphire-sky-200 outline-none text-sm"
                                   />
                              </div>
                              <div>
                                   <label className="block text-sm font-medium text-ink-black-700 mb-2">
                                        رمز عبور جدید
                                   </label>
                                   <input
                                        type="password"
                                        placeholder="رمز عبور جدید..."
                                        className="w-full px-4 py-2.5 border border-bright-snow-300 rounded-xl focus:border-sapphire-sky-500 focus:ring-2 focus:ring-sapphire-sky-200 outline-none text-sm"
                                   />
                              </div>
                         </div>

                         <div className="flex items-center justify-between p-4 bg-bright-snow-50 rounded-xl">
                              <div className="flex items-center gap-3">
                                   <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
                                        🔐
                                   </div>
                                   <div>
                                        <p className="text-sm font-medium text-ink-black-900">
                                             احراز هویت دو مرحله‌ای
                                        </p>
                                        <p className="text-xs text-ink-black-500">
                                             امنیت بیشتر با تایید دو مرحله‌ای
                                        </p>
                                   </div>
                              </div>
                              <label className="relative inline-flex items-center cursor-pointer">
                                   <input type="checkbox" className="sr-only peer" />
                                   <div className="w-12 h-6 bg-bright-snow-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-sapphire-sky-200 rounded-full peer peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:right-0.5 after:bg-white after:border-bright-snow-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sapphire-sky-600"></div>
                              </label>
                         </div>

                         <button className="w-full md:w-auto px-6 py-2.5 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors font-medium text-sm">
                              تغییر رمز عبور
                         </button>
                    </div>
               </div>

               {/* Action Buttons */}
               <div className="flex justify-end gap-3">
                    <button
                         onClick={handleCancel}
                         className="px-6 py-2.5 border border-bright-snow-300 text-ink-black-700 rounded-xl hover:bg-bright-snow-50 transition-colors font-medium text-sm"
                    >
                         انصراف
                    </button>
                    <button
                         onClick={handleSave}
                         className="px-6 py-2.5 bg-sapphire-sky-600 text-white rounded-xl hover:bg-sapphire-sky-700 transition-colors font-medium text-sm"
                    >
                         ذخیره تغییرات
                    </button>
               </div>
          </div>
     );
};

export default Settings;

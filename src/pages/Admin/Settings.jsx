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
          <div className="space-y-6">
               {/* Profile Settings */}
               <div className="bg-white rounded-2xl shadow-sm border border-tech-bg p-6">
                    <div className="flex items-center gap-3 mb-6">
                         <div className="w-10 h-10 rounded-xl bg-tech-bg flex items-center justify-center text-xl">
                              👤
                         </div>
                         <h2 className="text-xl font-semibold text-tech-text">
                              اطلاعات پروفایل
                         </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         <div>
                              <label className="block text-sm font-medium text-tech-navy mb-2">
                                   نام و نام خانوادگی
                              </label>
                              <input
                                   type="text"
                                   value={formData.name}
                                   onChange={(e) =>
                                        setFormData({ ...formData, name: e.target.value })
                                   }
                                   className="w-full px-4 py-2.5 border border-tech-navy-light rounded-xl focus:border-tech-accent focus:ring-2 focus:ring-tech-muted outline-none text-sm"
                              />
                         </div>
                         <div>
                              <label className="block text-sm font-medium text-tech-navy mb-2">
                                   ایمیل
                              </label>
                              <input
                                   type="email"
                                   value={formData.email}
                                   onChange={(e) =>
                                        setFormData({ ...formData, email: e.target.value })
                                   }
                                   className="w-full px-4 py-2.5 border border-tech-navy-light rounded-xl focus:border-tech-accent focus:ring-2 focus:ring-tech-muted outline-none text-sm"
                              />
                         </div>
                         <div>
                              <label className="block text-sm font-medium text-tech-navy mb-2">
                                   شماره تلفن
                              </label>
                              <input
                                   type="tel"
                                   value={formData.phone}
                                   onChange={(e) =>
                                        setFormData({ ...formData, phone: e.target.value })
                                   }
                                   className="w-full px-4 py-2.5 border border-tech-navy-light rounded-xl focus:border-tech-accent focus:ring-2 focus:ring-tech-muted outline-none text-sm"
                              />
                         </div>
                         <div>
                              <label className="block text-sm font-medium text-tech-navy mb-2">
                                   نقش
                              </label>
                              <input
                                   type="text"
                                   defaultValue="مدیر سیستم"
                                   disabled
                                   className="w-full px-4 py-2.5 border border-tech-navy-light rounded-xl bg-tech-bg text-tech-test text-sm"
                              />
                         </div>
                    </div>
               </div>

               {/* System Settings */}
               <div className="bg-white rounded-2xl shadow-sm border border-tech-bg p-6">
                    <div className="flex items-center gap-3 mb-6">
                         <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center text-xl">
                              ⚙️
                         </div>
                         <h2 className="text-xl font-semibold text-tech-text">تنظیمات سیستم</h2>
                    </div>
                    <div className="space-y-4">
                         <div>
                              <label className="block text-sm font-medium text-tech-navy mb-2">
                                   نام سایت
                              </label>
                              <input
                                   type="text"
                                   value={formData.siteName}
                                   onChange={(e) =>
                                        setFormData({ ...formData, siteName: e.target.value })
                                   }
                                   className="w-full px-4 py-2.5 border border-tech-navy-light rounded-xl focus:border-tech-accent focus:ring-2 focus:ring-tech-muted outline-none text-sm"
                              />
                         </div>
                         <div>
                              <label className="block text-sm font-medium text-tech-navy mb-2">
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
                                   className="w-full px-4 py-2.5 border border-tech-navy-light rounded-xl focus:border-tech-accent focus:ring-2 focus:ring-tech-muted outline-none text-sm resize-none"
                              />
                         </div>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                   <label className="block text-sm font-medium text-tech-navy mb-2">
                                        زبان پیش‌فرض
                                   </label>
                                   <CustomDropdown
                                        options={["فارسی", "English"]}
                                        value={language}
                                        onChange={setLanguage}
                                   />
                              </div>
                              <div>
                                   <label className="block text-sm font-medium text-tech-navy mb-2">
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
               <div className="bg-white rounded-2xl shadow-sm border border-tech-bg p-6">
                    <div className="flex items-center gap-3 mb-6">
                         <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-xl">
                              🎨
                         </div>
                         <h2 className="text-xl font-semibold text-tech-text">تنظیمات نمایش</h2>
                    </div>
                    <div className="space-y-4">
                         <div className="flex items-center justify-between p-4 bg-tech-bg rounded-xl">
                              <div className="flex items-center gap-3">
                                   <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
                                        🌙
                                   </div>
                                   <div>
                                        <p className="text-sm font-medium text-tech-text">
                                             حالت تاریک
                                        </p>
                                        <p className="text-xs text-tech-test">
                                             فعال‌سازی تم تیره برای محیط کار
                                        </p>
                                   </div>
                              </div>
                              <label className="relative inline-flex items-center cursor-pointer">
                                   <input type="checkbox" className="sr-only peer" />
                                   <div className="w-12 h-6 bg-tech-navy-light peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-tech-muted rounded-full peer peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:right-0.5 after:bg-white after:border-tech-navy-light after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-tech-test"></div>
                              </label>
                         </div>

                         <div className="flex items-center justify-between p-4 bg-tech-bg rounded-xl">
                              <div className="flex items-center gap-3">
                                   <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
                                        📊
                                   </div>
                                   <div>
                                        <p className="text-sm font-medium text-tech-text">
                                             نمایش آمار پیشرفته
                                        </p>
                                        <p className="text-xs text-tech-test">
                                             نمایش نمودارها و آمار تفصیلی در داشبورد
                                        </p>
                                   </div>
                              </div>
                              <label className="relative inline-flex items-center cursor-pointer">
                                   <input type="checkbox" defaultChecked className="sr-only peer" />
                                   <div className="w-12 h-6 bg-tech-navy-light peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-tech-muted rounded-full peer peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:right-0.5 after:bg-white after:border-tech-navy-light after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-tech-test"></div>
                              </label>
                         </div>

                         <div className="flex items-center justify-between p-4 bg-tech-bg rounded-xl">
                              <div className="flex items-center gap-3">
                                   <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
                                        📱
                                   </div>
                                   <div>
                                        <p className="text-sm font-medium text-tech-text">
                                             حالت فشرده
                                        </p>
                                        <p className="text-xs text-tech-test">
                                             کاهش فضای خالی برای نمایش بیشتر
                                        </p>
                                   </div>
                              </div>
                              <label className="relative inline-flex items-center cursor-pointer">
                                   <input type="checkbox" className="sr-only peer" />
                                   <div className="w-12 h-6 bg-tech-navy-light peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-tech-muted rounded-full peer peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:right-0.5 after:bg-white after:border-tech-navy-light after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-tech-test"></div>
                              </label>
                         </div>
                    </div>
               </div>

               {/* Notification Settings */}
               <div className="bg-white rounded-2xl shadow-sm border border-tech-bg p-6">
                    <div className="flex items-center gap-3 mb-6">
                         <div className="w-10 h-10 rounded-xl bg-yellow-100 flex items-center justify-center text-xl">
                              🔔
                         </div>
                         <h2 className="text-xl font-semibold text-tech-text">اعلان‌ها</h2>
                    </div>
                    <div className="space-y-4">
                         <div className="flex items-center justify-between p-4 bg-tech-bg rounded-xl">
                              <div className="flex items-center gap-3">
                                   <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
                                        📧
                                   </div>
                                   <div>
                                        <p className="text-sm font-medium text-tech-text">
                                             اعلان‌های ایمیل
                                        </p>
                                        <p className="text-xs text-tech-test">
                                             دریافت اعلان‌ها از طریق ایمیل
                                        </p>
                                   </div>
                              </div>
                              <label className="relative inline-flex items-center cursor-pointer">
                                   <input type="checkbox" defaultChecked className="sr-only peer" />
                                   <div className="w-12 h-6 bg-tech-navy-light peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-tech-muted rounded-full peer peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:right-0.5 after:bg-white after:border-tech-navy-light after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-tech-test"></div>
                              </label>
                         </div>

                         <div className="flex items-center justify-between p-4 bg-tech-bg rounded-xl">
                              <div className="flex items-center gap-3">
                                   <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
                                        🛒
                                   </div>
                                   <div>
                                        <p className="text-sm font-medium text-tech-text">
                                             سفارشات جدید
                                        </p>
                                        <p className="text-xs text-tech-test">
                                             اطلاع از سفارشات جدید
                                        </p>
                                   </div>
                              </div>
                              <label className="relative inline-flex items-center cursor-pointer">
                                   <input type="checkbox" defaultChecked className="sr-only peer" />
                                   <div className="w-12 h-6 bg-tech-navy-light peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-tech-muted rounded-full peer peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:right-0.5 after:bg-white after:border-tech-navy-light after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-tech-test"></div>
                              </label>
                         </div>

                         <div className="flex items-center justify-between p-4 bg-tech-bg rounded-xl">
                              <div className="flex items-center gap-3">
                                   <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
                                        📦
                                   </div>
                                   <div>
                                        <p className="text-sm font-medium text-tech-text">
                                             موجودی محصولات
                                        </p>
                                        <p className="text-xs text-tech-test">
                                             هشدار کمبود موجودی محصولات
                                        </p>
                                   </div>
                              </div>
                              <label className="relative inline-flex items-center cursor-pointer">
                                   <input type="checkbox" defaultChecked className="sr-only peer" />
                                   <div className="w-12 h-6 bg-tech-navy-light peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-tech-muted rounded-full peer peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:right-0.5 after:bg-white after:border-tech-navy-light after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-tech-test"></div>
                              </label>
                         </div>
                    </div>
               </div>

               {/* Security Settings */}
               <div className="bg-white rounded-2xl shadow-sm border border-tech-bg p-6">
                    <div className="flex items-center gap-3 mb-6">
                         <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center text-xl">
                              🔒
                         </div>
                         <h2 className="text-xl font-semibold text-tech-text">امنیت</h2>
                    </div>
                    <div className="space-y-6">
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                   <label className="block text-sm font-medium text-tech-navy mb-2">
                                        رمز عبور فعلی
                                   </label>
                                   <input
                                        type="password"
                                        placeholder="رمز عبور فعلی..."
                                        className="w-full px-4 py-2.5 border border-tech-navy-light rounded-xl focus:border-tech-accent focus:ring-2 focus:ring-tech-muted outline-none text-sm"
                                   />
                              </div>
                              <div>
                                   <label className="block text-sm font-medium text-tech-navy mb-2">
                                        رمز عبور جدید
                                   </label>
                                   <input
                                        type="password"
                                        placeholder="رمز عبور جدید..."
                                        className="w-full px-4 py-2.5 border border-tech-navy-light rounded-xl focus:border-tech-accent focus:ring-2 focus:ring-tech-muted outline-none text-sm"
                                   />
                              </div>
                         </div>

                         <div className="flex items-center justify-between p-4 bg-tech-bg rounded-xl">
                              <div className="flex items-center gap-3">
                                   <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
                                        🔐
                                   </div>
                                   <div>
                                        <p className="text-sm font-medium text-tech-text">
                                             احراز هویت دو مرحله‌ای
                                        </p>
                                        <p className="text-xs text-tech-test">
                                             امنیت بیشتر با تایید دو مرحله‌ای
                                        </p>
                                   </div>
                              </div>
                              <label className="relative inline-flex items-center cursor-pointer">
                                   <input type="checkbox" className="sr-only peer" />
                                   <div className="w-12 h-6 bg-tech-navy-light peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-tech-muted rounded-full peer peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:right-0.5 after:bg-white after:border-tech-navy-light after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-tech-test"></div>
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
                         className="px-6 py-2.5 border border-tech-navy-light text-tech-navy rounded-xl hover:bg-tech-bg transition-colors font-medium text-sm"
                    >
                         انصراف
                    </button>
                    <button
                         onClick={handleSave}
                         className="px-6 py-2.5 bg-tech-test text-white rounded-xl hover:bg-tech-test transition-colors font-medium text-sm"
                    >
                         ذخیره تغییرات
                    </button>
               </div>
          </div>
     );
};

export default Settings;

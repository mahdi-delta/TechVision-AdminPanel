import { usePage } from "../context/PageContext";

const Main = () => {
     const { activePage } = usePage();

     const renderPageContent = () => {
          switch (activePage) {
               case "داشبورد":
                    return (
                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                              <div className="bg-white rounded-lg shadow p-6">
                                   <h3 className="text-lg font-semibold text-ink-black-800 mb-2">
                                        کل کاربران
                                   </h3>
                                   <p className="text-3xl font-bold text-sapphire-sky-600">1,234</p>
                              </div>
                              <div className="bg-white rounded-lg shadow p-6">
                                   <h3 className="text-lg font-semibold text-ink-black-800 mb-2">
                                        سفارشات امروز
                                   </h3>
                                   <p className="text-3xl font-bold text-sapphire-sky-600">56</p>
                              </div>
                              <div className="bg-white rounded-lg shadow p-6">
                                   <h3 className="text-lg font-semibold text-ink-black-800 mb-2">
                                        درآمد ماه
                                   </h3>
                                   <p className="text-3xl font-bold text-sapphire-sky-600">
                                        ۲۵۰ میلیون
                                   </p>
                              </div>
                         </div>
                    );
               case "محصولات":
                    return (
                         <div className="bg-white rounded-lg shadow p-6">
                              <p className="text-ink-black-600">
                                   لیست محصولات در اینجا نمایش داده می‌شود
                              </p>
                         </div>
                    );
               case "کاربران":
                    return (
                         <div className="bg-white rounded-lg shadow p-6">
                              <p className="text-ink-black-600">
                                   لیست کاربران در اینجا نمایش داده می‌شود
                              </p>
                         </div>
                    );
               case "سفارشات":
                    return (
                         <div className="bg-white rounded-lg shadow p-6">
                              <p className="text-ink-black-600">
                                   لیست سفارشات در اینجا نمایش داده می‌شود
                              </p>
                         </div>
                    );
               case "تنظیمات":
                    return (
                         <div className="bg-white rounded-lg shadow p-6">
                              <p className="text-ink-black-600">
                                   تنظیمات سیستم در اینجا قرار می‌گیرد
                              </p>
                         </div>
                    );
               default:
                    return (
                         <div className="bg-white rounded-lg shadow p-6">
                              <p className="text-ink-black-600">صفحه مورد نظر یافت نشد</p>
                         </div>
                    );
          }
     };

     return (
          <div className="p-5 flex-1 overflow-auto">
               <div className="max-w-7xl mx-auto">
                    <h2 className="text-xl font-semibold text-ink-black-800 mb-4">{activePage}</h2>
                    {renderPageContent()}
               </div>
          </div>
     );
};

export default Main;

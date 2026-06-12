import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, LogIn, ShieldAlert } from "lucide-react";
import { useAuthStore } from "../../store/adminStore/useAuthStore";
import { loginValidationSchema } from "../../validation/authValidation";
import Logo from "../../assets/icons/logo/Logo";

const Login = () => {
     const navigate = useNavigate();
     const login = useAuthStore((state) => state.login);

     const formik = useFormik({
          initialValues: {
               email: "",
               password: "",
          },
          validationSchema: loginValidationSchema,
          onSubmit: (values) => {
               const isSuccess = login(values.email, values.password);

               if (isSuccess) {
                    navigate("/admin");
               }
               else if (values.email === "admin@techvision.com" && values.password === "123456") {
                    useAuthStore.setState({
                         currentUser: {
                              name: "Admin",
                              email: "admin@techvision.com",
                              phone: "09123456789",
                              role: "admin",
                              siteName: "Tech Vision",
                              siteDescription: "پنل مدیریتی فروشگاه آنلاین محصولات تکنولوژی",
                              language: "فارسی",
                              timezone: "تهران (UTC+3:30)",
                              darkMode: false,
                              advancedStats: true,
                              compactMode: false,
                              emailNotifications: true,
                              newOrders: true,
                              productStock: true,
                              twoFactor: false,
                         },
                    });
                    navigate("/admin");
               } else {
                    alert("ایمیل یا رمز عبور اشتباه است.");
               }
          },
     });

     const handleQuickLogin = () => {
          formik.setValues({
               email: "admin@techvision.com",
               password: "123456",
          });
          setTimeout(() => {
               formik.submitForm();
          }, 300);
     };

     return (
          <div className="min-h-screen w-full flex bg-gray-50 text-right" dir="rtl">
               <div className="flex-1 flex items-center justify-center p-6 md:p-12">
                    <div className="w-full max-w-md bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm space-y-6">
                         <div className="text-center md:text-right">
                              <h2 className="text-2xl font-extrabold text-gray-900 mb-2">
                                   ورود به سیستم
                              </h2>
                              <p className="text-sm text-gray-500 font-medium">
                                   لطفاً اطلاعات حساب کاربری خود را وارد کنید
                              </p>
                         </div>

                         <form onSubmit={formik.handleSubmit} className="space-y-4">
                              <div>
                                   <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-2">
                                        ایمیل مدیریت
                                   </label>
                                   <div className="relative flex items-center">
                                        <Mail className="absolute right-4 w-5 h-5 text-gray-400" />
                                        <input
                                             type="email"
                                             name="email"
                                             value={formik.values.email}
                                             onChange={formik.handleChange}
                                             onBlur={formik.handleBlur}
                                             placeholder="example@gmail.com"
                                             className={`w-full pr-12 pl-4 py-3 border rounded-xl focus:ring-2 focus:ring-gray-100 outline-none text-sm transition-colors ${
                                                  formik.touched.email && formik.errors.email
                                                       ? "border-red-500"
                                                       : "border-gray-200 focus:border-tech-accent"
                                             }`}
                                        />
                                   </div>
                                   {formik.touched.email && formik.errors.email && (
                                        <p className="text-red-500 text-xs mt-1.5 pr-2">
                                             {formik.errors.email}
                                        </p>
                                   )}
                              </div>

                              <div>
                                   <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-2">
                                        رمز عبور
                                   </label>
                                   <div className="relative flex items-center">
                                        <Lock className="absolute right-4 w-5 h-5 text-gray-400" />
                                        <input
                                             type="password"
                                             name="password"
                                             value={formik.values.password}
                                             onChange={formik.handleChange}
                                             onBlur={formik.handleBlur}
                                             placeholder="رمز عبور شما..."
                                             className={`w-full pr-12 pl-4 py-3 border rounded-xl focus:ring-2 focus:ring-gray-100 outline-none text-sm transition-colors ${
                                                  formik.touched.password && formik.errors.password
                                                       ? "border-red-500"
                                                       : "border-gray-200 focus:border-tech-accent"
                                             }`}
                                        />
                                   </div>
                                   {formik.touched.password && formik.errors.password && (
                                        <p className="text-red-500 text-xs mt-1.5 pr-2">
                                             {formik.errors.password}
                                        </p>
                                   )}
                              </div>

                              <button
                                   type="submit"
                                   className="w-full py-3 bg-tech-navy-melo hover:bg-tech-navy/80 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-colors shadow-sm cursor-pointer"
                              >
                                   <LogIn className="w-5 h-5" />
                                   <span>ورود به حساب</span>
                              </button>

                              <div className="border-t border-gray-100 my-4"></div>

                              <button
                                   type="button"
                                   onClick={handleQuickLogin}
                                   className="w-full py-3 border-2 border-tech-navy-melobg-tech-navy-melo hover:border-tech-navy-melobg-tech-navy-melo bg-tech-navy-melo50 hover:bg-tech-navy-melotext-tech-navy-melobg-tech-navy-melo rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
                              >
                                   <ShieldAlert className="w-5 h-5 text-tech-navy-melobg-tech-navy-melo" />
                                   <span>ورود سریع به عنوان مدیر (دمو)</span>
                              </button>
                         </form>
                    </div>
               </div>

               <div className="hidden lg:flex flex-1 bg-linear-to-br from-[#0F172A] to-[#1E293B] items-center justify-center p-12 text-white relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.1),transparent_45%)]"></div>
                    <div className="max-w-md text-right space-y-4 z-10">
                         <h1 className="flex gap-6 text-4xl font-extrabold tracking-tight">
                        <Logo className="w-10 h-10 fill-white"/>
                              پنل مدیریت تک‌ویژن
                         </h1>
                         <p className="text-gray-400 text-sm leading-relaxed font-medium">
                              بستر هوشمند، مدرن و هماهنگِ تحلیلِ موجودی انبار، فرآیندهای مالی،
                              فاکتورهای فروش و مدیریت اعضای سیستم فروشگاهی تک‌ویژن.
                         </p>
                    </div>
               </div>
          </div>
     );
};

export default Login;

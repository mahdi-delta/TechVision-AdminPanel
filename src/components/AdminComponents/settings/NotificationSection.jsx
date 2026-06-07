import { useFormikContext } from "formik";
import { SettingsToggle } from "./SettingsToggle";
import { MessageCircle, MessageSquareCheck, Package, ShoppingCart } from "lucide-react";

export const NotificationSection = () => {
     const { values, handleChange } = useFormikContext();

     return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 md:p-6 mx-3 md:mx-0">
               <div className="flex items-center gap-3 mb-4 md:mb-6">
                    <div className="w-10 h-10 rounded-full bg-tech-navy/90 flex items-center justify-center text-xl">
                         <MessageCircle className="stroke-white"/>
                    </div>
                    <h2 className="text-lg md:text-xl font-semibold text-gray-900">اعلان‌ها</h2>
               </div>
               <div className="space-y-3 md:space-y-4">
                    <SettingsToggle
                         icon={<MessageSquareCheck className=" stroke-1"/>}
                         title="اعلان‌های ایمیل"
                         description="دریافت اعلان‌ها از طریق ایمیل"
                         name="emailNotifications"
                         checked={values.emailNotifications}
                         onChange={handleChange}
                    />
                    <SettingsToggle
                         icon={<ShoppingCart className=" stroke-1"/>}
                         title="سفارشات جدید"
                         description="اطلاع از سفارشات جدید"
                         name="newOrders"
                         checked={values.newOrders}
                         onChange={handleChange}
                    />
                    <SettingsToggle
                         icon={<Package className=" stroke-1"/>}
                         title="موجودی محصولات"
                         description="هشدار کمبود موجودی محصولات"
                         name="productStock"
                         checked={values.productStock}
                         onChange={handleChange}
                    />
               </div>
          </div>
     );
};

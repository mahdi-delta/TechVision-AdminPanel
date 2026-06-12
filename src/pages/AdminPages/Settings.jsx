import { Formik, Form } from "formik";
import { useAuthStore } from "../../store/adminStore/useAuthStore";
import { settingsValidationSchema } from "../../validation/settingValidation";
import { ProfileSection } from "../../components/AdminComponents/settings/ProfileSection";
import { SystemSection } from "../../components/AdminComponents/settings/SystemSection";
import { DisplaySection } from "../../components/AdminComponents/settings/DisplaySection";
import { NotificationSection } from "../../components/AdminComponents/settings/NotificationSection";
import { SecuritySection } from "../../components/AdminComponents/settings/SecuritySection";

const Settings = () => {
     const currentUser = useAuthStore((state) => state.currentUser);
     const updateCurrentUser = useAuthStore((state) => state.updateCurrentUser);

     if (!currentUser) {
          return (
               <div className="text-center p-8 text-gray-500">
                    کاربری یافت نشد. لطفا ابتدا وارد سیستم شوید.
               </div>
          );
     }

     const initialValues = {
          name: currentUser.name || "",
          email: currentUser.email || "",
          phone: currentUser.phone || "",
          siteName: currentUser.siteName || "",
          siteDescription: currentUser.siteDescription || "",
          language: currentUser.language || "فارسی",
          timezone: currentUser.timezone || "تهران (UTC+3:30)",
          darkMode: currentUser.darkMode ?? false,
          advancedStats: currentUser.advancedStats ?? true,
          compactMode: currentUser.compactMode ?? false,
          emailNotifications: currentUser.emailNotifications ?? true,
          newOrders: currentUser.newOrders ?? true,
          productStock: currentUser.productStock ?? true,
          twoFactor: currentUser.twoFactor ?? false,
     };

     const handleSubmit = (values) => {
          updateCurrentUser(values);
          alert("تنظیمات با موفقیت ذخیره شد!");
     };

     const handleCancel = () => {
          window.Location.reload();
          alert("تغییرات لغو شد.");
     };

     return (
          <Formik
               initialValues={initialValues}
               validationSchema={settingsValidationSchema}
               enableReinitialize
               onSubmit={handleSubmit}
               onReset={handleCancel}
          >
               {({ values, setFieldValue }) => (
                    <div className="space-y-4 md:space-y-6">
                         <Form className="space-y-4 md:space-y-6">
                              <ProfileSection role={currentUser.role} />
                              <SystemSection />
                              <DisplaySection />
                              <NotificationSection />

                              <div className="w-fill flex flex-col md:flex-row md:justify-end gap-3 mx-6 px-3 md:px-0">
                                   <button
                                        type="reset"
                                        className="flex-1/2 px-4 md:px-6 py-2.5 border border-tech-navy-melo/30 outline-tech-navy-melo/0 hover:outline-tech-navy-melo/80 outline-1 outline-offset-3 outline-solid focus:border-tech-navy-melo/70 text-gray-900 rounded-xl hover:bg-gray-100 transition-colors font-medium text-sm"
                                   >
                                        انصراف
                                   </button>
                                   <button
                                        type="submit"
                                        className="flex-1/2 px-4 md:px-6 py-2.5 border outline-tech-navy-melo/0 hover:outline-tech-navy-melo/80 outline-1 outline-offset-3 outline-solid focus:border-tech-navy-melo/70 bg-tech-navy-melo text-white rounded-xl hover:bg-tech-navy/80 transition-colors font-medium text-sm"
                                   >
                                        ذخیره تغییرات
                                   </button>
                              </div>
                         </Form>

                         <SecuritySection
                              twoFactor={values.twoFactor}
                              onTwoFactorChange={(e) =>
                                   setFieldValue("twoFactor", e.target.checked)
                              }
                         />
                    </div>
               )}
          </Formik>
     );
};

export default Settings;

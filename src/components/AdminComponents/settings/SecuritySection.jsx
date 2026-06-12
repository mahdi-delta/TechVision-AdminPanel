import { useFormik } from "formik";
import { passwordValidationSchema } from "../../../validation/settingValidation";
import { useAuthStore } from "../../../store/adminStore/useAuthStore";
import { SettingsInput } from "./SettingsInput";
import { SettingsToggle } from "./SettingsToggle";
import { KeyRound, LockKeyholeIcon } from "lucide-react";

export const SecuritySection = ({ twoFactor, onTwoFactorChange }) => {
     const updatePassword = useAuthStore((state) => state.updatePassword);

     const passwordFormik = useFormik({
          initialValues: {
               currentPassword: "",
               newPassword: "",
          },
          validationSchema: passwordValidationSchema,
          onSubmit: (values, { resetForm }) => {
               const result = updatePassword(values.currentPassword, values.newPassword);

               if (result.success) {
                    alert(result.message);
                    resetForm();
               } else {
                    alert(result.message);
               }
          },
     });

     return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 md:p-6 mx-3 md:mx-0">
               <div className="flex items-center gap-3 mb-4 md:mb-6">
                    <div className="w-10 h-10 rounded-full bg-tech-navy/90 flex items-center justify-center text-xl">
                         <LockKeyholeIcon className="stroke-white" />
                    </div>
                    <h2 className="text-lg md:text-xl font-semibold text-gray-900">امنیت</h2>
               </div>

               <form onSubmit={passwordFormik.handleSubmit} className="space-y-4 md:space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                         <SettingsInput
                              label="رمز عبور فعلی"
                              type="password"
                              name="currentPassword"
                              placeholder="رمز عبور فعلی..."
                              value={passwordFormik.values.currentPassword}
                              onChange={passwordFormik.handleChange}
                              onBlur={passwordFormik.handleBlur}
                              error={passwordFormik.errors.currentPassword}
                              touched={passwordFormik.touched.currentPassword}
                         />
                         <SettingsInput
                              label="رمز عبور جدید"
                              type="password"
                              name="newPassword"
                              placeholder="رمز عبور جدید..."
                              value={passwordFormik.values.newPassword}
                              onChange={passwordFormik.handleChange}
                              onBlur={passwordFormik.handleBlur}
                              error={passwordFormik.errors.newPassword}
                              touched={passwordFormik.touched.newPassword}
                         />
                    </div>

                    <SettingsToggle
                         icon={<KeyRound className=" stroke-2" />}
                         title="احراز هویت دو مرحله‌ای"
                         description="امنیت بیشتر با تایید دو مرحله‌ای"
                         name="twoFactor"
                         checked={twoFactor}
                         onChange={onTwoFactorChange}
                    />

                    <button
                         type="submit"
                         className="w-full md:w-auto px-6 py-2.5 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors font-medium text-sm"
                    >
                         تغییر رمز عبور
                    </button>
               </form>
          </div>
     );
};

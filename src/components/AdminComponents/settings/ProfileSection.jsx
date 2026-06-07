import { useFormikContext } from "formik";
import { SettingsInput } from "./SettingsInput";
import { User2 } from "lucide-react";

export const ProfileSection = ({ role }) => {
     const { values, handleChange, handleBlur, touched, errors } = useFormikContext();

     return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 md:p-6 mx-3 md:mx-0">
               <div className="flex items-center gap-3 mb-4 md:mb-6">
                    <div className="w-10 h-10 rounded-full bg-tech-navy/90 flex items-center justify-center text-xl">
                         <User2 className="stroke-white"/>
                    </div>
                    <h2 className="text-lg md:text-xl font-semibold text-gray-900">
                         اطلاعات پروفایل
                    </h2>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
                    <SettingsInput
                         label="نام و نام خانوادگی"
                         name="name"
                         value={values.name}
                         onChange={handleChange}
                         onBlur={handleBlur}
                         error={errors.name}
                         touched={touched.name}
                    />
                    <SettingsInput
                         label="ایمیل"
                         type="email"
                         name="email"
                         value={values.email}
                         onChange={handleChange}
                         onBlur={handleBlur}
                         error={errors.email}
                         touched={touched.email}
                    />
                    <SettingsInput
                         label="شماره تلفن"
                         type="tel"
                         name="phone"
                         value={values.phone}
                         onChange={handleChange}
                         onBlur={handleBlur}
                         error={errors.phone}
                         touched={touched.phone}
                    />
                    <SettingsInput
                         label="نقش"
                         value={role === "admin" ? "مدیر سیستم" : role}
                         disabled
                    />
               </div>
          </div>
     );
};

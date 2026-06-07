import { useFormikContext } from "formik";
import { SettingsInput } from "./SettingsInput";
import CustomDropdown from "../common/CustomDropdown";
import { Settings } from "lucide-react";

export const SystemSection = () => {
     const { values, handleChange, handleBlur, touched, errors, setFieldValue } =
          useFormikContext();

     return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 md:p-6 mx-3 md:mx-0">
               <div className="flex items-center gap-3 mb-4 md:mb-6">
                    <div className="w-10 h-10 rounded-full bg-tech-navy/90 flex items-center justify-center text-xl">
                         <Settings className="stroke-white" />
                    </div>
                    <h2 className="text-lg md:text-xl font-semibold text-gray-900">
                         تنظیمات سیستم
                    </h2>
               </div>
               <div className="space-y-3 md:space-y-4">
                    <SettingsInput
                         label="نام سایت"
                         name="siteName"
                         value={values.siteName}
                         onChange={handleChange}
                         onBlur={handleBlur}
                         error={errors.siteName}
                         touched={touched.siteName}
                    />
                    <SettingsInput
                         label="توضیحات سایت"
                         name="siteDescription"
                         isTextArea
                         value={values.siteDescription}
                         onChange={handleChange}
                         onBlur={handleBlur}
                         error={errors.siteDescription}
                         touched={touched.siteDescription}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
                         <div>
                              <label className="block text-sm font-medium text-gray-900 mb-2">
                                   زبان پیش‌فرض
                              </label>
                              <CustomDropdown
                                   options={["فارسی", "English"]}
                                   value={values.language}
                                   onChange={(val) => setFieldValue("language", val)}
                              />
                         </div>
                         <div>
                              <label className="block text-sm font-medium text-gray-900 mb-2">
                                   منطقه زمانی
                              </label>
                              <CustomDropdown
                                   options={["تهران (UTC+3:30)", "دبی (UTC+4:00)"]}
                                   value={values.timezone}
                                   onChange={(val) => setFieldValue("timezone", val)}
                              />
                         </div>
                    </div>
               </div>
          </div>
     );
};

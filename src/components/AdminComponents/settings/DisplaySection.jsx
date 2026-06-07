import { useFormikContext } from "formik";
import { SettingsToggle } from "./SettingsToggle";
import { ChartBar, Moon, PaintRoller, Smartphone } from "lucide-react";

export const DisplaySection = () => {
     const { values, handleChange } = useFormikContext();

     return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 md:p-6 mx-3 md:mx-0">
               <div className="flex items-center gap-3 mb-4 md:mb-6">
                    <div className="w-10 h-10 rounded-full bg-tech-navy/90 flex items-center justify-center text-xl">
                         <PaintRoller className="stroke-white"/>
                    </div>
                    <h2 className="text-lg md:text-xl font-semibold text-gray-900">
                         تنظیمات نمایش
                    </h2>
               </div>
               <div className="space-y-3 md:space-y-4">
                    <SettingsToggle
                         icon={<Moon className=" stroke-1"/>}
                         title="حالت تاریک"
                         description="فعال‌سازی تم تیره برای محیط کار"
                         name="darkMode"
                         checked={values.darkMode}
                         onChange={handleChange}
                    />
                    <SettingsToggle
                         icon={<ChartBar className="stroke-1"/>}
                         title="نمایش آمار پیشرفته"
                         description="نمایش نمودارها و آمار تفصیلی در داشبورد"
                         name="advancedStats"
                         checked={values.advancedStats}
                         onChange={handleChange}
                    />
                    <SettingsToggle
                         icon={<Smartphone className="stroke-1"/>}
                         title="حالت فشرده"
                         description="کاهش فضای خالی برای نمایش بیشتر"
                         name="compactMode"
                         checked={values.compactMode}
                         onChange={handleChange}
                    />
               </div>
          </div>
     );
};

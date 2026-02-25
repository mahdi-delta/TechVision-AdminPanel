import DashboardIcon from "../assets/icons/Dashboard/DashboardIcon";
import PackageIcon from "../assets/icons/Dashboard/PackageIcon";
import UsersIcon from "../assets/icons/Dashboard/UsersIcon";
import ReceiptIcon from "../assets/icons/Dashboard/ReceiptIcon";
import SettingsIcon from "../assets/icons/Dashboard/SettingsIcon";

export const mainMenuItems = [
     {
          title: "داشبورد",
          icon: DashboardIcon,
     },
     {
          title: "محصولات",
          icon: PackageIcon,
     },
     {
          title: "کاربران",
          icon: UsersIcon,
     },
     {
          title: "سفارشات",
          icon: ReceiptIcon,
     },
];

export const settingsItem = {
     title: "تنظیمات",
     icon: SettingsIcon,
};

// برای سازگاری با کد قبلی
export const sidebarItems = [...mainMenuItems, settingsItem];

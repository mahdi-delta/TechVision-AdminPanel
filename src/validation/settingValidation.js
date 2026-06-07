import * as Yup from "yup";

export const settingsValidationSchema = Yup.object({
     name: Yup.string().required("نام و نام خانوادگی الزامی است"),
     email: Yup.string().email("فرمت ایمیل نامعتبر است").required("ایمیل الزامی است"),
     phone: Yup.string()
          .matches(/^09\d{9}$/, "شماره تلفن باید ۱۱ رقم بوده و با ۰۹ آغاز شود")
          .required("شماره تلفن الزامی است"),
     siteName: Yup.string().required("نام سایت الزامی است"),
     siteDescription: Yup.string().required("توضیحات سایت الزامی است"),
});

export const passwordValidationSchema = Yup.object({
     currentPassword: Yup.string().required("وارد کردن رمز عبور فعلی الزامی است"),
     newPassword: Yup.string()
          .min(6, "رمز عبور جدید باید حداقل ۶ کاراکتر باشد")
          .required("وارد کردن رمز عبور جدید الزامی است"),
});

import * as Yup from "yup";

export const loginValidationSchema = Yup.object({
     email: Yup.string()
          .email("فرمت ایمیل وارد شده نامعتبر است")
          .required("وارد کردن ایمیل الزامی است"),
     password: Yup.string()
          .min(6, "رمز عبور باید حداقل ۶ کاراکتر باشد")
          .required("وارد کردن رمز عبور الزامی است"),
});
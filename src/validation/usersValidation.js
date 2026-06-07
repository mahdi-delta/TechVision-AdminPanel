import * as Yup from "yup";

export const userValidationSchema = Yup.object({
     name: Yup.string()
          .min(3, "نام و نام خانوادگی باید حداقل ۳ کاراکتر باشد")
          .required("وارد کردن نام و نام خانوادگی الزامی است"),
     email: Yup.string()
          .email("فرمت ایمیل وارد شده نامعتبر است")
          .required("وارد کردن ایمیل الزامی است"),
     role: Yup.string()
          .required("انتخاب نقش کاربری الزامی است"),
     status: Yup.string()
          .required("انتخاب وضعیت الزامی است"),
     avatarImage: Yup.string().nullable(),
});
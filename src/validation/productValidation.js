import * as Yup from "yup";

export const productValidationSchema = Yup.object({
     name: Yup.string()
          .min(3, "نام محصول باید حداقل ۳ کاراکتر باشد")
          .required("نام محصول الزامی است"),
     category: Yup.string().required("انتخاب دسته‌بندی الزامی است"),
     price: Yup.string().required("قیمت محصول الزامی است"),
     stock: Yup.number()
          .typeError("موجودی باید عدد باشد")
          .min(0, "موجودی نمی‌تواند کمتر از صفر باشد")
          .integer("موجودی باید عدد صحیح باشد")
          .required("موجودی محصول الزامی است"),
     image: Yup.string().required("انتخاب یک آیکون الزامی است"),
});

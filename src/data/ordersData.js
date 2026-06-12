export const ordersData = [
     {
          id: 1028,
          customer: "علی احمدی",
          customerAvatar: "ع",
          product: "لپتاپ Dell XPS 15",
          amount: "45,000,000",
          status: "تکمیل شده",
          date: "1403/12/05",
          time: "14:30",
          paymentMethod: "آنلاین",
     },
     {
          id: 1027,
          customer: "مریم حسینی",
          customerAvatar: "م",
          product: "مانیتور سامسونگ 27 اینچ",
          amount: "12,000,000",
          status: "در حال پردازش",
          date: "1403/12/02",
          time: "12:15",
          paymentMethod: "آنلاین",
     },
     {
          id: 1026,
          customer: "رضا محمدی",
          customerAvatar: "ر",
          product: "کیبورد مکانیکی Razer",
          amount: "2,500,000",
          status: "تکمیل شده",
          date: "1403/11/24",
          time: "18:45",
          paymentMethod: "نقدی",
     },
     {
          id: 1025,
          customer: "فاطمه کریمی",
          customerAvatar: "ف",
          product: "ماوس لاجیتک MX Master",
          amount: "850,000",
          status: "تکمیل شده",
          date: "1403/11/10",
          time: "10:20",
          paymentMethod: "آنلاین",
     },
     {
          id: 1024,
          customer: "حسین رضایی",
          customerAvatar: "ح",
          product: "هدفون Sony WH-1000XM4",
          amount: "8,900,000",
          status: "تکمیل شده",
          date: "1403/10/16",
          time: "16:00",
          paymentMethod: "آنلاین",
     },
     {
          id: 1023,
          customer: "زهرا اکبری",
          customerAvatar: "ز",
          product: "تبلت Samsung Galaxy Tab",
          amount: "15,500,000",
          status: "تکمیل شده",
          date: "1403/09/22",
          time: "09:30",
          paymentMethod: "آنلاین",
     },
     {
          id: 1022,
          customer: "امیر نوری",
          customerAvatar: "ا",
          product: "اسپیکر JBL Charge 5",
          amount: "3,200,000",
          status: "در حال پردازش",
          date: "1403/08/11",
          time: "14:10",
          paymentMethod: "نقدی",
     },
     {
          id: 1021,
          customer: "سارا موسوی",
          customerAvatar: "س",
          product: "ساعت هوشمند Apple Watch",
          amount: "22,000,000",
          status: "تکمیل شده",
          date: "1403/07/04",
          time: "11:40",
          paymentMethod: "آنلاین",
     },
];

export const getStatusColor = (status) => {
     switch (status) {
          case "تکمیل شده":
               return "bg-green-50 text-green-700";
          case "در حال پردازش":
               return "bg-blue-50 text-blue-700";
          case "در انتظار تایید":
               return "bg-yellow-50 text-yellow-700";
          case "لغو شده":
               return "bg-red-50 text-red-700";
          default:
               return "bg-tech-bg text-tech-navy-melo";
     }
};

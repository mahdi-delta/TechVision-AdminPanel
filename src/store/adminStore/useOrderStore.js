import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ordersData } from "../../data/ordersData";

export const useOrderStore = create(
     persist(
          (set, get) => ({
               orders: ordersData,

               // اکشن بروزرسانی وضعیت یک سفارش خاص
               updateOrderStatus: (orderId, newStatus) => {
                    const { orders } = get();
                    const updatedOrders = orders.map((order) =>
                         order.id === orderId ? { ...order, status: newStatus } : order,
                    );
                    set({ orders: updatedOrders });
               },
          }),
          {
               name: "order-storage",
          },
     ),
);

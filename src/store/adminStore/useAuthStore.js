import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
     persist(
          (set, get) => ({
               users: [],
               currentUser: {
                    name: "محمد مهدی قربانی",
                    email: "mahdi@techvision.com",
                    phone: "09198862561",
                    role: "admin",
                    siteName: "TechVision",
                    siteDescription: "پنل مدیریتی فروشگاه آنلاین محصولات تکنولوژی",
                    language: "فارسی",
                    timezone: "تهران (UTC+3:30)",
                    darkMode: false,
                    advancedStats: true,
                    compactMode: false,
                    emailNotifications: true,
                    newOrders: true,
                    productStock: true,
                    twoFactor: false,
               },

               register: (userData) => {
                    const { users } = get();
                    const userExists = users.some((u) => u.email === userData.email);
                    if (userExists) return false;

                    set({ users: [...users, userData], currentUser: userData });
                    return true;
               },

               login: (email, password) => {
                    const { users } = get();
                    const user = users.find((u) => u.email === email && u.password === password);

                    if (user) {
                         set({ currentUser: user });
                         return true;
                    }
                    return false;
               },

               logout: () => set({ currentUser: null }),

               updateCurrentUser: (updatedData) => {
                    const { currentUser, users } = get();
                    if (!currentUser) return;

                    const updatedUser = { ...currentUser, ...updatedData };

                    const updatedUsers = users.map((u) =>
                         u.email === currentUser.email ? { ...u, ...updatedData } : u,
                    );

                    set({
                         currentUser: updatedUser,
                         users: updatedUsers,
                    });
               },
          }),
          {
               name: "auth-storage",
               merge: (persistedState, currentState) => {
                    return {
                         ...currentState,
                         ...persistedState,
                         currentUser: {
                              ...currentState.currentUser,
                              ...(persistedState?.currentUser || {}),   
                         },
                    };
               },
          },
     ),
);

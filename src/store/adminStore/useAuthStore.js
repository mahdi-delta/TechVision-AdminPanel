import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
     persist(
          (set, get) => ({
               users: [],
               currentUser: null,

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

               updatePassword: (currentPassword, newPassword) => {
                    const { currentUser, users } = get();
                    if (!currentUser)
                         return {
                              success: false,
                              message: "کاربری یافت نشد. لطفاً ابتدا وارد شوید.",
                         };

                    const userInList = users.find((u) => u.email === currentUser.email);
                    const savedPassword = userInList?.password || "123456";

                    if (currentPassword !== savedPassword) {
                         return { success: false, message: "رمز عبور فعلی اشتباه است." };
                    }

                    const updatedUser = { ...currentUser, password: newPassword };

                    const updatedUsers = users.map((u) =>
                         u.email === currentUser.email ? { ...u, password: newPassword } : u,
                    );

                    const userExists = users.some((u) => u.email === currentUser.email);
                    const finalUsers = userExists
                         ? updatedUsers
                         : [...users, { ...updatedUser, password: newPassword }];

                    set({
                         currentUser: updatedUser,
                         users: finalUsers,
                    });

                    return { success: true, message: "رمز عبور با موفقیت تغییر یافت!" };
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

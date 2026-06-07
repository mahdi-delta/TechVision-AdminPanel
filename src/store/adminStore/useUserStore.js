import { create } from "zustand";
import { persist } from "zustand/middleware";
import { usersTableData } from "../../data/usersData";

export const useUserStore = create(
     persist(
          (set, get) => ({
               users: usersTableData,

               addUser: (newUser) => {
                    const { users } = get();
                    const nextId = users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1;

                    const today = new Date();
                    const formatYear = today.getFullYear() - 621;
                    const formatMonth = String(today.getMonth() + 1).padStart(2, "0");
                    const formatDate = String(today.getDate()).padStart(2, "0");
                    const persianDate = `${formatYear}/${formatMonth}/${formatDate}`;

                    const userToAdd = {
                         ...newUser,
                         id: nextId,
                         avatar: newUser.avatarImage
                              ? null
                              : newUser.name
                                ? newUser.name.charAt(0)
                                : "ک",
                         joinDate: persianDate,
                         orders: 0,
                    };

                    set({ users: [...users, userToAdd] });
               },

               updateUser: (updatedUser) => {
                    const { users } = get();
                    const updatedUsers = users.map((u) =>
                         u.id === updatedUser.id
                              ? {
                                     ...u,
                                     ...updatedUser,
                                     avatar: updatedUser.avatarImage
                                          ? null
                                          : updatedUser.name
                                            ? updatedUser.name.charAt(0)
                                            : "ک",
                                }
                              : u,
                    );
                    set({ users: updatedUsers });
               },

               deleteUser: (id) => {
                    const { users } = get();
                    set({ users: users.filter((u) => u.id !== id) });
               },
          }),
          {
               name: "user-storage",
          },
     ),
);

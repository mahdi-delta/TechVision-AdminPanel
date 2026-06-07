import { create } from "zustand";
import { persist } from "zustand/middleware";
import { productsData } from "../../data/productsData";

export const useProductStore = create(
     persist(
          (set, get) => ({
               products: productsData,

               addProduct: (newProduct) => {
                    const { products } = get();
                    const nextId =
                         products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1;

                    const productToAdd = {
                         ...newProduct,
                         id: nextId,
                         sales: 0,
                         stock: parseInt(newProduct.stock) || 0,
                    };

                    set({ products: [...products, productToAdd] });
               },

               updateProduct: (updatedProduct) => {
                    const { products } = get();
                    const updatedProducts = products.map((p) =>
                         p.id === updatedProduct.id
                              ? { ...updatedProduct, stock: parseInt(updatedProduct.stock) || 0 }
                              : p,
                    );
                    set({ products: updatedProducts });
               },

               deleteProduct: (id) => {
                    const { products } = get();
                    const filteredProducts = products.filter((p) => p.id !== id);
                    set({ products: filteredProducts });
               },
          }),
          {
               name: "product-storage",
          },
     ),
);

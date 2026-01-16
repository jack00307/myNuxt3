import { defineStore } from 'pinia'

export const useDataStore = defineStore('data', {
    state: () => ({
        categories: [
            { id: 1, name: 'Electronics', description: 'Gadgets and devices', count: 12 },
            { id: 2, name: 'Clothing', description: 'Apparel and fashion', count: 25 },
            { id: 3, name: 'Home & Garden', description: 'Furniture and decor', count: 8 },
            { id: 4, name: 'Books', description: 'Fiction and non-fiction', count: 42 },
            { id: 5, name: 'Sports', description: 'Equipment and apparel', count: 18 }
        ],
        products: [
            { id: 1, name: 'iPhone 15', categoryId: 1, price: 999, stock: 50, status: 'In Stock', image: 'https://images.unsplash.com/photo-1696446701796-da61225697cc?w=150&q=80' },
            { id: 2, name: 'MacBook Pro', categoryId: 1, price: 1999, stock: 20, status: 'Low Stock', image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca4?w=150&q=80' },
            { id: 3, name: 'T-Shirt', categoryId: 2, price: 29, stock: 100, status: 'In Stock', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=150&q=80' },
            { id: 4, name: 'Running Shoes', categoryId: 5, price: 120, stock: 15, status: 'In Stock', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=150&q=80' },
            { id: 5, name: 'Coffee Table', categoryId: 3, price: 150, stock: 5, status: 'Low Stock', image: 'https://images.unsplash.com/photo-1532323544230-ac8d436c76e2?w=150&q=80' }
        ]
    }),
    actions: {
        addCategory(category: any) {
            const newId = Math.max(...this.categories.map(c => c.id)) + 1
            this.categories.push({ ...category, id: newId, count: 0 })
        },
        updateCategory(id: number, data: any) {
            const index = this.categories.findIndex(c => c.id === id)
            if (index !== -1) {
                this.categories[index] = { ...this.categories[index], ...data }
            }
        },
        deleteCategory(id: number) {
            this.categories = this.categories.filter(c => c.id !== id)
        },
        addProduct(product: any) {
            const newId = Math.max(...this.products.map(p => p.id)) + 1
            this.products.push({ ...product, id: newId })
        },
        updateProduct(id: number, data: any) {
            const index = this.products.findIndex(p => p.id === id)
            if (index !== -1) {
                this.products[index] = { ...this.products[index], ...data }
            }
        },
        deleteProduct(id: number) {
            this.products = this.products.filter(p => p.id !== id)
        }
    },
    getters: {
        getCategoryName: (state) => (id: number) => {
            // Need to cast id to number as it might be string from form
            const cat = state.categories.find(c => c.id == id)
            return cat ? cat.name : 'Unknown'
        }
    }
})

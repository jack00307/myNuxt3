<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Products</h1>
      <UButton icon="i-heroicons-plus" color="primary" @click="openModal()">Add Product</UButton>
    </div>

    <!-- Search/Filter Bar -->
    <div class="flex flex-col md:flex-row gap-4 mb-6">
      <UInput v-model="search" icon="i-heroicons-magnifying-glass" placeholder="Search products..." class="w-full md:w-64" />
      <USelectMenu 
        v-model="selectedCategory" 
        :options="categoryOptions" 
        placeholder="Filter by Category"
        class="w-full md:w-48"
      />
    </div>

    <UCard :ui="{ body: { padding: '!p-0' } }">
      <UTable :columns="columns" :rows="filteredProducts">
        <template #image-data="{ row }">
          <img :src="row.image" alt="Product" class="w-10 h-10 object-cover rounded-md bg-gray-100 dark:bg-gray-700" />
        </template>
        
        <template #categoryId-data="{ row }">
          <UBadge color="gray" variant="soft">{{ store.getCategoryName(row.categoryId) }}</UBadge>
        </template>

        <template #price-data="{ row }">
          ${{ row.price }}
        </template>

        <template #status-data="{ row }">
           <UBadge :color="row.status === 'In Stock' ? 'green' : (row.status === 'Low Stock' ? 'orange' : 'red')" variant="subtle">{{ row.status }}</UBadge>
        </template>

        <template #actions-data="{ row }">
          <div class="flex gap-2">
            <UButton icon="i-heroicons-pencil" size="xs" color="gray" variant="ghost" @click="openModal(row)" />
            <UButton icon="i-heroicons-trash" size="xs" color="red" variant="ghost" @click="deleteProduct(row)" />
          </div>
        </template>
      </UTable>
    </UCard>

    <UModal v-model="isOpen">
      <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-base font-semibold">{{ isEditing ? 'Edit Product' : 'New Product' }}</h3>
             <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="isOpen = false" />
          </div>
        </template>

        <form @submit.prevent="saveProduct" class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <UFormGroup label="Name" name="name" class="md:col-span-2">
              <UInput v-model="form.name" placeholder="Product Name" autofocus />
            </UFormGroup>
            
            <UFormGroup label="Category" name="categoryId">
              <USelect v-model="form.categoryId" :options="categoryFormOptions" option-attribute="label" value-attribute="value" />
            </UFormGroup>

            <UFormGroup label="Price" name="price">
              <UInput v-model="form.price" type="number" placeholder="0.00" icon="i-heroicons-currency-dollar" />
            </UFormGroup>

            <UFormGroup label="Stock" name="stock">
              <UInput v-model="form.stock" type="number" placeholder="0" />
            </UFormGroup>

            <UFormGroup label="Status" name="status">
              <USelect v-model="form.status" :options="['In Stock', 'Low Stock', 'Out of Stock']" />
            </UFormGroup>

             <UFormGroup label="Image URL" name="image" class="md:col-span-2">
              <UInput v-model="form.image" placeholder="https://..." icon="i-heroicons-photo" />
            </UFormGroup>
          </div>

          <div class="flex justify-end gap-2 mt-4">
            <UButton color="gray" variant="ghost" @click="isOpen = false">Cancel</UButton>
            <UButton type="submit" color="primary">Save</UButton>
          </div>
        </form>
      </UCard>
    </UModal>
  </div>
</template>

<script setup>
const store = useDataStore()
const toast = useToast()

const search = ref('')
const selectedCategory = ref(null)

const columns = [
  { key: 'image', label: '' },
  { key: 'name', label: 'Name', sortable: true },
  { key: 'categoryId', label: 'Category', sortable: true },
  { key: 'price', label: 'Price', sortable: true },
  { key: 'stock', label: 'Stock', sortable: true },
  { key: 'status', label: 'Status' },
  { key: 'actions', label: 'Actions' }
]

const categoryOptions = computed(() => {
  return [{ label: 'All Categories', id: null }, ...store.categories.map(c => ({ label: c.name, id: c.id }))]
})

const categoryFormOptions = computed(() => store.categories.map(c => ({ label: c.name, value: c.id })))

const filteredProducts = computed(() => {
  return store.products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.value.toLowerCase())
    // USelectMenu usually returns the object selected
    const matchesCategory = selectedCategory.value && selectedCategory.value.id 
      ? p.categoryId === selectedCategory.value.id 
      : true
    return matchesSearch && matchesCategory
  })
})

const isOpen = ref(false)
const isEditing = ref(false)
const form = ref({
  id: null,
  name: '',
  categoryId: '',
  price: '',
  stock: '',
  status: 'In Stock',
  image: ''
})

function openModal(product = null) {
  if (product) {
    isEditing.value = true
    form.value = { ...product }
  } else {
    isEditing.value = false
    form.value = { 
      id: null, 
      name: '', 
      categoryId: store.categories[0]?.id || '', 
      price: '', 
      stock: '', 
      status: 'In Stock',
      image: 'https://placehold.co/150'
    }
  }
  isOpen.value = true
}

function saveProduct() {
  if (!form.value.name) return

  if (isEditing.value) {
    store.updateProduct(form.value.id, form.value)
    toast.add({ title: 'Product Updated', icon: 'i-heroicons-check-circle' })
  } else {
    store.addProduct(form.value)
    toast.add({ title: 'Product Created', icon: 'i-heroicons-check-circle' })
  }
  isOpen.value = false
}

function deleteProduct(row) {
  if (confirm('Are you sure you want to delete this product?')) {
    store.deleteProduct(row.id)
    toast.add({ title: 'Product Deleted', color: 'red', icon: 'i-heroicons-trash' })
  }
}
</script>

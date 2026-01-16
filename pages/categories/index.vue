<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Categories</h1>
      <UButton icon="i-heroicons-plus" color="primary" @click="openModal()">Add Category</UButton>
    </div>

    <UCard :ui="{ body: { padding: '!p-0' } }">
      <UTable :columns="columns" :rows="store.categories">
        <template #actions-data="{ row }">
          <div class="flex gap-2">
            <UButton icon="i-heroicons-pencil" size="xs" color="gray" variant="ghost" @click="openModal(row)" />
            <UButton icon="i-heroicons-trash" size="xs" color="red" variant="ghost" @click="deleteCategory(row)" />
          </div>
        </template>
      </UTable>
    </UCard>

    <UModal v-model="isOpen">
      <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-base font-semibold">{{ isEditing ? 'Edit Category' : 'New Category' }}</h3>
            <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="isOpen = false" />
          </div>
        </template>

        <form @submit.prevent="saveCategory" class="space-y-4">
          <UFormGroup label="Name" name="name">
            <UInput v-model="form.name" placeholder="Category Name" autofocus />
          </UFormGroup>
          
          <UFormGroup label="Description" name="description">
            <UTextarea v-model="form.description" placeholder="Short description..." />
          </UFormGroup>

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

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Name', sortable: true },
  { key: 'description', label: 'Description' },
  { key: 'count', label: 'Products', sortable: true },
  { key: 'actions', label: 'Actions' }
]

const isOpen = ref(false)
const isEditing = ref(false)
const form = ref({
  id: null,
  name: '',
  description: ''
})

function openModal(category = null) {
  if (category) {
    isEditing.value = true
    form.value = { ...category }
  } else {
    isEditing.value = false
    form.value = { id: null, name: '', description: '' }
  }
  isOpen.value = true
}

function saveCategory() {
  if (!form.value.name) return

  if (isEditing.value) {
    store.updateCategory(form.value.id, form.value)
    toast.add({ title: 'Category Updated', icon: 'i-heroicons-check-circle' })
  } else {
    store.addCategory(form.value)
    toast.add({ title: 'Category Created', icon: 'i-heroicons-check-circle' })
  }
  isOpen.value = false
}

function deleteCategory(row) {
  if (confirm('Are you sure you want to delete this category?')) {
    store.deleteCategory(row.id)
    toast.add({ title: 'Category Deleted', color: 'red', icon: 'i-heroicons-trash' })
  }
}
</script>

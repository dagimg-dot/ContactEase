<template>
    <div class="flex mr-3 py-2 border shadow-lg hover:shadow-xl rounded-2xl justify-between items-center">
        <ul class="flex gap-48 text-gray-600 ml-3">
            <li>{{ contact.name }}</li>
            <li>{{ contact.email }}</li>
            <li>{{ contact.phoneNumber }}</li>
            <li>{{ contact.address }}</li>
            <li>{{ contact.group }}</li>
        </ul>
        <div @click="handleEditButton" class="flex gap-5 items-center mr-5">
            <div class="rounded-full hover:bg-gray-200 p-2">
                <svg width="18" height="18" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M3.94497 9.04381L8.3707 3.3205C8.61123 3.01186 8.69675 2.65504 8.61658 2.29171C8.54709 1.96141 8.34398 1.64736 8.03931 1.40912L7.29634 0.818918C6.64959 0.304523 5.84782 0.35867 5.38814 0.94887L4.89105 1.59376C4.82691 1.67444 4.84294 1.79356 4.92312 1.85854C4.92312 1.85854 6.17922 2.86567 6.20594 2.88732C6.29146 2.96855 6.35561 3.07684 6.37164 3.20679C6.39837 3.46128 6.22198 3.69953 5.96007 3.73201C5.83713 3.74826 5.71954 3.71036 5.63402 3.63997L4.31378 2.58952C4.24964 2.54133 4.15343 2.55161 4.09998 2.61659L0.962409 6.6776C0.759296 6.93209 0.68981 7.26238 0.759296 7.58185L1.16018 9.31996C1.18156 9.41201 1.26173 9.47699 1.35795 9.47699L3.12183 9.45533C3.44253 9.44991 3.74186 9.30372 3.94497 9.04381ZM6.41471 8.50238H9.29091C9.57152 8.50238 9.79976 8.73358 9.79976 9.01785C9.79976 9.30267 9.57152 9.53333 9.29091 9.53333H6.41471C6.13409 9.53333 5.90586 9.30267 5.90586 9.01785C5.90586 8.73358 6.13409 8.50238 6.41471 8.50238Z"
                        fill="#5D5FEF" />
                </svg>
            </div>
            <div class="rounded-full hover:bg-gray-200 p-2">
                <svg width="18" height="18" viewBox="0 0 11 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M10.0804 2.21202C10.3057 2.21202 10.4933 2.39911 10.4933 2.63719V2.8573C10.4933 3.08958 10.3057 3.28248 10.0804 3.28248H0.480157C0.254249 3.28248 0.0666504 3.08958 0.0666504 2.8573V2.63719C0.0666504 2.39911 0.254249 2.21202 0.480157 2.21202H2.16911C2.5122 2.21202 2.81078 1.96815 2.88796 1.62407L2.9764 1.22902C3.11386 0.690895 3.56624 0.333496 4.08397 0.333496H6.476C6.98809 0.333496 7.44554 0.690896 7.57793 1.20064L7.67257 1.62349C7.74919 1.96815 8.04777 2.21202 8.39142 2.21202H10.0804ZM9.22232 10.2582C9.39865 8.61489 9.70738 4.71072 9.70738 4.67133C9.71864 4.55201 9.67977 4.43905 9.60259 4.34811C9.51978 4.26296 9.41499 4.21257 9.2995 4.21257H1.26486C1.14881 4.21257 1.03839 4.26296 0.961775 4.34811C0.884032 4.43905 0.845723 4.55201 0.851357 4.67133C0.852392 4.67857 0.863469 4.81609 0.88199 5.04601C0.964263 6.06739 1.19341 8.91212 1.34148 10.2582C1.44626 11.2499 2.09695 11.8732 3.03945 11.8958C3.76674 11.9126 4.51601 11.9184 5.28218 11.9184C6.00385 11.9184 6.73678 11.9126 7.48661 11.8958C8.46179 11.879 9.1119 11.2667 9.22232 10.2582Z"
                        fill="#FF0000" />
                </svg>
            </div>
        </div>
    </div>
</template>

<script setup>

// create a contact class for blueprint
class Contact {
    constructor(name, email, phoneNumber, address, group) {
        this.name = name;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.address = address;
        this.group = group;
    }
}


const contact = {
    name: 'John Doe',
    email: 'john.doe@gmail.com',
    phoneNumber: '1234567890',
    address: 'Main St, City',
    group: 'Family'
} 

// create a new contact object
const newContact = new Contact(contact.name, contact.email, contact.phoneNumber, contact.address, contact.group)

const isEditingContact = ref(false)
const emit = defineEmits(['isEditing'])

const handleEditButton = () => {
    isEditingContact.value = true;
    emit('isEditing',isEditingContact.value)
}
</script>

<style scoped></style>
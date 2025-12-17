import { signal } from '@preact/signals-react';
import api from '../../../lib/axios';
import { ContactDefaultValues, ContactForm, ContactPage } from './types';

/* =========================
   STATE
========================= */
export const contactList = signal<ContactForm[]>([]);
export const contactPage = signal<ContactPage | null>(null);

export const contactIsDrawerOpen = signal(false);
export const contactIsEditMode = signal(false);
export const selectedContactId = signal<string | undefined>(undefined);
export const selectedContact = signal<ContactForm>({ ...ContactDefaultValues });

export const contactListLoading = signal(false);
export const contactSaveLoading = signal(false);
export const shouldReloadContacts = signal(false);

export const openAddContact = () => {
  selectedContactId.value = undefined;
  selectedContact.value = { ...ContactDefaultValues };
  contactIsEditMode.value = true;
  contactIsDrawerOpen.value = true;
};

export const openViewContact = (contact: ContactForm) => {
  selectedContactId.value = contact.id;
  selectedContact.value = contact;
  contactIsEditMode.value = false;
  contactIsDrawerOpen.value = true;
};

export const openEditContact = (contact: ContactForm) => {
  selectedContactId.value = contact.id;
  selectedContact.value = contact;
  contactIsEditMode.value = true;
  contactIsDrawerOpen.value = true;
};

export const closeContactDrawer = () => {
  contactIsDrawerOpen.value = false;
  contactIsEditMode.value = false;
  selectedContactId.value = undefined;
};

export const loadContacts = async () => {
  contactListLoading.value = true;
  try {
    const res = await api.get<ContactForm[]>('/user/contacts');
    contactList.value = res.data;
  } finally {
    contactListLoading.value = false;
  }
};

export const addContact = async (data: ContactForm) => {
  contactSaveLoading.value = true;
  try {
    await api.post('/user/contacts/save', data); // ✅ JSON
    await loadContacts();
    closeContactDrawer();
  } finally {
    contactSaveLoading.value = false;
  }
};

export const updateContact = async (id: string, data: ContactForm) => {
  contactSaveLoading.value = true;
  try {
    await api.put(`/user/contacts/${id}`, data); // ✅ JSON
    await loadContacts();
    closeContactDrawer();
  } finally {
    contactSaveLoading.value = false;
  }
};


// 🔹 Delete
export const contactDeleteLoading = signal<boolean>(false);
export const deleteContact = async (id: string) => {
  try {
    await api.delete(`/user/contacts/${id}`);
    await loadContacts();
  } catch (err) {
    console.error(err);
  }
};


export const toggleFavorite = (id: string) => {
  contactList.value = contactList.value.map((c) => (c.id === id ? { ...c, favorite: !c.favorite } : c));
};

// import { signal } from '@preact/signals-react';
// import api from '../../../lib/axios';
// import { ContactDefaultValues, ContactForm, ContactPage } from './types';

// /* =========================
//    UI STATE (Drawer / Mode)
// ========================= */
// export const contactIsDrawerOpen = signal<boolean>(false);
// export const contactIsEditMode = signal<boolean>(false);
// export const selectedContactId = signal<string | undefined>(undefined);
// export const selectedContact = signal<ContactForm>({ ...ContactDefaultValues });
// export const shouldReloadContacts = signal<boolean>(false);

// export const OnUpdateSelectedContact = (contact: ContactForm) => {
//   selectedContact.value = contact;
// };
// /* =========================
//    OPEN / CLOSE HANDLERS
// ========================= */
// export const openAddContact = () => {
//   selectedContactId.value = undefined;
//   selectedContact.value = { ...ContactDefaultValues };
//   contactIsEditMode.value = true;
//   contactIsDrawerOpen.value = true;
// };

// export const openViewContact = (contact: ContactForm) => {
//   selectedContactId.value = contact.id;
//   selectedContact.value = contact;
//   contactIsEditMode.value = false;
//   contactIsDrawerOpen.value = true;
// };

// export const openEditContact = (contact: ContactForm) => {
//   selectedContactId.value = contact.id;
//   selectedContact.value = contact;
//   contactIsEditMode.value = true;
//   contactIsDrawerOpen.value = true;
// };

// export const closeContactDrawer = () => {
//   selectedContactId.value = undefined;
//   contactIsEditMode.value = false;
//   contactIsDrawerOpen.value = false;
// };

// /* =========================
//    API LOADING STATES
// ========================= */
// export const contactListLoading = signal<boolean>(false);
// export const contactSaveLoading = signal<boolean>(false);
// export const contactDeleteLoading = signal<boolean>(false);

// /* =========================
//    API CALLS
// ========================= */

// // 🔹 Get paginated contacts
// export const fetchContacts = async (
//   page = 0,
//   size = 10,
//   search?: { field?: string; value?: string }
// ): Promise<ContactPage> => {
//   try {
//     contactListLoading.value = true;

//     const params: any = { page, size };
//     if (search?.field && search?.value) {
//       params.field = search.field;
//       params.value = search.value;
//     }

//     const res = await api.get<ContactPage>('/contacts', { params });
//     return res.data;
//   } catch (err: any) {
//     throw err;
//   } finally {
//     contactListLoading.value = false;
//   }
// };

// // 🔹 Get single contact
// export const fetchContactById = async (id: string) => {
//   try {
//     const res = await api.get<ContactForm>(`/contacts/${id}`);
//     selectedContact.value = res.data;
//     return res.data;
//   } catch (err: any) {
//     throw err;
//   }
// };

// // 🔹 Add new contact
// export const addContact = async (data: FormData) => {
//   try {
//     contactSaveLoading.value = true;

//     await api.post('/contacts', data, {
//       headers: { 'Content-Type': 'multipart/form-data' }
//     });

//     shouldReloadContacts.value = true;
//     closeContactDrawer();
//   } catch (err: any) {
//     throw err;
//   } finally {
//     contactSaveLoading.value = false;
//   }
// };

// // 🔹 Update contact
// export const updateContact = async (id: string, data: FormData) => {
//   try {
//     contactSaveLoading.value = true;

//     await api.put(`/contacts/${id}`, data, {
//       headers: { 'Content-Type': 'multipart/form-data' }
//     });

//     shouldReloadContacts.value = true;
//     closeContactDrawer();
//   } catch (err: any) {
//     throw err;
//   } finally {
//     contactSaveLoading.value = false;
//   }
// };
// export const deleteContact = async (id: string) => {
//   try {
//     contactDeleteLoading.value = true;

//     await api.delete(`/contacts/${id}`);
//     shouldReloadContacts.value = true;
//   } catch (err: any) {
//   } finally {
//     contactDeleteLoading.value = false;
//   }
// };

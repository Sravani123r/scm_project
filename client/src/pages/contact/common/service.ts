import { signal } from '@preact/signals-react';
import api from '../../../lib/axios';
import { ContactDefaultValues, ContactForm, ContactPageType } from './types';

export const contactList = signal<ContactForm[]>([]);
export const contactPage = signal<ContactPageType | null>(null);


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

export const skip = signal<number>(0); // backend page (0-based)
export const limit = signal<number>(10);
export const total = signal<number>(0);
export const searchTerm = signal<string>('');

export const loadContacts = async (params?: { skip?: number; limit?: number; searchTerm?: string }) => {
  contactListLoading.value = true;

  try {
    if (params?.skip !== undefined) skip.value = params.skip;
    if (params?.limit !== undefined) limit.value = params.limit;
    if (params?.searchTerm !== undefined) searchTerm.value = params.searchTerm;

    const res = await api.get<ContactPageType>('/user/contacts', {

      params: {
        skip: skip.value,
        limit: limit.value,
        ...(searchTerm.value ? { searchTerm: searchTerm.value } : {})
      }
    });

    contactList.value = res.data.data ?? [];
    total.value = res.data.total ?? 0;

    contactPage.value = {
      skip: res.data.skip ?? skip.value,
      limit: res.data.limit ?? limit.value,
      total: res.data.total ?? 0
    };
  } finally {
    contactListLoading.value = false;
  }
};


export const addContact = async (data: ContactForm) => {
  contactSaveLoading.value = true;

  try {
    const formData = new FormData();

    formData.append(
      'data',
      new Blob(
        [
          JSON.stringify({
            name: data.name,
            email: data.email,
            phoneNumber: data.phoneNumber,
            address: data.address,
            description: data.description,
            websiteLink: data.websiteLink,
            linkedInLink: data.linkedInLink,
            favorite: data.favorite
          })
        ],
        { type: 'application/json' }
      )
    );

    if (data.image) {
      formData.append('image', data.image);
    }

    await api.post('/user/contacts/save', formData);
    await loadContacts();
    closeContactDrawer();
  } finally {
    contactSaveLoading.value = false;
  }
};

export const updateContact = async (id: string, data: ContactForm) => {
  contactSaveLoading.value = true;

  try {
    const formData = new FormData();

    formData.append(
      'data',
      new Blob(
        [
          JSON.stringify({
            name: data.name,
            email: data.email,
            phoneNumber: data.phoneNumber,
            address: data.address,
            description: data.description,
            websiteLink: data.websiteLink,
            linkedInLink: data.linkedInLink,
            favorite: data.favorite
          })
        ],
        { type: 'application/json' }
      )
    );

    if (data.image) {
      formData.append('image', data.image);
    }

    await api.put(`/user/contacts/${id}`, formData);
    await loadContacts();
    closeContactDrawer();
  } finally {
    contactSaveLoading.value = false;
  }
};

export const contactDeleteLoading = signal<boolean>(false);
export const deleteContact = async (id: string) => {
  try {
    await api.delete(`/user/contacts/${id}`);
    await loadContacts();
  } catch (err) {
    console.error(err);
  }
};


export const toggleFavorite = async (id: string) => {
  contactList.value = contactList.value.map((c) => (c.id === id ? { ...c, favorite: !c.favorite } : c));

  try {
    await api.patch(`/user/contacts/${id}/favorite`);
  } catch (err) {
    console.error(err);
    contactList.value = contactList.value.map((c) => (c.id === id ? { ...c, favorite: !c.favorite } : c));
  }
};

export const loadFavorites = async () => {
  const res = await api.get<ContactForm[]>('/user/contacts/favorites');
  contactList.value = res.data;
};




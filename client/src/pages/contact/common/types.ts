export interface ContactForm {
  id?: string |any;
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  picture?: string;
  image?: File;
  description?: string;
  favorite: boolean;
  websiteLink?: string;
  linkedInLink?: string;
}

export const ContactDefaultValues: ContactForm = {
  name: '',
  email: '',
  phoneNumber: '',
  address: '',
  description: '',
  websiteLink: '',
  linkedInLink: '',
  favorite: false
};

export type ContactPageType = {
  data?: any;
  total?: number;
  skip?: number;
  limit?: number;
  searchTerm?: string;
};


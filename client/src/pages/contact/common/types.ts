export interface ContactForm {
  id?: string | any;
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  picture?: string;
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

export type ContactPage = {
  content: ContactForm[];
  totalPages: number;
  totalElements: number;
  number: number;
  size: number;
};

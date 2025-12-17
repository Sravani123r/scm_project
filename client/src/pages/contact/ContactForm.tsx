import { Button, Checkbox, Form, Input, Textarea } from '@heroui/react';
import { useSignals } from '@preact/signals-react/runtime';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { addContact, closeContactDrawer, loadContacts, selectedContact, updateContact } from './common/service';
import { ContactForm as ContactType } from './common/types';

export default function ContactForm() {
  useSignals();

  const { register, handleSubmit, reset, watch } = useForm<ContactType>({
    defaultValues: selectedContact.value
  });

  useEffect(() => {
    reset(selectedContact.value);
  }, [selectedContact.value, reset]);

const onSubmit = async (data: ContactType) => {
  const payload = {
    name: data.name,
    email: data.email,
    phoneNumber: data.phoneNumber,
    address: data.address,
    description: data.description,
    websiteLink: data.websiteLink,
    linkedInLink: data.linkedInLink,
    favorite: data.favorite
  };

  try {
    if (selectedContact.value?.id) {
      await updateContact(selectedContact.value.id, payload);
    } else {
      await addContact(payload);
    }

    closeContactDrawer();
    await loadContacts();
  } catch (err) {
    console.error(err);
  }
};


  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="p-6">
      <h3 className="text-xl font-semibold">{selectedContact.value?.id ? 'Edit Contact' : 'Add Contact'}</h3>

      <Input label="Name" {...register('name', { required: true })} />

      <Input label="Email" type="email" {...register('email')} />

      <Input label="Phone" {...register('phoneNumber')} />

      <Textarea label="Address" {...register('address')} />

      <Textarea label="Description" {...register('description')} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        <Input label="Website Link" {...register('websiteLink')} />
        <Input label="LinkedIn Link" {...register('linkedInLink')} />
      </div>

      {/* IMAGE */}
      <Input type="file" label="Contact Image" {...register('picture')} />

      {/* FAVORITE */}
      <Checkbox {...register('favorite')}>Mark as Favorite</Checkbox>

      <div className="flex justify-end gap-3">
        <Button variant="bordered" onPress={closeContactDrawer}>
          Cancel
        </Button>
        <Button color="primary" type="submit">
          Save
        </Button>
      </div>
    </Form>
  );
}

import { Button, Checkbox, Form, Input, Textarea } from '@heroui/react';
import { useSignals } from '@preact/signals-react/runtime';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import userImage from '../../assets/profileImage.jpg';

import { addContact, closeContactDrawer, loadContacts, selectedContact, updateContact } from './common/service';

import type { ContactForm as ContactType } from './common/types';

export default function ContactForm() {
  useSignals();

  const { register, handleSubmit, reset, setValue, watch } = useForm<ContactType>({
    defaultValues: selectedContact.value
  });

  /* ---------------- RESET WHEN SELECTED CONTACT CHANGES ---------------- */
  useEffect(() => {
    reset(selectedContact.value);
  }, [selectedContact.value, reset]);

  /* ---------------- IMAGE HANDLING ---------------- */
  const imageFile = watch('image');

  const imagePreview = useMemo(() => {
    if (imageFile instanceof File) {
      return URL.createObjectURL(imageFile);
    }
    // ✅ default image before upload
    return selectedContact.value.picture || userImage;
  }, [imageFile, selectedContact.value.picture]);

  // cleanup object URL
  useEffect(() => {
    return () => {
      if (imageFile instanceof File) {
        URL.revokeObjectURL(imageFile as any);
      }
    };
  }, [imageFile]);

  /* ---------------- SUBMIT ---------------- */
  const onSubmit = async (data: ContactType) => {
    try {
      if (selectedContact.value?.id) {
        await updateContact(selectedContact.value.id, data);
      } else {
        await addContact(data);
      }

      closeContactDrawer();
      await loadContacts();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
      <h3 className="text-xl font-semibold">{selectedContact.value?.id ? 'Edit Contact' : 'Add Contact'}</h3>

      {/* ---------------- IMAGE UPLOAD ---------------- */}
      <div className="flex items-center gap-6">
        {/* PREVIEW */}
        <img src={imagePreview} alt="Contact" className="h-24 w-24 rounded-full object-cover border shadow" />

        {/* FILE PICKER */}
        <div className="flex flex-col gap-2">
          <input
            id="contact-image"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) setValue('image', file);
            }}
          />

          <label
            htmlFor="contact-image"
            className="
              inline-flex items-center justify-center
              px-4 py-2
              rounded-md
              bg-blue-600 text-white
              font-medium text-sm
              cursor-pointer
              hover:bg-blue-500
              focus:outline-none
              focus:ring-2 focus:ring-blue-400
              transition
            "
          >
            Choose Image
          </label>

          {imageFile instanceof File && <span className="text-xs text-gray-500">Selected: {imageFile.name}</span>}
        </div>
      </div>

      {/* ---------------- FIELDS ---------------- */}
      <Input label="Name" {...register('name', { required: true })} />
      <Input label="Email" type="email" {...register('email')} />
      <Input label="Phone" {...register('phoneNumber')} />

      <Textarea label="Address" {...register('address')} />
      <Textarea label="Description" {...register('description')} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input label="Website" {...register('websiteLink')} />
        <Input label="LinkedIn" {...register('linkedInLink')} />
      </div>

      <Checkbox {...register('favorite')}>Mark as Favorite</Checkbox>

      {/* ---------------- ACTIONS ---------------- */}
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

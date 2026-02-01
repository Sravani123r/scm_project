import {
  Button,
  Input,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow
} from '@heroui/react';
import { useSignals } from '@preact/signals-react/runtime';
import { useEffect } from 'react';
import { MdDelete, MdOutlineFavorite } from 'react-icons/md';
import { VscEye } from 'react-icons/vsc';
import { useSearchParams } from 'react-router-dom';

import {
  contactList,
  deleteContact,
  limit,
  loadContacts,
  openAddContact,
  openViewContact,
  searchTerm,
  skip,
  toggleFavorite,
  total
} from './common/service';

export default function ContactList() {
  useSignals();

  const [searchParams, setSearchParams] = useSearchParams();

  // 🔥 READ FROM URL ON LOAD
  useEffect(() => {
    const pageFromUrl = Number(searchParams.get('page')) || 1;
    const searchFromUrl = searchParams.get('search') || '';

    searchTerm.value = searchFromUrl;

    loadContacts({
      skip: pageFromUrl - 1,
      searchTerm: searchFromUrl
    });
  }, []);

  const totalPages = Math.ceil(total.value / limit.value);

  return (
    <section className="p-6">
      {/* HEADER */}
      <div className="flex justify-between items-center mt-5 mb-5 gap-3">
        <h2 className="text-2xl font-bold">Contacts</h2>

        <Input
          type="search"
          placeholder="Search"
          value={searchTerm.value}
          onChange={(e) => {
            searchTerm.value = e.target.value;
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              setSearchParams({
                page: '1',
                search: searchTerm.value
              });

              loadContacts({
                skip: 0,
                searchTerm: searchTerm.value
              });
            }
          }}
        />

        <Button color="primary" onPress={openAddContact}>
          Add Contact
        </Button>
      </div>

      {/* TABLE */}
      <Table aria-label="Contacts table">
        <TableHeader>
          <TableColumn>Name</TableColumn>
          <TableColumn className="text-center">Phone</TableColumn>
          <TableColumn align="end">Actions</TableColumn>
        </TableHeader>

        <TableBody emptyContent="No contacts found">
          {contactList.value.map((contact) => (
            <TableRow key={contact.id}>
              <TableCell>{contact.name}</TableCell>
              <TableCell className="text-center">{contact.phoneNumber}</TableCell>
              <TableCell>
                <div className="flex justify-end gap-3">
                  <Button
                    isIconOnly
                    variant="light"
                    onPress={() => toggleFavorite(contact.id)}
                    className={contact.favorite ? 'text-red-500' : 'text-gray-500'}
                  >
                    <MdOutlineFavorite size={20} />
                  </Button>

                  <Button isIconOnly variant="light" onPress={() => openViewContact(contact)} className="text-blue-600">
                    <VscEye size={20} />
                  </Button>
                  <Button
                    onPress={() => deleteContact(contact.id)}
                    title="Delete contact"
                    className="text-red-600"
                  >
                    <MdDelete size={20} />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex justify-center p-2">
          <Pagination
            showControls
            color="success"
            page={skip.value + 1}
            total={totalPages}
            onChange={(page) => {
              // 🔥 UPDATE URL
              setSearchParams({
                page: String(page),
                ...(searchTerm.value ? { search: searchTerm.value } : {})
              });

              loadContacts({ skip: page - 1 });
            }}
          />
        </div>
      )}
    </section>
  );
}

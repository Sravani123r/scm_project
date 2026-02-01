import { useSignals } from '@preact/signals-react/runtime';
import { MdDelete, MdOutlineFavorite } from 'react-icons/md';
import { VscEye } from 'react-icons/vsc';

import { Button, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@heroui/react';
import { useEffect } from 'react';
import { contactList, deleteContact, loadFavorites, openViewContact, toggleFavorite } from './common/service';

export const Favorites = () => {
  useSignals();

  useEffect(() => {
    loadFavorites();
  }, []);

  const favoriteContacts = contactList.value.filter((c) => c.favorite);

  return (
    <section className="p-6">
      <h2 className="text-2xl font-bold mb-6">Favorite Contacts</h2>

      {favoriteContacts.length === 0 ? (
        <p className="text-gray-500">No favorite contacts found</p>
      ) : (
        <Table className="w-full border rounded-lg">
          <TableHeader>
            <TableColumn>Name</TableColumn>
            <TableColumn className="text-center">Phone</TableColumn>
            <TableColumn align="end">Actions</TableColumn>
          </TableHeader>

          <TableBody>
            {favoriteContacts.map((contact) => (
              <TableRow
                key={contact.id}
                className="hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <TableCell>{contact.name}</TableCell>
                <TableCell className="text-center">{contact.phoneNumber}</TableCell>

                <TableCell className="text-end">
                  <div className="flex justify-end gap-4">
                    <Button
                      onPress={() => {
                        if (window.confirm('Remove from favorites?')) {
                          toggleFavorite(contact.id);
                        }
                      }}
                      title="Remove from favorites"
                      className="text-red-600"
                    >
                      <MdOutlineFavorite size={22} />
                    </Button>

                    <Button onPress={() => openViewContact(contact)} title="View" className="text-blue-600">
                      <VscEye size={22} />
                    </Button>

                    <Button
                      onPress={() => {
                        if (window.confirm('Delete this contact?')) {
                          deleteContact(contact.id);
                        }
                      }}
                      title="Delete"
                      className="text-red-600"
                    >
                      <MdDelete size={22} />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </section>
  );
};

import { useSignals } from '@preact/signals-react/runtime';
import { MdDelete, MdOutlineFavorite } from 'react-icons/md';
import { VscEye } from 'react-icons/vsc';

import { contactList, deleteContact, openViewContact, toggleFavorite } from './common/service';

export const Favorites = () => {
  useSignals();

  // Only favorite contacts
  const favoriteContacts = contactList.value.filter((c) => c.favorite);

  return (
    <section className="p-6">
      <h2 className="text-2xl font-bold mb-6">Favorite Contacts</h2>

      {favoriteContacts.length === 0 ? (
        <p className="text-gray-500">No favorite contacts found</p>
      ) : (
        <table className="w-full border rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-center">Phone</th>
              <th className="p-3 text-end">Action</th>
            </tr>
          </thead>

          <tbody>
            {favoriteContacts.map((contact) => (
              <tr key={contact.id} className="border-t hover:bg-gray-50">
                <td className="p-3">{contact.name}</td>
                <td className="p-3 text-center">{contact.phoneNumber}</td>

                <td className="p-3 text-end">
                  <div className="flex justify-end gap-4">
                    {/* REMOVE FROM FAVORITES */}
                    <button
                      onClick={() => toggleFavorite(contact.id)}
                      title="Remove from favorites"
                      className="text-red-500"
                    >
                      <MdOutlineFavorite size={22} />
                    </button>

                    {/* VIEW */}
                    <button onClick={() => openViewContact(contact)} title="View" className="text-blue-600">
                      <VscEye size={22} />
                    </button>

                    {/* DELETE */}
                    <button
                      onClick={() => {
                        if (window.confirm('Delete this contact?')) {
                          deleteContact(contact.id);
                        }
                      }}
                      title="Delete"
                      className="text-red-600"
                    >
                      <MdDelete size={22} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
};

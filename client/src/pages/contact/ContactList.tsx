// import { Button } from '@heroui/react';
// import { useSignals } from '@preact/signals-react/runtime';
// import { useEffect } from 'react';
// import { MdDelete, MdOutlineFavorite } from 'react-icons/md';
// import { VscEye } from 'react-icons/vsc';
// import { contactList, deleteContact, loadContacts, openAddContact, openViewContact, toggleFavorite } from './common/service';
// import { ContactForm } from './common/types';


// export default function ContactList() {
//   useSignals();

//   useEffect(() => {
//     loadContacts();
//   }, []);

//   // Default contacts data
//   const defaultContacts: ContactForm[] = [
//     {
//       id: '1',
//       name: 'John Doe',
//       email: 'john@example.com',
//       phoneNumber: '123-456-7890',
//       address: '123 Main St',
//       description: 'Work contact',
//       favorite: false
//     },
//     {
//       id: '2',
//       name: 'Jane Smith',
//       email: 'jane@example.com',
//       phoneNumber: '987-654-3210',
//       address: '456 Oak Ave',
//       description: 'Personal contact',
//       favorite: true
//     }
//   ];

//   // Use default contacts if contactList is empty
//   const displayContacts = contactList.value.length > 0 ? contactList.value : defaultContacts;

//   return (
//     <section className="p-6">
//       <div className="flex justify-between mt-15 p-5">
//         <h2 className="text-2xl font-bold">Contacts</h2>
//         <Button color="primary" onPress={openAddContact}>
//           Add Contact
//         </Button>
//       </div>

//       <table className="w-full border rounded-lg">
//         <thead className="bg-gray-100">
//           <tr>
//             <th className="p-3 text-start">Name</th>
//             <th className="p-3 text-center">Phone</th>
//             <th className="p-3 text-end">Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {displayContacts.map((contact) => (
//             <tr key={contact.id} className="border-t hover:bg-gray-50">
//               <td className="p-3">{contact.name}</td>
//               <td className="p-3 text-center">{contact.phoneNumber}</td>
//               <td className="p-3 text-end">
//                 <div className="flex justify-end gap-3">
//                   {/* FAVORITE */}
//                   <button
//                     onClick={() => toggleFavorite(contact.id)}
//                     title="Add to favorites"
//                     className={contact.favorite ? 'text-red-500' : 'text-gray-500'}
//                   >
//                     <MdOutlineFavorite size={20} />
//                   </button>

//                   {/* VIEW */}
//                   <button onClick={() => openViewContact(contact)} title="View contact" className="text-blue-600">
//                     <VscEye size={20} />
//                   </button>

//                   {/* DELETE */}
//                   <button onClick={() => deleteContact(contact.id)} title="Delete contact" className="text-red-600">
//                     <MdDelete size={20} />
//                   </button>
//                 </div>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </section>
//   );
// }

import { Button, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@heroui/react';
import { useSignals } from '@preact/signals-react/runtime';
import { useEffect } from 'react';
import { MdDelete, MdOutlineFavorite } from 'react-icons/md';
import { VscEye } from 'react-icons/vsc';

import {
  contactList,
  deleteContact,
  loadContacts,
  openAddContact,
  openViewContact,
  toggleFavorite
} from './common/service';

export default function ContactList() {
  useSignals();

  useEffect(() => {
    loadContacts();
  }, []);

  return (
    <section className="p-6">
      <div className="flex justify-between mt-5 mb-5">
        <h2 className="text-2xl font-bold">Contacts</h2>
        <Button color="primary" onPress={openAddContact}>
          Add Contact
        </Button>
      </div>

      <Table aria-label="Contacts table">
        <TableHeader>
          <TableColumn>Name</TableColumn>
          <TableColumn>Phone</TableColumn>
          <TableColumn align="end">Actions</TableColumn>
        </TableHeader>

        <TableBody emptyContent="No contacts found">
          {(contactList.value ?? []).map((contact) => (
            <TableRow key={contact.id}>
              <TableCell>{contact.name}</TableCell>
              <TableCell>{contact.phoneNumber}</TableCell>
              <TableCell>
                <div className="flex justify-end gap-3">
                  {/* FAVORITE */}
                  <Button
                    isIconOnly
                    variant="light"
                    onPress={() => toggleFavorite(contact.id)}
                    className={contact.favorite ? 'text-red-500' : 'text-gray-500'}
                  >
                    <MdOutlineFavorite size={20} />
                  </Button>

                  {/* VIEW */}
                  <Button isIconOnly variant="light" onPress={() => openViewContact(contact)} className="text-blue-600">
                    <VscEye size={20} />
                  </Button>

                  {/* DELETE */}
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
    </section>
  );
}

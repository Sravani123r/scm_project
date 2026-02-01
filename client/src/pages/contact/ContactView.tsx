import { Button, Card, Divider } from '@heroui/react';
import { useSignals } from '@preact/signals-react/runtime';
import { closeContactDrawer, contactIsEditMode, selectedContact } from './common/service';

export default function ContactView() {
  useSignals();
  const c = selectedContact.value;

  return (
    <section className="p-6 w-full">
      <Card className="p-6 space-y-6">
        {/* HEADER */}
        <div className="flex items-center gap-6">
          <img
            src={c.picture || '/default-avatar.png'}
            alt={c.name}
            className="h-28 w-28 rounded-full object-cover shadow"
          />

          <div>
            <h2 className="text-2xl font-semibold">{c.name}</h2>
            <p className="text-gray-500">{c.email}</p>
            <p className="text-gray-500">{c.phoneNumber}</p>
          </div>
        </div>

        <Divider />

        {/* DETAILS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <Detail label="Address" value={c.address} />
          <Detail label="Website" value={c.websiteLink} />
          <Detail label="LinkedIn" value={c.linkedInLink} />
          <Detail label="Favorite" value={c.favorite ? 'Yes ❤️' : 'No'} />
        </div>

        {c.description && (
          <>
            <Divider />
            <div>
              <p className="font-medium mb-1">Description</p>
              <p className="text-gray-600">{c.description}</p>
            </div>
          </>
        )}

        {/* ACTIONS */}
        <div className="flex justify-end gap-3">
          <Button variant="bordered" onPress={closeContactDrawer}>
            Close
          </Button>
          <Button color="primary" onPress={() => (contactIsEditMode.value = true)}>
            Edit
          </Button>
        </div>
      </Card>
    </section>
  );
}

const Detail = ({ label, value }: { label: string; value?: string }) => (
  <div>
    <p className="text-gray-400">{label}</p>
    <p className="font-medium">{value || '-'}</p>
  </div>
);

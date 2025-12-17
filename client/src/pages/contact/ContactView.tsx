import { Button, Card } from '@heroui/react';
import { useSignals } from '@preact/signals-react/runtime';

import { closeContactDrawer, contactIsEditMode, selectedContact } from './common/service';

export default function ContactView() {
  useSignals();
  const c = selectedContact.value;

  return (
    <section className="p-6 max-w-2xl mx-auto">
      <Card className="p-6 space-y-3">
        <h3 className="text-xl font-semibold">{c.name}</h3>
        <p>Email: {c.email}</p>
        <p>Phone: {c.phoneNumber}</p>
        <p>Address: {c.address}</p>
        <p>Description: {c.description}</p>

        <div className="flex gap-3 justify-end">
          <Button variant="bordered" onPress={closeContactDrawer}>
            Close
          </Button>
          <Button color="primary" onPress={() => contactIsEditMode.value = true}>
            Edit
          </Button>
        </div>
      </Card>
    </section>
  );
}

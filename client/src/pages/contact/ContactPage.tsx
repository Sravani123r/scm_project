import { Drawer, DrawerBody, DrawerContent } from "@heroui/react";
import { useSignals } from "@preact/signals-react/runtime";
import { closeContactDrawer, contactIsDrawerOpen, contactIsEditMode } from "./common/service";
import ContactForm from "./ContactForm";
import ContactList from "./ContactList";
import ContactView from "./ContactView";

export function ContactPage() {
  useSignals();

  return (
    <>
      <ContactList />

      <Drawer hideCloseButton isOpen={contactIsDrawerOpen.value} size="4xl" onClose={closeContactDrawer}>
        <DrawerContent>
          <DrawerBody className="w-full">{contactIsEditMode.value ? <ContactForm /> : <ContactView />}</DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

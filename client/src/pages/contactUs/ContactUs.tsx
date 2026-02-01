import { Button, Input, Textarea } from '@heroui/react';

const ContactUs = () => {
  return (
    <section className="py-20 bg-gray-100 dark:bg-gray-800 animate__animated animate__fadeInUp">
      <div className="container mx-auto text-center px-4">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12">Get in Touch</h2>

        <form className="max-w-lg mx-auto space-y-4">
          <Input
            type="text"
            label="Your Name"
            variant="bordered"
            placeholder="Enter your name"
            className="text-gray-900 dark:text-white"
            classNames={{
              input: 'dark:text-white',
              label: 'dark:text-gray-200',
              inputWrapper: 'dark:bg-gray-700 dark:border-gray-600',
            }}
          />
          <Input
            type="email"
            label="Your Email"
            variant="bordered"
            placeholder="Enter your email"
            className="text-gray-900 dark:text-white"
            classNames={{
              input: 'dark:text-white',
              label: 'dark:text-gray-200',
              inputWrapper: 'dark:bg-gray-700 dark:border-gray-600',
            }}
          />
          <Textarea
            label="Your Message"
            variant="bordered"
            placeholder="Write your message..."
            minRows={3}
            className="text-gray-900 dark:text-white"
            classNames={{
              input: 'dark:text-white',
              label: 'dark:text-gray-200',
              inputWrapper: 'dark:bg-gray-700 dark:border-gray-600',
            }}
          />
          <Button
            type="submit"
            color="primary"
            className="w-full bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
          >
            Send Message
          </Button>
        </form>
      </div>
    </section>
  );
};

export default ContactUs;

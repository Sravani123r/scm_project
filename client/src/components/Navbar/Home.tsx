import { Button, Card } from '@heroui/react';
import { NavLink } from 'react-router-dom';
import ContactUs from '../../pages/contactUs/ContactUs';

const Home = () => {
  return (
    <div className="min-h-screen dark:bg-gray-900 bg-gray-50">
      {/* Banner Section */}
      <section className="bg-blue-300 text-black py-20 animate__animated animate__fadeInDown">
        <div className="container mx-auto text-center px-4">
          <h2 className="text-4xl font-bold mb-4">Start Managing Your Contacts on cloud</h2>
          <p className="text-lg mb-8">Manage all your contacts effortlessly and securely in one place.</p>
          <Button radius="full" className="font-semibold" variant="flat">
            <h3 className="text-black">Get Started</h3>
          </Button>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto text-center px-4">
          <h2 className="text-3xl font-bold dark:bg-gray-900 mb-12 animate__animated animate__fadeInUp">Features</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6 bg-gray-100 rounded shadow hover:shadow-lg transition duration-300 transform hover:scale-105">
              <div className="text-blue-600 text-4xl mb-4">📇</div>
              <h3 className="text-xl font-semibold mb-2">Easy Contact Management</h3>
              <p className="text-gray-600">Add, edit, and organize your contacts in a user-friendly interface.</p>
            </Card>

            <Card className="p-6 bg-gray-100 rounded shadow hover:shadow-lg transition duration-300 transform hover:scale-105">
              <div className="text-blue-600 text-4xl mb-4">🔒</div>
              <h3 className="text-xl font-semibold mb-2">Secure Storage</h3>
              <p className="text-gray-600">Your data is protected with top-level encryption and security measures.</p>
            </Card>

            <Card className="p-6 bg-gray-100 rounded shadow hover:shadow-lg transition duration-300 transform hover:scale-105">
              <div className="text-blue-600 text-4xl mb-4">🌐</div>
              <h3 className="text-xl font-semibold mb-2">24/7 Access</h3>
              <p className="text-gray-600">Access your contacts anytime, anywhere from any device.</p>
            </Card>
          </div>
        </div>
      </section>

      <section className="bg-blue-600 text-black py-20 animate__animated animate__fadeInUp">
        <div className="container mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-4">Ready to Manage Your Contacts?</h2>
          <p className="text-lg mb-8">Sign up today and experience the easiest way to manage your contacts.</p>
          <Button radius="full" className="font-semibold bg-white text-blue-600" variant="flat">
            <NavLink to="/register">Create an Account</NavLink>
          </Button>
        </div>
      </section>
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto text-center px-4">
          <h2 className="text-3xl font-bold dark:text-white mb-12 animate__animated animate__fadeInUp">
            What Our Users Say
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-6 bg-gray-100 dark:bg-gray-500 rounded shadow hover:shadow-lg transition duration-300 transform hover:scale-105">
              <p className="text-gray-900  italic">
                "Contact Manager has changed the way I organize my contacts. It's fast, secure, and incredibly easy to
                use!"
              </p>
              <h4 className="text-lg font-semibold mt-4">- John Doe</h4>
            </Card>

            <Card className="p-6 bg-gray-100 dark:bg-gray-500 rounded shadow hover:shadow-lg transition duration-300 transform hover:scale-105">
              <p className="text-gray-900  italic">
                "A fantastic app with great features! I love the 24/7 access and secure storage options."
              </p>
              <h4 className="text-lg font-semibold mt-4">- Jane Smith</h4>
            </Card>
          </div>
        </div>
      </section>
      <div>
        <ContactUs />
      </div>
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto text-center px-4">
          <p>&copy; 2024 Contact Manager. All rights reserved.</p>
          <p>
            Follow us on{' '}
            <a href="#" className="text-blue-400">
              Facebook
            </a>
            ,{' '}
            <a href="#" className="text-blue-400">
              Twitter
            </a>{' '}
            and{' '}
            <a href="#" className="text-blue-400">
              Instagram
            </a>
            .
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;

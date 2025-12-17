import { Card } from '@heroui/react';

const Services = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <Card className="max-w-3xl w-full p-8 shadow-md">
        <h1 className="text-3xl font-bold mb-3">Welcome to Services Page</h1>
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Services offered by SCM</h2>
        <p className="text-gray-600 leading-relaxed">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas dolore assumenda rerum harum mollitia incidunt
          nesciunt dignissimos esse dicta reprehenderit quam, quisquam aspernatur enim consequatur accusamus, minima
          alias odit ducimus.
        </p>
      </Card>
    </div>
  );
};

export default Services;

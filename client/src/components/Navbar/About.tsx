import { Card } from '@heroui/react';
import { useEffect } from 'react';

const About = () => {
  useEffect(() => {
    console.log('about page');
    console.log('second about page script');
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="max-w-lg w-full p-6 shadow-md">
        <h1 className="text-2xl font-bold mb-3">Welcome to About Page</h1>
        <p className="text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, ratione!</p>
      </Card>
    </div>
  );
};

export default About;

import Sidebar from '../../components/Sidebar';
import { useAuth } from '../../context/AuthContext';

const Dashboard = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {isAuthenticated && <Sidebar />}

      <div className={`flex-1 pt-20 ${isAuthenticated ? 'sm:pl-64' : ''}`}>
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-5rem)]">
          <h1 className="text-4xl md:text-5xl font-bold mb-2 text-center">Welcome to Dashboard</h1>

          <p className="text-gray-600 text-center max-w-xl">
          {user?.name ? `Hi ${user.name}, manage all your contacts here.` : 'Please login to view your dashboard.'}
                  </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

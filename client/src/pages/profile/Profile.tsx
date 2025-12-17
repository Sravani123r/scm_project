import Sidebar from '../../components/Sidebar';

const fallbackImage = 'https://static-00.iconduck.com/assets.00/profile-default-icon-2048x2045-u3j7s5nj.png';

const Profile = () => {
  const storedUser = localStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : null;

  const profilePic = user?.profilePic && user.profilePic.trim() !== '' ? user.profilePic : fallbackImage;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />

      <div className="flex-1 sm:pl-64 pt-20 flex items-center justify-center">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-2xl w-full">
          <div className="flex flex-col items-center">
            <img
              src={profilePic}
              alt="Profile"
              className="w-44 h-44 rounded-full shadow-lg object-cover mb-4"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = fallbackImage;
              }}
            />
            <h2 className="text-2xl font-semibold mb-2">{user?.name || 'User Name'}</h2>
            <p className="text-gray-600 mb-1">{user?.email || 'user.email@example.com'}</p>
            <p className="text-gray-600 mb-2">{user?.phoneNumber || 'Phone number not set'}</p>
            <p className="text-gray-600 mb-4 text-center">{user?.about || 'No about info provided.'}</p>

            <div className="w-full flex justify-between">
              <p className="text-sm text-gray-500">
                Email Verified: <span className="font-medium text-gray-700">{user?.emailVerified ? 'YES' : 'NO'}</span>
              </p>
              <p className="text-sm text-gray-500">
                Phone Verified: <span className="font-medium text-gray-700">{user?.phoneVerified ? 'YES' : 'NO'}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

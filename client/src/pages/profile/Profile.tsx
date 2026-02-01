import { Button, Divider, Input, Textarea } from '@heroui/react';
import { useState } from 'react';
import userImage from '../../assets/profileImage.jpg';
import api from '../../lib/axios';


const Profile = () => {
  const storedUser = localStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : null;

  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<File | null>(null);

  const [form, setForm] = useState({
    name: user?.name || '',
    phoneNumber: user?.phoneNumber || '',
    about: user?.about || ''
  });

  const profilePic = user?.profilePic && user.profilePic.trim() !== '' ? user.profilePic : userImage;

  const handleSave = async () => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append('data', new Blob([JSON.stringify(form)], { type: 'application/json' }));

      if (image) {
        formData.append('profilePic', image);
      }

      const res = await api.put('/user/profile', formData);
      localStorage.setItem('user', JSON.stringify(res.data));

      setIsEdit(false);
      alert('Profile updated successfully ✅');
    } catch (err) {
      console.error(err);
      alert('Profile update failed ❌');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" bg-gray-100 dark:bg-gray-900 pt-5 px-4 flex justify-center">
      <div className="w-full bg-white dark:bg-gray-800 rounded-xl shadow p-6">
        {/* HEADER */}
        <div className="flex items-center gap-4">
          <img
            src={profilePic}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border"
            onError={(e) => ((e.target as HTMLImageElement).src = userImage)}
          />

          <div className="flex-1">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{user?.name}</h2>
            <p className="text-sm text-gray-500">{user?.email}</p>

            {isEdit && (
              <label className="text-xs text-blue-600 cursor-pointer hover:underline">
                Change photo
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => setImage(e.target.files?.[0] || null)}
                />
              </label>
            )}
          </div>
        </div>

        <Divider className="my-4" />

        {/* VIEW MODE */}
        {!isEdit ? (
          <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
            <div>
              <span className="text-gray-500">Phone</span>
              <p className="font-medium">{user?.phoneNumber || '-'}</p>
            </div>

            <div>
              <span className="text-gray-500">About</span>
              <p>{user?.about || '-'}</p>
            </div>

            <div className="flex justify-end pt-4">
              <Button size="sm" color="primary" onPress={() => setIsEdit(true)}>
                Edit Profile
              </Button>
            </div>
          </div>
        ) : (
          /* EDIT MODE */
          <div className="space-y-3">
            <Input
              label="Name"
              size="sm"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            {/* EMAIL – READ ONLY */}
            <Input
              label="Email"
              size="sm"
              value={user?.email || ''}
              isReadOnly
              className="opacity-70 cursor-not-allowed"
            />

            <Input
              label="Phone"
              size="sm"
              value={form.phoneNumber}
              onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })}
            />

            <Textarea
              label="About"
              size="sm"
              value={form.about}
              onChange={(e) => setForm({ ...form, about: e.target.value })}
            />

            <div className="flex justify-end gap-2 pt-3">
              <Button size="sm" variant="bordered" onPress={() => setIsEdit(false)}>
                Cancel
              </Button>
              <Button size="sm" color="primary" isLoading={loading} onPress={handleSave}>
                Save
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;

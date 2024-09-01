import { useState } from 'react';
import useAuth from '../../hooks/UseAuth';
import { imageUpload } from '../../API/Utlis'; // Assume this is your image upload utility function
import toast from 'react-hot-toast';


const UpdateProfile = () => {
    const { user, updateUserProfile, setUser } = useAuth();
    const [name, setName] = useState(user?.displayName || '');
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !image) {
            toast.error('Name and image are required!');
            return;
        }

        try {
            setLoading(true);
            const photoURL = await imageUpload(image); // Upload image and get URL
            await updateUserProfile(name, photoURL);

            // Update the user state manually
            setUser({
                ...user,
                displayName: name,
                photoURL: photoURL,
            });

            toast.success('Profile updated successfully!');
        } catch (err) {
            console.error('Error updating profile:', err);
            toast.error('Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900">
                <div className="mb-8 text-center">
                    <h1 className="my-3 text-4xl font-bold">Update Profile</h1>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block mb-2 text-sm">Name</label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                placeholder="Enter Your Name"
                                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
                            />
                        </div>
                        <div>
                            <label htmlFor="image" className="block mb-2 text-sm">Upload New Photo</label>
                            <input
                                type="file"
                                name="image"
                                id="image"
                                accept="image/*"
                                onChange={handleImageChange}
                                required
                                className="file-input file-input-bordered w-full"
                            />
                        </div>
                    </div>
                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-black w-full rounded-md py-3 text-white"
                        >
                            {loading ? 'Updating...' : 'Update Profile'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateProfile;

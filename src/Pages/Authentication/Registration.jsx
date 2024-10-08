import { FcGoogle } from 'react-icons/fc';
import { TbFidgetSpinner } from 'react-icons/tb';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/UseAuth';
import { imageUpload } from '../../API/Utlis';
import toast from 'react-hot-toast';
import { useState } from 'react';
import UseAxiosPublic from '../../hooks/UseAxiosPublic';

const Registration = () => {
  const navigate = useNavigate();
  const axiosPublic = UseAxiosPublic();
  const { createUser, setUser, signInWithGoogle, loading, setLoading, updateUserProfile } = useAuth();
  const [role, setRole] = useState('Worker');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const image = form.image.files[0];

    try {
      setLoading(true);
      const photoURL = await imageUpload(image);
      const result = await createUser(email, password);
      await updateUserProfile(name, photoURL);
      await axiosPublic.post('/users', {name, email, role, photoURL});


      // Manually update the user state
      setUser({
        ...result.user,
        displayName: name,
        photoURL: photoURL,
        role: role, // Include role in user state
      });

      // Log the user data to ensure it is being set correctly
      console.log('User created:', result.user);

      // Navigate and show toast after successful user creation
      navigate('/');
      toast.success('SignUp Successfully');
    } catch (err) {
      console.error('Error during signup:', err);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithGoogle();
      const user = result.user;
      const name = user.displayName;
      const email = user.email;
      const photoURL = user.photoURL;

      await axiosPublic.post('/users', {name, email, role, photoURL});

      // Manually update the user state with role
      setUser({
        ...user,
        displayName: name,
        photoURL: photoURL,
        role: role, // Include role in user state
      });

      // Log the user data to ensure it is being set correctly
      console.log('Google sign-in user:', user);

      // Navigate and show toast after successful sign-in
      navigate('/');
      toast.success('SignUp Successfully');
    } catch (err) {
      console.error('Error during Google sign-in:', err);
      toast.error(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold">Sign Up</h1>
          <p className="text-sm text-gray-400">Sign up to access your account</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6 ng-untouched ng-pristine ng-valid">
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block mb-2 text-sm">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                required
                placeholder="Enter Your Name Here"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm">Email address</label>
              <input
                type="email"
                name="email"
                id="email"
                required
                placeholder="Enter Your Email Here"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
              />
            </div>
            <div>
              <label htmlFor="image" className="block mb-2 text-sm">Select Image:</label>
              <input
                required
                type="file"
                name="image"
                id="image"
                accept="image/*"
                className="file-input file-input-bordered w-full"
              />
            </div>
            <div>
              <label htmlFor="password" className="block mb-2 text-sm">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                required
                placeholder="*******"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
              />
            </div>
            <div>
              <label htmlFor="role" className="block mb-2 text-sm">Role</label>
              <select
                onChange={(e) => setRole(e.target.value)}
                name="role"
                required
                className="select select-bordered w-full"
              >
                <option value="Worker">Worker</option>
                <option value="TaskCreator">TaskCreator</option>
              </select>
            </div>
          </div>
          <div>
            <button
              disabled={loading}
              type="submit"
              className="bg-black w-full rounded-md py-3 text-white"
            >
              {loading ? <TbFidgetSpinner className="animate-spin m-auto" /> : 'Sign Up'}
            </button>
          </div>
        </form>
        <div className="flex items-center pt-4 space-x-1">
          <div className="flex-1 h-px sm:w-16 bg-gray-300"></div>
          <p className="px-3 text-sm text-gray-400">Sign up with social accounts</p>
          <div className="flex-1 h-px sm:w-16 bg-gray-300"></div>
        </div>
        <button
          disabled={loading}
          onClick={handleGoogleSignIn}
          className="disabled:cursor-not-allowed flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 rounded cursor-pointer"
        >
          <FcGoogle size={32} />
          <p>Continue with Google</p>
        </button>
        <p className="px-6 text-sm text-center text-gray-400">
          Already have an account?{' '}
          <Link to="/login" className="hover:underline hover:text-rose-500 text-gray-600">Log In</Link>.
        </p>
      </div>
    </div>
  );
};

export default Registration;

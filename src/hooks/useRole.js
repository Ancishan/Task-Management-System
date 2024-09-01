// useRole.js
import { useQuery } from '@tanstack/react-query';
import useAuth from './UseAuth';
import UseAxiosPublic from './UseAxiosPublic';




const useRole = () => {
  const { user, loading } = useAuth();
  const axiosPublic = UseAxiosPublic();

  const { data: role = '', isLoading } = useQuery({
    queryKey: ['role', user?.email], // Ensure user's email is included in the query key
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      try {
        // Make a GET request to fetch the user's role based on their email
        const { data } = await axiosPublic.get(`/users/role/${user?.email}`);
        return data.role;
      } catch (error) {
        console.error('Error fetching user role:', error);
        throw new Error('Failed to fetch user role');
      }
    },
  });

  return [role, isLoading];
};

export default useRole;

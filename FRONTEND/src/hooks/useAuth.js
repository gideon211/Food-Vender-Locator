// Custom hook for authentication - Provides easy access to auth context
import { useAuthContext } from '../context/AuthContext';

export const useAuth = () => {
  return useAuthContext();
};

export default useAuth;
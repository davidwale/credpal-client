import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Loader } from 'lucide-react';
import { GetUserService } from '../services/dashboard.services';

const ProtectedRoute = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const userProfile = await GetUserService();
                setIsAuthenticated(!!userProfile);
            } catch (error) {
                console.error('Error verifying user:', error);
                setIsAuthenticated(false);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loader className="animate-spin text-purple-600" size={48} />
            </div>
        );
    }

    return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;

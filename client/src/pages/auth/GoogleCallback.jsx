import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from '../../components/LoadingSpinner';

const GoogleCallback = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { login } = useAuth();

    useEffect(() => {
        const handleCallback = async () => {
            const token = searchParams.get('token');
            const error = searchParams.get('error');

            if (error) {
                // Authentication failed
                navigate('/login?error=Google authentication failed');
                return;
            }

            if (token) {
                // Store token
                localStorage.setItem('token', token);

                // Load user data
                try {
                    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';
                    const response = await fetch(`${apiUrl}/auth/me`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });

                    if (response.ok) {
                        const userData = await response.json();
                        // Update auth context
                        await login(undefined, undefined, { user: userData, token });

                        // Redirect to homepage
                        navigate('/');
                    } else {
                        navigate('/login?error=Failed to load user data');
                    }
                } catch (error) {
                    console.error('Error loading user:', error);
                    navigate('/login?error=Authentication error');
                }
            } else {
                navigate('/login?error=No token received');
            }
        };

        handleCallback();
    }, [searchParams, navigate, login]);

    return (
        <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
            <div className="text-center">
                <LoadingSpinner size="lg" />
                <p className="mt-4 text-neutral-600">Completing Google sign-in...</p>
            </div>
        </div>
    );
};

export default GoogleCallback;

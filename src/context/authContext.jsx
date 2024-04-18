import { createContext, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import useLogin from '@/utils/useLogin';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { auth } from '@/utils/firebase';
import { signOut } from 'firebase/auth';

const AuthContext = createContext({
    isAuthenticated: false,
    email: '',
    token: '',
    refreshToken: '',
    userId: '',
    login: async (email, password) => { },
    logout: async () => { },
    invalidCredentials: false,
    loading: false,
    winner: false,
    accounts: [],
    setWinner: () => { }
});



export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [email, setEmail] = useState('');
    const [token, setToken] = useState('');
    const [refreshToken, setRefreshToken] = useState('');
    const [invalidCredentials, setInvalidCredentials] = useState(false);
    const [loading, setLoading] = useState(false);
    const [userId, setUserId] = useState('');
    const [winner, setWinner] = useState(false);
    const [accounts, setAccounts] = useState([]);

    const mutation = useLogin({
        setIsAuthenticated,
        setEmail,
        setToken,
        setRefreshToken,
        setInvalidCredentials,
        setUserId
    });

    const router = useRouter();

    const login = async (email, password) => {
        try {
            setInvalidCredentials(false);
            setLoading(true);
            await mutation.mutateAsync({ email, password, returnSecureToken: true });
            toast.success('Login Successful');
            router.push('/dashboard');
        } catch (error) {
            console.log(error)
            toast.error(String(error) || 'Login Failed');
        }
    };

    const logout = () => {
        signOut(auth).then(() => {
            setIsAuthenticated(false);
            setEmail('');
            setToken('');
            setRefreshToken('');
            setUserId('');
            setLoading(false)
            Cookies.remove('admin');
            router.push('/');
            console.log("successsfully logged out")
        }).catch((error) => {
            console.log("an error occured")
        });

    }

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                email,
                token,
                refreshToken,
                invalidCredentials,
                userId,
                login,
                logout,
                loading,
                winner,
                setWinner,
                accounts,
                setAccounts
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

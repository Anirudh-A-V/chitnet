import { useMutation } from 'react-query';
import Cookies from 'js-cookie';
import { auth } from "./firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const signInWithEmail = async (formData) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
        const user = userCredential.user;

        // @ts-ignore
        console.log("user", user.accessToken);
        const admin = {
            email: user.email,
            // @ts-ignore
            token: user.accessToken,
            localId: user.uid,
            refreshToken: user.refreshToken,
        }

        Cookies.set('admin', JSON.stringify(admin));

        return admin;
    } catch (error) {
        const errorMessage = error?.message;
        console.log("error message", errorMessage);
        throw error; // Rethrow the error to be caught by the caller
    }
}

const useLogin = ({
    setIsAuthenticated,
    setEmail,
    setToken,
    setRefreshToken,
    setInvalidCredentials,
    setUserId
}) => {
    return useMutation((formData) => signInWithEmail(formData), {
        onSuccess: (data) => {
            setIsAuthenticated(true);
            setEmail(data.email);
            setToken(data.accessToken);
            setRefreshToken(data.refreshToken);
            setUserId(data.localId);
        },
        onError: () => {
            setInvalidCredentials(true);
        },
    });
};

export default useLogin;

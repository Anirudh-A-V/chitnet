import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useAuth } from '@/context/authContext';
import Image from 'next/image';
// import Logo from '@/public/Logo.svg';
import viewIcon from '../../public/view.png';
import hideIcon from '../../public/hide.png';
import circles from '../../public/circles.svg';

function LoginComponent() {
    const { login, invalidCredentials, loading } = useAuth();
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [passwordVisible, setPasswordVisible] = useState(false);


    const togglePasswordVisibility = () => {
        setPasswordVisible((prevVisible) => !prevVisible);
    };

    const onSubmit = (data) => {
        try {
            login("admin@gmail.com", "123456");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='flex min-h-screen max-h-screen overflow-hidden bg-main-dark-bg'>
            <div className='flex flex-1 flex-col justify-center items-center z-10'>
                <button className='bg-primary-blue px-32 py-5 text-white font-bold rounded-md flex justify-center items-center' type='submit' onClick={() => login("admin@gmail.com", "123456")}>
                    {
                        loading && !invalidCredentials ? <div className="custom-loader"></div> : "LOG IN"
                    }
                </button>
            </div>
        </div>
    );
}

export default LoginComponent;

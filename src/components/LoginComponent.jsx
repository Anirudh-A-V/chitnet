"use client"
import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useAuth } from '@/context/authContext';
import { ethers } from 'ethers';
import Web3 from 'web3';
import { useRouter } from 'next/navigation'
import Image from 'next/image';
// import Logo from '@/public/Logo.svg';
import viewIcon from '../../public/view.png';
import hideIcon from '../../public/hide.png';
import circles from '../../public/circles.svg';
import Cookies from 'js-cookie';

function LoginComponent() {
    const { login, invalidCredentials, loading, setAccounts } = useAuth();
    const router = useRouter();

    const [web3, setWeb3] = useState(null);


    useEffect(() => {
        const initializeWeb3 = async () => {
            // Check if MetaMask is installed
            if (window.ethereum) {
                const web3Instance = new Web3(window.ethereum);
                try {
                    // Request account access if needed
                    await window.ethereum.enable();
                    setWeb3(web3Instance);
                } catch (error) {
                    console.error(error);
                }
            }
        };

        initializeWeb3();
    }, []);

    const handleLogin = async () => {
        try {
            // if (!window.ethereum) {
            //   throw new Error('MetaMask not installed');
            // }

            // await window.ethereum.request({ method: 'eth_requestAccounts' });

            // const provider = new ethers.getDefaultProvider();

            // const accounts = await provider.send("eth_requestAccounts", []);

            if (!web3) {
                throw new Error('MetaMask not connected');
            }
            // Get user's accounts
            const accounts = await web3.eth.getAccounts();
            setAccounts(accounts);
            if (Cookies.get("firstTime") === "false") {
                if (Cookies.get("User") === "Anirudh") {
                    login("admin@gmail.com", "123456")
                } else {
                    login("rahul@gmail.com", "123456")
                }
                return;
            } else {
                router.push('/create-account');
            }
        } catch (error) {
            console.error("Error : ", error);
        }
    }

    return (
        <div className='flex min-h-screen max-h-screen overflow-hidden bg-main-dark-bg'>
            <div className='flex flex-1 flex-col justify-center items-center z-10'>
                <button className='bg-primary-blue px-32 py-5 text-white font-bold rounded-md flex justify-center items-center' type='submit' onClick={handleLogin}>
                    {
                        loading && !invalidCredentials ? <div className="custom-loader"></div> : "LOG IN / SIGN UP"
                    }
                </button>
            </div>
        </div>
    );
}

export default LoginComponent;

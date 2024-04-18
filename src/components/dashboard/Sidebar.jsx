import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState, Fragment } from 'react';
import down from '../../../public/Sidebar/down.svg';
import down_active from '../../../public/Sidebar/down_active.svg';
import Link from 'next/link';
import { useAuth } from '@/context/authContext';


const Sidebar = () => {
    const router = useRouter();
    const [activeOption, setActiveOption] = useState();
    const { logout } = useAuth();

    const Options = [
        {
            name: 'Dashboard',
            icon: '/Sidebar/dashboard.svg',
            active: '/Sidebar/dashboard_active.svg',
            path: '/dashboard',
        },
        {
            name: 'Chitfunds',
            icon: '/Sidebar/users.svg',
            active: '/Sidebar/users_active.svg',
            path: '/dashboard/chitfunds',
        },
        // {
        //     name: 'Challenges',
        //     icon: '/Sidebar/challenges.svg',
        //     active: '/Sidebar/challenges_active.svg',
        //     path: '/dashboard/challenges',
        // },
        // {
        //     name: 'People',
        //     icon: '/Sidebar/people.svg',
        //     active: '/Sidebar/people_active.svg',
        //     path: '/dashboard/people/mentors',
        // },
        // {
        //     name: 'Opportunities',
        //     icon: '/Sidebar/opportunities.svg',
        //     active: '/Sidebar/opportunities_active.svg',
        //     path: '/dashboard/opportunities',
        // },
        // {
        //     name: 'Market Place',
        //     icon: '/Sidebar/marketplace.svg',
        //     active: '/Sidebar/marketplace_active.svg',
        //     path: '/dashboard/marketplace',
        // },
        // {
        //     name: 'Podcasts',
        //     icon: '/Sidebar/podcasts.svg',
        //     active: '/Sidebar/podcasts_active.svg',
        //     path: '/dashboard/podcasts',
        // },
        // {
        //     name: 'Testimonials',
        //     icon: '/Sidebar/testimonials.svg',
        //     active: '/Sidebar/testimonials_active.svg',
        //     path: '/dashboard/testimonials',
        // },
    ];

    const peopleOptions = [
        {
            name: 'Mentors',
            path: '/dashboard/people/mentors',
        },
        {
            name: 'Helplines',
            path: '/dashboard/people/helplines',
        },
        {
            name: 'Buddies',
            path: '/dashboard/people/buddies',
        },
    ]

    useEffect(() => {
        const currentPath = router.pathname;

        const activeIcon = Options.find((icon) => icon.path === currentPath);
        if (activeIcon === undefined) {
            const activeIcon = peopleOptions.find((icon) => icon.path === currentPath);
            setActiveOption({
                name: activeIcon?.name || '',
                path: activeIcon?.path || '',
                icon: '',
                active: '',
            });
        } else {
            setActiveOption(activeIcon);
        }

    }, [router.pathname]);

    return (
        <div className='bg-white min-h-screen max-h-screen w-60 border fixed'>
            <div className='w-full p-3 flex justify-start items-center'>
                {/* <Image src={"/Logo-H.svg"} width={129} height={56} alt='logo' /> */}
                <p className='text-[#4D4D4D] text-2xl font-semibold ml-4'>Chitnet</p>
            </div>
            <div className='w-full flex p-3 flex-col'>
                {Options.map((icon) => {

                    if (icon.path.includes('/dashboard/people')) {
                        return (
                            <Fragment key={icon.name}
                            >
                                <Link
                                    key={icon.name}
                                    className={`flex justify-start items-center px-3 py-2 rounded-md my-1 w-full ${activeOption?.path.includes('/dashboard/people') ? 'bg-[#E05A8A26]' : ''
                                        }`}
                                    href={icon.path}
                                >
                                    <Image
                                        src={activeOption?.path.includes('/dashboard/people') ? icon.active : icon.icon}
                                        width={20}
                                        height={20}
                                        alt={icon.name}
                                        className=''
                                    />
                                    <p
                                        className={`ml-2 text-base font-normal ${activeOption?.path.includes('/dashboard/people') ? 'text-primary-blue' : 'text-[#4D4D4D]'
                                            }`}
                                    >
                                        {icon.name}
                                    </p>
                                    <Image
                                        src={activeOption?.path.includes('/dashboard/people') ? down_active : down}
                                        width={20}
                                        height={20}
                                        alt={icon.name}
                                        className='ml-auto'
                                    />
                                </Link>


                                {activeOption?.path.includes('/dashboard/people') && (
                                    <>
                                        {peopleOptions.map((option, index) => (
                                            <button
                                                key={`${option.name}+${index}`}
                                                className={`${option.path === activeOption?.path ? 'text-primary-blue' : 'text-[#4D4D4D]'} flex justify-start items-center px-6 py-2 rounded-md my-1 w-full`}
                                                onClick={() => router.push(option.path)}
                                            >
                                                <div className={`w-1 h-1 rounded-full ${option.path === activeOption?.path ? 'bg-primary-blue' : 'bg-[#4D4D4D]'} mr-2`}></div>
                                                {option.name}
                                            </button>
                                        ))}
                                    </>
                                )}

                            </Fragment>
                        )
                    }

                    return (
                        <Link
                            key={icon.name}
                            className={`flex justify-start items-center px-3 py-2 rounded-md my-1 ${icon.path === activeOption?.path ? 'bg-[#5A67E026]' : ''
                                }`}
                            href={icon.path}
                        >
                            <Image
                                src={icon.path === activeOption?.path ? icon.active : icon.icon}
                                width={20}
                                height={20}
                                alt={icon.name}
                                className=''
                            />
                            <p
                                className={`ml-2 text-base font-normal ${icon.path === activeOption?.path ? 'text-primary-blue' : 'text-[#4D4D4D]'
                                    }`}
                            >
                                {icon.name}
                            </p>
                            {/* {icon.path === '/dashboard/people' &&
                                <Image
                                    src={icon.path === activeOption?.path ? down_active : down}
                                    width={20}
                                    height={20}
                                    alt={icon.name}
                                    className='ml-auto'
                                />
                            } */}
                        </Link>
                    )
                })}
                <button
                    className='flex absolute bottom-2 right-4 left-5 justify-center font-medium items-center text-primary-blue border border-primary-blue px-3 py-2 rounded-md my-1 w-4/5'
                    onClick={() => logout()}
                >
                    Log Out
                </button>
            </div>
        </div>
    );
};

export default Sidebar;

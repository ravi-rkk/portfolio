import React from 'react'
import Frontend from '../../assets/Frontend.png'
import Frontend_1 from '../../assets/Frontend_1.png'
import Frontend_2 from '../../assets/Frontend_2.png'

const ProjectCard = ({ image, title, link }) => (
    <div className='p-4 md:w-1/3 mb-6'>
        <div className='rounded-lg h-52 overflow-hidden'>
            <img src={image} alt="content" className='object-cover object-center h-full w-full' />
        </div>
        <h2 className='text-xl font-medium title-font text-white mt-5'>{title}</h2>
        <a href={link} target="_blank" rel="noopener noreferrer" className='text-blue-300 hover:text-blue-100 inline-flex items-center mt-3'>
            Git
            <svg fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' className='w-4 h-4 ml-2' viewBox='0 0 24 24'>
                <path d='M5 12h14M12 5l7 7-7 7'></path>
            </svg>
        </a>
    </div>
);

export default function Projects() {
    const projects = [
        {
            title: 'Prasthan (Railway Management System)',
            image: Frontend,
            link: 'https://github.com/ravi-rkk/Prasthan-Train-management-system-'
        },
        {
            title: 'MochaGo (Coffee Shop App)',
            image: Frontend_1,
            link: 'https://github.com/ravi-rkk/Coffee-Shop-App'
        },
        {
            title: 'The NewWave (E-commerce Website)',
            image: Frontend_2,
            link: 'https://github.com/ravi-rkk/E-commerec-website'
        },
    ];

    return (
        <section id='projects' className='text-gray-400 bg-[#D4A373] body-font'>
            <div className='container px-3 py-11 mx-auto'>
                <div data-aos='fade-up' data-aos-delay='300' className='flex flex-col'>
                    <div className='flex flex-wrap sm:flex-row flex-col py-6 mb-12'>
                    <h1 className='sm:w-2/5 text-[#432818] font-medium title-font text-3xl mb-2 sm:mb-0'>My Projects</h1>

                        <p className='sm:w-3/5 leading-relaxed text-base text-[#432818] sm:pl-10 pl-0'>
                            Developed applications using React-Native, Node.js, Express, and MySQL for ticket booking, secure payments, and admin-controlled management. Built an E-commerce platform with React.js,
                            MongoDB, Node.js, and Express, integrating customer and admin roles for efficient order processing. Created a full-stack mobile app with React-Native, Node.js, and MySQL, featuring JWT
                            authentication and role-based access. Designed an Android chat application using Kotlin, Firebase Authentication, Firestore, and Cloud Messaging for secure communication. Implemented 
                            seamless user authentication, data storage, and real-time functionality across multiple projects.
                        </p>
                        <a href="https://github.com/ravi-rkk" target="_blank" rel="noopener noreferrer">
                            <button 
                                type='button' 
                                data-aos='fade-up' 
                                data-aos-delay='300' 
                                className='text-white bg-[#D4A373] hover:bg-[#b8865c] focus:outline-none focus:ring-4 focus:ring-[#b8865c] font-semibold rounded-full text-xs sm:text-sm px-4 py-2 text-center'>
                                GitHub
                            </button>
                        </a>
                    </div>
                </div>
                <div data-aos='fade-up' data-aos-delay='400' className='flex flex-wrap sm:m-4 -mx-4 -mb-10 -mt-4'>
                    {
                        projects.map((project, index) => (
                            <ProjectCard key={index} {...project} />
                        ))
                    }
                </div>
            </div>
        </section>
    );
}
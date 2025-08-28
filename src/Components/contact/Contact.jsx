import React from 'react';

export default function Contact() {
  return (
    <section id='contact' className='text-gray-600 body-font bg-[#FAEDCD] '>
      <div className='container mx-auto flex px-5 py-24 items-center justify-center flex-col'>
        <div data-aos='fade-up' data-aos-delay='300' className='text-center lg:w-2/3 w-full'>
          <h1 className='title-font sm:text-4xl text-3xl mb-8 font-medium text-[#432818]'>Contact</h1>

          {/* Contact Info (Now Horizontal) */}
          <div data-aos='fade-up' data-aos-delay='500' className='flex flex-wrap justify-center items-center text-xl font-bold space-x-8'>

            {/* Phone */}
            {/* Phone */}
<a href='tel:+917505309687' className='flex items-center space-x-2 hover:text-[#432818] transition-all duration-300'>
  <svg className='h-8 w-8 text-[#432818]' width='24' height='24' viewBox='0 0 24 24' strokeWidth='2' stroke='currentColor' fill='none' strokeLinecap='round' strokeLinejoin='round'>
    <path stroke='none' d='M0 0h24v24H0z' />
    <path d='M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2' />
    <path d='M15 6h6m-3 -3v6' />
  </svg>
  <span className='text-[#432818]'>+91 7505309687</span>
</a>

{/* Email */}
<a href='mailto:rravilesh@gmail.com' className='flex items-center space-x-2 hover:text-[#432818] transition-all duration-300'>
  <svg className='h-8 w-8 text-[#432818]' width='24' height='24' viewBox='0 0 24 24' strokeWidth='2' stroke='currentColor' fill='none' strokeLinecap='round' strokeLinejoin='round'>
    <path stroke='none' d='M0 0h24v24H0z' />
    <rect x='3' y='5' width='18' height='14' rx='2' />
    <polyline points='3 7 12 13 21 7' />
  </svg>
  <span className='text-[#432818]'>rravilesh@gmail.com</span>
</a>

{/* LinkedIn */}
<a href='https://www.linkedin.com/in/ravi-kk/' target='_blank' rel='noopener noreferrer' className='flex items-center space-x-2 hover:text-[#432818] transition-all duration-300'>
  <svg className='h-8 w-8 text-[#432818]' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
    <path d='M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z' />
    <rect x='2' y='9' width='4' height='12' />
    <circle cx='4' cy='4' r='2' />
  </svg>
  <span className='text-[#432818]'>LinkedIn</span>
</a>

{/* GitHub */}
<a href='https://github.com/ravi-rkk' target='_blank' rel='noopener noreferrer' className='flex items-center space-x-2 hover:text-[#432818] transition-all duration-300'>
  <svg className='h-8 w-8 text-[#432818]' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
    <path d='M9 19c-5 1-5-3-7-4m14 8v-3.87a3.37 3.37 0 0 0-1-2.6c3-.34 6-1.5 6-6a4.91 4.91 0 0 0-1.29-3.41a4.59 4.59 0 0 0-.09-3.42s-1.14-.37-3.72 1.41a12.94 12.94 0 0 0-6.68 0c-2.58-1.78-3.72-1.41-3.72-1.41a4.59 4.59 0 0 0-.09 3.42A4.91 4.91 0 0 0 2 9.53c0 4.51 3 5.66 6 6a3.37 3.37 0 0 0-1 2.6V22' />
  </svg>
  <span className='text-[#432818]'>GitHub</span>
</a>


          </div>

          {/* Footer Text */}
          <div className='mt-12 text-lg font-semibold text-gray-900' data-aos='fade-up' data-aos-delay='700'>
            Made by <span className='text-[#432818]'>Ravilesh</span> 2025
          </div>
        </div>
      </div>
    </section>
  );
}

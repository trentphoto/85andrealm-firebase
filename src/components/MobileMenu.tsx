import Link from 'next/link';
import { useState } from 'react';
import { FaBars } from 'react-icons/fa';

import { mainMenuLinks } from '@/lib/links';

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className='relative'>
      {/* toggle button */}

      {/* <FaBars className='text-xl text-gray-600 p-4 border border-transparent hover:border-gray-200 cursor-pointer shrink-0 w-12 h-12 block md:hidden' /> */}
      
      <div
        onClick={toggleMenu}
        className='inline-flex cursor-pointer items-center overflow-hidden border border-transparent p-5 transition-colors duration-75 text-gray-500 hover:border-gray-200'
      >
        <span className='uppercase tracking-widest leading-none'>Menu</span>

        <div className='ml-3 h-full'>
          <span className='sr-only'>Menu</span>
          <FaBars className='text-xl' />
        </div>
      </div>

      {/* dropdown */}

      {isOpen ? (
        <div
          className='absolute right-0 z-10 mt-2 w-56 divide-y divide-gray-100 bg-white shadow-lg'
          role='menu'
        >
          <div className='p-2'>
            {mainMenuLinks.map((link, key) => (
              <Link
                key={key}
                href={link.path}
                className='block px-4 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors duration-75'
                role='menuitem'
              >
                {link.name}
              </Link>
            ))}
          </div>

        </div>
      ) : (
        ''
      )}
    </div>
  );
}

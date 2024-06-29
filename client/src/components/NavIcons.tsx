'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import CartModel from './CartModel';
import { useAuthStore } from '@/stores';

const NavIcons = () => {
  const router = useRouter();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const { userInfo, reset } = useAuthStore();

  const handleProfile = () => {
    if (!userInfo) {
      router.push('/auth/sign-in');
    } else {
      setIsProfileOpen((prev) => !prev);
    }
  };

  const handleCart = () => {
    if (!userInfo) router.push('/auth/sign-in');
  };

  const handleSignOut = () => {
    reset();
    setIsProfileOpen(false);
    router.push('/auth/sign-in');
  };

  return (
    <div className="flex items-center gap-4 xl:gap-6 relative">
      <Image
        src="/profile.png"
        alt="profile"
        width={22}
        height={22}
        className="cursor-pointer"
        onClick={handleProfile}
      />
      {isProfileOpen && (
        <div className="absolute p-4 rounded-md top-12 left-0 text-sm shadow-[0_3px_10px_rgb(0,0,0,0.2)] z-20 bg-white">
          <Link href="/login">Profile</Link>
          <div className="mt-2 cursor-pointer" onClick={handleSignOut}>
            Sign Out
          </div>
        </div>
      )}
      <Image
        src="/notification.png"
        alt="notification"
        width={22}
        height={22}
        className="cursor-pointer"
      />
      {!userInfo ? (
        <div className="" onClick={handleCart}>
          <Image src="/cart.png" alt="cart" width={22} height={22} className="cursor-pointer" />
        </div>
      ) : (
        <CartModel />
      )}
    </div>
  );
};

export default NavIcons;

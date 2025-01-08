import React from 'react';
import { Outlet } from 'react-router-dom';
import ShoppingHeader from './header';

const ShoppingLayout = () => {
    return (
        <div className='flex flex-col bg-white overrflow-hidden'>
            {/* Common header */}
            <ShoppingHeader />
            <main className='flex flex-col w-full'>
                <Outlet />
            </main>
        </div>
    )
}

export default ShoppingLayout;

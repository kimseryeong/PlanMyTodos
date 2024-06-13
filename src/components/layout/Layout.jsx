import React, { useState } from 'react';

import Header from './Header/Header';
import Contents from './Contents/Contents';

const Layout = () => {
    return (
        <div className='layout'>
            <Header/>
            <Contents />
        </div>
    );
}

export default Layout;
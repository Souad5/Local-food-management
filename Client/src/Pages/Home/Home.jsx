import React from 'react';
import Banner from './Banner';
import Featured from './Featured';
import FAQ from './FAQ';

const Home = () => {
    return (
        <div>
            <div className='w-7xl mx-auto'>
                <Banner/>
                <Featured/>
                <FAQ/>
            </div>
        </div>
    );
};

export default Home;
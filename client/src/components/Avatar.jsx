import React from 'react';
import { useSelector } from 'react-redux';
import ImageFrame from './imagefarme' // Assuming ImageFrame component is located here

const Avatar = () => {
    const { currentUser } = useSelector(state => state.user);

    return (
        <div className="fixed top-0 right-0 mt-4 mr-4">
            <div className="rounded-full overflow-hidden  ">
                <ImageFrame src={currentUser.avatar} alt="User Avatar" cadreSize="20" frameSize="4" frameColor="gray-500"   className='rounded-full '/>
            </div>
        </div>
    );
};

export default Avatar;

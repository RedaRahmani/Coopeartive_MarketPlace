import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Productlist = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [userListings, setUserListings] = useState([]);
  const [showListingsError, setShowListingsError] = useState(false);7

  const handleListingDelete = async (listingId) => {
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }

      setUserListings((prev) => prev.filter((listing) => listing._id !== listingId));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const handleShowListings = async () => {
      try {
        setShowListingsError(false);
        const res = await fetch(`/api/user/listings/${currentUser._id}`);
        const data = await res.json();
        if (data.success === false) {
          setShowListingsError(true);
          return;
        }
        setUserListings(data);
      } catch (error) {
        setShowListingsError(true);
      }
    }

    handleShowListings();
  }, [currentUser._id]);

  return (
    <div className="container mx-auto py-8 pl-64">
      <div className="flex items-center justify-between mb-8">
        <h1 className='text-2xl font-semibold pl-10'>User Listings</h1>
        <Link className='bg-green-700 text-white p-3 rounded-lg uppercase text-center mr-7  hover:opacity-95' to={"/create-listing"}>
          Create Listing
        </Link>
      </div>
      {showListingsError ? (
        <p className="text-center mt-4">Error showing listings</p>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mt-8 pl-10'>
          {userListings.map((listing) => (
            <div key={listing._id} className='border rounded-lg overflow-hidden shadow-md hover:scale-110 focus: outline-none focus:shadow-outline'>
              <img src={listing.imageUrls[0]} alt="listing cover" className='h-70 w-full object-cover' />
              <div className='p-4'>
                <h2 className='text-lg font-semibold text-gray-800'>{listing.name}</h2>
                <div className='flex justify-between items-center mt-2'>
                  <Link to={`/listing/${listing._id}`} className='text-blue-600 hover:underline'>View Details</Link>
                  <div>
                    {/* <button className='text-red-700 uppercase' onClick={handleListingDelete}>Delete</button> */}
                    <button onClick={() => handleListingDelete(listing._id)} className='text-red-700 uppercase'>
                  Delete
                    </button>
                    {/* <button className='text-green-700 uppercase ml-2'>Edit</button> */}
                    <Link to={`/update-listing/${listing._id}`}>
                  <button className='text-green-700 uppercase ml-2'>Edit</button>
                     </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Productlist;

// import { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation, Autoplay } from 'swiper/modules';
// import SwiperCore from 'swiper';
// import 'swiper/css/bundle';
// import Header from '../components/Header';
// import ListingItem from '../components/ListingItem';

// SwiperCore.use([Navigation, Autoplay]);

// export default function Home() {
//   const [offerListings, setOfferListings] = useState([]);
//   const [saleListings, setSaleListings] = useState([]);
//   const [rentListings, setRentListings] = useState([]);

//   useEffect(() => {
//     const fetchOfferListings = async () => {
//       try {
//         const res = await fetch('/api/listing/get?offer=true&limit=4');
//         const data = await res.json();
//         setOfferListings(data);
//         fetchRentListings();
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     const fetchRentListings = async () => {
//       try {
//         const res = await fetch('/api/listing/get?type=rent&limit=4');
//         const data = await res.json();
//         setRentListings(data);
//         fetchSaleListings();
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     const fetchSaleListings = async () => {
//       try {
//         const res = await fetch('/api/listing/get?type=sale&limit=4');
//         const data = await res.json();
//         setSaleListings(data);
//       } catch (error) {
//         console.log(error);
//       }
//     };
    
//     fetchOfferListings();
//   }, []);

//   return (
//     <div className="bg-gradient-to-br from-indigo-100 to-purple-200 min-h-screen">
//       <Header />
//       {/* Hero Section */}
//       <div className="relative flex flex-col items-center gap-6 py-20 px-3 max-w-6xl mx-auto text-center">
//         <h1 className="text-gray-800 font-extrabold text-4xl lg:text-7xl z-10">
//           Find your next <span className="text-purple-600">perfect</span> Product.
//         </h1>
//         <p className="text-gray-600 text-sm sm:text-lg z-10">
//           Buy local, impact global – every purchase supports a community.
//           <br />
//           Unique products, authentic stories – welcome to our cooperative marketplace.
//         </p>
//         <Link
//           to="/search"
//           className="text-sm sm:text-lg text-white font-bold hover:underline transition duration-300 transform hover:scale-110 bg-purple-600 py-3 px-6 rounded-full shadow-lg z-10"
//         >
//           Let's get started...
//         </Link>
//         {/* Swiper */}
//         <div className="absolute inset-0 flex items-center justify-center opacity-50">
//           <Swiper
//             autoplay={{ delay: 5000 }}
//             navigation
//             className="w-full h-full"
//           >
//             {offerListings &&
//               offerListings.length > 0 &&
//               offerListings.map((listing) => (
//                 <SwiperSlide key={listing._id}>
//                   <div
//                     style={{
//                       background: `url(${listing.imageUrls[0]}) center center/cover no-repeat`,
//                     }}
//                     className="h-[500px] w-full rounded-lg"
//                   ></div>
//                 </SwiperSlide>
//               ))}
//           </Swiper>
//         </div>
//       </div>

//       {/* Listings Section */}
//       <div className="max-w-6xl mx-auto p-3 flex flex-col gap-10 my-10">
//         {offerListings && offerListings.length > 0 && (
//           <div className="bg-white rounded-3xl p-8 shadow-xl transform transition duration-500 hover:shadow-2xl">
//             <div className="flex justify-between items-center my-3">
//               <h2 className="text-3xl font-bold text-purple-700">Recent Offers</h2>
//               <Link
//                 to="/search?offer=true"
//                 className="text-md text-purple-700 font-bold hover:underline transition duration-300 transform hover:scale-105"
//               >
//                 Show more offers
//               </Link>
//             </div>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//               {offerListings.map((listing) => (
//                 <ListingItem listing={listing} key={listing._id} />
//               ))}
//             </div>
//           </div>
//         )}
//         {rentListings && rentListings.length > 0 && (
//           <div className="bg-white rounded-3xl p-8 shadow-xl transform transition duration-500 hover:shadow-2xl">
//             <div className="flex justify-between items-center my-3">
//               <h2 className="text-3xl font-bold text-purple-700">Recent Places for Rent</h2>
//               <Link
//                 to="/search?type=rent"
//                 className="text-md text-purple-700 font-bold hover:underline transition duration-300 transform hover:scale-105"
//               >
//                 Show more places for rent
//               </Link>
//             </div>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//               {rentListings.map((listing) => (
//                 <ListingItem listing={listing} key={listing._id} />
//               ))}
//             </div>
//           </div>
//         )}
//         {saleListings && saleListings.length > 0 && (
//           <div className="bg-white rounded-3xl p-8 shadow-xl transform transition duration-500 hover:shadow-2xl">
//             <div className="flex justify-between items-center my-3">
//               <h2 className="text-3xl font-bold text-purple-700">Recent Places for Sale</h2>
//               <Link
//                 to="/search?type=sale"
//                 className="text-md text-purple-700 font-bold hover:underline transition duration-300 transform hover:scale-105"
//               >
//                 Show more places for sale
//               </Link>
//             </div>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//               {saleListings.map((listing) => (
//                 <ListingItem listing={listing} key={listing._id} />
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import Header from '../components/Header';
import ListingItem from '../components/ListingItem';

SwiperCore.use([Navigation, Autoplay]);

export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch('/api/listing/get?offer=true&limit=4');
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchRentListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=rent&limit=4');
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=sale&limit=4');
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        console.log(error);
      }
    };
    
    fetchOfferListings();
  }, []);

  return (
    <div className="bg-gradient-to-br from-indigo-100 to-purple-200 min-h-screen">
      <Header />
      {/* Hero Section */}
      <div className="relative flex flex-col items-center gap-6 py-20 px-3 max-w-6xl mx-auto text-center mt-8"> {/* Added mt-8 class for margin top */}
        <h1 className="text-gray-800 font-extrabold text-4xl lg:text-7xl z-10">
          Find your next <span className="text-purple-600">perfect</span> Product.
        </h1>
        <p className="text-gray-600 text-sm sm:text-lg z-10">
          Buy local, impact global – every purchase supports a community.
          <br />
          Unique products, authentic stories – welcome to our cooperative marketplace.
        </p>
        <Link
          to="/search"
          className="text-sm sm:text-lg text-white font-bold hover:underline transition duration-300 transform hover:scale-110 bg-purple-600 py-3 px-6 rounded-full shadow-lg z-10"
        >
          Let's get started...
        </Link>
        {/* Swiper */}
        <div className="absolute inset-0 flex items-center justify-center opacity-50">
          <Swiper
            autoplay={{ delay: 5000 }}
            navigation
            className="w-full h-full"
          >
            {offerListings &&
              offerListings.length > 0 &&
              offerListings.map((listing) => (
                <SwiperSlide key={listing._id}>
                  <div
                    style={{
                      background: `url(${listing.imageUrls[0]}) center center/cover no-repeat`,
                    }}
                    className="h-[500px] w-full rounded-lg"
                  ></div>
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </div>

      {/* Listings Section */}
      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-10 my-10">
        {offerListings && offerListings.length > 0 && (
          <div className="bg-white rounded-3xl p-8 shadow-xl transform transition duration-500 hover:shadow-2xl">
            <div className="flex justify-between items-center my-3">
              <h2 className="text-3xl font-bold text-purple-700">Recent Offers</h2>
              <Link
                to="/search?offer=true"
                className="text-md text-purple-700 font-bold hover:underline transition duration-300 transform hover:scale-105"
              >
                Show more offers
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {offerListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {rentListings && rentListings.length > 0 && (
          <div className="bg-white rounded-3xl p-8 shadow-xl transform transition duration-500 hover:shadow-2xl">
            <div className="flex justify-between items-center my-3">
              <h2 className="text-3xl font-bold text-purple-700">Recent Places for Rent</h2>
              <Link
                to="/search?type=rent"
                className="text-md text-purple-700 font-bold hover:underline transition duration-300 transform hover:scale-105"
              >
                Show more places for rent
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {rentListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {saleListings && saleListings.length > 0 && (
          <div className="bg-white rounded-3xl p-8 shadow-xl transform transition duration-500 hover:shadow-2xl">
            <div className="flex justify-between items-center my-3">
              <h2 className="text-3xl font-bold text-purple-700">Recent Places for Sale</h2>
              <Link
                to="/search?type=sale"
                className="text-md text-purple-700 font-bold hover:underline transition duration-300 transform hover:scale-105"
              >
                Show more places for sale
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {saleListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


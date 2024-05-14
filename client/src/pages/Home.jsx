import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';

import 'swiper/css/bundle';
import ListingItem from '../components/ListingItem';

export default function Home() {
    const navigate = useNavigate();
    const [offerListings, setOfferListings] = useState([]);
    const [saleListings, setSaleListings] = useState([]);

    SwiperCore.use([Navigation]);

    useEffect(() => {
        const fetchOfferListings = async () => {
            try {
                const res = await fetch('/api/listing/get?offer=true&limit=4');
                if (!res.ok) {
                    throw new Error('Failed to fetch offer listings');
                }
                const data = await res.json();
                setOfferListings(data);
                fetchSaleListings();
            } catch (error) {
                console.error('Error fetching offer listings:', error);
                // Handle the error (e.g., show a message to the user)
            }
        };

        const fetchSaleListings = async () => {
            try {
                const res = await fetch('/api/listing/get?&limit=4');
                if (!res.ok) {
                    throw new Error('Failed to fetch sale listings');
                }
                const data = await res.json();
                setSaleListings(data);
            } catch (error) {
                console.error('Error fetching sale listings:', error);
                // Handle the error (e.g., show a message to the user)
            }
        };

        fetchOfferListings();
    }, []);

    return (
        <div>
            {/* top */}
            <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto'>
                <h1 className='text-slate-700 font-bold text-3xl lg:text-6xl'>
                    Find your Product <span className='text-slate-500'>perfect </span>
                    <br />
                    place with ease
                </h1>
                <div className='text-gray-400 text-xs sm:text-sm'>
                    Sahand Estate is the best place to find your Product perfect .
                    <br />
                    We have a wide range of properties for you to choose from.
                </div>
                <Link
                    to={'/search'}
                    className='text-xs sm:text-sm text-blue-800 font-bold hover:underline'
                >
                    Let's get started...
                </Link>
            </div>

            {/* swiper */}
            <Swiper navigation>
                {offerListings && offerListings.length > 0 && offerListings.map((listing) => (
                    <SwiperSlide key={listing._id}>
                        <div
                            style={{
                                background: `url(../images/images (1).jpg) center no-repeat`,
                                backgroundSize: 'cover',
                            }}
                            className='h-500'
                        ></div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* listing results for offer, sale and rent */}
            <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
                {/* Offer Listings */}
                {offerListings && offerListings.length > 0 && (
                    <div>
                        <div className='my-3'>
                            <h2 className='text-2xl font-semibold text-slate-600' style={{ borderLeft: "10px solid", paddingLeft: '10px' }}>Recent offers</h2>
                            <Link className='text-sm text-blue-800 hover:underline' to={'/search?offer=true'}>Show more offers</Link>
                        </div>
                        <div className='flex flex-wrap gap-4'>
                            {offerListings.map((listing) => (
                                <ListingItem listing={listing} key={listing._id} />
                            ))}
                        </div>
                    </div>
                )}

                {/* Sale Listings */}
                {saleListings && saleListings.length > 0 && (
                    <div>
                        <div className='my-8'>
                            <h2 className='text-3xl font-semibold text-gray-800 border-l-4 border-blue-500 pl-4 mb-4' >Recent Products for Sale</h2>
                            <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=all'}>View All</Link>
                        </div>
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
                            {saleListings.map((listing) => (
                                <div key={listing._id} className="bg-white shadow-md rounded-lg overflow-hidden">
                                    {/* Product Image */}
                                    <img
                                        src={listing.imageUrls[0] || 'https://via.placeholder.com/400'}
                                        alt={listing.name}
                                        className="w-full h-48 object-cover object-center"
                                    />
                                    <div className="p-2">
                                        <h2 className="text-xl font-semibold text-gray-800 mb-2">{listing.name}</h2>
                                        <p className="text-gray-600 mb-4">{listing.description}</p>
                                        <div className="flex items-center justify-between">
                                            <span className="text-lg font-bold text-gray-900">${listing.regularPrice}</span>
                                            <div className="flex items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-5 w-5 text-yellow-500 mr-1">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4v2m-6-7h6m-6 0H6" />
                                                </svg>
                                                <span className="text-sm text-gray-600">4.5</span>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Add to Cart Button */}
                                    <button className="block w-full p-3 text-center bg-blue-500 text-white font-semibold uppercase hover:bg-blue-700 focus:outline-none">Add to Cart</button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Promotional Banners */}
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div class=" rounded-lg overflow-hidden">
                        <div class="p-6 flex items-center">
                            <svg class="shadow-lg w-12 h-12 text-gray-600 inline-block border-2 border-gray-300 rounded-full p-2 mr-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
                            <div>
                                <h3 class="text-xl font-semibold text-gray-800">FREE AND FAST DELIVERY</h3>
                                <p class="text-gray-600 mt-2">Free Delivery for all orders over $10</p>
                            </div>
                        </div>
                    </div>
                    <div class="  rounded-lg overflow-hidden">
                        <div class="p-6 flex items-center">
                            <svg class="shadow-lg w-12 h-12 text-gray-600 inline-block border-2 border-gray-300 rounded-full p-2 mr-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10.5a9 9 0 1118 0 9 9 0 01-18 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14.5v4"></path></svg>
                            <div>
                                <h3 class="text-xl font-semibold text-gray-800">24/7 CUSTOMER SERVICE</h3>
                                <p class="text-gray-600 mt-2">Friendly customer support</p>
                            </div>
                        </div>
                    </div>
                    <div class="  rounded-lg overflow-hidden">
                        <div class="p-6 flex items-center">
                            <svg class=" shadow-lg w-12 h-12 text-gray-600 inline-block border-2 border-gray-300 rounded-full p-2 mr-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>
                            <div>
                                <h3 class="text-xl font-semibold text-gray-800">MONEY BACK GUARANTEE</h3>
                                <p class="text-gray-600 mt-2">We return money within 30 days</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

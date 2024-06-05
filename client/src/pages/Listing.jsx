import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { useSelector } from 'react-redux';
import { Navigation } from 'swiper/modules';
import { MdProductionQuantityLimits } from "react-icons/md";
import { BiCategoryAlt } from "react-icons/bi";
import AddToCartButton from '../components/cartItems.jsx';
import ReviewForm from '../components/ReviewForm.jsx';
import Header from '../components/Header.jsx';
import { FaFileInvoiceDollar, FaEye, FaShareAlt, FaShoppingCart, FaDollarSign } from 'react-icons/fa';
import 'swiper/css/bundle';
import { FaShare } from 'react-icons/fa';
import Contact from '../components/Contact';
import ReviewList from '../components/ReviewList.jsx';
import Footer from '../components/Footer.jsx'

SwiperCore.use([Navigation]);

export default function Listing() {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);
  const [views, setViews] = useState(null);
  const [shares, setShares] = useState(null);
  const params = useParams();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const incrementViewed = async () => {
      try {
        await fetch('/api/listing/viewed', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ listingId: params.listingId }),
        });
      } catch (error) {
        console.error(error);
      }
    };

    incrementViewed();
  }, [params.listingId]);

  useEffect(() => {
    const fetchViews = async () => {
      try {
        const res = await fetch(`/api/listing/viewedByProduct?id=${params.listingId}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        });
        const data = await res.json();
        setViews(data.views);
      } catch (error) {
        console.error(error);
      }
    };

    if (currentUser) {
      fetchViews();
    }
  }, [currentUser]);

  useEffect(() => {
    const fetchShares = async () => {
      try {
        const res = await fetch(`/api/listing/getproductshared?id=${params.listingId}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        });
        const data = await res.json();
        setShares(data.shares);
      } catch (error) {
        console.error(error);
      }
    };

    if (currentUser) {
      fetchShares();
    }
  }, [currentUser]);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);

  const handleShareButtonClick = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);

    incrementShared();
  };

  const incrementShared = async () => {
    try {
      await fetch('/api/listing/shares', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ listingId: params.listingId }),
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <main className="bg-gray-100 min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-8">
          {loading && <p className="text-center my-7 text-2xl text-gray-700">Loading...</p>}
          {error && <p className="text-center my-7 text-2xl text-red-500">Something went wrong!</p>}
          {listing && !loading && !error && (
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="relative">
                  <Swiper navigation className="h-64 md:h-96">
                    {listing.imageUrls.map((url) => (
                      <SwiperSlide key={url}>
                        <div className="h-full">
                          <img src={url} alt="Listing Image" className="object-cover w-full h-full" />
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                  <div className="absolute top-4 right-4 flex flex-col items-center space-y-2 z-10">
                    <div className="flex items-center space-x-1 text-white bg-gray-800 px-2 py-1 rounded-md">
                      <FaEye className="text-xl" />
                      <span>{views !== null ? views : '...'}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-white bg-gray-800 px-2 py-1 rounded-md">
                      <FaShareAlt className="text-xl" />
                      <span>{shares !== null ? shares : '...'}</span>
                    </div>
                    
                  </div>
                  <ReviewList/>
                  <div className="fixed top-16 right-4 z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-white shadow-lg cursor-pointer">
                     <FaShare
                       className="text-gray-500"
                       onClick={handleShareButtonClick}
                     />
                   </div>
                  {copied && (
                    
                    <p className="fixed top-24 right-6 z-10 rounded-md bg-white p-2 shadow-lg">
                      Link copied!
                    </p>
                  )}
                </div>
                <div className="p-6">
                  <h2 className="text-3xl font-semibold text-gray-800">
                    {listing.name} - DH
                    {listing.offer
                      ? listing.discountPrice.toLocaleString('en-US')
                      : listing.regularPrice.toLocaleString('en-US')}
                  </h2>
                  <p className="flex items-center mt-4 gap-2 text-gray-600 text-sm">
                    <BiCategoryAlt className="text-green-700" />
                    {listing.ingredients}
                  </p>
                  
                  
                  <p className="text-gray-800 mt-4">
                    <span className="font-semibold text-black">Description - </span>
                    {listing.description}
                  </p>
                  <ul className="text-green-700 font-semibold text-sm flex flex-wrap items-center gap-4 mt-4">
                    <li className="flex items-center gap-1">
                      <MdProductionQuantityLimits className="text-lg" />
                      {listing.quantity > 1
                        ? `${listing.quantity} Quantities`
                        : `${listing.quantity} Quantity`}
                    </li>
                  </ul>
                  <div className="flex gap-4 mt-4">
                    <span className="bg-red-500 text-white text-center py-1 px-3 rounded-md">
                      {listing.type}
                    </span>
                    {listing.offer && (
                      <span className="bg-green-500 text-white text-center py-1 px-3 rounded-md">
                        DH{+listing.regularPrice - +listing.discountPrice} OFF
                      </span>
                    )}
                  </div>
                  {currentUser.role === 'client' && (
                    <div className="mt-4">
                      <AddToCartButton />
                    </div>
                  )}
                  
                  <div className="mt-6">
                    <ReviewForm />

                  </div>
                  {/* {currentUser.role === 'client' && (
                    <button
                      onClick={() => setContact(true)}
                      className="bg-gray-700 text-white rounded-lg uppercase hover:opacity-95 py-2 px-4 mt-4"
                    >
                      Contact landlord
                    </button>
                  )}
                  {contact && <Contact listing={listing} />} */}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

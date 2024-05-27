// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import ListingItem from '../components/ListingItem';
// import Header from '../components/Header';

// const Search = () => {
//     const navigate = useNavigate();
//     const [sidebardata, setSidebardata] = useState({
//         searchTerm: '',
//         type: 'all',
//         offer: false,
//         sort: 'created_at',
//         order: 'desc',
//     });

//     const [loading, setLoading] = useState(false);
//     const [listings, setListings] = useState([]);
//     console.log(listings);

//     useEffect(() => {
//         const urlParams = new URLSearchParams(location.search);
//         const searchTermFromUrl = urlParams.get('searchTerm');
//         const typeFromUrl = urlParams.get('type');
//         const offerFromUrl = urlParams.get('offer');
//         const sortFromUrl = urlParams.get('sort');
//         const orderFromUrl = urlParams.get('order');

//         if (searchTermFromUrl || typeFromUrl || offerFromUrl || sortFromUrl || orderFromUrl) {
//             setSidebardata({
//                 searchTerm: searchTermFromUrl || '',
//                 type: typeFromUrl || 'all',
//                 offer: offerFromUrl === 'true' ? true : false,
//                 sort: sortFromUrl || 'created_at',
//                 order: orderFromUrl || 'desc',
//             });
//         }

//         const fetchListings = async () => {
//             setLoading(true);
//             const searchQuery = urlParams.toString();
//             const res = await fetch(`/api/listing/get?${searchQuery}`);
//             const data = await res.json(); // added await here
//             setListings(data);
//             setLoading(false);
//         };
//         fetchListings();
//     }, [location.search]);

//     const handleChange = (e) => {
//         if (
//             e.target.id === 'all' ||
//             e.target.id === 'Agroalimentaire' ||
//             e.target.id === 'Beaute' ||
//             e.target.id === 'Artisanat'
//           ) {
//             setSidebardata({ ...sidebardata, type: e.target.id });
//           }
//         if (e.target.id === 'searchTerm') {
//             setSidebardata({ ...sidebardata, searchTerm: e.target.value });
//         } else if (e.target.id === 'offer') {
//             setSidebardata({ ...sidebardata, [e.target.id]: e.target.checked });
//         // } else if (e.target.id === 'sort_order') {
//             // const [sort, order] = e.target.value.split('_');
//             // setSidebardata({ ...sidebardata, sort, order });
//         }else if (e.target.id === 'sort_order') {
//                 const sort = e.target.value.split('_')[0] || 'created_at';
          
//                 const order = e.target.value.split('_')[1] || 'desc';
          
//                 setSidebardata({ ...sidebardata, sort, order });
//         } else if (e.target.id === 'all' || e.target.id === 'Beaute' || e.target.id === 'Artisanat' || e.target.id === 'Agroalimentaire') {
//             setSidebardata({ ...sidebardata, type: e.target.id });
//         }
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         const urlParams = new URLSearchParams();
//         urlParams.set('searchTerm', sidebardata.searchTerm);
//         urlParams.set('type', sidebardata.type);
//         urlParams.set('offer', sidebardata.offer);
//         urlParams.set('sort', sidebardata.sort);
//         urlParams.set('order', sidebardata.order);
//         const searchQuery = urlParams.toString();
//         navigate(`/search?${searchQuery}`);
//     };

//     return (
//         <>
//         <Header />
//         <div className='flex flex-col md:flex-row'>
//             <div className='p-7 border-b-2 md:border-r-2 md:min-h-screen'>
//                 <form onSubmit={handleSubmit} className='flex flex-col gap-8'>
//                     <div className='flex items-center gap-2'>
//                         <label className='whitespace-nowrap font-semibold'>Search Term:</label>
//                         <input
//                             type='text'
//                             id='searchTerm'
//                             placeholder='Search...'
//                             className='border rounded-lg p-3 w-full'
//                             value={sidebardata.searchTerm}
//                             onChange={handleChange}
//                         />
//                     </div>
//                     <div className='flex gap-2 flex-wrap'>
//                         <label className='font-semibold'>Type:</label>
//                         <div className='flex gap-2'>
//                             <input
//                                 type='checkbox'
//                                 id='Agroalimentaire'
//                                 className='w-5'
//                                 onChange={handleChange}
//                                 checked={sidebardata.type === 'Agroalimentaire'}
//                             />
//                             <span>Agroalimentaire</span>
//                         </div>
//                         <div className='flex gap-2'>
//                             <input
//                                 type='checkbox'
//                                 id='Beaute'
//                                 className='w-5'
//                                 onChange={handleChange}
//                                 checked={sidebardata.type === 'Beaute'}
//                             />
//                             <span>Beaute</span>
//                         </div>
//                         <div className='flex gap-2'>
                        
//                             <input
//                                 type='checkbox'
//                                 id='Artisanat'
//                                 className='w-5'
//                                 onChange={handleChange}
//                                 checked={sidebardata.type === 'Artisanat'}
//                             />
//                             <span>Artisanat</span>
//                         </div>
//                         <div className='flex gap-2'>
//                             <input
//                                 type='checkbox'
//                                 id='all'
//                                 className='w-5'
//                                 onChange={handleChange}
//                                 checked={sidebardata.type === 'all'}
//                             />
//                             <span>All</span>
//                         </div>
//                     </div>
//                     <div className='flex gap-2 flex-wrap'>
//                         <label className='font-semibold'>Amenities:</label>
//                         <div className='flex gap-2'>
//                             <input
//                                 type='checkbox'
//                                 id='offer'
//                                 className='w-5'
//                                 onChange={handleChange}
//                                 checked={sidebardata.offer}
//                             />
//                             <span>offer</span>
//                         </div>
//                     </div>
//                     <div className='flex items-center gap-2'>
//                         <label className='font-semibold'>Sort:</label>
//                         <select
//                             onChange={handleChange}
//                             defaultValue={'created_at_desc'}
//                             id='sort_order'
//                             className='border rounded-lg p-3'>
//                             <option value='regularPrice_desc'>Price High to low</option>
//                             <option value='regularPrice_asc'>Price low to high</option>
//                             <option value='createdAt_desc'>Latest</option>
//                             <option value='createdAt_asc'>Oldest</option>
//                         </select>
//                     </div>
//                     <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95'>
//                         Search
//                     </button>
//                 </form>
//             </div>
//             <div className='flex-1'>
//                 <h1 className='text-3xl font-semibold border-b p-3 text-slate-700 mt-5'>Listing results:</h1>
//                 <div className='p-7 flex flex-wrap gap-4'>
//                     {!loading && listings.length === 0 && (
//                         <p className='text-xl text-slate-700'>No List Found</p>
//                     )}
//                     {loading && (
//                         <p className='text-xl text-slate-700 text-center w-full'>Loading...</p>
//                     )}
//                     {!loading &&
//                      listings && 
//                      listings.map((listing)=>(
//                         <ListingItem  key={listing._id} listing={listing}/>
//                     ))}
//                 </div>
//             </div>
//         </div>
//         </>
//     );
// };

// export default Search;
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ListingItem from '../components/ListingItem';
import Header from '../components/Header';

const Search = () => {
    const navigate = useNavigate();
    const [sidebardata, setSidebardata] = useState({
        searchTerm: '',
        type: 'all',
        offer: false,
        sort: 'created_at',
        order: 'desc',
    });

    const [loading, setLoading] = useState(false);
    const [listings, setListings] = useState([]);
    console.log(listings);

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');
        const typeFromUrl = urlParams.get('type');
        const offerFromUrl = urlParams.get('offer');
        const sortFromUrl = urlParams.get('sort');
        const orderFromUrl = urlParams.get('order');

        if (searchTermFromUrl || typeFromUrl || offerFromUrl || sortFromUrl || orderFromUrl) {
            setSidebardata({
                searchTerm: searchTermFromUrl || '',
                type: typeFromUrl || 'all',
                offer: offerFromUrl === 'true' ? true : false,
                sort: sortFromUrl || 'created_at',
                order: orderFromUrl || 'desc',
            });
        }

        const fetchListings = async () => {
            setLoading(true);
            const searchQuery = urlParams.toString();
            const res = await fetch(`/api/listing/get?${searchQuery}`);
            const data = await res.json();
            setListings(data);
            setLoading(false);
        };
        fetchListings();
    }, [location.search]);

    // const handleChange = (e) => {
    //     const { id, value, checked, type } = e.target;
    //     setSidebardata((prevData) => ({
    //         ...prevData,
    //         [id]: type === 'checkbox' ? checked : value,
    //     }));
    // };
        const handleChange = (e) => {
        if (
            e.target.id === 'all' ||
            e.target.id === 'Agroalimentaire' ||
            e.target.id === 'Beaute' ||
            e.target.id === 'Artisanat'
          ) {
            setSidebardata({ ...sidebardata, type: e.target.id });
          }
        if (e.target.id === 'searchTerm') {
            setSidebardata({ ...sidebardata, searchTerm: e.target.value });
        } else if (e.target.id === 'offer') {
            setSidebardata({ ...sidebardata, [e.target.id]: e.target.checked });
        // } else if (e.target.id === 'sort_order') {
            // const [sort, order] = e.target.value.split('_');
            // setSidebardata({ ...sidebardata, sort, order });
        }else if (e.target.id === 'sort_order') {
                const sort = e.target.value.split('_')[0] || 'created_at';
          
                const order = e.target.value.split('_')[1] || 'desc';
          
                setSidebardata({ ...sidebardata, sort, order });
        } else if (e.target.id === 'all' || e.target.id === 'Beaute' || e.target.id === 'Artisanat' || e.target.id === 'Agroalimentaire') {
            setSidebardata({ ...sidebardata, type: e.target.id });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams();
        urlParams.set('searchTerm', sidebardata.searchTerm);
        urlParams.set('type', sidebardata.type);
        urlParams.set('offer', sidebardata.offer);
        urlParams.set('sort', sidebardata.sort);
        urlParams.set('order', sidebardata.order);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
    };

    return (
        <>
            <Header />
            <div className="flex flex-col md:flex-row bg-gray-100 min-h-screen">
                <div className="p-7 bg-white shadow-md md:min-h-screen w-full md:w-1/4">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                        <div className="flex flex-col gap-2">
                            <label className="font-semibold text-gray-700">Search Term:</label>
                            <input
                                type="text"
                                id="searchTerm"
                                placeholder="Search..."
                                className="border rounded-lg p-3 w-full"
                                value={sidebardata.searchTerm}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="font-semibold text-gray-700">Type:</label>
                            <div className="flex flex-wrap gap-2">
                                {['all', 'Agroalimentaire', 'Beaute', 'Artisanat'].map((type) => (
                                    <label key={type} className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            id={type}
                                            className="w-5"
                                            onChange={handleChange}
                                            checked={sidebardata.type === type}
                                        />
                                        <span className="capitalize">{type}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="offer"
                                className="w-5"
                                onChange={handleChange}
                                checked={sidebardata.offer}
                            />
                            <label htmlFor="offer" className="font-semibold text-gray-700">Offer</label>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="font-semibold text-gray-700">Sort:</label>
                            <select
                                onChange={handleChange}
                                defaultValue={'createdAt_desc'}
                                id="sort_order"
                                className="border rounded-lg p-3">
                                <option value="regularPrice_desc">Price High to low</option>
                                <option value="regularPrice_asc">Price low to high</option>
                                <option value="createdAt_desc">Latest</option>
                                <option value="createdAt_asc">Oldest</option>
                            </select>
                        </div>
                        <button className="bg-blue-600 text-white p-3 rounded-lg uppercase hover:bg-blue-700 transition duration-300">
                            Search
                        </button>
                    </form>
                </div>
                <div className="flex-1 p-7">
                    <h1 className="text-3xl font-semibold border-b pb-3 text-gray-700">Listing Results:</h1>
                    <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {loading && (
                            <p className="text-xl text-gray-700 text-center w-full">Loading...</p>
                        )}
                        {!loading && listings.length === 0 && (
                            <p className="text-xl text-gray-700">No Listings Found</p>
                        )}
                        {!loading && listings.map((listing) => (
                            <ListingItem key={listing._id} listing={listing} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Search;

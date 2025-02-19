// import React from 'react'
// import { Link } from 'react-router-dom';
// import { BiCategoryAlt } from "react-icons/bi";
// import { MdProductionQuantityLimits } from "react-icons/md";


// export default function ListingItem  ({listing})  {
//   return (
//     <div className='bg-white'>
//         <Link to={`/listing/${listing._id}`}>
//         <img
//           src={
//             listing.imageUrls[0] ||
//             'https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/Sales_Blog/real-estate-business-compressor.jpg?width=595&height=400&name=real-estate-business-compressor.jpg'
//           }
//           alt='listing cover'
//           className='h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300'
//         />
//         <div className='p-3 flex flex-col gap-2 w-full'>
//           <p className='truncate text-lg font-semibold text-slate-700'>
//             {listing.name}
//           </p>
//           <div className='flex items-center gap-1'>
//             <BiCategoryAlt className='h-4 w-4 text-green-700' />
//             <p className='text-sm text-gray-600 truncate w-full'>
//               {listing.type}
//             </p>
//           </div>
//           <p className='text-sm text-gray-600 line-clamp-2'>
//             {listing.description}
//           </p>
//           <p className='text-sm text-gray-600 line-clamp-2'>
//             <span className=''>ingerdiants:</span>{listing.ingredients}
//           </p>
//           <p className='text-slate-500 mt-2 font-semibold '>
//             DH
//             {listing.offer
//               ? listing.discountPrice.toLocaleString('en-US')
//               : listing.regularPrice.toLocaleString('en-US')}
//             {/* {listing.type === 'Agroalimentaire' || 'Beaute' || 'Artisanat'} */}
//           </p>
//           <div className='text-slate-700 flex gap-4'>
//             <div className='font-bold text-xs'>
//                 {/* <MdProductionQuantityLimits className='flex'/> */}
//               {listing.quantity > 1
//                 ? `${listing.quantity} contities `
//                 : `${listing.quantity} each `}
//             </div>
//         </div>
//         </div>
//         </Link>
//     </div>
//   )
// }


import React from 'react';
import { Link } from 'react-router-dom';
import { BiCategoryAlt } from "react-icons/bi";

const ListingItem = ({ listing }) => {
  return (
    <div className='bg-white'>
      <Link to={`/listing/${listing._id}`}>
        <img
          src={listing.imageUrls[0] || 'https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/Sales_Blog/real-estate-business-compressor.jpg?width=595&height=400&name=real-estate-business-compressor.jpg'}
          alt='listing cover'
          className='h-64 w-full object-cover hover:scale-105 transition-scale duration-300'
        />
      </Link>
      <div className='p-3 flex flex-col gap-2 w-full'>
        <p className='truncate text-lg font-semibold text-slate-700'>{listing.name}</p>
        <div className='flex items-center gap-1'>
          <BiCategoryAlt className='h-4 w-4 text-green-700' />
          <p className='text-sm text-gray-600 truncate w-full'>{listing.type}</p>
        </div>
        <p className='text-sm text-gray-600 line-clamp-2'>{listing.description}</p>
        <p className='text-sm text-gray-600 line-clamp-2'><span className='font-semibold'>Ingredients:</span> {listing.ingredients}</p>
        <p className='text-slate-500 mt-2 font-semibold'>
          DH {listing.offer ? listing.discountPrice.toLocaleString('en-US') : listing.regularPrice.toLocaleString('en-US')}
        </p>
        <div className='text-slate-700 flex gap-4'>
          <div className='font-bold text-xs'>
            {listing.quantity > 1 ? `${listing.quantity} quantities` : `${listing.quantity} each`}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingItem;

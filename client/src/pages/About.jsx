// import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';

// const images = [
//   { src: '../images/images.jpg', alt: 'Coopérétavi products' },
//   { src: '../images/images (1).jpg', alt: 'Coopérétavi products' },
//   { src: '../images/images (2).jpg', alt: 'Coopérétavi products' }
// ];

// const AboutPage = () => {
//   return (
//     <div className="container mt-4">
//       <div className="row">
//         <div className="col-md-8 offset-md-2">
//           <h1 className="mb-4">About Our Cooperative</h1>
//           <p>
//             Welcome to Cooperative, your destination for premium goods and a community-driven shopping experience. We are committed to sustainability, integrity, and supporting local artisans and producers.
//           </p>
//           <p>
//             Our mission is to create a more equitable marketplace by connecting consumers with ethically sourced products. We carefully select each item to ensure it meets our standards for quality and ethical production.
//           </p>
//           <p>
//             At Cooperative, we value transparency and strive to build trust with our customers. Our team is dedicated to providing exceptional service and upholding the values of our cooperative.
//           </p>
//           <div className="row mt-5 mb-4">
//             {images.map((image, index) => (
//               <div key={index} className="col-md-4 mb-3">
//                 <img src={image.src} alt={image.alt} className="img-fluid rounded" />
//               </div>
//             ))}
//           </div>
//           <h2 className="mb-3">Our Values</h2>
//           <ul className="list-unstyled">
//             <li><strong>Sustainability:</strong> We are committed to minimizing our ecological footprint and promoting environmental stewardship.</li>
//             <li><strong>Integrity:</strong> We operate with honesty, transparency, and fairness in all aspects of our business.</li>
//             <li><strong>Community:</strong> We believe in the power of community and support local economies and artisans.</li>
//           </ul>
//           <p>
//             Thank you for choosing Cooperative. Together, we can make a positive impact on our planet and communities.
//           </p>
//           <h2 className="mt-5 mb-3">Contact Us</h2>
//           <p>
//             Have questions or feedback? Contact our customer support team at Cooperative@gmail.com or give us a call at 0612121212.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AboutPage;


import React from 'react'

export default function About() {
  return (
    <div className='py-20 px-4 max-w-6xl mx-auto'>
      <h1 className='text-3xl font-bold mb-4 text-slate-800'>About Sahand Estate</h1>
      <p className='mb-4 text-slate-700'>Sahand Estate is a leading real estate agency that specializes in helping clients buy, sell, and rent properties in the most desirable neighborhoods. Our team of experienced agents is dedicated to providing exceptional service and making the buying and selling process as smooth as possible.</p>
      <p className='mb-4 text-slate-700'>
      Our mission is to help our clients achieve their real estate goals by providing expert advice, personalized service, and a deep understanding of the local market. Whether you are looking to buy, sell, or rent a property, we are here to help you every step of the way.
      </p>
      <p className='mb-4 text-slate-700'>Our team of agents has a wealth of experience and knowledge in the real estate industry, and we are committed to providing the highest level of service to our clients. We believe that buying or selling a property should be an exciting and rewarding experience, and we are dedicated to making that a reality for each and every one of our clients.</p>
    </div>
  )
}

import React from 'react';
import Header from '../components/Header';
import { Link } from 'react-router-dom';
import { VscAccount } from 'react-icons/vsc';
import { MdOutlineContactSupport, MdOutlineNotificationsActive } from 'react-icons/md';
import { FaFileInvoiceDollar } from 'react-icons/fa';
import { BsBoxSeamFill } from 'react-icons/bs';
import { LuClipboardList } from 'react-icons/lu';
import { IoSettingsOutline } from 'react-icons/io5';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter, faLinkedin, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { LeftMenu } from '../components/Userinfo';
import { useDispatch, useSelector } from 'react-redux';
import Footer from '../components/Footer';


const Contact = () => {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  return (
    <>
    {currentUser.role === 'coop' && (
      <div className="px-6 py-12 bg-gray-100 flex min-h-screen">
        <LeftMenu/>
        <div className="ml-72 flex-grow">
          <h1 className="text-4xl font-bold mb-12 text-center">Contact Us</h1>
          <div className="flex flex-col lg:flex-row justify-between">
            <div className="w-full lg:w-2/3 mb-12 lg:mb-0">
              <form className="bg-white p-8 rounded-lg shadow-lg">
                <div className="mb-6">
                  <label htmlFor="firstName" className="block text-gray-700 font-bold mb-2">First Name</label>
                  <input type="text" id="firstName" name="firstName" placeholder="Enter First Name" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="mb-6">
                  <label htmlFor="lastName" className="block text-gray-700 font-bold mb-2">Last Name</label>
                  <input type="text" id="lastName" name="lastName" placeholder="Enter Last Name" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="mb-6">
                  <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
                  <input type="email" id="email" name="email" placeholder="Enter your Email" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="mb-6">
                  <label htmlFor="phone" className="block text-gray-700 font-bold mb-2">Phone</label>
                  <input type="tel" id="phone" name="phone" placeholder="Enter Phone Number" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="mb-6">
                  <label htmlFor="subject" className="block text-gray-700 font-bold mb-2">Subject</label>
                  <input type="text" id="subject" name="subject" placeholder="Enter your Subject" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="mb-6">
                  <label htmlFor="message" className="block text-gray-700 font-bold mb-2">Message</label>
                  <textarea id="message" name="message" placeholder="Enter your Message here..." className="w-full p-3 border border-gray-300 rounded-lg h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
                </div>
                <button type="submit" className="bg-blue-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors duration-300">Send Your Message</button>
              </form>
            </div>
            <div className="w-full lg:w-1/3 lg:ml-8 bg-white p-8 rounded-lg shadow-lg">
              <div className="mb-12 border p-10 rounded-lg bg-gradient-to-r from-blue-50 to-blue-200 transform hover:scale-105 transition-transform">
                <p className="text-gray-700 font-bold mb-2 ">
                  <FontAwesomeIcon icon={faEnvelope} className="mr-2" /> Email:
                </p>
                <p>support@anousouk.com</p>
              </div>
              <div className="mb-12 border p-10 rounded-lg bg-gradient-to-r from-blue-50 to-blue-200 transform hover:scale-105 transition-transform">
                <p className="text-gray-700 font-bold mb-2">
                  <FontAwesomeIcon icon={faPhone} className="mr-2" /> Phone:
                </p>
                <p>+212 00000 00000</p>
              </div>
              <div className="mb-12 border p-10 rounded-lg bg-gradient-to-r from-blue-50 to-blue-200 transform hover:scale-105 transition-transform">
                <p className="text-gray-700 font-bold mb-2">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" /> Location:
                </p>
                <p>Some Where in the World</p>
              </div>
              <div className="mb-6 border p-10 rounded-lg bg-gradient-to-r from-blue-50 to-blue-200 transform hover:scale-105 transition-transform">
                <p className="text-gray-700 font-bold mb-2">Social Profiles</p>
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-500 hover:text-gray-700 transition-colors">
                    <FontAwesomeIcon icon={faFacebook} />
                  </a>
                  <a href="#" className="text-gray-500 hover:text-gray-700 transition-colors">
                    <FontAwesomeIcon icon={faTwitter} />
                  </a>
                  <a href="#" className="text-gray-500 hover:text-gray-700 transition-colors">
                    <FontAwesomeIcon icon={faLinkedin} />
                  </a>
                  <a href="#" className="text-gray-500 hover:text-gray-700 transition-colors">
                    <FontAwesomeIcon icon={faInstagram} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )}
     {currentUser.role === 'client' && (
      <>
      <Header/>
      <div className="px-6 py-12 bg-gray-100 flex min-h-screen">
        
        <div className="ml-10 flex-grow">
          <h1 className="text-4xl font-bold mb-12 ml-0 text-center">Contact Us</h1>
          <div className="flex flex-col lg:flex-row justify-between">
            <div className="w-full lg:w-2/3 mb-12 lg:mb-0">
              <form className="bg-white p-8 rounded-lg shadow-lg">
                <div className="mb-6">
                  <label htmlFor="firstName" className="block text-gray-700 font-bold mb-2">First Name</label>
                  <input type="text" id="firstName" name="firstName" placeholder="Enter First Name" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="mb-6">
                  <label htmlFor="lastName" className="block text-gray-700 font-bold mb-2">Last Name</label>
                  <input type="text" id="lastName" name="lastName" placeholder="Enter Last Name" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="mb-6">
                  <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
                  <input type="email" id="email" name="email" placeholder="Enter your Email" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="mb-6">
                  <label htmlFor="phone" className="block text-gray-700 font-bold mb-2">Phone</label>
                  <input type="tel" id="phone" name="phone" placeholder="Enter Phone Number" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="mb-6">
                  <label htmlFor="subject" className="block text-gray-700 font-bold mb-2">Subject</label>
                  <input type="text" id="subject" name="subject" placeholder="Enter your Subject" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="mb-6">
                  <label htmlFor="message" className="block text-gray-700 font-bold mb-2">Message</label>
                  <textarea id="message" name="message" placeholder="Enter your Message here..." className="w-full p-3 border border-gray-300 rounded-lg h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
                </div>
                <button type="submit" className="bg-blue-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors duration-300">Send Your Message</button>
              </form>
            </div>
            <div className="w-full lg:w-1/3 lg:ml-8 bg-white p-8 rounded-lg shadow-lg">
              <div className="mb-12 border p-10 rounded-lg bg-gradient-to-r from-blue-50 to-blue-200 transform hover:scale-105 transition-transform">
                <p className="text-gray-700 font-bold mb-2 ">
                  <FontAwesomeIcon icon={faEnvelope} className="mr-2" /> Email:
                </p>
                <p>support@anousouk.com</p>
              </div>
              <div className="mb-12 border p-10 rounded-lg bg-gradient-to-r from-blue-50 to-blue-200 transform hover:scale-105 transition-transform">
                <p className="text-gray-700 font-bold mb-2">
                  <FontAwesomeIcon icon={faPhone} className="mr-2" /> Phone:
                </p>
                <p>+212 00000 00000</p>
              </div>
              <div className="mb-12 border p-10 rounded-lg bg-gradient-to-r from-blue-50 to-blue-200 transform hover:scale-105 transition-transform">
                <p className="text-gray-700 font-bold mb-2">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" /> Location:
                </p>
                <p>Some Where in the World</p>
              </div>
              <div className="mb-6 border p-10 rounded-lg bg-gradient-to-r from-blue-50 to-blue-200 transform hover:scale-105 transition-transform">
                <p className="text-gray-700 font-bold mb-2">Social Profiles</p>
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-500 hover:text-gray-700 transition-colors">
                    <FontAwesomeIcon icon={faFacebook} />
                  </a>
                  <a href="#" className="text-gray-500 hover:text-gray-700 transition-colors">
                    <FontAwesomeIcon icon={faTwitter} />
                  </a>
                  <a href="#" className="text-gray-500 hover:text-gray-700 transition-colors">
                    <FontAwesomeIcon icon={faLinkedin} />
                  </a>
                  <a href="#" className="text-gray-500 hover:text-gray-700 transition-colors">
                    <FontAwesomeIcon icon={faInstagram} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      </>
    )}
    </>
  );
}

export default Contact;


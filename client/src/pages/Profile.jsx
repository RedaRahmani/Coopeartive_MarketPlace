import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';
import { updateUserStart, updateUserFailure, updateUserSuccess, deleteUserFailure, deleteUserSuccess, signOutUserStart } from '../redux/user/userSlice';
import { Link } from 'react-router-dom';
import { LeftMenu } from '../components/Userinfo';
import Avatar from '../components/Avatar';
import ImageFrame from '../components/imagefarme';
import Header from '../components/Header';

const Profile = () => {
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          localStorage.setItem('avatar', downloadURL);
          setFormData({ ...formData, avatar: downloadURL });
        });
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
      } else {
        dispatch(updateUserSuccess(data));
        setUpdateSuccess(true);
      }
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch('/api/auth/signout');
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

//   return (
//     <>
//     {currentUser && currentUser.role === 'client' && (
//       <>
//             <LeftMenu />
//             <div className="min-h-screen bg-gray-100 py-4 pl-64"> {/* Reduced top padding */}
//               <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8"> {/* Adjusted padding */}
//                 <div className="bg-white shadow-lg rounded-lg overflow-hidden">
//                   <div className="bg-gradient-to-r from-purple-500 to-indigo-500 px-4 py-5 sm:px-6 flex justify-between items-center">
//                     <h2 className="text-lg leading-6 font-bold text-white">Profile</h2>
//                   </div>
//                   <form onSubmit={handleSubmit} className="px-4 py-5 sm:px-6">
//                     <div className="flex justify-center mb-6">
//                       <input
//                         onChange={(e) => setFile(e.target.files[0])}
//                         type="file"
//                         ref={fileRef}
//                         hidden
//                         accept="image/*"
//                       />
//                       <img
//                         onClick={() => fileRef.current.click()}
//                         src={formData.avatar || currentUser.avatar}
//                         alt="Profile"
//                         className="rounded-full h-24 w-24 object-cover cursor-pointer border-4 border-indigo-500 shadow-lg"
//                       />
//                     </div>
//                     <div className="text-center mb-6">
//                       {fileUploadError ? (
//                         <span className="text-red-700">Error Uploading Image (image must be less than 2MB)</span>
//                       ) : filePerc > 0 && filePerc < 100 ? (
//                         <span className="text-green-700">{`Uploading ${filePerc}%`}</span>
//                       ) : filePerc === 100 ? (
//                         <span className="text-green-700">Successfully uploaded!</span>
//                       ) : (
//                         ''
//                       )}
//                     </div>
//                     <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 mb-6">
//                       <div>
//                         <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
//                           Username
//                         </label>
//                         <input
//                           type="text"
//                           id="firstName"
//                           defaultValue={currentUser.username}
//                           onChange={handleChange}
//                           className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
//                         />
//                       </div>
//                       <div>
//                         <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
//                           Birth
//                         </label>
//                         <input
//                           type="text"
//                           id="lastName"
//                           defaultValue={currentUser.birth}
//                           onChange={handleChange}
//                           className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
//                         />
//                       </div>
//                       <div>
//                         <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//                           Email
//                         </label>
//                         <input
//                           type="email"
//                           id="email"
//                           defaultValue={currentUser.email}
//                           onChange={handleChange}
//                           className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
//                         />
//                       </div>
//                       <div>
//                         <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
//                           Phone number
//                         </label>
//                         <input
//                           type="text"
//                           id="phoneNumber"
//                           defaultValue={currentUser.cooperativeId}
//                           onChange={handleChange}
//                           className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
//                         />
//                       </div>
//                       <div className="sm:col-span-2">
//                         <label htmlFor="address" className="block text-sm font-medium text-gray-700">
//                           Description
//                         </label>
//                         <input
//                           type="text"
//                           id="address"
//                           defaultValue={currentUser.description}
//                           onChange={handleChange}
//                           className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
//                         />
//                       </div>
//                       <div>
//                         <label htmlFor="city" className="block text-sm font-medium text-gray-700">
//                           City
//                         </label>
//                         <input
//                           type="text"
//                           id="city"
//                           defaultValue={currentUser.city}
//                           onChange={handleChange}
//                           className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
//                         />
//                       </div>
//                       <div>
//                         <label htmlFor="country" className="block text-sm font-medium text-gray-700">
//                           Regions
//                         </label>
//                         <select
//                           id="country"
//                           defaultValue={currentUser.country}
//                           onChange={handleChange}
//                           className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
//                         >
//                           <option value="Tanger-Tétouan-Al Hoceïma">Tanger-Tétouan-Al Hoceïma</option>
//                           <option value="Souss-Massa">Souss-Massa</option>
//                           <option value="Rabat-Salé-Kénitra">Rabat-Salé-Kénitra</option>
//                           <option value="Marrakech-Safi">Marrakech-Safi</option>
//                           <option value="Laâyoune-Sakia El Hamra">Laâyoune-Sakia El Hamra</option>
//                           <option value="L'Oriental">L'Oriental</option>
//                           <option value="Guelmim-Oued Noun">Guelmim-Oued Noun</option>
//                           <option value="Fès-Meknès">Fès-Meknès</option>
//                           <option value="Drâa-Tafilalet">Drâa-Tafilalet</option>
//                           <option value="Dakhla-Oued Ed-Dahab">Dakhla-Oued Ed-Dahab</option>
//                           <option value="Casablanca-Settat">Casablanca-Settat</option>
//                           <option value="Béni Mellal-Khénifra">Béni Mellal-Khénifra</option>
//                         </select>
//                       </div>
//                       <div>
//                         <label htmlFor="zip" className="block text-sm font-medium text-gray-700">
//                           ZIP
//                         </label>
//                         <input
//                           type="text"
//                           id="zip"
//                           defaultValue={currentUser.zip}
//                           onChange={handleChange}
//                           className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
//                         />
//                       </div>
//                       <div className="sm:col-span-2">
//                         <div className="flex items-center">
//                           <input
//                             id="defaultAddress"
//                             type="checkbox"
//                             className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
//                           />
//                           <label htmlFor="defaultAddress" className="ml-2 block text-sm text-gray-900">
//                             Make this my default address
//                           </label>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="mt-6 flex justify-end space-x-3">
//                       <button
//                         type="button"
//                         onClick={handleSignOut}
//                         className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300"
//                       >
//                         Sign Out
//                       </button>
//                       <button
//                         type="submit"
//                         disabled={loading}
//                         className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
//                       >
//                         {loading ? 'Loading...' : 'Save'}
//                       </button>
//                     </div>
//                     {updateSuccess && (
//                       <div className="mt-4 text-center text-green-700">Profile updated successfully!</div>
//                     )}
//                   </form>
//                 </div>
//               </div>
//             </div>
//             </>
//           )}
//     </>
//   );
// };
return (
  <>
    {currentUser.role === 'coop' && (
      <>
        <LeftMenu />
        <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-100 py-8 pl-64"> {/* Enhanced background */}
  <div className="max-w-4xl mx-auto py-8 px-6 sm:px-8 lg:px-10"> {/* Adjusted padding */}
    <div className="bg-white shadow-xl rounded-xl overflow-hidden transform transition duration-500 hover:scale-105"> {/* Added hover effect */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-600 px-6 py-8 sm:px-8 flex justify-between items-center">
        <h2 className="text-2xl leading-8 font-bold text-white">Profile</h2> {/* Increased text size */}
      </div>
      <form onSubmit={handleSubmit} className="px-6 py-8 sm:px-8">
        <div className="flex justify-center mb-8">
          <input
            onChange={(e) => setFile(e.target.files[0])}
            type="file"
            ref={fileRef}
            hidden
            accept="image/*"
          />
          <img
            onClick={() => fileRef.current.click()}
            src={formData.avatar || currentUser.avatar}
            alt="Profile"
            className="rounded-full h-28 w-28 object-cover cursor-pointer border-4 border-gray-600 shadow-xl transform transition duration-300 hover:scale-110" 
          />
        </div>
        <div className="text-center mb-8">
          {fileUploadError ? (
            <span className="text-red-600">Error Uploading Image (image must be less than 2MB)</span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className="text-green-600">{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className="text-green-600">Successfully uploaded!</span>
          ) : (
            ''
          )}
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 mb-8">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="firstName"
              defaultValue={currentUser.username}
              onChange={handleChange}
              className="mt-2 block w-full shadow-md sm:text-sm border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-600 transition duration-300"
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
              Birth
            </label>
            <input
              type="text"
              id="lastName"
              defaultValue={currentUser.birth}
              onChange={handleChange}
              className="mt-2 block w-full shadow-md sm:text-sm border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-600 transition duration-300"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              defaultValue={currentUser.email}
              onChange={handleChange}
              className="mt-2 block w-full shadow-md sm:text-sm border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-600 transition duration-300"
            />
          </div>
          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
              Phone number
            </label>
            <input
              type="text"
              id="phoneNumber"
              defaultValue={currentUser.cooperativeId}
              onChange={handleChange}
              className="mt-2 block w-full shadow-md sm:text-sm border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-600 transition duration-300"
            />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <input
              type="text"
              id="address"
              defaultValue={currentUser.description}
              onChange={handleChange}
              className="mt-2 block w-full shadow-md sm:text-sm border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-600 transition duration-300"
            />
          </div>
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700">
              City
            </label>
            <input
              type="text"
              id="city"
              defaultValue={currentUser.city}
              onChange={handleChange}
              className="mt-2 block w-full shadow-md sm:text-sm border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-600 transition duration-300"
            />
          </div>
          <div>
            <label htmlFor="country" className="block text-sm font-medium text-gray-700">
              Regions
            </label>
            <select
              id="country"
              defaultValue={currentUser.country}
              onChange={handleChange}
              className="mt-2 block w-full shadow-md sm:text-sm border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-600 transition duration-300"
            >
              <option value="Tanger-Tétouan-Al Hoceïma">Tanger-Tétouan-Al Hoceïma</option>
              <option value="Souss-Massa">Souss-Massa</option>
              <option value="Rabat-Salé-Kénitra">Rabat-Salé-Kénitra</option>
              <option value="Marrakech-Safi">Marrakech-Safi</option>
              <option value="Laâyoune-Sakia El Hamra">Laâyoune-Sakia El Hamra</option>
              <option value="L'Oriental">L'Oriental</option>
              <option value="Guelmim-Oued Noun">Guelmim-Oued Noun</option>
              <option value="Fès-Meknès">Fès-Meknès</option>
              <option value="Drâa-Tafilalet">Drâa-Tafilalet</option>
              <option value="Dakhla-Oued Ed-Dahab">Dakhla-Oued Ed-Dahab</option>
              <option value="Casablanca-Settat">Casablanca-Settat</option>
              <option value="Béni Mellal-Khénifra">Béni Mellal-Khénifra</option>
            </select>
          </div>
          <div>
            <label htmlFor="zip" className="block text-sm font-medium text-gray-700">
              ZIP
            </label>
            <input
              type="text"
              id="zip"
              defaultValue={currentUser.zip}
              onChange={handleChange}
              className="mt-2 block w-full shadow-md sm:text-sm border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-600 transition duration-300"
            />
          </div>
          <div className="sm:col-span-2">
            <div className="flex items-center">
              <input
                id="defaultAddress"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-2 focus:ring-indigo-600"
              />
              <label htmlFor="defaultAddress" className="ml-2 block text-sm text-gray-900">
                Make this my default address
              </label>
            </div>
          </div>
        </div>
        <div className="mt-8 flex justify-end space-x-4">
          <button
            type="button"
            onClick={handleSignOut}
            className="bg-gray-800 hover:bg-slate-500 text-white font-bold py-2 px-4 rounded-lg shadow-lg transform transition duration-300 hover:scale-105"
          >
            Sign Out
          </button>
          <button
            type="submit"
            disabled={loading}
            className="bg-slate-500 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-lg shadow-lg transform transition duration-300 hover:scale-105"
          >
            {loading ? 'Loading...' : 'Save'}
          </button>
        </div>
        {updateSuccess && (
          <div className="mt-6 text-center text-green-600">Profile updated successfully!</div>
        )}
      </form>
    </div>
  </div>
</div>

      </>
    )}
    
    {currentUser && currentUser.role === 'client' && (
      <>
        <Header />
        <div className="min-h-screen bg-gray-100 flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8">
  <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg overflow-hidden">
    <div className="bg-gradient-to-r from-pink-300 to-blue-200 px-6 py-4 flex justify-between items-center">
      <h2 className="text-2xl font-bold text-white">Profile</h2>
    </div>
    <form onSubmit={handleSubmit} className="p-6 space-y-6">
      <div className="flex justify-center mb-4">
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
        />
        <img
          onClick={() => fileRef.current.click()}
          src={formData.avatar || currentUser.avatar}
          alt="Profile"
          className="rounded-full h-32 w-32 object-cover cursor-pointer border-4 border-indigo-500 shadow-lg"
        />
      </div>
      <div className="text-center mb-4">
        {fileUploadError ? (
          <span className="text-red-600">Error Uploading Image (image must be less than 2MB)</span>
        ) : filePerc > 0 && filePerc < 100 ? (
          <span className="text-green-600">{`Uploading ${filePerc}%`}</span>
        ) : filePerc === 100 ? (
          <span className="text-green-600">Successfully uploaded!</span>
        ) : (
          ''
        )}
      </div>
      <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-6">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
            Username
          </label>
          <input
            type="text"
            id="firstName"
            defaultValue={currentUser.username}
            onChange={handleChange}
            className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
            Birth
          </label>
          <input
            type="text"
            id="lastName"
            defaultValue={currentUser.birth}
            onChange={handleChange}
            className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            defaultValue={currentUser.email}
            onChange={handleChange}
            className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
            Phone number
          </label>
          <input
            type="text"
            id="phoneNumber"
            defaultValue={currentUser.cooperativeId}
            onChange={handleChange}
            className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
       
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700">
            City
          </label>
          <input
            type="text"
            id="city"
            defaultValue={currentUser.city}
            onChange={handleChange}
            className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        
        <div>
          <label htmlFor="zip" className="block text-sm font-medium text-gray-700">
            ZIP
          </label>
          <input
            type="text"
            id="zip"
            defaultValue={currentUser.zip}
            onChange={handleChange}
            className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="sm:col-span-2">
          <div className="flex items-center">
            <input
              id="defaultAddress"
              type="checkbox"
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-2 focus:ring-indigo-500"
            />
            <label htmlFor="defaultAddress" className="ml-2 block text-sm text-gray-900">
              Make this my default address
            </label>
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end space-x-4">
        <button
          type="button"
          onClick={handleSignOut}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md transition duration-300"
        >
          Sign Out
        </button>
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-300"
        >
          {loading ? 'Loading...' : 'Save'}
        </button>
      </div>
      {updateSuccess && (
        <div className="mt-4 text-center text-green-600">Profile updated successfully!</div>
      )}
    </form>
  </div>
</div>

      </>
    )}
  </>
);
    }
export default Profile;

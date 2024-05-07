import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';
import { updateUserStart, updateUserFailure, updateUserSuccess, deleteUserFailure, deleteUserSuccess, deleteUserStart, signOutUserStart } from '../redux/user/userSlice';
import { Link } from 'react-router-dom';
import { LeftMenu } from '../components/Userinfo';
import Avatar from '../components/Avatar';
import ImageFrame from '../components/imagefarme';

const Profile = () => {
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector(state => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showListingsError, setShowListingsError] = useState(false);
  const [userListings, setUserListings] = useState([]);
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

    uploadTask.on('state_changed',
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
      console.log(data);
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

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
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
  };

  const handleListingDelete = async (listingId) => {
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }

      setUserListings(prev => prev.filter((listing) => listing._id !== listingId));

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <LeftMenu />

      <div className='flex '>
      <div className="ml-48 p-8 mr-10">
        <div className="max-w-md bg-gray-100 rounded-lg shadow-md p-8 mb-8">
          <ImageFrame src={currentUser.avatar} alt="User Avatar" cadreSize="700" frameSize="5" frameColor="gray-500" className="mx-auto mb-4" />
          <h2 className="text-2xl font-semibold mb-2">User Description</h2>
          <p>{currentUser.description}</p>
        </div>
        <div className="max-w-md bg-gray-100 rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold mb-4">User Information</h2>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="font-semibold">Username:</span>
              <span>{currentUser.username}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Email:</span>
              <span>{currentUser.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Role:</span>
              <span>{currentUser.role}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Cooperative ID:</span>
              <span>{currentUser.cooperativeId}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Birth:</span>
              <span>{new Date(currentUser.birth).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Created At:</span>
              <span>{new Date(currentUser.createdAt).toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Updated At:</span>
              <span>{new Date(currentUser.updatedAt).toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
      <div className='p-3 max-w-lg mx-auto'>

        {currentUser.role === 'client' && (
          <h1 className='text-xl font-semibold text-center my-7'>Profile</h1>
        )}

        {currentUser.role === 'coop' && (
          <h1 className='text-xl font-semibold text-center my-7'>Cooperative Dashboard</h1>
        )}

        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <input
            onChange={(e) => setFile(e.target.files[0])}
            type="file"
            ref={fileRef}
            hidden
            accept='image/*' />
          <img onClick={() => fileRef.current.click()} src={formData.avatar || currentUser.avatar} alt="Profile" className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2' />
          <p className='text-sm self-center'>
            {fileUploadError ? (
              <span className='text-red-700'>Error Upload Image (image must be less than 2mb)</span>) :
              filePerc > 0 && filePerc < 100 ? (
                <span className='text-green-700'>{`Uploading ${filePerc}%`}</span>
              ) :
                filePerc === 100 ? (
                  <span className='text-green-700'> Successfully uploaded!</span>
                ) : ('')
            }
          </p>
          <input type="text" placeholder='username' id='username' defaultValue={currentUser.username} className='border p-3 rounded-lg' onChange={handleChange} />
          <input type="email" placeholder='email' id='email' defaultValue={currentUser.email} className='border p-3 rounded-lg' onChange={handleChange} />
          <input type="text" placeholder='description' id='description' defaultValue={currentUser.description} className='border p-3 rounded-lg' onChange={handleChange} />
          <input type="password" placeholder='password' id='password' className='border p-3 rounded-lg' onChange={handleChange} />
          <button disabled={loading} className='bg-slate-700 text-white border p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-85'>{loading ? 'Loading...' : 'Update'}</button>
        </form>

        <div className='flex justify-between mt-5'>
          <span onClick={handleDeleteUser} className='text-red-700 cursor-pointer'>Delete account</span>
          <span onClick={handleSignOut} className='text-red-700 cursor-pointer'>Sign out</span>
        </div>

        <p className='text-red-700 mt-5'>{error ? error : ''}</p>
        <p className='text-green-700 mt-5'>{updateSuccess ? 'User is updated successfully!' : ''}</p>
      </div>
      </div>
    </>
  );
};

export default Profile;

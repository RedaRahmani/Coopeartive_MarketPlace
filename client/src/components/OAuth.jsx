// import {GoogleAuthProvider, getAuth, signInWithPopup, FacebookAuthProvider} from '@firebase/auth';
// import { app } from '../firebase';
// import { useDispatch } from 'react-redux';
// import { signInSuccess } from '../redux/user/userSlice';
// import { useNavigate } from 'react-router-dom';

// export default function OAuth() {
//     const dispatch =  useDispatch();
//     const navigate = useNavigate();
//     const handleGoogleClick = async () => {
//         try{
//             const provider = new GoogleAuthProvider();
//             const auth = getAuth(app);

//             const result = await signInWithPopup(auth, provider);
//             console.log('Google Sign-In Result:', result);


//             const res = await fetch('/api/auth/google',{
//                 method: 'POST',
//                 headers: {
//                     'content-Type': 'application/json',
//                 },
//                 body:  JSON.stringify({name: result.user.displayName, email: result.user.email, photo: result.user.photoURL}),
//             })

//             console.log('Response from Server:', res);
//             const data = await res.json()
//             console.log('Data from Server:', data);
//             dispatch(signInSuccess(data));
//             navigate('/')
//         }catch(error){
//             console.log('could not sign in with google' , error);
//         }
//     }
//     const handleFacebookClick = async () => {
//       try{
//           const provider = new FacebookAuthProvider();
//           const auth = getAuth(app);

//           const result = await signInWithPopup(auth, provider);
//           console.log('Facebook Sign-In Result:', result);


//           const res = await fetch('/api/auth/facebook',{
//               method: 'POST',
//               headers: {
//                   'content-Type': 'application/json',
//               },
//               body:  JSON.stringify({name: result.user.displayName, email: result.user.email, photo: result.user.photoURL}),
//           })

//           console.log('Response from Server:', res);
//           const data = await res.json()
//           console.log('Data from Server:', data);
//           dispatch(signInSuccess(data));
//           navigate('/')
//       }catch(error){
//           console.log('could not sign in with google' , error);
//       }
//   }
//   return (
//     <>
//     <button onClick={handleGoogleClick} type='button' className='bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95'>
//       Continue With Google
//     </button>
    
//   </>
//   )
// }

import { GoogleAuthProvider, getAuth, signInWithPopup, FacebookAuthProvider } from '@firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

export default function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOAuthClick = async (provider) => {
    try {
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      const res = await fetch(`/api/auth/${provider.providerId.includes('google') ? 'google' : 'facebook'}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
      const data = await res.json();
      dispatch(signInSuccess(data));
      navigate('/');
    } catch (error) {
      console.error(`Could not sign in with ${provider.providerId.includes('google') ? 'Google' : 'Facebook'}`, error);
    }
  };

  return (
    <div className="flex flex-col space-y-4 mt-4">
      <button
        onClick={() => handleOAuthClick(new GoogleAuthProvider())}
        className="w-full flex items-center justify-center px-4 py-3 text-white bg-red-500 rounded-md shadow-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 transition-transform transform hover:scale-105"
      >
        <svg className="w-6 h-6 mr-2" viewBox="0 0 48 48">
          <path fill="#EA4335" d="M24 9.5c3.29 0 6.27 1.25 8.55 3.27l6.39-6.39C34.93 3.33 29.79 1 24 1 14.51 1 6.53 6.51 2.47 14.26l7.28 5.65C11.73 14.51 17.31 9.5 24 9.5z"/>
          <path fill="#4285F4" d="M46.48 24.77c0-1.84-.17-3.64-.48-5.36H24v10.17h12.7c-.55 2.95-2.18 5.44-4.67 7.14v5.97h7.54c4.41-4.06 6.91-10.06 6.91-17.92z"/>
          <path fill="#FBBC05" d="M9.75 28.91c-1.51-.91-2.86-2.07-3.96-3.45l-7.28 5.64C2.53 37.49 8.49 42.26 15.76 43.86l5.65-7.28c-3.61-1.05-6.74-3.3-8.66-6.32z"/>
          <path fill="#34A853" d="M24 48c6.48 0 11.9-2.17 15.86-5.85l-7.54-7.54c-2.26 1.52-5.04 2.46-8.32 2.46-6.36 0-11.79-4.12-13.74-9.73l-7.28 5.65C6.53 42.49 14.51 48 24 48z"/>
          <path fill="none" d="M0 0h48v48H0z"/>
        </svg>
        Continue with Google
      </button>
      <button
        onClick={() => handleOAuthClick(new FacebookAuthProvider())}
        className="w-full flex items-center justify-center px-4 py-3 text-white bg-blue-600 rounded-md shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-transform transform hover:scale-105"
      >
        <svg className="w-6 h-6 mr-2" viewBox="0 0 48 48">
          <path fill="#3B5998" d="M41.77 0H6.23C2.8 0 0 2.8 0 6.23v35.54C0 45.2 2.8 48 6.23 48H24V29.44h-6.27V22h6.27v-4.95c0-6.22 3.73-9.63 9.46-9.63 2.69 0 5.01.2 5.68.29v6.58h-3.9c-3.06 0-3.65 1.46-3.65 3.6V22h7.25l-1.15 7.44h-6.1V48h11.98C45.2 48 48 45.2 48 41.77V6.23C48 2.8 45.2 0 41.77 0z"/>
        </svg>
        Continue with Facebook
      </button>
    </div>
  );
}


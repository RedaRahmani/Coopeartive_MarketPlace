import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../components/OAuth';

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState('');

  const navigate = useNavigate();
  const handleChange = (e) => {
    if (e.target.id === 'role') {
      setSelectedRole(e.target.value);
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    } else {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }

  };
  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
  try {
    setLoading(true);
    const dataToSend = selectedRole === 'coop' 
      ? { ...formData, role: selectedRole }
      : formData;

    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSend),
    });
    const data = await res.json();
    console.log(data);
    if (data.success === false) {
      setLoading(false);
      setError(data.message);
      return;
    }
    setLoading(false);
    setError(null);
    navigate('/sign-in');
  } catch (error) {
    setLoading(false);
    setError(error.message);
  }
  };
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          type='text'
          placeholder='username'
          className='border p-3 rounded-lg'
          id='username'
          onChange={handleChange}
        />
        <input
          type='email'
          placeholder='email'
          className='border p-3 rounded-lg'
          id='email'
          onChange={handleChange}
        />
        <input
          type='Date'
          placeholder='birth'
          className='border p-3 rounded-lg'
          id='birth'
          onChange={handleChange}
        />
        {/* <input
          type='Number'
          placeholder='how Many employees'
          className='border p-3 rounded-lg'
          id='employes'
          onChange={handleChange}
        />
        <input
          type='String'
          placeholder='Cooperative ID'
          className='border p-3 rounded-lg'
          id='cooperativeId'
          onChange={handleChange}
        /> */}
        {/* <select id='role' value={formData.role} onChange={handleChange} required>
          <option value="">Select Role</option>
          <option value="client">Client</option>
          <option value="coop">Cooperative</option>
        </select> */}
        <select id='role'
        value={selectedRole}
        onChange={handleChange}
        className='border p-3 rounded-lg'
      >
        <option value=''>Select Role</option>
        <option value='client'>Client</option>
        <option value='coop'>Cooperative</option>
      </select>
        {selectedRole === 'coop' && (
        <>
          <input
            type="text"
            placeholder='Cooperative ID'
            id='cooperativeId'
            className='border p-3 rounded-lg'
            onChange={handleChange}
          />
          <input
            type="number"
            placeholder='Number of Employees'
            id='employes'
            className='border p-3 rounded-lg'
            onChange={handleChange}
          />
          <textarea
          type='textarea'
          placeholder='description...'
          className='border p-3 rounded-lg'
          id='description'
          onChange={handleChange}
        />
        </>
      )}
        <input
          type='password'
          placeholder='password'
          className='border p-3 rounded-lg'
          id='password'
          onChange={handleChange}
        />

        <button
          disabled={loading}
          className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
        >
          {loading ? 'Loading...' : 'Sign Up'}
        </button>
        {selectedRole === 'client' && (
        <>
          <OAuth />
        </>
      )}
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Have an account?</p>
        <Link to={'/sign-in'}>
          <span className='text-blue-700'>Sign in</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  );
}
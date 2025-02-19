import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../components/OAuth';
import Header from '../components/Header';

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
    <>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-xl space-y-6 transform transition-transform duration-500 hover:scale-105">
          <h1 className="text-4xl text-center font-semibold text-gray-800">Create Account</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                type="text"
                placeholder="Username"
                className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                id="username"
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                id="email"
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <input
                type="date"
                placeholder="Birth Date"
                className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                id="birth"
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <select
                id="role"
                value={selectedRole}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              >
                <option value="">Select Role</option>
                <option value="client">Client</option>
                <option value="coop">Cooperative</option>
              </select>
            </div>
            {selectedRole === 'coop' && (
              <>
                <div>
                  <input
                    type="text"
                    placeholder="Phone number"
                    id="cooperativeId"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <input
                    type="number"
                    placeholder="Number of Employees"
                    id="employes"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <textarea
                    placeholder="Description..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    id="description"
                    onChange={handleChange}
                    required
                  />
                </div>
              </>
            )}
            {selectedRole === 'client' && (
              <>
              <div>
                  <input
                    type="text"
                    placeholder="Phone Number"
                    id="cooperativeId"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <textarea
                    placeholder="Address..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    id="description"
                    onChange={handleChange}
                    required
                  />
                </div>
              </>
            )}
            <div>
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                id="password"
                onChange={handleChange}
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-3 text-white bg-indigo-600 rounded-md shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 transition-colors duration-300"
            >
              {loading ? 'Loading...' : 'Sign Up'}
            </button>
          </form>
          {selectedRole === 'client' && <OAuth />}
          <div className="flex justify-center mt-6">
            <p className="text-sm text-gray-600">Have an account?</p>
            <Link to="/sign-in" className="text-sm text-indigo-600 hover:underline ml-1">Sign in</Link>
          </div>
          {error && <p className="mt-4 text-sm text-red-500">{error}</p>}
        </div>
      </div>
    </>
  );
}

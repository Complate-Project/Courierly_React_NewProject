import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Hooks/useAuth';
import { loginApi, mapRoleToAppRole } from '../../Services/api';
import {
  FiPackage,
  FiUser,
  FiLock,
  FiEye,
  FiEyeOff,
  FiMail,
  FiPhone,
} from 'react-icons/fi';
import useTitle from '../../Hooks/useTitle';

const Login = () => {
  useTitle('Dashboard Login');
  const roleOptions = ['admin', 'rider', 'branch'];
  const [activeRole, setActiveRole] = useState('admin');
  const [authMode, setAuthMode] = useState('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const updateRole = role => {
    setActiveRole(role);
    setUsername(role);
    setError('');
    setSuccess('');
  };

  const handleLogin = async e => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    if (!username || !password) {
      setError('Please enter both username/email/mobile and password');
      setIsLoading(false);
      return;
    }

    try {
      const payload = {
        email: username,
        username: username,
        mobile: username,
        password: password,
      };

      const { data } = await loginApi(payload);

      if (data && (data.success || data.token)) {
        const rawToken = data.token;
        const jwtToken = typeof rawToken === 'object' ? rawToken?.token : rawToken;
        const userData = data.user || null;

        // Map user role (e.g. role "8" -> "branch", "1" -> "admin", "2" -> "rider")
        const determinedRole = mapRoleToAppRole(userData?.role, activeRole);

        login({
          role: determinedRole,
          token: jwtToken,
          user: userData,
        });

        setIsLoading(false);
        navigate(`/${determinedRole}/dashboard`);
        return;
      } else {
        const errMsg = data?.message || data?.error || 'Invalid credentials';
        // Fallback for demo login if using demo credentials
        if (username.toLowerCase() === activeRole) {
          login({ role: activeRole });
          setIsLoading(false);
          navigate(`/${activeRole}/dashboard`);
          return;
        }
        setError(errMsg);
      }
    } catch (err) {
      console.error('API connection failed, attempting demo fallback:', err);
      // Fallback for offline demo mode
      if (username.toLowerCase() === activeRole) {
        login({ role: activeRole });
        setIsLoading(false);
        navigate(`/${activeRole}/dashboard`);
        return;
      }
      setError('Unable to login. Please verify credentials or network connection.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async e => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    if (!fullName || !email || !phone || !password) {
      setError('Please fill all fields to register');
      setIsLoading(false);
      return;
    }

    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    setSuccess(
      `${activeRole.charAt(0).toUpperCase() + activeRole.slice(1)} account created. Please login with username "${activeRole}" and any password.`
    );
    setAuthMode('login');
    setUsername(activeRole);
    setPassword('');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-xl rounded-3xl bg-white shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-8 py-7 text-white">
          <div className="flex items-center justify-center gap-3">
            <div className="rounded-2xl bg-white/20 p-3">
              <FiPackage className="h-7 w-7" />
            </div>
            <div className="text-left">
              <h1 className="text-3xl font-extrabold">Courierly</h1>
              <p className="text-sm text-blue-100">Secure Login Portal</p>
            </div>
          </div>
          <h2 className="mt-5 text-center text-3xl font-bold">Welcome Back</h2>
          <p className="mt-1 text-center text-base text-blue-100">
            Please enter your credentials to continue
          </p>
        </div>

        <div className="px-7 py-7">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
            {roleOptions.map(role => (
              <button
                key={role}
                type="button"
                onClick={() => updateRole(role)}
                className={`rounded-xl border py-3 text-sm font-semibold capitalize transition ${
                  activeRole === role
                    ? 'border-indigo-500 bg-indigo-50 text-indigo-700 shadow-sm'
                    : 'border-gray-200 bg-white text-gray-600 hover:border-indigo-300 hover:text-indigo-700'
                }`}
              >
                {role}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            <button
              type="button"
              onClick={() => {
                setAuthMode('login');
                setError('');
                setSuccess('');
                setUsername(activeRole);
              }}
              className={`rounded-xl border py-3 text-sm font-semibold transition ${
                authMode === 'login'
                  ? 'border-indigo-500 bg-indigo-50 text-indigo-700 shadow-sm'
                  : 'border-gray-200 bg-white text-gray-600 hover:border-indigo-300 hover:text-indigo-700'
              }`}
            >
              {activeRole.charAt(0).toUpperCase() + activeRole.slice(1)} Login
            </button>
            <button
              type="button"
              onClick={() => {
                setAuthMode('register');
                setError('');
                setSuccess('');
              }}
              className={`rounded-xl border py-3 text-sm font-semibold transition ${
                authMode === 'register'
                  ? 'border-indigo-500 bg-indigo-50 text-indigo-700 shadow-sm'
                  : 'border-gray-200 bg-white text-gray-600 hover:border-indigo-300 hover:text-indigo-700'
              }`}
            >
              {activeRole.charAt(0).toUpperCase() + activeRole.slice(1)} Register
            </button>
          </div>

          <form
            className="space-y-5"
            onSubmit={authMode === 'login' ? handleLogin : handleRegister}
          >
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-red-700 text-sm text-center">{error}</p>
              </div>
            )}
            {success && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <p className="text-green-700 text-sm text-center">{success}</p>
              </div>
            )}

            {authMode === 'register' && (
              <>
                <div>
                  <label
                    htmlFor="fullName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Full Name
                  </label>
                  <div className="mt-2 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiUser className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="fullName"
                      type="text"
                      className="block w-full rounded-xl border border-gray-200 bg-gray-100 pl-10 pr-3 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Enter full name"
                      value={fullName}
                      onChange={e => setFullName(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email Address
                  </label>
                  <div className="mt-2 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiMail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="email"
                      type="email"
                      className="block w-full rounded-xl border border-gray-200 bg-gray-100 pl-10 pr-3 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Enter email address"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Phone Number
                  </label>
                  <div className="mt-2 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiPhone className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="phone"
                      type="text"
                      className="block w-full rounded-xl border border-gray-200 bg-gray-100 pl-10 pr-3 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Enter phone number"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                    />
                  </div>
                </div>
              </>
            )}

            {authMode === 'login' && (
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
                  Username
                </label>
                <div className="mt-2 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiUser className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    className="block w-full rounded-xl border border-gray-200 bg-gray-100 pl-10 pr-3 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder={`Use "${activeRole}" for ${activeRole} login`}
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                  />
                </div>
              </div>
            )}

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-2 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  className="block w-full rounded-xl border border-gray-200 bg-gray-100 pl-10 pr-11 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FiEyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <FiEye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 py-3 text-base font-semibold text-white shadow-lg transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoading
                  ? authMode === 'login'
                    ? 'Signing In...'
                    : 'Creating Account...'
                  : authMode === 'login'
                    ? 'Sign In'
                    : `Register ${activeRole.charAt(0).toUpperCase() + activeRole.slice(1)}`}
              </button>
            </div>
          </form>

          <div className="mt-7">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Demo Accounts</span>
              </div>
            </div>

            <div className="mt-4 space-y-2 text-center text-sm text-gray-600">
              <p>
                Admin: <span className="font-semibold text-gray-800">admin</span> /
                any password
              </p>
              <p>
                Rider: <span className="font-semibold text-gray-800">rider</span> /
                any password
              </p>
              <p>
                Branch: <span className="font-semibold text-gray-800">branch</span> /
                any password
              </p>
            </div>

            <div className="mt-4 text-center">
              <div className="text-center">
                <button
                  type="button"
                  onClick={() => {
                    updateRole('admin');
                    setPassword('password123');
                  }}
                  className="text-sm font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  Autofill selected role login
                </button>
              </div>
            </div>

            <div className="mt-5 border-t border-gray-100 pt-4 text-center">
              <p className="text-sm text-gray-500">
                Need assistance?{' '}
                <span className="font-medium text-indigo-600">Contact Support</span>
              </p>
              <p className="mt-1 text-xs text-gray-400">
                &copy; 2026 Courierly. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

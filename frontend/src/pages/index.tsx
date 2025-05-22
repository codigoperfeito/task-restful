import { useState } from 'react';
import { useRouter } from 'next/router';

const Login = () => {
  const [username, setUsername] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    if (username) {
      localStorage.setItem('username', username);
      router.push('/tasks');
    }
  };

  return (
    <div className="flex min-h-screen dark:bg-gray-400 items-center justify-center px-6 py-12 lg:px-8">
      <div className="w-full max-w-sm">
        <h1 className="mb-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Login</h1>
        <input
          type="text"
          placeholder="Digite seu nome"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="mb-6 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
        />
        <button
          onClick={handleLogin}
          className="w-full cursor-pointer bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
        >
          Entrar
        </button>
      </div>
    </div>
  );
};

export default Login;

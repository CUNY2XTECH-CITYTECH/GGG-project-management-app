import { useState } from "react";
import { useRouter } from "next/router";
import "./globals.css";


export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    // Placeholder basic validation
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }
    //placeholder until API calls/authentication are implemented

    if (email === "user@example.com" && password === "password123") {
      // Redirect to dashboard page upon successful login
      router.push("/dashboard");
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="bg-gradient-to-b from-black via-[#200D42] to-[#A46EDB] text-white py-[72px] sm:py-24 relative overflow-hidden h-screen">
  {/* Background gradient div */}
  <div className="absolute inset-0 z-0"></div>

  <div className="container relative z-10">
    <h1 className="text-4xl sm:text-5xl font-bold text-center mb-8">Login</h1>
    {error && <p className="error text-center text-lg text-red-500">{error}</p>}
    <form onSubmit={handleLogin} className="max-w-md mx-auto">
      <div className="mb-6">
        <label htmlFor="email" className="block text-lg mb-2">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg text-black"
          required
        />
      </div>
      <div className="mb-6">
        <label htmlFor="password" className="block text-lg mb-2">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg text-black"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full py-3 bg-white text-black rounded-lg font-medium"
      >
        Login
      </button>
    </form>
    <div className="flex justify-center mt-8">
    </div>
  </div>
</div>
  );
}
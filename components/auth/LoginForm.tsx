// components/auth/LoginForm.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

const DEMO_CREDENTIALS = {
  email: "demo@example.com",
  password: "demo123",
};

export default function LoginForm() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (!response.ok) throw new Error(data.error);

      await login(data.user);
      router.push("/dashboard");
    } catch (err) {
      setError(err.message || "Login failed");
    }
  };

  const handleDemoLogin = async () => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(DEMO_CREDENTIALS),
      });
      const data = await response.json();

      if (!response.ok) throw new Error(data.error);

      await login(data.user);
      router.push("/dashboard");
    } catch (err) {
      setError(err.message || "Demo login failed");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <div className="mb-4 p-4 bg-purple-50 rounded">
        <p className="text-gray-900">Demo Email: {DEMO_CREDENTIALS.email}</p>
        <p className="text-gray-900">
          Demo Password: {DEMO_CREDENTIALS.password}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <div className="text-red-500">{error}</div>}

        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded text-gray-900 placeholder-gray-500"
          />
        </div>

        <div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border rounded text-gray-900 placeholder-gray-500"
          />
        </div>

        <button
          type="submit"
          className="w-full p-2 bg-purple-600 text-white rounded hover:bg-purple-700"
        >
          Login
        </button>

        <button
          type="button"
          onClick={handleDemoLogin}
          className="w-full p-2 bg-purple-100 text-purple-700 rounded hover:bg-purple-200"
        >
          Try Demo
        </button>
      </form>
    </div>
  );
}

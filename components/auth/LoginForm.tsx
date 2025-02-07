// components/auth/LoginForm.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

const DEMO_CREDENTIALS = {
  name: "Demo User",
  email: "demo@example.com",
};

export default function LoginForm() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(formData.name, formData.email);
      router.push("/dashboard");
    } catch (err) {
      setError("Login failed. Please try again.");
    }
  };

  const handleDemoLogin = async () => {
    try {
      await login(DEMO_CREDENTIALS.name, DEMO_CREDENTIALS.email);
      router.push("/dashboard");
    } catch (err) {
      setError("Demo login failed");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <div className="mb-4 p-4 bg-purple-50 rounded">
        <p className="text-gray-900">Demo Name: {DEMO_CREDENTIALS.name}</p>
        <p className="text-gray-900">Demo Email: {DEMO_CREDENTIALS.email}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <div className="text-red-500">{error}</div>}

        <div>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, name: e.target.value }))
            }
            className="w-full p-2 border rounded text-gray-900 placeholder-gray-500"
            required
          />
        </div>

        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, email: e.target.value }))
            }
            className="w-full p-2 border rounded text-gray-900 placeholder-gray-500"
            required
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

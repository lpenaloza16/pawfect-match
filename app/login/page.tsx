// app/login/page.tsx
import LoginForm from "./components/auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Welcome to Pawfect Match</h1>
          <p className="mt-2 text-gray-600">Please sign in to continue</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}

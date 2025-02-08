// app/login/page.tsx
import LoginForm from "@/components/auth/LoginForm";
import Image from "next/image";

const LoginPage = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Panel - Purple Background */}
      <div className="hidden md:flex md:w-1/2 bg-purple-700 justify-center items-center p-12">
        <div className="max-w-md text-white space-y-6">
          <h1 className="text-4xl font-bold">Pawfect Match</h1>
          <p className="text-purple-100">
            Find your perfect furry companion. Join thousands of happy pet
            owners who found their match.
          </p>
          <div className="relative w-[300px] h-[300px]">
            {" "}
            {/* Added container with fixed dimensions */}
            <Image
              src="/dog-illustration.svg"
              alt="Dog illustration"
              fill
              className="mt-8 object-contain"
              priority
            />
          </div>
        </div>
      </div>
      {/* Right Panel - White Background */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold text-gray-900">Welcome back</h2>
            <p className="mt-2 text-gray-600">Please sign in to your account</p>
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

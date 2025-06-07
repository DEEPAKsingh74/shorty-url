"use client"

import Button from '@/app/components/base/button/Button';
import GoogleButton from '@/app/components/base/button/GoogleButton';
import Divider from '@/app/components/base/divider/Divider';
import Input from '@/app/components/base/input/Input';
import { useLogin } from '@/app/hooks/auth/useLogin';
import { useValidation } from '@/app/hooks/auth/useValidation';
import { loginSchema } from '@/app/lib/validation/login';
import { useUserStore } from '@/state/store/auth.store';
import { LoginData } from '@/types/auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {

  const [loginData, setLoginData] = useState<LoginData>({
    email: "",
    password: ""
  })

  //login validation
  const { validate } = useValidation(loginSchema);
  const { login, isPending } = useLogin();
  const router = useRouter();

  const { login: updateStoreLogin } = useUserStore();

  const handleGoogleLogin = () => {
    // Implement Google login logic
    console.log('Google login clicked');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const result = validate(loginData);

    if (!result.valid) return;

    console.log("Login data: ", loginData);
    login(loginData, {
      onSuccess: (data: any) => {
        if (!data?.data) return;
        const userData = {
          id: data.data.id,
          email: data.data.email,
          name: `${data.data.first_name} ${data.data.last_name}`
        }
        console.log(" inside on success response: ", data);

        updateStoreLogin(userData);

        router.replace("/")
      }
    });

  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <Input
              label="Email address"
              id="email"
              name="email"
              type="email"
              onChange={handleInputChange}
              value={loginData.email}
              autoComplete="email"
              required
              placeholder="you@example.com"
            />

            <Input
              label="Password"
              id="password"
              name="password"
              onChange={handleInputChange}
              value={loginData.password}
              type="password"
              autoComplete="current-password"
              required
              placeholder="••••••••"
            />

            <div className="flex items-center justify-between">
              <div></div>
              <div className="text-sm">
                <Link
                  href="/auth/forgot-password"
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Forgot your password?
                </Link>
              </div>
            </div>

            <div>
              <Button type="submit" variant={isPending ? "ghost" : "primary"} disabled={isPending} fullWidth>
                {
                  isPending ? "loading" : "Sign in"
                }
              </Button>
            </div>
          </form>

          <Divider text="Or continue with" className="my-6" />

          <div className="mt-6">
            <GoogleButton onClick={handleGoogleLogin} />
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don&apos;t have an account?{' '}
              <Link
                href="/auth/signup"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
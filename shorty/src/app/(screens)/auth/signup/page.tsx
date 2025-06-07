"use client"

import Button from '@/app/components/base/button/Button';
import GoogleButton from '@/app/components/base/button/GoogleButton';
import Divider from '@/app/components/base/divider/Divider';
import Input from '@/app/components/base/input/Input';
import { useSignup } from '@/app/hooks/auth/useSignup';
import { useValidation } from '@/app/hooks/auth/useValidation';
import { signupSchema } from '@/app/lib/validation/signup';
import { useUserStore } from '@/state/store/auth.store';
import { SignupData } from '@/types/auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';


export default function SignupPage() {

  const [signupData, setSignupData] = useState<SignupData>({
    full_name: "",
    email: "",
    password: ""
  });
  const [isTermsChecked, setTermsChecked] = useState(false);
  const router = useRouter();

  // validation
  const { validate } = useValidation(signupSchema);

  const { login: updateStoreLogin } = useUserStore();

  const { signup, isPending } = useSignup();

  const handleGoogleLogin = () => {
    // Implement Google login logic
    console.log('Google login clicked');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isTermsChecked) return;

    const result = validate(signupData);

    if (!result.valid) {
      return;
    }

    console.log("Sign up data: ", signupData);

    signup(signupData,
      {
        onSuccess: (data: any) => {
          if (!data?.data) return;
          const userData = {
            id: data.data.id,
            email: data.data.email,
            name: `${data.data.first_name} ${data.data.last_name}`
          }
          console.log(" inside on success response: ", data);

          updateStoreLogin(userData);

          router.replace("/");
        }
      }
    );


  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setSignupData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTermsCheckChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTermsChecked(e.target.checked);
  };




  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create a new account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link
            href="/auth/login"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Sign in
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <Input
              label="Full name"
              id="name"
              value={signupData.full_name}
              onChange={handleInputChange}
              name="full_name"
              type="text"
              autoComplete="name"
              required
              placeholder="John Doe"
            />

            <Input
              label="Email address"
              id="email"
              name="email"
              value={signupData.email}
              onChange={handleInputChange}
              type="email"
              autoComplete="email"
              required
              placeholder="you@example.com"
            />

            <Input
              label="Password"
              id="password"
              value={signupData.password}
              onChange={handleInputChange}
              name="password"
              type="password"
              autoComplete="new-password"
              required
              placeholder="••••••••"
            />

            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                checked={isTermsChecked}
                onChange={handleTermsCheckChange}
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                required
              />

              <label
                htmlFor="terms"
                className="ml-2 block text-sm text-gray-900"
              >
                I agree to the{' '}
                <Link
                  href="/terms"
                  className="text-blue-600 hover:text-blue-500"
                >
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link
                  href="/privacy"
                  className="text-blue-600 hover:text-blue-500"
                >
                  Privacy Policy
                </Link>
              </label>
            </div>

            <div>
              <Button type="submit" variant={isPending ? "ghost" : "primary"} disabled={isPending} fullWidth>
                {
                  isPending ? "loading" : "Create account"
                }
              </Button>
            </div>
          </form>

          <Divider text="Or sign up with" className="my-6" />

          <div className="mt-6">
            <GoogleButton onClick={handleGoogleLogin} />
          </div>
        </div>
      </div>
    </div>
  );
}
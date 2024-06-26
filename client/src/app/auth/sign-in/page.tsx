import SignInForm from '@/components/auth/sign-in';
import Link from 'next/link';

const SignInPage = () => {
  return (
    <div className="h-[calc(100vh-80px)] px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 flex items-center justify-center">
      <div className="flex flex-col gap-7">
        <h1 className="text-2xl font-semibold flex">Sign In</h1>
        <SignInForm />
        <Link href="/auth/sign-up" className="text-sm underline cursor-pointer">
          {"Don't"} have an account?
        </Link>
      </div>
    </div>
  );
};

export default SignInPage;

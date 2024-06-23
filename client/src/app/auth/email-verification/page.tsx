import EmailVerificationForm from '@/components/auth/email-verification/EmailVerificationForm';
import Link from 'next/link';

const EmailVerificationPage = () => {
  return (
    <div className="h-[calc(100vh-80px)] px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 flex items-center justify-center">
      <div className="flex flex-col gap-7">
        <h1 className="text-2xl font-semibold">Verify Your Email</h1>
        <EmailVerificationForm />
        <Link href="/auth/sign-in" className="text-sm underline cursor-pointer">
          Go back to Sign In
        </Link>
      </div>
    </div>
  );
};

export default EmailVerificationPage;

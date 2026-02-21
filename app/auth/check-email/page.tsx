export default function CheckEmailPage() {
  return (
    <div className="max-w-md mx-auto py-20 px-6 text-center">
      <h1 className="text-3xl font-semibold mb-4">Check your email</h1>

      <p className="text-gray-600 mb-6">
        We’ve sent you a confirmation link.  
        Open your inbox and click the button to activate your account.
      </p>

      <div className="p-4 border rounded-lg bg-white shadow">
        <p className="text-gray-700">
          Didn’t receive anything?  
          Check your spam folder or try signing up again.
        </p>
      </div>
    </div>
  );
}

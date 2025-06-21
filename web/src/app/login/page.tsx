export const metadata = {
  title: 'Login',
};

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground font-[family-name:var(--font-geist-sans)] p-4">
      <form className="bg-primary-50 p-8 rounded shadow w-full max-w-sm space-y-4">
        <h1 className="text-2xl font-bold text-center text-primary-700">Login</h1>
        <input
          type="email"
          placeholder="Email"
          className="block w-full border border-primary-300 rounded p-2 focus:outline-none focus:border-primary-500"
        />
        <input
          type="password"
          placeholder="Password"
          className="block w-full border border-primary-300 rounded p-2 focus:outline-none focus:border-primary-500"
        />
        <button type="submit" className="w-full bg-primary-600 text-background py-2 rounded hover:bg-primary-700">
          Login
        </button>
      </form>
    </div>
  );
}

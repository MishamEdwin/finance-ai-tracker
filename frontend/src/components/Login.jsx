import { GoogleLogin } from "@react-oauth/google";

export default function Login({ onLogin }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Finance Tracker</h1>
      <GoogleLogin
        onSuccess={onLogin}   // ✅ correctly pass handler
        onError={() => {
          console.error("Login Failed");
          alert("Google login failed. Please try again.");
        }}
      />
    </div>
  );
}

import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import AuthLeftSection from "../../components/auth-left-Section";
import { forgotPasswordService, loginUser } from "../../services/auth.services"; 
import GoogleAuthButton from "../../components/googleAuthButton";

export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const data = await forgotPasswordService(email);
      if (!data.status) {
        setError(data.message);
        return;
      }
      window.localStorage.setItem('email', email);
      setSuccess("Email sent! Check your inbox for the reset code.");
      setTimeout(() => {
        window.location.href = "/reset-password"; 
      }, 3000);

    } catch (err) {
      console.error("Login error:", err);
      setSuccess("");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      <AuthLeftSection />
      <div className="w-full md:w-2/3 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h1 className="text-2xl font-bold">Forgot your Password?</h1>
            <p className="text-gray-600 mt-2">Input your email and you will get a reset code.</p>
          </div>

          {error && <div className="bg-red-50 text-red-500 p-3 rounded-md mb-4">{error}</div>}
          {success && <div className="bg-red-50 text-green-500 p-3 rounded-md mb-4">{success}</div>}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium">Email Address</label>
              <Input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@domain.com"
                required
              />
            </div>

            <Button type="submit" className="w-full bg-[#0D0D0C] cursor-pointer text-white rounded-3xl hover:bg-[#141414]" disabled={isLoading}>
              {isLoading ? "Submitting..." : "Submit"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

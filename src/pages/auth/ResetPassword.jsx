import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import AuthLeftSection from "../../components/auth-left-Section";
import { ResetPasswordService } from "../../services/auth.services"; 

export default function ResetPassword() {
    const [formData, setFormData] = useState({
        otp: "",
        password: "",
      });
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };


  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
        const email = localStorage.getItem("email");
        if (!email) {
            setError("Otp has expired. Please request for a new one.");
            return;
        }
      const data = await ResetPasswordService(email, formData.otp, formData.password);
      if (!data.status) {
        setError(data.message);
        return;
      }
      setSuccess("Password Successfully updated!");
      setTimeout(() => {
        window.location.href = "/login"; 
      }, 2000);

    } catch (err) {
      console.error("Reset Password error:", err);
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
            <h1 className="text-2xl font-bold">Reset Password</h1>
            <p className="text-gray-600 mt-2">Input otp and new Password to reset password</p>
          </div>

          {error && <div className="bg-red-50 text-red-500 p-3 rounded-md mb-4">{error}</div>}
          {success && <div className="bg-red-50 text-green-500 p-3 rounded-md mb-4">{success}</div>}

          <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            type="text"
            name="otp"
            placeholder="Enter OTP"
            value={formData.otp}
            onChange={(e) => {
                const value = e.target.value;
                if (/^\d*$/.test(value)) { 
                setFormData((prev) => ({ ...prev, otp: value }));
                }
            }}
            maxLength={6}
            />
          <div className="relative">
                <Input
                  id="password"
                  name="password"
                  placeholder="Enter new password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-500" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-500" />
                  )}
                </button>
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

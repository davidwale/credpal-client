import { useState } from "react"
import { Link } from "react-router-dom"
import { Eye, EyeOff } from "lucide-react"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Checkbox } from "../../components/ui/checkbox"
import AuthLeftSection from "../../components/auth-left-Section"
import { RegisterUser } from "../../services/auth.services"
import GoogleAuthButton from "../../components/googleAuthButton"

export default function Register() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  })
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("")

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    if (!agreeToTerms) {
      setError("You must agree to the Terms of Service and Privacy Policy")
      setIsLoading(false)
      return
    }
    
        try {
          const data = await RegisterUser(formData);
          if (!data.status) {
            console.log(data)
            setError(data.message || data.message[0]);
            return;
          }
         
          setSuccess("Registration successful!");
          setTimeout(() => {
            window.location.href = "/login"; 
          }, 2000); 
    
        } catch (err) {
          console.error("Registration error:", err);
          setSuccess("");
        } finally {
          setIsLoading(false);
        }
  }

  return (
    <div className="flex min-h-screen">
      {/* Left side - Dark background with branding */}
      <AuthLeftSection />

      {/* Right side - Registration form */}
      <div className="w-full md:w-2/3 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Create an account</h1>
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-primary hover:underline">
                Login
              </Link>
            </p>
          </div>

          {error && <div className="bg-red-50 text-red-500 p-3 rounded-md mb-4">{error}</div>}
          {success && <div className="bg-red-50 text-green-500 p-3 rounded-md mb-4">{success}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="fullName" className="block text-sm font-medium">
                Full name
              </label>
              <Input
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter full name"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium">
                Email Address
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="email@domain.com"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium">
                Password
              </label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
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
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="agreeToTerms"
                name="agreeToTerms"
                checked={agreeToTerms}
                onCheckedChange={setAgreeToTerms}
              />
              <label htmlFor="agreeToTerms" className="text-sm text-gray-600">
                I agree to BeamMarkets{" "}
                <Link href="#" className="text-primary hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="#" className="text-primary hover:underline">
                  Privacy Policy
                </Link>
              </label>
            </div>

            <Button type="submit" className="w-full bg-[#0D0D0C] cursor-pointer text-white rounded-3xl hover:bg-[#141414]" disabled={isLoading}>
              {isLoading ? "Creating account..." : "Register"}
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t"></span>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">Or sign in with</span>
              </div>
            </div>

           <GoogleAuthButton />
          </form>
        </div>
      </div>
    </div>
  )
}

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Sparkles, Crown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import heroImage from "@/assets/afnan-hero.jpg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  // 🚨 Auto-redirect if already logged in
  useEffect(() => {
    const member = localStorage.getItem("member");
    if (member) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Mock login - replace with Supabase later
    setTimeout(() => {
      if (
        email === "felixsbf@sterlingparfumgroup.com" &&
        password === "AMF22385"
      ) {
        // ✅ Save session
        localStorage.setItem(
          "member",
          JSON.stringify({
            email,
            membership_id: "AMF22385",
          })
        );

        toast({
          title: "Welcome to Armaf Creator Circle",
          description: "Login successful. Redirecting to your dashboard...",
        });

        navigate("/dashboard");
      } else {
        toast({
          variant: "destructive",
          title: "Access Denied",
          description: "Invalid credentials. Contact admin for access.",
        });
      }
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Hero Section */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-hero"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-gradient-hero opacity-80" />
        </div>
        <div className="relative z-10 flex flex-col justify-center px-12 text-white">
          <div className="flex items-center gap-3 mb-8">
            <Crown className="h-12 w-12 text-primary-glow" />
            <h1 className="text-4xl font-bold">Afnan Prestige Circle</h1>
          </div>
          <p className="text-xl mb-4 opacity-90">
            Exclusive membership portal for luxury fragrance connoisseurs
          </p>
          <p className="text-lg opacity-75">
            Access your curated collection, affiliate commissions, and amazing
            benefits
          </p>
        </div>
      </div>

      {/* Right Login Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gradient-elegant">
        <Card className="w-full max-w-md shadow-luxury">
          <CardHeader className="space-y-4 text-center">
            <div className="flex items-center justify-center gap-2 lg:hidden">
              <Crown className="h-8 w-8 text-primary" />
              <h2 className="text-2xl font-bold">Afnan Prestige Circle</h2>
            </div>
            <CardTitle className="text-2xl lg:text-3xl">Member Login</CardTitle>
            <CardDescription>
              Enter your credentials to access your exclusive membership portal
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 animate-spin" />
                    Authenticating...
                  </div>
                ) : (
                  "Access Portal"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;

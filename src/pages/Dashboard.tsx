import { Suspense, lazy } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Crown, Copy, CreditCard, Settings, LogOut, Gift } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// ✅ Lazy load portfolio
const PerfumePortfolio = lazy(() => import("./PerfumePortfolio"));

// Mock data - replace with Supabase queries when connected
const mockMember = {
  id: "1",
  full_name: "Felix Amador",
  email: "felixsbf@sterlingparfumgroup.com",
  membership_id: "APCB22385",
  affiliate_code: "AFF-APCB22385",
  tier: "basic",
  commissions_earned: 0,
  pending_payout: 0,
};

const mockBenefits = [
  "20 signature fragrances curated from Armaf's core collection",
  "Access to 3 replenishments per year at member rates of 23% discount",
  "5% commission on the Member's affiliate access",
  "Priority placement on the seasonal PR calendar",
];

const mockPerfumes = [
  {
    name: "HISTORIC OLMEDA",
    product_url: "https://Armaf.com/products/historic-olmeda",
    image: "https://Armaf.com/cdn/shop/files/Historic-Olmeda-01.jpg?v=1727708625&width=1000",
  },
  {
    name: "GIFT SET 9PM HOMME",
    product_url: "https://Armaf.com/products/gift-set-9pm-homme",
    image: "https://Armaf.com/cdn/shop/files/9PMfront_0f7ea5b3-2265-4c9c-b4c4-084c2fec5879_1.png?v=1729151250&width=1200",
  },
  {
    name: "SUPREMACY NOIR",
    product_url: "https://Armaf.com/products/supremacy-noir",
    image: "https://uk.Armaf.com/cdn/shop/files/SupremacyNoir-Product-01.jpg?v=1728581941&width=1000",
  },
  {
    name: "SUPREMACY SILVER",
    product_url: "https://Armaf.com/products/supremacy-silver",
    image: "https://uk.Armaf.com/cdn/shop/files/SupremacySilver-Product-01.jpg?v=1728581995&width=1000",
  },
  {
    name: "TURATHI ELECTRIC",
    product_url: "https://Armaf.com/products/turathi-electric",
    image: "https://Armaf.com/cdn/shop/files/TurathiElectric.png?v=1744872863&width=1200",
  },
  {
    name: "TURATHI BROWN HOMME",
    product_url: "https://Armaf.com/products/turathi-brown-homme",
    image: "https://Armaf.com/cdn/shop/files/Turathi_Brown-1.png?v=1742203739&width=1200",
  },
  {
    name: "9 PM ELIXIR",
    product_url: "https://uk.Armaf.com/products/9-pm-elixir?pr_prod_strat=jac&pr_rec_id=991765df8&pr_rec_pid=10300830515530&pr_ref_pid=9569721319754&pr_seq=uniform",
    image: "https://uk.Armaf.com/cdn/shop/files/9PM_ELIXIR-1.png?v=1753271109&width=600",
  },
  {
    name: "PATCHOULI ON FIRE",
    product_url: "https://Armaf.com/products/patchouli-on-fire",
    image: "https://Armaf.com/cdn/shop/files/Patchouli-01.jpg?v=1727708579&width=1000",
  },
  {
    name: "OUD RISING",
    product_url: "https://Armaf.com/products/oud-rising",
    image: "https://Armaf.com/cdn/shop/files/OudRisingFront_e9e320b1-415e-4bed-991a-0725916ad465.png?v=1727708879&width=1200",
  },
  {
    name: "TOBACCO RUSH",
    product_url: "https://Armaf.com/products/tobacco-rush",
    image: "https://Armaf.com/cdn/shop/files/Tobacco-01.jpg?v=1727708596&width=1000",
  },
  {
    name: "ORNAMENT POUR HOMME",
    product_url: "https://Armaf.com/products/ornament-pour-homme",
    image: "https://Armaf.com/cdn/shop/files/Ornament-Homme-Product-01.jpg?v=1727708110&width=1000",
  },
  {
    name: "TRIBUTE BLUE",
    product_url: "https://Armaf.com/products/tribute-blue",
    image: "https://Armaf.com/cdn/shop/files/TributeBlue-Product-01.jpg?v=1727708287&width=1000",
  },
];

const Dashboard = () => {
  const { toast } = useToast();

  const copyAffiliateCode = () => {
    navigator.clipboard.writeText(mockMember.affiliate_code);
    toast({
      title: "Copied!",
      description: "Affiliate code copied to clipboard",
    });
  };

  const copyReferralLink = () => {
    const link = `https://Armaf.com/ref/${mockMember.affiliate_code}`;
    navigator.clipboard.writeText(link);
    toast({
      title: "Copied!",
      description: "Referral link copied to clipboard",
    });
  };

  const handleSettings = () => {
    toast({
      title: "Settings",
      description: "Activate to enable your Settings panel!",
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("member");
    sessionStorage.removeItem("member");
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
    setTimeout(() => {
      window.location.href = "/";
    }, 1000);
  };

  const handleCommissionHistory = () => {
    toast({
      title: "Commission History",
      description: "Activate to view your commission history!",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-elegant">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b shadow-card-custom">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <Crown className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold"> Armaf Creator Circle</h1>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" onClick={handleSettings}>
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Welcome, {mockMember.full_name}</h2>
          <div className="flex items-center gap-4">
            <p className="text-muted-foreground">
              Membership ID: <span className="font-mono font-semibold">{mockMember.membership_id}</span>
            </p>
            <Badge variant="secondary" className="bg-gradient-gold text-white">
              <Crown className="h-3 w-3 mr-1" />
              {mockMember.tier.toUpperCase()} TIER
            </Badge>
          </div>
        </div>

        {/* Affiliate Section */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          <Card className="shadow-luxury">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gift className="h-5 w-5 text-primary" />
                Affiliate Program
              </CardTitle>
              <CardDescription>Share your code and earn commissions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Affiliate Code</label>
                <div className="flex items-center gap-2 mt-1">
                  <code className="flex-1 px-3 py-2 bg-muted rounded font-mono text-sm">{mockMember.affiliate_code}</code>
                  <Button size="sm" variant="outline" onClick={copyAffiliateCode}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Referral Link</label>
                <div className="flex items-center gap-2 mt-1">
                  <code className="flex-1 px-3 py-2 bg-muted rounded text-sm truncate">
                    Armaf.com/ref/{mockMember.affiliate_code}
                  </code>
                  <Button size="sm" variant="outline" onClick={copyReferralLink}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Commission Section */}
          <Card className="shadow-luxury">
            <CardHeader>
              <CardTitle>Commission Overview</CardTitle>
              <CardDescription>Track your earnings and payouts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-gradient-gold text-white rounded-lg">
                  <div className="text-2xl font-bold">${mockMember.commissions_earned.toFixed(2)}</div>
                  <div className="text-sm opacity-90">Total Earned</div>
                </div>
                <div className="text-center p-3 bg-muted rounded-lg">
                  <div className="text-2xl font-bold">${mockMember.pending_payout.toFixed(2)}</div>
                  <div className="text-sm text-muted-foreground">Pending</div>
                </div>
              </div>
              <Button className="w-full" variant="outline" onClick={handleCommissionHistory}>
                View Commission History
              </Button>
            </CardContent>
          </Card>

          {/* Prepaid Card Section */}
          <Card className="shadow-luxury">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-primary" />
                Creator Prepaid Card
              </CardTitle>
              <CardDescription>Your Creator prepaid balance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gradient-hero rounded-xl p-6 text-white mb-4">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">Armaf Creator</h3>
                    <p className="text-sm opacity-75">Prepaid Card</p>
                  </div>
                  <Crown className="h-8 w-8 text-primary-glow" />
                </div>
                <div className="relative inline-block">
                  <div className="text-center blur-sm opacity-50 select-none pointer-events-none">
                    <div className="text-3xl font-bold mb-2">$1,000.00</div>
                    <div className="text-sm">{mockMember.membership_id}</div>
                  </div>
                </div>
              </div>
              <div className="text-center text-sm text-muted-foreground">Card Status: Inactive</div>
            </CardContent>
          </Card>
        </div>

        {/* Benefits Section */}
        <Card className="mt-6 shadow-luxury">
          <CardHeader>
            <CardTitle>Membership Benefits</CardTitle>
            <CardDescription>Your {mockMember.tier.toUpperCase()} tier includes these exclusive perks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              {mockBenefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-gradient-elegant rounded-lg">
                  <Crown className="h-5 w-5 text-primary shrink-0" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Perfume Portfolio (Lazy) */}
        <Suspense fallback={<div className="text-center py-6">Loading portfolio...</div>}>
          <PerfumePortfolio perfumes={mockPerfumes} member={mockMember} />
        </Suspense>
      </div>
    </div>
  );
};

export default Dashboard;

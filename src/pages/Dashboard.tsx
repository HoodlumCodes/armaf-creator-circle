import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Crown, Copy, ExternalLink, CreditCard, Settings, LogOut, Gift } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock data - replace with Supabase queries when connected
const mockMember = {
  id: "1",
  full_name: "Oluwaseyi Onaeko",
  email: "oluwaseyi@afnanparfumes.com",
  membership_id: "APCB22385",
  affiliate_code: "AFF-APCB22385",
  tier: "basic",
  commissions_earned: 0,
  pending_payout: 0,
};

const mockBenefits = [
  "12 signature fragrances curated from Afnan's core collection",
  "LED light and tripod mount for content creation", 
  "Access to 3 restocks per year at 40% off",
  "5% commission on the Member's Afnan affiliate link",
  "Placement on the seasonal PR calendar"
];

const mockPerfumes = [
  { name: "9AM", product_url: "https://afnan.com/products/9-am" },
  { name: "His Highness III", product_url: "https://www.afnanperfumesusa.com/products/afnan-iii-his-highness" },
  { name: "Portrait Abstract", product_url: "https://afnan.com/products/portrait-abstract" },
  { name: "Supremacy in Oud", product_url: "https://afnan.com/products/supremacy-in-oud" },
  { name: "Turathi Brown", product_url: "https://afnan.com/products/turathi-brown" },
  { name: "Rare Tiffany", product_url: "https://afnan.com/products/rare-tiffany" },
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
    const link = `https://afnan.com/ref/${mockMember.affiliate_code}`;
    navigator.clipboard.writeText(link);
    toast({
      title: "Copied!",
      description: "Referral link copied to clipboard",
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
              <h1 className="text-2xl font-bold">Prestige Circle</h1>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <Button variant="outline" size="sm">
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
          <h2 className="text-3xl font-bold mb-2">
            Welcome, {mockMember.full_name}
          </h2>
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

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {/* Affiliate Section */}
          <Card className="shadow-luxury">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gift className="h-5 w-5 text-primary" />
                Affiliate Program
              </CardTitle>
              <CardDescription>
                Share your code and earn commissions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Affiliate Code
                </label>
                <div className="flex items-center gap-2 mt-1">
                  <code className="flex-1 px-3 py-2 bg-muted rounded font-mono text-sm">
                    {mockMember.affiliate_code}
                  </code>
                  <Button size="sm" variant="outline" onClick={copyAffiliateCode}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Referral Link
                </label>
                <div className="flex items-center gap-2 mt-1">
                  <code className="flex-1 px-3 py-2 bg-muted rounded text-sm truncate">
                    afnan.com/ref/{mockMember.affiliate_code}
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
              <CardDescription>
                Track your earnings and payouts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-gradient-gold text-white rounded-lg">
                  <div className="text-2xl font-bold">
                    ${mockMember.commissions_earned.toFixed(2)}
                  </div>
                  <div className="text-sm opacity-90">Total Earned</div>
                </div>
                <div className="text-center p-3 bg-muted rounded-lg">
                  <div className="text-2xl font-bold">
                    ${mockMember.pending_payout.toFixed(2)}
                  </div>
                  <div className="text-sm text-muted-foreground">Pending</div>
                </div>
              </div>
              <Button className="w-full" variant="outline">
                View Commission History
              </Button>
            </CardContent>
          </Card>

          {/* Prepaid Card Section */}
          <Card className="shadow-luxury">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-primary" />
                Afnan Prepaid Card
              </CardTitle>
              <CardDescription>
                Your exclusive prepaid balance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gradient-hero rounded-xl p-6 text-white mb-4">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">Afnan Prestige</h3>
                    <p className="text-sm opacity-75">Prepaid Card</p>
                  </div>
                  <Crown className="h-8 w-8 text-primary-glow" />
                </div>
                <div className="text-3xl font-bold mb-2">$1,300.00</div>
                <div className="text-sm opacity-75">
                  {mockMember.membership_id}
                </div>
              </div>
              <div className="text-center text-sm text-muted-foreground">
                Card Status: Inactive
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Benefits Section */}
        <Card className="mt-6 shadow-luxury">
          <CardHeader>
            <CardTitle>Membership Benefits</CardTitle>
            <CardDescription>
              Your {mockMember.tier.toUpperCase()} tier includes these exclusive perks
            </CardDescription>
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

        {/* Perfume Portfolio */}
        <Card className="mt-6 shadow-luxury">
          <CardHeader>
            <CardTitle>Your Fragrance Portfolio</CardTitle>
            <CardDescription>
              Curated collection of {mockPerfumes.length} premium fragrances
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {mockPerfumes.map((perfume, index) => (
                <Card key={index} className="hover:shadow-luxury transition-all duration-300">
                  <CardContent className="p-4">
                    <div className="aspect-square bg-gradient-elegant rounded-lg mb-3 flex items-center justify-center">
                      <Crown className="h-8 w-8 text-primary opacity-50" />
                    </div>
                    <h3 className="font-semibold mb-2">{perfume.name}</h3>
                    <Button size="sm" variant="outline" className="w-full" asChild>
                      <a href={perfume.product_url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View Product
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
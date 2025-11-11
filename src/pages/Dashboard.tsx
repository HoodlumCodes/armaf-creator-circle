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
  membership_id: "AMF22385",
  affiliate_code: "AFF-AMF22385",
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
    name: "CLUB DE NUIT PRIVATE KEY TO MY DREAMS",
    product_url: "https://armaf.com/products/club-de-nuit-private-key-to-my-dreams-100ml?_pos=1&_psq=private&_ss=e&_v=1.0",
    image: "https://armaf.com/cdn/shop/files/image-2023-10-02T104400.330.jpg?v=1739111609&width=1100",
  },
  {
    name: "COOL ACE",
    product_url: "https://armaf.com/products/cool-ace-edp-spr?_pos=1&_psq=cool&_ss=e&_v=1.0",
    image: "https://armaf.com/cdn/shop/files/Untitleddesign_90.png?v=1749676528&width=1100",
  },
  {
    name: "MATCH POINT",
    product_url: "https://armaf.com/products/armaf-match-point?_pos=1&_psq=Match+Po&_ss=e&_v=1.0",
    image: "https://armaf.com/cdn/shop/files/Untitleddesign_92.png?v=1750705120&width=1100",
  },
  {
    name: "CLUB DE NUIT UNTOLD",
    product_url: "https://armaf.com/products/armaf-club-de-nuit-untold?_pos=1&_psq=untold&_ss=e&_v=1.0",
    image: "https://armaf.com/cdn/shop/files/image-2023-05-04T091929.691_a7f76f3e-815b-4295-b8d9-6f89d78f1795.jpg?v=1752061921&width=1100",
  },
  {
    name: "CLUB DE NUIT PRIVATE KEY TO MY LOVE",
    product_url: "https://armaf.com/products/club-de-nuit-private-key-to-my-love-100ml?_pos=3&_psq=private+key&_ss=e&_v=1.0",
    image: "https://armaf.com/cdn/shop/files/60.png?v=1758575805&width=1100",
  },
  {
    name: "BUCEPHALUS NO. IX",
    product_url: "https://armaf.com/products/bucephalus-no-ix?_pos=3&_psq=Bucep&_ss=e&_v=1.0",
    image: "https://armaf.com/cdn/shop/files/BUCEPHALUSNO.IX100ML_ARMAFNICHESERIES_FIF_a9ae31db-538c-44a4-8afc-c5290af8a35e.jpg?v=1739111277&width=1100",
  },
  {
    name: "CLUB DE NUIT MALEKA",
    product_url: "https://armaf.com/products/club-de-nuit-maleka?_pos=1&_psq=Mal&_ss=e&_v=1.0",
    image: "https://armaf.com/cdn/shop/files/CDNMALEKA_900x_678cfb46-d6f1-4ca5-8c50-b3c2b439ce5d.webp?v=1762298770&width=1100",
  },
  {
    name: "BUCEPHALUS NO. X",
    product_url: "https://armaf.com/products/bucephalus-no-x-parfum-uae?_pos=4&_psq=buce&_ss=e&_v=1.0",
    image: "https://armaf.com/cdn/shop/files/BUCEPHALUSNO.X100ML_ARMAFNICHESERIES_FIF_29e7313e-8179-4da3-830e-0c3731523319.jpg?v=1739111276&width=1100",
  },
  {
    name: "ODYSSEY SPECTRA BLUE EDITION",
    product_url: "https://armaf.com/products/odyssey-spectra-blue-edition?_pos=2&_psq=spectra&_ss=e&_v=1.0",
    image: "https://armaf.com/cdn/shop/files/GS-OdysseyLimoni_PhotoGrid.pngDisplayingGS-OdysseyLimoni_PhotoGrid.png._11.png?v=1757027596&width=1100",
  },
  {
    name: "BEACH PARTY",
    product_url: "https://armaf.com/products/beach-party-spr",
    image: "https://armaf.com/cdn/shop/files/armafbeach.png?v=1744396383&width=1100",
  },
  {
    name: "ODYSSEY MARSHMALLOW",
    product_url: "https://armaf.com/products/odyssey-marshmallow?_pos=6&_sid=4631b0f8c&_ss=r",
    image: "https://armaf.com/cdn/shop/files/Untitleddesign-2025-08-30T012944.720.png?v=1756499463&width=1100",
  },
  {
    name: "ISLAND BREEZE",
    product_url: "https://armaf.com/products/island-breeze?_pos=1&_psq=breeze&_ss=e&_v=1.0",
    image: "https://armaf.com/cdn/shop/files/islandbliss_900x_f77557f2-593e-41e6-85fb-8facf61de479.webp?v=1762464766&width=1100",
  },
  {
    name: "PERLE D'OR",
    product_url: "https://armaf.com/products/perle-dor?_pos=1&_psq=Perle&_ss=e&_v=1.0",
    image: "https://armaf.com/cdn/shop/files/Untitleddesign-2025-09-11T040347.556.png?v=1757545447&width=1100",
  },
  {
    name: "SCENTASY NOIR DE PECHE",
    product_url: "https://armaf.com/products/scentasy-noir-de-peche?_pos=1&_sid=38ef15c77&_ss=r",
    image: "https://armaf.com/cdn/shop/files/Scentasy.jpg?v=1761858557&width=1100",
  },
    {
    name: "CLUB DE NUIT PRECIEUX IV",
    product_url: "https://armaf.com/products/club-de-nuit-precieux-iv?_pos=1&_sid=8694018f7&_ss=r",
    image: "https://armaf.com/cdn/shop/files/Untitleddesign-2025-08-29T213634.817.png?v=1756485507&width=1100",
  },
  {
    name: "MISS ARMAF GRANDEUR",
    product_url: "https://armaf.com/products/miss-armaf-grandeur?_pos=4&_psq=Miss&_ss=e&_v=1.0",
    image: "https://armaf.com/cdn/shop/files/Untitled_design_-_2025-09-24T035354.792.png?v=1758668054&width=1100",
  },
    {
    name: "ODYSSEY CANDEE SPECIAL EDITION",
    product_url: "https://armaf.com/products/odyssey-candee-special-edition?_pos=1&_psq=Odyssey+Can&_ss=e&_v=1.0",
    image: "https://armaf.com/cdn/shop/files/armafbeach_11.png?v=1744408386&width=1100",
  },
  {
    name: "MISS ARMAF CHIC",
    product_url: "https://armaf.com/products/miss-armaf-chic?_pos=2&_psq=Miss&_ss=e&_v=1.0",
    image: "https://armaf.com/cdn/shop/files/Chic_900x_851caa25-6ea8-4604-8c57-9fab2a4ca2c4.webp?v=1762471912&width=1100",
  },
    {
    name: "CHECKMATE QUEEN",
    product_url: "https://armaf.com/products/checkmate-queen?_pos=1&_psq=Queen&_ss=e&_v=1.0",
    image: "https://armaf.com/cdn/shop/files/Siteweb-QueenCheckMate-ezgif.com-webp-to-jpg-converter.jpg?v=1759860344&width=1100",
  },
  {
    name: "MISS ARMAF MAGNIFIQ",
    product_url: "https://armaf.com/products/miss-armaf-magnifiq?_pos=5&_psq=Magni&_ss=e&_v=1.0",
    image: "https://armaf.com/cdn/shop/files/Untitled_design_-_2025-09-24T035821.025.png?v=1758668332&width=1100",
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
              <img src="https://armaf.com/cdn/shop/files/logo.png?v=1713847116&width=50"
              alt="Logo" />
              <h1 className="text-2xl font-bold"> Creator Circle</h1>
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

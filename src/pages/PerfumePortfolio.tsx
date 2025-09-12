import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type Perfume = {
  name: string;
  product_url: string;
  image: string;
};

type Props = {
  perfumes: Perfume[];
  member: { membership_id: string };
};

const appendRef = (url: string, ref: string) =>
  url.includes("?") ? `${url}&ref=${encodeURIComponent(ref)}` : `${url}?ref=${encodeURIComponent(ref)}`;

const PerfumePortfolio: React.FC<Props> = ({ perfumes, member }) => {
  const { toast } = useToast();

  const copyAffiliateLink = (link: string) => {
    navigator.clipboard.writeText(link);
    toast({
      title: "Copied!",
      description: "Affiliate link copied to clipboard",
    });
  };

  return (
    <Card className="mt-6 shadow-luxury">
      <CardHeader>
        <CardTitle>Your Fragrance Portfolio</CardTitle>
        <CardDescription>
          Curated collection of {perfumes.length} signature fragrances
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {perfumes.map((perfume, idx) => {
            const affiliateLink = appendRef(perfume.product_url, member.membership_id);

            return (
              <Card key={idx} className="hover:shadow-luxury transition-all duration-300">
                <CardContent className="p-4">
                  <div className="aspect-square bg-muted rounded-lg mb-3 flex items-center justify-center overflow-hidden">
                    <img
                      src={perfume.image}
                      alt={perfume.name}
                      className="object-cover w-full h-full"
                      loading="lazy"
                      decoding="async"
                      width={600}
                      height={600}
                    />
                  </div>

                  <h3 className="font-semibold mb-2 text-lg">{perfume.name}</h3>

                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      readOnly
                      className="w-full px-2 py-1 text-sm border rounded bg-muted"
                      value={affiliateLink}
                    />
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => copyAffiliateLink(affiliateLink)}
                      title="Copy affiliate link"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="mt-3 flex justify-end">
                    <a
                      href={affiliateLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm underline"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Buy
                    </a>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default PerfumePortfolio;

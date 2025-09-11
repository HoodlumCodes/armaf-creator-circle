import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Crown, Plus, Edit, Trash2, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock data - replace with Supabase queries when connected
const mockMembers = [
  {
    id: "1",
    full_name: "Oluwaseyi Onaeko",
    email: "oluwaseyi@afnanparfumes.com",
    membership_id: "APCB22385",
    tier: "basic",
    created_at: "2024-01-15",
  },
];

const AdminDashboard = () => {
  const [newMember, setNewMember] = useState({
    full_name: "",
    email: "",
    password: "",
    tier: "basic",
  });
  const { toast } = useToast();

  const generateMembershipId = () => {
    return "APCB" + Math.floor(10000 + Math.random() * 90000);
  };

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    const membershipId = generateMembershipId();
    
    // Mock add member - replace with Supabase mutation when connected
    toast({
      title: "Member Added",
      description: `${newMember.full_name} has been added with ID: ${membershipId}`,
    });

    // Reset form
    setNewMember({
      full_name: "",
      email: "",
      password: "",
      tier: "basic",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-elegant">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b shadow-card-custom">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <Shield className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            </div>
            <Badge variant="secondary" className="bg-gradient-gold text-white">
              <Crown className="h-3 w-3 mr-1" />
              ADMIN ACCESS
            </Badge>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid gap-6 xl:grid-cols-3">
          {/* Add Member Form */}
          <Card className="xl:col-span-1 shadow-luxury">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5 text-primary" />
                Add New Member
              </CardTitle>
              <CardDescription>
                Create a new Prestige Circle member account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddMember} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="full_name">Full Name</Label>
                  <Input
                    id="full_name"
                    value={newMember.full_name}
                    onChange={(e) => setNewMember({...newMember, full_name: e.target.value})}
                    placeholder="Enter member's full name"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newMember.email}
                    onChange={(e) => setNewMember({...newMember, email: e.target.value})}
                    placeholder="member@email.com"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Temporary Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={newMember.password}
                    onChange={(e) => setNewMember({...newMember, password: e.target.value})}
                    placeholder="Generate secure password"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="tier">Membership Tier</Label>
                  <Select value={newMember.tier} onValueChange={(value) => setNewMember({...newMember, tier: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select tier" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="basic">Basic ($1,300)</SelectItem>
                      <SelectItem value="standard">Standard ($3,000)</SelectItem>
                      <SelectItem value="premium">Premium ($6,500)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button type="submit" className="w-full bg-gradient-primary">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Member
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Members Table */}
          <Card className="xl:col-span-2 shadow-luxury">
            <CardHeader>
              <CardTitle>Members Management</CardTitle>
              <CardDescription>
                View and manage all Prestige Circle members
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Membership ID</TableHead>
                      <TableHead>Tier</TableHead>
                      <TableHead>Join Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockMembers.map((member) => (
                      <TableRow key={member.id}>
                        <TableCell className="font-medium">{member.full_name}</TableCell>
                        <TableCell>{member.email}</TableCell>
                        <TableCell>
                          <code className="px-2 py-1 bg-muted rounded text-sm">
                            {member.membership_id}
                          </code>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary" className="bg-gradient-gold text-white">
                            {member.tier.toUpperCase()}
                          </Badge>
                        </TableCell>
                        <TableCell>{member.created_at}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button size="sm" variant="outline">
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Statistics Cards */}
        <div className="grid gap-4 md:grid-cols-4 mt-6">
          <Card className="shadow-luxury">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Members</CardTitle>
              <Crown className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1</div>
              <p className="text-xs text-muted-foreground">
                +1 from last month
              </p>
            </CardContent>
          </Card>
          
          <Card className="shadow-luxury">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Basic</CardTitle>
              <Badge variant="outline">Basic</Badge>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1</div>
              <p className="text-xs text-muted-foreground">
                $1,300 tier
              </p>
            </CardContent>
          </Card>
          
          <Card className="shadow-luxury">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Commissions</CardTitle>
              <Badge variant="outline">$</Badge>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$0</div>
              <p className="text-xs text-muted-foreground">
                Pending payouts
              </p>
            </CardContent>
          </Card>
          
          <Card className="shadow-luxury">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Prepaid Cards</CardTitle>
              <Badge variant="outline">Cards</Badge>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1</div>
              <p className="text-xs text-muted-foreground">
                0 active
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
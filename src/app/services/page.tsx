import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Building2,
  Home,
  ShoppingBag,
  Heart,
  Plane,
  User,
  GraduationCap,
  Package,
  Briefcase,
  Phone,
  Hotel,
  PlayCircle,
  ArrowRight,
  CheckCircle2,
  Video,
  Users,
  TrendingUp,
} from "lucide-react";

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/5" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.03),transparent_50%)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.03),transparent_50%)]" />
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center space-y-8">
            <Badge variant="secondary" className="mb-4">
              Markets We Serve
            </Badge>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
              AI Clones for
              <span className="block bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Every Industry
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              From small businesses to enterprise solutions, our AI video clones transform
              how you engage customers across every market vertical.
            </p>
          </div>
        </div>
      </section>

      {/* Small & Medium Businesses Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center space-y-4 mb-16">
            <Badge variant="outline" className="mb-4">
              Small & Medium Businesses
            </Badge>
            <h2 className="text-4xl sm:text-5xl font-bold">
              Powering SMB Growth
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Help small and medium businesses scale their sales operations with AI-powered video clones
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {/* Real Estate */}
            <Card className="group border-2 hover:border-primary/50 transition-all hover:shadow-lg overflow-hidden">
              <div className="relative aspect-video bg-gradient-to-br from-blue-500/20 to-blue-600/10 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-full h-full flex items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-transparent opacity-50" />
                    <Video className="h-16 w-16 text-blue-500/50 group-hover:text-blue-500 transition-colors" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <PlayCircle className="h-12 w-12 text-white/80 group-hover:scale-110 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4">
                  <Home className="h-6 w-6 text-blue-500" />
                </div>
                <CardTitle>Real Estate</CardTitle>
                <CardDescription>
                  Agents showcasing properties, booking tours, and engaging potential buyers 24/7
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    Property showcases
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    Tour bookings
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    Lead qualification
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* E-commerce */}
            <Card className="group border-2 hover:border-primary/50 transition-all hover:shadow-lg overflow-hidden">
              <div className="relative aspect-video bg-gradient-to-br from-purple-500/20 to-purple-600/10 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-full h-full flex items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 to-transparent opacity-50" />
                    <Video className="h-16 w-16 text-purple-500/50 group-hover:text-purple-500 transition-colors" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <PlayCircle className="h-12 w-12 text-white/80 group-hover:scale-110 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4">
                  <ShoppingBag className="h-6 w-6 text-purple-500" />
                </div>
                <CardTitle>E-commerce</CardTitle>
                <CardDescription>
                  Shopify/WooCommerce stores upselling products and driving conversions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    Product upselling
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    Cart recovery
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    Customer support
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Healthcare */}
            <Card className="group border-2 hover:border-primary/50 transition-all hover:shadow-lg overflow-hidden">
              <div className="relative aspect-video bg-gradient-to-br from-red-500/20 to-red-600/10 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-full h-full flex items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-br from-red-500/30 to-transparent opacity-50" />
                    <Video className="h-16 w-16 text-red-500/50 group-hover:text-red-500 transition-colors" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <PlayCircle className="h-12 w-12 text-white/80 group-hover:scale-110 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-red-500/10 flex items-center justify-center mb-4">
                  <Heart className="h-6 w-6 text-red-500" />
                </div>
                <CardTitle>Healthcare</CardTitle>
                <CardDescription>
                  Clinics promoting services and scheduling appointments seamlessly
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    Service promotion
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    Appointment scheduling
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    Patient education
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Travel */}
            <Card className="group border-2 hover:border-primary/50 transition-all hover:shadow-lg overflow-hidden">
              <div className="relative aspect-video bg-gradient-to-br from-cyan-500/20 to-cyan-600/10 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-full h-full flex items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/30 to-transparent opacity-50" />
                    <Video className="h-16 w-16 text-cyan-500/50 group-hover:text-cyan-500 transition-colors" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <PlayCircle className="h-12 w-12 text-white/80 group-hover:scale-110 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-cyan-500/10 flex items-center justify-center mb-4">
                  <Plane className="h-6 w-6 text-cyan-500" />
                </div>
                <CardTitle>Travel</CardTitle>
                <CardDescription>
                  Agencies pitching packages and handling bookings with personalized service
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    Package pitches
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    Booking management
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    Travel consultations
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Freelancers & Solopreneurs Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center space-y-4 mb-16">
            <Badge variant="outline" className="mb-4">
              Freelancers & Solopreneurs
            </Badge>
            <h2 className="text-4xl sm:text-5xl font-bold">
              Empower Your Solo Business
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Scale your personal brand and automate sales with AI clones that work around the clock
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {/* Coaches/Consultants */}
            <Card className="group border-2 hover:border-primary/50 transition-all hover:shadow-lg overflow-hidden">
              <div className="relative aspect-video bg-gradient-to-br from-green-500/20 to-green-600/10 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-full h-full flex items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-500/30 to-transparent opacity-50" />
                    <Video className="h-16 w-16 text-green-500/50 group-hover:text-green-500 transition-colors" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <PlayCircle className="h-12 w-12 text-white/80 group-hover:scale-110 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-green-500/10 flex items-center justify-center mb-4">
                  <User className="h-6 w-6 text-green-500" />
                </div>
                <CardTitle>Coaches & Consultants</CardTitle>
                <CardDescription>
                  Selling services and booking calls without manual scheduling
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    Service sales
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    Call bookings
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    Client qualification
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Course Creators */}
            <Card className="group border-2 hover:border-primary/50 transition-all hover:shadow-lg overflow-hidden">
              <div className="relative aspect-video bg-gradient-to-br from-orange-500/20 to-orange-600/10 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-full h-full flex items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500/30 to-transparent opacity-50" />
                    <Video className="h-16 w-16 text-orange-500/50 group-hover:text-orange-500 transition-colors" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <PlayCircle className="h-12 w-12 text-white/80 group-hover:scale-110 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-orange-500/10 flex items-center justify-center mb-4">
                  <GraduationCap className="h-6 w-6 text-orange-500" />
                </div>
                <CardTitle>Course Creators</CardTitle>
                <CardDescription>
                  Promoting online courses and bundles with engaging video presentations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    Course promotion
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    Bundle sales
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    Student engagement
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Digital Product Sellers */}
            <Card className="group border-2 hover:border-primary/50 transition-all hover:shadow-lg overflow-hidden">
              <div className="relative aspect-video bg-gradient-to-br from-indigo-500/20 to-indigo-600/10 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-full h-full flex items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/30 to-transparent opacity-50" />
                    <Video className="h-16 w-16 text-indigo-500/50 group-hover:text-indigo-500 transition-colors" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <PlayCircle className="h-12 w-12 text-white/80 group-hover:scale-110 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-indigo-500/10 flex items-center justify-center mb-4">
                  <Package className="h-6 w-6 text-indigo-500" />
                </div>
                <CardTitle>Digital Product Sellers</CardTitle>
                <CardDescription>
                  Explaining value propositions for templates, eBooks, and digital assets
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    Value demonstration
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    Product showcases
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    Instant sales
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Enterprises Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center space-y-4 mb-16">
            <Badge variant="outline" className="mb-4">
              Enterprise Solutions
            </Badge>
            <h2 className="text-4xl sm:text-5xl font-bold">
              Enterprise-Grade AI Sales
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Advanced AI clones for large-scale operations with enterprise integrations and support
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {/* SaaS Companies */}
            <Card className="group border-2 hover:border-primary/50 transition-all hover:shadow-lg overflow-hidden">
              <div className="relative aspect-video bg-gradient-to-br from-violet-500/20 to-violet-600/10 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-full h-full flex items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-br from-violet-500/30 to-transparent opacity-50" />
                    <Video className="h-16 w-16 text-violet-500/50 group-hover:text-violet-500 transition-colors" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <PlayCircle className="h-12 w-12 text-white/80 group-hover:scale-110 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-violet-500/10 flex items-center justify-center mb-4">
                  <Briefcase className="h-6 w-6 text-violet-500" />
                </div>
                <CardTitle>SaaS Companies</CardTitle>
                <CardDescription>
                  Demoing software and capturing leads at scale with personalized interactions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    Product demos
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    Lead capture
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    Enterprise integrations
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Telecom/Insurance */}
            <Card className="group border-2 hover:border-primary/50 transition-all hover:shadow-lg overflow-hidden">
              <div className="relative aspect-video bg-gradient-to-br from-teal-500/20 to-teal-600/10 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-full h-full flex items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-br from-teal-500/30 to-transparent opacity-50" />
                    <Video className="h-16 w-16 text-teal-500/50 group-hover:text-teal-500 transition-colors" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <PlayCircle className="h-12 w-12 text-white/80 group-hover:scale-110 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-teal-500/10 flex items-center justify-center mb-4">
                  <Phone className="h-6 w-6 text-teal-500" />
                </div>
                <CardTitle>Telecom & Insurance</CardTitle>
                <CardDescription>
                  Selling plans and handling inquiries with compliance-ready AI avatars
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    Plan sales
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    Customer inquiries
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    Compliance support
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Hospitality */}
            <Card className="group border-2 hover:border-primary/50 transition-all hover:shadow-lg overflow-hidden">
              <div className="relative aspect-video bg-gradient-to-br from-amber-500/20 to-amber-600/10 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-full h-full flex items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-500/30 to-transparent opacity-50" />
                    <Video className="h-16 w-16 text-amber-500/50 group-hover:text-amber-500 transition-colors" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <PlayCircle className="h-12 w-12 text-white/80 group-hover:scale-110 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-amber-500/10 flex items-center justify-center mb-4">
                  <Hotel className="h-6 w-6 text-amber-500" />
                </div>
                <CardTitle>Hospitality</CardTitle>
                <CardDescription>
                  Upselling amenities and managing bookings with personalized guest experiences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    Amenity upselling
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    Booking management
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    Guest services
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-4 mb-16">
            <Badge variant="outline">Why ReplicloneAI</Badge>
            <h2 className="text-4xl sm:text-5xl font-bold">
              One Platform, Infinite Markets
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our AI clones adapt to your industry, your brand, and your customers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-2 hover:border-primary/50 transition-all">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Industry-Specific</CardTitle>
                <CardDescription>
                  Pre-built templates and workflows tailored to your market vertical
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-all">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Video className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Video-First</CardTitle>
                <CardDescription>
                  Engaging video clones that build trust and drive conversions
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-all">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Proven Results</CardTitle>
                <CardDescription>
                  Increase conversions and reduce response times across all markets
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-muted/30">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-primary/10" />
        <div className="container mx-auto max-w-4xl relative z-10">
          <Card className="border-2 border-primary/20 bg-gradient-to-br from-card to-card/50">
            <CardContent className="p-12 text-center space-y-8">
              <h2 className="text-4xl sm:text-5xl font-bold">
                Ready to Transform Your Market?
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Join businesses across all industries using AI clones to scale their sales
                and engage customers like never before.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="text-lg px-8 py-6">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                  Schedule Demo
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}

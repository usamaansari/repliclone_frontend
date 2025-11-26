import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import {
  Target,
  Eye,
  Users,
  Rocket,
  Code,
  Lightbulb,
  Heart,
  Award,
  Briefcase,
  GraduationCap,
  MapPin,
  Sparkles,
  Building2,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Zap,
  Globe,
  Clock,
  Shield,
  Brain,
  MessageSquare,
  Mic,
  ShoppingCart,
  PlayCircle,
  Settings,
} from "lucide-react";

export default function AboutPage() {
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
              Transform Your Sales
            </Badge>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
              AI Sales Clones
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Create intelligent virtual sales representatives that deliver tailored pitches, engage customers in real-time, 
              and close deals—all without code.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button size="lg" className="text-lg px-8 py-6">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                <PlayCircle className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </div>
            <div className="flex flex-wrap justify-center gap-6 pt-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                No credit card required
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                14-day free trial
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                Setup in minutes
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center space-y-4 mb-16">
            <Badge variant="outline">Features</Badge>
            <h2 className="text-4xl sm:text-5xl font-bold">
              Everything You Need to Scale Sales
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Powerful capabilities designed for businesses of all sizes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Tailored Pitches */}
            <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-lg group">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <MessageSquare className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Tailored Pitches</CardTitle>
                <CardDescription>
                  Deliver personalized product and service pitches using your custom data, descriptions, benefits, and offers.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Real-Time Engagement */}
            <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-lg group">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Mic className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Real-Time Engagement</CardTitle>
                <CardDescription>
                  Engage customers through natural chat or voice conversations with persuasive, context-aware dialogue.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Handle Objections */}
            <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-lg group">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Handle Objections</CardTitle>
                <CardDescription>
                  Intelligently address customer concerns, answer FAQs, and overcome objections with AI-powered responses.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Close Sales */}
            <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-lg group">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <ShoppingCart className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Close Sales</CardTitle>
                <CardDescription>
                  Complete transactions seamlessly with integrated payment gateways, handling the entire sales cycle.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Infinite Scalability */}
            <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-lg group">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Infinite Scalability</CardTitle>
                <CardDescription>
                  Scale from one product to thousands across multiple industries without performance degradation.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* No-Code Interface */}
            <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-lg group">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Code className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>No-Code Interface</CardTitle>
                <CardDescription>
                  Create avatars and sales scripts with an intuitive drag-and-drop interface—no technical skills required.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center space-y-4 mb-16">
            <Badge variant="outline">How It Works</Badge>
            <h2 className="text-4xl sm:text-5xl font-bold">
              Get Started in Minutes
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Three simple steps to launch your AI sales representative
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-lg relative">
              <div className="absolute -top-4 -left-4 h-12 w-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl shadow-lg">
                1
              </div>
              <CardHeader className="pt-8">
                <div className="h-16 w-16 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Sparkles className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-2xl">Create Your Clone</CardTitle>
                <CardDescription className="text-base">
                  Use our no-code builder to design your AI clone's appearance, personality, and voice characteristics.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Step 2 */}
            <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-lg relative">
              <div className="absolute -top-4 -left-4 h-12 w-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl shadow-lg">
                2
              </div>
              <CardHeader className="pt-8">
                <div className="h-16 w-16 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Settings className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-2xl">Build Your Script</CardTitle>
                <CardDescription className="text-base">
                  Define your product data, benefits, offers, and sales scripts through our intuitive interface.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Step 3 */}
            <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-lg relative">
              <div className="absolute -top-4 -left-4 h-12 w-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl shadow-lg">
                3
              </div>
              <CardHeader className="pt-8">
                <div className="h-16 w-16 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Rocket className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-2xl">Launch & Scale</CardTitle>
                <CardDescription className="text-base">
                  Deploy your clone and watch it engage customers, handle sales, and scale infinitely across channels.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center space-y-4 mb-16">
            <Badge variant="outline">Benefits</Badge>
            <h2 className="text-4xl sm:text-5xl font-bold">
              Built for Everyone, Powered for Enterprise
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Whether you're a solo entrepreneur or a large enterprise, ReplicloneAI adapts to your needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-lg">
              <CardHeader>
                <div className="h-14 w-14 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Users className="h-7 w-7 text-primary" />
                </div>
                <CardTitle className="text-2xl">Accessible to All</CardTitle>
                <CardDescription className="text-base">
                  No technical expertise required. Our no-code interface makes it easy for anyone to create professional AI sales clones.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-lg">
              <CardHeader>
                <div className="h-14 w-14 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Building2 className="h-7 w-7 text-primary" />
                </div>
                <CardTitle className="text-2xl">Enterprise Ready</CardTitle>
                <CardDescription className="text-base">
                  Robust integrations, API access, and advanced features for businesses that need more control and customization.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-lg">
              <CardHeader>
                <div className="h-14 w-14 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <TrendingUp className="h-7 w-7 text-primary" />
                </div>
                <CardTitle className="text-2xl">Proven Results</CardTitle>
                <CardDescription className="text-base">
                  Increase conversion rates, reduce response times, and scale your sales operations 24/7 without additional overhead.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Company Story Section with Image */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="space-y-6">
              <Badge variant="outline">Our Journey</Badge>
              <h2 className="text-4xl sm:text-5xl font-bold">
                Transforming Software Development
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                ReplicloneAI was founded with a simple yet powerful vision: to democratize access to enterprise-grade AI Sales Clone. 
                We recognized that traditional software development cycles were too slow, too expensive, and too complex for most businesses.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                By harnessing the power of artificial intelligence and modern low-code/no-code platforms, we've created a revolutionary 
                solution that allows companies to clone, customize, and deploy production-ready AI Sales Clones in minutes instead of months.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our platform collapses development timelines, reduces costs, and empowers businesses of all sizes to access the same 
                sophisticated AI Sales Clone capabilities that were once reserved for large enterprises with massive development budgets.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium">AI-Powered Sales Clone</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium">Rapid Deployment</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium">Enterprise-Grade Solutions</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1200"
                  alt="Team collaboration and innovation"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <Card className="border-2 text-center">
              <CardHeader>
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Rocket className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Minutes</CardTitle>
                <CardDescription>Instead of Months</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 text-center">
              <CardHeader>
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">10x</CardTitle>
                <CardDescription>Faster Development</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 text-center">
              <CardHeader>
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">100+</CardTitle>
                <CardDescription>Businesses Supported</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 text-center">
              <CardHeader>
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Globe className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">50+</CardTitle>
                <CardDescription>Languages</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-4 mb-16">
            <Badge variant="outline">Our Foundation</Badge>
            <h2 className="text-4xl sm:text-5xl font-bold">
              Mission & Vision
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Driving innovation and democratizing access to enterprise-grade software development
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Mission Card */}
            <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-lg relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <CardHeader className="relative z-10">
                <div className="h-14 w-14 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Target className="h-7 w-7 text-primary" />
                </div>
                <CardTitle className="text-2xl">Our Mission</CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <p className="text-muted-foreground leading-relaxed text-lg">
                  To empower companies of all sizes to clone, customize, and deploy production-ready software in minutes instead of months. 
                  We're committed to collapsing development timelines and democratizing access to enterprise-grade applications, enabling 
                  businesses to focus on innovation rather than infrastructure.
                </p>
                <div className="mt-6 space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">
                      Accelerate time-to-market for new applications
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">
                      Reduce development costs by up to 90%
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">
                      Enable non-technical teams to build sophisticated AI Clones
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Vision Card */}
            <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-lg relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <CardHeader className="relative z-10">
                <div className="h-14 w-14 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Eye className="h-7 w-7 text-primary" />
                </div>
                <CardTitle className="text-2xl">Our Vision</CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <p className="text-muted-foreground leading-relaxed text-lg">
                  To become the global standard for AI-powered software replication and deployment. We envision a world where every business, 
                  regardless of size or technical expertise, can access and deploy sophisticated software solutions instantly, transforming 
                  how technology serves humanity.
                </p>
                <div className="mt-6 space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">
                      Global leader in AI-powered Sales Clone development
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">
                      Transform how businesses approach software creation
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">
                      Make enterprise-grade technology accessible to all
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Leadership Team Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center space-y-4 mb-16">
            <Badge variant="outline">Leadership</Badge>
            <h2 className="text-4xl sm:text-5xl font-bold">
              Meet Our Founders
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experienced entrepreneurs and technologists driving innovation in AI-powered software development
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* CEO Card */}
            <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-lg overflow-hidden group">
              <div className="relative h-100 bg-gradient-to-br from-primary/20 to-primary/5">
                <Image
                  src="/Steven.jpeg"
                  alt="Steven Kummer - CEO"
                  fill
                  className="object-cover opacity-100 group-hover:opacity-100 transition-opacity"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <CardHeader>
                <div className="flex items-start gap-4 mb-4">
                  <div className="h-16 w-16 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Briefcase className="h-8 w-8 text-primary" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-2xl mb-1">Steven Kummer</CardTitle>
                    <CardDescription className="text-base font-semibold text-primary">
                      Founder, President & CEO
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  Steve is a battle-tested entrepreneur and sales leader with over 30 years of experience building businesses from the 
                  ground up, closing multimillion-dollar deals, and driving revenue in highly competitive markets across Canada and the U.S.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  A relationship-first closer known for negotiating complex 6- and 7-figure contracts with speed and precision, Steve has 
                  successfully launched and scaled ventures in real estate, consulting, and technology while advising startups and high-net-worth clients.
                </p>
                <div className="pt-4 border-t space-y-3">
                  <div className="flex items-start gap-2">
                    <Award className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">
                      <span className="font-semibold text-foreground">Career Highlights:</span> Flipped 15+ properties, resolved a $35M 
                      litigation that unlocked $7.5M+ in new value, and consistently generated results on 100% performance-based terms.
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Lightbulb className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">
                      <span className="font-semibold text-foreground">Expertise:</span> Modern go-to-market strategies (AI-powered CRMs, 
                      Apollo, HubSpot, automated outreach, and storytelling).
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Heart className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">
                      <span className="font-semibold text-foreground">Personal:</span> Stage 4 cancer survivor, outdoor sports enthusiast, 
                      motivational speaker, and lifelong learner based in Kelowna, British Columbia.
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">
                      <span className="font-semibold text-foreground">Location:</span> Kelowna, British Columbia, Canada
                    </span>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed pt-2">
                  Driven by resilience, big-picture thinking, and a relentless focus on delivering outsized outcomes for customers and partners, 
                  Steve leads Repliclone AI with a vision to empower companies to clone, customize, and deploy production-ready software in 
                  minutes instead of months.
                </p>
              </CardContent>
            </Card>

            {/* CTO Card */}
            <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-lg overflow-hidden group">
              <div className="relative h-100 bg-gradient-to-br from-primary/20 to-primary/5">
                <Image
                  src="/Usama1.jpeg"
                  alt="Usama Ansari - CTO"
                  fill
                  className="object-cover opacity-100 group-hover:opacity-100 transition-opacity"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <CardHeader>
                <div className="flex items-start gap-4 mb-4">
                  <div className="h-16 w-16 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Code className="h-8 w-8 text-primary" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-2xl mb-1">Usama Ansari</CardTitle>
                    <CardDescription className="text-base font-semibold text-primary">
                      Founder & CTO
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  Usama is a seasoned Full-Stack Developer and technology entrepreneur with over 8 years of experience building scalable 
                  web applications, cloud-native systems, and innovative AI-driven solutions.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  A MERN stack expert with deep proficiency in React.js, Node.js, Python, AWS, and modern low-code/no-code platforms, 
                  Usama has delivered complex projects across robotics (4AG Robotics), health-tech (UBC & Amazon collaboration on real-time 
                  IoT vaccine monitoring), media, and ed-tech startups.
                </p>
                <div className="pt-4 border-t space-y-3">
                  <div className="flex items-start gap-2">
                    <GraduationCap className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">
                      <span className="font-semibold text-foreground">Education:</span> Master of Applied Science in Electrical Engineering 
                      from The University of British Columbia and Master of Computer Applications from Jamia Millia Islamia.
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Building2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">
                      <span className="font-semibold text-foreground">Previous Ventures:</span> Co-founded VisualResume, a career-tech platform, 
                      and has led engineering teams in Canada and India.
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Sparkles className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">
                      <span className="font-semibold text-foreground">Passion:</span> Harnessing AI to automate and democratize software creation, 
                      empowering businesses and developers to build production-ready applications in minutes instead of months.
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">
                      <span className="font-semibold text-foreground">Location:</span> Kelowna, British Columbia, Canada
                    </span>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed pt-2">
                  When not coding or building the future of no-code AI, Usama is an active sustainability advocate based in beautiful 
                  Kelowna, British Columbia.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-4 mb-16">
            <Badge variant="outline">What Drives Us</Badge>
            <h2 className="text-4xl sm:text-5xl font-bold">
              Our Core Values
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-lg text-center group">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Rocket className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Innovation</CardTitle>
                <CardDescription>
                  We constantly push the boundaries of what's possible with AI and software development
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Every day, we're exploring new ways to make software development faster, smarter, and more accessible. 
                  Innovation isn't just a buzzword—it's our core mission.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-lg text-center group">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Accessibility</CardTitle>
                <CardDescription>
                  We believe enterprise-grade software should be accessible to businesses of all sizes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Technology should empower everyone, not just those with massive budgets. We're breaking down barriers 
                  and making sophisticated software tools available to all.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-lg text-center group">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Customer Success</CardTitle>
                <CardDescription>
                  We're committed to delivering outsized outcomes and exceptional value for our customers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Your success is our success. We measure our impact by the value we create for our customers, 
                  not just the features we build.
                </p>
              </CardContent>
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
                Ready to Transform Your Sales?
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Join businesses worldwide using ReplicloneAI to create intelligent AI sales clones that engage customers and close deals 24/7.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="text-lg px-8 py-6">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                  <PlayCircle className="mr-2 h-5 w-5" />
                  Watch Demo
                </Button>
              </div>
              <div className="flex flex-wrap justify-center gap-6 pt-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  No credit card required
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  14-day free trial
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  Setup in minutes
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}

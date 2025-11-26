'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import {
  MessageSquare,
  Mic,
  Zap,
  Shield,
  TrendingUp,
  Code,
  CheckCircle2,
  ArrowRight,
  Users,
  ShoppingCart,
  Globe,
  BarChart3,
  PlayCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/5" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.03),transparent_50%)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.03),transparent_50%)]" />
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center space-y-8">
            {/* Hero Image - Clickable to start conversation - Floating at top */}
            <div className="flex justify-center mb-8 animate-float flex-col items-center">
              <h3 className="text-2xl font-bold mb-4 text-primary font-bold text-center text-shadow-lg drop-shadow-lg shadow-primary/20 px-4 py-2 bg-primary/10 rounded-full">AI Clone - Car Sales Agent</h3>
              <Link href="/dashboard" className="group relative">
                <div className="relative w-full min-w-[400px] max-w-[25vw] sm:min-w-[500px] sm:max-w-[30vw] md:max-w-[25vw] lg:min-w-[600px] lg:max-w-[500px] mx-auto rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-primary/20 cursor-pointer">
                  <div className="relative aspect-video bg-gradient-to-br from-primary/10 to-primary/5">
                    <Image
                      src="/hero-avatar.png"
                      alt="Start conversation with AI Avatar"
                      fill
                      className="object-cover"
                      priority
                      sizes="(max-width: 768px) 80vw, (max-width: 1200px) 30vw, 400px"
                      onError={(e) => {
                        // Fallback: hide image if it doesn't exist, show gradient background
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-primary/90 backdrop-blur-sm rounded-full p-4 group-hover:scale-110 transition-transform duration-300">
                        <PlayCircle className="h-12 w-12 text-primary-foreground" />
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-center mt-4 text-muted-foreground group-hover:text-primary transition-colors text-sm">
                  Click to start conversation with AI Clone
                </p>
              </Link>
            </div>
            
            <Badge variant="secondary" className="mb-4">
              AI-Powered Virtual Sales Representatives
            </Badge>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
              Transform Your Sales with
              <span className="block bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                AI Clones
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Create intelligent virtual sales representatives that deliver tailored pitches,
              engage customers in real-time, and close deals—all without code.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Button size="lg" className="text-lg px-8 py-6" onClick={() => router.push('/dashboard')}>
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                <PlayCircle className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </div>
            <div className="pt-8 flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span>14-day free trial</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span>Setup in minutes</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
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
            <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-lg">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <MessageSquare className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Tailored Pitches</CardTitle>
                <CardDescription>
                  Deliver personalized product and service pitches using your custom data,
                  descriptions, benefits, and offers.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-lg">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Mic className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Real-Time Engagement</CardTitle>
                <CardDescription>
                  Engage customers through natural chat or voice conversations with
                  persuasive, context-aware dialogue.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-lg">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Handle Objections</CardTitle>
                <CardDescription>
                  Intelligently address customer concerns, answer FAQs, and overcome
                  objections with AI-powered responses.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-lg">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <ShoppingCart className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Close Sales</CardTitle>
                <CardDescription>
                  Complete transactions seamlessly with integrated payment gateways,
                  handling the entire sales cycle.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-lg">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Infinite Scalability</CardTitle>
                <CardDescription>
                  Scale from one product to thousands across multiple industries
                  without performance degradation.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-lg">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Code className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>No-Code Interface</CardTitle>
                <CardDescription>
                  Create avatars and sales scripts with an intuitive drag-and-drop
                  interface—no technical skills required.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
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
            <div className="text-center space-y-4">
              <div className="relative inline-flex items-center justify-center">
                <div className="absolute h-24 w-24 rounded-full bg-primary/10" />
                <div className="relative h-20 w-20 rounded-full bg-primary flex items-center justify-center text-2xl font-bold text-primary-foreground">
                  1
                </div>
              </div>
              <h3 className="text-2xl font-semibold">Create Your Clone</h3>
              <p className="text-muted-foreground">
                Use our no-code builder to design your AI clone's appearance,
                personality, and voice characteristics.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="relative inline-flex items-center justify-center">
                <div className="absolute h-24 w-24 rounded-full bg-primary/10" />
                <div className="relative h-20 w-20 rounded-full bg-primary flex items-center justify-center text-2xl font-bold text-primary-foreground">
                  2
                </div>
              </div>
              <h3 className="text-2xl font-semibold">Build Your Script</h3>
              <p className="text-muted-foreground">
                Define your product data, benefits, offers, and sales scripts
                through our intuitive interface.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="relative inline-flex items-center justify-center">
                <div className="absolute h-24 w-24 rounded-full bg-primary/10" />
                <div className="relative h-20 w-20 rounded-full bg-primary flex items-center justify-center text-2xl font-bold text-primary-foreground">
                  3
                </div>
              </div>
              <h3 className="text-2xl font-semibold">Launch & Scale</h3>
              <p className="text-muted-foreground">
                Deploy your clone and watch it engage customers, handle sales,
                and scale infinitely across channels.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge variant="outline">Benefits</Badge>
              <h2 className="text-4xl sm:text-5xl font-bold">
                Built for Everyone, Powered for Enterprise
              </h2>
              <p className="text-lg text-muted-foreground">
                Whether you're a solo entrepreneur or a large enterprise,
                ReplicloneAI adapts to your needs.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Accessible to All</h3>
                    <p className="text-muted-foreground">
                      No technical expertise required. Our no-code interface makes
                      it easy for anyone to create professional AI sales clones.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Globe className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Enterprise Ready</h3>
                    <p className="text-muted-foreground">
                      Robust integrations, API access, and advanced features for
                      businesses that need more control and customization.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <BarChart3 className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Proven Results</h3>
                    <p className="text-muted-foreground">
                      Increase conversion rates, reduce response times, and scale
                      your sales operations 24/7 without additional overhead.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 p-8 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <Zap className="h-24 w-24 text-primary mx-auto" />
                  <h3 className="text-2xl font-bold">24/7 Availability</h3>
                  <p className="text-muted-foreground">
                    Your AI sales clone never sleeps, ensuring every
                    customer interaction is handled promptly.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-primary/10" />
        <div className="container mx-auto max-w-4xl relative z-10">
          <Card className="border-2 border-primary/20 bg-gradient-to-br from-card to-card/50">
            <CardContent className="p-12 text-center space-y-8">
              <h2 className="text-4xl sm:text-5xl font-bold">
                Ready to Transform Your Sales?
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Join thousands of businesses using AI clones to scale their sales
                operations and increase revenue.
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

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  CheckCircle2,
  ArrowRight,
  Zap,
  Users,
  Building2,
  Crown,
  Rocket,
  MessageSquare,
  Database,
  Headphones,
  Shield,
  Brain,
  Clock,
  Star,
} from "lucide-react";

export default function PricingPage() {
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
              Scalable Solutions
            </Badge>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
              Transparent Pricing for
              <span className="block bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Every Stage of Growth
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Choose the perfect plan for your business. Start free, scale as you grow,
              or get enterprise-grade solutions with custom pricing.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Cards Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-6">
            {/* Freelancer Plan */}
            <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-lg relative flex flex-col">
              <CardHeader className="pb-8">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Rocket className="h-6 w-6 text-primary" />
                  </div>
                  <Badge variant="outline" className="text-xs">Freelancer</Badge>
                </div>
                <CardTitle className="text-3xl font-bold mb-2">Free</CardTitle>
                <CardDescription className="text-base">
                  For individuals starting their automation journey
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <div className="mb-8">
                  <Button 
                    variant="outline" 
                    className="w-full text-base py-6 hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    Start Building
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
                <div className="space-y-4 flex-1">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">
                      <span className="font-semibold text-foreground">1 AI Sales Clone</span>
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">
                      <span className="font-semibold text-foreground">100 Conversations/mo</span>
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">
                      Basic Lead Capture
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">
                      Community Support
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Business Plan - Popular */}
            <Card className="border-2 border-primary shadow-xl relative flex flex-col scale-105 md:scale-100 lg:scale-105">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <Badge className="bg-primary text-primary-foreground px-4 py-1 flex items-center gap-1">
                  <Star className="h-3 w-3" />
                  Popular
                </Badge>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-lg" />
              <CardHeader className="pb-8 relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-12 w-12 rounded-lg bg-primary flex items-center justify-center">
                    <Zap className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <Badge variant="default" className="text-xs">Business</Badge>
                </div>
                <div className="mb-2">
                  <span className="text-3xl font-bold">$49</span>
                  <span className="text-muted-foreground text-lg">/mo</span>
                </div>
                <CardTitle className="text-xl font-semibold mb-2">Scale Your Sales</CardTitle>
                <CardDescription className="text-base">
                  Scalable solution for growing companies
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col relative z-10">
                <div className="mb-8">
                  <Button 
                    className="w-full text-base py-6 bg-primary hover:bg-primary/90"
                  >
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
                <div className="space-y-4 flex-1">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">
                      <span className="font-semibold text-foreground">5 AI Sales Clones</span>
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">
                      <span className="font-semibold text-foreground">5,000 Conversations/mo</span>
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">
                      CRM Integration
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">
                      Advanced Sales Intelligence
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">
                      Priority Email Support
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Enterprise Plan */}
            <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-lg relative flex flex-col">
              <CardHeader className="pb-8">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Crown className="h-6 w-6 text-primary" />
                  </div>
                  <Badge variant="outline" className="text-xs">Enterprise</Badge>
                </div>
                <CardTitle className="text-3xl font-bold mb-2">Custom</CardTitle>
                <CardDescription className="text-base">
                  Full-scale deployment for large organizations
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <div className="mb-8">
                  <Button 
                    variant="outline" 
                    className="w-full text-base py-6 hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    Contact Sales
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
                <div className="space-y-4 flex-1">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">
                      <span className="font-semibold text-foreground">Unlimited Clones</span>
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">
                      <span className="font-semibold text-foreground">Unlimited Conversations</span>
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">
                      Custom LLM Fine-tuning
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">
                      Dedicated Account Manager
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">
                      SLA & 24/7 Support
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Feature Comparison Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-4 mb-16">
            <Badge variant="outline">All Plans Include</Badge>
            <h2 className="text-4xl sm:text-5xl font-bold">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Core features available across all pricing tiers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-2 hover:border-primary/50 transition-all text-center">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-lg">AI Conversations</CardTitle>
                <CardDescription>
                  Natural language processing for engaging customer interactions
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-all text-center">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Database className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-lg">Lead Management</CardTitle>
                <CardDescription>
                  Capture and organize leads automatically from conversations
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-all text-center">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-lg">Secure & Compliant</CardTitle>
                <CardDescription>
                  Enterprise-grade security with data encryption and privacy controls
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-all text-center">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-lg">24/7 Availability</CardTitle>
                <CardDescription>
                  Your AI avatars work around the clock, never missing an opportunity
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center space-y-4 mb-16">
            <Badge variant="outline">Common Questions</Badge>
            <h2 className="text-4xl sm:text-5xl font-bold">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-6">
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-lg">Can I change plans later?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Yes! You can upgrade or downgrade your plan at any time. Changes take effect
                  immediately, and we'll prorate any charges or credits.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-lg">What happens if I exceed my conversation limit?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We'll notify you when you're approaching your limit. You can upgrade your plan
                  or purchase additional conversations. We never cut off service without warning.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-lg">Is there a setup fee?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  No setup fees for Freelancer and Business plans. Enterprise plans may include
                  implementation services depending on your requirements.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-lg">Do you offer refunds?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We offer a 14-day free trial for all paid plans. If you're not satisfied within
                  the first 30 days of a paid subscription, we'll provide a full refund.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-primary/10" />
        <div className="container mx-auto max-w-4xl relative z-10">
          <Card className="border-2 border-primary/20 bg-gradient-to-br from-card to-card/50">
            <CardContent className="p-12 text-center space-y-8">
              <h2 className="text-4xl sm:text-5xl font-bold">
                Ready to Get Started?
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Start with our free plan and scale as you grow. No credit card required.
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
              <p className="text-sm text-muted-foreground">
                14-day free trial • No credit card required • Cancel anytime
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}

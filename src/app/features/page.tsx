import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  MessageSquare,
  Mic,
  Shield,
  ShoppingCart,
  TrendingUp,
  Code,
  CheckCircle2,
  ArrowRight,
  Users,
  Globe,
  BarChart3,
  PlayCircle,
  Zap,
  Brain,
  Video,
  Settings,
  Database,
  Lock,
  Clock,
  Languages,
  Palette,
  Bot,
  Headphones,
  CreditCard,
  BarChart,
  Webhook,
  FileText,
} from "lucide-react";

export default function FeaturesPage() {
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
              Clone Capabilities
            </Badge>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
              Powerful Features for
              <span className="block bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                AI Sales Clones
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Discover the comprehensive capabilities that make our AI clones the most
              advanced virtual sales representatives in the market.
            </p>
          </div>
        </div>
      </section>

      {/* Core Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center space-y-4 mb-16">
            <Badge variant="outline">Core Capabilities</Badge>
            <h2 className="text-4xl sm:text-5xl font-bold">
              Everything You Need to Scale Sales
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Six powerful features designed to transform your sales operations
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
                  Deliver personalized product and service pitches using your custom data,
                  descriptions, benefits, and offers.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">
                      Dynamic content personalization based on customer data
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">
                      Custom product catalogs and service descriptions
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">
                      Real-time offer generation and discount management
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">
                      Multi-product and bundle recommendations
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Real-Time Engagement */}
            <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-lg group">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Mic className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Real-Time Engagement</CardTitle>
                <CardDescription>
                  Engage customers through natural chat or voice conversations with
                  persuasive, context-aware dialogue.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">
                      Natural language processing for fluid conversations
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">
                      Voice and text interaction modes
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">
                      Context-aware responses that remember conversation history
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">
                      Multi-turn dialogue management
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Handle Objections */}
            <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-lg group">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Handle Objections</CardTitle>
                <CardDescription>
                  Intelligently address customer concerns, answer FAQs, and overcome
                  objections with AI-powered responses.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">
                      Pre-configured objection handling scripts
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">
                      Dynamic FAQ database with instant answers
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">
                      Empathetic responses that build trust
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">
                      Escalation to human agents when needed
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Close Sales */}
            <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-lg group">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <ShoppingCart className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Close Sales</CardTitle>
                <CardDescription>
                  Complete transactions seamlessly with integrated payment gateways,
                  handling the entire sales cycle.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">
                      Integrated payment processing (Stripe, PayPal, etc.)
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">
                      Secure checkout flows within conversations
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">
                      Order confirmation and receipt generation
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">
                      Automated follow-up and upsell opportunities
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Infinite Scalability */}
            <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-lg group">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Infinite Scalability</CardTitle>
                <CardDescription>
                  Scale from one product to thousands across multiple industries
                  without performance degradation.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">
                      Handle unlimited concurrent conversations
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">
                      Multi-product and multi-industry support
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">
                      Auto-scaling infrastructure that grows with you
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">
                      Global CDN for low-latency interactions
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* No-Code Interface */}
            <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-lg group">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Code className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>No-Code Interface</CardTitle>
                <CardDescription>
                  Create avatars and sales scripts with an intuitive drag-and-drop
                  interface—no technical skills required.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">
                      Visual drag-and-drop script builder
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">
                      Pre-built templates for quick setup
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">
                      Real-time preview and testing
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">
                      One-click deployment to production
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Advanced Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center space-y-4 mb-16">
            <Badge variant="outline">Advanced Capabilities</Badge>
            <h2 className="text-4xl sm:text-5xl font-bold">
              Enterprise-Grade Features
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Powerful tools and integrations for businesses that need more
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-lg">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Video className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Video Avatars</CardTitle>
                <CardDescription>
                  Realistic video avatars with natural expressions and gestures
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-lg">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Languages className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Multi-Language</CardTitle>
                <CardDescription>
                  Support for 50+ languages with native pronunciation
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-lg">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Palette className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Custom Branding</CardTitle>
                <CardDescription>
                  Fully customizable avatars that match your brand identity
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-lg">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Brain className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>AI Intelligence</CardTitle>
                <CardDescription>
                  Advanced AI models for natural, context-aware conversations
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-lg">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Database className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Data Integration</CardTitle>
                <CardDescription>
                  Connect with CRM, e-commerce, and marketing platforms
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-lg">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Webhook className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>API Access</CardTitle>
                <CardDescription>
                  Full REST API for custom integrations and automation
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-lg">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <BarChart className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Analytics Dashboard</CardTitle>
                <CardDescription>
                  Real-time insights into conversations, conversions, and performance
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-lg">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Lock className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Enterprise Security</CardTitle>
                <CardDescription>
                  SOC 2 compliant with end-to-end encryption and data privacy
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Avatar Customization Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge variant="outline">Avatar Customization</Badge>
              <h2 className="text-4xl sm:text-5xl font-bold">
                Create Your Perfect Sales Avatar
              </h2>
              <p className="text-lg text-muted-foreground">
                Design an AI avatar that represents your brand and connects with your customers
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Bot className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Appearance & Voice</h3>
                    <p className="text-muted-foreground">
                      Choose from hundreds of avatar designs or upload your own. Customize voice,
                      tone, and speaking style to match your brand personality.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Script Builder</h3>
                    <p className="text-muted-foreground">
                      Build complex sales scripts with conditional logic, branching conversations,
                      and dynamic content insertion using our visual editor.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Settings className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Behavior & Personality</h3>
                    <p className="text-muted-foreground">
                      Configure avatar behavior, response style, and personality traits to create
                      a consistent brand experience across all interactions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 p-8 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="relative inline-block">
                    <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl" />
                    <Video className="h-32 w-32 text-primary mx-auto relative" />
                  </div>
                  <h3 className="text-2xl font-bold">Customizable Avatars</h3>
                  <p className="text-muted-foreground">
                    Design avatars that look, sound, and act exactly how you want
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Integration & Deployment Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-4 mb-16">
            <Badge variant="outline">Deployment & Integration</Badge>
            <h2 className="text-4xl sm:text-5xl font-bold">
              Deploy Anywhere, Integrate Everything
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Embed your AI avatars across all your customer touchpoints
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-2 hover:border-primary/50 transition-all">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Globe className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Website Integration</CardTitle>
                <CardDescription>
                  Embed avatars directly into your website with a simple script tag or React component
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    Widget embed
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    Full-page integration
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    Custom styling
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-all">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Headphones className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Customer Support</CardTitle>
                <CardDescription>
                  Integrate with Zendesk, Intercom, and other support platforms for seamless handoffs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    Support platform sync
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    Ticket creation
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    Human handoff
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-all">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <CreditCard className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>E-commerce Platforms</CardTitle>
                <CardDescription>
                  Native integrations with Shopify, WooCommerce, and major e-commerce platforms
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    Product sync
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    Order management
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    Inventory updates
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Performance & Reliability Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-2 text-center">
              <CardHeader>
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">99.9%</CardTitle>
                <CardDescription>Uptime SLA</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 text-center">
              <CardHeader>
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">&lt;200ms</CardTitle>
                <CardDescription>Response Time</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 text-center">
              <CardHeader>
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">24/7</CardTitle>
                <CardDescription>Availability</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 text-center">
              <CardHeader>
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Globe className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">50+</CardTitle>
                <CardDescription>Languages Supported</CardDescription>
              </CardHeader>
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
                Ready to Experience These Features?
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Start your free trial today and see how AI clones can transform your sales operations.
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
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}

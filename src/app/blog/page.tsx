import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, ArrowRight } from "lucide-react";

const posts = [
  {
    title: "How AI Sales Clones Improve Conversion Rates",
    description:
      "A practical breakdown of how tailored scripts and real-time objection handling help teams close more deals.",
    date: "March 20, 2026",
  },
  {
    title: "Building Your First Repliclone in 30 Minutes",
    description:
      "Step-by-step guidance for creating, training, and launching your first virtual sales representative.",
    date: "March 12, 2026",
  },
  {
    title: "Enterprise Rollout Checklist for AI Sales Agents",
    description:
      "Security, integrations, analytics, and team workflows to review before deploying at scale.",
    date: "March 5, 2026",
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-5xl space-y-6">
          <Badge variant="secondary">Blog</Badge>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">Latest Insights</h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Product updates, implementation guides, and sales automation strategies from the ReplicloneAI team.
          </p>
        </div>
      </section>

      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-5xl grid gap-6">
          {posts.map((post) => (
            <Card key={post.title} className="border-2">
              <CardHeader>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CalendarDays className="h-4 w-4" />
                  <span>{post.date}</span>
                </div>
                <CardTitle className="text-2xl">{post.title}</CardTitle>
                <CardDescription>{post.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <button
                  type="button"
                  className="inline-flex items-center text-sm font-medium text-primary hover:underline"
                >
                  Read article
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}

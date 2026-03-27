import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpenText, Code2, ShieldCheck, Wrench } from "lucide-react";

const docsSections = [
  {
    icon: BookOpenText,
    title: "Getting Started",
    description: "Create your account, set up your first clone, and launch your first conversation flow.",
  },
  {
    icon: Code2,
    title: "API & Integrations",
    description: "Connect ReplicloneAI with your CRM, website, and internal systems using our APIs.",
  },
  {
    icon: Wrench,
    title: "Configuration",
    description: "Customize scripts, pricing logic, escalation rules, and behavior settings for each clone.",
  },
  {
    icon: ShieldCheck,
    title: "Security & Compliance",
    description: "Review our recommended practices for access controls, data retention, and secure deployments.",
  },
];

export default function DocumentationPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-5xl space-y-6">
          <Badge variant="secondary">Documentation</Badge>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">Docs Center</h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Everything you need to build, configure, and operate AI sales clones in production.
          </p>
        </div>
      </section>

      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6">
          {docsSections.map((section) => {
            const Icon = section.icon;
            return (
              <Card key={section.title} className="border-2">
                <CardHeader>
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle>{section.title}</CardTitle>
                  <CardDescription>{section.description}</CardDescription>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  This section is available in the full knowledge base and is being continuously expanded.
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <Footer />
    </div>
  );
}

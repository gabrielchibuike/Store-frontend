import { Truck, ShieldCheck, RefreshCw } from "lucide-react";

const features = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "Free shipping on all orders over $100",
  },
  {
    icon: ShieldCheck,
    title: "Secure Payment",
    description: "100% secure payment methods",
  },
  {
    icon: RefreshCw,
    title: "30 Days Return",
    description: "Simply return it within 30 days for an exchange",
  },
];

export function Features() {
  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-6 rounded-xl border bg-card hover:shadow-lg transition-shadow"
            >
              <div className="p-3 rounded-full bg-primary/10 text-primary">
                <feature.icon className="h-8 w-8" />
              </div>
              <div>
                <h3 className="font-bold text-lg">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

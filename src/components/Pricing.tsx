
import React from 'react';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

const PricingTier = ({ 
  title, 
  price, 
  description, 
  features, 
  isPopular = false, 
  buttonText = "Get Started" 
}) => {
  return (
    <div className={`rounded-2xl bg-white border ${isPopular ? 'border-primary shadow-lg ring-1 ring-primary' : 'border-gray-200'} shadow p-8 relative`}>
      {isPopular && (
        <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
          <div className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
            MOST POPULAR
          </div>
        </div>
      )}
      <div className="mb-5">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-500 mb-4">{description}</p>
        <div className="flex items-baseline">
          <span className="text-3xl font-bold">${price}</span>
          <span className="text-gray-500 ml-1">/month</span>
        </div>
      </div>
      
      <ul className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <div className="flex-shrink-0 text-green-500 mr-2">
              <Check className="h-5 w-5" />
            </div>
            <span className="text-gray-600">{feature}</span>
          </li>
        ))}
      </ul>
      
      <Button 
        variant={isPopular ? "default" : "outline"} 
        className={`w-full ${isPopular ? 'gradient-bg' : ''}`}
      >
        {buttonText}
      </Button>
    </div>
  );
};

const Pricing = () => {
  return (
    <section id="pricing" className="py-16 md:py-24 px-6 bg-gray-50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose the plan that fits your content needs. All plans include a 14-day free trial.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <PricingTier 
            title="Starter" 
            price="29" 
            description="Perfect for content creators just getting started"
            features={[
              "3 social media platforms",
              "10 content repurposes/month",
              "Basic watermark removal",
              "Auto-captions in 1 language",
              "Standard analytics",
              "Email support"
            ]}
          />
          
          <PricingTier 
            title="Professional" 
            price="79" 
            description="For serious creators looking to grow their audience"
            features={[
              "All Starter features",
              "7 social media platforms",
              "50 content repurposes/month",
              "Advanced watermark removal",
              "Auto-captions in 5 languages",
              "Custom branding options",
              "Advanced analytics",
              "Priority support"
            ]}
            isPopular={true}
          />
          
          <PricingTier 
            title="Business" 
            price="199" 
            description="For agencies and teams managing multiple accounts"
            features={[
              "All Professional features",
              "Unlimited social platforms",
              "200 content repurposes/month",
              "Team collaboration (5 members)",
              "Custom workflows",
              "White-label options",
              "Advanced API access",
              "Dedicated account manager"
            ]}
            buttonText="Contact Sales"
          />
        </div>
      </div>
    </section>
  );
};

export default Pricing;

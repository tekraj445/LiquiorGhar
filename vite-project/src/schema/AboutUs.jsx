import React from 'react';
import { Clock, Truck, Shield, Star, Users, Award } from 'lucide-react';

const AboutUs = () => {
  const features = [
    {
      icon: <Clock className="w-10 h-10 text-amber-400" />,
      title: "24/7 Service",
      description: "Round-the-clock delivery service ensuring you never run out at any hour of the day or night."
    },
    {
      icon: <Truck className="w-10 h-10 text-amber-400" />,
      title: "Fast Delivery",
      description: "Swift home delivery within 30-45 minutes to your doorstep across the city."
    },
    {
      icon: <Shield className="w-10 h-10 text-amber-400" />,
      title: "100% Authentic",
      description: "All products are sourced directly from authorized distributors with quality guarantee."
    },
    {
      icon: <Star className="w-10 h-10 text-amber-400" />,
      title: "Premium Selection",
      description: "Wide range of premium liquors, wines, and spirits from around the world."
    }
  ];

  const stats = [
    { icon: <Users className="w-8 h-8" />, value: "5000+", label: "Happy Customers" },
    { icon: <Clock className="w-8 h-8" />, value: "24/7", label: "Always Available" },
    { icon: <Truck className="w-8 h-8" />, value: "30 Min", label: "Avg Delivery Time" },
    { icon: <Award className="w-8 h-8" />, value: "100%", label: "Authentic Products" }
  ];

  return (
    <section id="about" className="fixed inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 overflow-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">About Liquor Ghar</h2>
          <div className="w-24 h-1 bg-amber-400 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Your trusted partner for premium liquor delivery services, operating 24 hours a day to serve you better. 
            We bring quality and convenience right to your doorstep.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-1"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Story Section */}
        <div className="bg-gray-900 text-white rounded-2xl p-8 md:p-12 mb-16">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-4">Our Story</h3>
              <p className="text-gray-300 mb-4">
                Liquor Ghar was founded with a simple mission: to provide convenient, reliable, and fast liquor 
                delivery services to our customers at any time of the day or night.
              </p>
              <p className="text-gray-300 mb-4">
                We understand that celebrations don't follow a schedule, which is why we're committed to being 
                available 24/7, ensuring you never have to compromise on your plans.
              </p>
              <p className="text-gray-300">
                With a carefully curated selection of premium products and a dedicated delivery team, we've 
                become the go-to choice for liquor delivery in the city.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <div key={index} className="bg-amber-400 rounded-xl p-6 text-gray-900 text-center">
                  <div className="flex justify-center mb-2">{stat.icon}</div>
                  <div className="text-3xl font-bold mb-1">{stat.value}</div>
                  <div className="text-sm font-semibold">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="text-center">
          <h3 className="text-3xl font-bold text-gray-900 mb-8">Why Choose Liquor Ghar?</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6">
              <div className="w-16 h-16 bg-amber-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-gray-900" />
              </div>
              <h4 className="text-xl font-bold mb-2">Quality Assured</h4>
              <p className="text-gray-600">Every product is verified and sourced from authorized distributors only.</p>
            </div>
            <div className="p-6">
              <div className="w-16 h-16 bg-amber-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-gray-900" />
              </div>
              <h4 className="text-xl font-bold mb-2">Safe & Secure</h4>
              <p className="text-gray-600">Your privacy and safety are our top priorities with secure packaging.</p>
            </div>
            <div className="p-6">
              <div className="w-16 h-16 bg-amber-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-gray-900" />
              </div>
              <h4 className="text-xl font-bold mb-2">Customer First</h4>
              <p className="text-gray-600">Dedicated customer support team available round the clock for you.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
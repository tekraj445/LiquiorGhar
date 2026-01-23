import React from 'react';
import { Clock, Phone, ArrowRight, MapPin } from 'lucide-react';

const Welcome = () => {
  return (
    <section id="welcome" className="fixed inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 overflow-auto">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <div className="inline-block">
              <span className="bg-amber-400 text-gray-900 px-4 py-2 rounded-full text-sm font-bold inline-flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>Open 24 Hours</span>
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              Premium Liquor 
              <span className="block text-amber-400">Delivered to Your Door</span>
            </h1>

            <p className="text-xl text-gray-300">
              Experience the convenience of 24/7 liquor delivery service. Quality products, fast delivery, 
              and exceptional service - all at your fingertips.
            </p>

            {/* Features List */}
            <div className="space-y-3 pt-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                <span className="text-gray-300">Wide selection of premium brands</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                <span className="text-gray-300">Delivery within 30-45 minutes</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                <span className="text-gray-300">100% authentic products guaranteed</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <button className="bg-amber-400 text-gray-900 px-8 py-4 rounded-lg font-bold hover:bg-amber-500 transition transform hover:scale-105 flex items-center justify-center space-x-2 shadow-lg">
                <Phone className="w-5 h-5" />
                <span>Order Now</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="bg-amber-400 text-gray-900 px-8 py-4 rounded-lg font-bold hover:bg-amber-500 transition transform hover:scale-105 flex items-center justify-center space-x-2 shadow-lg">
                <MapPin className="w-5 h-5" />
                <span>Check Delivery Area</span>
              </button>
              
            </div>
          </div>

          {/* Right Content - Info Cards */}
          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition">
              <Clock className="w-12 h-12 text-amber-400 mb-4" />
              <h3 className="text-2xl font-bold mb-2">24/7 Availability</h3>
              <p className="text-gray-300">
                We're always open to serve you. Late night party or early morning celebration, 
                we've got you covered anytime, anywhere.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition">
              <MapPin className="w-12 h-12 text-amber-400 mb-4" />
              <h3 className="text-2xl font-bold mb-2">Fast Home Delivery</h3>
              <p className="text-gray-300">
                Quick and reliable delivery service ensuring your order reaches you fresh and 
                on time, every single time.
              </p>
            </div>

            <div className="bg-amber-400 text-gray-900 rounded-2xl p-8 shadow-xl">
              <h3 className="text-xl font-bold mb-4">Special Offer!</h3>
              <p className="text-lg mb-2">Get 10% off on your first order</p>
              <p className="text-sm opacity-75">Use code: FIRSTORDER</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
        </svg>
      </div>
    </section>
  );
};

export default Welcome;
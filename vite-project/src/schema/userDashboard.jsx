import React, { useState } from 'react';
import { ShoppingCart, Search, Filter, Heart, Star, Plus, Minus, Truck, Clock, MapPin, User, Menu, X, ChevronDown, Package, TrendingUp } from 'lucide-react';

const UserDashboard = () => {
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState([2, 5]);

  const categories = [
    { id: 'all', name: 'All Products', icon: '🍾' },
    { id: 'whisky', name: 'Whisky', icon: '🥃' },
    { id: 'rum', name: 'Rum', icon: '🍹' },
    { id: 'vodka', name: 'Vodka', icon: '🍸' },
    { id: 'beer', name: 'Beer', icon: '🍺' },
    { id: 'wine', name: 'Wine', icon: '🍷' },
    { id: 'other', name: 'Others', icon: '🥂' }
  ];

  const products = [
    {
      id: 1,
      name: 'Johnnie Walker Black Label',
      category: 'whisky',
      price: 4500,
      image: '🥃',
      rating: 4.8,
      reviews: 245,
      size: '750ml',
      alcohol: '40%',
      description: 'Premium Scotch Whisky with rich smoky flavor',
      inStock: true,
      popular: true
    },
    {
      id: 2,
      name: 'Bacardi White Rum',
      category: 'rum',
      price: 1200,
      image: '🍹',
      rating: 4.5,
      reviews: 189,
      size: '750ml',
      alcohol: '37.5%',
      description: 'Light and smooth white rum perfect for cocktails',
      inStock: true,
      popular: true
    },
    {
      id: 3,
      name: 'Absolut Vodka',
      category: 'vodka',
      price: 2800,
      image: '🍸',
      rating: 4.7,
      reviews: 312,
      size: '1L',
      alcohol: '40%',
      description: 'Premium Swedish vodka with pure taste',
      inStock: true,
      popular: false
    },
    {
      id: 4,
      name: 'Heineken Beer Pack',
      category: 'beer',
      price: 850,
      image: '🍺',
      rating: 4.6,
      reviews: 456,
      size: '6x330ml',
      alcohol: '5%',
      description: 'Premium lager beer pack of 6',
      inStock: true,
      popular: true
    },
    {
      id: 5,
      name: 'Jacob\'s Creek Red Wine',
      category: 'wine',
      price: 2200,
      image: '🍷',
      rating: 4.4,
      reviews: 178,
      size: '750ml',
      alcohol: '13.5%',
      description: 'Classic Australian red wine',
      inStock: true,
      popular: false
    },
    {
      id: 6,
      name: 'Royal Challenge Whisky',
      category: 'whisky',
      price: 1800,
      image: '🥃',
      rating: 4.3,
      reviews: 298,
      size: '750ml',
      alcohol: '42.8%',
      description: 'Indian blended whisky',
      inStock: true,
      popular: false
    },
    {
      id: 7,
      name: 'Captain Morgan Spiced Rum',
      category: 'rum',
      price: 1500,
      image: '🍹',
      rating: 4.6,
      reviews: 223,
      size: '750ml',
      alcohol: '35%',
      description: 'Spiced rum with hints of vanilla and caramel',
      inStock: true,
      popular: false
    },
    {
      id: 8,
      name: 'Grey Goose Vodka',
      category: 'vodka',
      price: 5200,
      image: '🍸',
      rating: 4.9,
      reviews: 167,
      size: '750ml',
      alcohol: '40%',
      description: 'Ultra-premium French vodka',
      inStock: false,
      popular: true
    },
    {
      id: 9,
      name: 'Tuborg Beer Pack',
      category: 'beer',
      price: 720,
      image: '🍺',
      rating: 4.4,
      reviews: 389,
      size: '6x330ml',
      alcohol: '4.8%',
      description: 'Danish beer pack of 6',
      inStock: true,
      popular: false
    },
    {
      id: 10,
      name: 'Sula Shiraz Wine',
      category: 'wine',
      price: 950,
      image: '🍷',
      rating: 4.2,
      reviews: 134,
      size: '750ml',
      alcohol: '13%',
      description: 'Indian red wine with berry notes',
      inStock: true,
      popular: false
    },
    {
      id: 11,
      name: 'Chivas Regal 12 Years',
      category: 'whisky',
      price: 3800,
      image: '🥃',
      rating: 4.7,
      reviews: 201,
      size: '750ml',
      alcohol: '40%',
      description: 'Premium blended Scotch whisky',
      inStock: true,
      popular: true
    },
    {
      id: 12,
      name: 'Old Monk Rum',
      category: 'rum',
      price: 650,
      image: '🍹',
      rating: 4.5,
      reviews: 512,
      size: '750ml',
      alcohol: '42.8%',
      description: 'Classic Indian dark rum',
      inStock: true,
      popular: true
    }
  ];

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const updateQuantity = (productId, change) => {
    setCart(cart.map(item =>
      item.id === productId
        ? { ...item, quantity: Math.max(0, item.quantity + change) }
        : item
    ).filter(item => item.quantity > 0));
  };

  const toggleFavorite = (productId) => {
    if (favorites.includes(productId)) {
      setFavorites(favorites.filter(id => id !== productId));
    } else {
      setFavorites([...favorites, productId]);
    }
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 shadow-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-amber-400 p-2 rounded-lg">
                <ShoppingCart className="w-6 h-6 text-gray-900" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Liquor Ghar</h1>
                <p className="text-xs text-amber-400">24/7 Delivery • 21+ Only</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="hidden md:flex items-center space-x-2 text-gray-400 hover:text-white transition">
                <MapPin className="w-5 h-5" />
                <div className="text-left">
                  <p className="text-xs text-gray-500">Deliver to</p>
                  <p className="text-sm font-medium text-white">Thamel, Kathmandu</p>
                </div>
              </button>
              <button className="relative p-2 bg-amber-400 rounded-lg hover:bg-amber-500 transition" onClick={() => setCartOpen(!cartOpen)}>
                <ShoppingCart className="w-5 h-5 text-gray-900" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold">
                    {cartItemCount}
                  </span>
                )}
              </button>
              <button className="p-2 text-gray-400 hover:text-white transition">
                <User className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-amber-500 to-amber-600 rounded-2xl p-8 mb-8 shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Premium Liquor Delivery</h2>
              <p className="text-amber-100 mb-4">Free delivery on orders above ₹2000 • Delivered in 30 minutes</p>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 bg-white bg-opacity-20 px-4 py-2 rounded-lg">
                  <Clock className="w-5 h-5 text-white" />
                  <span className="text-white font-medium">24/7 Available</span>
                </div>
                <div className="flex items-center space-x-2 bg-white bg-opacity-20 px-4 py-2 rounded-lg">
                  <Truck className="w-5 h-5 text-white" />
                  <span className="text-white font-medium">Fast Delivery</span>
                </div>
              </div>
            </div>
            <div className="hidden lg:block text-8xl">🍾</div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search for whisky, rum, beer..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-gray-800 text-white rounded-xl border border-gray-700 focus:border-amber-400 outline-none transition"
            />
          </div>
          <button className="md:w-auto px-6 py-4 bg-gray-800 text-white rounded-xl border border-gray-700 hover:border-amber-400 transition flex items-center justify-center space-x-2">
            <Filter className="w-5 h-5" />
            <span>Filter</span>
          </button>
        </div>

        {/* Categories */}
        <div className="mb-8 overflow-x-auto">
          <div className="flex space-x-3 pb-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition whitespace-nowrap ${
                  selectedCategory === category.id
                    ? 'bg-amber-400 text-gray-900'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-750'
                }`}
              >
                <span className="text-xl">{category.icon}</span>
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition group">
              {/* Product Image */}
              <div className="relative bg-gradient-to-br from-gray-750 to-gray-800 p-8 flex items-center justify-center h-48">
                <div className="text-7xl group-hover:scale-110 transition">{product.image}</div>
                {product.popular && (
                  <span className="absolute top-3 left-3 bg-amber-400 text-gray-900 text-xs font-bold px-3 py-1 rounded-full flex items-center space-x-1">
                    <TrendingUp className="w-3 h-3" />
                    <span>Popular</span>
                  </span>
                )}
                {!product.inStock && (
                  <div className="absolute inset-0 bg-gray-900 bg-opacity-80 flex items-center justify-center">
                    <span className="text-white font-bold">Out of Stock</span>
                  </div>
                )}
                <button
                  onClick={() => toggleFavorite(product.id)}
                  className="absolute top-3 right-3 p-2 bg-gray-800 bg-opacity-80 rounded-full hover:bg-opacity-100 transition"
                >
                  <Heart
                    className={`w-5 h-5 ${
                      favorites.includes(product.id)
                        ? 'fill-red-500 text-red-500'
                        : 'text-gray-400'
                    }`}
                  />
                </button>
              </div>

              {/* Product Info */}
              <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white mb-1 line-clamp-2">{product.name}</h3>
                    <div className="flex items-center space-x-2 text-sm text-gray-400">
                      <span>{product.size}</span>
                      <span>•</span>
                      <span>{product.alcohol} ABV</span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-400 text-sm mb-3 line-clamp-2">{product.description}</p>

                {/* Rating */}
                <div className="flex items-center space-x-2 mb-4">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span className="text-white font-semibold">{product.rating}</span>
                  </div>
                  <span className="text-gray-500 text-sm">({product.reviews})</span>
                </div>

                {/* Price and Add to Cart */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-amber-400">₹{product.price}</p>
                  </div>
                  {product.inStock && (
                    <button
                      onClick={() => addToCart(product)}
                      className="bg-amber-400 text-gray-900 px-4 py-2 rounded-lg font-semibold hover:bg-amber-500 transition flex items-center space-x-2 active:scale-95"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-white mb-2">No products found</h3>
            <p className="text-gray-400">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* Cart Sidebar */}
      <div className={`fixed top-0 right-0 h-full w-full md:w-96 bg-gray-800 shadow-2xl transform transition-transform duration-300 z-50 ${cartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          {/* Cart Header */}
          <div className="p-6 border-b border-gray-700 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
              <ShoppingCart className="w-6 h-6 text-amber-400" />
              <span>Your Cart</span>
            </h2>
            <button onClick={() => setCartOpen(false)} className="p-2 hover:bg-gray-700 rounded-lg transition">
              <X className="w-6 h-6 text-gray-400" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {cart.length === 0 ? (
              <div className="text-center py-20">
                <ShoppingCart className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">Your cart is empty</h3>
                <p className="text-gray-400 text-sm">Add some items to get started</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="bg-gray-750 rounded-xl p-4">
                    <div className="flex items-start space-x-4">
                      <div className="text-4xl">{item.image}</div>
                      <div className="flex-1">
                        <h4 className="text-white font-semibold mb-1">{item.name}</h4>
                        <p className="text-gray-400 text-sm mb-2">{item.size}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3 bg-gray-800 rounded-lg p-1">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="p-1 hover:bg-gray-700 rounded transition"
                            >
                              <Minus className="w-4 h-4 text-white" />
                            </button>
                            <span className="text-white font-semibold w-8 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="p-1 hover:bg-gray-700 rounded transition"
                            >
                              <Plus className="w-4 h-4 text-white" />
                            </button>
                          </div>
                          <span className="text-amber-400 font-bold">₹{item.price * item.quantity}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Cart Footer */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-gray-700 bg-gray-850">
              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between text-gray-400">
                  <span>Subtotal</span>
                  <span>₹{cartTotal}</span>
                </div>
                <div className="flex items-center justify-between text-gray-400">
                  <span>Delivery Fee</span>
                  <span>{cartTotal >= 2000 ? 'FREE' : '₹50'}</span>
                </div>
                <div className="border-t border-gray-700 pt-3 flex items-center justify-between">
                  <span className="text-white font-bold text-lg">Total</span>
                  <span className="text-amber-400 font-bold text-xl">₹{cartTotal >= 2000 ? cartTotal : cartTotal + 50}</span>
                </div>
              </div>
              <button className="w-full bg-amber-400 text-gray-900 py-4 rounded-xl font-bold hover:bg-amber-500 transition active:scale-95 flex items-center justify-center space-x-2">
                <Package className="w-5 h-5" />
                <span>Proceed to Checkout</span>
              </button>
              {cartTotal < 2000 && (
                <p className="text-center text-amber-400 text-sm mt-3">
                  Add ₹{2000 - cartTotal} more for free delivery!
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Overlay */}
      {cartOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setCartOpen(false)}
        />
      )}
    </div>
  );
};

export default UserDashboard;
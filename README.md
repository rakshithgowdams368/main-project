# 🤖 AI Course Generator - Futuristic Subscription Plans

<div align="center">

![AI Course Generator](https://img.shields.io/badge/AI-Course%20Generator-purple?style=for-the-badge&logo=react)
![React](https://img.shields.io/badge/React-18.2.0-blue?style=for-the-badge&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.3.0-06B6D4?style=for-the-badge&logo=tailwindcss)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**A cutting-edge, futuristic subscription plans page with AI-powered features, Indian tax invoice generation, and seamless WhatsApp integration.**

[🚀 Live Demo](https://your-demo-link.com) • [📱 WhatsApp Support](https://wa.me/919353241308) • [📄 Documentation](#documentation)

</div>

---

## 🌟 **Project Overview**

The AI Course Generator Subscription Plans is a modern, responsive web application built with React and Tailwind CSS. It features a futuristic design with advanced UI/UX elements, complete Indian GST compliance, and seamless WhatsApp integration for customer support and payment processing.

### 🎯 **Key Highlights**
- **🎨 Futuristic Design**: Glassmorphic UI with smooth animations and transitions
- **🌙 Dark/Light Mode**: Persistent theme switching with system preference detection
- **📱 WhatsApp Integration**: Direct redirection to +91 9353241308 for instant support
- **🧾 Indian Tax Invoice**: Complete GST compliance with HSN codes and proper tax structure
- **🚀 Performance Optimized**: Fast loading with smooth animations and transitions
- **📱 Mobile Responsive**: Works flawlessly on all devices and screen sizes

---

## ✨ **Features**

### 🎨 **Advanced UI/UX**
- **Glassmorphic Design**: Modern blur effects and transparency
- **Gradient Animations**: Dynamic background animations with floating orbs
- **Micro-interactions**: Hover effects, scale animations, and smooth transitions
- **Loading States**: Professional loading animations and feedback
- **Responsive Grid**: Adaptive layout for all screen sizes

### 🌙 **Theme System**
- **Dark/Light Toggle**: Instant theme switching with animation
- **Persistent Storage**: Theme preference saved to localStorage
- **System Detection**: Automatically detects user's preferred color scheme
- **Smooth Transitions**: Animated theme changes without flickering

### 💳 **Subscription Plans**
| Plan | Price | Features | Popular |
|------|-------|----------|---------|
| **Starter** | ₹0/forever | 5 Basic Courses, 3 Generations/month | - |
| **Pro** | ₹799/month | 20+ Courses, 15 Generations/month | ⭐ Most Popular |
| **Elite** | ₹1499/month | Unlimited Access, Advanced Features | - |

### 🧾 **Indian Tax Invoice System**
- **GST Compliant**: 18% GST (9% CGST + 9% SGST)
- **HSN Code**: 998314 for Software Services
- **Professional Layout**: Complete invoice with company details
- **Auto Generation**: Instant invoice creation with unique numbers
- **PDF Download**: Professional invoice download functionality
- **Amount in Words**: Automatic number to words conversion

### 📱 **WhatsApp Integration**
- **Instant Redirection**: Direct link to +91 9353241308
- **Pre-filled Messages**: Automated message with plan details
- **Invoice Details**: Complete invoice information in WhatsApp message
- **Customer Support**: 24/7 support through WhatsApp

---

## 🛠️ **Tech Stack**

### **Frontend Framework**
- **React 18.2.0**: Latest React with Hooks and functional components
- **JavaScript ES6+**: Modern JavaScript features and syntax

### **Styling & UI**
- **Tailwind CSS 3.3.0**: Utility-first CSS framework
- **Lucide React**: Beautiful, customizable SVG icons
- **CSS Grid & Flexbox**: Modern layout techniques
- **Custom Animations**: CSS transitions and transforms

### **Build Tools**
- **Create React App**: Development environment and build process
- **PostCSS**: CSS processing and optimization
- **Autoprefixer**: Automatic vendor prefixing

### **Additional Libraries**
- **React Hooks**: useState, useEffect for state management
- **Local Storage API**: Theme persistence
- **Media Query API**: System theme detection

---

## 🚀 **Getting Started**

### **Prerequisites**
- Node.js (v14.0.0 or higher)
- npm or yarn package manager
- Git for version control

### **Installation**

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/ai-course-subscription-plans.git
   cd ai-course-subscription-plans
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure Tailwind CSS**
   ```bash
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init -p
   ```

4. **Start development server**
   ```bash
   npm start
   # or
   yarn start
   ```

5. **Open in browser**
   ```
   http://localhost:3000
   ```

### **Build for Production**
```bash
npm run build
# or
yarn build
```

---

## 📁 **Project Structure**

```
ai-course-subscription-plans/
├── 📁 public/
│   ├── index.html              # Main HTML template
│   ├── logo.svg               # Company logo
│   └── manifest.json          # PWA manifest
├── 📁 src/
│   ├── 📁 components/
│   │   └── SubscriptionPlans.jsx  # Main component
│   ├── 📁 styles/
│   │   ├── index.css          # Global styles
│   │   └── tailwind.css       # Tailwind imports
│   ├── App.js                 # Root component
│   ├── index.js              # Entry point
│   └── reportWebVitals.js    # Performance monitoring
├── 📄 package.json            # Dependencies and scripts
├── 📄 tailwind.config.js      # Tailwind configuration
├── 📄 postcss.config.js       # PostCSS configuration
├── 📄 README.md              # Project documentation
└── 📄 .gitignore             # Git ignore rules
```

---

## ⚙️ **Configuration**

### **Tailwind CSS Configuration**
```javascript
// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      animation: {
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce': 'bounce 1s infinite',
      },
      colors: {
        // Custom color palette can be added here
      }
    },
  },
  plugins: [],
}
```

### **Company Information**
Update the invoice company details in `SubscriptionPlans.jsx`:
```javascript
companyInfo: {
  name: 'Your Company Name Pvt Ltd',
  address: 'Your Complete Address',
  gstin: 'Your-GSTIN-Number',
  pan: 'Your-PAN-Number',
  phone: '+91 9353241308',
  email: 'billing@yourcompany.com',
  website: 'www.yourcompany.com'
}
```

---

## 🎨 **Customization Guide**

### **Color Schemes**
```javascript
// Update gradient colors in the plans array
gradient: 'from-blue-500 via-purple-500 to-pink-500'
```

### **Plan Details**
```javascript
// Modify plans in the SubscriptionPlans component
{
  id: 'custom',
  name: 'Custom Plan',
  price: '₹999',
  features: ['Feature 1', 'Feature 2'],
  // ... other properties
}
```

### **WhatsApp Number**
```javascript
// Update WhatsApp number in handleSelectPlan function
window.open(`https://wa.me/919353241308?text=${message}`, '_blank');
```

---

## 📱 **Responsive Design**

### **Breakpoints**
- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px and above

### **Mobile Features**
- Touch-friendly button sizes
- Optimized typography scaling
- Simplified navigation
- Gesture-based interactions

---

## 🧾 **Invoice System Details**

### **Tax Structure**
- **HSN/SAC Code**: 998314 (Software/IT Services)
- **CGST**: 9% (Central Goods and Services Tax)
- **SGST**: 9% (State Goods and Services Tax)
- **Total GST**: 18%

### **Invoice Components**
1. **Company Information**: GSTIN, PAN, Address
2. **Customer Details**: WhatsApp, Address, State
3. **Product/Service Details**: Description, HSN, Quantity, Rate
4. **Tax Calculation**: CGST, SGST breakdown
5. **Total Amount**: With amount in words
6. **Terms & Conditions**: Payment terms and policies

### **Invoice Generation Process**
```javascript
// Automatic invoice generation on plan selection
const invoice = generateInvoice(selectedPlan);
// Includes unique invoice number, GST calculations, and formatting
```

---

## 🔗 **API Integration**

### **WhatsApp API**
```javascript
// WhatsApp message format
const message = `🤖 Hi! I want to subscribe to the *${plan.name}* plan!
💎 Plan: ${plan.name} (${plan.price} ${plan.period})
📄 Invoice: ${invoice.invoiceNumber}
🏷️ HSN Code: ${invoice.products[0].hsnCode}
💰 Total: ₹${invoice.total} (including 18% GST)`;
```

### **Future API Integrations**
- Payment Gateway Integration (Razorpay, Stripe)
- Email Invoice Delivery
- Customer Management System
- Analytics and Reporting

---

## 🚀 **Deployment**

### **GitHub Pages**
```bash
# Install gh-pages
npm install --save-dev gh-pages

# Add to package.json
"homepage": "https://yourusername.github.io/ai-course-subscription-plans",
"predeploy": "npm run build",
"deploy": "gh-pages -d build"

# Deploy
npm run deploy
```

### **Netlify**
1. Connect GitHub repository
2. Build command: `npm run build`
3. Publish directory: `build`
4. Deploy automatically on git push

### **Vercel**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

---

## 🔧 **Development**

### **Available Scripts**
```bash
npm start          # Start development server
npm test           # Run tests
npm run build      # Build for production
npm run eject      # Eject from Create React App
npm run deploy     # Deploy to GitHub Pages
```

### **Code Quality**
- **ESLint**: Code linting and formatting
- **Prettier**: Code formatting
- **Husky**: Git hooks for quality checks

### **Performance Optimization**
- **Code Splitting**: Dynamic imports for better loading
- **Image Optimization**: Compressed and optimized assets
- **Lazy Loading**: Components loaded on demand
- **Memoization**: React.memo for expensive calculations

---

## 🐛 **Troubleshooting**

### **Common Issues**

**1. Dark mode not working**
```javascript
// Ensure Tailwind dark mode is configured
// tailwind.config.js
module.exports = {
  darkMode: 'class', // Enable class-based dark mode
  // ...
}
```

**2. WhatsApp not opening**
```javascript
// Check URL encoding
const message = encodeURIComponent("Your message here");
```

**3. Invoice not downloading**
```javascript
// Ensure blob creation and URL handling
const blob = new Blob([invoiceHTML], { type: 'text/html' });
```

### **Browser Support**
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

---

## 🤝 **Contributing**

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit changes**: `git commit -m 'Add amazing feature'`
4. **Push to branch**: `git push origin feature/amazing-feature`
5. **Open Pull Request**

### **Contribution Guidelines**
- Follow existing code style and patterns
- Add comments for complex logic
- Test thoroughly before submitting
- Update documentation as needed

---

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2024 AI Course Generator

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

---

## 📞 **Support & Contact**

### **Get Help**
- 📱 **WhatsApp**: [+91 9353241308](https://wa.me/919353241308)
- 📧 **Email**: support@aicoursegen.com
- 🐛 **Issues**: [GitHub Issues](https://github.com/yourusername/ai-course-subscription-plans/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/yourusername/ai-course-subscription-plans/discussions)

### **Business Inquiries**
- 💼 **Partnerships**: business@aicoursegen.com
- 🎯 **Custom Development**: dev@aicoursegen.com
- 📈 **Enterprise Solutions**: enterprise@aicoursegen.com

---

## 🙏 **Acknowledgments**

- **React Team** - For the amazing React framework
- **Tailwind CSS** - For the utility-first CSS framework
- **Lucide** - For beautiful, customizable icons
- **GitHub** - For hosting and version control
- **Open Source Community** - For inspiration and resources

---

## 📈 **Roadmap**

### **Version 2.0 (Coming Soon)**
- [ ] Payment Gateway Integration (Razorpay/Stripe)
- [ ] User Dashboard and Account Management
- [ ] Email Invoice Delivery System
- [ ] Multi-language Support (Hindi, English)
- [ ] Advanced Analytics Dashboard

### **Version 2.1**
- [ ] Mobile App (React Native)
- [ ] AI-Powered Plan Recommendations
- [ ] Social Media Integration
- [ ] Advanced Reporting Features

### **Version 3.0**
- [ ] Multi-tenant Architecture
- [ ] API for Third-party Integrations
- [ ] Advanced Security Features
- [ ] Enterprise-grade Scalability

---

## 📊 **Project Stats**

![GitHub stars](https://img.shields.io/github/stars/yourusername/ai-course-subscription-plans?style=social)
![GitHub forks](https://img.shields.io/github/forks/yourusername/ai-course-subscription-plans?style=social)
![GitHub issues](https://img.shields.io/github/issues/yourusername/ai-course-subscription-plans)
![GitHub pull requests](https://img.shields.io/github/issues-pr/yourusername/ai-course-subscription-plans)

---

<div align="center">

**⭐ Star this repository if it helped you! ⭐**

Made with ❤️ by [Your Name](https://github.com/yourusername)

**🚀 Ready to revolutionize AI-powered learning? Get started today!**

[Choose Your Plan](https://your-demo-link.com) • [Contact Support](https://wa.me/919353241308)

</div>
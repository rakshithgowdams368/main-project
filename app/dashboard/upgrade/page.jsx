'use client'
import React, { useState, useEffect } from 'react';
import { Sun, Moon, Check, MessageCircle, Download, Sparkles, Zap, Star, Crown, Rocket } from 'lucide-react';

const SubscriptionPlans = () => {
  const [isDark, setIsDark] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showInvoice, setShowInvoice] = useState(false);
  const [invoiceData, setInvoiceData] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

  // Initialize theme
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldBeDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
    
    setIsDark(shouldBeDark);
    updateTheme(shouldBeDark);
  }, []);

  const updateTheme = (dark) => {
    if (dark) {
      document.documentElement.classList.add('dark');
      document.body.style.backgroundColor = '#0a0a0a';
    } else {
      document.documentElement.classList.remove('dark');
      document.body.style.backgroundColor = '#ffffff';
    }
  };

  const toggleTheme = () => {
    setIsAnimating(true);
    const newTheme = !isDark;
    setIsDark(newTheme);
    updateTheme(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    
    setTimeout(() => setIsAnimating(false), 300);
  };

  const plans = [
    {
      id: 'free',
      name: 'Starter',
      price: '₹0',
      originalPrice: null,
      period: 'forever',
      icon: <Rocket className="w-8 h-8" />,
      gradient: 'from-gray-400 to-gray-600',
      features: [
        '5 Basic AI Courses',
        '3 Course Generations/Month',
        'Basic Customization',
        'Community Support',
        'Mobile Access'
      ],
      recommended: false,
      buttonText: 'Start Free',
      color: 'gray',
      popular: false
    },
    {
      id: 'basic',
      name: 'Pro',
      price: '₹799',
      originalPrice: '₹1299',
      period: 'per month',
      icon: <Zap className="w-8 h-8" />,
      gradient: 'from-blue-500 via-purple-500 to-pink-500',
      features: [
        '20+ Premium AI Courses',
        '15 Course Generations/Month',
        'Advanced AI Customization',
        'Priority Email Support',
        'Progress Analytics',
        'Offline Downloads',
        'Certificate Generation'
      ],
      recommended: true,
      buttonText: 'Go Pro',
      color: 'blue',
      popular: true
    },
    {
      id: 'prime',
      name: 'Elite',
      price: '₹1499',
      originalPrice: '₹2499',
      period: 'per month',
      icon: <Crown className="w-8 h-8" />,
      gradient: 'from-yellow-400 via-orange-500 to-red-500',
      features: [
        'Unlimited AI Course Access',
        'Unlimited Course Generation',
        'Custom AI Assistant',
        '24/7 Premium Support',
        'Advanced Analytics Dashboard',
        'White-label Solutions',
        'API Access',
        'Personal Learning Coach',
        'Exclusive Beta Features'
      ],
      recommended: false,
      buttonText: 'Go Elite',
      color: 'gold',
      popular: false
    }
  ];

  // Helper function to convert numbers to words
  const numberToWords = (num) => {
    const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
    const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
    const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
    const thousands = ['', 'Thousand', 'Lakh', 'Crore'];
    
    if (num === 0) return 'Zero';
    
    const convertHundreds = (n) => {
      let result = '';
      if (n >= 100) {
        result += ones[Math.floor(n / 100)] + ' Hundred ';
        n %= 100;
      }
      if (n >= 20) {
        result += tens[Math.floor(n / 10)] + ' ';
        n %= 10;
      } else if (n >= 10) {
        result += teens[n - 10] + ' ';
        return result;
      }
      if (n > 0) {
        result += ones[n] + ' ';
      }
      return result;
    };
    
    let result = '';
    let place = 0;
    
    while (num > 0) {
      if (place === 0) {
        result = convertHundreds(num % 1000) + thousands[place] + ' ' + result;
        num = Math.floor(num / 1000);
      } else if (place === 1) {
        result = convertHundreds(num % 100) + thousands[place] + ' ' + result;
        num = Math.floor(num / 100);
      } else {
        result = convertHundreds(num % 100) + thousands[place] + ' ' + result;
        num = Math.floor(num / 100);
      }
      place++;
    }
    
    return result.trim();
  };

  const generateInvoice = (plan) => {
    const baseAmount = parseInt(plan.price.replace('₹', ''));
    const cgst = Math.round(baseAmount * 0.09); // 9% CGST
    const sgst = Math.round(baseAmount * 0.09); // 9% SGST
    const totalTax = cgst + sgst; // Total 18% GST
    
    const invoice = {
      invoiceNumber: `AI-INV-${Date.now()}`,
      date: new Date().toLocaleDateString('en-IN'),
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN'),
      
      // Company Details
      companyInfo: {
        name: 'AI Course Generator Pvt Ltd',
        address: 'Tech Park, Electronic City, Bangalore, Karnataka 560100',
        gstin: '29ABCDE1234F1Z5',
        pan: 'ABCDE1234F',
        phone: '+91 9353241308',
        email: 'billing@aicoursegen.com',
        website: 'www.aicoursegen.com'
      },
      
      // Customer Details
      customerInfo: { 
        whatsapp: '9353241308',
        name: 'Customer',
        address: 'India',
        gstin: '', 
        state: 'Karnataka',
        stateCode: '29'
      },
      
      // Product Details with HSN
      products: [{
        description: `${plan.name} Plan - AI Course Generation Service`,
        hsnCode: '998314', 
        sacCode: '998314', 
        quantity: 1,
        unit: 'Month',
        rate: baseAmount,
        amount: baseAmount,
        taxableValue: baseAmount
      }],
      
      // Tax Calculations
      taxDetails: {
        cgst: cgst,
        sgst: sgst,
        igst: 0,
        totalTax: totalTax
      },
      
      subtotal: baseAmount,
      totalTaxableAmount: baseAmount,
      totalTax: totalTax,
      total: baseAmount + totalTax,
      
      // Additional Details
      termsAndConditions: [
        'Payment is due within 7 days of invoice date',
        'Service will be activated upon payment confirmation',
        'All disputes subject to Bangalore jurisdiction',
        'GST extra as applicable'
      ],
      
      planDetails: plan
    };
    return invoice;
  };

  const handleSelectPlan = (plan) => {
    if (plan.id === 'free') {
      setSelectedPlan(plan.id);
      setTimeout(() => {
        alert('🚀 Welcome to AI Course Generator! Your free plan is now active.');
      }, 500);
      return;
    }

    const invoice = generateInvoice(plan);
    setInvoiceData(invoice);
    setShowInvoice(true);
    
    const message = `🤖 Hi! I want to subscribe to the *${plan.name}* plan!%0A%0A💎 Plan: ${plan.name} (${plan.price} ${plan.period})%0A📄 Invoice: ${invoice.invoiceNumber}%0A🏷️ HSN Code: ${invoice.products[0].hsnCode}%0A📦 Qty: ${invoice.products[0].quantity} ${invoice.products[0].unit}%0A💰 Total: ₹${invoice.total} (including 18%% GST)%0A%0APlease send payment details! 🚀`;
    
    setTimeout(() => {
      window.open(`https://wa.me/919353241308?text=${message}`, '_blank');
    }, 2000);
    
    setSelectedPlan(plan.id);
  };

  const downloadInvoice = () => {
    if (!invoiceData) return;
    
    const invoiceHTML = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Tax Invoice - ${invoiceData.invoiceNumber}</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { 
            font-family: 'Arial', sans-serif; 
            background: #f8fafc;
            padding: 20px; 
            color: #2d3748;
            line-height: 1.4;
          }
          .invoice-container { 
            max-width: 800px; 
            margin: 0 auto; 
            background: white; 
            border-radius: 12px; 
            overflow: hidden; 
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            border: 1px solid #e2e8f0;
          }
          
          .invoice-header { 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
            color: white; 
            padding: 30px;
            position: relative;
          }
          .header-content {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 30px;
          }
          .company-info h1 { 
            font-size: 28px; 
            font-weight: bold; 
            margin-bottom: 5px;
            display: flex;
            align-items: center;
            gap: 10px;
          }
          .logo {
            width: 40px;
            height: 40px;
            background: white;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
          }
          .tax-invoice-title {
            background: rgba(255,255,255,0.2);
            padding: 15px 25px;
            border-radius: 8px;
            text-align: center;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255,255,255,0.3);
          }
          .tax-invoice-title h2 {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 5px;
          }
          .original-copy {
            font-size: 14px;
            opacity: 0.9;
          }
          
          .invoice-details { 
            display: grid; 
            grid-template-columns: 1fr 1fr; 
            gap: 30px; 
            padding: 30px;
            background: #f8fafc;
            border-bottom: 1px solid #e2e8f0;
          }
          .detail-section h3 {
            color: #2d3748;
            font-size: 16px;
            font-weight: bold;
            margin-bottom: 15px;
            padding-bottom: 8px;
            border-bottom: 2px solid #667eea;
          }
          .detail-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 8px;
            padding: 4px 0;
          }
          .detail-label {
            font-weight: 600;
            color: #4a5568;
          }
          .detail-value {
            color: #2d3748;
          }
          
          .product-section {
            padding: 30px;
          }
          .section-title {
            font-size: 18px;
            font-weight: bold;
            color: #2d3748;
            margin-bottom: 20px;
            padding-bottom: 10px;
            border-bottom: 2px solid #667eea;
          }
          .product-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 30px;
            background: white;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 8px rgba(0,0,0,0.05);
          }
          .product-table th {
            background: #667eea;
            color: white;
            padding: 15px 12px;
            text-align: left;
            font-weight: bold;
            font-size: 14px;
          }
          .product-table td {
            padding: 15px 12px;
            border-bottom: 1px solid #e2e8f0;
            vertical-align: top;
          }
          .product-table tr:last-child td {
            border-bottom: none;
          }
          .product-table tr:nth-child(even) {
            background: #f8fafc;
          }
          .hsn-code {
            font-family: 'Courier New', monospace;
            background: #edf2f7;
            padding: 4px 8px;
            border-radius: 4px;
            font-weight: bold;
          }
          .amount-cell {
            text-align: right;
            font-weight: bold;
            color: #2d3748;
          }
          
          .tax-section {
            background: #f8fafc;
            padding: 30px;
            border-top: 1px solid #e2e8f0;
          }
          .tax-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
          }
          .tax-table th {
            background: #2d3748;
            color: white;
            padding: 12px;
            text-align: left;
            font-size: 14px;
          }
          .tax-table td {
            padding: 12px;
            border-bottom: 1px solid #e2e8f0;
            background: white;
          }
          .tax-rate {
            text-align: center;
            font-weight: bold;
            color: #667eea;
          }
          .tax-amount {
            text-align: right;
            font-weight: bold;
          }
          
          .total-section {
            background: #2d3748;
            color: white;
            padding: 25px 30px;
          }
          .total-table {
            width: 100%;
            border-collapse: collapse;
          }
          .total-table td {
            padding: 8px 0;
            font-size: 16px;
          }
          .total-label {
            font-weight: 600;
          }
          .total-value {
            text-align: right;
            font-weight: bold;
          }
          .grand-total {
            border-top: 2px solid #667eea;
            margin-top: 10px;
            padding-top: 15px;
            font-size: 20px;
            font-weight: bold;
            color: #68d391;
          }
          .amount-words {
            margin-top: 15px;
            padding-top: 15px;
            border-top: 1px solid #4a5568;
            font-style: italic;
            opacity: 0.9;
          }
          
          .terms-section {
            padding: 30px;
            background: #f8fafc;
          }
          .terms-list {
            list-style: none;
            padding: 0;
          }
          .terms-list li {
            padding: 8px 0;
            padding-left: 20px;
            position: relative;
            color: #4a5568;
          }
          .terms-list li:before {
            content: "→";
            position: absolute;
            left: 0;
            color: #667eea;
            font-weight: bold;
          }
          
          .invoice-footer {
            text-align: center;
            padding: 20px 30px;
            background: #2d3748;
            color: white;
          }
          .company-signature {
            margin-top: 20px;
            text-align: right;
            padding: 20px 0;
          }
          .signature-line {
            border-top: 2px solid #2d3748;
            width: 200px;
            margin-left: auto;
            margin-top: 40px;
            padding-top: 10px;
            text-align: center;
            font-weight: bold;
          }
          
          @media print { 
            body { background: white; padding: 0; }
            .invoice-container { box-shadow: none; border: 1px solid #000; }
          }
          
          @media (max-width: 768px) {
            .header-content { flex-direction: column; gap: 20px; }
            .invoice-details { grid-template-columns: 1fr; gap: 20px; }
            .product-table, .tax-table { font-size: 12px; }
            .product-table th, .product-table td { padding: 8px 6px; }
          }
        </style>
      </head>
      <body>
        <div class="invoice-container">
          <div class="invoice-header">
            <div class="header-content">
              <div class="company-info">
                <h1>
                  <div class="logo">
                    <svg viewBox="0 0 24 24" fill="currentColor" style="width: 24px; height: 24px; color: #667eea;">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  </div>
                  ${invoiceData.companyInfo.name}
                </h1>
                <p style="margin-bottom: 10px;">${invoiceData.companyInfo.address}</p>
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 5px; font-size: 14px; opacity: 0.9;">
                  <span><strong>GSTIN:</strong> ${invoiceData.companyInfo.gstin}</span>
                  <span><strong>PAN:</strong> ${invoiceData.companyInfo.pan}</span>
                  <span><strong>Phone:</strong> ${invoiceData.companyInfo.phone}</span>
                  <span><strong>Email:</strong> ${invoiceData.companyInfo.email}</span>
                </div>
              </div>
              <div class="tax-invoice-title">
                <h2>TAX INVOICE</h2>
                <p class="original-copy">ORIGINAL FOR RECIPIENT</p>
              </div>
            </div>
          </div>
          
          <div class="invoice-details">
            <div class="detail-section">
              <h3>📄 Invoice Details</h3>
              <div class="detail-row">
                <span class="detail-label">Invoice Number:</span>
                <span class="detail-value">${invoiceData.invoiceNumber}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Invoice Date:</span>
                <span class="detail-value">${invoiceData.date}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Due Date:</span>
                <span class="detail-value">${invoiceData.dueDate}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Place of Supply:</span>
                <span class="detail-value">${invoiceData.customerInfo.state} (${invoiceData.customerInfo.stateCode})</span>
              </div>
            </div>
            <div class="detail-section">
              <h3>👤 Bill To</h3>
              <div class="detail-row">
                <span class="detail-label">Customer Name:</span>
                <span class="detail-value">${invoiceData.customerInfo.name}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">WhatsApp:</span>
                <span class="detail-value">+91 ${invoiceData.customerInfo.whatsapp}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Address:</span>
                <span class="detail-value">${invoiceData.customerInfo.address}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">State:</span>
                <span class="detail-value">${invoiceData.customerInfo.state} (${invoiceData.customerInfo.stateCode})</span>
              </div>
            </div>
          </div>
          
          <div class="product-section">
            <h3 class="section-title">🛍️ Product/Service Details</h3>
            <table class="product-table">
              <thead>
                <tr>
                  <th style="width: 5%;">S.No</th>
                  <th style="width: 35%;">Product/Service Description</th>
                  <th style="width: 12%;">HSN/SAC Code</th>
                  <th style="width: 8%;">Qty</th>
                  <th style="width: 8%;">Unit</th>
                  <th style="width: 12%;">Rate (₹)</th>
                  <th style="width: 12%;">Taxable Value (₹)</th>
                  <th style="width: 8%;">Tax Rate</th>
                </tr>
              </thead>
              <tbody>
                ${invoiceData.products.map((product, index) => `
                  <tr>
                    <td style="text-align: center; font-weight: bold;">${index + 1}</td>
                    <td>
                      <strong>${product.description}</strong>
                      <br><small style="color: #666;">AI-Powered Course Generation Service</small>
                    </td>
                    <td style="text-align: center;">
                      <span class="hsn-code">${product.hsnCode}</span>
                    </td>
                    <td style="text-align: center;">${product.quantity}</td>
                    <td style="text-align: center;">${product.unit}</td>
                    <td class="amount-cell">₹${product.rate.toLocaleString('en-IN')}</td>
                    <td class="amount-cell">₹${product.taxableValue.toLocaleString('en-IN')}</td>
                    <td style="text-align: center; font-weight: bold; color: #667eea;">18%</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
          
          <div class="tax-section">
            <h3 class="section-title">📊 Tax Calculation</h3>
            <table class="tax-table">
              <thead>
                <tr>
                  <th>Taxable Value (₹)</th>
                  <th>CGST Rate</th>
                  <th>CGST Amount (₹)</th>
                  <th>SGST Rate</th>
                  <th>SGST Amount (₹)</th>
                  <th>Total Tax (₹)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="amount-cell">₹${invoiceData.totalTaxableAmount.toLocaleString('en-IN')}</td>
                  <td class="tax-rate">9%</td>
                  <td class="tax-amount">₹${invoiceData.taxDetails.cgst.toLocaleString('en-IN')}</td>
                  <td class="tax-rate">9%</td>
                  <td class="tax-amount">₹${invoiceData.taxDetails.sgst.toLocaleString('en-IN')}</td>
                  <td class="tax-amount">₹${invoiceData.totalTax.toLocaleString('en-IN')}</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div class="total-section">
            <table class="total-table">
              <tr>
                <td class="total-label">Subtotal (Before Tax):</td>
                <td class="total-value">₹${invoiceData.subtotal.toLocaleString('en-IN')}</td>
              </tr>
              <tr>
                <td class="total-label">CGST @ 9%:</td>
                <td class="total-value">₹${invoiceData.taxDetails.cgst.toLocaleString('en-IN')}</td>
              </tr>
              <tr>
                <td class="total-label">SGST @ 9%:</td>
                <td class="total-value">₹${invoiceData.taxDetails.sgst.toLocaleString('en-IN')}</td>
              </tr>
              <tr class="grand-total">
                <td class="total-label">TOTAL AMOUNT:</td>
                <td class="total-value">₹${invoiceData.total.toLocaleString('en-IN')}</td>
              </tr>
            </table>
            <div class="amount-words">
              <strong>Amount in Words:</strong> ${numberToWords(invoiceData.total)} Rupees Only
            </div>
          </div>
          
          <div class="terms-section">
            <h3 class="section-title">📋 Terms & Conditions</h3>
            <ul class="terms-list">
              ${invoiceData.termsAndConditions.map(term => `<li>${term}</li>`).join('')}
            </ul>
          </div>
          
          <div class="company-signature">
            <p><strong>For ${invoiceData.companyInfo.name}</strong></p>
            <div class="signature-line">
              Authorized Signatory
            </div>
          </div>
          
          <div class="invoice-footer">
            <p>🚀 Thank you for choosing AI Course Generator!</p>
            <p style="margin-top: 5px; font-size: 14px; opacity: 0.8;">
              This is a computer generated invoice. For queries: ${invoiceData.companyInfo.phone} | ${invoiceData.companyInfo.email}
            </p>
          </div>
        </div>
      </body>
      </html>
    `;
    
    const blob = new Blob([invoiceHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Tax-Invoice-${invoiceData.invoiceNumber}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      isDark 
        ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900' 
        : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50'
    }`}>
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute -top-4 -right-4 w-72 h-72 rounded-full opacity-20 blur-3xl animate-pulse ${
          isDark ? 'bg-purple-500' : 'bg-blue-300'
        }`}></div>
        <div className={`absolute top-1/2 -left-8 w-96 h-96 rounded-full opacity-20 blur-3xl animate-pulse delay-1000 ${
          isDark ? 'bg-blue-500' : 'bg-purple-300'
        }`}></div>
        <div className={`absolute bottom-0 right-1/3 w-80 h-80 rounded-full opacity-20 blur-3xl animate-pulse delay-2000 ${
          isDark ? 'bg-pink-500' : 'bg-pink-300'
        }`}></div>
      </div>

      {/* Futuristic Header */}
      <header className="relative z-10">
        <nav className="flex justify-between items-center p-6 max-w-7xl mx-auto">
          <div className={`text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent`}>
            🤖 AI Course Gen
          </div>
          
          {/* Advanced Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={`relative p-3 rounded-2xl backdrop-blur-md border transition-all duration-300 ${
              isDark 
                ? 'bg-gray-800/50 border-gray-700 hover:bg-gray-700/50' 
                : 'bg-white/50 border-gray-200 hover:bg-white/80'
            } ${isAnimating ? 'scale-90' : 'hover:scale-105'}`}
          >
            <div className="relative">
              {isDark ? (
                <Sun className="w-6 h-6 text-yellow-400 transition-transform duration-300 rotate-0" />
              ) : (
                <Moon className="w-6 h-6 text-purple-600 transition-transform duration-300 rotate-0" />
              )}
            </div>
          </button>
        </nav>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              AI-Powered Learning Revolution
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black leading-tight">
            <span className={`block ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Choose Your
            </span>
            <span className="block bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 bg-clip-text text-transparent animate-pulse">
              AI Future
            </span>
          </h1>
          
          <p className={`text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Unlock the power of artificial intelligence with our cutting-edge course generation platform
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-8 mb-20" id="pricing-cards">
          {plans.map((plan, index) => (
            <div 
              key={plan.id}
              className={`group relative rounded-3xl transition-all duration-500 hover:scale-105 ${
                plan.popular ? 'lg:-mt-8 lg:scale-110' : ''
              }`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                  <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold rounded-full text-sm shadow-lg animate-bounce">
                    <Star className="w-4 h-4" />
                    MOST POPULAR
                    <Star className="w-4 h-4" />
                  </div>
                </div>
              )}

              {/* Card Container */}
              <div className={`relative h-full rounded-3xl backdrop-blur-md border transition-all duration-300 overflow-hidden ${
                isDark 
                  ? 'bg-gray-900/50 border-gray-700 hover:bg-gray-800/60' 
                  : 'bg-white/70 border-gray-200 hover:bg-white/90'
              } ${plan.popular ? 'ring-2 ring-purple-500' : ''}`}>
                
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${plan.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}></div>
                
                {/* Card Content */}
                <div className="relative z-10 p-8 h-full flex flex-col">
                  {/* Plan Header */}
                  <div className="text-center mb-8">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${plan.gradient} text-white mb-4 shadow-lg`}>
                      {plan.icon}
                    </div>
                    
                    <h3 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {plan.name}
                    </h3>
                    
                    <div className="flex items-baseline justify-center gap-2 mb-3">
                      <span className={`text-4xl font-black ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {plan.price}
                      </span>
                      {plan.originalPrice && (
                        <span className={`text-lg line-through opacity-60 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          {plan.originalPrice}
                        </span>
                      )}
                    </div>
                    
                    <p className={`text-sm opacity-75 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {plan.period}
                    </p>
                    
                    {plan.originalPrice && (
                      <div className="mt-2 inline-flex items-center px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-sm font-medium">
                        💰 Save {Math.round((1 - parseInt(plan.price.replace('₹', '')) / parseInt(plan.originalPrice.replace('₹', ''))) * 100)}%
                      </div>
                    )}
                  </div>

                  {/* Features */}
                  <div className="flex-1 mb-8">
                    <ul className="space-y-4">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start gap-3">
                          <div className={`flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br ${plan.gradient} flex items-center justify-center mt-0.5`}>
                            <Check className="w-3 h-3 text-white" />
                          </div>
                          <span className={`text-sm leading-6 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA Button */}
                  <button
                    onClick={() => handleSelectPlan(plan)}
                    disabled={selectedPlan === plan.id}
                    className={`w-full py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-300 ${
                      selectedPlan === plan.id
                        ? 'bg-green-500 text-white cursor-not-allowed'
                        : plan.popular
                        ? `bg-gradient-to-r ${plan.gradient} text-white hover:shadow-2xl hover:shadow-purple-500/25`
                        : isDark
                        ? 'bg-gray-800 hover:bg-gray-700 text-white border border-gray-600'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-900 border border-gray-300'
                    } transform hover:scale-105 active:scale-95`}
                  >
                    {selectedPlan === plan.id ? (
                      <span className="flex items-center justify-center gap-2">
                        <Check className="w-5 h-5" />
                        Selected
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <MessageCircle className="w-5 h-5" />
                        {plan.buttonText}
                      </span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Invoice Modal */}
        {showInvoice && invoiceData && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className={`max-w-lg w-full rounded-3xl overflow-hidden ${
              isDark ? 'bg-gray-900 border border-gray-700' : 'bg-white'
            } shadow-2xl transform animate-in zoom-in-95 duration-300`}>
              
              {/* Modal Header */}
              <div className={`p-6 bg-gradient-to-r from-green-500 to-blue-500 text-white text-center`}>
                <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Invoice Generated!</h3>
                <p className="opacity-90">Redirecting to WhatsApp...</p>
              </div>
              
              {/* Invoice Details */}
              <div className="p-6 space-y-6">
                <div className={`rounded-2xl p-6 ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Plan Selected:</span>
                      <span className={`px-3 py-1 rounded-full text-sm font-bold bg-gradient-to-r ${invoiceData.planDetails.gradient} text-white`}>
                        {invoiceData.planDetails.name}
                      </span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span>Invoice Number:</span>
                      <span className="font-mono text-sm bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">
                        {invoiceData.invoiceNumber}
                      </span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span>HSN Code:</span>
                      <span className="font-mono text-xs">{invoiceData.products[0].hsnCode}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span>Quantity:</span>
                      <span>{invoiceData.products[0].quantity} {invoiceData.products[0].unit}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span>Rate:</span>
                      <span>₹{invoiceData.products[0].rate}</span>
                    </div>
                    
                    <div className="border-t pt-4 space-y-2">
                      <div className="flex justify-between">
                        <span>Subtotal:</span>
                        <span>₹{invoiceData.subtotal}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>CGST (9%):</span>
                        <span>₹{invoiceData.taxDetails.cgst}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>SGST (9%):</span>
                        <span>₹{invoiceData.taxDetails.sgst}</span>
                      </div>
                      <div className="flex justify-between text-xl font-bold border-t pt-2">
                        <span>Total:</span>
                        <span className="text-green-600">₹{invoiceData.total}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <button
                    onClick={downloadInvoice}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl border transition-colors ${
                      isDark 
                        ? 'border-gray-600 hover:bg-gray-800 text-gray-300' 
                        : 'border-gray-300 hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                  <button
                    onClick={() => setShowInvoice(false)}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 px-4 rounded-xl font-medium transition-all"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Enhanced FAQ Section */}
        <div className="text-center space-y-12">
          <div>
            <h3 className={`text-3xl md:text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Frequently Asked Questions
            </h3>
            <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Everything you need to know about our AI course platform
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className={`rounded-3xl overflow-hidden backdrop-blur-md ${
              isDark ? 'bg-gray-900/50 border border-gray-700' : 'bg-white/70 border border-gray-200'
            }`}>
              {[
                {
                  question: "How does the AI course generation work?",
                  answer: "Our advanced AI analyzes your learning goals and creates personalized courses with interactive content, quizzes, and hands-on projects tailored to your skill level."
                },
                {
                  question: "Can I switch plans anytime?",
                  answer: "Absolutely! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate the billing accordingly."
                },
                {
                  question: "What happens after I contact on WhatsApp?",
                  answer: "Our team will guide you through a secure payment process and provide instant access to your chosen plan features within minutes."
                },
                {
                  question: "Is there a money-back guarantee?",
                  answer: "Yes! We offer a 30-day money-back guarantee. If you're not satisfied with our AI courses, we'll refund your payment completely."
                },
                {
                  question: "Do I get certificates for completed courses?",
                  answer: "Yes! All paid plans include industry-recognized certificates that you can share on LinkedIn and add to your professional portfolio."
                }
              ].map((faq, index) => (
                <div 
                  key={index} 
                  className={`p-6 transition-colors hover:bg-gray-50/50 dark:hover:bg-gray-800/50 ${
                    index !== 4 ? (isDark ? 'border-b border-gray-700' : 'border-b border-gray-200') : ''
                  }`}
                >
                  <h4 className={`text-lg font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {faq.question}
                  </h4>
                  <p className={`leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Advanced Features Section */}
        <div className="mt-20 space-y-12">
          <div className="text-center">
            <h3 className={`text-3xl md:text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Why Choose Our AI Platform?
            </h3>
            <p className={`text-lg max-w-2xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Experience the future of learning with cutting-edge AI technology
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Zap className="w-8 h-8" />,
                title: "Lightning Fast",
                description: "Generate complete courses in under 60 seconds with our advanced AI algorithms",
                gradient: "from-yellow-400 to-orange-500"
              },
              {
                icon: <Star className="w-8 h-8" />,
                title: "Premium Quality",
                description: "Industry-standard content created by AI trained on millions of educational resources",
                gradient: "from-purple-500 to-pink-500"
              },
              {
                icon: <Crown className="w-8 h-8" />,
                title: "Personalized",
                description: "Adaptive learning paths that evolve based on your progress and learning style",
                gradient: "from-blue-500 to-cyan-500"
              }
            ].map((feature, index) => (
              <div
                key={index}
                className={`group p-8 rounded-3xl backdrop-blur-md transition-all duration-500 hover:scale-105 ${
                  isDark ? 'bg-gray-900/50 border border-gray-700' : 'bg-white/70 border border-gray-200'
                }`}
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h4 className={`text-xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {feature.title}
                </h4>
                <p className={`leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-20">
          <div className={`rounded-3xl p-12 backdrop-blur-md ${
            isDark ? 'bg-gradient-to-r from-gray-900/70 to-purple-900/70 border border-gray-700' : 'bg-gradient-to-r from-white/70 to-blue-50/70 border border-gray-200'
          }`}>
            <div className="grid md:grid-cols-4 gap-8 text-center">
              {[
                { number: "50K+", label: "Active Learners" },
                { number: "1M+", label: "Courses Generated" },
                { number: "98%", label: "Satisfaction Rate" },
                { number: "24/7", label: "AI Support" }
              ].map((stat, index) => (
                <div key={index} className="space-y-2">
                  <div className={`text-4xl md:text-5xl font-black bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent`}>
                    {stat.number}
                  </div>
                  <div className={`text-lg font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="mt-20 space-y-12">
          <div className="text-center">
            <h3 className={`text-3xl md:text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              What Our Users Say
            </h3>
            <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Join thousands of satisfied learners worldwide
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Priya Sharma",
                role: "Software Developer",
                content: "The AI course generator is absolutely incredible! I went from zero to full-stack developer in just 3 months.",
                rating: 5,
                avatar: "👩‍💻"
              },
              {
                name: "Rajesh Kumar",
                role: "Data Scientist",
                content: "Best investment I've made in my career. The personalized learning path helped me land my dream job at Google.",
                rating: 5,
                avatar: "👨‍🔬"
              },
              {
                name: "Anjali Patel",
                role: "Marketing Manager",
                content: "Finally, a platform that understands how I learn. The AI adapts to my pace and keeps me engaged throughout.",
                rating: 5,
                avatar: "👩‍💼"
              }
            ].map((testimonial, index) => (
              <div
                key={index}
                className={`p-8 rounded-3xl backdrop-blur-md transition-all duration-300 hover:scale-105 ${
                  isDark ? 'bg-gray-900/50 border border-gray-700' : 'bg-white/70 border border-gray-200'
                }`}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="text-4xl">{testimonial.avatar}</div>
                  <div>
                    <h4 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {testimonial.name}
                    </h4>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {testimonial.role}
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                
                <p className={`leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  "{testimonial.content}"
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Security & Trust Section */}
        <div className="mt-20">
          <div className={`text-center p-12 rounded-3xl backdrop-blur-md ${
            isDark ? 'bg-gradient-to-r from-green-900/30 to-blue-900/30 border border-gray-700' : 'bg-gradient-to-r from-green-50/70 to-blue-50/70 border border-gray-200'
          }`}>
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-green-500 to-blue-500 text-white mb-6">
              <div className="text-3xl">🔒</div>
            </div>
            <h3 className={`text-2xl md:text-3xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Secure & Trusted Platform
            </h3>
            <p className={`text-lg max-w-2xl mx-auto mb-8 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Your data is protected with enterprise-grade security. We're trusted by leading companies worldwide.
            </p>
            <div className="flex flex-wrap justify-center gap-8 opacity-60">
              <div className="text-2xl">🏛️ Bank-Grade Security</div>
              <div className="text-2xl">🔐 End-to-End Encryption</div>
              <div className="text-2xl">✅ GDPR Compliant</div>
              <div className="text-2xl">🌍 Global Infrastructure</div>
            </div>
          </div>
        </div>

        {/* Final CTA Section */}
        <div className="mt-20 text-center space-y-8">
          <h3 className={`text-4xl md:text-5xl font-black ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Ready to Transform Your
            <span className="block bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Learning Journey?
            </span>
          </h3>
          <p className={`text-xl max-w-2xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Join the AI revolution and unlock your potential with personalized learning experiences
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => document.getElementById('pricing-cards')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-2xl hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl"
            >
              Choose Your Plan
            </button>
            <a
              href="https://wa.me/919353241308?text=Hi! I want to know more about AI Course Generator"
              target="_blank"
              rel="noopener noreferrer"
              className={`px-8 py-4 rounded-2xl font-bold transition-all duration-300 hover:scale-105 ${
                isDark 
                  ? 'bg-gray-800 text-white border border-gray-600 hover:bg-gray-700' 
                  : 'bg-white text-gray-900 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              💬 Ask Questions
            </a>
          </div>
        </div>

        {/* Contact Section */}
        <div className="text-center mt-16">
          <div className={`inline-flex items-center gap-3 px-6 py-4 rounded-2xl backdrop-blur-md shadow-lg ${
            isDark ? 'bg-gray-900/70 border border-gray-700' : 'bg-white/70 border border-gray-200'
          }`}>
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-500">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <div className="text-left">
              <p className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Need help choosing? Chat with us!
              </p>
              <a 
                href="https://wa.me/919353241308" 
                className="text-green-600 hover:text-green-700 font-bold text-lg"
                target="_blank"
                rel="noopener noreferrer"
              >
                +91 9353241308
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className={`mt-32 py-12 border-t ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className={`text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4`}>
            🤖 AI Course Generator
          </div>
          <p className={`mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Empowering the next generation of learners with AI-powered education
          </p>
          <div className="flex flex-wrap justify-center gap-8 text-sm">
            <a href="#" className={`hover:text-purple-600 transition-colors ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Privacy Policy
            </a>
            <a href="#" className={`hover:text-purple-600 transition-colors ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Terms of Service
            </a>
            <a href="#" className={`hover:text-purple-600 transition-colors ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Support
            </a>
            <a href="https://wa.me/919353241308" className={`hover:text-purple-600 transition-colors ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Contact
            </a>
          </div>
          <div className={`mt-8 pt-8 border-t text-sm ${isDark ? 'border-gray-800 text-gray-500' : 'border-gray-200 text-gray-500'}`}>
            © 2024 AI Course Generator. All rights reserved. Made with ❤️ in India.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SubscriptionPlans;
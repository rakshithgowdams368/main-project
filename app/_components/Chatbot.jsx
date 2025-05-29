// app/_components/Chatbot.jsx
'use client'

import React, { useState, useEffect, useRef } from 'react'

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { type: 'bot', content: 'Hi there! 👋 I\'m your AI Course Assistant. How can I help you today?' }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [conversationContext, setConversationContext] = useState({
    hasAskedAboutPricing: false,
    hasExpressedInterest: false,
    userGoals: [],
    lastIntent: null,
    userProfile: {
      isEducator: false,
      hasStudents: false,
      wantsToBuildBusiness: false,
      learningLevel: null,
      learningStyle: null,
      timeAvailability: null,
      experience: null
    }
  })
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Enhanced intent detection based on the 100 questions
  const analyzeUserIntent = (message) => {
    const lowerMessage = message.toLowerCase()
    
    // Services and platform features
    if (lowerMessage.includes('service') || lowerMessage.includes('offer') || 
        lowerMessage.includes('provide') || lowerMessage.includes('feature') ||
        lowerMessage.includes('what do you do') || lowerMessage.includes('what can you do') ||
        lowerMessage.includes('tell me about')) {
      return 'services-overview'
    }
    
    // Course Creation & Learning Path
    if (lowerMessage.includes('create') && lowerMessage.includes('course') || 
        lowerMessage.includes('syllabus') || lowerMessage.includes('learning path') ||
        lowerMessage.includes('study plan') || lowerMessage.includes('schedule')) {
      return 'course-creation'
    }
    
    // AI Tools & Technologies
    if (lowerMessage.includes('tool') || lowerMessage.includes('tensorflow') || 
        lowerMessage.includes('pytorch') || lowerMessage.includes('jupyter') ||
        lowerMessage.includes('colab') || lowerMessage.includes('hugging face') ||
        lowerMessage.includes('automl')) {
      return 'ai-tools'
    }
    
    // Conceptual AI Questions
    if (lowerMessage.includes('difference between') || lowerMessage.includes('what is') ||
        lowerMessage.includes('explain') || lowerMessage.includes('how does') ||
        lowerMessage.includes('supervised') || lowerMessage.includes('unsupervised') ||
        lowerMessage.includes('neural network') || lowerMessage.includes('machine learning')) {
      return 'ai-concepts'
    }
    
    // Programming & Projects
    if (lowerMessage.includes('programming') || lowerMessage.includes('python') ||
        lowerMessage.includes('project') || lowerMessage.includes('build') ||
        lowerMessage.includes('chatbot') || lowerMessage.includes('opencv') ||
        lowerMessage.includes('dataset')) {
      return 'programming-projects'
    }
    
    // Courses & Certifications
    if (lowerMessage.includes('course') || lowerMessage.includes('certification') ||
        lowerMessage.includes('google') || lowerMessage.includes('coursera') ||
        lowerMessage.includes('udemy') || lowerMessage.includes('edx') ||
        lowerMessage.includes('mooc')) {
      return 'courses-certifications'
    }
    
    // Career & Job Oriented
    if (lowerMessage.includes('career') || lowerMessage.includes('job') ||
        lowerMessage.includes('salary') || lowerMessage.includes('engineer') ||
        lowerMessage.includes('skills') || lowerMessage.includes('resume') ||
        lowerMessage.includes('freelancing')) {
      return 'career'
    }
    
    // Generative AI & LLMs
    if (lowerMessage.includes('generative ai') || lowerMessage.includes('chatgpt') ||
        lowerMessage.includes('llm') || lowerMessage.includes('prompt') ||
        lowerMessage.includes('fine-tuning') || lowerMessage.includes('rag') ||
        lowerMessage.includes('langchain')) {
      return 'generative-ai'
    }
    
    // Website & Chatbot Questions
    if (lowerMessage.includes('this tool') || lowerMessage.includes('this website') ||
        lowerMessage.includes('download') || lowerMessage.includes('save') ||
        lowerMessage.includes('share') || lowerMessage.includes('edit') ||
        lowerMessage.includes('custom')) {
      return 'website-features'
    }
    
    // Trends & Future
    if (lowerMessage.includes('future') || lowerMessage.includes('trend') ||
        lowerMessage.includes('2025') || lowerMessage.includes('replacing') ||
        lowerMessage.includes('industry') || lowerMessage.includes('ethics') ||
        lowerMessage.includes('startup')) {
      return 'ai-trends'
    }
    
    // Pricing questions
    if (lowerMessage.includes('price') || lowerMessage.includes('cost') || 
        lowerMessage.includes('pay') || lowerMessage.includes('subscription') || 
        lowerMessage.includes('plan') || lowerMessage.includes('buy') ||
        lowerMessage.includes('purchase') || lowerMessage.includes('free')) {
      return 'pricing'
    }
    
    // Time-related questions
    if (lowerMessage.includes('how long') || lowerMessage.includes('time') ||
        lowerMessage.includes('duration') || lowerMessage.includes('months') ||
        lowerMessage.includes('weeks') || lowerMessage.includes('weekend')) {
      return 'time-related'
    }
    
    // Recommendations
    if (lowerMessage.includes('suggest') || lowerMessage.includes('recommend') ||
        lowerMessage.includes('best') || lowerMessage.includes('popular') ||
        lowerMessage.includes('which')) {
      return 'recommendation'
    }
    
    // Greetings
    if (lowerMessage.includes('hi') || lowerMessage.includes('hello') || 
        lowerMessage.includes('hey') || lowerMessage.includes('buddy')) {
      return 'greeting'
    }
    
    // Background questions
    if (lowerMessage.includes('without coding') || lowerMessage.includes('without python') ||
        lowerMessage.includes('beginner') || lowerMessage.includes('no experience')) {
      return 'background-check'
    }
    
    return 'general'
  }

  const generateResponse = (userMessage) => {
    const intent = analyzeUserIntent(userMessage)
    const lowerMessage = userMessage.toLowerCase()
    
    // Update conversation context
    const updatedContext = { ...conversationContext }
    updatedContext.lastIntent = intent
    setConversationContext(updatedContext)
    
    // Comprehensive responses based on question types
    switch (intent) {
      case 'services-overview':
        return `I'm excited to tell you about our comprehensive AI Course Generator platform! Here's what we offer:

🎯 **Core Services:**
- **AI-Powered Course Generation** - Create complete courses in minutes
- **Custom Learning Paths** - Tailored to your specific needs
- **Interactive Content Creation** - Quizzes, assignments, and projects
- **Multi-format Export** - PDF, HTML, and video scripts

🛠️ **Key Features:**
- Smart syllabus creation based on your requirements
- Automatic generation of notes, presentations, and study materials
- AI-driven assessment creation (tests, quizzes, exercises)
- Content adaptation for different learning levels
- Integration with popular learning management systems

💡 **Perfect For:**
- Educators creating professional courses
- Students seeking personalized study plans
- Businesses developing training materials
- Content creators building educational content

🆓 **Free Plan** - Get started with 5 courses/month
⭐ **Educator Plan** ($29/month) - Unlimited courses & premium features
🏢 **Institution Plan** ($99/month) - Team collaboration & advanced analytics

Would you like me to explain any specific service in detail or help you get started?`
      
      case 'course-creation':
        if (lowerMessage.includes('create an ai course for beginners')) {
          return `Absolutely! I'll help you create a beginner-friendly AI course. Here's what we'll include:

📚 **Course Structure:**
1. **Introduction to AI** - What is AI and its applications
2. **Python Basics** - Essential programming foundation
3. **Machine Learning Fundamentals** - Supervised/Unsupervised learning
4. **Neural Networks Basics** - Understanding how AI learns
5. **Hands-on Projects** - Build your first AI model

Would you like me to generate this course for you now? It's completely free to start!`
        }
        
        if (lowerMessage.includes('syllabus for an ai course in 3 months')) {
          return `I'll create a comprehensive 3-month AI course syllabus for you:

**Month 1: Foundations**
- Week 1-2: Python Programming & Data Structures
- Week 3-4: Mathematics for AI (Linear Algebra, Statistics)

**Month 2: Machine Learning**
- Week 5-6: Supervised Learning Algorithms
- Week 7-8: Unsupervised Learning & Neural Networks

**Month 3: Deep Learning & Projects**
- Week 9-10: Deep Learning with TensorFlow/PyTorch
- Week 11-12: Capstone Project & Deployment

Would you like me to customize this plan based on your specific goals?`
        }
        
        if (lowerMessage.includes('personalized ai learning path')) {
          return `I'd love to create a personalized AI learning path for you! To make it perfect, could you tell me:

1. Your current skill level (beginner/intermediate/advanced)?
2. Your primary goal (career change/skill upgrade/research)?
3. How much time can you dedicate weekly?

Based on your answers, I'll create a tailored learning path with milestones and resources!`
        }
        return `I can help you create a complete AI course! Our platform specializes in generating:

- Custom course outlines
- Interactive lessons
- Practice exercises
- Assessment materials

What type of course would you like to create?`

      case 'ai-tools':
        if (lowerMessage.includes('difference between tensorflow and pytorch')) {
          return `Here's a clear comparison of TensorFlow and PyTorch:

**TensorFlow:**
- Developed by Google
- Better for production deployment
- More mature ecosystem
- Preferred in industry
- Static computation graphs

**PyTorch:**
- Developed by Facebook/Meta
- More intuitive and pythonic
- Better for research
- Dynamic computation graphs
- Easier debugging

For beginners, I recommend starting with PyTorch due to its simplicity. Want me to create a course for either framework?`
        }
        
        if (lowerMessage.includes('jupyter notebook or google colab')) {
          return `Both are excellent, but here's my recommendation:

**Google Colab is better for beginners because:**
- No installation required
- Free GPU access
- Cloud-based (access anywhere)
- Pre-installed libraries
- Easy sharing

**Jupyter Notebook is better when:**
- You need local control
- Working with sensitive data
- Custom environment needed
- Offline work required

For AI learning, start with Colab! Would you like a tutorial on setting it up?`
        }
        return `I can guide you through the best AI tools for your needs. Popular options include:

- TensorFlow & PyTorch for deep learning
- Jupyter Notebook & Google Colab for development
- Pandas & NumPy for data manipulation
- Scikit-learn for machine learning

Which specific tools are you interested in learning more about?`

      case 'ai-concepts':
        if (lowerMessage.includes('difference between ai, ml, and deep learning')) {
          return `Let me break this down simply:

🤖 **AI (Artificial Intelligence):**
- The broadest concept - machines mimicking human intelligence
- Includes everything from simple rules to complex systems

🧠 **ML (Machine Learning):**
- A subset of AI
- Systems learn from data without explicit programming
- Examples: spam filters, recommendation systems

🔮 **Deep Learning:**
- A subset of ML
- Uses neural networks with multiple layers
- Examples: image recognition, voice assistants

Think of it as: AI > ML > Deep Learning

Would you like me to create a visual course explaining these concepts?`
        }
        return `I'd be happy to explain AI concepts! Common topics include:

- AI vs ML vs Deep Learning
- Supervised vs Unsupervised Learning
- Neural Networks & Deep Learning
- Natural Language Processing
- Computer Vision

Which concept would you like me to explain in detail?`

      case 'programming-projects':
        if (lowerMessage.includes('beginner-friendly ai projects')) {
          return `Here are 5 perfect beginner AI projects:

1. **Iris Flower Classification** 🌸
   - Classic ML project
   - Learn data preprocessing & classification

2. **Movie Recommendation System** 🎬
   - Collaborative filtering
   - Great for understanding algorithms

3. **Sentiment Analysis** 😊😢
   - Natural Language Processing
   - Analyze text emotions

4. **Image Classification with MNIST** 🔢
   - Digit recognition
   - Introduction to neural networks

5. **Chatbot with Rule-Based System** 💬
   - Basic conversation flow
   - Foundation for advanced bots

Which project interests you most? I can create a step-by-step guide!`
        }
        return `I can help you find the perfect AI project! Here are some popular options:

- Image Classification
- Sentiment Analysis
- Chatbot Development
- Recommendation Systems
- Time Series Prediction

What's your experience level, and what type of project interests you?`

      case 'career':
        if (lowerMessage.includes('ai engineer earn') || lowerMessage.includes('salary')) {
          return `AI Engineer salaries are quite competitive! Here's the current landscape:

💰 **Entry Level (0-2 years):**
- $80,000 - $120,000/year

💼 **Mid-Level (3-5 years):**
- $120,000 - $180,000/year

🚀 **Senior Level (5+ years):**
- $180,000 - $300,000+/year

Factors affecting salary:
- Location (Silicon Valley pays highest)
- Company size (FAANG offers premium)
- Specialization (ML Ops, Computer Vision)
- Education level

Want to know how to reach these salary levels? I can create a career roadmap for you!`
        }
        return `AI careers offer excellent opportunities! Here's what you should know:

- Popular roles: AI Engineer, Data Scientist, ML Engineer
- Salary ranges: $80k-$300k+ based on experience
- Required skills: Python, ML frameworks, mathematics
- Growth potential: High demand across industries

Would you like specific guidance on starting or advancing your AI career?`

      case 'generative-ai':
        if (lowerMessage.includes('what is generative ai')) {
          return `Generative AI is fascinating! Here's a clear explanation:

🎨 **What is Generative AI?**
AI systems that create new content - text, images, audio, video, or code.

🔑 **Key Examples:**
- ChatGPT - Generates human-like text
- DALL-E - Creates images from descriptions
- GitHub Copilot - Writes code
- Midjourney - Produces artwork

🎯 **How it works:**
1. Trained on massive datasets
2. Learns patterns and relationships
3. Generates new, original content

Want to learn how to build with generative AI? Our Educator Plan includes advanced AI courses!`
        }
        return `Generative AI is revolutionizing content creation! I can help you understand:

- How ChatGPT and large language models work
- Image generation with DALL-E and Stable Diffusion
- Fine-tuning and prompt engineering
- Building applications with LLMs

What aspect of generative AI interests you most?`

      case 'time-related':
        if (lowerMessage.includes('how long does it take to learn ai')) {
          return `The timeline varies based on your goals and background:

🚀 **Fast Track (3-6 months):**
- Basic AI concepts
- Simple ML projects
- Entry-level job ready

📚 **Comprehensive (6-12 months):**
- Strong foundations
- Multiple projects
- Mid-level positions

🎓 **Expert Level (1-2 years):**
- Advanced concepts
- Research papers
- Senior roles

Your journey depends on:
- Prior programming experience
- Time commitment (10-20 hrs/week recommended)
- Learning resources quality

Want a personalized timeline? Tell me about your background and I'll create one!`
        }
        return `Learning AI timelines depend on your goals and dedication:

- Basics: 3-6 months
- Professional level: 6-12 months
- Expert level: 1-2+ years

I can create a personalized timeline based on your availability and objectives. How much time can you dedicate weekly?`

      case 'background-check':
        if (lowerMessage.includes('without coding background')) {
          return `Absolutely! You can learn AI without prior coding experience. Here's your path:

🌟 **Your AI Journey (No Coding Background):**

1. **Start with Basics (Month 1):**
   - Python fundamentals
   - Basic programming concepts
   - Practice with simple exercises

2. **Build Foundation (Month 2-3):**
   - Data manipulation with Pandas
   - Basic statistics
   - Simple ML algorithms

3. **AI Concepts (Month 4-6):**
   - Machine learning basics
   - Neural networks introduction
   - Hands-on projects

🎯 **Success Tips:**
- Dedicate 1-2 hours daily
- Focus on practical projects
- Join our community for support

Ready to start? I'll guide you every step of the way!`
        }
        return `You can definitely learn AI without prior coding experience! I'll create a personalized pathway that:

- Starts with Python basics
- Gradually introduces AI concepts
- Provides hands-on practice
- Offers continuous support

Would you like me to create your beginner-friendly learning plan?`

      case 'website-features':
        if (lowerMessage.includes('download') || lowerMessage.includes('save')) {
          return `Yes! You can download and save your AI-generated courses:

📥 **Download Options:**
- PDF format - Perfect for offline reading
- Interactive HTML - Includes quizzes
- Video scripts - For content creation
- Complete course package - All materials

💾 **Save Features:**
- Auto-save to your account
- Cloud storage integration
- Version history
- Easy sharing options

These features are available in our Educator Plan. Would you like to try it with a 14-day free trial?`
        }
        
        if (lowerMessage.includes('edit') || lowerMessage.includes('customize')) {
          return `Absolutely! Our platform offers full editing capabilities:

✏️ **Editing Features:**
- Modify any generated content
- Add your own materials
- Customize branding
- Adjust difficulty levels
- Reorder modules

🎨 **Customization Options:**
- Your logo and colors
- Custom templates
- Personalized assessments
- Interactive elements

Want to see these features in action? Start with our free trial!`
        }
        return `Our platform offers powerful features for course creation:

- AI-powered content generation
- Customizable templates
- Multi-format exports (PDF, HTML, Video)
- Interactive quizzes and assignments
- Progress tracking and analytics

Would you like to see a demo of any specific feature?`

      case 'ai-trends':
        if (lowerMessage.includes('future of ai') || lowerMessage.includes('2025')) {
          return `The future of AI is incredibly exciting! Here are the key trends for 2025:

🚀 **Top AI Trends:**

1. **Multimodal AI**
   - Systems understanding text, images, and audio together
   - More natural human-AI interaction

2. **AI Agents**
   - Autonomous systems completing complex tasks
   - Personal AI assistants becoming mainstream

3. **Edge AI**
   - AI running on local devices
   - Faster, more private processing

4. **Responsible AI**
   - Focus on ethics and transparency
   - Regulation and standards

5. **AI in Education**
   - Personalized learning at scale
   - AI tutors and course generators (like us!)

Want to stay ahead of these trends? Our platform helps you master future-ready AI skills!`
        }
        return `AI is rapidly evolving! Key trends include:

- Multimodal AI (text, image, audio)
- AI Agents and automation
- Edge AI for local processing
- Ethics and responsible AI
- Personalized education with AI

Would you like to explore any of these trends in depth?`

      case 'pricing':
        if (lowerMessage.includes('free')) {
          return `Yes! We offer multiple options including free access:

🆓 **Free Plan Includes:**
- 5 AI-generated courses per month
- Basic templates
- Community support
- PDF downloads

⭐ **Upgrade Benefits ($29/month):**
- Unlimited course generation
- Advanced AI models
- Priority support
- Custom branding
- API access

Want to start with the free plan? Click here: [Get Started Free](/dashboard)`
        }
        return `We offer flexible pricing options:

🆓 **Free Plan:**
- 5 courses per month
- Basic features
- Community support

⭐ **Educator Plan - $29/month**
- Unlimited courses
- Premium features
- Priority support

🏢 **Institution Plan - $99/month**
- Team collaboration
- Advanced analytics
- Custom integrations

Which plan interests you? I can help you choose the best option!`

      default:
        // More helpful default response
        if (lowerMessage === 'service' || lowerMessage === 'services') {
          return `I'm glad you asked about our services! Our AI Course Generator platform offers:

🎯 **Main Services:**
1. AI-powered course creation
2. Custom learning path generation
3. Interactive content development
4. Multi-format exports

💡 **Key Benefits:**
- Save hours of content creation time
- Generate professional-quality materials
- Personalize learning experiences
- Access advanced AI tools

Would you like me to explain any specific service in detail?`
        }
        
        if (conversationContext.lastIntent) {
          return `I understand you're interested in ${conversationContext.lastIntent}. Could you please be more specific about what you'd like to know? I'm here to help!`
        }
        
        return `I'm your AI Course Assistant, here to help you create amazing educational content! I can assist with:

📚 Course creation and customization
💡 AI learning guidance
💰 Pricing and plan information
🛠️ Platform features and capabilities
🎓 Career advice in AI
🚀 Latest AI trends and tools

What specific information would you like to know?`
    }
  }

  const handleSend = () => {
    if (!input.trim()) return

    // Add user message
    setMessages([...messages, { type: 'user', content: input }])
    const userInput = input
    setInput('')
    setIsTyping(true)

    // Simulate natural typing delay based on response length
    const response = generateResponse(userInput)
    const typingDelay = response ? Math.min(Math.max(response.length * 5, 1000), 3000) : 1000 // 1-3 seconds
    
    setTimeout(() => {
      setIsTyping(false)
      setMessages(prev => [...prev, { type: 'bot', content: response }])
    }, typingDelay)
  }

  return (
    <>
      {/* Chat Button - Fixed for light mode visibility */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-violet-600 hover:bg-violet-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 group"
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? (
          <svg 
            className="w-6 h-6 transition-transform duration-200 group-hover:rotate-90" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <div className="relative">
            <svg 
              className="w-6 h-6 transition-transform duration-200 group-hover:scale-110" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-violet-500"></span>
            </span>
          </div>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 bg-white dark:bg-neutral-800 rounded-lg shadow-2xl overflow-hidden border border-gray-200 dark:border-neutral-700 animate-slideUp">
          <div className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white p-4 flex justify-between items-center">
            <div>
              <h3 className="font-semibold">AI Course Assistant</h3>
              <p className="text-xs text-violet-200">Always here to help</p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="flex h-3 w-3">
                <span className="animate-pulse inline-flex h-full w-full rounded-full bg-green-400"></span>
              </span>
              <span className="text-xs">Online</span>
            </div>
          </div>
          
          <div className="h-96 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-neutral-900">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl ${
                    message.type === 'user'
                      ? 'bg-violet-600 text-white rounded-br-sm'
                      : 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white rounded-bl-sm shadow-sm'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white p-3 rounded-2xl rounded-bl-sm shadow-sm">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 bg-white dark:bg-neutral-800 border-t border-gray-200 dark:border-neutral-700">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 rounded-full border border-gray-200 dark:border-neutral-700 bg-gray-50 dark:bg-neutral-900 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500 dark:focus:ring-violet-400"
              />
              <button
                onClick={handleSend}
                className="bg-violet-600 hover:bg-violet-700 text-white p-2 rounded-full transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Chatbot
# 🌅 Morning Dashboard

A beautiful, personalized morning dashboard built with modern web technologies. This application provides users with their location, current weather conditions, and daily inspirational quotes in an elegant, responsive interface.

## ✨ Features

### 🌍 **Smart Geolocation**
- Automatic location detection using Vercel Edge Runtime
- Fallback to default location for development
- Real-time city and region information

### 🌤️ **Live Weather Information**
- Current temperature and weather conditions
- Additional details: humidity, wind speed, "feels like" temperature
- Beautiful weather icons with fallback emojis
- 30-minute cache for optimal performance

### 💭 **Inspirational Quotes**
- Daily inspirational quotes from external APIs
- Multiple API fallbacks for reliability
- Elegant typography and presentation
- Automatic retry mechanisms

### 🎨 **Modern Design**
- Glass morphism effects with backdrop blur
- Smooth animations and transitions
- Responsive design for all devices
- Dark theme with gradient backgrounds
- Hover effects and micro-interactions

### ⚡ **Performance Optimized**
- Next.js App Router for optimal routing
- SWR for intelligent data fetching and caching
- Edge Runtime for fast API responses
- Optimized images and fonts
- Proper cache headers and strategies

## 🛠️ Tech Stack

### **Frontend**
- [Next.js 15](https://nextjs.org/) - React framework with App Router
- [React 19](https://reactjs.org/) - UI library
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS 4](https://tailwindcss.com/) - Utility-first CSS framework

### **Data Fetching & State Management**
- [SWR](https://swr.vercel.app/) - React hooks for data fetching
- Custom hooks for time-based greetings
- Error boundaries for graceful error handling

### **APIs & Services**
- [WeatherAPI.com](https://www.weatherapi.com/) - Weather data
- [Quotable.io](https://quotable.io/) - Inspirational quotes
- [Vercel Edge Runtime](https://vercel.com/docs/functions/edge-functions) - Geolocation

### **Development Tools**
- ESLint - Code linting
- TypeScript - Static type checking
- Next.js built-in optimizations

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v24.5.0 or later) - [Download here](https://nodejs.org/)
- **npm** or **yarn** or **pnpm** - Package manager

### Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/morning-dashboard.git
   cd morning-dashboard
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables:**
   Create a `.env.local` file in the root directory:
   ```env
   WEATHER_API_KEY=your_weather_api_key_here
   ```

4. **Get your WeatherAPI key:**
   - Visit [WeatherAPI.com](https://www.weatherapi.com/)
   - Sign up for a free account
   - Copy your API key to the `.env.local` file

5. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

6. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000) to see your dashboard!

## 📁 Project Structure

```
morning-dashboard/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── location/      # Geolocation endpoint
│   │   ├── weather/       # Weather data endpoint
│   │   └── quote/         # Quotes endpoint
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   │   ├── LoadingSpinner.tsx
│   │   └── ErrorBoundary.tsx
│   ├── Dashboard.tsx     # Main dashboard component
│   ├── WeatherInfo.tsx   # Weather display component
│   └── QuoteOfTheDay.tsx # Quote display component
├── public/               # Static assets
├── .nvmrc               # Node.js version specification
├── next.config.ts       # Next.js configuration
├── package.json         # Dependencies and scripts
├── tailwind.config.js   # Tailwind CSS configuration
└── tsconfig.json        # TypeScript configuration
```

## 🎯 Key Features Implementation

### **Error Handling**
- Comprehensive error boundaries
- Graceful fallbacks for API failures
- User-friendly error messages
- Retry mechanisms with exponential backoff

### **Performance Optimizations**
- Intelligent caching strategies
- Optimized bundle sizes
- Lazy loading where appropriate
- Efficient re-renders with React best practices

### **User Experience**
- Loading states with custom spinners
- Smooth animations and transitions
- Responsive design for all screen sizes
- Accessibility considerations

### **Code Quality**
- TypeScript for type safety
- ESLint for code quality
- Consistent code formatting
- Comprehensive error handling

## 🌐 Deployment

### **Vercel (Recommended)**
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your `WEATHER_API_KEY` to Vercel environment variables
4. Deploy automatically!

### **Other Platforms**
The application can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [WeatherAPI.com](https://www.weatherapi.com/) for weather data
- [Quotable.io](https://quotable.io/) for inspirational quotes
- [Vercel](https://vercel.com/) for hosting and edge functions
- [Tailwind CSS](https://tailwindcss.com/) for the beautiful styling framework

---

**Built with ❤️ by Juan Camilo**
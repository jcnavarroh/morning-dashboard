# 🌅 Morning Dashboard

A beautiful, personalized morning dashboard built with modern web technologies. This application provides users with their location, current weather conditions, and daily inspirational quotes in an elegant, responsive interface with aurora borealis-inspired design.

## ✨ Features

### 🌍 **Smart Geolocation**

- Automatic location detection using Vercel Edge Runtime
- Fallback to Tromsø, Norway (aurora borealis city) for development
- Real-time city, country, and region information
- Country code to full name mapping

### 🌤️ **Live Weather Information**

- Current temperature and weather conditions
- Additional details: humidity, wind speed, "feels like" temperature
- Beautiful weather icons with fallback emojis
- 30-minute cache for optimal performance
- Location display with city and country names

### 💭 **Inspirational Quotes**

- Daily inspirational quotes from external APIs
- Multiple API fallbacks for reliability
- Elegant typography and presentation
- Automatic retry mechanisms
- Decorative elements and proper attribution

### 👤 **Personalization**

- User name input and persistence
- Personalized greetings (Good Morning, Juan!)
- Edit name functionality with modal interface
- localStorage integration for data persistence
- Dynamic title updates based on user preference

### 🎨 **Modern Design**

- Glass morphism effects with backdrop blur
- Smooth animations and transitions using Framer Motion
- Responsive design for all devices
- Dark theme with aurora borealis gradient backgrounds
- Hover effects and micro-interactions
- Equal height containers for consistent layout
- Fixed text rendering issues (no more cut-off letters)

### ⚡ **Performance Optimized**

- Next.js App Router for optimal routing
- SWR for intelligent data fetching and caching
- Edge Runtime for fast API responses
- Optimized images and fonts
- Proper cache headers and strategies
- Bundle analysis and optimization

### 🧪 **Comprehensive Testing**

- Jest testing framework with React Testing Library
- Unit tests for all components
- Integration tests for user interactions
- Coverage reporting with Codecov integration
- Accessibility testing
- Error boundary testing
- Mock implementations for external dependencies

### 🔄 **CI/CD Pipeline**

- GitHub Actions workflows for automated testing
- Security audits and dependency scanning
- Automated deployment to Vercel
- Code quality checks and formatting
- Branch protection and code ownership
- Dependabot for automated dependency updates

## 🛠️ Tech Stack

### **Frontend**

- [Next.js 15.4.6](https://nextjs.org/) - React framework with App Router
- [React 19.1.0](https://reactjs.org/) - UI library
- [TypeScript 5](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS 3.4.17](https://tailwindcss.com/) - Utility-first CSS framework
- [Framer Motion 12.23.12](https://www.framer.com/motion/) - Animation library

### **Data Fetching & State Management**

- [SWR 2.3.6](https://swr.vercel.app/) - React hooks for data fetching
- Custom hooks for time-based greetings
- Error boundaries for graceful error handling
- localStorage for user preferences

### **APIs & Services**

- [WeatherAPI.com](https://www.weatherapi.com/) - Weather data
- [Quotable.io](https://quotable.io/) - Inspirational quotes
- [Vercel Edge Runtime](https://vercel.com/docs/functions/edge-functions) - Geolocation

### **Testing & Quality**

- [Jest 29.7.0](https://jestjs.io/) - Testing framework
- [React Testing Library 14.2.1](https://testing-library.com/docs/react-testing-library/intro/) - Component testing
- [@testing-library/user-event 14.5.2](https://testing-library.com/docs/user-event/intro/) - User interaction testing
- [@testing-library/jest-dom 6.4.2](https://github.com/testing-library/jest-dom) - Custom matchers

### **Development Tools**

- ESLint 9 - Code linting
- TypeScript - Static type checking
- Prettier - Code formatting
- Next.js built-in optimizations

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18.x or v20.x) - [Download here](https://nodejs.org/)
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

## 🧪 Testing

### Run Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

### Test Structure

```
__tests__/
├── components/
│   ├── Dashboard.test.tsx
│   ├── WeatherInfo.test.tsx
│   ├── QuoteOfTheDay.test.tsx
│   ├── UserNameInput.test.tsx
│   └── utils.test.ts
└── ui/
    ├── LoadingSpinner.test.tsx
    └── ErrorBoundary.test.tsx
```

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
│   ├── QuoteOfTheDay.tsx # Quote display component
│   └── UserNameInput.tsx # User name input modal
├── __tests__/            # Test files
│   ├── components/       # Component tests
│   └── ui/              # UI component tests
├── .github/              # GitHub workflows and configs
│   ├── workflows/        # CI/CD workflows
│   ├── CODEOWNERS        # Code ownership
│   └── dependabot.yml    # Dependency updates
├── public/               # Static assets
├── .nvmrc               # Node.js version specification
├── next.config.ts       # Next.js configuration
├── package.json         # Dependencies and scripts
├── tailwind.config.js   # Tailwind CSS configuration
├── jest.config.js       # Jest configuration
├── jest.setup.js        # Jest setup and mocks
└── tsconfig.json        # TypeScript configuration
```

## 🎯 Key Features Implementation

### **User Personalization**

- Modal-based name input for new users
- Edit functionality for existing users
- localStorage persistence
- Dynamic greeting based on time and user name
- Smooth transitions and animations

### **Enhanced Weather Display**

- City and country name display
- Country code to full name mapping
- Equal height containers for consistent layout
- Improved weather icon handling
- Better error states and loading indicators

### **Error Handling**

- Comprehensive error boundaries
- Graceful fallbacks for API failures
- User-friendly error messages
- Retry mechanisms with exponential backoff
- Loading states with custom spinners

### **Performance Optimizations**

- Intelligent caching strategies
- Optimized bundle sizes
- Lazy loading where appropriate
- Efficient re-renders with React best practices
- Bundle analysis for size monitoring

### **User Experience**

- Loading states with custom spinners
- Smooth animations and transitions
- Responsive design for all screen sizes
- Accessibility considerations
- Fixed text rendering issues

### **Code Quality**

- TypeScript for type safety
- ESLint for code quality
- Prettier for consistent formatting
- Comprehensive testing suite
- Error boundary implementation

## 🔄 CI/CD Pipeline

### **GitHub Actions Workflows**

- **Basic CI:** Linting, testing, and building
- **Enhanced CI/CD:** Comprehensive quality checks and deployment
- **Test Suite:** Multi-version testing and coverage
- **Security Audit:** Vulnerability scanning and dependency review
- **Deploy:** Automated deployment to Vercel

### **Quality Gates**

- All tests must pass
- Code coverage thresholds (70%)
- Security audits must pass
- Type checking must pass
- Linting and formatting checks

### **Deployment**

- **Staging:** Automatic deployment from `develop` branch
- **Production:** Automatic deployment from `main` branch
- **Environments:** Vercel with environment-specific configurations

## 🌐 Deployment

### **Vercel (Recommended)**

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your `WEATHER_API_KEY` to Vercel environment variables
4. Deploy automatically with CI/CD pipeline!

## 🤝 Contributing

### **Development Workflow**

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests: `npm test`
5. Check code quality: `npm run lint && npm run type-check`
6. Commit your changes (`git commit -m 'Add amazing feature'`)
7. Push to the branch (`git push origin feature/amazing-feature`)
8. Open a Pull Request

### **Code Standards**

- Follow TypeScript best practices
- Write tests for new features
- Maintain code coverage above 70%
- Follow ESLint and Prettier configurations
- Update documentation as needed

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [WeatherAPI.com](https://www.weatherapi.com/) for weather data
- [Quotable.io](https://quotable.io/) for inspirational quotes
- [Vercel](https://vercel.com/) for hosting and edge functions
- [Tailwind CSS](https://tailwindcss.com/) for the beautiful styling framework
- [Framer Motion](https://www.framer.com/motion/) for smooth animations
- [Jest](https://jestjs.io/) and [React Testing Library](https://testing-library.com/) for testing

---

**Built with ❤️ by Juan Camilo**

_Inspired by the beauty of aurora borealis and modern web development practices._

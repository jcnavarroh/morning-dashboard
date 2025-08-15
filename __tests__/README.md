# Testing Guide

This project uses Jest and React Testing Library for comprehensive testing of all components.

## Test Structure

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

## Running Tests

### All Tests

```bash
npm test
```

### Watch Mode (for development)

```bash
npm run test:watch
```

### Coverage Report

```bash
npm run test:coverage
```

## Test Coverage

The test suite covers:

- **Component Rendering**: All components render correctly with different props
- **User Interactions**: Form submissions, button clicks, input changes
- **Error Handling**: API errors, network failures, invalid data
- **State Management**: Loading states, data updates, localStorage persistence
- **Accessibility**: Proper ARIA attributes, semantic HTML structure
- **Edge Cases**: Empty data, missing props, boundary conditions

## Test Categories

### 1. LoadingSpinner Component

- Default rendering
- Different sizes (sm, md, lg)
- Custom className support
- Accessibility attributes

### 2. ErrorBoundary Component

- Error catching and display
- Retry functionality
- Children rendering when no errors
- Error state management

### 3. WeatherInfo Component

- Loading, error, and success states
- Weather data display
- Location information
- Country code mapping
- Weather icon fallbacks
- Optional weather details

### 4. QuoteOfTheDay Component

- Quote display and formatting
- Author attribution
- Decorative elements
- Long quote handling
- Special characters

### 5. UserNameInput Component

- Modal visibility control
- Form validation
- localStorage integration
- User name persistence
- Edit vs. new user modes
- Keyboard interactions

### 6. Dashboard Component

- Complete dashboard rendering
- Data fetching states
- Error handling
- User name integration
- Greeting logic
- Date formatting
- Retry functionality

### 7. Utility Functions

- Weather icon mapping
- Country code conversion
- Greeting logic
- Date formatting
- localStorage utilities
- Error handling

## Mocking Strategy

### External Dependencies

- **SWR**: Mocked to control data fetching states
- **Framer Motion**: Simplified to avoid animation complexity
- **Next.js Image**: Mocked as regular img elements
- **localStorage**: Mocked for testing persistence

### Browser APIs

- **matchMedia**: Mocked for responsive design testing
- **IntersectionObserver**: Mocked for scroll-based features

## Best Practices

1. **Arrange-Act-Assert**: Clear test structure
2. **Descriptive Names**: Tests describe what they're testing
3. **Isolation**: Each test is independent
4. **Accessibility**: Test for proper ARIA attributes
5. **Edge Cases**: Test boundary conditions
6. **User Behavior**: Test actual user interactions

## Coverage Thresholds

- **Branches**: 70%
- **Functions**: 70%
- **Lines**: 70%
- **Statements**: 70%

## Debugging Tests

### Verbose Output

```bash
npm test -- --verbose
```

### Single Test File

```bash
npm test -- Dashboard.test.tsx
```

### Single Test

```bash
npm test -- -t "renders loading state"
```

## Continuous Integration

Tests run automatically on:

- Pull requests
- Main branch pushes
- Release deployments

## Adding New Tests

1. Create test file in appropriate directory
2. Follow naming convention: `ComponentName.test.tsx`
3. Import necessary testing utilities
4. Write descriptive test cases
5. Ensure proper mocking of dependencies
6. Test both success and error scenarios
7. Include accessibility tests
8. Update this README if needed

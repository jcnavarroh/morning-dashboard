# 📜 Available Scripts

This document describes all the available npm scripts in the Morning Dashboard project.

## 🚀 Development Scripts

### `npm run dev`

Starts the development server with hot reloading.

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

- **Port:** http://localhost:3000
- **Features:** Hot reloading, error overlay, development optimizations

### `npm run build`

Creates a production build of the application.

```bash
npm run build
```

- **Output:** `.next` directory with optimized production files
- **Features:** Code splitting, tree shaking, minification

### `npm start`

Starts the production server (must run `build` first).

```bash
npm run build
npm start
```

- **Use case:** Testing production build locally
- **Features:** Production optimizations, no hot reloading

## 🧪 Testing Scripts

### `npm test`

Runs all tests using Jest.

```bash
npm test
```

- **Coverage:** Generates coverage report
- **Watch mode:** Available with `npm run test:watch`
- **Configuration:** Uses `jest.config.js`

### `npm run test:watch`

Runs tests in watch mode for development.

```bash
npm run test:watch
```

- **Features:** Watches for file changes, re-runs tests automatically
- **Use case:** During development for immediate feedback

### `npm run test:coverage`

Generates a detailed coverage report.

```bash
npm run test:coverage
```

- **Output:** Coverage report in `coverage/` directory
- **Thresholds:** 70% coverage required for all metrics
- **Formats:** HTML, JSON, and LCOV reports

## 🔍 Code Quality Scripts

### `npm run lint`

Runs ESLint to check code quality and style.

```bash
npm run lint
```

- **Configuration:** Uses `eslint.config.mjs`
- **Rules:** Next.js recommended + custom rules
- **Auto-fix:** Available with `--fix` flag

### `npm run type-check`

Runs TypeScript compiler to check types without emitting files.

```bash
npm run type-check
```

- **Configuration:** Uses `tsconfig.json`
- **Purpose:** Validates type safety across the project
- **CI Integration:** Runs in all CI workflows

### `npm run format`

Formats all code files using Prettier.

```bash
npm run format
```

- **Files:** JavaScript, TypeScript, JSON, CSS, Markdown
- **Configuration:** Uses `.prettierrc` (if exists) or defaults

### `npm run format:check`

Checks if all files are properly formatted without making changes.

```bash
npm run format:check
```

- **Use case:** CI/CD pipelines to ensure consistent formatting
- **Fails:** If any files need formatting

## 📊 Analysis Scripts

### `npm run analyze`

Analyzes the bundle size and composition.

```bash
npm run analyze
```

- **Prerequisites:** Must run `npm run build` first
- **Output:** Bundle analysis in `.next/analyze/`
- **Use case:** Identifying large dependencies and optimization opportunities

## 🔄 CI/CD Integration

All scripts are integrated into the GitHub Actions workflows:

### **Basic CI (`ci.yml`)**

- `npm run lint`
- `npm test`
- `npm run build`

### **Enhanced CI/CD (`ci-enhanced.yml`)**

- `npm run lint`
- `npm run type-check`
- `npm run format:check`
- `npm test`
- `npm run test:coverage`
- `npm run build`
- `npm run analyze` (for PRs)

### **Test Suite (`test.yml`)**

- `npm run lint`
- `npm run type-check`
- `npm test`
- `npm run test:coverage`
- `npm run test:watch` (timeout after 30s)
- `npm run build`

## 📋 Script Dependencies

### **Development Dependencies Required**

```json
{
  "@testing-library/jest-dom": "^6.4.2",
  "@testing-library/react": "^14.2.1",
  "@testing-library/user-event": "^14.5.2",
  "@types/jest": "^29.5.12",
  "eslint": "^9",
  "eslint-config-next": "15.4.6",
  "jest": "^29.7.0",
  "jest-environment-jsdom": "^29.7.0",
  "typescript": "^5"
}
```

### **Configuration Files**

- `jest.config.js` - Jest configuration
- `jest.setup.js` - Jest setup and mocks
- `eslint.config.mjs` - ESLint configuration
- `tsconfig.json` - TypeScript configuration
- `tailwind.config.js` - Tailwind CSS configuration

## 🎯 Best Practices

### **Development Workflow**

1. Start development: `npm run dev`
2. Run tests: `npm test`
3. Check types: `npm run type-check`
4. Format code: `npm run format`
5. Lint code: `npm run lint`

### **Before Committing**

```bash
npm run lint
npm run type-check
npm run format:check
npm test
```

### **Before Pushing**

```bash
npm run build
npm run test:coverage
```

### **CI/CD Pipeline**

All scripts are automatically run in the appropriate workflows:

- **Pull Requests:** Full test suite + quality checks
- **Main Branch:** Full pipeline + deployment
- **Develop Branch:** Full pipeline + staging deployment

## 🐛 Troubleshooting

### **Common Issues**

#### **Tests Failing**

```bash
# Clear Jest cache
npx jest --clearCache

# Run tests with verbose output
npm test -- --verbose
```

#### **Type Errors**

```bash
# Check specific file
npx tsc --noEmit path/to/file.ts

# Check with strict mode
npx tsc --noEmit --strict
```

#### **Linting Issues**

```bash
# Auto-fix linting issues
npm run lint -- --fix

# Check specific file
npx eslint path/to/file.ts
```

#### **Build Failures**

```bash
# Clear Next.js cache
rm -rf .next

# Rebuild
npm run build
```

### **Performance Issues**

```bash
# Analyze bundle size
npm run analyze

# Check for large dependencies
npm ls --depth=0
```

## 📚 Additional Resources

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [ESLint Documentation](https://eslint.org/docs/user-guide/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Next.js Scripts](https://nextjs.org/docs/basic-features/scripts)
- [Prettier Configuration](https://prettier.io/docs/en/configuration.html)

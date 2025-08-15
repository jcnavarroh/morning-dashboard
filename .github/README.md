# GitHub Workflows & Configuration

This directory contains all GitHub Actions workflows and configuration files for the Morning Dashboard project.

## 📁 File Structure

```
.github/
├── workflows/
│   ├── ci.yml                    # Basic CI pipeline
│   ├── ci-enhanced.yml           # Enhanced CI/CD pipeline
│   ├── test.yml                  # Dedicated test suite
│   ├── security.yml              # Security audits and scans
│   └── deploy.yml                # Deployment automation
├── CODEOWNERS                    # Code ownership definitions
├── dependabot.yml                # Automated dependency updates
├── branch-protection.yml         # Branch protection rules
└── README.md                     # This file
```

## 🔄 Workflows

### 1. Basic CI (`ci.yml`)

**Triggers:** Push to main/develop, PR to main
**Purpose:** Basic build and test validation

- ✅ Checkout repository
- ✅ Setup Node.js 20.x
- ✅ Install dependencies
- ✅ Run linting
- ✅ Run tests
- ✅ Build project

### 2. Enhanced CI/CD (`ci-enhanced.yml`)

**Triggers:** Push to main/develop, PR to main, manual dispatch
**Purpose:** Comprehensive quality assurance and deployment

**Jobs:**

- **Quality Checks:** Linting, type checking, formatting, security audit
- **Testing:** Unit tests, coverage reports, watch mode testing
- **Build:** Application build with artifact upload
- **Bundle Analysis:** Bundle size analysis for PRs
- **Deploy Staging:** Automatic deployment to staging (develop branch)
- **Deploy Production:** Automatic deployment to production (main branch)
- **Notifications:** Success/failure notifications

### 3. Test Suite (`test.yml`)

**Triggers:** Push to main/develop, PR to main/develop
**Purpose:** Comprehensive testing across multiple Node.js versions

**Jobs:**

- **Test Matrix:** Runs tests on Node.js 18.x and 20.x
- **Test Watch:** Validates watch mode functionality
- **Build Test:** Verifies build process

### 4. Security Audit (`security.yml`)

**Triggers:** Push to main/develop, PR to main/develop, weekly schedule
**Purpose:** Security scanning and dependency analysis

**Jobs:**

- **Security Audit:** npm audit with moderate level threshold
- **Dependency Review:** Automated dependency review for PRs
- **CodeQL Analysis:** Static code analysis for security vulnerabilities

### 5. Deploy (`deploy.yml`)

**Triggers:** Push to main/develop
**Purpose:** Automated deployment with notifications

**Jobs:**

- **Deploy Staging:** Deploy to staging environment (develop branch)
- **Deploy Production:** Deploy to production environment (main branch)
- **Notifications:** Deployment status notifications

## 🛡️ Branch Protection

### Protected Branches

- **main:** Production branch with strict protection
- **develop:** Development branch with moderate protection

### Protection Rules

- ✅ Required status checks (all workflows must pass)
- ✅ Pull request reviews (minimum 1 approval)
- ✅ Stale review dismissal
- ✅ Conversation resolution required
- ❌ No force pushes
- ❌ No branch deletion
- ✅ Fork syncing allowed

### Required Status Checks

- CI Next.js Landing Page
- Enhanced CI/CD Pipeline
- Test Suite
- Security Audit

## 👥 Code Ownership

### Global Owner

- **@ingjc:** Owner of all code and configurations

### Specific Ownership

- **Frontend Components:** `/components/`, `/app/`
- **Testing:** `/__tests__/`, `*.test.*`, `*.spec.*`
- **Configuration:** `package.json`, `tsconfig.json`, etc.
- **Documentation:** `*.md` files
- **Workflows:** `/.github/` directory

## 🔄 Dependabot

### Automated Updates

- **npm:** Weekly updates for JavaScript dependencies
- **GitHub Actions:** Weekly updates for workflow dependencies

### Ignored Updates

- Major version updates for critical dependencies:
  - `next`
  - `react`
  - `react-dom`
  - `typescript`

### Configuration

- **Assignees:** @ingjc
- **Labels:** dependencies, npm, github-actions
- **PR Limit:** 10 for npm, 5 for GitHub Actions

## 🔐 Security Features

### Automated Scans

- **npm audit:** Weekly security vulnerability scanning
- **CodeQL:** Static analysis for security issues
- **Dependency Review:** Automated review of new dependencies

### Security Thresholds

- **Audit Level:** Moderate (fails on moderate+ vulnerabilities)
- **Dependency Review:** Fails on moderate+ severity issues

## 🚀 Deployment

### Environments

- **Staging:** Automatic deployment from `develop` branch
- **Production:** Automatic deployment from `main` branch

### Deployment Process

1. ✅ All tests pass
2. ✅ Security checks pass
3. ✅ Build successful
4. 🚀 Deploy to Vercel
5. 📝 Create release (production only)
6. 🔔 Send notifications

### Deployment Tools

- **Vercel CLI:** For deployment to Vercel platform
- **GitHub Releases:** For production releases
- **GitHub Scripts:** For deployment notifications

## 📊 Monitoring & Notifications

### Success Notifications

- ✅ All checks passed successfully
- 🎉 Deployment completed
- 📈 Coverage reports uploaded

### Failure Notifications

- ❌ Some checks failed
- 🔍 Review logs for details
- 🚨 Security issues detected

## 🛠️ Local Development

### Running Workflows Locally

```bash
# Install act (GitHub Actions local runner)
brew install act

# Run specific workflow
act push -W .github/workflows/test.yml

# Run with specific event
act pull_request -W .github/workflows/ci-enhanced.yml
```

### Testing Workflows

```bash
# Validate workflow syntax
act --list

# Dry run workflow
act --dryrun
```

## 📝 Adding New Workflows

1. Create workflow file in `.github/workflows/`
2. Follow naming convention: `workflow-name.yml`
3. Add appropriate triggers and jobs
4. Update branch protection rules if needed
5. Test locally with `act`
6. Update this README

## 🔧 Troubleshooting

### Common Issues

- **Workflow not triggering:** Check trigger conditions and branch names
- **Permission errors:** Verify repository permissions and secrets
- **Build failures:** Check Node.js version and dependency compatibility
- **Deployment issues:** Verify Vercel token and environment variables

### Debug Commands

```bash
# Check workflow syntax
yamllint .github/workflows/

# Validate with act
act --list

# Check secrets (requires GitHub CLI)
gh secret list
```

## 📚 Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Dependabot Documentation](https://docs.github.com/en/code-security/dependabot)
- [CodeQL Documentation](https://docs.github.com/en/code-security/codeql-cli)
- [Vercel CLI Documentation](https://vercel.com/docs/cli)

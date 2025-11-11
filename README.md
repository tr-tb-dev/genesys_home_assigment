<p align="center">
  <img src="https://github.com/user-attachments/assets/798c60bb-153c-4161-86dc-6a264b525a96" alt="HN React" width="400" /> 
</p>

# HN - React 
[![Build](https://img.shields.io/badge/Build-Deployed-2EA44F)](https://tr-tb-dev.github.io/genesys_home_assigment/)
[![E2E Tests](https://img.shields.io/badge/E2E%20Tests-Report%20Available-007EC6)](https://tr-tb-dev.github.io/genesys_home_assigment/e2e/)
[![Coverage](https://img.shields.io/badge/Unit%20Coverage-View%20Report-9B40A5)](https://tr-tb-dev.github.io/genesys_home_assigment/coverage/)

# Features

* Modern React-based partial implementation(News, Top News) for Hacker News
* Material-UI components
* TypeScript codebase
* Real time post and comment update with Firebase WebSocket 
* List and grid view layouts for posts
* Page setting options with localStorage saving
* Navigation between Top Posts and New Posts
* Pagination support for browsing through pages
* Comment viewing for posts
* Internationalization (i18n) support with react-intl
* E2E testing with Playwright
* UNIT testing with Vitest

# Live Demo & Reports

* **Live Demo:** [https://tr-tb-dev.github.io/genesys_home_assigment/](https://tr-tb-dev.github.io/genesys_home_assigment/)
* **E2E Test Report:** [https://tr-tb-dev.github.io/genesys_home_assigment/e2e/](https://tr-tb-dev.github.io/genesys_home_assigment/e2e/)
* **Unit Coverage Report:** [https://tr-tb-dev.github.io/genesys_home_assigment/coverage/](https://tr-tb-dev.github.io/genesys_home_assigment/coverage/)

# Further improvement possibilities
* Continue Hacker News feature implementation ( polls etc..)
* Saving user settings from localStore to cloud-based settings (FlagSmith)(authentication required)
* Multi-language support with translation management tool (Crowdin)

# RUN

## Build

```bash
npm run dev
```
## Test

```bash
npm run test
npm run test:coverage
npm run test:e2e
npm run test:e2e:report
```


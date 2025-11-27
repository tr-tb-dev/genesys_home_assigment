<p align="center">
  <img src="https://github.com/user-attachments/assets/798c60bb-153c-4161-86dc-6a264b525a96" alt="HN React" width="400" /> 
</p>

# Hacker News - React variant implementation

[![Build](https://img.shields.io/badge/Build-Deployed-2EA44F)](https://tr-tb-dev.github.io/hacker_news_react/)
[![E2E Tests](https://img.shields.io/badge/E2E%20Tests-Report%20Available-007EC6)](https://tr-tb-dev.github.io/hacker_news_react/e2e/)
[![Coverage](https://img.shields.io/badge/Unit%20Coverage-View%20Report-9B40A5)](https://tr-tb-dev.github.io/hacker_news_react/coverage/)

# Features

- Modern React-based partial implementation(News, Top News) for Hacker News
- Material-UI components
- Real time post and comment update with Firebase WebSocket
- List and grid view layouts for posts
- Page setting options with localStorage saving
- Navigation between Top Posts and New Posts
- Pagination support for browsing through pages
- Comments viewing for posts
- Multilanguage support for static text elements

# Technical stack

- React, Redux, Redux-Saga, Tanstack - React
- Typescript
- react-intl Internationalization support
- E2E testing with Playwright with demonstrational purposes
- UNIT testing with Vitest with demonstrational purposes

# Live Demo & Reports

- **Live Demo:** [https://tr-tb-dev.github.io/hacker_news_react/](https://tr-tb-dev.github.io/hacker_news_react/)
- **E2E Test Report:** [https://tr-tb-dev.github.io/hacker_news_react/e2e/](https://tr-tb-dev.github.io/hacker_news_react/e2e/)
- **Unit Test Coverage Report:** [https://tr-tb-dev.github.io/hacker_news_react/coverage/](https://tr-tb-dev.github.io/hacker_news_react/coverage/)

# Further improvement & ideas

- Add more unit tests to reach more code coverage over the codebase
- Continue Hacker News feature implementation ( polls etc..)
- Saving user settings from localStore to cloud-based settings (FlagSmith)(authentication required)
- Multi-language support with translation management tool (Crowdin)

# RUN

## Build

```bash
npm i
npm run dev
```

## Tests

```bash
npm run test
npm run test:coverage
npm run test:e2e
npm run test:e2e:report
```

<p align="center">
  <img src="https://github.com/user-attachments/assets/249ac603-d04c-4c32-afd3-ea11f6ef2578" alt="HN React Site - Comments - light" width="80%"/> 
</p>
<p></p>
<p align="center">
  <img src="https://github.com/user-attachments/assets/926e9bf2-2235-4ea2-b1f8-c3cafc26f0e2" alt="HN React Site - New Posts - dark" width="80%"/> 
</p>

import { test, expect } from '@playwright/test';

const getBaseUrl = () => {
  return process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:5173';
};

const getUrl = (path: string) => {
  const baseUrl = getBaseUrl();
  const cleanBase = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${cleanBase}${cleanPath}`;
};

test.describe('Home Page', () => {
  test('should load the home page and display posts', async ({ page }) => {
    await page.goto(getUrl('/'));

    await page.waitForSelector('[data-testid="post-list-item"], [data-testid="post-grid-item"]', {
      timeout: 30000,
    });

    const posts = await page.locator('[data-testid="post-list-item"], [data-testid="post-grid-item"]').count();
    expect(posts).toBeGreaterThan(0);
  });

  test('should navigate to post comments from top page', async ({ page }) => {
    await page.goto(getUrl('/'));

    await page.click('[data-testid="nav-top-posts"]');

    await page.waitForSelector('[data-testid="post-list-item"], [data-testid="post-grid-item"]', {
      timeout: 30000,
    });

    await page.waitForSelector('[data-testid="post-comments-link"]', {
      timeout: 30000,
    });

    const firstCommentLink = page.locator('[data-testid="post-comments-link"]').first();
    await firstCommentLink.click();

    await expect(page.url()).toContain('/comments/');

    await page.waitForSelector('[data-testid="comment-item"]', {
      timeout: 30000,
    });

    const comments = await page.locator('[data-testid="comment-item"]').count();
    expect(comments).toBeGreaterThan(0);
  });
});

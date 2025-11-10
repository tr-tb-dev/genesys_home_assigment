import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test('should load the home page and display posts', async ({ page }) => {
    await page.goto('/');

    await page.waitForSelector('[data-testid="post-list-item"], [data-testid="post-grid-item"]', {
      timeout: 10000,
    });

    const posts = await page.locator('[data-testid="post-list-item"], [data-testid="post-grid-item"]').count();
    expect(posts).toBeGreaterThan(0);
  });

  test('should navigate to post comments from top page', async ({ page }) => {
    await page.goto('/top');

    await page.waitForSelector('[data-testid="post-list-item"], [data-testid="post-grid-item"]', {
      timeout: 10000,
    });

    await page.waitForSelector('[data-testid="post-comments-link"]', {
      timeout: 10000,
    });

    const firstCommentLink = page.locator('[data-testid="post-comments-link"]').first();
    await firstCommentLink.click();

    await expect(page.url()).toContain('/comments/');

    await page.waitForSelector('[data-testid="comment-item"]', {
      timeout: 10000,
    });

    const comments = await page.locator('[data-testid="comment-item"]').count();
    expect(comments).toBeGreaterThan(0);
  });
});

import { test, expect } from '@playwright/test';
import { WAIT_OPTIONS_SMALL } from './types/timeouts';
import { getUrl } from './helpers/url';
import { homePage } from './pageObjects/HomePage';

test.describe('Home Page', () => {
  test('load the home page and display posts', async ({ page }) => {
    await page.goto(getUrl('/'));

    await page.waitForSelector(homePage.postItems, WAIT_OPTIONS_SMALL);

    const posts = await page.locator(homePage.postItems).count();
    expect(posts).toBeGreaterThan(0);
  });

  test('navigate to top posts and display posts', async ({ page }) => {
    await page.goto(getUrl('/'));

    await page.click(homePage.navTopPosts);

    await page.waitForSelector(homePage.postItems, WAIT_OPTIONS_SMALL);

    const posts = await page.locator(homePage.postItems).count();
    expect(posts).toBeGreaterThan(0);
  });

  test('navigate to top posts and back to new posts', async ({ page }) => {
    await page.goto(getUrl('/'));
    await page.click(homePage.navTopPosts);
    await page.waitForSelector(homePage.postItems, WAIT_OPTIONS_SMALL);
    await page.click(homePage.navNewPosts);
    await page.waitForSelector(homePage.postItems, WAIT_OPTIONS_SMALL);

    const posts = await page.locator(homePage.postItems).count();
    expect(posts).toBeGreaterThan(0);
  });

  test('navigate to second page using pagination', async ({ page }) => {
    await page.goto(getUrl('/'));
    await page.waitForSelector(homePage.postItems, WAIT_OPTIONS_SMALL);
    await page.click(homePage.paginationNext);
    await page.waitForSelector(homePage.postItems, WAIT_OPTIONS_SMALL);

    expect(page.url()).toContain('page=2');
  });
});

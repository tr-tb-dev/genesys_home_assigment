import { test, expect } from '@playwright/test';
import { WAIT_OPTIONS_SMALL, WAIT_OPTIONS_MEDIUM } from './types/timeouts';
import { getUrl } from './helpers/url';
import { homePage } from './pageObjects/HomePage';
import { commentsPage } from './pageObjects/CommentsPage';

test.describe('Comments Page', () => {
  test('navigate to comments from top posts', async ({ page }) => {
    await page.goto(getUrl('/'));
    await page.click(homePage.navTopPosts);
    await page.waitForSelector(homePage.postItems, WAIT_OPTIONS_SMALL);
    await page.waitForSelector(homePage.postCommentsLink, WAIT_OPTIONS_SMALL);
    const firstCommentLink = page.locator(homePage.postCommentsLink).first();

    await firstCommentLink.click();
    await page.waitForSelector(commentsPage.commentItem, WAIT_OPTIONS_MEDIUM);

    const comments = await page.locator(commentsPage.commentItem).count();
    expect(comments).toBeGreaterThan(0);
  });
});

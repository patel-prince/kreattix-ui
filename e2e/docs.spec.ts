import { expect, test } from '@playwright/test';

test.describe('Kreattix UI Docs E2E', () => {
  test('landing page loads with zero overflow and interactive toasts', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();

    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth
    );
    expect(overflow).toBe(false);

    await page.getByRole('button', { name: 'Publish Changes' }).click();
    await expect(page.getByText('Changes published!', { exact: true })).toBeVisible();
  });

  test('sections gallery filters 82 sections and toggles TSX view', async ({ page }) => {
    await page.goto('/docs/sections');
    await expect(page.getByText('82 Readymade Sections')).toBeVisible();

    await page.getByRole('button', { name: /Pricing & Billing/ }).click();
    await expect(page.getByText('PricingThreeTier')).toBeVisible();

    await page.getByRole('button', { name: 'View TSX' }).first().click();
    await expect(page.getByText("import { PricingThreeTier } from '@kreattix/ui/sections'")).toBeVisible();
  });

  test('DataGrid & DatePicker interactive playgrounds work', async ({ page }) => {
    await page.goto('/docs/components/data-grid');
    await page.getByPlaceholder('Search rows...').fill('Cara');
    await expect(page.getByText('Cara Diaz')).toBeVisible();

    await page.goto('/docs/components/date-picker');
    const trigger = page.getByRole('button', { name: /Release Date/i });
    await trigger.click();
    await page.getByRole('button', { name: '15', exact: true }).click();
    await expect(trigger).toContainText('15');
  });

  test('Ctrl+K Quick Jump lists 67 components', async ({ page }) => {
    await page.goto('/');
    await page.keyboard.press('Control+k');
    await expect(page.getByText('Search all 67 Kreattix UI components')).toBeVisible();
    await page.keyboard.press('Escape');
  });
});

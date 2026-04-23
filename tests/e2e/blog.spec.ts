import { expect, test } from "@playwright/test";

test("home shows hero and latest posts", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: "GAME START" })).toBeVisible();
  await expect(
    page.getByRole("link", { name: "마크다운 스타일 가이드 & 컴포넌트 쇼케이스" }),
  ).toBeVisible();
});

test("post page shows metadata, toc, content, and theme toggle", async ({ page }) => {
  await page.goto("/posts/building-a-brand-led-blog");

  await expect(
    page.getByRole("heading", { name: "마크다운 스타일 가이드 & 컴포넌트 쇼케이스" }),
  ).toBeVisible();
  await expect(page.getByLabel("목차")).toBeVisible();
  await expect(page.getByRole("heading", { name: "텍스트 서식" })).toBeVisible();
  await page.getByRole("button", { name: "테마 전환" }).click();
  await expect(page.locator("html")).toHaveClass(/dark/);
});

test("share button copies the post url", async ({ page, context }) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/posts/building-a-brand-led-blog");

  await page.getByRole("button", { name: "링크 복사" }).click();
  await expect(page.getByRole("button", { name: "링크 복사됨" })).toBeVisible();

  const copied = await page.evaluate(() => navigator.clipboard.readText());
  expect(copied).toContain("/posts/building-a-brand-led-blog");
});

//npx playwright test

// @ts-check
const { test, expect } = require('@playwright/test');

let page;

test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    await page.goto('http://127.0.0.1:5501/index.html');
});

test.afterAll(async () => {
    await page.close();
});

test.describe('Testing the HTML page: index.html', () => {

    test('у Тега html есть lang аттрибут', async () => {
        const html = page.locator('html');
        await expect(html).toHaveAttribute('lang', 'ru');
    });


    test.describe('Тестирование секции head', async () => {
        test.describe.configure({ mode: 'serial' });

        test('Тег head есть в index.html', async () => {
            const hd = page.locator('head');
            await expect(hd).not.toBeEmpty();
        });

        test('Тег Title есть в head section', async () => {
            await expect(page).toHaveTitle('Разметка страницы');
        });

        test('Секция head содержит charset meta tag', async () => {
            const charset = page.locator('head > meta[charset]');
            await expect(charset).toHaveAttribute('charset', /^UTF-8$/i);
        });
    });


    test.describe('Тестируем секцию body', async () => {
        test('Есть h1 и он не пустой', async () => {
            const h1 = page.locator('h1');
            await expect(h1).toBeVisible();
            await expect(h1).not.toBeEmpty();
        });

        test('body содержит 3 секции', async () => {
            const sec = page.locator('section');
            await expect(sec).toHaveCount(3);
        });
    });


    test('Титл есть и он равен указанному', async ({ page }) => {
        await page.goto('http://127.0.0.1:5501/index.html');
        // Expect a title "to contain" a substring.
        await expect(page).toHaveTitle("Разметка страницы");
    });

    test('Тег Заголовок существует', async () => {
        const header = page.locator('header');
        await expect(header).toBeVisible();
    });

    test('Тег nav существует внутри header', async () => {
        const nav = page.locator('header > nav');
        await expect(nav).toBeVisible();
    });

    test('Картинка logo существует внутри header', async () => {
        const logo = page.locator('header > img');
        await expect(logo).toBeVisible();
    });

    test('Есть 4 ссылки внутри menu', async () => {
        const links = page.locator('header > nav > ul a');
        await expect(links).toHaveCount(4);
    });

    test('Картинка logo есть атирбут Alt и равен указанному', async () => {
        const locator = page.locator('header > img');
        await expect(locator).toHaveAttribute('alt', 'logo_pic');
    });

    test('Картинка logo есть атирбут Alt с любым текстом', async () => {
        const locator = page.locator('header > img');
        await expect(locator).toHaveAttribute('alt', /.+/);
    });

    test('Переход на Гугл', async () => {
        await page.getByText('Гугл').click();
        const currentUrl = await page.url();
        console.log('Текущий URL:', currentUrl);
        await expect(page).toHaveURL(/[^.]*google\.com[^.]*/);
    });


});

console.log('end');


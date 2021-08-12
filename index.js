const desktopScreenshot = require('desktop-screenshot');
const screenshotDesktop = require('screenshot-desktop');
const { capturePrimaryMonitor } = require('windows-ss');
const fs = require('fs');
const { performance } = require('perf_hooks');

if (!process.env.RUNS) process.env.RUNS = 1000;
if (!process.env.FORMAT) process.env.FORMAT = 'bmp';

fs.mkdirSync('./out', { recursive: true });

const functions = [
	windowsSSFile,
	windowsSSBuffer,
	screenshotDesktopFile,
	screenshotDesktopBuffer,
	desktopScreenshotFile,
];

(async () => {
	for (const func of functions) {
		const start = performance.now();
	
		for (let i = 0, l = process.env.RUNS; i < l; ++i) {
			await func();
		}
	
		console.log(`${func.name}: ${performance.now() - start}ms`);
	}
})();

async function windowsSSFile() {
	await capturePrimaryMonitor({ save: `./out/windows-ss.${process.env.FORMAT}` });
}

async function windowsSSBuffer() {
	await capturePrimaryMonitor({ format: process.env.FORMAT });
}

async function screenshotDesktopFile() {
	await screenshotDesktop({ filename: `./out/screenshot-desktop.${process.env.FORMAT}`, });
}

async function screenshotDesktopBuffer() {
	await screenshotDesktop({ format: process.env.FORMAT });
}

async function desktopScreenshotFile() {
	await new Promise((resolve, reject) => {
		desktopScreenshot(`./out/desktop-screenshot.${process.env.FORMAT}`, (err) => {
			if (err) {
				reject(err);
	
				return;
			}
	
			resolve();
		});
	});
}
# Auto-Close Window Browser Extension

A Chrome browser extension that automatically closes specific tabs after a 3-second delay based on user-defined domain and page title matches.

## Features

- **Automated Tab Closure**: Closes tabs that match your criteria after a short delay (3 seconds).
- **Safe Matching**: Match tabs by domain (e.g., `example.com`) and title substring (e.g., `Specific Page`).
- **Easy Configuration**: Simple options page to manage your auto-close rules.
- **Persistence**: Rules are saved using `chrome.storage.sync` and stay synced across your browsers.

## Installation

### For Developers (Manual Load)

1. Clone or download this repository.
2. Open your browser and navigate to the extensions page:
   - **Chrome**: `chrome://extensions/`
   - **Edge**: `edge://extensions/`
3. Enable **Developer mode** (usually a toggle in the top right or side menu).
4. Click **Load unpacked** and select the project root directory.

## Usage

1. Click the extension icon in your browser toolbar.
2. Add pairs of **Domain** and **Title substring**:
   - **Domain**: Matches if the tab's hostname contains this string (e.g., `youtube.com`).
   - **Title substring**: Matches if the tab's title contains this string (e.g., `Distracting Video`).
3. Click **Save**.
4. Any tab matching these criteria will now automatically close 3 seconds after it finishes loading.

## Project Structure

- `manifest.json`: Extension configuration and permissions.
- `background.js`: Service worker handling the tab monitoring and closing logic.
- `popup.html` / `popup.js`: The user interface and logic for the settings page.
- `Makefile`: Build script for packaging the extension.

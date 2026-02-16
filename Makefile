
PHONY=build-chrome build-firefox clean all

all: clean build-all
	echo "Build all complete!"

build-all: build-chrome build-firefox

build-chrome:
	mkdir -p out/chrome

	cp manifest-chrome.json out/chrome/manifest.json
	cp background.js out/chrome
	cp popup.html out/chrome
	cp popup.js out/chrome

	zip out/chrome/auto-close-ignite.zip *

	@echo "Build Chrome complete."

build-firefox:
	mkdir -p out/firefox
	cp manifest-firefox.json out/firefox/manifest.json
	cp background.js out/firefox
	cp popup.html out/firefox
	cp popup.js out/firefox

	zip out/firefox/auto-close-ignite.zip *

	@echo "Build Firefox complete."

clean:
	rm -rf out
	@echo "Clean complete."
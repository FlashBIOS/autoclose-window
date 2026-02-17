
.PHONY=build-chrome build-firefox build-all clean all

SOURCES=background.js popup.html popup.js

all:
	$(MAKE) clean
	$(MAKE) build-all
	@echo "Make all complete!"

build-all: build-chrome build-firefox
	@echo "Build all complete."

build-chrome:
	mkdir -p out/chrome

	cp manifest-chrome.json out/chrome/manifest.json
	cp $(SOURCES) out/chrome

	cd out/chrome && zip -qr auto-close-ignite.zip manifest.json $(SOURCES)

	@echo "Build Chrome complete."

build-firefox:
	mkdir -p out/firefox
	cp manifest-firefox.json out/firefox/manifest.json
	cp $(SOURCES) out/firefox

	cd out/firefox && zip -qr auto-close-ignite.zip manifest.json $(SOURCES)

	@echo "Build Firefox complete."

clean:
	rm -rf out
	@echo "Clean complete."
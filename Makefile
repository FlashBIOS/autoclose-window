
.PHONY=build-chrome build-firefox build-all clean all

SOURCES=manifest.json background.js popup.js popup.html

all:
	$(MAKE) clean
	$(MAKE) build-all
	@echo "Make all complete!"

build-all: build-chrome build-firefox
	@echo "Build all complete."

build-chrome:
	mkdir -p out/chrome

	cp popup.html chrome/* out/chrome

	cd out/chrome && zip -qr auto-close-ignite.zip $(SOURCES)

	@echo "Build Chrome complete."

build-firefox:
	mkdir -p out/firefox

	cp popup.html firefox/* out/firefox

	cd out/firefox && zip -qr auto-close-ignite.zip $(SOURCES)

	@echo "Build Firefox complete."

clean:
	rm -rf out
	@echo "Clean complete."
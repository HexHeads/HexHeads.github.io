deploy:
	make build;
	make image-amd64;

image-amd64:
	cp -r dist container/;
	docker build --platform=linux/amd64 --no-cache -t hh-app:amd64 ./container;

build:
	rm -rf dist;
	rm -rf css;
	rm -rf fonts;
	rm -rf img;
	rm -rf js;
	rm favicon.ico;
	rm index.html;

	npm run build;
	mv dist/* ./

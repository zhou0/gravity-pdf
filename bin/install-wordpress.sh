#!/usr/bin/env bash

# Download and unpack WordPress.
curl -sL https://wordpress.org/nightly-builds/wordpress-latest.zip -o ./tmp/wordpress-latest.zip
unzip -q ./tmp/wordpress-latest.zip -d ./tmp
mkdir -p wordpress/src
mv ./tmp/wordpress/* wordpress/src

# Create the upload directory with permissions that Travis can handle.
mkdir -p wordpress/src/wp-content/uploads
chmod 767 wordpress/src/wp-content/uploads

# Grab the tools we need for WordPress' local-env.
curl -sL https://github.com/WordPress/wordpress-develop/archive/master.zip -o ./tmp/wordpress-develop.zip
unzip -q ./tmp/wordpress-develop.zip -d ./tmp
mv \
./tmp/wordpress-develop-master/tools \
./tmp/wordpress-develop-master/tests \
./tmp/wordpress-develop-master/.env \
./tmp/wordpress-develop-master/docker-compose.yml \
./tmp/wordpress-develop-master/wp-cli.yml \
./tmp/wordpress-develop-master/*config-sample.php \
./tmp/wordpress-develop-master/package.json wordpress

# Install WordPress.
WP_DEVELOP_DIR=./wordpress

cd wordpress
npm install dotenv wait-on
npm run env:start
sleep 10
npm run env:install
cd ..

# Connect Gutenberg to WordPress.
npm run env connect
npm run env cli plugin activate gravity-forms-pdf-extended

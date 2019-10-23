#!/usr/bin/env bash

GF_LICENSE=$GF_LICENSE || $1

# Add new variables / override existing if .env file exists
if [ -f ".env" ]; then
    set -a
    source .env
    set +a
fi

# Download and unpack WordPress.
rm -Rf wordpress && rm -Rf tmp/wordpress && rm -Rf tmp/wordpress-develop-master
#curl -L https://wordpress.org/nightly-builds/wordpress-latest.zip -o ./tmp/wordpress-latest.zip
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

cd wordpress || exit
npm install dotenv wait-on
npm run env:start
sleep 10
npm run env:install
cd ..

# Connect Gravity PDF to WordPress.
npm run env connect
npm run env cli plugin install gravityformscli --force --activate
npm run env cli --quiet "gf install --key=$GF_LICENSE --activate --force"
npm run env cli plugin activate gravity-forms-pdf-extended

# Mark as Fresh Install
npm run env cli option add freshinstall yes

# Output Connection Details
CURRENTURL=$(npm run --silent env cli option get siteurl)

echo "Welcome to..."
echo "_____             _ _          _____ ____  _____  "
echo "|   __|___ ___ _ _|_| |_ _ _   |  _  |    \\|   __|"
echo "|  |  |  _| .'| | | |  _| | |  |   __|  |  |   __| "
echo "|_____|_| |__,|\\_/|_|_| |_  |  |__|  |____/|__|    "
echo ""
echo "Run yarn run build to build the latest version of Gravity PDF, then open $CURRENTURL/wp-login.php to get started."
echo ""
echo "Access the WP install using the following credentials:"
echo "Username: admin"
echo "Password: password"
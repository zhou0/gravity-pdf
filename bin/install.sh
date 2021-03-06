#!/usr/bin/env bash

GF_LICENSE="${GF_LICENSE:=$1}"

# Add new variables / override existing if .env file exists
if [[ -f ".env" ]]; then
    set -a
    source .env
    set +a
fi

bash ./bin/download-wordpress.sh
bash ./bin/install-wordpress.sh

# Connect Gravity PDF to WordPress.
npm run env connect
npm run env docker-run -- php composer install

bash ./bin/install-gravityforms.sh
npm run env cli plugin activate gravity-forms-pdf-extended

# Misc
bash ./bin/db.sh

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
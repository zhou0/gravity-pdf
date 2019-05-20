#!/bin/sh

URL=$1
LICENSE=$2

# Make sure the database is up and running
while ! mysqladmin ping -hmysql --silent; do
    echo 'Waiting for the database'
    sleep 1
done
echo 'The database is ready'

# Prepare our site

wp core config --dbname=local --dbuser=root --dbpass=root
wp core install --url="${URL}" --title=Sample --admin_user=admin --admin_password=admin --admin_email="email@test.com" --skip-email
wp plugin install gravityformscli
wp plugin activate gravityformscli
wp gf install --key=${LICENSE}
wp gf install gravityformspolls --key=${LICENSE}
wp gf install gravityformsquiz --key=${LICENSE}
wp gf install gravityformssurvey --key=${LICENSE}
wp plugin activate gravityforms gravityformspolls gravityformsquiz gravityformssurvey

# Setup Form / Test Entries
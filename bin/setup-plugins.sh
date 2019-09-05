#!/bin/bash

# Include useful environmentals / functions
. "$(dirname "$0")/env.sh"
. "$(dirname "$0")/functions.sh"

# Setting up Gravity Forms
echo -e $(status_message "Installing and configuring Gravity Forms")

docker-compose $DOCKER_COMPOSE_FILE_OPTIONS run --rm $CLI mkdir wp-content/plugins/test && touch wp-content/plugins/test/file && ls -la wp-content/plugins && ls -la wp-content/plugins/test

docker-compose $DOCKER_COMPOSE_FILE_OPTIONS run --rm $CLI plugin install gravityformscli --activate --force

docker-compose $DOCKER_COMPOSE_FILE_OPTIONS run --rm $CLI gf install --key=$GF_LICENSE --activate --force

# Setting up Gravity PDF
docker-compose $DOCKER_COMPOSE_FILE_OPTIONS run --rm $CLI plugin activate gravity-forms-pdf-extended
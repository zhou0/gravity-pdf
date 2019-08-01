#!/bin/bash

# Include useful environmentals / functions
. "$(dirname "$0")/env.sh"
. "$(dirname "$0")/functions.sh"

# Pre-loading Gravity Forms data
echo -e $(status_message "Pre-load Gravity Forms data")

for i in {1..5}
do
  FID=$(docker-compose $DOCKER_COMPOSE_FILE_OPTIONS run --rm -u 33 $CLI gf form create "Sample $i" --form-json='{"fields":[{"type":"text", "id": 1, "label": "Text"}]}' --porcelain)
  docker-compose $DOCKER_COMPOSE_FILE_OPTIONS run --rm -u 33 $CLI gf entry create $FID --field_1=value --quiet
done
#!/bin/bash

# Include useful environmentals / functions
. "$(dirname "$0")/env.sh"
. "$(dirname "$0")/functions.sh"

# Pre-loading Gravity Forms data
echo -e $(status_message "Pre-load Gravity Forms data")

for i in {1..5}
do
  FID=$(docker-compose $DOCKER_COMPOSE_FILE_OPTIONS run --rm -u 33 $CLI gf form create "Sample $i" --form-json='{"fields":[{"type":"text", "id": 1, "label": "Text"},{"type":"name", "id": 2, "label": "Name"},{"type":"email", "id": 3, "label": "Email"}]}' --porcelain)
  docker-compose $DOCKER_COMPOSE_FILE_OPTIONS run --rm -u 33 $CLI gf entry create $FID --field_1=value --quiet

  # Add PDF Configs
  if [[ $i -eq 3  ||  $i -eq 4 ]]; then
    docker-compose $DOCKER_COMPOSE_FILE_OPTIONS run --rm -u 33 $CLI eval "GPDFAPI::add_pdf(${FID}, [ 'name' => 'Sample', 'template' => 'zadani', 'filename' => 'Sample' ]);"
  fi
done
#!/bin/bash
# Fetch latest openapi.yaml from druid-cli master branch

OPENAPI_URL="https://raw.githubusercontent.com/highcard-dev/druid-cli/master/api/openapi.yaml"
OUTPUT_FILE="openapi.yaml"

echo "Fetching latest openapi.yaml from druid-cli master..."
curl -fsSL "$OPENAPI_URL" -o "$OUTPUT_FILE"

if [ $? -eq 0 ]; then
  echo "✅ Successfully downloaded openapi.yaml"
else
  echo "❌ Failed to download openapi.yaml"
  exit 1
fi

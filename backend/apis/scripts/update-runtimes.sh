#!/bin/bash

OLD_RUNTIME="nodejs18.x"
NEW_RUNTIME="nodejs22.x"

# Get a list of all enabled AWS regions
REGIONS=$(aws ec2 describe-regions --output text --query "Regions[].RegionName")

# For each region:
for REGION in $REGIONS; do
  echo "Processing region: $REGION"

  # List functions with the old runtime in the current region and extract FunctionNames
  aws lambda list-functions --region "$REGION" --output text \
    --query "Functions[?Runtime=='$OLD_RUNTIME'].FunctionName" | \
    grep -v '^$' | \
    xargs -I {} aws lambda update-function-configuration \
      --function-name "jngpaypal-staging" \
      --runtime "$NEW_RUNTIME" \
      --region "$REGION"
done

echo "Upgrade process completed for all regions."
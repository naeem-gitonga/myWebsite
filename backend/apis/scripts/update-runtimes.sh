#!/bin/bash

OLD_RUNTIME="nodejs18.x"
NEW_RUNTIME="nodejs22.x"

# Get a list of all enabled AWS regions
REGIONS=$(aws ec2 describe-regions --output text --query "Regions[].RegionName")

# For each region:
echo "Processing region: us-east-1"

# List functions with the old runtime in the current region and extract FunctionNames
# ! Change the function-name when you are ready to use
aws lambda list-functions --region "us-east-1" --output text \
  --query "Functions[?Runtime=='$OLD_RUNTIME'].FunctionName" | \
  grep -v '^$' | \
  xargs -I {} aws lambda update-function-configuration \
    --function-name "jngpaypal-" \
    --runtime "$NEW_RUNTIME" \
    --region "us-east-1" \
    --no-cli-pager --no-cli-auto-prompt 

echo "Upgrade process completed for all regions."
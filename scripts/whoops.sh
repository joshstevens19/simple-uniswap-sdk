#!/bin/bash

# If you ever build into src, run this script to clean up the mess

# Define the target directory (root/packages)
TARGET_DIR="$(dirname "$0")/../packages"

echo "Removing .map, .d.ts, and .js files from src directories..."

# Find and delete all .map, .d.ts, and .js files
find "$TARGET_DIR" -type f \( -name "*.map" -o -name "*.d.ts" -o -name "*.js" \) -exec rm -v {} +

echo "Cleanup complete!"

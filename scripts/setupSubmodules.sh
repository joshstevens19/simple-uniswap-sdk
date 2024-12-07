#!/bin/bash

echo "Initializing and updating all submodules recursively..."
git submodule update --init --recursive --remote

echo "Submodules have been initialized and updated."

# Navigate to each submodule in the submodules directory and perform pnpm install and build
for submodule in $(git config --file .gitmodules --name-only --get-regexp path | sed 's/^submodule\.//;s/\.path$//')
do
  echo "Processing submodule $submodule..."
  cd submodules/$submodule
  
  # If the submodule has its own submodules, initialize and update them recursively
  if [ -f .gitmodules ]; then
    echo "Initializing and updating submodules for $submodule..."
    git submodule update --init --recursive --remote
  fi
  
  cd ../..
done

echo "Submodule processing complete! Lerna will handle installation and building."
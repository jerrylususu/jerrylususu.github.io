#!/bin/bash

# Check if "hugo" exists in the current directory
if [ -x "$(pwd)/hugo" ]; then
  echo "Executable 'hugo' found in the current directory."
else
  echo "Executable 'hugo' not found. Downloading and extracting..."
  url="https://github.com/gohugoio/hugo/releases/download/v0.145.0/hugo_0.145.0_Linux-64bit.tar.gz"
  wget -q "$url" -O hugo.tar.gz
  tar -xzf hugo.tar.gz hugo
  rm hugo.tar.gz
  echo "Successfully extracted 'hugo'."
fi

./hugo serve
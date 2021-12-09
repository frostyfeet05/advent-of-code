#!/bin/bash
mkdir -p "year/$1/day/$2/puzzle/$3/"

if [ -f "year/$1/day/$2/puzzle/$3/index.ts" ]; then
  echo "Puzzle already exists, I won't overwrite"
else
  cp "scripts/template.ts" "year/$1/day/$2/puzzle/$3/index.ts"
fi

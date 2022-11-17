#!/bin/bash

if [ -f "year/$1/day/$2/puzzle/1/index.ts" -o -f "year/$1/day/$2/puzzle/2/index.ts" -o -f "year/$1/day/$2/puzzle/shared/index.ts" ]; then
  echo "Puzzles already exists, I won't overwrite"
else
  echo "Making folders and files for year $1 day $2..."

  mkdir -p "year/$1/day/$2/puzzle/1/"
  mkdir -p "year/$1/day/$2/puzzle/2/"
  mkdir -p "year/$1/day/$2/puzzle/shared/"

  cp "scripts/template-puzzle.txt" "year/$1/day/$2/puzzle/1/index.ts"
  cp "scripts/template-puzzle.txt" "year/$1/day/$2/puzzle/2/index.ts"
  cp "scripts/template-shared.txt" "year/$1/day/$2/puzzle/shared/index.ts"

  echo "Done! Good luck!"
  echo
fi

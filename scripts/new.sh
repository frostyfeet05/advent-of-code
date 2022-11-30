#!/bin/bash

if [ -f "puzzles/$1/$2/part-1.ts" -o -f "puzzles/$1/$2/part-2.ts" -o -f "puzzles/$1/$2/shared.ts" ]; then
  echo "Puzzles already exists, I won't overwrite"
else
  echo "Making folders and files for year $1 day $2..."

  mkdir -p "puzzles/$1/$2/"
  cp "scripts/template-puzzle.txt" "puzzles/$1/$2/part-1.ts"
  cp "scripts/template-puzzle.txt" "puzzles/$1/$2/part-2.ts"
  cp "scripts/template-shared.txt" "puzzles/$1/$2/shared.ts"

  echo "Done! Good luck!"
  echo
fi

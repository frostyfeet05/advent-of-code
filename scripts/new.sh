#!/bin/bash

if [ -f "src/$1/$2/part-1.ts" -o -f "src/$1/$2/part-2.ts" -o -f "src/$1/$2/shared.ts" ]; then
  echo "Puzzles already exists, I won't overwrite"
else
  echo "Making folders and files for year $1 day $2..."

  mkdir -p "src/$1/$2/"
  cp "scripts/template-puzzle.txt" "src/$1/$2/part-1.ts"
  cp "scripts/template-puzzle.txt" "src/$1/$2/part-2.ts"
  cp "scripts/template-shared.txt" "src/$1/$2/shared.ts"
  cp "scripts/template-test.txt" "src/$1/day-$2.spec.ts"

  echo "Done! Good luck!"
  echo
fi

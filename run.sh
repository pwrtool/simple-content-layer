#!/bin/bash

current_directory=`pwd`

# Run the script from the directory it is in
cd "$(dirname "$0")"


# Run the index.ts file
bun run ./index.ts $@

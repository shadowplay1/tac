#!/bin/bash

output=""


lint() {
    if [[ $1 == '--fix' ]]; then
        echo 'Fixing all fixable linting issues...'
        echo

        eslint ./src/commands/EconomyMain --fix & output=$(eslint ./src/commands/EconomyMain --fix)
    else
        echo 'Checking code for linting issues...'
        echo

        eslint ./src/commands/EconomyMain & output=$(eslint ./src/commands/EconomyMain)
    fi
}


lint $1

if [ -n "$output" ]; then
    echo 'Linting check failed.'
    exit 1
else
    echo 'Linting check passed!'
    exit 0
fi

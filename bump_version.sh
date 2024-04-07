#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

PACKAGE_JSON="$DIR/package.json"

if [ "$#" -ne 1 ]; then
    echo "Usage: $0 [major|minor|patch]"
    exit 1
fi

CURRENT_VERSION=$(grep -oP '"version": "\K(.*)(?=")' $PACKAGE_JSON)

if [ -z "$CURRENT_VERSION" ]; then
    echo "Version not found in $PACKAGE_JSON."
    exit 1
fi

IFS='.' read -ra VERSION_PARTS <<< "$CURRENT_VERSION"

case "$1" in
    major)
        ((VERSION_PARTS[0]++))
        VERSION_PARTS[1]=0
        VERSION_PARTS[2]=0
        ;;
    minor)
        ((VERSION_PARTS[1]++))
        VERSION_PARTS[2]=0
        ;;
    patch)
        ((VERSION_PARTS[2]++))
        ;;
    *)
        echo "Invalid argument: $1. Use 'major', 'minor', or 'patch'."
        exit 1
        ;;
esac

NEW_VERSION="${VERSION_PARTS[0]}.${VERSION_PARTS[1]}.${VERSION_PARTS[2]}"

sed -i "s/\"version\": \"$CURRENT_VERSION\"/\"version\": \"$NEW_VERSION\"/" $PACKAGE_JSON

if [ $? -eq 0 ]; then
    echo "Version updated to $NEW_VERSION in $PACKAGE_JSON."
else
    echo "Failed to update version in $PACKAGE_JSON."
    exit 1
fi

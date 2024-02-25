#!/bin/bash
echo "Start buildng frontend..."

dir=pickside-frontend

cd $DEV_WS/$dir

git fetch origin
git checkout release
git pull

echo "Removing node modules folder"
rm -rf node_modules


echo "Installing dependencies"
pnpm i


echo "Preparing build"
pnpm run build

echo "Copying build folder to static host"

sudo cp -r $DEV_WS/$dir/build/* /var/www/pickside/html

cd $HOME

echo "Done !"


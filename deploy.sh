#!/bin/bash
echo "Start buildng frontend..."

dir=pickside-frontend

cd $DEV_WS/$dir

git fetch origin
git checkout release
git pull
pnpm i
pnpm run build

echo "Copying build folder to static host"

sudo cp -r $DEV_WS/$dir/build/* /var/www/pickside/html

cd $HOME

echo "Done !"


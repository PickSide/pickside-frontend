#/bin/sh

export NVM_DIR=$HOME/.nvm
source $HOME/.nvm/nvm.sh
cd $HOME/pickside-frontend &&
    git checkout release &&
    git fetch --all &&
    git reset --hard origin/release &&
    git pull origin release &&
    npm ci &&
    npm run build &&
    sudo cp -r $HOME/pickside-frontend/build/* /var/www/pickside/html/

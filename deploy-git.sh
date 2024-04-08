VERSION=$(date +%s)
REPOSITORY_URL=https://github.com/llopez/jarvis.git
CURRENT_FOLDER=/home/luigi/apps/jarvis/current
SHARED_FOLDER=/home/luigi/apps/jarvis/shared
RELEASES_FOLDER=/home/luigi/apps/jarvis/releases
echo deploying version: $VERSION
echo 'pulling...'
ssh luigi@rb3.fibertel.com.ar git clone -b deployment $REPOSITORY_URL $RELEASES_FOLDER/$VERSION
echo 'linking...'
ssh luigi@rb3.fibertel.com.ar ln -s $RELEASES_FOLDER/$VERSION $CURRENT_FOLDER
ssh luigi@rb3.fibertel.com.ar ln -s $SHARED_FOLDER/.env.local $CURRENT_FOLDER/.env.local

# TODO: keep last 3 releases
# restart containers
#echo 'restarting...'
#ssh luigi@rb3.fibertel.com.ar "cd $CURRENT_FOLDER;docker compose -f compose-prod.yaml restart --build"

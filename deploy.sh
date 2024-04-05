VERSION=$(date +%s)
echo deploying version: $VERSION
echo 'compressing'
tar -czf jarvis-$VERSION.tar.gz -X deploy-exclude.txt .
echo 'copying'
scp jarvis-$VERSION.tar.gz luigi@rb3.fibertel.com.ar:/home/luigi/apps
echo 'creating dir'
ssh luigi@rb3.fibertel.com.ar mkdir -p /home/luigi/apps/jarvis-$VERSION
echo 'extracting'
ssh luigi@rb3.fibertel.com.ar tar -xzf /home/luigi/apps/jarvis-$VERSION.tar.gz -C /home/luigi/apps/jarvis-$VERSION

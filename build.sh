#!/bin/bash

docker exec dev-stack-bim-app-1 npm run build
docker exec dev-stack-bim-app-1 npm run deploy

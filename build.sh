#!/bin/bash

docker exec bim-app-bim-app-1 npm run build
docker exec bim-app-bim-app-1 npm run deploy

#!/bin/bash

echo "A. Grant full access to node-red folder..."
chmod 777 node-red

echo "B. Pull Docker images..."
docker image pull neo4j
docker image pull minio/minio
docker image pull node
docker image pull nodered/node-red
docker image pull eclipse-mosquitto

echo "C. Install node modules..."
docker run -v $(pwd)/bim-app:/usr/src/app -w /usr/src/app node npm install
docker run -v $(pwd)/bim-proxy:/usr/src/app -w /usr/src/app node npm install
docker run -v $(pwd)/node-red:/data -w /data node npm install

echo "D. Starting Docker containers..."
docker compose up -d

echo "E. Create manually the MinIO buckets:"
echo "1. Open http://localhost:9000"
echo "2. Create buckets named 'bim-app' and 'models'"
echo "3. Upload the samples from '/sample-models' to 'models' bucket"
echo "4. Grant Public Access to both 'bim-app' and 'models' buckets"
read -p "When ready select Y to continue? (Y/N): " confirm && [[ $confirm == [yY] || $confirm == [yY][eE][sS] ]] || exit 1

echo "F. Building the BIM App..."
docker exec bim-app-bim-app-1 npm run build
docker exec bim-app-bim-app-1 npm run deploy

echo "Setup complete!"
echo "Open http://localhost:5173 to access the development BIM App"
echo "Open http://localhost:9000/bim-app/index.html to access the deploied BIM App"
echo "Open http://localhost:3000/bim-app/index.html to access the deploied BIM App behind the proxy"
echo "Open http://localhost:1880 to access Node-RED"
echo "Open http://localhost:9000 to access MinIO"
echo "Use http://localhost:1883 entry to MQTT broker"
echo "Open http://localhost:7474 to access Neo4j"

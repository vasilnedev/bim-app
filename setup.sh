#!/bin/bash

echo "A. Grant full access to node-red folder to allow access for Node-Red server..."
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

echo "E. Create MinIO buckets:"
docker exec bim-app-minio-1 mc mb bim-app
docker exec bim-app-minio-1 mc mb models
docker exec bim-app-minio-1 mc mb documents

echo "F. Grant public access to all folders and upload sample model files:"
echo "1. Open http://localhost:9000"
echo "3. Upload the samples from '/sample-models' to 'models' bucket"
echo "4. Grant Public Access to all buckets buckets"
read -p "When ready select Y to continue? (Y/N): " confirm && [[ $confirm == [yY] || $confirm == [yY][eE][sS] ]] || exit 1

echo "G. Building the BIM App..."
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

# Bim App Full Stack

This repository creates a set of Docker Containers for development of a conterised IFC.js Bim App. It includs:
* front-end development folde and server (Vite)
* MinIO for app deployment and models repository
* Express proxy server to access the MinIO deployment
* Neo4j server for Graph Database 
* Node-RED and Mosquitto MQTT Containers for further development of IoT 
* Appache Tika for converting PDF to text

## Project Structure

### Build and Deployment

- `compose.yml`: Docker Compose file for setting up the environment.
- `build.sh`: Shell script to build the bim-app.

## Bim App

The `bim-app` directory contains the front-end application built with Vite.

### Scripts

- `deploy.js`: Script to upload files to a MinIO bucket. 

### Configuration

- `vite.config.js`: Configuration file for Vite.

## Bim Proxy

The `bim-proxy` directory contains the proxy Express server.

### Entry Point

- `index.js`: Main entry point for the proxy server.

## Node-RED

The `node-red` directory contains the Node-RED configuration files and dependencies.

## Mosquitto

The `mosquitto` directory contains the configuration for the Mosquitto MQTT broker.

## Sample Models

The `sample-models` directory contains sample models for the application.

## License

This project is licensed under the MIT License.

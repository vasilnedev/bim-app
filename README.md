# Bim App Stack

This repository contains a conterised Bim App. It includes:
* front-end development (bim-app) folder and server (Vite)
* MinIO - Object storage for application deployment and models
* Express (bim-proxy) proxy server to access the MinIO deployment
* Neo4j server for Graph Database 
* Node-RED (node-red) and Mosquitto MQTT Containers for further development of IoT 
* Appache Tika for converting PDF to text

## Project Structure

### Setup & Requirements
- requirements: Docker, Docker Compose and Bash
- `setup.sh`: Shell sctript to setup the application.

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

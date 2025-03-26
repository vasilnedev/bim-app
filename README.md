# Bim App Stack

This repository contains a conterised Bim App. It includes:
* bim-app - frontend UI and functionality and development server (Vite)
* bim-server - a Node.js Express API server to access Neo4j database and data manipulation
* MinIO - object storage for application deployment, BIM models and documents
* Neo4j server for Graph Database 
* Appache Tika for converting PDF to text

## Project Structure

### Setup & Requirements
- requirements: Docker, Docker Compose and Bash
- `setup.sh`: Shell sctript to setup the application.

### Build and Deployment

- `compose.yml`: Docker Compose file.
- `build.sh`: Shell script to build the bim-app.

## Bim App

The `bim-app` directory contains the front-end application built with Vite.

### Scripts

- `deploy.js`: Script to upload files to a MinIO bucket. 

### Configuration

- `vite.config.js`: Configuration file for Vite.

## Bim Server

The `bim-server` directory contains the API Express server.

### Entry Point

- `index.js`: Main entry point for the proxy server.

## Sample Models

The `sample-models` directory contains sample models for the application.

## License

This project is licensed under the MIT License.

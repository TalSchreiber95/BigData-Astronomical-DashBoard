#!/bin/bash

current_dir=$(pwd)
folder1="$current_dir/MicroServices/BatchLayer"
folder2="$current_dir/MicroServices/StreamLayer"
folder3="$current_dir/MicroServices/UniverseSimulator"
clientFolder="$current_dir/Client"

# Build Docker images for each microservice
# docker build "$folder1"
# docker build "$folder2"

# Start Docker containers for each microservice
docker compose up $folder1
docker compose up $folder2

# Start npm start commands in different folders
cd "$folder1"
npm start &

cd "$folder2"
npm start &

cd "$folder3"
npm start &

cd "$clientFolder"
npm start &



# chmod +x run_microservices.sh
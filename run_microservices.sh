#!/bin/bash

read -p "Enter the path to folder 1: " folder1
read -p "Enter the path to folder 2: " folder2
read -p "Enter the path to folder 3: " folder3
read -p "Enter the path to folder 4: " folder4
read -p "Enter the path to the client-side folder: " clientFolder
read -p "Enter the path to the BigData-Astronomical-DashBoard folder: " serverFolder

# Start npm start commands in different folders
cd "$folder1"
npm start &

cd "$folder2"
npm start &

cd "$folder3"
npm start &

cd "$folder4"
npm start &

# Build Docker images for each microservice
# docker build -t client-side "$clientFolder/client"
# docker build -t universe-simulator "$serverFolder/MicroServices/UniverseSimulator"

# Start Docker containers for each microservice
docker run -d --name client-container client-side
docker run -d --name universe-container universe-simulator


















#!/bin/bash

# # Start npm start commands in different folders
# cd C:\Users\DorYaakobi\VSCodeProjects\BigData-Astronomical-DashBoard\Client
# npm start &

# cd /path/to/folder2
# npm start &

# cd /path/to/folder3
# npm start &

# cd /path/to/folder4
# npm start &

# # Build Docker images for each microservice
# docker build -t client-side ./BigData-Astronomical-DashBoard/client
# docker build -t universe-simulator ./BigData-Astronomical-DashBoard/MicroServices/UniverseSimulator

# # Start Docker containers for each microservice
# docker run -d --name client-container client-side
# docker run -d --name universe-container universe-simulator


<div class="min-h-[20px] flex flex-col items-start gap-4 whitespace-pre-wrap">
  <div class="markdown prose w-full break-words dark:prose-invert dark">
    <h1>Astronomical Dashboard Project!</h1>
    <p>Welcome to the Astronomical-DashBoard! This repository contains the code for a microservices-based project that implements a comprehensive model of Astronomical details. The dashboard provides live information, interactive charts, and prediction abilities based on machine learning. By leveraging technologies such as React, Redis, Kafka, Elastic Search, and BigML, this project enables real-time data processing and generates valuable insights. Read on to learn how to get started with the project and explore the fascinating world of celestial objects and events.</h2>
    <p>The project is built on a microservices architecture, which allows for modularity and flexibility in development and deployment. The architecture is composed of the following microservices:</p>
    <h3>Client Display</h3>
    <p>The Client Display subsystem is responsible for rendering the dashboard and displaying real-time data streams and precomputed views. It is built on the React framework and uses Socket.IO to communicate with the Stream Layer subsystem and HTTP requests to communicate with the Batch Layer subsystem. The dashboard provides a visual representation of real-time astronomical data and insights generated from precomputed views.</p>
    <h3>Stream Layer</h3>
    <p>The Stream Layer subsystem is responsible for processing real-time data streams and providing up-to-date information to the dashboard. It uses Redis on Docker and a Kafka consumer on the cloud to ingest and process data streams in real-time. It also uses the Socket.IO protocol to communicate with the Client Display subsystem and provide real-time updates to the dashboard.</p>
    <h3>Batch Layer</h3>
    <p>The Batch Layer subsystem is responsible for processing large datasets offline and generating precomputed views of the data that are used by the client display. It uses Elastic Search on Docker for storing astronomical details that are displayed in the dashboard. It also uses a Kafka consumer on the cloud to ingest and process data streams in real-time. Additionally, it uses BigML cloud services for prediction abilities and MongoDB for storing all the astronomical details for the datasets of BigML. It communicates with the Client Display subsystem using HTTP requests.</p>
    <h3>MessageBroker (Simulator)</h3>
    <p>The MessageBroker subsystem simulates data events and streams that can be used to test the functionality of the other services. It generates synthetic data and simulates real-world scenarios to test the robustness and scalability of the system. It uses a simulator to publish astronomical data to a Kafka producer that produces data to the Kafka consumers on the Stream and Batch Layer microservices. The simulator can be controlled by the Client Display subsystem using HTTP requests.</p>
<h2>Getting Started</h2>
<p>To get started with this project, you will need to have Node.js and npm installed on your machine. If you don't have them already, you can download the latest version of Node.js from the official website at <a href="https://nodejs.org" target="_new">https://nodejs.org</a>. Once you have installed Node.js, you can verify the installation by running the following command in your terminal or command prompt:</p>
<pre><code>node -v
</code></pre>
<p>You should see the version number of Node.js printed to the console, indicating that it has been installed correctly.</p>
<p>To install the project dependencies, navigate to each project's subsystem and run the following command:</p>
<pre><code>npm install
</code></pre>
<p>This will install all the necessary packages listed in the package.json file.</p>
<h2>Running the Code</h2>
<p>To run the project, you need to start each subsystem individually in a separate terminal window.</p>
<p>To start the Client Display subsystem, navigate to the /client directory and run the following command:</p>
<pre><code>npm start
</code></pre>
<p>This will start the React application and display the Astronomical dashboard in your web browser.</p>
<p>To start the Stream Layer subsystem, navigate to the /streamlayer directory and run the following commands on two separate terminals:</p>
<pre><code>npm start
</code><code>docker compose up
</code></pre>
<p>This will start the Redis container in Docker and Kafka consumer on the cloud. The stream processing job will provide real-time data to the Astronomical dashboard.</p>
<p>To start the Batch Layer subsystem, navigate to the /batchlayer directory and run the following commands on two separate terminals:</p>
<pre><code>npm start
</code><code>docker compose up
</code></pre>
<p>This will start the batch processing job and generate the precomputed views. It will also start Elastic Search container in Docker and utilize cloud-based services such as MongoDB, Kafka consumer, and BigML.</p>
<p>To start the Message Broker (Simulator) subsystem, navigate to the /UniverseSimulator directory and run the following command:</p>
<pre><code>npm start
</code></pre>
<p>This will start the Universe Simulator server, which is controlled by HTTP requests.</p>
<h2>Conclusion</h2>
<p>The Astronomical-DashBoard project demonstrates how microservices can be used together to create a robust and scalable system for processing real-time Astronomical data and generating valuable insights. By utilizing technologies such as React, Redis, Kafka, Elastic Search, and BigML, this project showcases the development and deployment of modern big data systems in real-world scenarios.</p>
<h2>Contributing</h2>
<p>Contributions to this project are welcome! If you find a bug or have an idea for an improvement, feel free to open an issue or submit a pull request. Please follow the guidelines in the CONTRIBUTING.md file.</p>
<h2>License</h2>
<p>This project is licensed under the MIT License - see the LICENSE.md file for details.</p>

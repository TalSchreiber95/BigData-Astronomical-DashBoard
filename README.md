<div class="min-h-[20px] flex flex-col items-start gap-4 whitespace-pre-wrap">
  <div class="markdown prose w-full break-words dark:prose-invert dark">
    <h1>Pizza Dashboard Project</h1>
    <p>This repository contains the code for a microservices-based project that implements a dashboard for a pizza company. The dashboard displays live information and charts about orders and branch events, as well as order details and prediction abilities using machine learning on their data.</p>
    <h2>MicroServices</h2>
    <p>The project is built on a microservices architecture, which allows for modularity and flexibility in development and deployment. The architecture is composed of the following microservices:</p>
    <h3>Client Display</h3>
    <p>The Client Display subsystem is responsible for rendering the dashboard and displaying real-time data streams and precomputed views. It is built on the React framework and uses Socket.IO to communicate with the Stream Layer subsystem and HTTP requests to communicate with the Batch Layer subsystem. The dashboard provides a visual representation of the pizza company's real-time data and insights generated from precomputed views.</p>
    <h3>Stream Layer</h3>
    <p>The Stream Layer subsystem is responsible for processing real-time data streams and providing up-to-date information to the dashboard. It uses Redis on Docker and a Kafka consumer on the cloud to ingest and process data streams in real-time. It also uses the Socket.IO protocol to communicate with the Client Display subsystem and provide real-time updates to the dashboard.</p>
    <h3>Batch Layer</h3>
    <p>The Batch Layer subsystem is responsible for processing large datasets offline and generating precomputed views of the data that are used by the client display. It uses Elastic Search on Docker for storing order details that are displayed in the dashboard. It also uses a Kafka consumer on the cloud to ingest and process data streams in real-time. Additionally, it uses BigML cloud services for prediction abilities and MongoDB for storing all the orders details for the datasets of BigML. It communicates with the Client Display subsystem using HTTP requests.</p>
    <h3>MessageBroker (Simulator)</h3>
    <p>The MessageBroker subsystem simulates data events and streams that can be used to test the functionality of the other services. It generates synthetic data and simulates real-world scenarios to test the robustness and scalability of the system. It uses a simulator to publish pizza orders to a Kafka producer that produces orders to the Kafka consumers on the Stream and Batch Layer microservices. The simulator can be controlled by the Client Display subsystem using HTTP requests.</p>
    <h2>Getting Started</h2>
    <p>To get started with this project, you will need to have Node.js and npm installed on your machine. You can download the latest version of Node.js from the official website at <a href="https://nodejs.org" target="_new">https://nodejs.org</a>. Once you have installed Node.js, you can verify that it is installed correctly by running the following command in your terminal or command prompt:</p>
    <pre><div class="bg-black rounded-md mb-4"><div class="flex items-center relative text-gray-200 bg-gray-800 px-4 py-2 text-xs font-sans justify-between rounded-t-md"><button class="flex ml-auto gap-2"><svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg></button></div><div class="p-4 overflow-y-auto"><code class="!whitespace-pre hljs">node -v
</code></div></div></pre>
    <p>You should see the version number of Node.js printed to the console.</p>
    <p>To install the project dependencies, navigate to each project's subsystem and run the following command:</p>
    <pre><div class="bg-black rounded-md mb-4"><div class="flex items-center relative text-gray-200 bg-gray-800 px-4 py-2 text-xs font-sans justify-between rounded-t-md"><button class="flex ml-auto gap-2"><svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg></button></div><div class="p-4 overflow-y-auto"><code class="!whitespace-pre hljs">npm install
</code></div></div></pre>
    <p>This will install all the necessary packages listed in the package.json file.</p>
    <h2>Running the Code</h2>
    <p>To run the project, you need to start each subsystem individually in a separate terminal window.</p>
    </br>
    <p>To start the Client Display subsystem, navigate to the /client directory and run the following command:</p>
    <pre><div class="bg-black rounded-md mb-4"><div class="flex items-center relative text-gray-200 bg-gray-800 px-4 py-2 text-xs font-sans justify-between rounded-t-md"><button class="flex ml-auto gap-2"><svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg></button></div><div class="p-4 overflow-y-auto"><code class="!whitespace-pre hljs language-sql">npm <span class="hljs-keyword">start</span>
</code></div></div></pre>
    <p>This will start the React application and display the dashboard in your web browser.</p>
    </br>
    <p>To start the Stream Layer subsystem, navigate to the /streamlayer directory and run the following commands on 2 seperated terminals:</p>
    <pre><div class="bg-black rounded-md mb-4"><div class="flex items-center relative text-gray-200 bg-gray-800 px-4 py-2 text-xs font-sans justify-between rounded-t-md"><button class="flex ml-auto gap-2"><svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg></button></div><div class="p-4 overflow-y-auto"><code class="!whitespace-pre hljs">npm start
</code><code class="!whitespace-pre hljs">docker-compose up
</code></div></div></pre>
    <p>This will start the Redis container in Docker and Kafka consumer on cloud, and the stream processing job will provide real-time data to the dashboard.</p>
    </br>
    <p>To start the Batch Layer subsystem, navigate to the /batchlayer directory and run the following commands on 2 seperated terminals:</p>
    <pre><div class="bg-black rounded-md mb-4"><div class="flex items-center relative text-gray-200 bg-gray-800 px-4 py-2 text-xs font-sans justify-between rounded-t-md"><button class="flex ml-auto gap-2"><svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg></button></div><div class="p-4 overflow-y-auto"><code class="!whitespace-pre hljs language-sql">npm <span class="hljs-keyword">start </span>
</code><code class="!whitespace-pre hljs">docker-compose up
</code></div></div></pre>
    <p>This will start the batch processing job and generate the precomputed views, Elastic Search container in Docker and cloud-based services: MongoDB, Kafka consumer, BigML.</p>
    </br>
    <p>To start the Message Broker (Simulator) subsystem, navigate to the /orderssimulator directory and run the following command:</p>
    <pre><div class="bg-black rounded-md mb-4"><div class="flex items-center relative text-gray-200 bg-gray-800 px-4 py-2 text-xs font-sans justify-between rounded-t-md"><button class="flex ml-auto gap-2"><svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg></button></div><div class="p-4 overflow-y-auto"><code class="!whitespace-pre hljs language-sql">npm <span class="hljs-keyword">start </span>
</code></div></div></pre>
    <p>This will start the Orders Simulator server that controlled by http requests.</p>
  </div>
  <h2>Conclusion</h2>
  <p>This MicroServices-based NodeJS project demonstrates how different services can be used together to create a robust and scalable system that can process real-time data streams and generate valuable insights. By using technologies such as React, Redis, Kafka, Elastic Search, and BigML, the project provides a practical example of how modern big data systems can be built and deployed in real-world scenarios.</p>
  <h2>Contributing</h2>
  <p>Contributions to this project are welcome! If you find a bug or have an idea for an improvement, feel free to open an issue or submit a pull request. Please follow the guidelines in the CONTRIBUTING.md file.</p>
  <h2>License</h2>
  <p>This project is licensed under the MIT License - see the LICENSE.md file for details.</p>
</div>

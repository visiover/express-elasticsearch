# Dummy Search-service

Welcome to the Dummy Search-service! This project is designed to provide a basic setup for implementing and testing a search service using Elasticsearch and Kibana. Follow the steps below to get started.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Docker
- Node.js and npm

### Setup

#### 1. Setting up Elasticsearch with Docker

To get Elasticsearch and Kibana up and running via Docker, follow the official guide provided by Elastic:

[Elasticsearch Docker Guide](https://www.elastic.co/guide/en/elasticsearch/reference/current/docker.html)

This guide will walk you through the process of setting up a Docker container for Elasticsearch and optionally Kibana for visualizing the data.

#### 2. Verifying Elasticsearch Installation

Once Elasticsearch is set up, verify that it is working correctly with the following `curl` command:

```bash
curl --cacert http_ca.crt -u elastic:$ELASTIC_PASSWORD https://localhost:9200
```

Make sure to replace $ELASTIC_PASSWORD with your actual Elasticsearch password.

#### 3. Project Setup

Clone this repository to your local machine and install the necessary dependencies

```bash
git clone <repository-url>
cd <repository-name>
npm install
```

=> Remember to add your http_ca.crt file to the root of this project.

#### 4.Importing Data into Elasticsearch

To add data to your Elasticsearch index, use the following curl command:

```bash
curl --cacert http_ca.crt -u elastic:$ELASTIC_PASSWORD -H "Content-Type: application/json" -XPOST "https://localhost:9200/accounts-index/_bulk?pretty&refresh" --data-binary "@accounts.json"
```

This command will bulk import the data from accounts.json into the accounts-index index on Elasticsearch. Make sure the accounts.json file is in the correct format for Elasticsearch bulk import.


#### 5.Verifying Data Import
To verify that your data has been successfully imported into Elasticsearch, navigate to the following URL:

https://localhost:9200/_search 
You should see the imported data in the search results.


## Usage

```bash
node app.js
```

`http://localhost:3333/search` to get all the results.
`http://localhost:3333/find?q=YOUR_KEYWROD` to search for a specifc keyword. 
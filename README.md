# Dummy Search-service

1. Install ES with docker and make sure that Elastic search and Kibana are working :
Follow this guide : https://www.elastic.co/guide/en/elasticsearch/reference/current/docker.html


2. Verify that ES is working :

export the es password : `export ELASTIC_PASSWORD=YOUR_PASSWORD_HERE`
Test the connection : `curl --cacert http_ca.crt -u elastic:$ELASTIC_PASSWORD https://localhost:9200`

3. Clone this repo and run `npm install` 

4. Add Data to ES :
` curl --cacert http_ca.crt -u elastic:$ELASTIC_PASSWORD -H "Content-Type: application/json" -XPOST "https://localhost:9200/accounts-index/_bulk?pretty&refresh" --data-binary "@accounts.json" `

5. Verify that everything works :

Visit https://localhost:9200/_search to verify that the data has been added.
http://localhost:3333/find?q=YOUR_STRING to do a fulltext search
http://localhost:3333/search to get all the results

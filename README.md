# This demo is NOT designed for production use or performance testing

```
docker run -d --name tyk_gateway -p 8080:8080 --link tyk_redis:redis -v $(pwd)/tyk.standalone.conf:/opt/tyk-gateway/tyk.conf -v $(pwd)/apps:/opt/tyk-gateway/apps -v $(pwd)/middleware:/opt/tyk-gateway/middleware -v $(pwd)/templates:/opt/tyk-gateway/templates tykio/tyk-gateway
```

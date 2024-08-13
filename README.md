# Cú pháp sdk
```python
  <script>
        (function (d, t) {
					var BASE_URL = "http://localhost:3000";
					var g = d.createElement(t), s = d.getElementsByTagName(t)[0];
					g.src = BASE_URL + "/sdk.js";
					g.defer = true;
					g.async = true;
					s.parentNode.insertBefore(g, s);
					g.onload = function () {
						window.SDK.run({
							websiteToken: 'z5SH8mf7XSqA4N7CiHNHEi9X',
							baseUrl: BASE_URL
						})
                        console.log("ok")
					}
				})(document, "script");              
  </script> 
  ```
FROM node:14-buster

EXPOSE 17011

#RUN apt-get update
#RUN apt-get install telnet -y
#RUN apt-get install net-tools -y
#RUN apt-get install iputils-ping -y
#RUN apt-get install htop -y
#RUN apt-get install vim -y
#RUN apt-get install lsof -y
# Create app directory
WORKDIR /app
RUN pwd
RUN ls -la
# Copy config and built files
COPY . .
RUN pwd
RUN ls -la
# Install app dependencies
RUN yarn install
RUN rm -rf .next
RUN pwd
RUN ls -la
RUN yarn build

RUN pwd
RUN ls -la
#CMD [ "yarn","start" ]



version: '3.9'

services:
  qs-frontend-e-commerce:
    image: qs-frontend-e-commerce:${version}
    container_name: qs-frontend-e-commerce-${version}
    restart: always
    command: ${command}
    build:
      context: ./
      dockerfile: Dockerfile
    ports:
      - "17011:17011"
    networks:
      default:
        ipv4_address: 10.17.0.11
## Network
networks:
  default:
    external: true
    name: qs-microservices-network.local

#!/usr/bin/env bash

while getopts "e:v:h" opt
do
  # shellcheck disable=SC2220
  case "$opt" in
    e) env="$OPTARG" ;;
    v) version="$OPTARG" ;;
  esac
done

# Export to system env for docker compose 
export version=$env-v$version
case "$env" in
  development)
    export env=Development
    export COMPOSE_PROJECT_NAME="qs-dev-biz-services" 
    export command='yarn dev'
    ;;
  production)
    export env=Production
    export COMPOSE_PROJECT_NAME="qs-prod-biz-services"
    export command='yarn start'
    source ~/.zshrc
    ;;
esac

echo "Building version [$version] service on {$env} environment"

docker-compose -f docker-compose.yml config
docker-compose -f docker-compose.yml build --no-cache --progress=plain
docker-compose -f docker-compose.yml up -d

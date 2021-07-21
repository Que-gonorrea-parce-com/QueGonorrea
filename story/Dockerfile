# Build Step

FROM maven:3.6.0-jdk-11-slim AS build

# Moving sources
COPY ./src /home/app/src
COPY ./pom.xml /home/app

# Performing Maven package
RUN mvn -f /home/app/pom.xml
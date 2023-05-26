#!/bin/bash

SONAR_SCANNER_OPTS="-Dsonar.projectBaseDir=${PWD} -Dsonar.working.directory=${PWD}/dist/sonar"

docker run --rm \
  -e SONAR_HOST_URL \
  -e SONAR_LOGIN \
  -e SONAR_SCANNER_OPTS="${SONAR_SCANNER_OPTS}" \
  -v "${PWD}:${PWD}" \
  -u $(id -u "${USER}"):$(id -g "${USER}") \
  sonarsource/sonar-scanner-cli

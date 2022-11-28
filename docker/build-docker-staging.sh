#!/bin/bash
echo "Start build docker image for environment staging"
git -v
docker -v
aws --version
# variables
GIT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
GIT_SHA_SHORT=$(git rev-parse --short HEAD)
DOCKER_REGISTRY=913883573596.dkr.ecr.ap-southeast-1.amazonaws.com
DOCKER_IMAGE=${DOCKER_REGISTRY}/trixgo-cbs-webapp
DOCKER_TAG=${GIT_BRANCH}-${GIT_SHA_SHORT}-$(date +%s)
DOCKER_DEFAULT_PLATFORM=linux/amd64
docker build -f docker/Dockerfile.publish -t ${DOCKER_IMAGE}:${DOCKER_TAG} .
echo "Built success ${DOCKER_IMAGE}:${DOCKER_TAG}"
aws ecr get-login-password --region ap-southeast-1 | docker login --username AWS --password-stdin $DOCKER_REGISTRY
docker push ${DOCKER_IMAGE}:${DOCKER_TAG}
echo "Pushed ${DOCKER_IMAGE}:${DOCKER_TAG}"

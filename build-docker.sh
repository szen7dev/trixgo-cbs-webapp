#!/bin/bash
set -e
echo "Start build docker image"
git -v
docker -v
aws --version
# variables
export GIT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
export GIT_SHA_SHORT=$(git rev-parse --short HEAD)
export DOCKER_REGISTRY=913883573596.dkr.ecr.ap-southeast-1.amazonaws.com
export DOCKER_IMAGE=${DOCKER_REGISTRY}/trixgo-cbs-webapp
export DOCKER_TAG=${GIT_BRANCH}-${GIT_SHA_SHORT}-$(date +%s)
export DOCKER_DEFAULT_PLATFORM=linux/amd64
docker build --platform linux/amd64 -f docker/Dockerfile.publish -t ${DOCKER_IMAGE}:${DOCKER_TAG} .
echo "Built success ${DOCKER_IMAGE}:${DOCKER_TAG}"
aws ecr get-login-password --region ap-southeast-1 | docker login --username AWS --password-stdin $DOCKER_REGISTRY
docker push ${DOCKER_IMAGE}:${DOCKER_TAG}
echo "Pushed ${DOCKER_IMAGE}:${DOCKER_TAG}"

set -e

docker login registry.cn-hangzhou.aliyuncs.com -u $DOCKER_USERNAME -p $DOCKER_PASSWORD

docker build -t homework-tracker-web --build-arg NODE_ENV=$NODE_ENV .

docker tag homework-tracker-web:latest registry.cn-hangzhou.aliyuncs.com/wjyao/homework-tracker-web:latest

docker push registry.cn-hangzhou.aliyuncs.com/wjyao/homework-tracker-web:latest

docker rmi registry.cn-hangzhou.aliyuncs.com/wjyao/homework-tracker-web:latest

docker logout

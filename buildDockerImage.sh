set -e

docker login registry.cn-hangzhou.aliyuncs.com -u -p

docker build -t homework-tracker-web .

docker tag homework-tracker-web:latest registry.cn-hangzhou.aliyuncs.com/wjyao/homework-tracker-web:latest

docker push registry.cn-hangzhou.aliyuncs.com/wjyao/homework-tracker-web:latest

docker rmi registry.cn-hangzhou.aliyuncs.com/wjyao/homework-tracker-web:latest

docker logout
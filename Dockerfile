# 第一阶段：安装依赖并构建项目
FROM node:18 AS build-stage

# 设置工作目录
WORKDIR /app

# 首先复制 package.json 和 package-lock.json（或 yarn.lock）
COPY package*.json ./

# 安装依赖
RUN npm install --legacy-peer-deps

# 复制所有项目文件
COPY . .

# 构建项目
RUN npm run build

# 第二阶段：创建最终的生产镜像
FROM nginx:stable-alpine AS production-stage

# 从构建阶段复制构建好的文件到 nginx
COPY --from=build-stage /app/dist /usr/share/nginx/html

# 如果你有自定义的 nginx 配置，可以这样添加：
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# 暴露 80 端口
EXPOSE 81

# 启动 nginx
CMD ["nginx", "-g", "daemon off;"]
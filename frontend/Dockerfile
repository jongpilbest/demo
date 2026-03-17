# 1단계: 빌드 환경 (공장 역할)
# 'AS build'라는 이름을 붙여서 뒤에서 이 결과물을 가져다 쓸 수 있게 합니다.
FROM node:20-alpine AS build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# 2단계: 실행 환경 (매장 역할 - Nginx)
FROM nginx:alpine

# 우리가 만든 커스텀 Nginx 설정 파일을 컨테이너 안으로 복사해서 덮어씌웁니다.
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 1단계(build)에서 만들어진 완성본(dist 폴더)을 Nginx가 화면에 띄워줄 수 있는 폴더로 가져옵니다.
COPY --from=build /app/dist /usr/share/nginx/html

# 80번 포트를 열어줍니다.
EXPOSE 80

# Nginx 실행
CMD ["nginx", "-g", "daemon off;"]
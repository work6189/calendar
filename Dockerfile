# Node.js v22.12.0 이미지를 기반으로 합니다.
FROM node:22.12.0

# 작업 디렉토리를 설정합니다.
WORKDIR /usr/src

# 현재 디렉토리의 파일을 컨테이너의 작업 디렉토리로 복사합니다.
COPY ./app .

# 작업 디렉토리를 프로젝트 디렉토리로 변경합니다.
WORKDIR /usr/src/app

# 종속성 설치
RUN npm install date-fns react-modal

# Next.js 애플리케이션을 빌드합니다.
RUN npm run build

# 애플리케이션을 실행합니다.
CMD ["npm", "start"]

# Docker 컨테이너가 3000 포트를 노출하도록 설정합니다.
EXPOSE 3000



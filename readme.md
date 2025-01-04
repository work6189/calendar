# 컨테이너 빌드
docker build -t calendar-app .

# 컨테이너 실행
docker run --name calendar-app -p 3000:3000 calendar-app 

# 컨테이너 접속
docker exec -it calendar-app /bin/bash

# 컨테이너 종료
docker stop calendar-app

# 컨테이너 삭제
docker rm calendar-app
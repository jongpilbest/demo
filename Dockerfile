# 1단계: 빌드 환경 (백엔드 공장)
FROM bellsoft/liberica-openjdk-debian:17 AS builder
WORKDIR /app

# 프로젝트 코드 전체를 도커 안으로 복사합니다.
COPY . .

# 윈도우에서 만들어진 gradlew 파일이 리눅스에서도 실행되도록 권한을 줍니다.
RUN chmod +x ./gradlew

# 도커 안에서 직접 빌드를 실행하여 .jar 파일을 생성합니다. (테스트는 시간상 생략)
RUN ./gradlew clean build -x test

# 2단계: 실행 환경 (매장)
FROM bellsoft/liberica-openjdk-debian:17
WORKDIR /app

# 1단계(builder)의 결과물인 .jar 파일을 가져와서 app.jar라는 이름으로 복사합니다.
COPY --from=builder /app/build/libs/*SNAPSHOT.jar app.jar

# 백엔드 서버 실행!
ENTRYPOINT ["java", "-jar", "app.jar"]
FROM bellsoft/liberica-openjdk-debian:17 AS builder
WORKDIR /app

COPY . .
RUN chmod +x ./gradlew

RUN ./gradlew clean bootJar -x test \
    && echo "==== build/libs ====" \
    && ls -l /app/build/libs \
    && JAR_FILE=$(find /app/build/libs -maxdepth 1 -type f -name "*.jar" ! -name "*plain.jar" | head -n 1) \
    && echo "JAR_FILE=$JAR_FILE" \
    && cp "$JAR_FILE" /app/app.jar

FROM bellsoft/liberica-openjdk-debian:17
WORKDIR /app

COPY --from=builder /app/app.jar /app/app.jar

ENTRYPOINT ["java", "-jar", "/app/app.jar"]
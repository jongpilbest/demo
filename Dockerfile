FROM bellsoft/liberica-openjdk-debian:17
COPY build/libs/*.jar app.jar
ENTRYPOINT ["java","-jar","/app.jar"]
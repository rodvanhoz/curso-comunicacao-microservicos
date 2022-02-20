FROM openjdk:11
VOLUME /tmp
ADD ./target/product-api-0.0.1-SNAPSHOT.jar product-api.jar
ENTRYPOINT ["java","-jar","/product-api.jar"]

plugins {
    id("java")
    id("org.springframework.boot") version "3.2.2"
    id("io.spring.dependency-management") version "1.1.4"
    id("com.github.node-gradle.node") version "7.0.1"
}

group = "com.tradingbot"
version = "1.0-SNAPSHOT"

repositories {
    mavenCentral()
}

dependencies {
    // Spring Boot
    implementation("org.springframework.boot:spring-boot-starter-web")
    implementation("org.springframework.boot:spring-boot-starter-websocket")

    // SLF4J and Logback (for logging)
    implementation("org.slf4j:slf4j-api:2.0.9")
    implementation("ch.qos.logback:logback-classic:1.4.11") // Logback as the SLF4J implementation


    // ND4J for numerical computing
    implementation("org.nd4j:nd4j-native-platform:1.0.0-M2.1")

    // CSV Processing
    implementation("org.apache.commons:commons-csv:1.10.0")  // Apache Commons CSV
    implementation("com.opencsv:opencsv:5.9")               // OpenCSV as alternative


    // Testing
    testImplementation("org.springframework.boot:spring-boot-starter-test")
    testImplementation(platform("org.junit:junit-bom:5.10.1"))
    testImplementation("org.junit.jupiter:junit-jupiter")
}

node {
    version.set("20.11.1")
    download.set(true)
    workDir.set(file("${project.buildDir}/nodejs"))
    npmWorkDir.set(file("${project.buildDir}/npm"))
}

tasks.test {
    useJUnitPlatform()
}

// Task to install frontend dependencies
tasks.register<com.github.gradle.node.npm.task.NpmTask>("installFrontend") {
    args.set(listOf("install"))
    workingDir.set(file("${project.projectDir}/frontend"))
}

// Task to build frontend
tasks.register<com.github.gradle.node.npm.task.NpmTask>("buildFrontend") {
    dependsOn("installFrontend")
    args.set(listOf("run", "build"))
    workingDir.set(file("${project.projectDir}/frontend"))
}

// Include frontend build in main build
tasks.named("build") {
    dependsOn("buildFrontend")
}
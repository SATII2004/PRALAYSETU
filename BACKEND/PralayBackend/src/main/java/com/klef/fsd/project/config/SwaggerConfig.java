package com.klef.fsd.project.config;

import org.springdoc.core.models.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.info.Info;

@Configuration
public class SwaggerConfig {

    @Bean
    public GroupedOpenApi publicApi() {
        return GroupedOpenApi.builder()
                .group("public")
                .pathsToMatch("/api/**")
                .addOpenApiCustomizer(openApi -> 
                    openApi.info(new Info()
                        .title("PralayBackend API")
                        .description("API documentation for Pralay Disaster Management System")
                        .version("1.0.0")))
                .build();
    }
}
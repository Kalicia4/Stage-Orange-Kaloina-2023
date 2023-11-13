package org.acme;

import io.quarkus.test.junit.QuarkusTest;
import org.junit.jupiter.api.Test;
import io.restassured.RestAssured;

import static org.hamcrest.Matchers.is;

@QuarkusTest
public class ExampleResourceTest {

    @Test
    public void testHelloEndpoint() {
        RestAssured.given()
          .when().get("/persons")
          .then()
             .statusCode(200)
             .body(is("Hello from RESTEasy Reactive"));
    }

}
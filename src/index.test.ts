import { Test } from "@anderjason/tests";
import "./Box2/index.test";
import "./Point2/index.test";
import "./Size2/index.test";
import "./Vector2/index.test";

Test.runAll()
  .then(() => {
    console.log("Tests complete");
  })
  .catch((err) => {
    console.error(err);
    console.error("Tests failed");
  });

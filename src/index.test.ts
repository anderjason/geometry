import { Test } from "@anderjason/tests";
import "./Box2/index.test";
import "./Box3/index.test";
import "./MutablePoint2/index.test";
import "./MutablePoint3/index.test";
import "./Point2/index.test";
import "./Size2/index.test";
import "./Size3/index.test";

Test.runAll()
  .then(() => {
    console.log("Tests complete");
  })
  .catch((err) => {
    console.error(err);
    console.error("Tests failed");
  });

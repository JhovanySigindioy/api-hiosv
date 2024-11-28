import { Router } from "express";
import { controllerGetDataToSelectors, controllerInsertData, controllerPatchDataDB, controllerGetProducts, controllerInsertSale, controllerDeleteData } from "../../controller";

export const router: Router = Router();

router.get("/", (req, res) => {
    res.send("Servidor express funcionando satisfatoriamente");
});

router.get("/products", controllerGetProducts);
router.get("/brands", (req, res) => controllerGetDataToSelectors(req, res, "brands"));
router.get("/categories", (req, res) => controllerGetDataToSelectors(req, res, "categories"));
router.get("/locations", (req, res) => controllerGetDataToSelectors(req, res, "locations"));

router.post("/products", (req, res) => controllerInsertData(req, res, "products"));
router.post("/brands", (req, res) => controllerInsertData(req, res, "brands"));
router.post("/categories", (req, res) => controllerInsertData(req, res, "categories"));
router.post("/locations", (req, res) => controllerInsertData(req, res, "locations"));
router.post("/sales", controllerInsertSale);

router.delete("/products/:id", (req, res) => controllerDeleteData(req, res, "products"));
router.delete("/brands/:id", (req, res) => controllerDeleteData(req, res, "brands"));
router.delete("/categories/:id", (req, res) => controllerDeleteData(req, res, "categories"));
router.delete("/locations/:id", (req, res) => controllerDeleteData(req, res, "locations"));

router.patch("/products/:id", controllerPatchDataDB);
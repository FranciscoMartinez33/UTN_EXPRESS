import { Router } from "express";
export const router = Router();
import { productController } from "../controller/product.js";
import { token } from "../services/jwt.js";
router.get("/",  productController.getAll);
router.get("/", productController.getAll);
router.get("/s", productController.getByName);
router.get("/:id", (req, res) => {
  const { id } = req.params;
  res.send(`List a movie by id: ${id}`);
});
router.post("/",token.validate, productController.createOne);
router.patch("/:id",token.validate, productController.updateProduct);
router.delete("/:id",token.validate, productController.deleteOne);
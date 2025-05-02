const express = require("express");
const routerAPI = express.Router();
const { upload } = require("../multer");

const {
    createProduct,
    getAllProductsShop,
    deleteProduct,
    getAllProducts,
    reviewProduct,
    updateStock,
} = require("../controllers/productController");
const { isSeller, isAuthenticated, isAdmin } = require("../middleware/auth");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const apiRoutes = (app) => { 
// Create order
routerAPI.post("/create-product",upload.array("images"),isSeller,catchAsyncErrors(createProduct));
  
  // Lấy tất cả sản phẩm của một shop
  routerAPI.get("/get-all-products-shop/:id",catchAsyncErrors(getAllProductsShop));
  
  // Xóa sản phẩm theo ID
  routerAPI.delete("/delete-shop-product/:id",isSeller,catchAsyncErrors(deleteProduct));
  
  // Lấy tất cả sản phẩm
  routerAPI.get("/get-all-products",catchAsyncErrors(getAllProducts));
  
  // Review sản phẩm
  routerAPI.put("/create-new-review", isAuthenticated,catchAsyncErrors(reviewProduct));
  
  // Cập nhật tồn kho từ order-service
  routerAPI.patch("/update-stock",catchAsyncErrors(updateStock));
app.use("/", routerAPI); 
}
module.exports = apiRoutes;

import express from "express";
import { isAdmin, requireSignIn } from "./../middlewares/authMiddleware.js";
import {
  createServiceController,
  getServiceController,
  getSingleServiceController,
  getServicePhotoController,
  deleteServiceController,
  updateServiceController,
  serviceFiltersController,
  serviceCountController,
  serviceListController,
  searchServiceController,
  relatedServiceController,
  serviceCategoryController,
} from "./../controllers/serviceController.js";
import formidable from "express-formidable";

const router = express.Router();

//routes
router.post(
  "/create-service",
  requireSignIn,
  isAdmin,
  formidable(),
  createServiceController
);

// get all services
router.get("/get-service", getServiceController);
// get single service
router.get("/get-service/:slug", getSingleServiceController);

// get service photo
router.get("/service-photo/:pid", getServicePhotoController);

// delete service
router.delete("/delete-service/:pid",deleteServiceController);


// update service
//routes
router.put(
  "/update-service/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateServiceController
);

// filter service
router.post("/service-filters",serviceFiltersController);

// service count
router.get("/service-count", serviceCountController);

// service per page
router.get("/service-list/:page", serviceListController);



//search service
router.get("/search/:keyword", searchServiceController);

//similar service
router.get("/related-service/:pid/:cid", relatedServiceController);

//category wise service
router.get("/service-category/:slug", serviceCategoryController);

export default router;

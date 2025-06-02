import serviceModel from "../models/serviceModel.js";
import categoryModel from "../models/categoryModel.js";
import fs from "fs";
import slugify from "slugify";

export const createServiceController = async (req, res) => {
  try {
    const { name, description, price, category, loadCount, shipping } =
      req.fields;
    const { photo } = req.files;
    // validation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is required" });
      case !description:
        return res.status(500).send({ error: "Description is required" });
      case !price:
        return res.status(500).send({ error: "Price is required" });
      case !category:
        return res.status(500).send({ error: "Category is required" });
      case !loadCount:
        return res.status(500).send({ error: "Load Count is required" });
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "Photo is required and should be less than 1mb" });
    }
    const services = new serviceModel({
      ...req.fields,
      slug: slugify(name),
    });

    if (photo) {
      services.photo.data = fs.readFileSync(photo.path);
      services.photo.contentType = photo.type;
    }
    await services.save();
    res.status(201).send({
      success: true,
      message: "Services Created Successfully",
      services,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in creating service",
      error,
    });
  }
};

// get all services
export const getServiceController = async (req, res) => {
  try {
    const services = await serviceModel
      .find({})
      .populate("category")
      .select("-photo")
      .limit(5)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      totalServiceCount: services.length,
      message: "All Services List",
      services,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting services",
      error: error.message,
    });
  }
};

// get single service
export const getSingleServiceController = async (req, res) => {
  try {
    const service = await serviceModel
      .findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");
    res.status(200).send({
      success: true,
      message: "Got Single Service Successfully",
      service,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting single service",
      error: error.message,
    });
  }
};

// get service photo
export const getServicePhotoController = async (req, res) => {
  try {
    const service = await serviceModel.findById(req.params.pid).select("photo");
    if (service.photo.data) {
      res.set("Content-Type", service.photo.contentType);
      return res.status(200).send(service.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting service photo",
      error: error.message,
    });
  }
};

// delete service
export const deleteServiceController = async (req, res) => {
  try {
    const { pid } = req.params;
    const service = await serviceModel.findByIdAndDelete(pid).select("-photo");
    res.status(200).send({
      success: true,
      message: "Service Deleted Successfully",
      service,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in deleting service",
      error: error.message,
    });
  }
};

//update service

export const updateServiceController = async (req, res) => {
  try {
    const { name, description, price, category, loadCount, shipping } =
      req.fields;
    const { photo } = req.files;
    // validation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is required" });
      case !description:
        return res.status(500).send({ error: "Description is required" });
      case !price:
        return res.status(500).send({ error: "Price is required" });
      case !category:
        return res.status(500).send({ error: "Category is required" });
      case !loadCount:
        return res.status(500).send({ error: "Load Count is required" });
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "Photo is required and should be less than 1mb" });
    }
    const services = await serviceModel.findByIdAndUpdate(
      req.params.pid,
      {
        ...req.fields,
        slug: slugify(name),
      },
      { new: true }
    );

    if (photo) {
      services.photo.data = fs.readFileSync(photo.path);
      services.photo.contentType = photo.type;
    }
    await services.save();
    res.status(201).send({
      success: true,
      message: "Services Updated Successfully",
      services,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in updating service",
      error,
    });
  }
};

// filters Controller

export const serviceFiltersController = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};
    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
    const services = await serviceModel.find(args);
    res.status(200).send({
      success: true,
      services,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error While Filtering Services",
      error,
    });
  }
};

// service count
export const serviceCountController = async (req, res) => {
  try {
    const total = await serviceModel.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      total,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Error in service count",
      error,
      success: false,
    });
  }
};

// service list based on page
export const serviceListController = async (req, res) => {
  try {
    const perPage = 3;
    const page = req.params.page ? req.params.page : 1;
    const services = await serviceModel
      .find({})
      .select("-photo")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      services,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error in per page ctrl",
      error,
    });
  }
};

// search service

export const searchServiceController = async (req, res) => {
  try {
    const { keyword } = req.params;
    const results = await serviceModel
      .find({
        $or: [
          { name: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
        ],
      })
      .select("-photo");
    res.json(results);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error In Search Search API",
      error,
    });
  }
};

// similar services
export const relatedServiceController = async (req, res) => {
  try {
    const { pid, cid } = req.params;
    const services = await serviceModel
      .find({
        category: cid,
        _id: { $ne: pid },
      })
      .select("-photo")
      .limit(3)
      .populate("category");
    res.status(200).send({
      success: true,
      services,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error while getting related Service",
      error,
    });
  }
};

// get services by category
export const serviceCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.findOne({ slug: req.params.slug });
    const services = await serviceModel.find({ category }).populate("category");
    res.status(200).send({
      success: true,
      category,
      services,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      error,
      message: "Error While Getting services",
    });
  }
};
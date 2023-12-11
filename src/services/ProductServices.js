const BrandModel = require("../Models/BrandModel")
const CategoryModel = require("../Models/CategoryModel");
const ProductModel = require("../Models/ProductModel");
const ProductSliderModel = require("../Models/ProductSliderModel")
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId;

const BrandListService = async () => {
    try {
        let data = await BrandModel.find()
        return { status: "success", data: data }
    } catch (err) {
        return { status: "fail", data: err }.toString()

    }
}
const CategoryListService = async () => {
    try {
        let data = await CategoryModel.find()
        return { status: "success", data: data }
    } catch (err) {
        return { status: "fail", data: err }.toString()

    }
}
const SliderListService = async () => {
    try {
        let data = await ProductSliderModel.find()
        return { status: "success", data: data }
    } catch (err) {
        return { status: "fail", data: err.toString() }


    }
}





const ListByBrandService = async (req) => {
    try {
        let BrandID = new ObjectId(req.params.BrandID)

        let matchStage = { $match: { brandID: BrandID } }
        let joinWithBrandStage = { $lookup: { from: 'brands', localField: 'brandID', foreignField: '_id', as: 'brand' } }
        let joinWithCategoryStage = { $lookup: { from: 'categories', localField: 'categoryID', foreignField: '_id', as: 'category' } }
        let unwindBrandStage = { $unwind: "$brand" }
        let unwindCategoryStage = { $unwind: "$category" }
        let projectionStage = {
            $project: {
                'categoryID': 0,
                'brandID': 0,
                'createdAt': 0,
                'updatedAt': 0,
                'category.createdAt': 0,
                'category.updatedAt': 0,
                'brand.createdAt': 0,
                'brand.updatedAt': 0,
            }
        }
        let data = await ProductModel.aggregate([
            matchStage,
            joinWithBrandStage,
            joinWithCategoryStage,
            unwindBrandStage,
            unwindCategoryStage,
            projectionStage

        ])
        return { status: 'success', data: data }
    } catch (err) {
        console.log(err.toString())
        return { status: "fail", data: err.toString() }

    }
}
const ListByCategoryService = async (req) => {
    try {
        let  CategoryID= new ObjectId(req.params.CategoryID)

        let matchStage = { $match: { categoryID: CategoryID } }
        let joinWithBrandStage = { $lookup: { from: 'brands', localField: 'brandID', foreignField: '_id', as: 'brand' } }
        let joinWithCategoryStage = { $lookup: { from: 'categories', localField: 'categoryID', foreignField: '_id', as: 'category' } }
        let unwindBrandStage = { $unwind: "$brand" }
        let unwindCategoryStage = { $unwind: "$category" }
        let projectionStage = {
            $project: {
                'categoryID': 0,
                'brandID': 0,
                'createdAt': 0,
                'updatedAt': 0,
                'category.createdAt': 0,
                'category.updatedAt': 0,
                'brand.createdAt': 0,
                'brand.updatedAt': 0,
            }
        }
        let data = await ProductModel.aggregate([
            matchStage,
            joinWithBrandStage,
            joinWithCategoryStage,
            unwindBrandStage,
            unwindCategoryStage,
            projectionStage

        ])
        return { status: 'success', data: data }
    } catch (err) {
        console.log(err.toString())
        return { status: "fail", data: err.toString() }

    }
}
const ListByRemarkService = async (req) => {
    try {
        let Remark = req.params.Remark

        let matchStage = { $match: { remark: Remark } }
        let joinWithBrandStage = { $lookup: { from: 'brands', localField: 'brandID', foreignField: '_id', as: 'brand' } }
        let joinWithCategoryStage = { $lookup: { from: 'categories', localField: 'categoryID', foreignField: '_id', as: 'category' } }
        let unwindBrandStage = { $unwind: "$brand" }
        let unwindCategoryStage = { $unwind: "$category" }
        let projectionStage = {
            $project: {
                'categoryID': 0,
                'brandID': 0,
                'createdAt': 0,
                'updatedAt': 0,
                'category.createdAt': 0,
                'category.updatedAt': 0,
                'brand.createdAt': 0,
                'brand.updatedAt': 0,
            }
        }
        let data = await ProductModel.aggregate([
            matchStage,
            joinWithBrandStage,
            joinWithCategoryStage,
            unwindBrandStage,
            unwindCategoryStage,
            projectionStage

        ])
        return { status: 'success', data: data }
    } catch (err) {
        console.log(err.toString())
        return { status: "fail", data: err.toString() }

    }
}











const ListBySmilierService = async () => {

}
const ListByKeywordService = async () => {

}





const DetailsService = async () => {

}

const ReviewListService = async () => {

}




module.exports = {
    BrandListService,
    CategoryListService,
    SliderListService,
    ListByBrandService,
    ListByCategoryService,
    ListBySmilierService,
    ListByKeywordService,
    ListByRemarkService,
    DetailsService,
    ReviewListService
}











































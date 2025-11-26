import { ProductModel } from "../model/product.model.js";
import { sequelize } from "../database/mysql.cnx.js";
import { Op } from "sequelize";

export const ProductRepository = {
    
    getAll: async () => {
        return await ProductModel.findAll();
    },

    getById: async (id) => {
        return await ProductModel.findOne({ where: { id } });
    },

    createOneProduct: async ({ name, price, description, category, color, stock, RGB }) => {
        return await ProductModel.create({ name, price, description, category, color, stock, RGB });
    },
    
    updateOneProduct: async ({ id, name, price, description, created_date, color, stock, RGB }) => {
        return await ProductModel.update(
            { name, price, description, created_date, color, stock, RGB },
            { where: { id } }
        );
    },

    deleteOneProduct: async (id) => {
        return await ProductModel.destroy({ where: { id } });
    },

    lowStock: async () => {
        return await ProductModel.findAll({
            where: { stock: { [Op.lte]: 10 } }, 
            raw: true
        });
    },

    reportStock: async () => {
        const result = await ProductModel.findAll({
            attributes: [
                [sequelize.fn("COUNT", sequelize.col("id")), "totalProducts"],
                [sequelize.fn("SUM", sequelize.col("stock")), "totalStock"],
                [sequelize.fn("AVG", sequelize.col("stock")), "avgStock"]
            ],
            raw: true
        });

        return result[0];
    },

    stats: async () => {
        return await ProductModel.findAll({
            attributes: [
                "category",
                [sequelize.fn("COUNT", sequelize.col("id")), "count"]
            ],
            group: ["category"],
            raw: true
        });
    }
};
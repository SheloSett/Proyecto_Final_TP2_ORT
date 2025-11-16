
import { ProductModel } from "../model/product.model.js"

export const ProductRepository = {
    
    getAll: async () => {
        return await ProductModel.findAll();
    },

    getById: async ( id ) => {
        return await ProductModel.findOne( { where: { id } } )
    },

    createOneProduct: async ( {  name, price, description, category, color, stock, RGB  } ) => {
        return await ProductModel.create( { name, price, description, category, color, stock, RGB } )
    },
    
    updateOneProduct: async ( { id, name, price, description, created_date, color, stock, RGB } ) => {
        return await ProductModel.update( { name, price, description, created_date, color, stock, RGB }, { where: { id } } ) 
    },

    deleteOneProduct: async ( id ) => {
        return await ProductModel.destroy( { where: { id } } )
    }
} 
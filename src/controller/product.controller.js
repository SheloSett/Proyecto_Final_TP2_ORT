import { ProductRepository} from '../repository/Product.Sequelize.Repository.js'

export const ProductController = {
    
    getAllProducts: async (req, resp) => {
        try {
            const products = await ProductRepository.getAll()
            
            resp.json(
                {
                    code: 200,
                    ok:true,
                    payload: products
                }
            )
        }
        catch (error){
            console.log("error al obtener los productos", error.message)
            resp.status(500).json(
                {error: "error interno del server"}
            )
        }
    },

    getProductById: async (req, resp) => {
        const { id } = req.params;
        try {
            const product = await ProductRepository.getById(id)
            
            resp.json(
                {
                    code: 200,
                    ok:true,
                    payload: product
                }
            )
        }
        catch (error){
            console.log("error al obtener los productos", error.message)
            resp.status(500).json(
                {error: "error interno del server"}
            )
        }
    },

    createProduct: async (req, resp) => {
        try {
            const {name, price, description, created_date, category, color} = req.body;
            console.log(name, price, description, created_date, category, color);

            const product = await ProductRepository.createOneProduct(name, price, description, created_date, category, color);
            resp.json({
                code:200,
                ok: true,
                payload: product
            }
            )
        }
        catch(error){
            console.log("Hubo un error en la creacion del producto")
            resp.status(500).json(
                {error: "no se pudo crear el producto"}
            )
        }
    },

    updateProduct: async (req, resp) => {
        try {
            const {name, price, description, color} = req.body;
            const {id} = req.params;
            const product = await ProductRepository.updateOneProduct(id, name, price, description, color)
            resp.json(
                {
                    code:200,
                    ok:true,
                    payload: "pruducto actualizado con el id: " + id + " productos afectados: " + product,
                }
            )
        }
        catch(error){
            console.log("Hubo un error en la ACTUALIZACION del producto")
            resp.status(500).json(
                {error: "no se pudo actualizar el producto"}
            )
        }
    }
}
import { ProductRepository } from '../repository/Product.Sequelize.Repository.js';

export const ProductController = {

    getAllProducts: async (req, resp) => {
        try {
            const products = await ProductRepository.getAll();
            resp.json({ code: 200, ok: true, payload: products });
        } catch (error) {
            resp.status(500).json({ error: "error interno del server" });
        }
    },

    getProductById: async (req, resp) => {
        try {
            const product = await ProductRepository.getById(req.params.id);
            resp.json({ code: 200, ok: true, payload: product });
        } catch (error) {
            resp.status(500).json({ error: "error interno del server" });
        }
    },

    createProduct: async (req, resp) => {
        try {
            const newProduct = await ProductRepository.createOneProduct(req.body);
            resp.status(201).json({ code: 201, ok: true, payload: newProduct });
        } catch (error) {
            resp.status(500).json({ error: "no se pudo crear el producto" });
        }
    },

    updateProduct: async (req, resp) => {
        try {
            const updated = await ProductRepository.updateOneProduct({
                id: req.params.id,
                ...req.body
            });

            if (updated === 0) {
                return resp.status(404).json({
                    ok: false,
                    message: "Producto no encontrado"
                });
            }

            resp.json({
                code: 200,
                ok: true,
                payload: `Producto actualizado con el id: ${req.params.id}`
            });
        } catch (error) {
            resp.status(500).json({ error: "no se pudo actualizar el producto" });
        }
    },

    deleteProduct: async (req, resp) => {
        try {
            const deleted = await ProductRepository.deleteOneProduct(req.params.id);

            if (deleted === 0) {
                return resp.status(404).json({
                    ok: false,
                    message: "Producto no encontrado"
                });
            }

            resp.json({
                code: 200,
                ok: true,
                payload: `Producto eliminado con el id: ${req.params.id}`
            });
        } catch (error) {
            resp.status(500).json({ error: "no se pudo eliminar el producto" });
        }
    },

    lowStock: async (req, resp) => {
        try {
            const products = await ProductRepository.lowStock();
            resp.json({ code: 200, ok: true, payload: products });
        } catch (error) {
            resp.status(500).json({ error: "No se pudo obtener lowStock" });
        }
    },

    reportStock: async (req, resp) => {
        try {
            const data = await ProductRepository.reportStock();
            resp.json({ code: 200, ok: true, payload: data });
        } catch (error) {
            resp.status(500).json({ error: "No se pudieron obtener las métricas" });
        }
    },

    stats: async (req, resp) => {
        try {
            const data = await ProductRepository.stats();
            resp.json({ code: 200, ok: true, payload: data });
        } catch (error) {
            resp.status(500).json({ error: "No se pudieron obtener las estadísticas" });
        }
    }
};
import { ProductRepository } from '../repository/Product.Sequelize.Repository.js';

export const ProductController = {

    getAllProducts: async (req, resp) => {
        try {
            const products = await ProductRepository.getAll();
            resp.json({
                code: 200,
                ok: true,
                payload: products
            });
        } catch (error) {
            resp.status(500).json({ error: "error interno del server" });
        }
    },

    getProductById: async (req, resp) => {
        const { id } = req.params;
        try {
            const product = await ProductRepository.getById(id);
            resp.json({
                code: 200,
                ok: true,
                payload: product
            });
        } catch (error) {
            resp.status(500).json({ error: "error interno del server" });
        }
    },

    createProduct: async (req, resp) => {
        try {
            const { name, price, description, category, color, stock, RGB } = req.body;
            const product = await ProductRepository.createOneProduct({
                name, price, description, category, color, stock, RGB
            });

            resp.json({
                code: 200,
                ok: true,
                payload: product
            });
        } catch (error) {
            resp.status(500).json({ error: "no se pudo crear el producto" });
        }
    },

    updateProduct: async (req, resp) => {
        try {
            const { id } = req.params;
            const { name, price, description, created_date, color, stock, RGB } = req.body;
            const product = await ProductRepository.updateOneProduct({
                id, name, price, description, created_date, color, stock, RGB
            });

            resp.json({
                code: 200,
                ok: true,
                payload: `Producto actualizado con el id: ${id} - Productos afectados: ${product}`
            });
        } catch (error) {
            resp.status(500).json({ error: "no se pudo actualizar el producto" });
        }
    },

    deleteProduct: async (req, resp) => {
        try {
            const { id } = req.params;
            await ProductRepository.deleteOneProduct(id);
            resp.json({
                code: 200,
                ok: true,
                payload: `Producto eliminado con el id: ${id}`
            });
        } catch (error) {
            resp.status(500).json({ error: "no se pudo eliminar el producto" });
        }
    },

    lowStock: async (req, resp) => {
        try {
            const products = await ProductRepository.lowStock();
            resp.json({
                code: 200,
                ok: true,
                payload: products
            });
        } catch (error) {
            resp.status(500).json({ error: "No se pudo obtener lowStock" });
        }
    },

    reportStock: async (req, resp) => {
        try {
            const metrics = await ProductRepository.reportStock();
            resp.json({
                code: 200,
                ok: true,
                metrics
            });
        } catch (error) {
            resp.status(500).json({ error: "No se pudieron obtener las métricas" });
        }
    },

    stats: async (req, resp) => {
        try {
            const stats = await ProductRepository.stats();
            resp.json({
                code: 200,
                ok: true,
                stats
            });
        } catch (error) {
            resp.status(500).json({ error: "No se pudieron obtener las estadísticas" });
        }
    }
};
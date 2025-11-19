import { DataTypes } from "sequelize"
import { sequelize } from "../database/mysql.cnx.js"

export const ProductModel = sequelize.define(
    'product',{
                id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                    allowNull: false
                },
                name: {
                    type: DataTypes.STRING(200),
                    allowNull: true,
                    defaultValue: 'Unknown'
                },
                price: {
                    type: DataTypes.DECIMAL(10,2),
                    allowNull: false
                },
                description: {
                    type: DataTypes.STRING(200),
                    allowNull: true,
                    defaultValue: 'There is no description'
                },
                created_date: {
                    type: DataTypes.DATEONLY,
                    defaultValue: DataTypes.NOW
                },
                category: {
                    type: DataTypes.STRING(200),
                    allowNull: true
                },
                color: {
                    type: DataTypes.STRING(200),
                    allowNull: true 
                },
                stock: {
                    type: DataTypes.INTEGER,
                    allowNull: true,
                    defaultValue: 0
                },
                RGB: {
                    type: DataTypes.BOOLEAN,
                    allowNull: false
                }
        }, {
            tableName: 'product',
            timestamps: false
        }
)
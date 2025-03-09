// models.js (or models/customer.js)

const { Sequelize, DataTypes } = require('sequelize');

// Set up Sequelize with your database credentials
const sequelize = new Sequelize('appbank', 'root', 'CSS2244', {
  host: 'localhost',
  dialect: 'mysql', // Or change this to 'postgres', 'sqlite', etc., depending on your DB
});

// Define the Customer model
module.exports = (sequelize, DataTypes) => {
    const Customer = sequelize.define('Customer', {
      idNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      formId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    }, {
      timestamps: true,
    });
    return Customer;
  };
  
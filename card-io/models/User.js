/* eslint-disable no-unused-vars */

module.exports = (sequelize, DataTypes) => sequelize.define(
  'User',
  {
    firstName: { type: DataTypes.STRING, allowNull: false, field: 'first_name' },
    lastName: { type: DataTypes.STRING, allowNull: false, field: 'last_name' },
    email: {
      type: DataTypes.STRING, unique: true, allowNull: false, field: 'email',
    },
    password: { type: DataTypes.STRING, allowNull: false, field: 'password' },
  }, {
    freezeTableName: true,
    underscored: true,
    tableName: 'user',
  },
);

/* eslint-disable no-unused-vars */

module.exports = (sequelize, DataTypes) => sequelize.define(
  'Team',
  {
    name: {
      type: DataTypes.STRING, allowNull: false, field: 'name', default: 'Private',
    },
  }, {
    freezeTableName: true,
    underscored: true,
    tableName: 'team',
  },
);

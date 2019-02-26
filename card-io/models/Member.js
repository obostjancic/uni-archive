/* eslint-disable no-unused-vars */

module.exports = (sequelize, DataTypes) => {
  const Member = sequelize.define(
    'Member',
    {
      active: {
        type: DataTypes.BOOLEAN, default: true, allowNull: false, field: 'active',
      },
    }, {
      freezeTableName: true,
      underscored: true,
      tableName: 'member',
    },
  );

  Member.associate = (models) => {
    models.User.belongsToMany(models.Card, { through: 'Member' });
    models.Card.belongsToMany(models.User, { through: 'Member' });
  };

  return Member;
};

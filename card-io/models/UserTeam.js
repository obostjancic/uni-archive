/* eslint-disable no-unused-vars */

module.exports = (sequelize, DataTypes) => {
  const UserTeam = sequelize.define(
    'UserTeam',
    {
      role: {
        type: DataTypes.ENUM, allowNull: false, field: 'role', values: ['admin', 'member'], defaultValue: 'member',
      },
    },
    {
      freezeTableName: true,
      underscored: true,
      tableName: 'user_team',
    },
  );

  UserTeam.associate = (models) => {
    models.User.belongsToMany(models.Team, { through: 'UserTeam' });
    models.Team.belongsToMany(models.User, { through: 'UserTeam' });
  };

  return UserTeam;
};

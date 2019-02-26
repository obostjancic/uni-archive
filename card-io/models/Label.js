// text string, color: enum,

// TODO: add more colors
module.exports = (sequelize, DataTypes) => sequelize.define(
  'Label',
  {
    color: { type: DataTypes.ENUM, values: ['red', 'orange', 'yellow', 'olive', 'green', 'teal', 'blue', 'violet', 'purple', 'pink', 'brown', 'grey', 'black'] },
    text: { type: DataTypes.STRING, allowNull: false, defaultValue: '' },
  }, {
    freezeTableName: true,
    underscored: true,
    tableName: 'label',
  },
);

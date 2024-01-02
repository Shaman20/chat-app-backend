const { DataTypes } = require("sequelize");
const sequelize = require("./db");

const Friend = sequelize.define(
  "friends",
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
  },
  {
    timestamps: false,
  }
);

Friend.associate = (models) => {
    Friend.belongsTo(models.User, {foreignKey: "userId"})
}

// Synchronize the model with the database (creates the "Friend" table if it doesn't exist)
Friend.sync()
  .then(() => {
    console.log("Friend table created or synchronized.");
  })
  .catch((error) => {
    console.error("Error synchronizing Friend table:", error);
  });

module.exports = Friend;

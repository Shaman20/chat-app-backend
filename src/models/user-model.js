const { DataTypes } = require("sequelize");
const sequelize = require("./db");

const User = sequelize.define(
  "users",
  {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    emailAddress: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    phoneNumber: {
      type: DataTypes.NUMBER,
      allowNull: false,
      unique: true,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isOnline: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    timestamps: false,
  }
);

User.associate = (models) => {
  User.hasMany(models.Friends, {
    foreignKey: "userId",
  });
  User.hasMany(models.Friends, {
    foreignKey: "friendId",
  });
  User.hasMany(models.Message, {
    foreignKey: "senderId",
  })
  User.hasMany(models.Message, {
    foreignKey: "recieverId",
  })
};

// Synchronize the model with the database (creates the "Users" table if it doesn't exist)
User.sync()
  .then(() => {
    console.log("User table created or synchronized.");
  })
  .catch((error) => {
    console.error("Error synchronizing User table:", error);
  });

module.exports = User;

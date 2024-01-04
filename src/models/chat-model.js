const { DataTypes } = require("sequelize");
const sequelize = require("./db");

const Message = sequelize.define(
  "messages",
  {
    senderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    recieverId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
  },
  {
    timestamps: false,
  }
);

Message.associate = (models) => {
  Message.belongsTo(models.User, { foreignKey: "senderId" });
  Message.belongsTo(models.User, { foreignKey: "recieverId" });
};

// Synchronize the model with the database (creates the "Message" table if it doesn't exist)
Message.sync()
  .then(() => {
    console.log("Message table created or synchronized.");
  })
  .catch((error) => {
    console.error("Error synchronizing Message table:", error);
  });

module.exports = Message;

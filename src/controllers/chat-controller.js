const chatService = require("../services/chat-service");

const getMessages = async (req, res) => {
  try {
    const userId = req.user.id;

    const { friendId } = req.body;

    if (!friendId) {
      return res.status(500).json({
        msg: "Not your friend",
      });
    }

    const msg = await chatService.viewMessage(userId);
    console.log("My message", msg);
    return res.status(201).json({
      msg: "Your messages",
      result: msg,
    });
  } catch (error) {
    console.log("View message", error);
    res.status(401).json({
      msg: "Error retireving messages",
      result: error,
    });
  }
};

const sendMessage = async (req, res) => {

    const { recieverId, content } = req.body;

    const userId = req.user.id;
    try {
    const send = await chatService.sendMessage(userId, recieverId, content);
    res.status(201).json({
      msg: "Message sent",
      result: send,
    });
  } catch (error) {
    console.log('Error in chat controller', error)
    res.status(401).json({
      msg: "Not delivered",
      result: error,
    });
  }
};

module.exports = {
  getMessages,
  sendMessage
};

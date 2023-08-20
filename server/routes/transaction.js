const {
  getOwnerBalance,
  hashMsg,
  getPublicKey,
  verifySignedMessage,
  getWallet,
  processSignature,
} = require("../utilities");
const express = require("express");
const router = express.Router();

// get wallet balance
router.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = getOwnerBalance(address);
  if (balance == null) {
    return res.status(400).send({
      message: "Successful",
      code: "400",
      data: null,
    });
  }
  return res.status(200).json({
    message: "Successful",
    code: "200",
    data: {
      balance,
    },
  });
});

router.post("/send", (req, res) => {
  const { sender, recipient, amount, message, signed } = req.body;

  if (Object.keys(signed).length === 0) {
    return res.status(400).json({
      message: "Signed message is required",
      code: "400",
      data: null,
    });
  }

  if (!message) {
    return res.status(400).json({
      message: "Message is required",
      code: "400",
      data: null,
    });
  }

  const hashedMessage = hashMsg(message);

  const parsedSignature = processSignature(signed);

  var publicKey = getPublicKey(parsedSignature, hashedMessage);

  let isVerified = verifySignedMessage(
    parsedSignature,
    hashedMessage,
    publicKey
  );

  if (!isVerified) {
    return res.status(403).json({
      message: "Action forbidden!",
      code: "403",
      data: null,
    });
  }

  if (!sender) {
    return res.status(400).json({
      message: "Sender address is required",
      code: "400",
      data: null,
    });
  }

  if (!recipient) {
    return res.status(400).json({
      message: "Receipient address is required",
      code: "400",
      data: null,
    });
  }

  if (sender === recipient) {
    return res.status(403).json({
      message: "Same address transaction not allowed.",
      code: "403",
      data: null,
    });
  }

  if (amount <= 0) {
    return res.status(400).json({
      message: "Amount not valid",
      code: "400",
      data: null,
    });
  }

  let senderWallet = getWallet(sender);

  if (!senderWallet) {
    return res.status(400).json({
      message: "Sender address not found.",
      code: "400",
      data: null,
    });
  }

  let receipientWallet = getWallet(recipient);

  if (!receipientWallet) {
    return res.status(400).json({
      message: "Receipient address not found",
      code: "400",
      data: null,
    });
  }

  if (senderWallet.balance < amount) {
    return res.status(400).send({
      code: "400",
      message: "Not enough funds!",
      data: null,
    });
  } else {
    senderWallet.balance -= amount;
    receipientWallet.balance += amount;
    return res.status(200).json({
      code: "200",
      message: "Successful",
      data: {
        balance: senderWallet.balance,
      },
    });
  }
});

module.exports = router;

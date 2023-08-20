const fs = require("fs");
const path = require("path");
const { secp256k1: secp } = require("ethereum-cryptography/secp256k1");
const { utf8ToBytes, toHex } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");

function getAllBalances() {
  const filePath = path.join(__dirname, "..", "records.json"); // The file path in the directory above the current directory
  const fsLines = fs.readFileSync(filePath, "utf8");
  return JSON.parse(fsLines);
}

const balances = getAllBalances();

function getOwnerBalance(owner) {
  const record = balances.find((record) => record.wallet === owner);
  if (!record) {
    return null;
  }
  return record.balance;
}

function getWallet(address) {
  let wallet = balances.find((w) => w.wallet === address);
  if (!wallet) {
    return null;
  }
  return wallet;
}

function hashMsg(msg) {
  const _bytes = utf8ToBytes(msg);
  const _hash = keccak256(_bytes);
  const _inHex = toHex(_hash);
  return _inHex;
}

function getPublicKey(signedMessage, hashedMessage) {
  return signedMessage.recoverPublicKey(hashedMessage).toRawBytes();
}

function verifySignedMessage(signedMessage, hashedMessage, publicKey) {
  return secp.verify(signedMessage, hashedMessage, toHex(publicKey));
}

function processSignature(stringSignature) {
  const deserialized = JSON.parse(stringSignature, (key, value) =>
    key === "r" || key === "s" ? BigInt(value) : value
  );
  var newSignature = new secp.Signature(deserialized.r, deserialized.s);
  newSignature.recovery = deserialized.recovery;
  return newSignature;
}

module.exports = {
  getOwnerBalance,
  getWallet,
  hashMsg,
  getPublicKey,
  verifySignedMessage,
  processSignature,
};

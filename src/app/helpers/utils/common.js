const crypto = require('crypto');

const getLastFromURL = async (url) => {
  let name = decodeURI(url).split('/').pop();
  name = name.replace(/(\r\n|\n|\r)/gm, '');
  return String(name);
};

const encrypt = (text, algorithm, secretKey) => {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, Buffer.from(secretKey, 'hex'), iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return iv.toString('hex') + encrypted; // IV + ciphertext
};

const decrypt = (encryptedData, algorithm, secretKey) => {
  if (encryptedData.length < 32) {
    throw new Error('Encrypted data is invalid or truncated.');
  }
  const iv = Buffer.from(encryptedData.slice(0, 32), 'hex'); // Extract IV
  const ciphertext = encryptedData.slice(32);
  const decipher = crypto.createDecipheriv(algorithm, Buffer.from(secretKey, 'hex'), iv);
  let decrypted = decipher.update(ciphertext, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
};

module.exports = {
  getLastFromURL,
  encrypt,
  decrypt
};
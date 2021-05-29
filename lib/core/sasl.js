const crypto = require('crypto')

// OpenGauss sha256 加密算法的 Node.js 实现
// 参考 OpenGauss 的 Go 语言数据库驱动实现: 
// https://github.com/opengauss-mirror/openGauss-connector-go-pq/blob/5febca52b422690e85543fcbd56b88d695b8fc30/conn.go#L1298

function generateKFromPBKDF2(password, random64code, serverIteration) {
  const salt = Buffer.from(random64code, 'hex')
  return crypto.pbkdf2Sync(Buffer.from(password), salt, serverIteration, 32, 'sha1')
}

function getKeyFromHmac(key, data) {
  const hex = crypto.createHmac('sha256', key)
    .update(data)
    .digest('hex')
  return Buffer.from(hex, 'hex')
}

function sha256(message) {
  const hex = crypto.createHash('sha256').update(message).digest('hex')
  return Buffer.from(hex, 'hex')
}

function xorBetweenPasswords(password1, password2) {
  return password1.map((byte, i) => byte ^ password2[i])
}

const openGaussSha256PasswordHash = function (password, random64code, token, serverIteration) {
  const k = generateKFromPBKDF2(password, random64code, serverIteration)
  const clientKey = getKeyFromHmac(k, 'Client Key')
  const storedKey = sha256(clientKey)
  const hmacResult = getKeyFromHmac(storedKey, Buffer.from(token, 'hex'))
  const h = xorBetweenPasswords(hmacResult, clientKey)

  return h.toString('hex')
}

module.exports = {
  openGaussSha256PasswordHash
}
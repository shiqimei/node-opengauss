/**
 * SHA-256 Pure-JavaScript Implementation
 * (c) Shiqi Mei 2021 MIT Licence
 */
function sha256(message) {
    /**
     * Converts a byte array into an int number
     */
    function int(bytes) {
        return parseInt(
            bytes.map(n => n
                .toString(2)
                .padStart(8, '0'))
                .join(''),
            2)
    }

    /**
     * Converts a int number into a byte array, the number
     * will be treated as a 32-bit integer by default
     */
    function bytes(int, bits = 32) {
        return int
            .toString(2)
            .padStart(bits, '0')
            .match(/.{8}/g).map(n => parseInt(n, 2))
    }

    /**
     * Creates an array of elements split into groups the length of `size`
     */
    function chunk(arr, size) {
        return Array.from(
            { length: Math.ceil(arr.length / size) },
            (_, i) => arr.slice(i * size, (i + 1) * size)
        )
    }

    // 1. Constants initialization
    const H = [
        0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a,
        0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19]
    const K = [
        0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5,
        0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
        0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3,
        0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
        0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc,
        0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
        0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7,
        0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
        0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13,
        0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
        0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3,
        0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
        0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5,
        0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
        0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208,
        0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2]
    const data = Array.from(unescape(encodeURIComponent(message)))
        .flat().map(char => char.charCodeAt(0))

    // 2. Preprocessing: bit-stuffing and length-stuffing
    const len = bytes(data.length * 8, 64)
    data.push(0b10000000)
    let zeros = 64 - (data.length + 8) % 64
    while (zeros-- > 0) data.push(0)
    data.push(...len)

    // 3. Caculate the hash by n 512-bit blocks iteration
    const ROTR = (x, n) => (x >>> n) | (x << (32 - n)),
        CH = (x, y, z) => (x & y) ^ (~x & z),
        MAJ = (x, y, z) => (x & y) ^ (x & z) ^ (y & z),
        BSIG0 = x => ROTR(x, 2) ^ ROTR(x, 13) ^ ROTR(x, 22),
        BSIG1 = x => ROTR(x, 6) ^ ROTR(x, 11) ^ ROTR(x, 25),
        SSIG0 = x => ROTR(x, 7) ^ ROTR(x, 18) ^ (x >>> 3),
        SSIG1 = x => ROTR(x, 17) ^ ROTR(x, 19) ^ (x >>> 10)

    for (const block of chunk(data, 64)) {
        const W = [], chunks = chunk(block, 4)
        for (let t = 0; t < 64; t++) t < 16
            ? W[t] = int(chunks[t])
            : W[t] = (
                SSIG1(W[t - 2]) + SSIG0(W[t - 15]) +
                W[t - 7] + W[t - 16]
            ) >>> 0

        let a = H[0], b = H[1], c = H[2], d = H[3],
            e = H[4], f = H[5], g = H[6], h = H[7]
        for (let t = 0; t < 64; t++) {
            const t1 = h + BSIG1(e) + CH(e, f, g) + W[t] + K[t]
            const t2 = BSIG0(a) + MAJ(a, b, c)
            h = g, g = f, f = e, e = (d + t1) >>> 0
            d = c, c = b, b = a, a = (t1 + t2) >>> 0
        }
        H[0] = (H[0] + a) >>> 0, H[1] = (H[1] + b) >>> 0
        H[2] = (H[2] + c) >>> 0, H[3] = (H[3] + d) >>> 0
        H[4] = (H[4] + e) >>> 0, H[5] = (H[5] + f) >>> 0
        H[6] = (H[6] + g) >>> 0, H[7] = (H[7] + h) >>> 0
    }

    return H.map(h => h.toString(16).padStart(8, '0')).join('')
}

module.exports = {
    sha256
}
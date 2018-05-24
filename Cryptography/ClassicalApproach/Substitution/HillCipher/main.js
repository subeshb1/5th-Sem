let HillCipher = {



    encrypt(plainText, keyMat) {
        let pair = this.prepareText(plainText);
        // console.log(pair);
        let tempPair = [];
        pair.forEach(pair => tempPair.push(this.multiply(keyMat, pair)));
        //   console.log(tempPair)

        return (this.fromPairList(tempPair));
    },
    decrypt(cipherText, keyMat) {
        let pair = this.prepareText(cipherText);
        let tempPair = [];
        let finalMat = this.scalarMult(
            this.adjugateMat(keyMat),
            this.moduloInverse(this.det(keyMat)))

        pair.forEach(pair => tempPair.push(this.multiply(keyMat, pair)));
        return (this.fromPairList(tempPair));
        // let keyMat = 
    },

    multiply(key, pair) {
        let acc = [];
        for (let i = 0; i < 2; i++) {
            for (let j = 0; j < 1; j++) {
                acc[i] = [];
                acc[i][j] = 0;
                for (let k = 0; k < 2; k++) {
                    acc[i][j] += key[i][k] * pair[k][j]
                }
                acc[i][j] %= 26;
            }
        }
        return acc
    },
    scalarMult(mat, val) {
        for (let i = 0; i < 2; i++) {
            for (let j = 0; j < 2; j++) {
                mat[i][j] = this.mod26(mat[i][j] * val);
            }
        }
        return mat;
    },

    prepareText(text) {
        text = text.replace(/\s+/g, "").toUpperCase();
        text = text.length & 1 ? text + "X" : text;
        let pair = [];

        for (let i = 0; i < text.length / 2; i += 1) {
            pair[i] = []
            pair[i][0] = [text.charCodeAt(i * 2) - 65]
            pair[i][1] = [text.charCodeAt(i * 2 + 1) - 65]
        }
        return pair
    },

    fromPairList(pairList) {
        let temp = "";
        pairList.forEach(pair => {
            pair.forEach(dat => {
                temp += String.fromCharCode(dat[0] + 65);
            })
        })

        return temp;
    },

    //Simple Brute Force method.
    moduloInverse(val, mod = 26) {
        val = this.mod26(val);
        for (let i = 1; i < mod; i++) {
            if ((val * i) % mod == 1) {
                return i;
            }
        }
        return -1;
    },

    mod26(val) {
        val = val % 26;
        val = val > 0 ? val : (26 + val);
        return val;
    },
    det(keyMat) {
        return keyMat[0][0] * keyMat[1][1] - keyMat[0][1] * keyMat[1][0];

    },
    adjugateMat(keyMat) {
        keyMat[0][0] ^= keyMat[1][1]
        keyMat[1][1] ^= keyMat[0][0]
        keyMat[0][0] ^= keyMat[1][1]

        keyMat[0][1] = this.mod26(-keyMat[0][1])
        keyMat[1][0] = this.mod26(-keyMat[1][0])
        return keyMat;
    }


};


let key = [[3, 3],
[2, 5]];
let plainText = "HELP"
let cipher1 = HillCipher.encrypt(plainText, key)

let decode = HillCipher.decrypt(cipher1, key)

console.log(cipher1,decode)
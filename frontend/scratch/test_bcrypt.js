
const bcrypt = require('bcryptjs');

async function testBcrypt() {
    try {
        const password = 'testpassword';
        const hash = await bcrypt.hash(password, 10);
        console.log('Hash successful:', hash);
        const match = await bcrypt.compare(password, hash);
        console.log('Compare successful:', match);
    } catch (err) {
        console.error('Bcrypt error:', err);
    }
}

testBcrypt();

import bcrypt from 'bcrypt';

const generateToken = async () => {
    const token = await bcrypt.hash('I know your secret', 10);
    console.log(token);
};

generateToken();
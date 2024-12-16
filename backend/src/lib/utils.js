import jwt from "jsonwebtoken";
const generateToken = (userId,res) =>{

    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '8h' });
    res.cookie('jwt', token,{
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 8 * 60 * 60 * 1000, 
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
    });
    return token;
}

export default generateToken;
import jwt from "jsonwebtoken"
export const generateToken = (userId: Object) => {

    if (!process.env.JWT_SECRET) {
        console.log("Environment variable missing")
    }
    const accessToken = jwt.sign({ userId }, process.env.JWT_SECRET,
        { expiresIn: "15m" }
    );


    if (!process.env.REFRESH_SECRET) {
        console.log("Environment variable missing")
    }
    const refreshToken = jwt.sign({ userId }, process.env.REFRESH_SECRET, {
        expiresIn: "7d"
    })

    return { accessToken, refreshToken }
}
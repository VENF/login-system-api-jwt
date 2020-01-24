import User from '../models/users'
import jwt from 'jsonwebtoken'
import config from '../helpers/config'

module.exports = {
    signUp: async (req, res, next) => {
        const body = req.body;
        try {
            const user = new User(body)
            user.password = await user.encryptPassword(user.password)
            await user.save()
            const token = jwt.sign({ id: user._id }, config.secret, { expiresIn: 60 * 60 * 24})
            res.status(200).json({
                msg: 'user has been created succcessfully',
                token
            })
        } catch (error) {
            res.status(500).json({
                error
            })
        }
    },
    signin: async (req, res, next) => {
        const data = req.body;
        try {
            const user = await User.findOne({email: data.email})
            if(!user){
                return res.status(404).json({
                    msg: "this email doesn't exits"
                })
            }else{
                const passwordValidate = await user.validatePassword(data.password)
                if(!passwordValidate){
                    return res.status(401).json({
                        msg: 'invalid password '
                    })
                }else{
                    const token = jwt.sign({ id: user._id }, config.secret, { expiresIn: 60 * 60 * 24 })
                    res.status(200).json({
                        auth: true,
                        token
                    })
                }
            }
        } catch (error) {
            res.status(500).json({
                error: error
            })
        }
    },
    dashboard: async (req, res, next) => {
        const user = await User.findById(req.userId, {password: 0})
        try {
            if(!user){
                res.status(404).json({
                    msg: 'No user found'
                })
            }else{
                res.status(200).json({
                    user
                })
            }
        } catch (error) {
            res.status(500).json({
                error
            })
        }
    }
}
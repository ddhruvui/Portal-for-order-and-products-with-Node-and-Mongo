const User = require('../models/users')
const mongoose = require('mongoose')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.user_signup = (req, res, next)=>{

    User.find({email : req.body.email})
    .exec()
    .then(user => {
        if (user.length >= 1){
            res.status(500).json({ error : 'User already exists'})
        }else{
            bcrypt.hash(req.body.password, 10, (error, hash)=>{
                if(error){
                    res.status(500).json({
                        error : error
                    })
                }else{
                    const user = new User({
                        _id : mongoose.Types.ObjectId(),
                        email: req.body.email,
                        password: hash
                    })
                    user.save()
                    .then(result =>{
                        res.status(201).json({
                            message: 'User is created'
                        })
                    })
                    .catch(err => res.status(500).json({ error: error }))
                }
            })
        }
    })

    
}

exports.user_login = (req, res, next)=>{
    User.find({ email : req.body.email}).exec()
    .then(user =>{
        if (user.count < 1){
            res.status(401).json( {message : 'Auth Failed'} )
        }
        bcrypt.compare(req.body.password, user[0].password, (error, result)=>{
            if(error){
                res.status(401).json( {message : 'Auth Failed'} )
            }
            else if(result){
                const token = jwt.sign(
                    {
                      email: user[0].email,
                      userId: user[0]._id
                    },
                    process.env.JWT_KEY,
                    {
                        expiresIn: "1h"
                    }
                );
                res.status(200).json( {message : 'Auth Successfull', token : token} )
            }
            else{
                res.status(401).json( {message : 'Auth Failed'} )
            }
            
        })
    })
    .catch( error => res.status(500).json( {message : 'Auth Failed'} ))
}
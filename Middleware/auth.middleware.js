const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = async (req, res, next) => {
    try {
        const authHeader = req.header("Authorization");
        if (!authHeader) {
            return res.status(500).json({
                success: false,
                message: "Token is missing"
            });
        }

        const token = authHeader.split(" ")[1];
        
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Access denied. No token provided."
            });
        }

        try {
            const decoded = await jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;

        

            if (req.user.role !== "Admin") { 
                return res.status(403).json({
                    success: false,
                    message: "Access denied. Admins only."
                });
            }

            next();
        } catch (error) {
            return res.status(400).json({ 
                success: false,
                message: 'Invalid token.'
            });
        }

    } catch (error) {
        console.error('Auth Middleware Error:', error);
        return res.status(401).json({
            success: false,
            message: "Something went wrong while verifying token"
        });
    }
};

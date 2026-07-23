const express = require("express");
const router = express.Router();
const pool = require("../db");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const transporter = require("../services/resetEmail");

// Generate a password reset token
router.post("/forgot-password", async (req, res) => {

    try {
        const { email } = req.body;
        const normalizedEmail = email.toLowerCase().trim();

        const result = await pool.query(
            `
            SELECT id
            FROM users
            WHERE email = $1
            `,
            [normalizedEmail]
        );

        if (result.rows.length === 0) {
            return res.json({
                message: "If an account exists with that email, a reset link has been sent."
            });
        }

        const token = crypto.randomBytes(32).toString("hex");
        const expires = new Date(Date.now() + 15 * 60 * 1000);
        await pool.query(
            `
            UPDATE users
            SET
                reset_password_token = $1,
                reset_password_expires = $2
            WHERE email = $3
            `,
            [ token, expires, normalizedEmail ]
        );
        const resetLink =
            `http://localhost:5173/reset-password/${token}`;
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: normalizedEmail,
            subject: "Step Matters Reset Password",
            html: `
                <h2>Reset your password:</h2>

                <p>We received a request to reset your password.</p>

                <p>
                    Please click the link below:
                </p>

                <a href="${resetLink}">
                    Reset my password
                </a>

                <p>
                    This link expires in 15 minutes. Thank you!
                </p>

                <p>
                    Regards
                </p>
            `
        });
        res.json({
            message: "If an account exists with that email, a reset link has been sent."
        });

    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error");
    }
});

// Update user password using reset token
router.post("/reset-password", async (req, res) => {

    try {
        const { token, password } = req.body;
        if (password.length < 6) {
            return res.status(400).json({
                message: "Password must be at least 6 characters long."
            });
        }
        const result = await pool.query(
            `
            SELECT id
            FROM users
            WHERE
                reset_password_token = $1
                AND
                reset_password_expires > NOW()
            `,
            [ token ]
        );

        if (result.rows.length === 0) {
            return res.status(400).json({
                message: "Invalid or expired reset link."
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await pool.query(
            `
            UPDATE users
            SET
                password = $1,
                reset_password_token = NULL,
                reset_password_expires = NULL
            WHERE id = $2
            `,
            [
                hashedPassword,
                result.rows[0].id
            ]
        );

        res.json({
            message: "Password updated successfully."
        });
    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error");
    }
});

module.exports = router;
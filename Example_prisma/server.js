const express = require("express");
const app = express();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient(); //Cho phép thực hiện các câu query
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "1049232788243-ovtfvs1vvgeg26ocgn90peg7i5vfv6pi.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "/auth/google/callback",
      proxy: true
    },
    (accessToken) => {
      console.log(accessToken);
    }
  )
);

app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);
app.get("/auth/google/callback", passport.authenticate("google"));
app.listen(5000);
// app.use("/api", async (req, res) => {
//     const role = await prisma.role.create({
//       data: {
//         role_name: "ADMIN",
//       },
//     });
  
//     res.send(role);
//   });


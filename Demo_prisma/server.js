const express = require('express')
const app = express();
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient() //Cho phép thực hiện các câu query

app.use('/api', async (req,res)=> {
    const role = await prisma.role.create({
        data: {
            role_name: "ADMIN"
        }
    })

    res.send(role)
})

app.listen(3000)

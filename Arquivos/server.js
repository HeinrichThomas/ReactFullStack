import express, { query } from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const app = express()
app.use(express.json())
app.use(cors())

app.post('/usuarios', async (req, res) => {
   
    await prisma.user.create({
        data:{
            email: req.body.email,
            age: req.body.age,
            name: req.body.name
        }
    })

    res.status(201).send(req.body.nome)
})

app.put('/usuarios/:id', async (req, res) => {
   
    await prisma.user.update({

        where:{
            id: req.params.id
        },
        data:{
            email: req.body.email,
            age: req.body.age,
            name: req.body.name
        }
    })

    res.status(201).send(req.body.nome)
})

app.delete('/usuarios/:id', async (req, res) => {
    try {
        await prisma.user.delete({
            where: {
                id: req.params.id
            }
        });

        res.status(200).json({ message: "Usuário deletado com sucesso" });
    } catch (error) {
        console.error("Erro ao deletar usuário:", error);
        res.status(500).json({ error: "Erro ao deletar usuário" });
    }
});
app.get('/usuarios', async (req, res) => {
    let users = []

    if(req.query){
        users = await prisma.user.findMany({
            where:{
                name: req.query.name
            }
        })
    }
    else{

        const users = await prisma.user.findMany()
    }

    res.status(200).json(users)

})


app.listen(4022)

const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());

app.use(express.json());

   app.get('/', (req, res) => {
   res.send('Backend funcionando com sucesso!');

   });
   const authRoutes = require('./routes/auth');
   app.use('/auth', authRoutes);
   const PORT = 3000;
    app.listen(PORT, () => {
       console.log(`Servidor rodando na porta ${PORT}`);
    });

    //importação codigo de autenticação de cadastro e login

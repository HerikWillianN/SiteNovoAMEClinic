require('dotenv').config();
const express = require('express');
const db = require('./db');
const bcrypt = require('bcrypt');

const app = express();
app.use(express.json()); // Middleware to parse JSON bodies

const PORT = process.env.PORT || 8000;

// Test and DB Test routes (unchanged)
app.get('/api/test', (req, res) => res.json({ message: 'Backend is running!' }));
app.get('/api/db-test', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT NOW()');
    res.json({ message: 'Database connection successful!', time: rows[0].now });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Database connection failed!' });
  }
});

// Database Setup Route
app.get('/api/setup-database', async (req, res) => {
  try {
    await db.query('DROP TABLE IF EXISTS consultas CASCADE;');
    await db.query('DROP TABLE IF EXISTS users CASCADE;');
    await db.query('DROP TABLE IF EXISTS medicos CASCADE;');

    // Medicos Table
    await db.query(`
      CREATE TABLE medicos (
        id SERIAL PRIMARY KEY,
        nome VARCHAR(255) NOT NULL,
        especialidade VARCHAR(255) NOT NULL,
        crm VARCHAR(255) NOT NULL,
        "fotoUrl" VARCHAR(255),
        "horarioInicio" TIME,
        "horarioFim" TIME,
        "diasDisponiveisMes" TEXT[],
        ativo BOOLEAN DEFAULT true
      );
    `);
    await db.query(`
      INSERT INTO medicos (nome, especialidade, crm, "fotoUrl", "horarioInicio", "horarioFim", "diasDisponiveisMes", ativo) VALUES
      ('Dr. João da Silva', 'Cardiologia', '12345-SP', 'https://i.pravatar.cc/150?img=1', '08:00', '17:00', ARRAY['2025-08-20', '2025-08-22', '2025-08-25'], true),
      ('Dra. Maria Oliveira', 'Dermatologia', '54321-RJ', 'https://i.pravatar.cc/150?img=2', '09:00', '18:00', ARRAY['2025-08-21', '2025-08-28'], true),
      ('Dr. Pedro Santos', 'Ortopedia', '98765-MG', 'https://i.pravatar.cc/150?img=3', '10:00', '19:00', ARRAY['2025-08-26'], true);
    `);

    // Users Table
    await db.query(`
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        "fullName" VARCHAR(255) NOT NULL,
        cpf VARCHAR(20) UNIQUE NOT NULL,
        "birthDate" DATE,
        phone VARCHAR(20),
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        cep VARCHAR(10),
        street VARCHAR(255),
        number VARCHAR(20),
        complement VARCHAR(255),
        city VARCHAR(100),
        state VARCHAR(2),
        "hasInsurance" BOOLEAN,
        "insuranceName" VARCHAR(255),
        "insuranceId" VARCHAR(255),
        "emergencyContactName" VARCHAR(255),
        "emergencyContactPhone" VARCHAR(20),
        "medicalNotes" TEXT,
        "termsAccepted" BOOLEAN,
        "privacyAccepted" BOOLEAN,
        type VARCHAR(50) DEFAULT 'paciente',
        "createdAt" TIMESTAMPTZ DEFAULT NOW()
      );
    `);
    const saltRounds = 10;
    const adminPassword = await bcrypt.hash('admin123', saltRounds);
    const pacientePassword = await bcrypt.hash('paciente123', saltRounds);
    await db.query(`
      INSERT INTO users ("fullName", cpf, email, password, type) VALUES
      ('Admin User', '00000000000', 'admin@ameclinic.com', '${adminPassword}', 'admin'),
      ('Paciente Teste', '11111111111', 'paciente@ameclinic.com', '${pacientePassword}', 'paciente');
    `);

    // Consultas Table
    await db.query(`
      CREATE TABLE consultas (
        id SERIAL PRIMARY KEY,
        "pacienteId" INTEGER REFERENCES users(id) ON DELETE CASCADE,
        "medicoId" INTEGER REFERENCES medicos(id) ON DELETE CASCADE,
        data DATE NOT NULL,
        hora TIME NOT NULL,
        especialidade VARCHAR(255),
        status VARCHAR(50) DEFAULT 'Agendada',
        observacoes TEXT,
        "createdAt" TIMESTAMPTZ DEFAULT NOW()
      );
    `);
    await db.query(`
      INSERT INTO consultas ("pacienteId", "medicoId", data, hora, especialidade, status, observacoes) VALUES
      (2, 1, '2025-09-10', '10:00', 'Cardiologia', 'Agendada', 'Consulta de rotina.'),
      (2, 2, '2025-09-12', '15:00', 'Dermatologia', 'Concluída', 'Remoção de sinal.');
    `);

    res.status(200).send('Database setup complete! Tables medicos, users, and consultas created.');
  } catch (err) {
    console.error('Error setting up database:', err);
    res.status(500).send('Error setting up database.');
  }
});

// Medicos Routes
app.get('/api/medicos', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM medicos ORDER BY id');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching medicos:', err);
    res.status(500).json({ message: 'Error fetching medicos' });
  }
});

// Auth Routes
app.post('/api/register', async (req, res) => {
  const { fullName, cpf, email, password, ...otherData } = req.body;
  try {
    const userExists = await db.query('SELECT * FROM users WHERE email = $1 OR cpf = $2', [email, cpf]);
    if (userExists.rows.length > 0) {
      return res.status(400).json({ message: 'Email ou CPF já cadastrado.' });
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = await db.query(
      `INSERT INTO users ("fullName", cpf, email, password) VALUES ($1, $2, $3, $4) RETURNING id, "fullName", email, type, "createdAt"`,
      [fullName, cpf, email, hashedPassword]
    );
    res.status(201).json(newUser.rows[0]);
  } catch (err) {
    console.error('Error during registration:', err);
    res.status(500).json({ message: 'Erro interno do servidor ao tentar registrar.' });
  }
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const { rows } = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    if (rows.length === 0) {
      return res.status(401).json({ message: 'Credenciais inválidas.' });
    }
    const user = rows[0];
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Credenciais inválidas.' });
    }
    const { password: _, ...userData } = user;
    res.status(200).json(userData);
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ message: 'Erro interno do servidor ao tentar fazer login.' });
  }
});

// Consultas Routes
app.get('/api/consultas/paciente/:pacienteId', async (req, res) => {
  const { pacienteId } = req.params;
  try {
    const { rows } = await db.query(
      `SELECT c.*, m.nome as medico_nome
       FROM consultas c
       JOIN medicos m ON c."medicoId" = m.id
       WHERE c."pacienteId" = $1
       ORDER BY c.data, c.hora`,
      [pacienteId]
    );
    res.json(rows);
  } catch (err) {
    console.error('Error fetching consultas for paciente:', err);
    res.status(500).json({ message: 'Error fetching consultas for paciente' });
  }
});

app.get('/api/consultas', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM consultas ORDER BY data, hora');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching consultas:', err);
    res.status(500).json({ message: 'Error fetching consultas' });
  }
});

app.post('/api/consultas', async (req, res) => {
  const { pacienteId, medicoId, data, hora, especialidade, observacoes } = req.body;
  try {
    const newConsulta = await db.query(
      `INSERT INTO consultas ("pacienteId", "medicoId", data, hora, especialidade, observacoes)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [pacienteId, medicoId, data, hora, especialidade, observacoes]
    );
    res.status(201).json(newConsulta.rows[0]);
  } catch (err) {
    console.error('Error creating consulta:', err);
    res.status(500).json({ message: 'Error creating consulta' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

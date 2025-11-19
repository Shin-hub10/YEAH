const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Parse form data & JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Home page
app.get('/', (req, res) => {
    res.send(`
        <h1>Welcome to My Interactive Server, Budd!</h1>
        <p>Type your name and get greeted:</p>
        <form action="/greet" method="POST">
            <input name="name" placeholder="Your name" required />
            <button type="submit">Say Hi</button>
        </form>
        <p>Or try some buttons:</p>
        <button onclick="window.location.href='/fun'">Fun Page</button>
        <button onclick="window.location.href='/about'">About</button>
    `);
});

// Greeting route
app.post('/greet', (req, res) => {
    const name = req.body.name || 'Friend';
    res.send(`
        <h1>Hello, ${name}! 🎉</h1>
        <a href="/">Go back</a>
    `);
});

// Fun page with buttons
app.get('/fun', (req, res) => {
    res.send(`
        <h1>Fun Page!</h1>
        <button onclick="alert('You clicked me! 😎')">Click Me</button>
        <button onclick="window.location.href='/game'">Play Game</button>
        <br><br>
        <a href="/">Go back</a>
    `);
});

// About page
app.get('/about', (req, res) => {
    res.send(`
        <h1>About This Server</h1>
        <p>This is Budd's interactive Node server deployed on Render!</p>
        <a href="/">Go back</a>
    `);
});

// Simple game page
app.get('/game', (req, res) => {
    res.send(`
        <h1>Mini Guessing Game</h1>
        <p>Guess a number between 1 and 5:</p>
        <form action="/game-check" method="POST">
            <input type="number" name="guess" min="1" max="5" required />
            <button type="submit">Guess</button>
        </form>
        <a href="/">Go back</a>
    `);
});

// Game check
app.post('/game-check', (req, res) => {
    const guess = parseInt(req.body.guess);
    const correct = Math.floor(Math.random() * 5) + 1;
    let message = (guess === correct)
        ? 🎉 You guessed it! The number was ${correct}.
        : ❌ Nope! The correct number was ${correct}.;
    res.send(`
        <h1>${message}</h1>
        <a href="/game">Try Again</a><br>
        <a href="/">Go back</a>
    `);
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
    console.log(Interactive server running on port ${PORT});
});
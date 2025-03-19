const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

const clients = new Set();
let gameState = {}; // Initial game state

wss.on('connection', (ws) => {
    clients.add(ws);

    // Send initial game state to the new client
    ws.send(JSON.stringify({ type: 'state', state: gameState }));

    ws.on('message', (message) => {
        try {
            const data = JSON.parse(message);
            if (data.type === 'input') {
                // Process input and update game state
                gameState = processInput(gameState, data.input); // Placeholder function
                broadcastState();
            }
        } catch (error) {
            console.error('Error parsing message:', error);
        }
    });

    ws.on('close', () => {
        clients.delete(ws);
    });
});

function broadcastState() {
    clients.forEach((client) => {
        client.send(JSON.stringify({ type: 'state', state: gameState }));
    });
}

function processInput(state, input) {
    // Basic input processing (replace with your game logic)
    // Example: Update player position based on input
    return { ...state, lastInput: input };
}

console.log('WebSocket server started on port 8080');

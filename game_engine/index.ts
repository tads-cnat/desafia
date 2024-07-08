import { GameServer } from "./src/GameServer";

const server = new GameServer();
server.initialize();
server.startListening();

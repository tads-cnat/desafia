import { GameServer } from "./src/GameServer";
import BaseService from "./src/services/BaseService";

const QUESTIONARIO_ID = 2;

const server = new GameServer();

server.setService(new BaseService(QUESTIONARIO_ID));

server.initialize();

server.startListening();

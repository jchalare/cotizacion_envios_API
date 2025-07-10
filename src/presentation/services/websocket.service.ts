import { Server } from "http";
import { WebSocketServer, WebSocket } from "ws";
import { CustomError } from "../../domain";

interface Options {
  server: Server;
  path?: string;
}

export class WssService {
  private static _instance: WssService;
  private wss: WebSocketServer;

  private constructor(options: Options) {
    const { server, path = "/ws" } = options;
    this.wss = new WebSocketServer({ server, path });
    this.startWebsocketServer();
  }

  static get instance(): WssService {
    if (!WssService._instance) {
      CustomError.badRequest("WssService is not initialized");
    }
    return WssService._instance;
  }

  static initWebsocketServer(options: Options) {
    WssService._instance = new WssService(options);
  }

  public sendMessage(type: string, payload: Object) {
    this.wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ type, payload }));
      }
    });
  }

  public startWebsocketServer() {
    this.wss.on("connection", (ws: WebSocket) => {
      console.log("🟢 [WSS] WebSocket connection established.");

      ws.on("message", (message) => {
        console.log("🟢 [WSS] Received message:", message);
        ws.send("🟢 [WSS] Echo: " + message);
      });

      ws.on("close", () => {
        console.log("🔌 [WSS] WebSocket connection closed.");
      });
    });
  }
}

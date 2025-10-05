// src/chat/chat.gateway.ts
import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';

@WebSocketGateway({ cors: { origin: '*' } })
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  constructor(private chatService: ChatService) {}

  @SubscribeMessage('message:send')
  async handleMessage(
    @MessageBody() data: { chatId: number; userId: number; text: string },
    @ConnectedSocket() client: Socket,
  ) {
    console.log('📥 Получено сообщение от клиента:', data);

    if (!data.userId) {
      console.log('❌ userId отсутствует в сообщении');
      return;
    }

    const message = await this.chatService.saveMessage(
      data.chatId,
      data.userId,
      data.text,
    );

    // 📡 Отправляем ВСЕМ в чате новое сообщение
    this.server.emit('message:receive', message);
  }
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

    private messages: string[] = [];

    // Add para adicionar uma mensagem nova
    add(message: string): void {
        this.messages.push(message);
    }

    // Limpar as mensagens
    clear(): void {
        this.messages = [];
    }

    // Retornar as mensagens
    getMessages(): string[] {
        return this.messages;
    }

}

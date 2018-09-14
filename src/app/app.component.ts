import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'app';

  Socket: WebSocket;

  async ngOnInit() {
    await this.start();
  }

  private start(): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        this.InitializeSocket(resolve, reject);
      }
      catch (error) {
        reject(error);
      }
    });
  }

  private InitializeSocket(resolve, reject) {
    let url = this.BuildUrl('http://localhost:7878');

    console.log(`Server to connect: ${url}`);
    this.Socket = new WebSocket(url);

    this.Socket.onclose = (e) => {
      console.log(`WebSocket closed ${e}.`);
    };
    this.Socket.onmessage = (e) => {
      console.log(`WebSocket receive message: ${e}.`);
    };
    this.Socket.onopen = (e) => {
      console.log(`WebSocket opened ${e}.`);
      resolve(true);
    };
    this.Socket.onerror = (e) => {
      console.log(`WebSocket error ${e}.`);
      reject(e);
    };
  }
  private BuildUrl(url: string): string {
    let result = url;
    if (url.toLowerCase().startsWith('http:')) {
      result = url.replace('http:', 'ws:');
    } else if (url.toLowerCase().startsWith('https:')) {
      result = url.replace('https:', 'wss:');
    }
    return result;
  }
}

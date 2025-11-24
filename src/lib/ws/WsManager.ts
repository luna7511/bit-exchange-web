type WSCallback = (data: any) => void;

export class WsManager {
    private url: string;
    private ws: WebSocket | null = null;
    private callbacks: Map<string, Set<WSCallback>> = new Map(); // 使用 Set 避免重复回调
    private reconnectTimer: any = null;
    private isManualClose = false; // 是否主动关闭
    private reconnectAttempts = 0;
    private maxReconnectAttempts = 10; // 最大重连次数
    private reconnectBaseDelay = 1500; // 基础重连间隔(ms)

    constructor(url: string) {
        this.url = url;
    }

    connect() {
        if (this.ws && this.ws.readyState === WebSocket.OPEN) return;

        this.ws = new WebSocket(this.url);

        this.ws.onopen = () => {
            console.log("[WS] connected");
            this.reconnectAttempts = 0;
            this.resubscribeAll();
        };

        this.ws.onmessage = (event) => {
            try {
                const msg = JSON.parse(event.data);
                const { topic, data } = msg;

                if (topic && this.callbacks.has(topic)) {
                    this.callbacks.get(topic)!.forEach((cb) => cb(data));
                }
            } catch (e) {
                console.error("[WS] parse message error", e);
            }
        };

        this.ws.onclose = () => {
            console.log("[WS] closed");
            if (!this.isManualClose) {
                this.reconnect();
            }
        };

        this.ws.onerror = (err) => {
            console.error("[WS] error", err);
            this.ws?.close();
        };
    }

    private reconnect() {
        if (this.reconnectAttempts >= this.maxReconnectAttempts) {
            console.error("[WS] max reconnect attempts reached");
            return;
        }

        const delay = this.reconnectBaseDelay * Math.pow(2, this.reconnectAttempts); // 指数退避
        console.log(`[WS] reconnecting in ${delay}ms`);
        this.reconnectAttempts++;

        if (this.reconnectTimer) {
            clearTimeout(this.reconnectTimer);
        }
        this.reconnectTimer = setTimeout(() => {
            this.connect();
        }, delay);
    }

    close() {
        this.isManualClose = true;
        if (this.reconnectTimer) {
            clearTimeout(this.reconnectTimer);
        }
        this.ws?.close();
        this.ws = null;
    }

    subscribe(topic: string, callback: WSCallback) {
        if (!this.callbacks.has(topic)) {
            this.callbacks.set(topic, new Set());
        }

        const set = this.callbacks.get(topic)!;
        if (!set.has(callback)) {
            set.add(callback);
            this.send({ op: "subscribe", topic });
        }
    }

    unsubscribe(topic: string, callback?: WSCallback) {
        if (!this.callbacks.has(topic)) return;

        if (callback) {
            this.callbacks.get(topic)!.delete(callback);
            if (this.callbacks.get(topic)!.size === 0) {
                this.callbacks.delete(topic);
                this.send({ op: "unsubscribe", topic });
            }
        } else {
            // 删除所有回调
            this.callbacks.delete(topic);
            this.send({ op: "unsubscribe", topic });
        }
    }

    private resubscribeAll() {
        this.callbacks.forEach((set, topic) => {
            if (set.size > 0) {
                this.send({ op: "subscribe", topic });
            }
        });
    }

    private send(msg: any) {
        if (this.ws?.readyState === WebSocket.OPEN) {
            this.ws.send(JSON.stringify(msg));
        }
    }
}
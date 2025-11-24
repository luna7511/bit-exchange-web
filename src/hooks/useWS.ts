import { useEffect, useCallback, useRef } from "react";
import { WsManager } from "../lib/ws/WsManager";

let wsInstance: WsManager | null = null;

export function useWS() {
    // 保存订阅回调，避免重复订阅
    const callbacksRef = useRef<Map<string, (v: any) => void>>(new Map());

    // 初始化 WebSocket 单例
    const initWebsocket = useCallback(() => {
        if (!wsInstance) {
            wsInstance = new WsManager("wss://stream.binance.com/ws");
            wsInstance.connect();
        }
    }, []);

    // 订阅
    const subscribe = useCallback((topic: string, onData: (v: any) => void) => {
        initWebsocket();

        // 存储回调
        callbacksRef.current.set(topic, onData);
        wsInstance?.subscribe(topic, onData);
    }, [initWebsocket]);

    // 取消订阅
    const unsubscribe = useCallback((topic: string) => {
        callbacksRef.current.delete(topic);
        wsInstance?.unsubscribe(topic);
    }, []);

    // 组件卸载时清理订阅（可选，根据业务决定是否保留 ws 单例）
    useEffect(() => {
        return () => {
            callbacksRef.current.forEach((_, topic) => {
                wsInstance?.unsubscribe(topic);
            });
            callbacksRef.current.clear();
            // wsInstance?.close(); // 如果想完全断开 ws，可以打开
        };
    }, []);

    return {
        initWebsocket,
        subscribe,
        unsubscribe
    };
}
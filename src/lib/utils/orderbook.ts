/**
 * 盘口工具
 */

/**
 *
 */
export interface OrderBookItem {
    price: number;
    amount: number;
}

/**
 * 合并 orderbook snapshot 与增量 diff
 */
export function mergeOrderBook(
    snapshot: OrderBookItem[],
    updates: OrderBookItem[]
): OrderBookItem[] {
    const map = new Map<number, number>();
    snapshot.forEach((item) => map.set(item.price, item.amount));
    updates.forEach((item) => {
        if (item.amount === 0) map.delete(item.price);
        else map.set(item.price, item.amount);
    });

    return Array.from(map.entries())
        .map(([price, amount]) => ({ price, amount }))
        .sort((a, b) => b.price - a.price); // 默认降序，适合 bids
}

/**
 * 对 orderbook 排序
 */
export function sortOrderBook(
    list: OrderBookItem[],
    type: "asc" | "desc" = "desc"
) {
    return list.slice().sort((a, b) => (type === "asc" ? a.price - b.price : b.price - a.price));
}
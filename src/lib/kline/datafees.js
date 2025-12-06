class Datafeeds {
  // 传入数据源
  self = null
  //订阅列表
  subscribers = {}
  // 加载中
  requestsPending = false
  // 商品数据
  barList = []
  // 最后一条时间
  lastbBarListTime = ''
    // sse实例
    sse = null
  /**
   * 实例化
   * @param {Object} arg
   */
  constructor(arg) {
    this.self = arg
      this.sse = null; // 保存 SSE 实例
  }
  onReady(callback) {
    this.self.getConfig(callback)
  }
  /**
   * 获取商品历史数据
   * @param {*Object} symbolInfo  商品信息对象
   * @param {*String} resolution  分辨率
   * @param {*Number} rangeStartDate  时间戳、最左边请求的K线时间
   * @param {*Number} rangeEndDate  时间戳、最右边请求的K线时间
   * @param {*Function} onHistoryCallback  成功回调函数
   * @param {*Function} onErrorCallback  异常回调函数
   * @param {*Boolean} firstDataRequest  第一次调用此商品/分辨率的历史记录
   *
   */
  async getBars(
    symbolInfo,
    resolution,
    from,
    to,
    onHistoryCallback,
    onErrorCallback,
    firstDataRequest
  ) {
    if (this.requestsPending) {
      return
    }

    if (firstDataRequest) {
      this.barList = []
      from = ''
    }

    if (this.barList.length) {
      // this.lastbBarListTime = this.barList[this.barList.length - 1].time
      this.lastbBarListTime = this.barList[0].time / 1000;
    } else {
      this.lastbBarListTime = ''
    }

    if (this.lastbBarListTime) {
      from = this.lastbBarListTime
    }

    this.requestsPending = true
    const barList = await this.self.getBars({
      symbolInfo,
      resolution,
      from,
      to,
      onHistoryCallback,
      onErrorCallback,
      firstDataRequest
    })
      console.log("barList", barList)
    this.requestsPending = false
    if (barList && barList.length) {
      this.barList = barList.concat(this.barList)
    } else {
      // 历史数据加载为空
      onHistoryCallback([], { noData: true })
      return
    }

    if (this.barList.length) {
      // noData true 无数据 false有历史数据
      onHistoryCallback(this.barList, { noData: false, nextTime: this.barList[0].time })
    } else {
      // 改分辨率无数据
      onHistoryCallback([], { noData: true })
    }
  }

  /**
   * 订阅K线数据。图表库将调用onRealtimeCallback方法以更新实时数据
   * @param {*Object} symbolInfo 商品信息
   * @param {*String} resolution 分辨率
   * @param {*Function} onRealtimeCallback 回调函数
   * @param {*String} subscriberUID 监听的唯一标识符
   * @param {*Function} onResetCacheNeededCallback (从1.7开始): 将在bars数据发生变化时执行
   */
  subscribeBars(
    symbolInfo,
    resolution,
    onRealtimeCallback,
    subscriberUID,
    onResetCacheNeededCallback
  ) {
    if (this.subscribers[subscriberUID]) {
      return
    }
    this.subscribers[subscriberUID] = {
      lastBarTime: null,
      resolution: resolution,
      onRealtimeCallback: onRealtimeCallback,
      onResetCacheNeededCallback: onResetCacheNeededCallback
    }


      // ✨ 调用外部传入的 startSSE
      this.sse = this.self.startSSE?.({
          symbol: symbolInfo.symbol,
          interval: resolution,
          onMessage: (data) => {
              this.updateData(data);
          },
      });
  }

  /**
   * 取消订阅K线数据
   * @param {*String} subscriberUID 监听的唯一标识符
   */
  unsubscribeBars(subscriberUID) {
    if (!this.subscribers[subscriberUID]) {
      return
    }
    delete this.subscribers[subscriberUID]

      // 🔥 取消订阅（关闭 SSE）
      if (Object.keys(this.subscribers).length === 0) {
          this.self.stopSSE?.(this.sse);
          this.sse = null;
      }
  }
  /**
   * @param {*String} symbolName  商品名称或ticker
   * @param {*Function} onSymbolResolvedCallback 成功回调
   * @param {*Function} onResolveErrorCallback   失败回调
   * `resolveSymbol` should return result asynchronously.
   */
  async resolveSymbol(symbolName, onSymbolResolvedCallback, onResolveErrorCallback) {
    let resolveSymbol = await this.self.resolveSymbol()
    return onSymbolResolvedCallback(resolveSymbol)
  }
  /**
   * 更新数据
   * @param {Object} newData
   */
  updateData(newData) {
    // 去重
    // if (this.barList.length > 5000) {
    // 	this.barList.shift()
    // }

    let subscriberUID = Object.keys(this.subscribers)[0] || ''
    let subscriberObj = this.subscribers[subscriberUID] || {}
    // console.log('更新数据', newData)
    if (subscriberObj.lastBarTime < newData.time) {
      this.barList.push(newData)
      subscriberObj.lastBarTime = newData.time
      subscriberObj?.onRealtimeCallback && subscriberObj?.onRealtimeCallback(newData)
    } else if (subscriberObj.lastBarTime == newData.time) {
        const lastBar = this.barList[this.barList.length - 1];
        // 合并同周期
        Object.assign(lastBar, newData);
        subscriberObj?.onRealtimeCallback?.(lastBar);
      //   let [tempObj] = this.barList.slice(-1)
      //   console.log('updateData', tempObj )
      //   Object.keys(tempObj).forEach((key) => {
      //       tempObj[key] = newData[key]
      //   })
      // subscriberObj?.onRealtimeCallback && subscriberObj?.onRealtimeCallback(newData)
    }
  }

  // /**
  //  * 获取服务器时间
  //  * @param {*Function} callback   设置回调
  //  */
  // getServerTime(callback) {
  //   // callback(unixTime)
  //   this.self.getServerTime(callback)
  // }
  /**
   * 图表库调用这个函数来获得可见的K线范围的标记
   */
  getMarks() {}
  /**
   * 图表库调用此函数获取可见K线范围的时间刻度标记
   */
  getTimescaleMarks() {}
  /**
   * 图表库在它要请求一些历史数据的时候会调用这个函数，让你能够覆盖所需的历史深度
   */
  calculateHistoryDepth(resolution, resolutionBack, intervalBack) {
    // console.log('calculateHistoryDepth', resolution, resolutionBack, intervalBack)
  }
}

export default Datafeeds

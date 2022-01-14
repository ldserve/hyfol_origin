(function (para) {
  var p = para.sdk_url, n = para.name, w = window, d = document, s = 'script', x = null, y = null;
  if (typeof (w['sensorsDataAnalytic201505']) !== 'undefined') {
    return false;
  }
  w['sensorsDataAnalytic201505'] = n;
  w[n] = w[n] || function (a) { return function () { (w[n]._q = w[n]._q || []).push([a, arguments]); } };
  var ifs = ['track', 'quick', 'register', 'registerPage', 'use', 'registerOnce', 'trackSignup', 'trackAbtest', 'setProfile', 'setOnceProfile', 'appendProfile', 'incrementProfile', 'deleteProfile', 'unsetProfile', 'identify', 'login', 'logout', 'trackLink', 'clearAllRegister', 'getAppStatus', 'setItem', 'deleteItem'];
  for (var i = 0; i < ifs.length; i++) {
    w[n][ifs[i]] = w[n].call(null, ifs[i]);
  }
  if (!w[n]._t) {
    x = d.createElement(s), y = d.getElementsByTagName(s)[0];
    x.async = 1;
    x.src = p;
    x.setAttribute('charset', 'UTF-8');
    w[n].para = para;
    y.parentNode.insertBefore(x, y);
  }
})({
  sdk_url: 'https://cdn.shopifycdn.net/s/files/1/0595/0691/7535/files/sensorsdata.min.js?v=1639989639',
  name: 'sensors',
  server_url: 'https://data.ld-bdp.com/sa?project=default',
  send_type: 'beacon',
  show_log: true,
  heatmap: {
    //是否开启点击图，default 表示开启，自动采集 $WebClick 事件，可以设置 'not_collect' 表示关闭。
    clickmap: 'default',
    //是否开启触达图，not_collect 表示关闭，不会自动采集 $WebStay 事件，可以设置 'default' 表示开启。
    scroll_notice_map: 'default',
    scroll_delay_time: 3000,

  }
});
var device_type;
function getDevice_type() {
  if (document.documentElement.clientWidth >= 1000) {
    device_type = "pc";
  } else if (document.documentElement.clientWidth >= 641) {
    device_type = "tablet";
  } else {
    device_type = "mobile";
  }
}
function getSiteCategory(){
  try {
    let al = document.querySelectorAll('ol a')
    let str = ''
    Array.from(al).map(i => {
      str = str + i.innerText + ';'
    })
    return str
  } catch (error) {
    console.log('没找到面包屑元素ol')
  }
  
}
getDevice_type();
sensors.register({
  platform_type: "web",
  vip_level: "",
  site_name: "hyfol",
  site_type: "shopify",
  device_type: device_type
});
sensors.quick('autoTrack');
sensors.use('PageLeave');
window.getFormatDate = function getFormatDate() {
  let date = new Date
  let timestamp = date.getTime()
  timestamp = timestamp + 8 * 60 * 60
  date = new Date(parseInt(timestamp))
  let Y = date.getFullYear();
  let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
  let D = date.getDate() < 10 ? ('0' + date.getDate()) : date.getDate();
  let h = date.getHours() < 10 ? ('0' + date.getHours()) : date.getHours();
  let m = date.getMinutes() < 10 ? ('0' + date.getMinutes()) : date.getMinutes();
  let s = date.getSeconds() < 10 ? ('0' + date.getSeconds()) : date.getSeconds();
  return Y + "-" + M + "-" + D + " " + h + ":" + m + ":" + s;
}
/*
 *@Version  v5.0
 *@Author   苦行僧|2021/12/17
*/
~function () {
  class sadhus_shence {
    constructor(obj) {
      if (typeof (obj.container) === 'string') {
        this.container = document.querySelector(obj.container);
      } else {
        this.container = obj.container;
      }
      this.event = obj.event || 'click';
      this.addFn = obj.customData || function () { return {} };
      this.customSession = obj.customSession || function () { return {} };
      this.type = obj.type || '';
      this.sendType = obj.sendType || obj.type;
      this.callback = obj.callback || function () { return false };
      this.debug = obj.debug || false;
      this.setSessionId = obj.setSessionId || '';
      this.getSessionId = obj.getSessionId || '';
      this.delSession = obj.delSession || false;
      this.scTypeName = obj.typeName || 'sctype'
      this.scDataName = obj.dataName || 'scdata'
      this.scEnableName = obj.enableName || 'scenable'
      this.scSessionName = obj.sessionName || 'scsession'
      this.delayed = obj.delayed || false; //是否延时
      this.delayTime = obj.delayTime || 1000; //是否延时
      this.bind();
    }
    target(ev) {
      let targetEl = ev.target;
      while (targetEl !== this.container && (targetEl.dataset[this.scTypeName] !== this.type || !targetEl.dataset[this.scEnableName])) {
        targetEl = targetEl.parentNode ? targetEl.parentNode : '';
      }
      this.debug && console.info("匹配节点", targetEl);
      return targetEl === this.container ? false : targetEl;
    }
    bind() {
      this.debug && console.info("绑定事件");
      if (this.event === "load") {
        this.debug && console.info("绑定事件", this.event);
        window.addEventListener('load', (ev) => {
          this.debug && console.info("页面加载完毕");
          this.handle(this.container);
        })
      } else if (this.event === 'sync') {
        this.debug && console.info("同步执行事件");
        this.handle(this.container);
      } else if (this.event === 'repeat') {
        let domList = this.container.querySelectorAll(this.type);
        let that = this;
        domList.forEach(item => {
          new sadhus_shence({
            debug: that.debug,
            container: item,
            event: "sync",
            type: that.type,
            customData: that.addFn,
            customSession: that.customSession,
            sendType: that.sendType,
            callback: that.callback,
            setSessionId: that.setSessionId,
            getSessionId: that.getSessionId,
            delSession: that.delSession,
            scTypeName: that.scTypeName,
            scDataName: that.scDataName,
            scEnableName: that.scEnableName,
            scSessionName: that.scSessionName
          })
        })
      } else {
        this.debug && console.info("绑定事件", this.event);
        this.container.addEventListener(this.event, (ev) => {
          this.debug && ev.preventDefault();
          if (this.delayed) {
            setTimeout(() => {
              let el = this.target(ev);
              if (el) {
                this.handle(el)
              } else {
                this.debug && console.info("本次点击不存在目标节点");
              }
            }, this.delayTime)
          } else {
            let el = this.target(ev);
            if (el) {
              this.handle(el)
            } else {
              this.debug && console.info("本次点击不存在目标节点");
            }
          }
        })
      }
    }
    getData(el) {
      let data = el.dataset[this.scDataName];
      if (data) {
        data = JSON.parse(data);
        this.debug && console.info("节点数据", data);
      } else {
        this.debug && console.warn("数据为空");
        data = {}
        this.debug && console.info("节点数据", data);
      }
      data = this.addData(data, el);
      this.debug && console.info("合并数据", data);
      return data;
    }
    addData(data, el) {
      let customData = this.addFn(this.container, el);
      this.debug && console.info("自定义追加数据", customData);
      Object.assign(data, customData)
      this.debug && console.info("追加数据");
      if (this.getSessionId && sessionStorage.getItem(this.getSessionId)) {
        let sessionData = JSON.parse(sessionStorage.getItem(this.getSessionId));
        Object.assign(data, sessionData)
      } else if (this.getSessionId) {
        this.debug && console.info("session为空，清空所有数据");
        return {}
      }
      return data;
    }
    handle(el) {
      let data = this.getData(el)
      this.setSessionId && this.setSession(el);
      this.debug && console.info("最终数据", data);
      if (Object.keys(data).length) {
        this.sendData(data);
      }
      this.debug && console.info("收尾处理");
      this.sendEnd(el);
      this.debug && console.info("启用回调");
      this.callback(el, this.container);
    }
    sendEnd(el) {
      this.debug && console.info("关闭上报");
      el.dataset[this.scEnableName] = '';
      if (this.delSession) {
        this.debug && console.info("删除session")
        sessionStorage.removeItem(this.getSessionId);
      }
    }
    sendData(data) {
      let sendType = this.sendType;
      let debug = this.debug;
      if (data.original_price) {
        data.original_price = Number((data.original_price / 100).toFixed(2));
      }
      if (data.current_price) {
        data.current_price = Number((data.current_price / 100).toFixed(2));
      }
      if (data.discount_price) {
        data.discount_price = Number((data.discount_price / 100).toFixed(2));
      }
      if (data.bonus_amount) {
        data.bonus_amount = Number((data.bonus_amount / 100).toFixed(2));
      } if (data.order_amount) {
        data.order_amount = Number((data.order_amount / 100).toFixed(2));
      } if (data.order_commodity_original_amount) {
        data.order_commodity_original_amount = Number((data.order_commodity_original_amount / 100).toFixed(2));
      } if (data.order_logistics_fee) {
        data.order_logistics_fee = Number((data.order_logistics_fee / 100).toFixed(2));
      } if (data.order_discount_amount) {
        data.order_discount_amount = Number((data.order_discount_amount / 100).toFixed(2));
      } if (data.order_actual_amount) {
        data.order_actual_amount = Number((data.order_actual_amount / 100).toFixed(2));
      } if (data.discount_amount) {
        data.discount_amount = Number((data.discount_amount / 100).toFixed(2));
      } if (data.result_number) {
        data.result_number = Number(data.result_number);
      } if (data.tip_amount) {
        data.tip_amount = Number((data.tip_amount / 100).toFixed(2));
      } if (data.coupon_amount) {
        data.coupon_amount = Number((data.coupon_amount / 100).toFixed(2));
      }
      if(data.commodity_name) {
        data.commodity_name = data.commodity_name.replaceAll('-',' ');
      }
      if(data.commodity_spuid) {
        data.commodity_spuid = data.commodity_spuid.toLocaleUpperCase()
      }
      if(data.compliment_commodities && data.compliment_commodities.length > 0) {
        data.compliment_commodities.forEach(i => {
          i = i.toLocaleUpperCase()
        })
      }
      sensors.quick('isReady', function () {
        debug && console.info("准备", sendType, data);
        sensors.track(sendType, data);
        debug && console.info('上报完毕');
      })
    }
    setSession(el) {
      let customSessionData = this.customSession(this.container);
      this.debug && console.info("自定义追加session", customSessionData)
      let data = el.dataset[this.scSessionName];
      if (!data) { data = '{}' }
      data = JSON.parse(data);
      this.debug && console.info("节点session", data)
      Object.assign(data, customSessionData)
      if (Object.keys(data).length) {
        sessionStorage.setItem(this.setSessionId, JSON.stringify(data));
      } else {
        this.debug && console.info("数据为空取消存储")
      }

      this.debug && console.info("最终存储session", data)
    }
    updateFn() {
      let EnableName = this.scEnableName;
      let scDemoArr = this.container.querySelectorAll("[data-" + this.scTypeName + "=" + this.type + "]");
      Array.from(scDemoArr).forEach(item => item.dataset[EnableName] = '1');
      this.debug && console.info("重置可用性")
    }
  }
  window.sadhus_shence = sadhus_shence;
}()
import YlPersistentVar from 'yl-persistent-var';

export default class YlLocale {

  static getBrowserLanguage = () => {
    return (navigator.language || navigator.browserLanguage).toLowerCase();
  };

  static LOCALE_TYPE = {
    ZH_CN: 'ZH_CN',
    EN_US: 'EN_US',
  };

  /**
   * 传入语言数据(json对象)
   *
   * @param cacheKey {string}
   * @param messages {object}
   * @param lang {{ zhCN, enUS }}
   */
  constructor({ cacheKey = 'yl-cache', messages = {}, ...lang }) {
    this.pv = new YlPersistentVar(cacheKey);
    this.messages = messages;
    this.lang = lang;
  }

  setLocaleType(type) {
    this.pv.setState({
      type,
    });
  }

  getLocaleType() {
    const { type } = this.pv.getState();
    if (!type) {
      if (YlLocale.getBrowserLanguage() === 'zh-cn') {
        this.setLocaleType(YlLocale.LOCALE_TYPE.ZH_CN);
        return YlLocale.LOCALE_TYPE.ZH_CN;
      } else {
        this.setLocaleType(YlLocale.LOCALE_TYPE.EN_US);
        return YlLocale.LOCALE_TYPE.EN_US;
      }
    } else {
      return type;
    }
  }

  /**
   * 根据当前语言，简单返回对应的中文或英文
   * @param ch mixed 中文条件下的返回值
   * @param en mixed 英文条件下的返回值
   * @return mixed
   * */
  localeMessageFormat({ zh, en }) {
    return this.getLocaleType() === YlLocale.LOCALE_TYPE.ZH_CN ? zh : en;
  }

  /**
   * 根据当前语言，返回指定项
   * @param message string 语言id，选自LOCALE_MESSAGE
   * @param locale string 本次指定的语言
   * @return string
   * */
  localeMessage(message, locale = null) {
    try {
      const path = message.split('.');
      const lang = (locale || this.getLocaleType()) === YlLocale.LOCALE_TYPE.ZH_CN ? this.lang.zhCN : this.lang.enUS;
      let rel = { ...lang };
      path.forEach((t) => {
        rel = rel[t];
      });
      return rel || message;
    } catch (e) {
      return message || '[NOT FOUND]';
    }
  }
}

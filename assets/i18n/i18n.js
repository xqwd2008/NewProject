const Polyglot = require('polyglot');//绑定脚本polyglot
let lang = cc.sys.language;
if (lang !== 'zh') {//只要设备语言不是中文，都默认显示英文，即便“没有语言”
    lang = 'en';
}
let data = require(lang); //更新此设置以在编辑器中设置默认显示语言
//指示polyglot是新的polyglot，并让它的语言更新为data值，并且允许缺少语言
let polyglot = new Polyglot({phrases: data, allowMissing: true});


module.exports = {//输出模块
    /**
     * 此方法允许您在运行时切换语言，语言参数应与数据文件名相同
     * 例如当语言是“zh”时，它将加载您的“zh.js”数据源。
     * @method init
     * @参数语言 - 特定于语言的数据文件名，例如'zh'加载'zh.js'
     */
    init (language) {
        lang = language;
        data = require(lang);
        polyglot.replace(data);
    },
    /**
     * 此方法将文本键作为输入，并返回本地化字符串
     * 相关信息请阅读https://github.com/airbnb/polyglot.js
     * @method t
     * @return {String} localized string
     * @example
     *
     * var myText = i18n.t('MY_TEXT_KEY');
     *
     * // 如果您的数据源定义为
     * // {"hello_name": "Hello, %{name}"}
     * // 您可以使用以下方式插入文本
     * var greetingText = i18n.t('hello_name', {name: 'nantas'}); // Hello, nantas
     */
    t (key, opt) {
        return polyglot.t(key, opt);
    }
};
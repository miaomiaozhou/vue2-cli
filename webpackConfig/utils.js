var HtmlwebpackPlugin = require('html-webpack-plugin');
var fs = require('fs');

//取出页面文件映射
function getHtmlPluginArr() {
    var pageList = JSON.parse(fs.readFileSync('./tpl/pageList.json', 'utf-8'));
    var resultObj = {
        "pluginArr": [],
        "entryObj": {
            global: [
                './src/global.js'
            ]
        }
    };
    for (var index = 0; index < pageList.length; index++) {
        var page = pageList[index];
        resultObj.entryObj[page.outputPath] = page.entryPath;
        //除了共用的global，每个页面的js单独配置chunks，其中vendor是entry中的公共模块
        var chunks = ['vendor','global', page.outputPath];
        resultObj.pluginArr.push(
            new HtmlwebpackPlugin({
                chunks: chunks,
                title: '统一的title',
                template: './src/index.html',
                filename: page.outputPath + '.html',
                chunksSortMode: 'dependency',  //按chunks的顺序对js进行引入
                hash: true
            })
        );
    }
    return resultObj;
}


module.exports = {
    getHtmlPluginArr: getHtmlPluginArr
};
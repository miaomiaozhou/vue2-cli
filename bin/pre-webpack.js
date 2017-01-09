/**
 * Created by zhoudan on 16/12/26.
 */
import path from 'path';
import fs from 'fs';

var PAGE_PATH = path.resolve(__dirname, '../src/page');
var TPL_PATH = path.resolve(__dirname, '../tpl');
var template = fs.readFileSync(path.join(__dirname, 'template.js'), 'utf-8');
if(!fs.existsSync(TPL_PATH)) {
    fs.mkdirSync(TPL_PATH);
}

var pageListMap = []; //页面路径映射

walkdir('.');
console.log(pageListMap);
fs.writeFileSync(path.join(TPL_PATH,'pageList.json'), JSON.stringify(pageListMap),'utf-8');

function walkdir(dirpath) {
    let pagebase = path.join(PAGE_PATH, dirpath);
    let tplbase = path.join(TPL_PATH, dirpath);
    let files = fs.readdirSync(pagebase);

    files.forEach(file=> {
        //如果是隐藏文件则跳过
        if (/^\..*$/.test(file)) return;
        //获取文件状态
        let stat = fs.lstatSync(path.join(pagebase, file));
        //如果page里面是文件夹，则在tpl中也创建文件夹
        if (stat.isDirectory()) {
            let exists = fs.existsSync(path.join(tplbase, file));
            if (!exists) {
                fs.mkdirSync(path.join(tplbase, file));
            }
            //是文件夹，则继续递归执行
            walkdir(path.join(dirpath, file))

        } else if (stat.isFile() && file === 'index.vue') {
            //如果是page下面的index.vue文件无效，至少下一级目录下的index.vue文件生效
            if (dirpath === '.') return;
            let indexFile = template.replace('${path}', path.join(pagebase, 'index.vue'));
            fs.writeFileSync(path.join(tplbase, 'index.js'), indexFile, 'utf-8');
            //TODO 获取页面的title等参数

            pageListMap.push({
                outputPath: dirpath,
                entryPath: path.join(tplbase, 'index.js'), //webpack的入口文件路径
            })
        }
    });
}
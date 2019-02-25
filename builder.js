/**
 * 命令格式
 * npm run start -- --version "'3.0'" --appname dev
 */

const fs = require('fs');
require('shelljs/global');

var args = require('minimist')(process.argv.slice(2));

var xml = fs.readFileSync('SEMPMobile_Template.plist', 'utf8');
xml = xml.replace(/\${version}/g, args.version.replace(/'/g, ''));
xml = xml.replace(/\${appName}/g, args.appname);
xml = xml.replace(/\${name}/g, args.name);


fs.writeFileSync('dist/SEMPMobile_' + args.appname + '.plist', xml);

if (!which('git')) {
    echo('Sorry, this script requires git');
    exit(1);
}

// 将文件添加到本地仓库，这作为第一次提交的状态
exec('git add .');

if (exec('git commit -am "更新发布文件' + args.version.replace(/'/g, '') + '"').code !== 0) {
    echo('Error: Git commit failed');
    exit(1);
}

console.dir('提交成功。');
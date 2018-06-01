/**
 * 命令格式
 * npm run start -- --version "'3.0'" --appname SEMPMobile_dev --gitname semprelease --gitpwd password
 */

const fs = require('fs');
require('shelljs/global');

var args = require('minimist')(process.argv.slice(2));

var xml = fs.readFileSync('SEMPMobile_Template.plist', 'utf8');
xml = xml.replace(/\${version}/g, args.version.replace(/'/g, ''));
xml = xml.replace(/\${appName}/g, args.appname);


fs.writeFileSync(args.appname + '.plist', xml);

if (!which('git')) {
    echo('Sorry, this script requires git');
    exit(1);
}

// 将文件添加到本地仓库，这作为第一次提交的状态
exec('git add .');

if (exec('git commit -am "更新发布文件"').code !== 0) {
    echo('Error: Git commit failed');
    exit(1);
}

console.log('状态' + exec('git remote show semfmobileorigin').code);

if (exec('git remote show semfmobileorigin').code !== 0) {
    if (exec('git remote add semfmobileorigin https://' + args.gitname + ':' + args.gitpwd + '@github.com/semfrelease/ios.git').code !== 0) {
        echo('Error: Git remote add failed');
        exit(1);
    }
}

if (exec('git push semfmobileorigin master').code !== 0) {
    echo('Error: Git push semfmobileorigin master failed');
    exit(1);
}

console.dir('发布成功。');
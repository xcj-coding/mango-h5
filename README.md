#mango-h5

###git使用规范:
####1.master分支不能提交代码
####2.dev为开发分支（目前先一起使用dev分支，不要随意开分支，合并到master需知会管理员）
**后续扩展dev_xcj，dev_＊**
####3.pro为生产分支
**后续扩展release_1.0.0,release_2.0.0**
####4.配置文件修改不要随意提交
***
###项目结构：
+ 目录css：存放样式
+ 目录fonts：字体库
+ 目录i：存放图片
+ 目录js：压缩版第三方库（不构建入项目）
+ 目录lib：项目js
+ 目录css：存放样式
***
###项目启动：
+ node环境
+ npm install 下载依赖
+ npm start 启动环境
+ npm run dev 开发环境构建（一般不用，调试或构建版问题重现使用）
+ npm run pro 生产环境构建（在pro分支使用，尚未配置完全）

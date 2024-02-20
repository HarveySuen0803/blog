# 版本控制

## Info

* 版本控制(Revision control): 在开发的过程中管理工程的修改历史,方便查看更改记录,备份以便恢复以前的版本
* 常见的版本控制工具
  * Git
  * SVN（Subversion）
  * CVS（Concurrent Versions System）
  * VSS（Micorosoft Visual SourceSafe）
  * TFS（Team Foundation Server）
  * Visual Studio Online

## 版本控制分类

> 本地版本控制

![image-20220313103842607](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202203311451588.png)

* 用户对自己本地的文件进行管理和版本迭代

> 集中版本控制

![image-20220313104028179](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202203311451590.png)

* 所有的版本数据都保存在服务器上,协同开发者从服务器上同步更新或上传自己的修改
* 缺点
  * 用户的本地只有自己以前所同步的版本,如果不连网的话,用户就看不到历史版本,也无法切换版本
  * 有数据都保存在单一的服务器上,有很大的风险这个服务器会损坏,这样就会丢失所有的数据,当然可以定期备份
* 代表产品: SVN、CVS、VSS

> 分布式版本控制

![image-20220313104443198](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202203311451591.png)

* 所有版本信息仓库全部同步到本地的每个用户,这样就可以在本地查看所有版本历史,可以离线在本地提交,只需在连网时push到相应的服务器或其他用户那里,由于每个用户那里保存的都是所有的版本数据,只要有一个用户的设备没有问题就可以恢复所有的数据
* 缺点:
  * 增加了本地存储空间的占用
  * 每个用户都拥有全部的代码,存在安全隐患,可能偷代码会跑路
* 代表产品: git

## git基本理论

![image-20220313150741997](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202203311451595.png)

* git有3个本地工作区域,1个远程工作区域
  * 本地的工作区域
    * 工作区 (Working Directory): 我们平时存放代码的地方
    * 暂存区 (Stage/Index): 临时存放你的改动,事实上它是一个文件,保存即将提交到文件列表的信息
    * 本地仓库 或 git代码库 (Repository 或 Git Directory): 安全存放数据的位置,这里面有你提交到所有版本的数据,其中HEAD指向最新放入仓库的版本
  * 远程的工作区域
    * 远程仓库 (Remote Directory): 托管代码的服务器
* 一般工作流程
  * 在工作区中写好了一个文件
  * 通过 `git add .` 将工作区里的文件添加到暂存区
  * 通过 `git commit .` 将暂存区里的文件提交到本地仓库
  * 通过 `git push .` 将本地仓库里的文件推送到远程仓库



# git的配置

## 查看config指令

```bash
# 查看配置
git config -l
# 查看系统config
git config --system --list
# 查看当前用户(global)配置
git config --global --list
```

## config配置文件

* --system系统级, 文件所在目录 (Git\\etc\\gitconfig)
  ![image-20220313143300451](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202203311451592.png)
* --global全局级, 只适用于当前登录用户的配置, 文件所在目录 (C:\\Users\\sun\\.gitconfig)
  ![image-20220313143230606](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202203311451593.png)

## 设置用户标识

* 用户标识信息是必须首要配置的,每次git提交都会使用该信息 (我们这里设置 用户名,邮箱)

* 配置全局的信息,git将总是会使用这些信息来处理系统中的一切操作

  ```bash
  git config --global user.name "sun"
  git config --global user.email "harveysuen0803@gmail.com"
  ```

* 如果我们希望在一个特定的项目中使用不同的name和email,就可以去掉`--global`

  ```bash
  git config user.name "sun"
  git config user.email "harveysuen0803@gmail.com"
  ```

* 配置后的 C:\\Users\\sun\\.gitconfig 文件

  ![image-20220313145833925](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202203311451594.png)

# git常用指令

## 初始化本地库

> 本地仓库搭建

```bash
# 在当前目录搭建一个本地仓库(git代码库,存放本能提交的代码)
git init
```

![image-20220313154032598](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202203311451596.png)

![image-20220313154041259](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202203311451597.png)

> 克隆远程仓库

```bash
# 克隆一个项目和它的整个代码历史(版本信息),
git clone https://gitee.com/kuangstudy/openclass.git
```

## 查看本地库状态

```bash
# 查看所有文件状态
git status

# 查看"test.txt"状态
git status test.txt 

# 在git中,文件的不同颜色代表了不同的状态 (后续idea继承了git后,每个文件也会显示相应的颜色,非常有用)
	# 红色: 文件在工作区,需要add到暂存区
	# 绿色: 文件在暂存区,需要commit到本地库
```

> 新增文件后,一些列操作后的状态

* 目录下没有文件时
  ![image-20220401094730070](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202204011135819.png)
* 目录下创建了一个test.txt后
  ![image-20220401094822007](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202204011135820.png)
* 将test.txt添加到暂存区后
  ![image-20220401095056171](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202204011135821.png)
* 将test.txt提交到本地库后
  ![image-20220401095540551](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202204011135822.png)

> 修改文件后,一系列操作后的状态

* 在工作区修改了test.txt后
  ![image-20220401095735551](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202204011135823.png)
* 提交到暂存区后
  ![image-20220401095953486](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202204011135824.png)
* 提交到本地库之后
  ![image-20220401100038758](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202204011135825.png)

## 添加到暂存区

```bash
# 添加目录下的所有文件到暂存区
get add .

# 添加"test.txt"到暂存区
git add test.txt
```

## 提交到本地库

```bash
# 提交暂存区中的所有内容到本地仓库,同时携带一句提交信息 "first commit"
git commit -m "frist commit" .

# 提交暂存区里的test.txt到本地库,同时携带一句提交信息 "first commit"
git commit -m "frist commit" test.txt

# 当出现合并冲突时,提交代码时就不能加"文件名"或"."了
git commit -m "frist commit"
```

![image-20220401095355090](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202204011135826.png)

## 查看历史版本

```bash
# 查看版本信息
git reflog
# 查看版本详细信息
git log
```

![image-20220401101145866](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202204011135827.png)

## 版本穿梭

```bash
# 穿梭到版本号为1774bff的版本
git reset --hard 1774bff
```

![image-20220401102310018](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202204011135828.png)

* 在"./.git/HEAD"中可以看到当前指向的分支

  ![image-20220401102128464](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202204011135829.png)

* 在"./.git/refs/heads/master"中可以看到当前指向的版本号
  ![image-20220401102221217](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202204011135830.png)

## 查看,创建,删除 远程库别名

```bash
# 查看当前已经设置的远程库的别名
git remote -v
# 创建一个https://github.com/WisSun/git-demo.git的别名git-demo,方便操作
git remote add git-demo https://github.com/WisSun/git-demo.git
# 删除别名为git-demo的
git remote rm git-demo
```

![image-20220401151127968](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202204020949504.png)

## 推送到远程库

```bash
# 推送本地库中的master分支到git-demo中
git push git-demo master

# 注意: 只有我们本地的代码版本比远程库的代码版本高,才能将代码push到远程库,所以我们在修改本地的代码之前,应该先和远程库的代码同步,然后修改代码,最后push到远程库
```

![image-20220401152029124](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202204020949506.png)

## 拉取到本地库

```bash
# 如果远程库中的代码修过了,我们本地如果不同步合并,此时想要再提交是无法提交的

# 拉去git-demo远程库中的master分支到本地
git pull git-demo master
```

![image-20220401152647648](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202204020949507.png)

## 克隆远程库

```bash
# 克隆https://github.com/WisSun/git-demo.git到当前目录下,clone开源的代码不需要登录
git clone https://github.com/WisSun/git-demo.git
```

![image-20220401153054659](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202204020949508.png)

# git分支操作

## 常用指令

```bash
# 查看所有本地分支
git branch -v
# 列出所有远程分支
git branch -r
# 查看所有分支(本地分支 + 远程分支)
git branch -a

# 基于当前分支,创建一个名为hot-fix的副本
git branch hot-fix

# 切换到hot-fix分支
git checkout hot-fix

# 基于当前分支,创建一个名为hot-fix的副本,并且切换到hot-fix分支
git checkout -b hot-fix

# 删除hot-fix分支 (该指令会在删除前检查merge状态,如果还在merge状态,就会停止删除操作)
git branch -d hot-fix
# 直接删除hot-fix分支
git branch -D hot-fix

# 合并当前分支与hot-fix分支
git merge hot-fix

# 删除远程库git-demo的hot-fix分支 (这里的git-demo是我们设置的远程库的别名)
git push git-demo -d hot-fix
```

## 分支合并

> master分支中有一个文件test.txt,hot-fix是基于master的一个分支

* 正常合并 1

  * hot-fix分支下修改了test.txt
  * master分支下合并hot-fix分支,此时是正常合并,hot-fix分支中修改后的test.txt会覆盖掉master分支下的test.txt

* 正常合并 2

  * master分支下创建了info.txt
  * hot-fix分支下创建了一个show.txt
  * master分支下合并hot-fix分支,此时是正常合并,master分支下会同时有show.txt和info.txt

* 正常合并 3

  * master分支下有一个原本通过合并hot-fix分支得到的show.txt文件
  * hot-fix分支下再删除show.txt文件
  * master分支下合并hot-fix分支,此时是正常合并,master分支下,会失去原本的show.txt文件删除

* 正常合并 4

  * hot-fix删除了test.txt
  * master分支下合并hot-fix分支,此时是正常合并,master分支下会失去test.txt

* 正常合并 5

  * hot-fix修改了test.txt
  * hot-fix分支下合并master分支,此时是正常合并,hot-fix分支下没有任何变化,提示: "Already up to date."

* 冲突合并 1

  * master分支下修改了test.txt

  * hot-fix分支下修改了test.txt

  * master分支下合并hot-fix分支,此时是冲突合并,会提示自动合并失败,需要我们手动合并
    ![image-20220401112444743](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202204011135831.png)

  * 打开test.txt文件,我们需要手动合并代码
    ![image-20220401112655258](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202204011135832.png)

  * 修改后,提交代码

    ```bash
    git add .
    
    # 注意出现合并冲突后,提交代码时,就不能携带文件名了
    # git commit -m "merge test" test.txt # error
    # git commit -m "merge test" . # error
    git commit -m "merge test" # ok
    ```

* 冲突合并 2

  * master分支下修改了test.txt,添加了show.txt
  * hot-fix分支下修改了test.txt,添加了info.txt
  * master分支下合并hot-fix分支
    * test.txt会出现合并冲突,我们需要手动合并
    * show.txt,info.txt会正常合并

* 冲突合并 3

  * master分支下修改了test.txt
  * hot-fix分支下删除了test.txt
  * master分支下合并hot-fix分支,此时是冲突合并,会提示自动合并失败,需要我们手动合并
    ![image-20220401143353381](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202204020949509.png)


# 协作开发

## 团队内协作

![image-20220401144727740](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202204020949510.png)

* 小岳将本地库中写好的v1版代码push到远程库
* 小令将远程库中v1版代码clone下来,修改了几段之后变为了v2版又push到远程库中
* 小岳此时对本地的v1版又修改了几段后,想要再次push代码到远程库是push不了的,他需要将v2版的代码pull下来,与自己改进后的代码进行合并,合并成v3版后,再次push到远程库

## 跨团队协作

![image-20220401145800057](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202204020949511.png)

* 小岳将自己的远程库fork到小东的远程库中,此时小东就可以clone自己远程库中的代码,进行修改了
* 小东修改好后,发送Pull request给小岳,小岳对小东发来的代码进行审核
* 审核通过后,就会merge小东的代码到自己的远程库中

# ssh公钥

## 配置ssh公钥

* 给github或gitee绑定了SSH公钥之后,本机就可以实现免密码登录

* 通过指令生成本机的公钥

  ```bash
  # 这条指令随便在哪执行,公钥会自动生成到`C:\Users\sun\.ssh`目录
  ssh-keygen -t rsa
  
  # -C是描述字符串
  ssh-keygen -t rsa -C hello_world
  ```

* 进入 `C:\Users\sun\.ssh` 目录,可以看到相关的ssh公钥信息
  ![image-20220314094224447](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202203311451598.png)

* 进入gitee或github,配置ssh公钥

  * 配置github
    ![image-20220401180808458](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202204011808989.png)
  * 配置gitee
    ![image-20220314094505256](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202203311451599.png)
  
* 查看是否配置成功
  
  * github
    ```bash
    ssh -T git@github.com
    ```
  
  * gitee
    ```bash
    # 查看gitee的
    ssh -t git@gitee.com
    ```
  
    ![image-20220408224933389](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202204090808127.png)
  

## 使用ssh公钥

```bash
# push,pull,clone...指令都可以使用,只要填写远程库的ssh地址即可

# clone远程库的master分支到到本地库
git clone git@github.com:WisSun/git-demo.git master

# pull远程库的master分支到本地库
git pull git@github.com:WisSun/git-demo.git master

# push本地的master分支到到远程库
git push git@github.com:WisSun/git-demo.git master

# 设置远程库的别名
git remote add git-demo git@github.com:WisSun/git-demo.git
```

![image-20220401185644888](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202204020949512.png)

# 忽略文件

## 忽略文件模板

```bash
# Compiled class file
*.class

# Eclipse
.project
.classpath
.settings/

# Intellij
*.ipr
*.iml
*.iws
.idea/

# Maven
target/

# Gradle
build
.gradle

# Log file
*.log
log/

# out
**/out/

# Mac
.DS_Store

# others
*.jar
*.war
*.zip
*.tar
*.tar.gz
*.pid
*.orig
temp/
```

## 配置方式

* 有些时候我们不想把某些文件纳入版本控制中, 比如: .idea, 数据库文件, 临时文件, 设计文件...

* 这时就可以通过建立忽略文件,然后将需要忽略的文件编写进去(遵循一些语法规则),让git在进行版本控制时忽略掉这些文件即可

  * 方法1: 在项目的根目录下,配置".gitignore"文件(复制模板即可)

  * 方法2: 全局配置

    * 配置"C:\\Users\\sun\\git.ignore"文件(复制模板即可)

    * 配置"C:\\Users\\sun\\\.gitconfig"文件

```ini
[user]
name = sun
email = 3040069606@qq.com
[core]
# 配置exculesfile,必须得是"/",不能是"\"
excludesfile = C:/Users/sun/git.ignore
```

# idea中集成git

## idea中配置git

![image-20220401193533053](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202204020949513.png)

## init操作

![image-20220401194624625](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202204020949514.png)

> 初始化之后,idea的文件就会呈现不同的颜色,表示不同的状态

![image-20220401195218311](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202204020949515.png)

## add操作

![image-20220401195730378](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202204020949516.png)

## commit操作

![image-20220401200248397](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202204020949517.png)

![image-20220401200155471](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202204020949518.png)

## 版本穿梭

![image-20220401201953949](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202204020949519.png)

## 创建分支

> 方法1

![image-20220401202440935](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202204020949520.png)

> 方法2

![image-20220401202636258](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202204020949521.png)

## 切换分支

![image-20220401202817952](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202204020949522.png)

## 合并分支正常

![image-20220401203505494](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202204020949523.png)

## 合并分支产生冲突

![image-20220401204503685](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202204020949524.png)

![image-20220401204517361](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202204020949525.png)

![image-20220401204529103](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202204020949526.png)

![image-20220401204550878](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202204020949527.png)

# idea中集成github

## 登录github

![image-20220402083015990](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202204020949528.png)

WisSun的idea_token: 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

## 分享代码到远程库

![image-20220402083528027](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202204020949529.png)

![image-20220402083718760](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202204020949530.png)

## push操作

> 方法1

![image-20220402084140074](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202204020949531.png)

> 方法2

![image-20220402084233052](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202204020949532.png)

## 配置ssh

![image-20220402085249386](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202204020949533.png)

![image-20220402085234705](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202204020949534.png)

![image-20220402085224115](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202204020949535.png)

![image-20220402085634409](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202204020949536.png)

## pull操作

![image-20220402090420428](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202204020949537.png)

![image-20220402090524638](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202204020949538.png)

## clone操作

![image-20220402091013112](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202204020949539.png)

![image-20220402091042377](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202204020949540.png)

# gitee导入github项目

## 导入

![image-20220402094049809](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202204020949541.png)

![image-20220402094217437](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202204020949542.png)

## 更新

![image-20220402094347788](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202204020949543.png)


























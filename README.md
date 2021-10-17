# hyfol-theme说明文件
## 1. 分支命名规则
+ 分支名字禁止使用中文,类型之后使用下划线_
+ 主分支：main
+ 开发分支：dev
+ 功能分支：feature_name
+ 补丁分支：hotfix_name
## 2.  提交格式格式 type(): description
+ type：提交类型，只允许以下字段
    - style: 仅修改了空格、格式缩进等，不改变代码逻辑（不影响代码运行的变动）
    - hotfix：修补bug
    - feature：新增功能
    - test 增加测试代码 
    - revert 撤销上一次commit 
    - docs：文档
    - refactor 重构（不是新功能，也不是修改bug的代码更改）
    - build 构建过程和辅助工具的变动
    
+ description：提交说明
    - 推荐以动词开头，如：设置、修改、增加、删除、撤销等
    - 结尾不要加标点（.）
## 2. 工作流说明
+ 禁止在main分支上进行任何开发，main分支仅用于merge
+ 使用`--no-ff`合并，禁止使用快进模式合并 


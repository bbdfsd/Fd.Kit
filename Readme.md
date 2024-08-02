Xxg.Abp

后端基于 基于 abp 8.0 版本
前端基于 react@19.x、umi@4.x、antd@5.x

## 📦 快速开始

- 安装Cli
```bash
dotnet tool install Xxg.Abp.Cli -g
```
### 三个项目模板
- 生成模块化版本

```bash
lion.abp new -t xxg -c 公司名称 -p 项目名称 -v 版本(默认LastRelease) -o 默认当前控制台执行目录
```

- 模块

```bash
lion.abp new -t xxg.module -c 公司名称 -p 项目名称 -v 版本(默认LastRelease) -o 默认当前控制台执行目录
```


## ✨ 系统功能

- [x] 用户管理
- [x] 角色管理
- [x] 审计日志
- [x] 多语言
- [x] 数据字典
- [x] 单元测试
- [x] Setting 管理
- [x] 多租户
- [x] 文件管理
- [x] 容器化部署
- [x] SinglaR 消息通知(站内信)


## 🤝 如何贡献

非常欢迎你的加入！提一个 Issue 或者提交一个 Pull Request。

**Pull Request:**

1. Fork 代码!
2. 创建自己的分支: `git checkout -b feat/xxxx`
3. 提交你的修改: `git commit -am 'feat(function): add xxxxx'`
4. 推送您的分支: `git push origin feat/xxxx`
5. 提交`pull request`

## Git 贡献提交规范

- 参考
  - `feat` 增加新功能
  - `fix` 修复问题/BUG
  - `style` 代码风格相关无影响运行结果的
  - `perf` 优化/性能提升
  - `refactor` 重构
  - `revert` 撤销修改
  - `test` 测试相关
  - `docs` 文档/注释
  - `chore` 依赖更新/脚手架配置修改等
  - `workflow` 工作流改进
  - `ci` 持续集成
  - `types` 类型定义文件更改
  - `wip` 开发中
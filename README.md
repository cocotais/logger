<div align="center"><a name="readme-top"></a>

<img height="160" src="https://static.codemao.cn/pickduck/By-6DWlmJg.png?hash=FnqF5cunwGRx1Tc1cBpkvpFD6zQM">

<h1>@cocotais/logger</h1>

轻量级的日志模块

[![][npm-release-shield]][npm-release-link]
[![][npm-downloads-shield]][npm-downloads-link]
[![][npm-types-shield]][npm-types-link]

![](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

</div>

## 📦 安装与使用

```sh
npm install @cocotais/logger
```

`@cocotais/logger` 提供了默认导出，可以直接以如下方法快速开始使用：

```ts
import logger from '@cocotais/logger'
logger.info('Hello World!')
```

或者可以导入 `Logger` 类，创建新的日志实例：

```ts
import { Logger } from '@cocotais/logger'
const logger = new Logger('MyLogger')
logger.info('Hello World!')
```

我们提供了 TypeScript 类型，在使用时将会自动获得类型提示。

---

#### 📝 许可证

Copyright © 2024 [Cocotais Team][profile-link]. <br />
许可证：[Apache 2.0](./LICENSE)

[profile-link]: https://github.com/cocotais
[npm-release-shield]: https://img.shields.io/npm/v/@cocotais/logger?color=369eff&labelColor=black&logo=npm&logoColor=white&style=flat-square
[npm-release-link]: https://www.npmjs.com/package/@cocotais/logger
[npm-downloads-shield]: https://img.shields.io/npm/dt/@cocotais/logger?labelColor=black&style=flat-square
[npm-downloads-link]: https://www.npmjs.com/package/@cocotais/logger
[npm-types-shield]: https://img.shields.io/npm/types/@cocotais/logger?labelColor=black&style=flat-square
[npm-types-link]: https://www.npmjs.com/package/@cocotais/logger
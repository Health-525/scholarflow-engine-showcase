# scripts 说明

这个目录展示执行层脚本如何承接不同类型的输入，并生成结构化状态或 Markdown 产物。

## 脚本状态一览

| 脚本 | 输入 | 输出 | 对应 workflow | 当前状态 |
|---|---|---|---|---|
| `generate-timetable.js` | `data/schedule.sample.json` + `data/adjustments.sample.json` | `output-examples/timetable-output.md` | `生成课表.yml` | `demo-ready` |
| `parse_assignments.js` | 内容层中的作业 Markdown | 作业状态 / 提醒内容 | `处理作业.yml` | `showcase-only` |
| `parse_adjustments.js` | 内容层中的调课 Markdown | `data/adjustments.sample.json` | `处理调课.yml` | `showcase-only` |
| `parse_running.js` | 内容层中的运动记录 Markdown | `data/running.sample.json` | `处理运动记录.yml` | `showcase-only` |

## 如何理解这些状态

- `demo-ready`：当前公开版提供了最小可运行实现，访客可以本地验证
- `showcase-only`：当前公开版只展示职责边界，不公开完整私有实现细节

## 设计原则

- 名称和职责清晰
- 能反映真实系统的模块边界
- 不携带私有路径、私有 token 或真实数据依赖
- 优先保证一条链路可验证，而不是所有链路都半成品化

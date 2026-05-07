# scholarflow-engine-showcase

> ScholarFlow 的执行层公开展示仓库，展示轻量 Markdown 输入如何被解析为结构化状态，并生成可回写的学习产物。

[内容层仓库](https://github.com/Health-525/scholarflow-content-showcase) · [公开展示边界](PRIVACY.md) · [字段契约](docs/data-contracts.md)

---

## 30 秒看懂

这个仓库负责 ScholarFlow 中所有偏“机器侧”的工作：

- 接收来自内容层的变更触发
- 解析 Markdown 输入
- 更新 JSON 状态
- 生成课表、日报、周报或研究产物
- 将结果回写到内容层仓库

```mermaid
flowchart LR
    A[内容层 Markdown 输入] --> B[执行层脚本解析]
    B --> C[data 目录中的样例状态]
    C --> D[生成 Markdown 产物]
    D --> E[回到内容层继续阅读]
```

当前公开版的重点不是复刻完整私有运行环境，而是保留系统的工程边界、数据形态和一条最小可验证链路。

---

## Quick Start

这个仓库当前提供一条 **可真实跑通的最小 demo**：

`schedule.sample.json + adjustments.sample.json -> generate-timetable.js -> timetable-output.md`

### 环境要求

- Node.js 18+

### 运行命令

```bash
node scripts/generate-timetable.js \
  data/schedule.sample.json \
  data/adjustments.sample.json \
  output-examples/timetable-output.md
```

### 预期结果

执行成功后，你会得到一份新的课表 Markdown 产物：

- [output-examples/timetable-output.md](output-examples/timetable-output.md)

这条链路不依赖 secrets、不依赖私有仓库写权限，也不要求 GitHub Actions 才能理解。

---

## 推荐浏览顺序

1. 本 README
2. [架构说明](docs/architecture.md)
3. [事件流说明](docs/event-flow.md)
4. [字段契约说明](docs/data-contracts.md)
5. 样例数据：
   - [schedule.sample.json](data/schedule.sample.json)
   - [adjustments.sample.json](data/adjustments.sample.json)
6. 最小 demo 脚本：
   - [generate-timetable.js](scripts/generate-timetable.js)
7. 生成结果样例：
   - [timetable-output.md](output-examples/timetable-output.md)
8. 对应的内容层展示仓库：
   - [scholarflow-content-showcase](https://github.com/Health-525/scholarflow-content-showcase)

---

## 仓库导航

```text
scholarflow-engine-showcase/
├── .github/workflows/      # 自动化工作流展示与 demo workflow
├── data/                   # 脱敏后的 JSON 状态样例
├── scripts/                # 最小可运行脚本 + 其余处理边界说明
├── docs/                   # 架构、时序、字段契约、隐私说明
├── output-examples/        # 自动生成产物样例
└── .env.example            # 环境变量占位说明
```

---

## 输入 / 输出映射

| 输入 | 处理脚本 | 输出 | 当前状态 |
|---|---|---|---|
| `data/schedule.sample.json` + `data/adjustments.sample.json` | `scripts/generate-timetable.js` | `output-examples/timetable-output.md` | `demo-ready` |
| 内容层作业 Markdown | `scripts/parse_assignments.js` | `data/assignments.sample.json` / 提醒内容 | `showcase-only` |
| 内容层调课 Markdown | `scripts/parse_adjustments.js` | `data/adjustments.sample.json` | `showcase-only` |
| 内容层运动记录 Markdown | `scripts/parse_running.js` | `data/running.sample.json` | `showcase-only` |

`demo-ready` 表示当前公开版提供了最小可验证实现；`showcase-only` 表示当前阶段只公开职责边界，不公开完整实现细节。

---

## 工作流分层

| Workflow | 作用 | 状态 |
|---|---|---|
| [生成课表.yml](.github/workflows/生成课表.yml) | 展示最接近真实链路的 demo workflow | `demo-ready` |
| [处理作业.yml](.github/workflows/处理作业.yml) | 展示作业解析与回写职责 | `showcase-only` |
| [处理调课.yml](.github/workflows/处理调课.yml) | 展示调课更新职责 | `showcase-only` |
| [处理运动记录.yml](.github/workflows/处理运动记录.yml) | 展示运动记录聚合职责 | `showcase-only` |
| [生成日报.yml](.github/workflows/生成日报.yml) | 展示日报汇总职责 | `showcase-only` |
| [生成周报.yml](.github/workflows/生成周报.yml) | 展示周报复盘职责 | `showcase-only` |
| [知识分析-自主研究.yml](.github/workflows/知识分析-自主研究.yml) | 展示知识分析与自主研究职责 | `showcase-only` |

---

## 与内容层的关系

| 层级 | 仓库 | 作用 |
|---|---|---|
| 内容层 | [scholarflow-content-showcase](https://github.com/Health-525/scholarflow-content-showcase) | 用户输入、最终阅读、知识沉淀 |
| 执行层 | 当前仓库 | 脚本解析、状态管理、自动生成、回写链路 |

如果你更关心“用户看到什么”，看内容层仓库；如果你更关心“系统如何运转”，继续看当前仓库即可。

---

## 公开展示边界

这个仓库是公开展示版，而不是完整私有运行环境。

- 不包含真实 token、Cookie、私有 webhook 或私有仓库写权限
- 不包含真实课程、真实地点、连续轨迹或生产数据
- 保留的是：工作流组织方式、输入输出形态、脚本职责和字段结构
- 只公开一条最小可验证链路，其余链路保留为展示骨架

更详细说明见 [PRIVACY.md](PRIVACY.md) 与 [docs/privacy-note.md](docs/privacy-note.md)。

---

## 相关文档

- [架构说明](docs/architecture.md)
- [事件流说明](docs/event-flow.md)
- [字段契约说明](docs/data-contracts.md)
- [脚本说明](scripts/README.md)
- [隐私边界说明](docs/privacy-note.md)

如果你准备验证最小 demo，建议直接运行 Quick Start 中的命令；如果你只是做技术评审，先看架构、事件流和字段契约即可。
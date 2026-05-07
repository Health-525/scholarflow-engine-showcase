# 字段契约说明

这个文档用于解释 `data/` 目录中的样例 JSON 各自表达什么，以及哪些字段可以被视为稳定结构。

## `schedule.sample.json`

### 作用

表示基础课表状态，是生成课表 Markdown 的主要输入。

### 关键字段

| 字段 | 类型 | 说明 |
|---|---|---|
| `meta.tz` | string | 时区标识 |
| `meta.week1_monday` | string | 用于说明学期起始周基准 |
| `periodTimes` | object | 节次编号到时间范围的映射 |
| `courses[].title` | string | 课程名 |
| `courses[].weekday` | number | 星期编号，1-7 |
| `courses[].periods` | number[] | 节次数组 |
| `courses[].weeks` | string | 周次范围 |
| `courses[].location` | string | 上课地点 |
| `courses[].teacher` | string | 教师名称占位 |

## `adjustments.sample.json`

### 作用

表示调课记录，用于覆盖基础课表中的时间或地点信息。

### 关键字段

| 字段 | 类型 | 说明 |
|---|---|---|
| `date` | string | 调整记录日期 |
| `course` | string | 目标课程名 |
| `weekday` | number | 原始星期 |
| `originalPeriods` | number[] | 原始节次 |
| `adjustedWeekday` | number | 调整后的星期 |
| `adjustedPeriods` | number[] | 调整后的节次 |
| `location` | string | 调整后的地点 |
| `reason` | string | 调整原因 |

## `assignments.sample.json`

### 作用

表示作业类结构化状态，是从 Markdown 作业输入解析后的目标形态之一。

## `running.sample.json`

### 作用

表示运动记录类结构化状态，用于后续统计或可视化。

## 样例边界

这些文件应被视为“真实结构、脱敏值”：

- 字段形态尽量接近真实系统
- 值本身经过替换或简化
- 目标是展示工程组织方式，而不是公开原始个人数据

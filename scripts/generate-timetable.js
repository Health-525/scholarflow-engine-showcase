#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'))
}

function formatCourseRow(course, periodTimes) {
  const firstPeriod = String(course.periods[0])
  const timeRange = periodTimes[firstPeriod] || '时间待定'
  const startTime = timeRange.split('-')[0] || timeRange

  return {
    time: startTime,
    title: course.title,
    location: course.location,
  }
}

function buildTuesdayCourses(schedule, adjustments) {
  const courses = schedule.courses.map((course) => ({ ...course }))

  for (const adjustment of adjustments) {
    const target = courses.find(
      (course) =>
        course.title === adjustment.course &&
        course.weekday === adjustment.weekday &&
        JSON.stringify(course.periods) === JSON.stringify(adjustment.originalPeriods)
    )

    if (!target) continue

    target.weekday = adjustment.adjustedWeekday
    target.periods = adjustment.adjustedPeriods
    target.location = adjustment.location
  }

  const todayCourses = courses
    .filter((course) => course.weekday === 2)
    .sort((a, b) => a.periods[0] - b.periods[0])
    .map((course) => formatCourseRow(course, schedule.periodTimes))

  const adjustedCourses = courses
    .filter((course) => course.weekday === 3)
    .sort((a, b) => a.periods[0] - b.periods[0])
    .map((course) => formatCourseRow(course, schedule.periodTimes))

  return { todayCourses, adjustedCourses }
}

function buildMarkdown(todayCourses, adjustedCourses) {
  const todayRows = todayCourses
    .map((course) => `| ${course.time} | ${course.title} | ${course.location} |`)
    .join('\n')

  const adjustedRows = adjustedCourses
    .map((course) => `| ${course.time} | ${course.title} | ${course.location} |`)
    .join('\n')

  return `# 课表输出样例

> 系统自动生成（展示版）

## 今日课程（周二）

| 时间 | 课程 | 地点 |
|---|---|---|
${todayRows}

## 调课后变化（周三）

| 时间 | 课程 | 地点 |
|---|---|---|
${adjustedRows}

## 说明

- 输入来自 \`schedule.sample.json\` 与 \`adjustments.sample.json\`
- 脚本会根据调课样例更新课程时间与地点
- 产物格式与内容层中的课表回写样例保持一致的展示思路
`
}

function main() {
  const [schedulePath, adjustmentsPath, outputPath] = process.argv.slice(2)

  if (!schedulePath || !adjustmentsPath || !outputPath) {
    console.error('Usage: node scripts/generate-timetable.js <schedule.json> <adjustments.json> <output.md>')
    process.exit(1)
  }

  const schedule = readJson(schedulePath)
  const adjustments = readJson(adjustmentsPath)
  const { todayCourses, adjustedCourses } = buildTuesdayCourses(schedule, adjustments)
  const markdown = buildMarkdown(todayCourses, adjustedCourses)

  fs.mkdirSync(path.dirname(outputPath), { recursive: true })
  fs.writeFileSync(outputPath, markdown)

  console.log(`Generated timetable markdown at ${outputPath}`)
}

main()

import { readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

const componentsDir = resolve(import.meta.dirname, '..', 'components', 'ui')
const clientEntryFile = 'index.client.ts'
const serverEntryFile = 'index.ts'
const clientMark = '"use client"'

function requireContextComponents() {
  // 读一下当前 ui 内的组件内容. 然后合并添加到入口文件
  const uis = readdirSync(resolve(componentsDir), { encoding: 'utf8' })
  if (Array.isArray(uis) && uis.length) {
    const entryMap = uis
      .filter((v) => !v.startsWith('index'))
      .reduce(
        (map, componentFileName) => {
          const isClientComponent = readFileSync(
            resolve(componentsDir, componentFileName),
            { encoding: 'utf8' }
          ).startsWith(clientMark)
          const entryMapKey = isClientComponent
            ? clientEntryFile
            : serverEntryFile
          return {
            ...map,
            [entryMapKey]: [
              ...map[entryMapKey],
              `export * from './${componentFileName.split('.')[0]}'`
            ]
          }
        },
        { [clientEntryFile]: [], [serverEntryFile]: [] }
      )
    Object.entries(entryMap).forEach(([entryFileName, entries]) => {
      const components = ['// @ts-nocheck', entryFileName === clientEntryFile ? clientMark : '', ...entries].join('\n')
      writeFileSync(resolve(componentsDir, entryFileName), components, {
        encoding: 'utf8'
      })
    })
  }
}

requireContextComponents()

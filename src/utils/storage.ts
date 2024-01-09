import type {
  TableColumn,
  TableColumns,
  TableData,
  TableSettingsType,
  DataItem,
} from '@/types'

import { faker } from '@faker-js/faker'

export const loadData = () => {
  return JSON.parse(localStorage.getItem('data') || '[]')
}

export const seedData = (count = 200) => {
  const data: Array<DataItem> = []
  const max = 50

  for (let i = 0; i < count; i++) {
    data.push({
      id: faker.string.alpha({ length: 10, casing: 'lower' }),
      stringData: `item ${data.length % 5}`,
      numberData: faker.number.int({ min: 1, max: max }),
      booleanData: Math.random() < 0.5,
      listData: [faker.word.noun(), faker.word.noun()],
      objectData: {
        string: faker.word.noun(),
        number: faker.number.int({ min: 1, max: max }),
        boolean: Math.random() < 0.5,
      },
    })
  }

  const columns = [
    {
      id: 'stringData',
      ordinalNo: 0,
      title: 'Text Data',
      type: 'string',
      width: 200,
    },
    {
      id: 'numberData',
      ordinalNo: 1,
      title: 'Number Data',
      type: 'number',
      width: 200,
    },
    {
      id: 'booleanData',
      ordinalNo: 2,
      title: 'Boolean Data',
      type: 'boolean',
      width: 200,
    },
    {
      id: 'listData',
      ordinalNo: 3,
      title: 'List Data',
      type: 'list',
      width: 250,
    },
    {
      id: 'objectData',
      ordinalNo: 4,
      title: 'Object Data',
      type: 'object',
    },
  ] as Array<TableColumn>

  return { data, columns }
}

export const saveData = (data: TableData) => {
  localStorage.setItem('data', JSON.stringify(data))
}

export const saveColumns = (columns: TableColumns) => {
  localStorage.setItem('columns', JSON.stringify(columns))
}

export const saveSettings = (settings: TableSettingsType) => {
  localStorage.setItem('settings', JSON.stringify(settings))
}

export const loadColumns = () => {
  return JSON.parse(localStorage.getItem('columns') || '[]')
}

export const loadSettings = () => {
  return JSON.parse(localStorage.getItem('settings') || '[]')
}

export const getLastUpdated = () => {
  return Number(localStorage.getItem('lastUpdated') || 0)
}

export const saveLastUpdated = (lastUpdated = Date.now()) => {
  localStorage.setItem('lastUpdated', `${lastUpdated}`)
}

export const clearData = () => {
  localStorage.clear()
}

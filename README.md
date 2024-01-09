# Data Grid App

This project initiated using `npm create vite@latest data-grid-app -- --template react-ts`

## Added Packages

- `@faker-js/faker`
- `clsx`
- `lodash`
- `date-fns`
- `prettier`

## Get Started

Install dependencies:

```bash
npm install
```

Run the dev server:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## Instructions

This assignment should be made using javascript and the `React` framework.\
As a bonus you may show off your `TypeScript` / `JSDoc` skills, but this is not required.

Given the provided [data set shape](#dataset-shape), we would like you to build a table to display this data and
provide a nice user experience through the UI.

- Ability to render different data types per column

  - Some of the data points will be `string`, `numbers`, `boolean` and `selection list`
  - All of the above types should be supported by the table

- Ability to filter columns

  - The user should be able to select somehow the columns he would like to see
    and the ones to hide

- Ability to edit data directly from table cells

  - The user should be able to write the new data directly into the data cell
  - The user should be able to save the data

- Data should be saved locally and persisted across reloads

  - The user should be able to search the data
  - String that would be searching over all data columns to filter the rows

- The table should have the ability to group rows
  - The rows would be collapsible, grouping multiple rows together that would
    expand and collapse on click

## Requirements

- Optimized to render large data sets

  - It should be possible to feed the table a data set of 2000 rows (or more) with 10
    (or more) columns without being slow

- Be generic enough to be reusable with other data sets with different columns
  - We will try to feed our own columns and data sets (in the same shape provided
    below) and everything should work as expected

## Dataset Shape

```typescript
type TableDataType =
  | 'string'
  | 'number'
  | 'boolean'
  | 'list'
  | 'object'

type DataTable = {
  columns: Array<{
    id: string
    ordinalNo: number
    title: string
    type: TableDataType
    width?: number
  }>
  data: Array<{
    id: string
    [columnId: string]: unknown
  }>
}
```

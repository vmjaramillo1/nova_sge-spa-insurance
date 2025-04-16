export interface Portal {
  id: string
  name: string
  code: string
  isActive: boolean
  title: string
  description: string
  logo: string
  alt: string
  params: Param[]
  sections: Section[]
  menus: Menu[]
}

export interface Menu {
  id: string
  name: string
  code: string
  title: string
  description: string
  icon: string
  order: number
  parentId: string
  target: string
  isActive: boolean
  menus: string[]
}

export interface Param {
  key: string
  value: string
}

export interface Section {
  id: string
  name: string
  code: string
  isActive: boolean
  title: string
  description: string
  icon: string
  order: number
  attributes: Attribute[]
}

export interface Attribute {
  id: string
  key: string
  value: string
  type: string
  order: number
  isActive: boolean
  parentId: string
  attributes: Attribute[]
  attributeValues: AttributeValue[]
}

export interface AttributeValue {
  language: string
  value: string
}

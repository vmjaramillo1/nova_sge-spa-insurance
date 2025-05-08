import {
  convertAttribute,
  formatAttribute,
  reduceAttributes,
  reducePortal,
  reduceSections,
} from './portal-reduce-utils'

describe('formatAttribute', () => {
  it('should return string with type string', () => {
    const result = formatAttribute({
      attributes: [],
      attributeValues: [],
      isActive: true,
      id: '1',
      key: 'key',
      order: 1,
      type: 'string',
      value: 'value',
      parentId: '1',
    })

    expect(result).toEqual('value')
  })

  it('should return boolean with type boolean', () => {
    const result = formatAttribute({
      attributes: [],
      attributeValues: [],
      isActive: true,
      id: '1',
      key: 'key',
      order: 1,
      type: 'boolean',
      value: 'true',
      parentId: '1',
    })

    expect(result).toEqual(true)
  })

  it('should return number with type number', () => {
    const result = formatAttribute({
      attributes: [],
      attributeValues: [],
      isActive: true,
      id: '1',
      key: 'key',
      order: 1,
      type: 'number',
      value: '1',
      parentId: '1',
    })

    expect(result).toEqual(1)
  })

  it('should return array with type array', () => {
    const result = formatAttribute({
      attributes: [],
      attributeValues: [],
      isActive: true,
      id: '1',
      key: 'key',
      order: 1,
      type: 'array',
      value: '1',
      parentId: '1',
    })

    expect(result).toBeInstanceOf(Array)
    expect(result).toEqual([])
  })

  it('should return properties if have attributes', () => {
    const result = formatAttribute({
      attributes: [
        {
          attributes: [],
          attributeValues: [],
          isActive: true,
          id: '2',
          key: 'title',
          order: 1,
          type: 'string',
          value: '1',
          parentId: '1',
        },
      ],
      attributeValues: [],
      isActive: true,
      id: '1',
      key: 'key',
      order: 1,
      type: 'object',
      value: '1',
      parentId: '1',
    })

    expect(result).toEqual({ isActive: true, key: 'key', order: 1, title: '1' })
  })
})

describe('convertAttribute', () => {
  it('should return without isActive, key, order if type is record', () => {
    const result = convertAttribute({
      attributes: [
        {
          attributes: [],
          attributeValues: [],
          isActive: true,
          id: '2',
          key: 'KEY01',
          order: 1,
          type: 'string',
          value: 'some value',
          parentId: '1',
        },
        {
          attributes: [],
          attributeValues: [],
          isActive: true,
          id: '3',
          key: 'KEY02',
          order: 1,
          type: 'string',
          value: 'other value',
          parentId: '1',
        },
      ],
      attributeValues: [],
      isActive: true,
      id: '1',
      key: 'key',
      order: 1,
      type: 'record',
      value: '1',
      parentId: '1',
    })

    expect(result).toEqual({
      KEY01: 'some value',
      KEY02: 'other value',
    })
  })

  it('should return with isActive, key, order if type is not record', () => {
    const result = convertAttribute({
      attributes: [],
      attributeValues: [],
      isActive: true,
      id: '1',
      key: 'key',
      order: 1,
      type: 'object',
      value: '1',
      parentId: '1',
    })

    expect(result).toEqual({
      isActive: true,
      key: 'key',
      order: 1,
      value: '1',
    })
  })
})

describe('reduceAttributes', () => {
  it('should return object with attributes', () => {
    const result = reduceAttributes([
      {
        attributes: [],
        attributeValues: [],
        isActive: true,
        id: '2',
        key: 'name',
        order: 1,
        type: 'string',
        value: 'some value',
        parentId: '1',
      },
      {
        attributes: [
          {
            attributes: [],
            attributeValues: [],
            isActive: true,
            id: '1',
            key: 'first',
            order: 1,
            type: 'string',
            value: 'first',
            parentId: '1',
          },
        ],
        attributeValues: [],
        isActive: true,
        id: '3',
        key: 'values',
        order: 1,
        type: 'object',
        value: 'other value',
        parentId: '1',
      },
      {
        attributes: [],
        attributeValues: [],
        isActive: true,
        id: '1',
        key: 'random',
        order: 1,
        type: 'string',
        value: '1',
        parentId: '1',
      },
    ])

    expect(result).toEqual({
      name: 'some value',
      values: {
        key: 'values',
        isActive: true,
        order: 1,
        first: 'first',
      },
      random: '1',
    })
  })
})

describe('reduceSections', () => {
  it('should return object with sections', () => {
    const result = reduceSections([
      {
        code: 'code',
        attributes: [],
        isActive: true,
      },
    ])

    expect(result).toEqual({
      code: {},
    })
  })
})

// todo esto aun debe ser implementado
describe('reduceParams', () => {
  it("should return ''", () => {
    //const result = reduceParams()
    const result = () => {
      return 'value1'
    }

    expect(result).toEqual('value')
  })
})

// todo esto aun debe ser implementado
describe('reducePortal', () => {
  it("should return ''", () => {
    //const result = reducePortal()
    const result = () => {
      return 'value1'
    }

    expect(result).toEqual('value')
  })
})

// describe('reducePortal', () => {
//   // it('should return object with portal reduced', () => {
//   //   const result = reducePortal({
//   //     code: '',
//   //     isActive: false,
//   //     sections: [
//   //       {
//   //         code: 'code',
//   //         attributes: [],
//   //         isActive: true,
//   //       },
//   //     ],
//   //   })

//   //   expect(result).toEqual({
//   //     code: {},
//   //   })
//   // })
// })

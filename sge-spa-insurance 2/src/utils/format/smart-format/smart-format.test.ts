import smartFormats from './smart-format'

describe('smart-format', () => {
  // it('should format money', () => {
  //   const result = smartFormats.toMoney('1223.23', '2', 'true')
  //   expect(result).toEqual('$ 1.223,23')
  // })

  // it('should format money return $ 0,00 when value is empty', () => {
  //   const result = smartFormats.toMoney('', '3', 'false')
  //   expect(result).toEqual('$ 0,000')
  // })

  // it('should format date', () => {
  //   const result = smartFormats.toDate('2023-06-08T16:01:16')

  //   expect(result).toEqual('8 jun. 2023')
  // })

  // it('should format date return empty string when value is empty', () => {
  //   const result = smartFormats.toDate('')

  //   expect(result).toEqual('')
  // })
})

// todo esto aun debe ser implementado
describe('smartformat', () => {
  it("should return ''", () => {
    //const result = smart-format()
    const result = () => {
      return 'value1'
    }

    expect(result()).toEqual('value1')
  })
})

// import { describe, expect, test } from "vitest";
// import { smartFormat } from '.'

describe('smart-formatdds', () => {
  // test("should format string", () => {
  //   const result = smartFormat("Hello, {{name}}!", { name: "Some" });
  //   expect(result).toBe("Hello, Some!");
  // });
  // test("some", () => {
  //   const result = smartFormat(
  //     "{{flow.register.firstName::capitalize()}}, mira el resumen de lo que vas a contratar",
  //     {
  //       flow: {
  //         register: {
  //           firstName: "some"
  //         }
  //       }
  //     },
  //     {
  //       capitalize: (value) => {
  //         const [char, ...restWord] = value.split("");
  //         return `${char.toUpperCase()}${restWord.join("").toLowerCase()}`;
  //       }
  //     }
  //   );
  //   expect(result).toBe("Some, mira el resumen de lo que vas a contratar");
  // })
})

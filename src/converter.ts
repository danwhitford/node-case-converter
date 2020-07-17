
const snakePattern = /[a-z]+_(?<capt>[a-z])[a-z_]+/
const camelPattern = /[a-z]+(?<capt>[A-Z])[a-zA-Z]+/

const converter = (s: string, pattern: RegExp, replacer: ((ss: string, capt: string) => string)) => {
    let matches = s.match(pattern)
    let capt = matches?.groups?.capt

    while (capt !== undefined) {
        s = replacer(s, capt)
        matches = s.match(pattern)
        capt = matches?.groups?.capt
    }
    return s
}

const objectKeysConverter = (o: object, conversionFn: ((ss: string) => string)) => {
    return Object.entries(o).reduce((acc: object, curr: [string, any]) => {
        const [key, val] = curr
        return {
            [conversionFn(key)]: val,
            ...acc
        }
    }, {})
}


export const snakeToCamel = (s: string): string =>
    converter(s, snakePattern, (ss, capt) => ss.replace('_' + capt, capt.toLocaleUpperCase()))

export const camelToSnake = (s: string): string =>
    converter(s, camelPattern, (ss, capt) => ss.replace(capt, "_" + capt.toLocaleLowerCase()))

export const objectSnakeToCamel = (o: object) =>
    objectKeysConverter(o, snakeToCamel)

export const objectCamelToSnake = (o: object) =>
    objectKeysConverter(o, camelToSnake)

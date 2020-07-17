const converter = (s: string, pattern: RegExp, replacerFn: ((ss: string, capt: string) => string)) => {
    let capt = s.match(pattern)?.groups?.capt

    while (capt !== undefined) {
        s = replacerFn(s, capt)
        capt = s.match(pattern)?.groups?.capt
    }
    return s
}

const objectKeysConverter = (o: object, conversionFn: ((ss: string) => string)) => {
    const newObject: {[key: string]: any} = {}
    for (let [key, val] of Object.entries(o)) {
        newObject[conversionFn(key)] = val
    }
    return newObject
}

const snakePattern = /[a-z]+_(?<capt>[a-z])[a-z_]+/
export const snakeToCamel = (s: string): string =>
    converter(s, snakePattern, (ss, capt) => ss.replace('_' + capt, capt.toLocaleUpperCase()))

const camelPattern = /[a-z]+(?<capt>[A-Z])[a-zA-Z]+/
export const camelToSnake = (s: string): string =>
    converter(s, camelPattern, (ss, capt) => ss.replace(capt, "_" + capt.toLocaleLowerCase()))

export const objectSnakeToCamel = (o: object) =>
    objectKeysConverter(o, snakeToCamel)

export const objectCamelToSnake = (o: object) =>
    objectKeysConverter(o, camelToSnake)

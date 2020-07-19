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

const snakePattern = /_(?<capt>[a-z])/
export const snakeToCamel = (s: string): string => {
    return converter(s, snakePattern, (ss, capt) => ss.replace('_' + capt, capt.toLocaleUpperCase()))
}

const camelPattern = /(?<capt>[A-Z])/
export const camelToSnake = (s: string): string => {
    return converter(s, camelPattern, (ss, capt) => ss.replace(capt, "_" + capt.toLocaleLowerCase()))
}

export const objectSnakeToCamel = (o: object) =>
    objectKeysConverter(o, snakeToCamel)

export const objectCamelToSnake = (o: object) =>
    objectKeysConverter(o, camelToSnake)

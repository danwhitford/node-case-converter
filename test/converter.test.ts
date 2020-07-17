import { snakeToCamel, camelToSnake, objectCamelToSnake, objectSnakeToCamel } from '../src/converter'

test('Converts to camel case', () => {
    expect(snakeToCamel("something")).toBe("something");
    expect(snakeToCamel("some_thing")).toBe("someThing");
    expect(snakeToCamel("some_thing_else")).toBe("someThingElse");
})

test('Converts to snake case', () => {
    expect(camelToSnake("something")).toBe("something");
    expect(camelToSnake("someThing")).toBe("some_thing");
    expect(camelToSnake("someThingElse")).toBe("some_thing_else");
})

test('Converts both ways', () => {
    expect(snakeToCamel(camelToSnake("something"))).toBe("something");
    expect(snakeToCamel(camelToSnake("someThing"))).toBe("someThing");
    expect(snakeToCamel(camelToSnake("someThingElse"))).toBe("someThingElse");

    expect(camelToSnake(snakeToCamel("something"))).toBe("something");
    expect(camelToSnake(snakeToCamel("some_thing"))).toBe("some_thing");
    expect(camelToSnake(snakeToCamel("some_thing_else"))).toBe("some_thing_else");
})

const snakeObj = {
    something: 0,
    some_thing: 1,
    some_thing_else: 2,
}

const camelObj = {
    something: 0,
    someThing: 1,
    someThingElse: 2,
}

test('Convert object to camel case', () => {
    expect(objectCamelToSnake(camelObj)).toStrictEqual(snakeObj)
})

test('Convert object to snake case', () => {
    expect(objectSnakeToCamel(snakeObj)).toStrictEqual(camelObj)
})

test('Convert objects back and forth', () => {
    expect(objectCamelToSnake(objectSnakeToCamel(snakeObj))).toStrictEqual(snakeObj)
    expect(objectSnakeToCamel(objectCamelToSnake(camelObj))).toStrictEqual(camelObj)
})

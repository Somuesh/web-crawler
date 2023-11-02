const { sortPages } = require('./report')
const { test, expect } = require('@jest/globals')


/*------test case for sort pages function----------*/

test("sort 2 pages", ()=>{
    const input = {
        'https://wagslane.dev/path': 1,
        'https://wagslane.dev': 3
    }
    const actual = sortPages(input)
    const expected = [
        ['https://wagslane.dev',3],
        ['https://wagslane.dev/path',1]
    ]

    expect(actual).toEqual(expected)
})

test("sort 5 pages", ()=>{
    const input = {
        'https://wagslane.dev/path': 1,
        'https://wagslane.dev': 8,
        'https://wagslane.dev/path2': 4,
        'https://wagslane.dev/path3': 1,
        'https://wagslane.dev/path12': 3
    }
    const actual = sortPages(input)
    const expected = [
        ['https://wagslane.dev', 8],
        ['https://wagslane.dev/path2', 4],
        ['https://wagslane.dev/path12', 3],
        ['https://wagslane.dev/path', 1],
        ['https://wagslane.dev/path3', 1]

    ]

    expect(actual).toEqual(expected)
})

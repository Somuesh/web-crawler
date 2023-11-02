const { normalizeURL, getURLsFromHTML } = require('./crawl')
const { test, expect } = require('@jest/globals')


/*------test case for normalizeURL function----------*/

test("normalize url strip protocol", ()=>{
    const input = 'https://github.com/somuesh'
    const actual = normalizeURL(input)
    const expected = 'github.com/somuesh'

    expect(actual).toEqual(expected)
})

test("normalize url strip ending slash", ()=>{
    const input = 'https://github.com/somuesh/'
    const actual = normalizeURL(input)
    const expected = 'github.com/somuesh'

    expect(actual).toEqual(expected)
})

test("normalize url capitals", ()=>{
    const input = 'https://GITHUB.com/somuesh'
    const actual = normalizeURL(input)
    const expected = 'github.com/somuesh'

    expect(actual).toEqual(expected)
})

test("normalize url strip http", ()=>{
    const input = 'http://GITHUB.com/somuesh'
    const actual = normalizeURL(input)
    const expected = 'github.com/somuesh'

    expect(actual).toEqual(expected)
})

/*---------- test cases for getURLsFromHTML -------*/

test("getURLsFromHTML absolute urls", ()=>{
    const inputHTMLBody = `
    <html>
    <body>
        <a href="https://github.com/somuesh">
            My Github
        </a>
        <a href="https://instagram.com/somuesh">
            My instagram
        </a>
    </body>
    </html>
    `
    const inputBaseURL = 'https://github.com'
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
    const expected = ['https://github.com/somuesh','https://instagram.com/somuesh']

    expect(actual).toEqual(expected)
})

test("getURLsFromHTML relative urls", ()=>{
    const inputHTMLBody = `
    <html>
    <body>
        <a href="/somuesh">
            My Github
        </a>
        <a href="/som_sharma766">
            My instagram
        </a>
    </body>
    </html>
    `
    const inputBaseURL = 'https://github.com/'
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
    const expected = ['https://github.com/somuesh','https://github.com/som_sharma766']

    expect(actual).toEqual(expected)
})

test("getURLsFromHTML both urls", ()=>{
    const inputHTMLBody = `
    <html>
    <body>
        <a href="/somuesh">
            My Github
        </a>
        <a href="https://github.com/som_sharma766">
            My instagram
        </a>
    </body>
    </html>
    `
    const inputBaseURL = 'https://github.com/'
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
    const expected = ['https://github.com/somuesh','https://github.com/som_sharma766']

    expect(actual).toEqual(expected)
})

test("getURLsFromHTML invalid urls", ()=>{
    const inputHTMLBody = `
    <html>
    <body>
        <a href="invalid">
            My Github
        </a>
        <a href="https://github.com/som_sharma766">
            My instagram
        </a>
    </body>
    </html>
    `
    const inputBaseURL = 'https://github.com/'
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
    const expected = ['https://github.com/som_sharma766']

    expect(actual).toEqual(expected)
})
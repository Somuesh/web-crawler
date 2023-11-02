//process.argv - this is a global array variable that takes up inputs from console.
const { crawlPage } = require('./crawl')

function main() {
    if (process.argv.length < 3) {
        console.log("No website provided!");
        process.exit(1);
    }

    if (process.argv.length > 3) {
        console.log("Too many inputs provided!");
        process.exit(1);
    }

    const baseURL = process.argv[2]

    console.log(`starting crawl of ${baseURL}`)

    crawlPage(baseURL);
}


main()
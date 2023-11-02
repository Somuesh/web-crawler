//process.argv - this is a global array variable that takes up inputs from console.
const { crawlPage } = require('./crawl')
const { printReport } = require('./report')

async function main() {
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

    const pages = await crawlPage(baseURL, baseURL, {});

    // for(const page of Object.entries(pages)){
    //     console.log(page)
    // }
    printReport(pages)
}


main()
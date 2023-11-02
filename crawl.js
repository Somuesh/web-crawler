const { JSDOM } = require('jsdom');


async function crawlPage(baseURL, currentURL, pages){

    const baseURLObj = new URL(baseURL);
    const currentURLObj = new URL(currentURL);
    //When different domain url is hit:
    if(baseURLObj.hostname !== currentURLObj.hostname){
        return pages
    }

    const normalizedCurrentURL = normalizeURL(currentURL);
    if(pages[normalizedCurrentURL] > 0){
        pages[normalizedCurrentURL]++
        return pages
    }

    pages[normalizedCurrentURL] = 1;
    console.log(`actively crawling: ${currentURL}`);

    try{
        const resp = await fetch(currentURL)
        //console.log(await resp.text())

        if(resp.status > 399){
            console.log(`Error fetching the url: ${currentURL} with status code: ${resp.status}`)
            return pages
        }

        const contentType = resp.headers.get('content-type');
        if(!contentType.includes('text/html')){
            console.log(`Non html response on: ${currentURL} with content type: ${contentType}`)
            return pages
        }

        const htmlBody = await resp.text()

        const nextUrls = getURLsFromHTML(htmlBody, baseURL)

        for(const nextUrl of nextUrls){
            pages = await crawlPage(baseURL, nextUrl, pages)
        }
    }
    catch(e){
        console.log(`error fetching the info: ${e.message}, on page: ${currentURL}`)
    }

    return pages
}


function getURLsFromHTML(htmlBody, baseURL) {
    const urls = []

    if(baseURL.slice(-1) === '/'){
        baseURL = baseURL.slice(0,-1)
    }

    const dom = new JSDOM(htmlBody)
    const linkElements = dom.window.document.querySelectorAll('a');

    for( const linkelem of linkElements){
        // console.log(linkelem.href)
        if(linkelem.href.slice(0,1) === '/'){
            //Its relative url
            try{
                const urlObj = new URL(`${baseURL}${linkelem.href}`)
                urls.push(urlObj.href)
            }
            catch(err){
                console.log(`error with relative url: ${err.message}`)
            }
        }
        else{
            //Its absolute url
            try{
                const urlObj = new URL(linkelem.href)
                urls.push(urlObj.href)
            }
            catch(err){
                console.log(`error with absolute url: ${err.message}`)
            }
        }
        
    }
    return urls
}

function normalizeURL(urlString) {
    const urlObj = new URL(urlString);
    const hostPath = `${urlObj.hostname}${urlObj.pathname}`;

    if (hostPath.length > 0 && hostPath.slice(-1) === '/') {
        return hostPath.slice(0, -1) //everything except last character
    }
    return hostPath
}

module.exports = {
    normalizeURL,
    getURLsFromHTML,
    crawlPage
}
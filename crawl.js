const { JSDOM } = require('jsdom');


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
    getURLsFromHTML
}
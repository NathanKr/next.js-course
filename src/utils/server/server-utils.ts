export function getConcatedRelativeUrlToBaseServer(relativeUrl : string) : string{
    const base =  getServerAbsoluteUrl();
    const url = relativeUrl;
    return (new URL(url, base)).toString();
}

function getServerAbsoluteUrl() : string{
    return 'http://localhost:3000';
}
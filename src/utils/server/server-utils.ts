export function getConcatedRelativeUrlToBaseServer(relativeUrl : string) : string{
    const base =  getServerAbsoluteUrl();
    const url = relativeUrl;
    return (new URL(url, base)).toString();
}

// 

function getServerAbsoluteUrl() : string{
    return isProduction() ? 'https://next-js-course-psi.vercel.app' : 'http://localhost:3000';
}

export function isProduction() : boolean{
    return process.env.NODE_ENV == 'production';
}
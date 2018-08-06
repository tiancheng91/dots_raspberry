var PROXY = 'SOCKS5 127.0.0.1:18081';

var HOSTS = [
    // google
    'google.com', 'google.ca', 'gmail.com',  'googleapis.com',
    'chrome.com', 'blogspot.com', 'appspot.com', 'ytimg.com', 'youtube.com', 'googlevideo.com',
    'recaptcha.net', 'goo.gl', 'g.co', 'googlezip.net', 'youtu.be', 'gvt1.com',
    'gstatic.com', 'googleusercontent.com', 'ggpht.com',

    // dev tools ???????google ip
    'googlecode.com', 'googlesource.com', 'gcr.io', 'android.com', 'golang.org', 'chromium.org',
    // 'material.io',

    // ???
    'm.me', 'fb.com', 'm.me', 'facebook.com', 'messager.com', 'fbsbx.com', 'fbcdn.net',
    'twitter.com', 't.co', 'twitpic.com', 'twimg.com', 'tweetdeck.com',
    'disqus.com', 'zh.wikipedia.org',

    // dev
    'duckduckgo.com', 'datadoghq.com', 'medium.com',

    // amazon
    'amazon.com', 'amazonaws.com',

    // dropbox
    'dropbox.com', 'dropboxusercontent.com', 'db.tt', 'dropbox-dns.com', 'dropboxstatic.com',

    // coin
    'bitcointalk.org', 'zb.com', 'xmrchain.net', 'mymonero.com', 'supportxmr.com', 'binance.com', 'kucoin.com',

    // cdn
    'cloudfront.net', 'fastly.net',
];

var IGNORE = [
    // ????
    'local', 'test', 'dl.google.com', 'google.cn'
]

var HOST_KEYWORDS = [

];

var URL_KEYWORDS = [
    'google', 'facebook', 'twitter', 'torrent', 'proxy', 'vpn'
];


var BLOCK_HOSTS = cleanHosts(HOSTS);
var IGNORE_HOSTS = cleanHosts(IGNORE);


function inHosts(host, hosts) {
    var hostParts = host.split('.'), testHost = [];
    while (hostParts.length) {
        testHost.unshift(hostParts.pop());
        if (hosts[testHost.join('.')]) {
            return true;
        }
    }
}

function inKeywords(uri, keywords) {
    for (var i = 0; i < keywords.length; i++) {
        if (uri.indexOf(keywords[i]) >= 0) {
            return true;
        }
    }
}

function cleanHosts(hosts) {
    var r = {};
    for (var i = 0; i < hosts.length; i++) {
        if (hosts[i][0] !== '!')
            r[hosts[i]] = true;
    }
    return r;
}

function FindProxyForURL(url, host) {
    if (inHosts(host, IGNORE_HOSTS)) {
        return 'DIRECT';
    }
    if (inHosts(host, BLOCK_HOSTS) || inKeywords(url, URL_KEYWORDS)) {
        return PROXY;
    }

    return 'DIRECT';
}

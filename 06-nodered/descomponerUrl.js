function decomposeUrl(url) {
    const urlPattern = /^(?<protocol>[a-zA-Z]+):\/\/(?:(?<subDomain>[^.]+)\.)?(?<domainName>[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}|(?<ipAddress>\b\d{1,3}(?:\.\d{1,3}){3}\b))(?::\d+)?(?<path>\/[^?#]*)?(?<query>\?.*)?$/;
    const match = url.match(urlPattern);

    if (!match) return null;

    const { protocol, subDomain, domainName, ipAddress, path, query } = match.groups;

    let folderTree = null;
    let targetFile = null;

    if (path) {
        const parts = path.split('/').filter(Boolean);
        if (parts.length > 0) {
            const lastSegment = parts[parts.length - 1];

            // Considerar cualquier último segmento como archivo si hay query o no hay carpeta después
            if (/\.[a-zA-Z0-9]+$/.test(lastSegment) || query || parts.length === 1) {
                targetFile = lastSegment;
                folderTree = parts.slice(0, -1).length > 0 ? parts.slice(0, -1) : null;
            } else {
                folderTree = parts;
            }
        }
    }

    // Validar direcciones IP válidas
    const validIp = ipAddress && ipAddress.split('.').every(octet => octet >= 0 && octet <= 255 && octet === String(Number(octet)));

    return {
        protocol: protocol || null,
        ipAdress: validIp ? ipAddress : null,
        subDomain: subDomain || null,
        domainName: validIp ? null : domainName || null,
        folderTree,
        targetFile: targetFile || null,
        argumentsFile: query || null,
    };
}
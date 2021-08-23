export const isRelativePath = (path: string): boolean => {
    return !/^(?:\/|[a-z]+:\/\/)/.test(path);
}

export const isGuid = (text: string | object): boolean => {
    const guidRegExp = new RegExp('^[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}$', 'i')
    return typeof text === 'string' && guidRegExp.test(text);
}
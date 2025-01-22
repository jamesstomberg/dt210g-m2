export function getApiRoute(route: string) {
    const baseUrl = 'https://vanilla.test';
    const namespace = '/wp-json/todo-open-api/v1';

    return `${baseUrl}${namespace}${route}`;
}

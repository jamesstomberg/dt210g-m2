export function getApiRoute(route: string) {
    // Local.
    // const baseUrl = 'https://vanilla.test';
    // Live.
    const baseUrl = 'https://test.skovdebowling.se';
    const namespace = '/wp-json/todo-open-api/v1';

    return `${baseUrl}${namespace}${route}`;
}

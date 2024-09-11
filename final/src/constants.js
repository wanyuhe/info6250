export const SERVER = {
    AUTH_MISSING: 'auth-missing',
    AUTH_INSUFFICIENT: 'auth-insufficient',
    REQUIRED_USERNAME: 'required-username',
    REQUIRED_TASK: 'required-task',
};

export const CLIENT = {
    NETWORK_ERROR: 'network-error',
    INVALID_INPUT: 'invalid-word'
};

export const MESSAGES = {
    [CLIENT.NETWORK_ERROR]: 'Error: Network Disconnection',
    [SERVER.AUTH_INSUFFICIENT]: 'Error: dog is a disallowed User',
    [SERVER.REQUIRED_USERNAME]: 'Error: This is an invalid Username',
    [CLIENT.INVALID_INPUT]: 'Error: Invalid Word',
};
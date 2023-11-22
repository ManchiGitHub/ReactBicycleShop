const baseURL = 'https://aefe-82-81-200-80.ngrok-free.app';
const UsersEndpoint = `${baseURL}/users`;
const BicyclesEndpoint = `${baseURL}/bicycles`;

const BypassGrokLandingPageHeader = {
    headers: {
        'ngrok-skip-browser-warning': 'true'
    }
}

const Network = {
    UsersEndpoint,
    BicyclesEndpoint,
    BypassGrokLandingPageHeader
}

const RequestHeaders = {
    BypassGrokLandingPageHeader
}

export { Network, RequestHeaders };
export type { };
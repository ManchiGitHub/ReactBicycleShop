const baseURL = 'http://localhost:3000'; // need to regenrate everytime ngrok launches. 
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
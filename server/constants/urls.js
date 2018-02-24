import { IS_PROD_ENV, SERVER_PORT } from '../config';

import { config } from '../../environment';

const { prodReservationsHost, prodStallsHost, proxyHost } = config;

/**
 * Used when services are running locally, but as separate services.
 */
const LOCAL_HOST = 'http://localhost';

/**
 * Used when services are mocked from this application.
 */
const MOCKS_HOST = `${LOCAL_HOST}:${SERVER_PORT}`;
const RESERVATIONS_HOST = IS_PROD_ENV ? prodReservationsHost : `${LOCAL_HOST}:8080`;
const STALLS_HOST = IS_PROD_ENV ? prodStallsHost : MOCKS_HOST;

const PROD_RESERVATIONS_API = '/rest/meetingRoom/lookup/all';
const PROD_STALLS_API = '/stalls';
export const MOCK_RESERVATIONS_API = '/mocks/meetingRoom/all';
export const MOCK_STALLS_API = '/mocks/stalls';

const MOCK_RESERVATIONS = `${MOCKS_HOST}${MOCK_RESERVATIONS_API}`;
const PROD_RESERVATIONS = `${RESERVATIONS_HOST}${PROD_RESERVATIONS_API}`;
export const RESERVATIONS_URL = process.env.MOCKS ? MOCK_RESERVATIONS : PROD_RESERVATIONS;

const MOCK_STALLS = `${MOCKS_HOST}${MOCK_STALLS_API}`;
const PROD_STALLS = `${STALLS_HOST}${PROD_STALLS_API}`;
export const STALLS_URL = IS_PROD_ENV ? PROD_STALLS : MOCK_STALLS;

export const PROXY_HOST = proxyHost;

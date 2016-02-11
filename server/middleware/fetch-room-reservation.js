/* eslint no-console:0 */
/* globals console */
import http from 'http';

import { EMIT_ROOM_STATUSES_UPDATE } from '../ducks/rooms';
import * as urls from '../constants/urls';
import filterExpiredReservations from '../utils/filter-reservations';
import setAlertByReservationStatus from '../utils/set-reservation-alert';

const fetchRoomReservations = (next, action) => {
  const { room, accessories } = action;
  const source = `${urls.ROOM_RESERVATIONS}${encodeURIComponent(room.id)}`;

  // Retrieve room reservation statuses from Exchange wrapper
  http.get(source, (response) => {
    response.on('data', (data) => {
      const reservationsResponse = JSON.parse(data.toString('utf8'));
      const reservations = filterExpiredReservations(reservationsResponse);
      const roomWithAlert = setAlertByReservationStatus(room, reservations);

      next({
        type: EMIT_ROOM_STATUSES_UPDATE,
        room: roomWithAlert,
        accessories
      });
    });
  }).on('error', ({ code }) => {
    const errorMessage = `Failed to fetch room reservations for ${room.id}.`;

    console.error(errorMessage, code);
  });
};

export default fetchRoomReservations;

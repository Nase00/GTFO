/* eslint no-console:0, callback-return:0 */
import mockRoomData from '../mocks/mock-data';
import fetchRoomReservations from './fetch-room-reservation';
import fetchRoomTemperature from './fetch-room-temperature';
import fetchRoomMotion from './fetch-room-motion';
import setAlertByReservationStatus from './helpers/set-reservation-alert';
import {
  MOCK_ROOM_RESERVATIONS,
  FETCH_ROOM_RESERVATIONS,
  FETCH_ROOM_TEMPERATURE,
  FETCH_ROOM_MOTION,
  EMIT_ROOM_STATUSES_UPDATE
} from '../ducks/rooms';

export default () => (next) => (action) => {
  const { room, accessories } = action;

  switch (action.type) {
    case MOCK_ROOM_RESERVATIONS:
      const reservations = mockRoomData[room.outlookAccount];
      const roomWithAlert = setAlertByReservationStatus(room, reservations);

      next({
        type: EMIT_ROOM_STATUSES_UPDATE,
        room: roomWithAlert,
        accessories
      });
      break;

    case FETCH_ROOM_RESERVATIONS:
      fetchRoomReservations(next, action);
      break;

    case FETCH_ROOM_TEMPERATURE:
    console.log('FETCH_ROOM_TEMPERATURE')
      fetchRoomTemperature(room, next, action);
      break;

    case FETCH_ROOM_MOTION:
    console.log('FETCH_ROOM_MOTION')
      fetchRoomMotion(room, next, action);
      break;

    default:
      next(action);
      break;
  }
};

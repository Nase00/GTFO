import { readFileSync } from 'fs';

import notificationsController from '../controllers/notifications';

const { devices } = JSON.parse(readFileSync('./devices.json', 'utf8'));
const coordinates = JSON.parse(readFileSync('./coordinates.json', 'utf8'));

// Map room coordinates to device object
devices.map((device) => device.coordinates = coordinates[device.id]);

export const MOCK_ROOM_RESERVATIONS = 'MOCK_ROOM_RESERVATIONS';
export const FETCH_ROOM_TEMPERATURE = 'FETCH_ROOM_TEMPERATURE';
export const FETCH_ROOM_MOTION = 'FETCH_ROOM_MOTION';
export const EMIT_ROOM_STATUSES_UPDATE = 'EMIT_ROOM_STATUSES_UPDATE';
export const EMIT_ROOM_STATUSES_ERROR = 'EMIT_ROOM_STATUSES_ERROR';
export const EMIT_ROOM_TEMPERATURE_UPDATE = 'EMIT_ROOM_TEMPERATURE_UPDATE';
export const EMIT_ROOM_MOTION_UPDATE = 'EMIT_ROOM_MOTION_UPDATE';

const reducer = (state = devices, action) => {
  const { room,
          accessories,
          temperature,
          lastMotion } = action;

  switch (action.type) {
    case EMIT_ROOM_STATUSES_UPDATE:
      notificationsController(room, accessories);

      return room;

    case EMIT_ROOM_STATUSES_ERROR:
      // TODO error handling
      return state;

    case EMIT_ROOM_TEMPERATURE_UPDATE:
      room.temperature = temperature;
      return room;

    case EMIT_ROOM_MOTION_UPDATE:
      room.lastMotion = lastMotion || false;
      return room;

    default:
      return state;
  }
};

export default reducer;

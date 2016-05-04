/* eslint no-console:0, max-nested-callbacks:0, array-callback-return:0 */
/* globals console, setInterval, clearInterval */

/**
 * Initializes x number of devices
 * Registers accessories for each device
 */

import consoleController from './console';
import store from '../store';
import { config } from '../environment';
import { registerBoard,
         registerLed,
         registerPiezo,
         registerThermo,
         registerMotion,
         logBoardReady } from '../utils';
import { EMIT_INIT_SOCKETS } from '../ducks/clients';
import { FETCH_ROOM_RESERVATIONS,
         FETCH_ROOM_TEMPERATURE,
         FETCH_ROOM_MOTION,
         EMIT_SET_ROOM_ACCESSORIES } from '../ducks/rooms';
import { CHECK_INTERVAL } from '../constants';

const devicesController = {
  getRooms() {
    const { rooms } = store.getState().roomsReducer.toJS();

    return rooms;
  },

  /**
   * Kicks off setting up and connecting to devices.
   * If devices are disabled, fetches reservations early without starting devices.
   * @returns {undefined}
   */
  initialize() {
    store.dispatch({
      type: EMIT_INIT_SOCKETS,
      publicConfig: config.public
    });

    const fetchRoomReservations = () => store.dispatch({ type: FETCH_ROOM_RESERVATIONS });
    fetchRoomReservations();

    devicesController.getRooms().map((room) => {
      const board = registerBoard(room);

      board.on('ready', devicesController.connectToRoom.bind(null, board, room));
      board.on('warn', consoleController.boardWarn);
      board.on('fail', consoleController.boardFail);
    });

    // Set interval for checking and responding to room state
    const monitorExternalServices = setInterval(() => {
      fetchRoomReservations();

      if (process.env.MOCKS) {
        // No need to continually check mock data for updates
        clearInterval(monitorExternalServices);
      }
    }, CHECK_INTERVAL);
  },

  /**
   * Top-level scope for handling an individual room's
   *  board accessories and reservations.
   * Kicks off actions to monitor accessory states, updating server state as necessary.
   * @param {object} board JohnnyFive board object.
   * @param {object} room Corresponding room object.
   * @returns {undefined}
   */
  connectToRoom(board, room) {
    logBoardReady(board);

    // Register all possible accessories
    const accessories = {
      led: registerLed(board),
      piezo: registerPiezo(board),
      thermo: registerThermo(board),
      motion: registerMotion(board)
    };

    if (config.public.enableTemperature) {
      store.dispatch({
        type: FETCH_ROOM_TEMPERATURE,
        room,
        accessories
      });
    }

    store.dispatch({
      type: FETCH_ROOM_MOTION,
      room,
      accessories
    });

    store.dispatch({
      type: EMIT_SET_ROOM_ACCESSORIES,
      room,
      accessories
    });
  }
};

export default devicesController;

import moment from 'moment';
import colors from 'colors/safe';

import {
  flashUnreserved,
  flashOccupied,
  flashFiveMinuteWarning,
  flashOneMinuteWarning
} from './set-leds';

const minutesFromNow = (minutes) => moment().add(minutes, 'minutes').toISOString();

const configureAccessories = (room, roomState, accessories) => {
  const firstMeeting = roomState[0];
  const secondMeeting = roomState[1];

  const noReservations = roomState.length === 0;

  if (noReservations) {
    console.log(`${room.outlookAccount} has no upcoming reservations`);

    flashUnreserved(accessories.led);
    return;
  }

  // Reservation conditions
  const currentlyReserved = moment(firstMeeting.endDate).isAfter(minutesFromNow(5));
  const reservationUpInOne = moment(firstMeeting.endDate).isBefore(minutesFromNow(1));
  const reservationUpInFive = moment(firstMeeting.endDate).isBefore(minutesFromNow(5));
  const nextMeetingStartingSoon = moment(secondMeeting.startDate).isBefore(minutesFromNow(5));

  const oneMinuteWarning = reservationUpInOne && nextMeetingStartingSoon;
  const fiveMinuteWarning = reservationUpInFive && nextMeetingStartingSoon;

  if (oneMinuteWarning) {
    console.log(`${room.outlookAccount} has 1 minute left on current reservation`);

    flashOneMinuteWarning(accessories.led);
  } else if (fiveMinuteWarning) {
    console.log(`${room.outlookAccount} has 5 minutes left on current reservation`);

    flashFiveMinuteWarning(accessories.led);
  } else if (currentlyReserved) {
    console.log(`${room.outlookAccount} is currently booked`);

    flashOccupied(accessories.led);
  }
};

export default configureAccessories;

import React from 'react';
import moment from 'moment';

interface Reservation {
  name: string;
  checkin: string;
  checkout: string;
}

interface ReservationOverlayProps {
  reservations: Reservation[];
  daysArray: (moment.Moment | null)[];
}

const ReservationOverlay: React.FC<ReservationOverlayProps> = ({ reservations, daysArray }) => {
  const getDayIndex = (date: moment.Moment) => {
    return daysArray.findIndex(day => day && day.isSame(date, 'day'));
  };

  return (
    <div className="absolute inset-0 grid grid-cols-7 pointer-events-none justify-center items-center">
      {reservations.map((reservation, index) => {
        const checkinDate = moment(reservation.checkin);
        const checkoutDate = moment(reservation.checkout);
        const startIndex = getDayIndex(checkinDate);
        const endIndex = getDayIndex(checkoutDate);

        if (startIndex === -1 || endIndex === -1) return null;

        const startRow = Math.floor(startIndex / 7) + 1;
        const endRow = Math.floor(endIndex / 7) + 1;
        const span = endIndex - startIndex + 1;

        return (
          <React.Fragment key={index}>
            {Array.from({ length: endRow - startRow + 1 }).map((_, rowIndex) => {
              const currentRow = startRow + rowIndex;
              const isFirstRow = rowIndex === 0;
              const isLastRow = rowIndex === endRow - startRow;

              let colStart = isFirstRow ? (startIndex % 7) + 1 : 1;
              let colEnd = isLastRow ? (endIndex % 7) + 2 : 8;

              return (
                <div
                  key={`${index}-${rowIndex}`}
                  className="relative bg-gray-500 text-white rounded-l-full px-2 flex h-5 text-xs items-center md:h-8 md:text-base"
                  style={{
                    gridColumn: `${colStart} / ${colEnd}`,
                    gridRow: `${currentRow}`,
                    zIndex: 10,
                    fontFamily: 'Airbnb Cereal VF, Circular, -apple-system, BlinkMacSystemFont, Roboto, Helvetica Neue, sans-serif',
                  }}
                >
                  {isFirstRow ? reservation.name : null}
                </div>
              );
            })}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default ReservationOverlay;

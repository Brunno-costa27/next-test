import React from 'react';
import moment from 'moment';

interface Reservation {
  name: string;
  checkin: string;
  checkout: string;
}

interface CalendarCellProps {
  date: moment.Moment;
  isSelected: boolean;
  onClick: (date: string) => void;
  reservations: Reservation[];
  colSpan?: number;
}

const CalendarCell: React.FC<CalendarCellProps> = ({ date, isSelected, onClick, reservations, colSpan }) => {
  const cellStyle = isSelected
    ? 'relative flex flex-col h-16 md:h-32 lg:h-36 w-full border border-[#DDDDDD] bg-[#222222] text-white rounded-xl p-1 md:p-2 cursor-pointer select-none'
    : 'relative flex flex-col h-16 md:h-32 lg:h-36 w-full border border-[#DDDDDD] cursor-pointer hover:bg-[#EBEBEB] p-1 md:p-2 select-none';

  const dayReservations = reservations.filter(reservation =>
    moment(reservation.checkin).isSameOrBefore(date, 'day') &&
    moment(reservation.checkout).isSameOrAfter(date, 'day')
  );

  const isStartOfReservation = (reservation: Reservation) =>
    moment(reservation.checkin).isSame(date, 'day');

  const isContinuationOfReservation = (reservation: Reservation) =>
    moment(reservation.checkin).isBefore(date, 'day') &&
    moment(reservation.checkout).isSameOrAfter(date, 'day');

  const getSpanForCurrentCell = (reservation: Reservation) => {
    const dayOfWeek = date.day();
    const daysUntilEndOfWeek = 6 - dayOfWeek;
    const daysUntilCheckout = moment(reservation.checkout).diff(date, 'days') + 1;

    return Math.min(daysUntilEndOfWeek + 1, daysUntilCheckout);
  };


// Função para verificar se a reserva cobre sábado e domingo
const isReservationCoveringWeekend = (reservation: Reservation) => {
  const checkin = moment(reservation.checkin);
  const checkout = moment(reservation.checkout);

  // Define o sábado e o domingo da semana do check-in
  const saturday = checkin.clone().day(6); // 6 é sábado
  const sunday = checkin.clone().day(0); // 0 é domingo

  // Verifica se a reserva cobre o sábado e o domingo
  const coversSaturday = checkin.isSameOrBefore(saturday, 'day') && checkout.isSameOrAfter(saturday, 'day');
  const coversSunday = checkin.isSameOrBefore(sunday, 'day') && checkout.isSameOrAfter(sunday, 'day');
  console.log(reservation.name)
  console.log("Sábado", coversSaturday)
  console.log("Domingo", coversSunday)
  return coversSaturday && !coversSunday;
};

  return (
    <div
      className={cellStyle}
      onClick={() => onClick(date.format('YYYY-MM-DD'))}
      style={{ gridColumn: `span ${colSpan || 1}` }}
    >
      <div className="text-[10px] sm:text-xs text-center py-1 sm:py-2 md:text-sm lg:text-base">{date.format('D')}</div>

      {/* Renderização das reservas dentro da célula */}
      <div className="relative flex flex-col space-y-4 lg:space-y-10">
        {dayReservations.map((reservation, index) => {
          const span = getSpanForCurrentCell(reservation);
          const isEndOfWeek = date.day() === 6; // Verifica se é sábado
          const isFirstOfWeek = date.day() === 0; // Verifica se é domingo
          const isStartOnSunday = moment(reservation.checkin).day() === 0; // Verifica se a reserva começa no domingo
          const coversWeekend = isReservationCoveringWeekend(reservation)

          console.log(coversWeekend);
          
          return isStartOfReservation(reservation) || isContinuationOfReservation(reservation) ? (
            <div
              key={index}
              className="absolute bg-gray-500 text-white rounded-full px-1 sm:px-5 lg:mr-10 h-3 text-[8px] flex items-center md:h-8 md:text-base truncate tracking-tighter font-semibold"
              style={{
                gridColumn: `span ${span}`,
                fontFamily: 'Airbnb Cereal VF, Circular, -apple-system, BlinkMacSystemFont, Roboto, Helvetica Neue, sans-serif',
                // left: coversWeekend ? '-20px' : '0',
                left: isStartOnSunday ? '2px' : isFirstOfWeek ? '-10px' : '0',
                
                zIndex: 1,
                width: isEndOfWeek ? '130%' : `calc(100% * ${span})`,
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
              }}
            >
              {isStartOfReservation(reservation) ? reservation.name : null}
              {isFirstOfWeek ? reservation.name : null}
            </div>
          ) : null;
        })}
      </div>
    </div>
  );
};

export default CalendarCell;


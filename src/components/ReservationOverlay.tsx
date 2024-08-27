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

    // Função para determinar a posição vertical da reserva com base nas reservas que já foram renderizadas
    const calculateRowPosition = (startIndex: number, endIndex: number, renderedReservations: Array<{ start: number, end: number }>) => {
      let position = 0;

      // Tentar encontrar a primeira posição disponível que não sobrepõe outras reservas
      while (renderedReservations.some(reservation => (
        (startIndex <= reservation.end && startIndex >= reservation.start) ||
        (endIndex >= reservation.start && endIndex <= reservation.end)
      ))) {
        position += 1;
        renderedReservations.push({ start: startIndex, end: endIndex });
      }

      return position;
    };

    return (
      <div className="absolute inset-0 grid grid-cols-7 pointer-events-none">
        {reservations.map((reservation, index) => {
          const checkinDate = moment(reservation.checkin);
          const checkoutDate = moment(reservation.checkout);
          const startIndex = getDayIndex(checkinDate);
          const endIndex = getDayIndex(checkoutDate);

          if (startIndex === -1 || endIndex === -1) return null;

          const startRow = Math.floor(startIndex / 7) + 1;
          const endRow = Math.floor(endIndex / 7) + 1;
          const span = endIndex - startIndex + 1;

          const renderedReservations: Array<{ start: number, end: number }> = [];

          const rowPosition = calculateRowPosition(startIndex, endIndex, renderedReservations);

          return (
            <React.Fragment key={index}>
              {Array.from({ length: endRow - startRow + 1 }).map((_, rowIndex) => {
                const currentRow = startRow + rowIndex;
                const isFirstRow = rowIndex === 0;
                const isLastRow = rowIndex === endRow - startRow;

                let colStart = isFirstRow ? (startIndex % 7) + 1 : 1;
                let colEnd = isLastRow ? (endIndex % 7) + 2 : 8;
                
                // Verifica se a reserva ocupa a linha inteira ou se está contida completamente dentro de uma linha
                const isFullLine = colStart === 1 && colEnd === 8;
                const isContainedWithinLine = isFirstRow && isLastRow;

                return (
                  <div
                  key={`${index}-${rowIndex}`}
                  className="relative h-full flex items-end py-1 md:py-5"
                  style={{
                    gridColumn: `${colStart} / ${colEnd}`,
                    gridRow: `${currentRow}`,
                    zIndex: 10,
                    paddingLeft: isFirstRow ? '15px' : '0px', // padding left só na primeira linha
                    paddingRight: '4px', // padding right em todas as linhas
                  }}
                >
                  <div
                    className="bg-gray-500 px-1 md:px-4 text-white rounded-lg p-1 h-4 flex text-[10px] items-center md:h-8 md:text-base w-full"
                    style={{
                      borderRadius: isFullLine || isContainedWithinLine
                        ? '15px' // Arredondamento completo para reservas que ocupam a linha inteira ou estão completamente dentro de uma linha
                        : isFirstRow
                        ? '15px 0 0 15px' // Arredondamento apenas na primeira célula se não for linha inteira
                        : isLastRow
                        ? '0 15px 15px 0' // Arredondamento na última célula se não for linha inteira
                        : '0', // Sem arredondamento nas células intermediárias
                      fontFamily: 'Airbnb Cereal VF, Circular, -apple-system, BlinkMacSystemFont, Roboto, Helvetica Neue, sans-serif',
                    }}
                  >
                    {isFirstRow ? reservation.name : null}
                  </div>
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
  
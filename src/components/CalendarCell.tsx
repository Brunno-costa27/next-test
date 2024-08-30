// import React from 'react';
// import moment from 'moment';
// import ReservationOverlay from './ReservationOverlay';

// interface CalendarCellProps {
//   date: moment.Moment;
//   value: string;
//   isSelected: boolean;
//   onClick: (date: string) => void;
//   colSpan?: number; 
// }


// const CalendarCell: React.FC<CalendarCellProps> = ({ date, value, isSelected, onClick, colSpan }) => {
//   const cellStyle = isSelected
//   ? 'relativa flex flex-col h-16 md:h-32 lg:h-36 w-full border border-[#DDDDDD] bg-[#222222] text-white rounded-xl p-1 md:p-2 cursor-pointer'
//   : 'relativa flex flex-col h-16 md:h-32 lg:h-36 w-full border border-[#DDDDDD] cursor-pointer hover:bg-[#EBEBEB] p-1 md:p-2';

//   return (
//     <div
//       className={cellStyle}
//       onClick={() => onClick(date.format('YYYY-MM-DD'))}
//       style={{ gridColumn: `span ${colSpan || 1}` }}
//     >
      
//       <div className="text-xs text-center py-2 md:text-sm lg:text-base">{date.format('D')}</div>
//       {/* <ReservationOverlay reservations={this.props.reservations} daysArray={days} /> */}
      
//       {/* <div className="text-[10px] md:text-sm lg:text-base mt-auto text-center">R$241</div> */}
//     </div>
//   );
// };

// export default CalendarCell;
// import React, { Component } from 'react';
// import moment from 'moment';

// interface CalendarCellProps {
//   date: moment.Moment;
//   value: string;
//   isSelected: boolean;
//   onClick: (date: string) => void;
//   colSpan?: number; 
// }



// class CalendarCell extends Component<CalendarCellProps> {

//   handleClick = () => {
//     const { date, onClick } = this.props;
//     onClick(date.format('YYYY-MM-DD'));
//   };

//   render() {
//     const { date, isSelected, colSpan } = this.props;

//     const cellStyle = isSelected
//       ? 'relative flex flex-col h-16 md:h-32 lg:h-36 w-full border border-[#DDDDDD] bg-[#222222] text-white rounded-xl p-1 md:p-2 cursor-pointer'
//       : 'relative flex flex-col h-16 md:h-32 lg:h-36 w-full border border-[#DDDDDD] cursor-pointer hover:bg-[#EBEBEB] p-1 md:p-2';

//     return (
//       <div
//         className={cellStyle}
//         onClick={this.handleClick}
//         style={{ gridColumn: `span ${colSpan || 1}` }}
//       >
//         <div className="text-xs text-center py-2 md:text-sm lg:text-base">{date.format('D')}</div>
//         {/* <ReservationOverlay reservations={this.props.reservations} daysArray={days} /> */}
//         {/* <div className="text-[10px] md:text-sm lg:text-base mt-auto text-center">R$241</div> */}
//       </div>
//     );
//   }
// }

// export default CalendarCell;
// import React from 'react';
// import moment from 'moment';

// interface Reservation {
//   name: string;
//   checkin: string;
//   checkout: string;
// }

// interface CalendarCellProps {
//   date: moment.Moment;
//   isSelected: boolean;
//   onClick: (date: string) => void;
//   reservations: Reservation[];
//   colSpan?: number;
// }

// const CalendarCell: React.FC<CalendarCellProps> = ({ date, isSelected, onClick, reservations, colSpan }) => {
//   const cellStyle = isSelected
//     ? 'relative flex flex-col h-16 md:h-32 lg:h-36 w-full border border-[#DDDDDD] bg-[#222222] text-white rounded-xl p-1 md:p-2 cursor-pointer'
//     : 'relative flex flex-col h-16 md:h-32 lg:h-36 w-full border border-[#DDDDDD] cursor-pointer hover:bg-[#EBEBEB] p-1 md:p-2';

//   const dayReservations = reservations.filter(reservation =>
//     moment(reservation.checkin).isSameOrBefore(date, 'day') &&
//     moment(reservation.checkout).isSameOrAfter(date, 'day')
//   );

//   console.log("RESERVAS",dayReservations)

//   const isStartOfReservation = (reservation: Reservation) =>
//     moment(reservation.checkin).isSame(date, 'day');

//   // const getSpanForCurrentCell = (reservation: Reservation) => {
//   //   const dayOfWeek = date.day();
//   //   const daysRemainingInWeek = 7 - dayOfWeek;
//   //   const daysUntilCheckout = moment(reservation.checkout).diff(date, 'days') + 1;

//   //   return Math.min(daysRemainingInWeek, daysUntilCheckout);
//   // };
//   const getSpanForCurrentCell = (reservation: Reservation) => {
//     const checkinDate = moment(reservation.checkin);
//     const checkoutDate = moment(reservation.checkout);
//     const dayOfWeek = date.day();
//     const daysUntilEndOfWeek = 6 - dayOfWeek;

//     // Dias restantes até o checkout, incluindo o próprio dia de checkout
//     const daysUntilCheckout = checkoutDate.diff(date, 'days') + 1;

//     // Se a reserva se estende para a próxima semana
//     if (daysUntilCheckout > daysUntilEndOfWeek + 1) {
//         return daysUntilEndOfWeek + 1; // Preencher até o final da semana
//     } else {
//         return daysUntilCheckout +1; // Preencher apenas o intervalo restante
//     }
// };

  
  

//   return (
//     <div
//       className={cellStyle}
//       onClick={() => onClick(date.format('YYYY-MM-DD'))}
//       style={{ gridColumn: `span ${colSpan || 1}` }}
//     >
//       <div className="text-xs text-center py-2 md:text-sm lg:text-base">{date.format('D')}</div>

//       {/* Renderização das reservas dentro da célula */}
//       <div className="relative flex flex-col space-y-10">
//         {dayReservations.map((reservation, index) => {
//           const span = getSpanForCurrentCell(reservation);
//           console.log("Intervalo de reserva", span)
//           return isStartOfReservation(reservation) ? (
//             <div
//               key={index}
//               className="absolute bg-gray-500 text-white rounded-full px-2 h-5 text-xs flex items-center md:h-8 md:text-base"
//               style={{
//                 gridColumn: `span ${span}`,
//                 fontFamily: 'Airbnb Cereal VF, Circular, -apple-system, BlinkMacSystemFont, Roboto, Helvetica Neue, sans-serif',
//                 left: '0',
//                 // top: '2rem',
//                 zIndex: 1,
//                 width: `calc(100% * ${span})`,
//                 // top: `${index * 60}px`,
//               }}
//             >
//               {reservation.name}
//             </div>
//           ) : null;
//         })}
//       </div>
//     </div>
//   );
// };

// export default CalendarCell;

// import React from 'react';
// import moment from 'moment';

// interface Reservation {
//   name: string;
//   checkin: string;
//   checkout: string;
// }

// interface CalendarCellProps {
//   date: moment.Moment;
//   isSelected: boolean;
//   onClick: (date: string) => void;
//   reservations: Reservation[];
//   colSpan?: number;
// }

// const CalendarCell: React.FC<CalendarCellProps> = ({ date, isSelected, onClick, reservations, colSpan }) => {
//   const cellStyle = isSelected
//     ? 'relative flex flex-col h-16 md:h-32 lg:h-36 w-full border border-[#DDDDDD] bg-[#222222] text-white rounded-xl p-1 md:p-2 cursor-pointer'
//     : 'relative flex flex-col h-16 md:h-32 lg:h-36 w-full border border-[#DDDDDD] cursor-pointer hover:bg-[#EBEBEB] p-1 md:p-2';

//   const dayReservations = reservations.filter(reservation =>
//     moment(reservation.checkin).isSameOrBefore(date, 'day') &&
//     moment(reservation.checkout).isSameOrAfter(date, 'day')
//   );

//   const isStartOfReservation = (reservation: Reservation) =>
//     moment(reservation.checkin).isSame(date, 'day');

//   const getSpanForCurrentCell = (reservation: Reservation) => {
//     const checkoutDate = moment(reservation.checkout);
//     const daysUntilCheckout = checkoutDate.diff(date, 'days') + 1;
//     const daysUntilEndOfWeek = 7 - date.day();

//     return Math.min(daysUntilCheckout, daysUntilEndOfWeek);
//   };

//   return (
//     <div
//       className={cellStyle}
//       onClick={() => onClick(date.format('YYYY-MM-DD'))}
//       style={{ gridColumn: `span ${colSpan || 1}` }}
//     >
//       <div className="text-xs text-center py-2 md:text-sm lg:text-base">{date.format('D')}</div>

//       {/* Renderização das reservas dentro da célula */}
//       <div className="relative flex flex-col space-y-10">
//         {dayReservations.map((reservation, index) => {
//           const span = getSpanForCurrentCell(reservation);

//           return isStartOfReservation(reservation) ? (
//             <div
//               key={index}
//               className="absolute bg-gray-500 text-white rounded-full px-2 h-5 text-xs flex items-center md:h-8 md:text-base"
//               style={{
//                 gridColumn: `span ${span}`,
//                 fontFamily: 'Airbnb Cereal VF, Circular, -apple-system, BlinkMacSystemFont, Roboto, Helvetica Neue, sans-serif',
//                 left: '0',
//                 zIndex: 1,
//                 width: `calc(100% * ${span})`,
//               }}
//             >
//               {reservation.name}
//             </div>
//           ) : null;
//         })}
//       </div>
//     </div>
//   );
// };

// export default CalendarCell;

// import React from 'react';
// import moment from 'moment';

// interface Reservation {
//   name: string;
//   checkin: string;
//   checkout: string;
// }

// interface CalendarCellProps {
//   date: moment.Moment;
//   isSelected: boolean;
//   onClick: (date: string) => void;
//   reservations: Reservation[];
//   colSpan?: number;
// }

// const CalendarCell: React.FC<CalendarCellProps> = ({ date, isSelected, onClick, reservations, colSpan }) => {
//   const cellStyle = isSelected
//     ? 'relative flex flex-col h-16 md:h-32 lg:h-36 w-full border border-[#DDDDDD] bg-[#222222] text-white rounded-xl p-1 md:p-2 cursor-pointer'
//     : 'relative flex flex-col h-16 md:h-32 lg:h-36 w-full border border-[#DDDDDD] cursor-pointer hover:bg-[#EBEBEB] p-1 md:p-2';

//   const dayReservations = reservations.filter(reservation =>
//     moment(reservation.checkin).isSameOrBefore(date, 'day') &&
//     moment(reservation.checkout).isSameOrAfter(date, 'day')
//   );

//   const isStartOfReservation = (reservation: Reservation) =>
//     moment(reservation.checkin).isSame(date, 'day');

//   const getSpanForCurrentCell = (reservation: Reservation) => {
//     const checkoutDate = moment(reservation.checkout);
//     const daysUntilCheckout = checkoutDate.diff(date, 'days') + 1;
//     const daysUntilEndOfWeek = 7 - date.day();

//     return Math.min(daysUntilCheckout, daysUntilEndOfWeek);
//   };

//   return (
//     <div
//       className={cellStyle}
//       onClick={() => onClick(date.format('YYYY-MM-DD'))}
//       style={{ gridColumn: `span ${colSpan || 1}` }}
//     >
//       <div className="text-xs text-center py-2 md:text-sm lg:text-base">{date.format('D')}</div>

//       {/* Renderização das reservas dentro da célula */}
//       <div className="relative flex flex-col space-y-1">
//         {dayReservations.map((reservation, index) => {
//           const span = getSpanForCurrentCell(reservation);
//           const isMultiRow = span > (7 - date.day()); // Verifica se a reserva atravessa a semana

//           return isStartOfReservation(reservation) ? (
//             <>
//               {/* Primeira parte da reserva, até o final da semana */}
//               <div
//                 key={`${index}-start`}
//                 className="absolute bg-gray-500 text-white rounded-full px-2 h-5 text-xs flex items-center md:h-8 md:text-base"
//                 style={{
//                   gridColumn: `span ${Math.min(span, 7 - date.day())}`,
//                   fontFamily: 'Airbnb Cereal VF, Circular, -apple-system, BlinkMacSystemFont, Roboto, Helvetica Neue, sans-serif',
//                   left: '0',
//                   zIndex: 1,
//                   width: `calc(100% * ${Math.min(span, 7 - date.day())})`,
//                 }}
//               >
//                 {reservation.name}
//               </div>

//               {/* Parte da reserva na semana seguinte, se houver */}
//               {isMultiRow && (
//                 <div
//                   key={`${index}-end`}
//                   className="absolute bg-gray-500 text-white rounded-full px-2 h-5 text-xs flex items-center md:h-8 md:text-base"
//                   style={{
//                     gridColumn: `span ${span - (7 - date.day())}`,
//                     fontFamily: 'Airbnb Cereal VF, Circular, -apple-system, BlinkMacSystemFont, Roboto, Helvetica Neue, sans-serif',
//                     left: '0',
//                     zIndex: 1,
//                     width: `calc(100% * ${span - (7 - date.day())})`,
//                     top: '100%', // Move para a linha seguinte
//                   }}
//                 >
//                   {reservation.name}
//                 </div>
//               )}
//             </>
//           ) : null;
//         })}
//       </div>
//     </div>
//   );
// };

// export default CalendarCell;

// import React from 'react';
// import moment from 'moment';

// interface Reservation {
//   name: string;
//   checkin: string;
//   checkout: string;
// }

// interface CalendarCellProps {
//   date: moment.Moment;
//   isSelected: boolean;
//   onClick: (date: string) => void;
//   reservations: Reservation[];
//   colSpan?: number;
// }

// const CalendarCell: React.FC<CalendarCellProps> = ({ date, isSelected, onClick, reservations, colSpan }) => {
//   const cellStyle = isSelected
//     ? 'relative flex flex-col h-16 md:h-32 lg:h-36 w-full border border-[#DDDDDD] bg-[#222222] text-white rounded-xl p-1 md:p-2 cursor-pointer'
//     : 'relative flex flex-col h-16 md:h-32 lg:h-36 w-full border border-[#DDDDDD] cursor-pointer hover:bg-[#EBEBEB] p-1 md:p-2';

//   const dayReservations = reservations.filter(reservation =>
//     moment(reservation.checkin).isSameOrBefore(date, 'day') &&
//     moment(reservation.checkout).isSameOrAfter(date, 'day')
//   );

//   const isStartOfReservation = (reservation: Reservation) =>
//     moment(reservation.checkin).isSame(date, 'day');

//   const getSpanForCurrentCell = (reservation: Reservation) => {
//     const dayOfWeek = date.day(); // Dia da semana da célula atual
//     const daysUntilEndOfWeek = 6 - dayOfWeek; // Quantos dias faltam até o final da semana (sábado)
    
//     // Dias restantes até o checkout, incluindo o próprio dia de checkout
//     const daysUntilCheckout = moment(reservation.checkout).diff(date, 'days') + 1;
  
//     // Retornar o menor valor entre os dias até o final da semana e os dias até o checkout
//     return Math.min(daysUntilEndOfWeek + 1, daysUntilCheckout);
//   };

//   return (
//     <div
//       className={cellStyle}
//       onClick={() => onClick(date.format('YYYY-MM-DD'))}
//       style={{ gridColumn: `span ${colSpan || 1}` }}
//     >
//       <div className="text-xs text-center py-2 md:text-sm lg:text-base">{date.format('D')}</div>

//       {/* Renderização das reservas dentro da célula */}
//       <div className="relative flex flex-col space-y-1">
//         {dayReservations.map((reservation, index) => {
//           const span = getSpanForCurrentCell(reservation);
//           const isMultiRow = span < moment(reservation.checkout).diff(moment(date), 'days') + 1; 

//           return isStartOfReservation(reservation) || isMultiRow ? (
//             <div
//               key={index}
//               className="absolute bg-gray-500 text-white rounded-full px-2 h-5 text-xs flex items-center md:h-8 md:text-base"
//               style={{
//                 gridColumn: `span ${span}`,
//                 fontFamily: 'Airbnb Cereal VF, Circular, -apple-system, BlinkMacSystemFont, Roboto, Helvetica Neue, sans-serif',
//                 left: '0',
//                 zIndex: 1,
//                 width: `calc(100% * ${span})`,
//                 top: isStartOfReservation(reservation) ? '0' : '100%', // Mover para a linha seguinte se não for o início
//               }}
//             >
//               {isStartOfReservation(reservation) && reservation.name}
//             </div>
//           ) : null;
//         })}
//       </div>
//     </div>
//   );
// };

// export default CalendarCell;



// import React from 'react';
// import moment from 'moment';

// interface Reservation {
//   name: string;
//   checkin: string;
//   checkout: string;
// }

// interface CalendarCellProps {
//   date: moment.Moment;
//   isSelected: boolean;
//   onClick: (date: string) => void;
//   reservations: Reservation[];
//   colSpan?: number;
// }

// const CalendarCell: React.FC<CalendarCellProps> = ({ date, isSelected, onClick, reservations, colSpan }) => {
//   const cellStyle = isSelected
//     ? 'relative flex flex-col h-16 md:h-32 lg:h-36 w-full border border-[#DDDDDD] bg-[#222222] text-white rounded-xl p-1 md:p-2 cursor-pointer'
//     : 'relative flex flex-col h-16 md:h-32 lg:h-36 w-full border border-[#DDDDDD] cursor-pointer hover:bg-[#EBEBEB] p-1 md:p-2';

//   const dayReservations = reservations.filter(reservation =>
//     moment(reservation.checkin).isSameOrBefore(date, 'day') &&
//     moment(reservation.checkout).isSameOrAfter(date, 'day')
//   );

//   console.log("RESERVAS",dayReservations)


//   const isStartOfReservation = (reservation: Reservation) =>
//     moment(reservation.checkin).isSame(date, 'day');



//   const getSpanForCurrentCell = (reservation: Reservation) => {
//     const checkinDate = moment(reservation.checkin);
//     const checkoutDate = moment(reservation.checkout);
    
//     // Verifica se a reserva se estende para a próxima semana
//     const dayOfWeek = date.day(); // Dia da semana da célula atual (0 = domingo, 6 = sábado)
//     const daysRemainingInWeek = 6 - dayOfWeek; // Dias restantes até o final da semana (sábado)
//     const daysUntilCheckout = checkoutDate.diff(date, 'days') + 1; // Dias restantes até o checkout, incluindo o checkout
  
//     if (daysUntilCheckout > daysRemainingInWeek + 1) {
//       // Se a reserva atravessa a semana, preencher até o final da semana
//       return daysRemainingInWeek + 1;
//     } else {
//       // Se a reserva termina dentro da mesma semana
//       return daysUntilCheckout;
//     }
//   };

//   return (
//     <div
//       className={cellStyle}
//       onClick={() => onClick(date.format('YYYY-MM-DD'))}
//       style={{ gridColumn: `span ${colSpan || 1}` }}
//     >
//       <div className="text-xs text-center py-2 md:text-sm lg:text-base">{date.format('D')}</div>

//       {/* Renderização das reservas dentro da célula */}
//       <div className="relative flex flex-col space-y-10">
//         {dayReservations.map((reservation, index) => {
//           const span = getSpanForCurrentCell(reservation);
//           console.log("Início das reservas", isStartOfReservation(reservation))

//           return isStartOfReservation(reservation) ? (
//             <div
//               key={index}
//               className="absolute bg-gray-500 text-white rounded-full px-2 h-5 text-xs flex items-center md:h-8 md:text-base"
//               style={{
//                 gridColumn: `span ${span}`,
//                 fontFamily: 'Airbnb Cereal VF, Circular, -apple-system, BlinkMacSystemFont, Roboto, Helvetica Neue, sans-serif',
//                 left: '0',
//                 zIndex: 1,
//                 width: `calc(100% * ${span})`,
//               }}
//             >
//               {reservation.name}
//             </div>
//           ) : null;
//         })}
//       </div>
//     </div>
//   );
// };

// export default CalendarCell;


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
    ? 'relative flex flex-col h-16 md:h-32 lg:h-36 w-full border border-[#DDDDDD] bg-[#222222] text-white rounded-xl p-1 md:p-2 cursor-pointer'
    : 'relative flex flex-col h-16 md:h-32 lg:h-36 w-full border border-[#DDDDDD] cursor-pointer hover:bg-[#EBEBEB] p-1 md:p-2';

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
          const isEndOfWeek = date.day() === 6; // Verifica se é o final da semana
          const isFirstOfWeek = date.day() === 0; // Verifica se é domingo

          console.log(isEndOfWeek)
          return isStartOfReservation(reservation) || isContinuationOfReservation(reservation) ? (
            <div
              key={index}
              className="absolute bg-gray-500 text-white rounded-full px-1 sm:px-2 h-3 text-[8px] flex items-center md:h-8 md:text-base truncate tracking-tighter font-semibold"
              style={{
                gridColumn: `span ${span}`,
                fontFamily: 'Airbnb Cereal VF, Circular, -apple-system, BlinkMacSystemFont, Roboto, Helvetica Neue, sans-serif',
                left: isFirstOfWeek ? '-10px' : '0',
                borderTopLeftRadius: isFirstOfWeek ? "0px" : "",
                borderBottomLeftRadius: isFirstOfWeek ? "0px" : "",
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


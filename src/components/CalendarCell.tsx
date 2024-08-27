import React from 'react';
import moment from 'moment';

interface CalendarCellProps {
  date: moment.Moment;
  value: string;
  isSelected: boolean;
  onClick: (date: string) => void;
  colSpan?: number; 
}


const CalendarCell: React.FC<CalendarCellProps> = ({ date, value, isSelected, onClick, colSpan }) => {
  const cellStyle = isSelected
  ? 'relativa flex flex-col h-16 md:h-32 lg:h-36 w-full border border-[#DDDDDD] bg-[#222222] text-white rounded-xl p-1 md:p-2 cursor-pointer'
  : 'relativa flex flex-col h-16 md:h-32 lg:h-36 w-full border border-[#DDDDDD] cursor-pointer hover:bg-[#EBEBEB] p-1 md:p-2';

  return (
    <div
      className={cellStyle}
      onClick={() => onClick(date.format('YYYY-MM-DD'))}
      style={{ gridColumn: `span ${colSpan || 1}` }}
    >
      
      <div className="text-xs text-center py-2 md:text-sm lg:text-base">{date.format('D')}</div>
      {/* <ReservationOverlay reservations={this.props.reservations} daysArray={days} /> */}
      
      {/* <div className="text-[10px] md:text-sm lg:text-base mt-auto text-center">R$241</div> */}
    </div>
  );
};

export default CalendarCell;

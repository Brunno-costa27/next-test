// "use client";

// import React from "react";
// import moment, { Moment } from "moment";
// import CalendarCell from "./CalendarCell";
// import { Virtuoso } from "react-virtuoso";
// // import ReservationOverlay from "./ReservationOverlay";

// interface Reservation {
//   name: string;
//   checkin: string;
//   checkout: string;
// }

// interface MonthData {
//   monthYear: string;
//   days: (Moment | null)[];
// }

// interface CalendarProps {
//   reservations: Reservation[];
// }

// interface CalendarState {
//   monthsArray: MonthData[];
//   selectedDate: string | null;
//   currentMonthYear: string;
//   currentMonthIndex: number;
// }

// class Calendar extends React.Component<CalendarProps, CalendarState> {
//   constructor(props: CalendarProps) {
//     super(props);

//     const startDay = moment("2022-01-01").startOf("month");
//     const endDay = moment("2026-12-31").endOf("month");
//     const today = moment();

//     const monthsArray: MonthData[] = [];
//     let day = startDay.clone();
//     let currentMonthIndex = 0;

//     while (day.isBefore(endDay, "day") || day.isSame(endDay, "day")) {
//       const monthYear = day.format("MMMM [de] YYYY");
//       const days: (Moment | null)[] = [];

//       let dayOffset = day.startOf("month").day();
//       for (let i = 0; i < dayOffset; i++) {
//         days.push(null); // Dias em branco
//       }

//       while (day.format("MMMM [de] YYYY") === monthYear) {
//         if (day.isSame(today, "month")) {
//           currentMonthIndex = monthsArray.length; // Identifica o índice do mês atual
//         }
//         days.push(day.clone());
//         day.add(1, "day");
//       }

//       monthsArray.push({ monthYear, days });
//     }

//     this.state = {
//       monthsArray,
//       selectedDate: today.format("YYYY-MM-DD"), // Seleciona a data atual
//       currentMonthYear: monthsArray.length > 0 ? monthsArray[currentMonthIndex].monthYear : "",
//       currentMonthIndex,
//     };
//   }

//   handleCellClick = (date: string) => {
//     this.setState({ selectedDate: date });
//   };

//   renderMonth = (index: number) => {
//     const { monthsArray } = this.state;

//     if (!Array.isArray(monthsArray) || index < 0 || index >= monthsArray.length) {
//       return null;
//     }

//     const { monthYear, days } = monthsArray[index];

//     return (
//       <div key={monthYear} className="relative">
//         <div
//           key={monthYear}
//           className="col-span-7 py-6 px-4 text-lg md:text-lg lg:text-2xl font-medium sticky top-0 z-20 h-16 lg:h-28"
//           style={{ backgroundColor: "white" }}
//         >
//           {monthYear}
//         </div>
//         <div className="relative grid grid-cols-7 gap-0 md:gap-0">
//           {days.map((day, dayIndex) => {
//             if (!day) {
//               return <div key={`blank-${dayIndex}`} className="h-16 sm:h-24 bg-white"/>;
//             }

//             const date = day.format("YYYY-MM-DD");
//             const reservation = this.props.reservations.find(
//               (r) =>
//                 moment(date).isSameOrAfter(moment(r.checkin)) &&
//                 moment(date).isSameOrBefore(moment(r.checkout))
//             );
//             const value = reservation ? reservation.name : "";
//             const isSelected = date === this.state.selectedDate;
//             return (
//              <div key={date} className="flex justify-center items-center">
//               <CalendarCell
//               key={date}
//               date={day}
//               // value={value}
//               isSelected={isSelected}
//               onClick={this.handleCellClick}
//               reservations={this.props.reservations}
//               />
              
//             {/* <ReservationOverlay reservations={this.props.reservations} daysArray={days} /> */}

            
//              </div>
//             );
//           })}
//         </div>
//       </div>
//     );
//   };


//   render() {
//     return (
//       <div className="relative w-full h-full bg-white">
//         <div className="fixed top-14 z-30 w-[90%] md:w-full bg-white">
//           <div className="grid grid-cols-7 border-b border-gray-300 gap-0 px-4">
//             <div className="text-left text-[10px] sm:text-sm text-gray-600 mt-0 mb-0">Dom</div>
//             <div className="text-left text-[10px] sm:text-sm text-gray-600 mt-0 mb-0">Seg</div>
//             <div className="text-left text-[10px] sm:text-sm text-gray-600 mt-0 mb-0">Ter</div>
//             <div className="text-left text-[10px] sm:text-sm text-gray-600 mt-0 mb-0">Qua</div>
//             <div className="text-left md:text-left text-[10px] sm:text-sm text-gray-600 mt-0 mb-0">Qui</div>
//             <div className="text-left md:text-left text-[10px] sm:text-sm text-gray-600 mt-0 mb-0">Sex</div>
//             <div className="text-left md:text-left text-[10px] sm:text-sm text-gray-600 mt-0 mb-0">Sáb</div>
//           </div>
//         </div>
//         <Virtuoso
//           totalCount={this.state.monthsArray.length}
//           initialTopMostItemIndex={this.state.currentMonthIndex}
//           itemContent={(index) => this.renderMonth(index)}
//           style={{ height: "100vh" }}
//           // increaseViewportBy={{ top: 4000, bottom: 4000 }}
//           // overscan={50} 
//         />
//       </div>
//     );
//   }
// }

// export default Calendar;
"use client";

import React from "react";
import moment, { Moment } from "moment";
import CalendarCell from "./CalendarCell";
import { Virtuoso } from "react-virtuoso";

interface Reservation {
  name: string;
  checkin: string;
  checkout: string;
}

interface MonthData {
  monthYear: string;
  days: (Moment | null)[];
}

interface CalendarProps {
  reservations: Reservation[];
}

interface CalendarState {
  monthsArray: MonthData[];
  selectedDate: string | null;
  currentMonthYear: string;
  currentMonthIndex: number;
  selecting: boolean;  // Para saber se estamos arrastando o mouse para selecionar
  selectedDates: string[]; // Para armazenar as datas selecionadas
}

class Calendar extends React.Component<CalendarProps, CalendarState> {
  constructor(props: CalendarProps) {
    super(props);

    const startDay = moment("2022-01-01").startOf("month");
    const endDay = moment("2026-12-31").endOf("month");
    const today = moment();

    const monthsArray: MonthData[] = [];
    let day = startDay.clone();
    let currentMonthIndex = 0;

    while (day.isBefore(endDay, "day") || day.isSame(endDay, "day")) {
      const monthYear = day.format("MMMM [de] YYYY");
      const days: (Moment | null)[] = [];

      let dayOffset = day.startOf("month").day();
      for (let i = 0; i < dayOffset; i++) {
        days.push(null); // Dias em branco
      }

      while (day.format("MMMM [de] YYYY") === monthYear) {
        if (day.isSame(today, "month")) {
          currentMonthIndex = monthsArray.length; // Identifica o índice do mês atual
        }
        days.push(day.clone());
        day.add(1, "day");
      }

      monthsArray.push({ monthYear, days });
    }

    this.state = {
      monthsArray,
      selectedDate: today.format("YYYY-MM-DD"), // Seleciona a data atual
      currentMonthYear: monthsArray.length > 0 ? monthsArray[currentMonthIndex].monthYear : "",
      currentMonthIndex,
      selecting: false,
      selectedDates: [],
    };
  }

  handleCellClick = (date: string) => {
        this.setState({ selectedDate: date });
      };

  

  handleMouseDown = (date: string) => {
    this.setState({
      selecting: true,
      selectedDates: [date],
    });
  };

  handleMouseEnter = (date: string) => {
    if (this.state.selecting) {
      this.setState(prevState => ({
        selectedDates: [...new Set([...prevState.selectedDates, date])],
      }));
    }
  };

  handleMouseUp = () => {
    this.setState({
      selecting: false,
    });
  };

  renderMonth = (index: number) => {
    const { monthsArray, selectedDates } = this.state;

    if (!Array.isArray(monthsArray) || index < 0 || index >= monthsArray.length) {
      return null;
    }

    const { monthYear, days } = monthsArray[index];

    return (
      <div key={monthYear} className="relative" onMouseUp={this.handleMouseUp}>
        <div
          key={monthYear}
          className="col-span-7 py-6 px-4 text-lg md:text-lg lg:text-2xl font-medium sticky top-0 z-20 h-16 lg:h-28"
          style={{ backgroundColor: "white" }}
        >
          {monthYear}
        </div>
        <div className="relative grid grid-cols-7 gap-0 md:gap-0">
          {days.map((day, dayIndex) => {
            if (!day) {
              return <div key={`blank-${dayIndex}`} className="h-16 sm:h-24 bg-white" />;
            }

            const date = day.format("YYYY-MM-DD");
            // const isSelected = selectedDates.includes(date);
            const isSelected = selectedDates.includes(date) || date === this.state.selectedDate;

            return (
              <div
                key={date}
                className="flex justify-center items-center"
                onMouseDown={() => this.handleMouseDown(date)}
                onMouseEnter={() => this.handleMouseEnter(date)}
              >
                <CalendarCell
                  date={day}
                  isSelected={isSelected}
                  onClick={this.handleCellClick}
                  reservations={this.props.reservations}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  render() {
    return (
      <div className="relative w-full h-full bg-white">
        <div className="fixed top-14 z-30 w-[90%] md:w-full bg-white">
          <div className="grid grid-cols-7 border-b border-gray-300 gap-0 px-4">
            <div className="text-left text-[10px] sm:text-sm text-gray-600 mt-0 mb-0">Dom</div>
            <div className="text-left text-[10px] sm:text-sm text-gray-600 mt-0 mb-0">Seg</div>
            <div className="text-left text-[10px] sm:text-sm text-gray-600 mt-0 mb-0">Ter</div>
            <div className="text-left text-[10px] sm:text-sm text-gray-600 mt-0 mb-0">Qua</div>
            <div className="text-left md:text-left text-[10px] sm:text-sm text-gray-600 mt-0 mb-0">Qui</div>
            <div className="text-left md:text-left text-[10px] sm:text-sm text-gray-600 mt-0 mb-0">Sex</div>
            <div className="text-left md:text-left text-[10px] sm:text-sm text-gray-600 mt-0 mb-0">Sáb</div>
          </div>
        </div>
        <Virtuoso
          totalCount={this.state.monthsArray.length}
          initialTopMostItemIndex={this.state.currentMonthIndex}
          itemContent={(index) => this.renderMonth(index)}
          style={{ height: "100vh" }}
        />
      </div>
    );
  }
}

export default Calendar;

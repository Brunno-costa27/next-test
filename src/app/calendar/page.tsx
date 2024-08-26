import React from 'react';
import Calendar from '../../components/Calendar';

const App: React.FC = () => {
  // Dados simulados para adicionar dentro das células
  const reservations = [
    { name: 'João', checkin: '2024-08-02', checkout: '2024-08-05' },
    { name: 'Maria', checkin: '2024-08-07', checkout: '2024-08-10' },
    { name: 'Carlos', checkin: '2024-08-12', checkout: '2024-08-15' },
    { name: 'Ana', checkin: '2024-08-17', checkout: '2024-08-19' },
    { name: 'Pedro', checkin: '2024-08-22', checkout: '2024-08-26' },
    { name: 'Lucas', checkin: '2024-08-28', checkout: '2024-08-30' },
    { name: 'Fernanda', checkin: '2024-09-02', checkout: '2024-09-05' },
    { name: 'Bruna', checkin: '2024-09-07', checkout: '2024-09-10' },
    { name: 'Felipe', checkin: '2024-09-12', checkout: '2024-09-15' },
    { name: 'Rafael', checkin: '2024-09-17', checkout: '2024-09-20' },
    { name: 'Julia', checkin: '2024-09-22', checkout: '2024-09-25' },
    { name: 'Mariana', checkin: '2024-09-27', checkout: '2024-09-30' },
    { name: 'Gustavo', checkin: '2024-10-02', checkout: '2024-10-05' },
    { name: 'Isabela', checkin: '2024-10-07', checkout: '2024-10-10' },
    { name: 'Rodrigo', checkin: '2024-10-12', checkout: '2024-10-15' },
    { name: 'Paula', checkin: '2024-10-17', checkout: '2024-10-20' },
    { name: 'Thiago', checkin: '2024-10-22', checkout: '2024-10-25' },
    { name: 'Sofia', checkin: '2026-10-27', checkout: '2026-10-30' },
    { name: 'tutu', checkin: '2026-11-27', checkout: '2026-11-30' },

];


  return (
    <div className='w-full h-full bg-[FFFFFF]'>
      <Calendar reservations={reservations} />
    </div>
  );
};

export default App;

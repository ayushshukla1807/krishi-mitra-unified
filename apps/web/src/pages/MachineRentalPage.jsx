import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Header from '../components/Header';
import MachineCard from '../components/MachineCard';
import { machines } from '../Data/machineData';
import './MachineRentalPage.css';
const MachineRentalPage = () => {
  const { t } = useTranslation(); const [view, setView] = useState('rentals');
  return ( <div> <Header /> <h2 className="page-title">{t('machine_rental_title')}</h2> <div className="toggle-bar"> <button onClick={() => setView('rentals')} className={view === 'rentals' ? 'active' : ''}>{t('view_rentals')}</button> <button onClick={() => setView('add')} className={view === 'add' ? 'active' : ''}>{t('add_your_machine')}</button> </div> {view === 'rentals' ? ( <div className="machine-list"> {machines.map(machine => <MachineCard key={machine.id} machine={machine} />)} </div> ) : ( <div className="add-form-container"> <p>Here, you would have a form for users to add their own machine for rental. (UI component to be built)</p> </div> )} </div> );
};
export default MachineRentalPage;
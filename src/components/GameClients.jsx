import { useEffect, useState } from 'react';
import moment from 'moment-timezone'; // Importa moment-timezone
import './src/GameClients.css';

export function GameClients({ auction }) {
    const [bets, setBets] = useState([]);

    useEffect(() => {
        if (!auction) return;

        if(auction.Bets===undefined) return;
        const formattedBets = auction.Bets.map(bet => ({
            ...bet,
            // Asume que 'bet.timebet' es la fecha en formato UTC
            // Convierte a la zona horaria de Perú y formatea
            timebet: moment(bet.timebet).tz('America/Lima').format('HH:mm:ss')
        }));
        setBets(formattedBets)

    }, [auction]);

    if (bets.length === 0) {
        return <div>No hay apuestas para esta subasta.</div>;
    }

    return (
        <table className='gc-table'>
            <thead>
                <tr>
                    <th>Precio</th>
                    <th>Modality</th>
                    <th>Hora</th>
                    <th>Usuario</th>
                </tr>
            </thead>
            <tbody>
                {bets.map((bet, index) => (
                    <tr key={index}>
                        <td>{bet.amount}$</td>
                        <td>{bet.modality === 1 ? 'Manual' : 'Automatic'}</td>
                        <td>{bet.timebet}</td>
                        <td>{bet.userclient}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

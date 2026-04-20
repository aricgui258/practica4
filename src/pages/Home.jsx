import {useEffect, useState} from 'react';
import PlayerCard from '../components/PlayerCard';
import SearchBar from '../components/SearchBar';
import Filter from "../components/Filter";

const API_URL = "https://www.padelfip.com/es/wp-json/fip/v1/rankings/?category=4fa3a8c3-c5fb-457a-a793-c0c3b5cfbc79&circuit=6ea3dc15-1c19-42ad-99b7-bab78d9fb871&category_name=Master&gender=male";

function Home() {
    const [players, setPlayers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState("");

    useEffect(() => {
        fetch(API_URL)
            .then(res => res.json())
            .then(data => {
                console.log('Data fetched:', data);
                setPlayers(data);
            })
            .catch(err => console.error('Fetch error:', err));
    }, []);

    const jugadorFiltrado = players.filter(p => `${p.name} ${p.surname}`.toLowerCase().includes(searchTerm.toLowerCase()));

    const jugadoresResultantes = jugadorFiltrado.filter(p => {
        if (filter === "top10") return p.rank <= 10;
        if (filter === "top25") return p.rank <= 25;
        if (filter === "top50") return p.rank <= 50;
        return true;
    });

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Ranking de Pádel</h1>

            <div className="flex gap-4 mb-6">
                <SearchBar search={searchTerm} setSearch={setSearchTerm} />
                <Filter setFilter={setFilter} />
            </div>

            <div className="grid md:grid-cols-3 gap-4">
                {jugadoresResultantes.map(player => (
                    <PlayerCard key={player.player_id} player={player} />
                ))}
            </div>
        </div>
    );
}

export default Home;
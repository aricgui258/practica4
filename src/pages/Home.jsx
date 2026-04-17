import {useEffect, useState} from 'react';
import PlayerCard from '../components/PlayerCard';
import Searchbar from '../components/SearchBar';
import Filter from "../components/Filter";

const API_URL = "https://www.padelfip.com/es/wp-json/fip/v1/rankings/?category=4fa3a8c3-c5fb-457a-a793-c0c3b5cfbc79&circuit=6ea3dc15-1c19-42ad-99b7-bab78d9fb871&category_name=Master&gender=male";

function Home() {
    const [players, setPlayers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredPlayers, setFilteredPlayers] = useState([]);

    useEffect(() => {
        fetch(API_URL)
            .then(res => res.json())
            .then(data => setPlayers(data))
            .catch(err => console.error(err));
    }, []);

    const jugadorFiltrado = players.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));

    const jugadoresResultantes = jugadorFiltrado.filter(p => {
        if (filter === "top10") return p.position <= 10;
        if (filter === "top25") return p.position <= 25;
        if (filter === "top50") return p.position <= 50;
        return true;
    });

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Ranking de Pádel</h1>

            <div className="flex gap-4 mb-6">
                <SearchBar search={search} setSearch={setSearch} />
                <Filter setFilter={setFilter} />
            </div>



        </div>
    );
}
import {useEffect, useState} from 'react';
import PlayerCard from '../components/PlayerCard';
import SearchBar from '../components/SearchBar';
import Filter from "../components/Filter";

// URL de la API para obtener el ranking de pádel
const API_URL = "https://www.padelfip.com/es/wp-json/fip/v1/rankings/?category=4fa3a8c3-c5fb-457a-a793-c0c3b5cfbc79&circuit=6ea3dc15-1c19-42ad-99b7-bab78d9fb871&category_name=Master&gender=male";

function Home() {
    const [players, setPlayers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filter, setFilter] = useState("");
    const [countryFilter, setCountryFilter] = useState("");
    const [page, setPage] = useState(1);
    const itemsPerPage = 60;

    // Obtener lista única de países
    const countries = [...new Set(players.map(p => p.country_name))].sort();

    useEffect(() => {
        fetch(API_URL)
            .then(res => res.json())
            .then(data => {
                console.log('Data fetched:', data);
                setPlayers(data);
            })
            .catch(err => console.error('Fetch error:', err));
    }, []);

    // Filtrar jugadores que coincidan con el término de búsqueda
    const jugadorFiltrado = players.filter(p => `${p.name} ${p.surname}`.toLowerCase().includes(searchTerm.toLowerCase()));

    //Aplica un filtro aparte por ranking y país
    const jugadoresResultantes = jugadorFiltrado.filter(p => {
        if (filter === "top10" && p.rank > 10) return false;
        if (filter === "top25" && p.rank > 25) return false;
        if (filter === "top50" && p.rank > 50) return false;
        if (countryFilter && p.country_name !== countryFilter) return false;
        return true;
    });

    const totalPages = Math.ceil(jugadoresResultantes.length / itemsPerPage);
    const start = (page - 1) * itemsPerPage;
    const jugadoresPaginados = jugadoresResultantes.slice(start, start + itemsPerPage);

    useEffect(() => {
        setPage(1);
    }, [searchTerm, filter, countryFilter]);

    return (
        <div className="min-h-screen bg-blue-50">
            <header className="bg-blue-200 py-6 mb-8">
                <h1 className="text-4xl font-bold text-center mb-4">Ranking de Pádel</h1>
                <div className="flex justify-center gap-4 px-6">
                    <SearchBar search={searchTerm} setSearch={setSearchTerm} />
                    <Filter setFilter={setFilter} />
                    <select 
                        value={countryFilter} 
                        onChange={(e) => setCountryFilter(e.target.value)}
                        className="border p-2 rounded bg-white"
                    >
                        <option value="">Todos los países</option>
                        {countries.map(country => (
                            <option key={country} value={country}>{country}</option>
                        ))}
                    </select>
                </div>
            </header>

            <div className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {jugadoresPaginados.map(player => (
                        <PlayerCard key={player.player_id} player={player} />
                    ))}
                </div>

                {totalPages > 1 && (
                    <div className="flex justify-center gap-2">
                        <button onClick={() => setPage(1)} disabled={page === 1} className="px-3 py-2 rounded bg-gray-300 hover:bg-gray-400 disabled:opacity-50">«</button>
                        {Array.from({length: Math.min(5, totalPages)}, (_, i) => {
                            const start = Math.max(1, Math.min(page - 2, totalPages - 4));
                            return start + i;
                        }).map(p => (
                            <button
                                key={p}
                                onClick={() => setPage(p)}
                                className={`px-3 py-2 rounded ${p === page ? 'bg-blue-600 text-white' : 'bg-gray-300 hover:bg-gray-400'}`}
                            >
                                {p}
                            </button>
                        ))}
                        <button onClick={() => setPage(totalPages)} disabled={page === totalPages} className="px-3 py-2 rounded bg-gray-300 hover:bg-gray-400 disabled:opacity-50">»</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Home;
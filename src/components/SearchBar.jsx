// Componente para la barra de búsqueda de jugadores

function SearchBar({search, setSearch}) {
    return (
        <input type="text"
            placeholder="Buscar jugador..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border p-2 rounded v-full"
        />     
    );
}

export default SearchBar;
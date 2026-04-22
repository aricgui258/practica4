//Componente para filtrar jugadores por ranking

function Filter({setFilter}) {
    return(
        <select onChange={(e) => setFilter(e.target.value)} 
        className="border p-2 rounded">
            <option value="">Todos</option>
            <option value="top10">Top 10</option>
            <option value="top25">Top 25</option>
            <option value="top50">Top 50</option>
        </select>
    );
}

export default Filter;
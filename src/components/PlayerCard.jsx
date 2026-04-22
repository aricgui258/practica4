// Componente para mostrar la información del jugador en una tarjeta

function PlayerCard({player}) {
  return (
    <div className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition flex h-40">
      {/* Foto a la izquierda */}
      <div className="w-32 flex-shrink-0 bg-gray-300">
        {player.thumbnail ? (
          <img src={player.thumbnail} alt={player.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-500 text-3xl">
            👤
          </div>
        )}
      </div>

      {/* Info a la derecha */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-bold text-lg">#{player.rank}</h3>
          <p className="font-semibold">{player.name} {player.surname}</p>
          <p className="text-sm text-gray-600">{player.points} pts</p>
        </div>
        {player.country_flag && (
          <div className="flex items-center gap-2">
            <img src={player.country_flag} alt={player.country_name} className="w-5 h-4 object-cover" />
            <span className="text-sm font-semibold">{player.country_name}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default PlayerCard;
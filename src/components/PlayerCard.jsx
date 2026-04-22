// Componente para mostrar la información del jugador en una tarjeta

function PlayerCard({player}) {
  return (
    <div className="bg-white shadow-md rounded-xl p-4 hover:scale-105 transition">
      <h3 className="font-bold text-lg">
        #{player.rank} - {player.name} {player.surname}
      </h3>
      <p className="text-gray-600">Puntos: {player.points}</p>
    </div>
  );
}

export default PlayerCard;
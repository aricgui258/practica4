function PlayerCard({ player }) {
  return (
    <div className="bg-white shadow-md rounded-xl p-4 hover:scale-105 transition">
      <h3 className="font-bold text-lg">
        #{player.position} - {player.player_name}
      </h3>
      <p className="text-gray-600">Puntos: {player.points}</p>
    </div>
  );
}

export default PlayerCard;
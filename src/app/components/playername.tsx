async function getPlayer() {
  const res = await import('../api/player/route')
  const playerData = await (await res.GET()).json() 
  return playerData.foundPlayer.username;
}

const PlayerName = async () => {
  let name = await getPlayer();

  return (
    <a><b>{name}</b></a>
  )
}
export default PlayerName;
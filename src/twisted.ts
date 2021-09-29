import { LolApi, Constants } from "twisted";
import { MatchV5DTOs } from "twisted/dist/models-dto/matches/match-v5";

const api = new LolApi({});

export async function twistedMain() {
  const summonerName = "2000y";
  const { puuid } = await (
    await api.Summoner.getByName(summonerName, Constants.Regions.JAPAN)
  ).response;
  const matcheIds = (
    await api.MatchV5.list(puuid, Constants.RegionGroups.ASIA, {
      queue: 420,
      count: 10,
    })
  ).response;
  function isWinPuuid(puuid: string, match: MatchV5DTOs.MatchDto) {
    const playerOfPuuid = match.info.participants.find(
      (participant) => participant.puuid === puuid
    );
    if (playerOfPuuid === undefined) return false;
    const teamIdOfPuuid = playerOfPuuid.teamId;
    const winnedTeam = match.info.teams.find((a) => a.win);
    if (winnedTeam === undefined) return false;
    const winnedTeamId = winnedTeam.teamId;
    console.log({
      teamId: teamIdOfPuuid,
      winId: winnedTeamId,
      win: teamIdOfPuuid === winnedTeamId,
      character: playerOfPuuid.championName,
    });
    return teamIdOfPuuid === winnedTeamId;
  }

  const matches = (
    await Promise.all(
      matcheIds.map((id) => api.MatchV5.get(id, Constants.RegionGroups.ASIA))
    )
  ).map((res) => {
    return res.response;
  });
  const matchLength = matches.length;
  return (
    matches.map((match) => isWinPuuid(puuid, match)).filter((x) => x).length /
    matchLength
  );
}

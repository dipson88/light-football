enum HttpStatuses { Status401 = 401, Status403 = 403, Status404 = 404, Status500 = 500 }
enum Locales { EN = 'en', RU = 'ru' }
enum MatchSatuses { IN_PLAY = 'IN_PLAY', PAUSED = 'PAUSED', FINISHED = 'FINISHED', SCHEDULED = 'SCHEDULED' }
enum MatchSatusFilterTypes { ALL = 1, CURRENT = 2, UPCOMING = 3, FINISHED = 4 }

enum MatchTotalTypes { Less, More }
enum MatchTotalValueTypes { HalfAndZero, HalfAndOne, HalfAndTwo }
enum MatchResultTypes { Draw, WinP1, WinP2 }

export default {
  HttpStatuses,
  Locales,
  MatchSatuses,
  MatchSatusFilterTypes,
  MatchTotalTypes,
  MatchTotalValueTypes,
  MatchResultTypes
}

export {
  HttpStatuses,
  Locales,
  MatchSatuses,
  MatchSatusFilterTypes,
  MatchTotalTypes,
  MatchTotalValueTypes,
  MatchResultTypes
}

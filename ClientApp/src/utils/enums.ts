enum HttpStatuses { Status401 = 401, Status404 = 404, Status500 = 500 }
enum Locales { EN = 'en', RU = 'ru' }
enum MatchSatuses { IN_PLAY = 'IN_PLAY', PAUSED = 'PAUSED', FINISHED = 'FINISHED', SCHEDULED = 'SCHEDULED' }
enum MatchSatusFilterTypes { CURRENT = 1, UPCOMING = 2, FINISHED = 3 }

export default {
  HttpStatuses,
  Locales,
  MatchSatuses,
  MatchSatusFilterTypes
}

export {
  HttpStatuses,
  Locales,
  MatchSatuses,
  MatchSatusFilterTypes
}

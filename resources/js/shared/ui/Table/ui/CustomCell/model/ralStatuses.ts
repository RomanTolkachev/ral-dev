export type TStatus = 
  | 'действует'
  | 'прекращен' 
  | 'продлен'
  | 'приостановлен'
  | 'частично приостановлен'
  | 'архивный'
  | 'недействителен'
  | '';

export type TNPStatus = 'да' | 'нет' | '';

export type NormalizedStatus = TStatus | 'default';
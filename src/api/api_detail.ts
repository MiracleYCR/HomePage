import { http } from '../utils/http'
import { IResultOr as IResult, IRoomDetailParams } from './type'

export function fetchRoomDetail (params: IRoomDetailParams): Promise<IResult> {
  return http.httpRequestGet(
    'http://110.42.184.111/api/room/room/getRoomDetail',
    params
  )
}

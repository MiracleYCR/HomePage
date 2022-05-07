import { http } from '../utils/http'
import { IResultOr as IResult, IRoomListParams } from './type'

export function fetchRoomList (params: IRoomListParams): Promise<IResult> {
  return http.httpRequestGet(
    'http://110.42.184.111/api/room/room/getRoomList?cityCode=hz',
    params
  )
}

import { http } from '../utils/http'
import { IResultOr as IResult } from './type'

export function fetchRoomList (): Promise<IResult> {
  return http.httpRequestGet(
    'http://110.42.184.111/api/room/room/getRoomList?pageNo=1&pageSize=3',
    {}
  )
}

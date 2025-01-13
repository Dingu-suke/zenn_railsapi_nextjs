import axios, { AxiosResponse, AxiosError } from 'axios'

export const fetcher = (url: string) =>
  axios
    .get(url)
    .then((res: AxiosResponse) => res.data)
    .catch((err: AxiosError) => {
      console.log(err.message)
      throw err
    })
// 受け取ったurl に対して GET メソッドのリクエストを送信。
// 返り値として res.data を返し、以上が発生したときはエラー内容をログに出力させる

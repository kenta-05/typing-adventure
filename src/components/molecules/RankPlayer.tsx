import { GameUser } from "@/types/primary"
import React from "react"

interface Props {
  user: GameUser
  index: number
}

function RankPlayer({ user, index }: Props) {
  return (
    <div className="py-2 bg-second border-b border-gray-200">
      <div className="flex justify-between px-1">
        <div className="flex">
          <p>{index + 1}位: </p>
          <p>{user.username}</p>
        </div>
        <p>{user.highscore == 0 ? "未プレイ" : `スコア:${user.highscore}`}</p>
      </div>
      <p>
        {user.monstername === "" ? "「------」" : `「${user.monstername}」`}
        に倒された
      </p>
    </div>
  )
}

export default RankPlayer

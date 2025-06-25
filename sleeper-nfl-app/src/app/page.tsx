"use client"

import axios from "axios";
import { useEffect, useState } from "react"

type Player = {
  full_name: string,
  team: string,
  position: string,
  id_player: string
}

export default function Home() {

  const [player, setPlayer] = useState<Player[]>([]);

  useEffect(() => {
    async function fetchApi() {
      try {
        const req = await axios.get("https://api.sleeper.app/v1/players/nfl")
        const getPlayers = Object.values(req.data) as Player []
        const fifteenPlayers = getPlayers.slice(0,15)
        setPlayer(fifteenPlayers)
      } catch (error) {
        console.error("error to load api", error)
      }
    }
    fetchApi();
  }, [])

  return (
    <>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Position</th>
        </tr>
      </thead>
      <tbody>
        {player.map((e) => (
          <tr key={e.id_player}>
            <td>{e.full_name}</td>
            <td>{e.position}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </>
  )
}
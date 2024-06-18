import { Game } from '../../state/types'
import { Categories, Platforms } from '../../views/Games/components/types'


const games: Game[] = [
    {
      title: 'FORTCAKE',
      subtitle: 'FORTCAKE is a community driven crypto meme coins platform built on the Binance Smart Chain. The goal is simple; introduce the world to BSC MEME COINS.',
      logo: '../../../public/images/coins/FORTCAKE.png',
      cta: 'http://fortcake.io',
      symbol: 'FORTCAKE',
      votes: 0,
      chain: 'BSC',
      address: '',
      category: Categories.ACTION,
      twitter: "https://twitter.com/fortcake",
      discord: `https://discord.com/invite/FAqUbJXzN9`,
      telegram: undefined,
      platform: [
        Platforms.WEB
      ]
    },
    // {
    //   title: 'My Defi Pet',
    //   subtitle: 'My DeFi Pet is a a virtual pet game that combines DeFi, collectibles and your own personality, Revolving around a core loop of engaging gaming activities such as collecting, breeding, evolving, battling with, and trading/socialising for pets.',
    //   logo: 'https://v5.airtableusercontent.com/v3/u/28/28/1713556800000/uuzXhby5Pdlskbdg3_MAAA/2mtBDW1qQysKP90VRJ3tdGHegV6Eb-ASjjanK29pMBhuUZvhNWvIngQQYK8iq4y3XYJVomz6gD_mHboF5mHeEtBlMzmWOs4SqRt0V-VPectyE56057vfp3NOxWi4zhkzGrI0KOC1TbtAc7AZHCwcKQ/aqU2zqnXc_Gl6pHgAYafdjMSCBVTP9rv7ylhDZvWlIE',
    //   cta: 'https://mydefipet.com/',
    //   symbol: 'DPET',
    //   votes: 83,
    //   chain: 'BNB',
    //   address: '0xfb62ae373aca027177d1c18ee0862817f9080d08',
    //   category: Categories.BREEDING,
    //   twitter: `https://twitter.com/MyDeFiPet`,
    //   discord: `https://discord.com/invite/CMYcx5jKwr`,
    //   telegram: undefined,
    //   platform: [
    //     Platforms.WEB
    //   ]
    // },
    // {
    //   title: 'Alien Worlds',
    //   subtitle: 'Find NFTs you can use to connect and play with others. Earn Trilium that gives you power in the Planet Decentralised Autonomous Organizations (Planet DAOs) – where much of the action happens.',
    //   logo: 'https://v5.airtableusercontent.com/v3/u/28/28/1713556800000/QV9Eg3ZqoYvUjEC8DR80cw/obs4VhZ4_6a4doo5Z1InVLTgJtxuHy0Dc59a_K5_MSPq7CDnknZk9q7L8OGle5hzkgRaz8ZD72Y-EC4Yk2eHP0H5R3cOsejEpeJSUcHOJG1I6WIkMV6_Klrib-DXjmKChhGZ8xGrMybtODcJXGA0aA/Do-I-brSUuNTH5JdFKjW4KjYkFpLuXm06HDoIF0od1s',
    //   cta: 'https://alienworlds.io/',
    //   symbol: 'TLM',
    //   votes: 78,
    //   chain: 'BNB',
    //   address: '0x2222227e22102fe3322098e4cbfe18cfebd57c95',
    //   category: Categories.CARDGAME,
    //   twitter: `https://twitter.com/alienworlds`,
    //   discord: `https://discord.com/invite/a4fX84X2Yg`,
    //   telegram: undefined,
    //   platform: [
    //     Platforms.WEB
    //   ]
    // },
    // {
    //   title: 'My Neighbor Alice',
    //   subtitle: 'My Neighbor Alice is a multiplayer builder game, introducing blockchain to millions of players. Anyone can buy and own virtual islands, collect and build exciting items and meet new friends.',
    //   logo: 'https://v5.airtableusercontent.com/v3/u/28/28/1713556800000/Hm4vbYpNjyrLqUYqVcN4wA/Gz3NcvoXl-hJHm3shRfKdj9j1L_AnOTsHBak8XmyiYBncDo2ehgOdKTKGOC6hz_2rAyMvfF0fv9r5YamVSFQYDT8DpEmRDxrQaPHu3lZIE2jLw4pbWnsBtqQqeJej-5Kj3XJQuDU-gFZlVAsEfbm2w/2SiUgivprrDuPe_XKNkP22J32KfDjcdT0rRtKqBFNVE',
    //   cta: 'https://www.myneighboralice.com/',
    //   symbol: 'ALICE',
    //   votes: 74,
    //   chain: 'BNB',
    //   address: '0xac51066d7bec65dc4589368da368b212745d63e8',
    //   category: Categories.SIMULATION,
    //   twitter: `https://twitter.com/MyNeighborAlice/`,
    //   discord: undefined,
    //   telegram: `https://t.me/MyNeighborAlice`,
    //   platform: [
    //     Platforms.WEB
    //   ]
    // },
    // {
    //   title: `Mines of Dalarnia`,
    //   subtitle: `Mines of Dalarnia is an action-adventure game. Players mine and combine various in-game items, improving their skills and gear to unlock the MoD universe's secrets while fighting enemies and searching for rare relics and artifacts.`,
    //   logo: `https://v5.airtableusercontent.com/v3/u/28/28/1713556800000/PaWjkAX4GzoQe5h_mexXsA/S6YhsvAIjwlmvM7ede_z2-PL85zE9JV-3b3BdRahw61kl3R9G0SZzZM2JripiXOdla6jpzXsq6WI9KYHUE-VpbRSkNuVDCZshjHjjd6TD3Z8qtI4jg7ehti8L8HqdsmQEz3x5lhQw7dBH71Y3SX0cA/SM9YZJvCpL97HwNREU5ZrTr5ZcrShUGkTA57iWASU1s`,
    //   cta: `https://www.minesofdalarnia.com/`,
    //   symbol: `DAR`,
    //   votes: 68,
    //   chain: `BNB`,
    //   address: `0x23ce9e926048273ef83be0a3a8ba9cb6d45cd978`,
    //   category: Categories.ACTION,
    //   twitter: `https://twitter.com/MinesOfDalarnia`,
    //   discord: `https://discord.com/invite/dZaVUMy`,
    //   telegram: `https://t.me/MyNeighborAlice`,
    //   platform: [
    //     Platforms.WEB
    //   ]
    // },
    // {
    //   title: `Monsta Infinite`,
    //   subtitle: `Monsta Infinite is a decentralized game universe where anyone can earn tokens through playing the game competitively or for leisure.‌`,
    //}
]

export default games

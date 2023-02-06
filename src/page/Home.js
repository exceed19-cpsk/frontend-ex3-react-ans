import { useEffect, useState } from "react"
import {
  GetPizza,
  GetPasta,
  GetDessert,
  GetDrinks,
  GetSauces,
  GetSides,
} from "../script/Controller"
import Card from "../component/Menucard"
import BCard from "../component/Bigcard"

function Home() {
  const [display, setdisplay] = useState(0)
  const [click, setclick] = useState(-1)
  const changeclick = (id) => {
    setclick(id)
  }
  const [menu, setmenu] = useState()
  const [keyword, setkeyword] = useState("")
  const [ignore, setignore] = useState(false)
  async function fetch() {
    let m = []
    m[0] = await GetPizza()
    m[1] = await GetPasta()
    m[2] = await GetDessert()
    m[3] = await GetDrinks()
    m[4] = await GetSauces()
    m[5] = await GetSides()
    setmenu(m)
  }
  useEffect(() => {
    fetch()
    setignore(true)
  }, [ignore])
  return (
    <div className="home">
      <div className="home-center">
        <div className="home-inp">
          <div className="search">
            <input
              onChange={(e) => {
                setkeyword(e.target.value)
              }}
            ></input>
          </div>
          <div className="home-button">
            <button
              onClick={() => {
                setdisplay(0)
                setclick(false)
              }}
            >
              pizza
            </button>
            <button
              onClick={() => {
                setdisplay(1)
                setclick(false)
              }}
            >
              pasta
            </button>
            <button
              onClick={() => {
                setdisplay(2)
                setclick(false)
              }}
            >
              dessert
            </button>
            <button
              onClick={() => {
                setdisplay(3)
                setclick(false)
              }}
            >
              drinks
            </button>
            <button
              onClick={() => {
                setdisplay(4)
                setclick(false)
              }}
            >
              sauces
            </button>
            <button
              onClick={() => {
                setdisplay(5)
                setclick(false)
              }}
            >
              sides
            </button>
          </div>
        </div>
        <div className="home-menulist">
          {click === -1 && (
            <>
              {menu?.[display]
                ?.filter((me) =>
                  me?.name?.toLowerCase().includes(keyword.toLowerCase())
                )
                .map((m, i) => (
                  <Card
                    name={m?.name}
                    image={m?.image}
                    price={m?.price}
                    vege={m?.vegetarian}
                    spic={m?.spicy}
                    id={m?.id}
                    key={i}
                    changeclick={changeclick}
                  />
                ))}
            </>
          )}
          {click !== -1 && (
            <>
              <BCard
                name={menu?.[display][click]?.name}
                image={menu?.[display][click]?.image}
                price={menu?.[display][click]?.price}
                vege={menu?.[display][click]?.vegetarian}
                spic={menu?.[display][click]?.spicy}
                ing={menu?.[display][click]?.ingredients}
                changeclick={changeclick}
              />
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Home

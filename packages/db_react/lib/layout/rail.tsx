import { Reorder } from "framer-motion"
import React, { useState } from "react"
import { useWorld,classNames } from '../core'

function List() {
  const [items, setItems] = useState([0, 1, 2, 3])
  
  return (
    <Reorder.Group axis="y" values={items} onReorder={setItems}>
      {items.map((item) => (
        <Reorder.Item key={item} value={item}>
          {item}
        </Reorder.Item>
      ))}
    </Reorder.Group>
  )
}

export function Rail() {
    const world = useWorld()
    const onChange = (n: number) => {
        world.update({
            railSelect: n
        })
    }

    const [items,setItems] = useState(world.rail)
  
    return (<nav aria-label="Sidebar" className=" h-screen flex border-r border-gray-200  flex-shrink-0 overflow-y-auto bg-gray-800">
      <div className="flex flex-col flex-shrink-0 w-20 space-y-3 p-3">
      <Reorder.Group axis="y" values={items} onReorder={setItems}>
        {items.map((item, index) => (
            <Reorder.Item key={index} value={item}>
          <a
            onClick={() => onChange(index)}
            key={index}
            className={classNames(
              world.railSelect == index ? 'bg-gray-900 text-white' : 'text-gray-400 hover:bg-gray-700',
              'flex-shrink-0 inline-flex items-center justify-center h-14 w-14 rounded-lg'
            )}
          >
            {item.icon()}
          </a></Reorder.Item>
        ))}
        </Reorder.Group>
      </div>
  
    </nav>)
  }

  export function RailOld({ value, onChange }: {
    value: number,
    onChange: (x: number) => void
  }) {
    const world = useWorld()
  
    return (<nav aria-label="Sidebar" className=" h-screen flex border-r border-gray-200  flex-shrink-0 overflow-y-auto bg-gray-800">
      <div className="flex flex-col flex-shrink-0 w-20 space-y-3 p-3">
        {world.rail.map((item, index) => (
  
          <a
            onClick={() => onChange(index)}
            key={index}
            className={classNames(
              value == index ? 'bg-gray-900 text-white' : 'text-gray-400 hover:bg-gray-700',
              'flex-shrink-0 inline-flex items-center justify-center h-14 w-14 rounded-lg'
            )}
          >
            {world.rail[index].icon()}
          </a>
        ))}
      </div>
  
    </nav>)
  }


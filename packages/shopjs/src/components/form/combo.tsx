
import React, { useState } from 'react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { Combobox } from '@headlessui/react'
import { LabeledId } from '../lib'



function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}



export function Combo(props: React.PropsWithChildren<{
  items: LabeledId[]
  value: LabeledId
  onChange: (x: LabeledId) => void
}>) {

  console.log(props)
  const [query, setQuery] = useState('')
  //const [selected, setSelected] = useState(props.value)

  const filtered =
    query === ''
      ? props.items
      : props.items.filter((item) => {
        return item.label.toLowerCase().includes(query.toLowerCase())
      })
  console.log(query, props.value, filtered)

  return (<div className='items-center flex flex-row mx-4 my-4'>
    <div className='flex-1 '>{props.children}</div>
    <Combobox as="div" value={props.value} onChange={props.onChange} className='bg-gray-900 text-white'>
      <div className="relative mt-1">
        <Combobox.Input
          className="w-full bg-gray-900 rounded-md border border-gray-300  py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
          onChange={(event) => setQuery(event.target.value)}
          displayValue={(x: LabeledId) => x.label}
        />
        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </Combobox.Button>

        {filtered.length > 0 && (
          <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md  py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {filtered.map((item) => (
              <Combobox.Option
                key={item.id}
                value={item}
                className={({ active }) =>
                  classNames(
                    'relative cursor-default select-none py-2 pl-3 pr-9',
                    active ? ' text-white' : 'text-gray-400'
                  )
                }
              >
                {({ active, selected }) => (
                  <>
                    <span className={classNames('block truncate', selected ? 'font-semibold' : '')}>{item.label}</span>

                    {selected && (
                      <span
                        className={classNames(
                          'absolute inset-y-0 right-0 flex items-center pr-4',
                          active ? 'text-white' : 'text-indigo-600'
                        )}
                      >
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    )}
                  </>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        )}
      </div>
    </Combobox>
  </div>)
}

import React, { useState } from 'react'
import { CheckIcon, ChevronUpDownIcon, Bars3Icon, MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { Combobox } from '@headlessui/react'
import { faker } from '@faker-js/faker'

import { } from '../../db/lib'

interface Person {
  id: number,
  name: string
}
const people = [
  { id: 1, name: 'Leslie Alexander' },
  // More users...
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export function FloatingSearch() {
  return (<div className='h-screen'>
    <FloatingSearchHeader />
    <SearchList />
  </div>)
}

export function FloatingSearchHeader() {

  return (<div className="bg-white shadow sm:rounded-lg fixed z-50 m-4">
    <div className='flex items-center' >
      <button className='h-6 w-6 m-2'><Bars3Icon /></button> <SearchComplete />
    </div>
  </div>)

}

export function SearchComplete() {
  const [query, setQuery] = useState('')
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null)

  const filteredPeople =
    query === ''
      ? people
      : people.filter((person) => {
        return person.name.toLowerCase().includes(query.toLowerCase())
      })

  return (
    <Combobox as="div" value={selectedPerson} onChange={setSelectedPerson}>
      <div className="relative mt-1">
        <Combobox.Input
          className="w-full rounded-md outline-none bg-white py-2 pl-3 pr-10  focus:ring-transparent sm:text-sm"
          onChange={(event) => setQuery(event.target.value)}
          displayValue={(person: Person) => person?.name}
          placeholder="Search for provider"
        />
        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          <MagnifyingGlassIcon className="h-6 w-6 text-gray-800" aria-hidden="true" />
        </Combobox.Button>

        {filteredPeople.length > 0 && (
          <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {filteredPeople.map((person) => (
              <Combobox.Option
                key={person.id}
                value={person}
                className={({ active }) =>
                  classNames(
                    'relative cursor-default select-none py-2 pl-3 pr-9',
                    active ? 'bg-indigo-600 text-white' : 'text-gray-900'
                  )
                }
              >
                {({ active, selected }) => (
                  <>
                    <span className={classNames('block truncate', selected ? 'font-semibold' : '')}>{person.name}</span>

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
  )
}


// a list of cards using scroller?
function SearchList() {
  return (
    <div></div>
  )
}



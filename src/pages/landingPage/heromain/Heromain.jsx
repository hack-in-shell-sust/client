import React, { useState } from 'react'

import './Heromain.css';
import { Check, ChevronsUpDown } from "lucide-react"
 
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const frameworks = [
    {
      value: "next.js",
      label: "Next.js",
    },
    {
      value: "sveltekit",
      label: "SvelteKit",
    },
    {
      value: "nuxt.js",
      label: "Nuxt.js",
    },
    {
      value: "remix",
      label: "Remix",
    },
    {
      value: "astro",
      label: "Astro",
    },
  ]

const Heromain = () => {
    const [searchText, setSearchText] = useState('');
    const [searchFilter, setSearchFilter] = useState('Medicine');
    const handleSearchFilterChange = (e) => {
        setSearchFilter(e.target.value);
      };

    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("")

  return (
    <div className='heromain_background'>
        <div className='heromain'>
            <div className='heromain_mainBox'>
                <div className='heromain_textBox'>
                    <h1>Search your symptoms</h1>
                    <h2>Choose your nearest specialist</h2>
                </div>
                <div className='heromain_imageBox'>
                    <img src="/heromain/people_search.png"/>
                </div>
            </div>
        </div>
        <div className='heromain_inputBox'>
            {(searchFilter === 'Medicine' || searchFilter === 'Doctor')?
                <div className='heromain_inputBoxSeachText'>
                <Popover open={open} onOpenChange={setOpen} className="w-full h-full">
                    <PopoverTrigger asChild >
                        <Button
                        variant="ghost"
                        role="combobox"
                        aria-expanded={open}
                        className="w-[100%] h-[100%] justify-between"
                        >
                        {value
                            ? frameworks.find((framework) => framework.value === value)?.label
                            : `Select a ${searchFilter}`}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                        <Command>
                        <CommandInput placeholder={`Select a ${searchFilter}`} />
                        <CommandEmpty>No framework found.</CommandEmpty>
                        <CommandGroup>
                            {frameworks.map((framework) => (
                            <CommandItem
                                key={framework.value}
                                value={framework.value}
                                onSelect={(currentValue) => {
                                setValue(currentValue === value ? "" : currentValue)
                                setOpen(false)
                                }}
                            >
                                <Check
                                className={cn(
                                    "mr-2 h-4 w-4",
                                    value === framework.value ? "opacity-100" : "opacity-0"
                                )}
                                />
                                {framework.label}
                            </CommandItem>
                            ))}
                        </CommandGroup>
                        </Command>
                    </PopoverContent>
                </Popover>
                </div>
                :
                <textarea
                    placeholder={`Insert ${searchFilter}`}
                    value={searchText}
                    onChange={(event) => { setSearchText(event.target.value); }}
                    className='heromain_inputBoxSeachText'
                />
            }
            <select value={searchFilter} onChange={handleSearchFilterChange} className='heromain_inputBoxSeachFilter'>
                <option value="Medicine">Medicine</option>
                <option value="Doctor">Doctor</option>
                <option value="Symptoms">Symptoms</option>
                <option value="Disease">Disease</option>
            </select>
        </div>
    </div>
  )
}

export default Heromain
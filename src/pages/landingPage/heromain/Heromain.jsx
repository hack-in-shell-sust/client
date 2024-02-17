import React, { useState, useEffect } from 'react'

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
import axios from 'axios';


const Heromain = () => {
    //search text
    const [searchText, setSearchText] = useState('');
    const [searchFilter, setSearchFilter] = useState('Medicine');
    const handleSearchFilterChange = (e) => {
        setSearchFilter(e.target.value);
      };

    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("")


    //get list of doctor and medicine
    const [allDoctor, setAllDoctor] = useState('');
    const [allMedicine, setAllMedicine] = useState('');
    
    const getDoctors = async () => { 
        const apipath = 'http://192.168.238.113:8085/api/doctor/list'
        try{
            const response = await axios.get(apipath); 
            console.log(response.data);
            const formattedData = response.data.map(doctor => ({
                value: doctor.name,
                label: doctor.name,
                id: doctor.id
            }));
            setAllDoctor(formattedData);
        } catch (error) {
            console.error("Error getting doctors:", error);
            if (error.response) {
              console.error("Response data:", error.response.data);
            }
        }    
    }

    const getMedicine = async () => { 
        const apipath = 'http://192.168.238.113:8085/api/medicine/list'
        try{
            const response = await axios.get(apipath); 
            console.log(response.data);
            const formattedData = response.data.map(doctor => ({
                value: doctor.name,
                label: doctor.name,
                id: doctor.id
            }));
            setAllMedicine(formattedData);
        } catch (error) {
            console.error("Error getting doctors:", error);
            if (error.response) {
              console.error("Response data:", error.response.data);
            }
        }    
    }

    useEffect(() => {
        if(searchFilter == 'Doctor')getDoctors();
        // else if(searchFilter == 'Medicine')getMedicine();
    }, [searchFilter]);

  return (
    <div className='heromain_background'>
        <div className='heromain'>
            <div className='heromain_mainBox'>
                <div className='heromain_textBox'
                    data-aos="fade-left" data-aos-delay="200" data-aos-anchor-placement="center-bottom"
                >
                    <h1>Search your symptoms</h1>
                    <h2>Choose your nearest specialist</h2>
                </div>
                <div className='heromain_imageBox'
                    data-aos="fade-right" data-aos-delay="200" data-aos-anchor-placement="center-bottom"
                >
                    <img src="/heromain/people_search.png"/>
                </div>
            </div>
        </div>
        <div className='heromain_inputBox'
            data-aos="fade-up" data-aos-delay="200" data-aos-anchor-placement="center-bottom"
        >
            {(searchFilter === 'Doctor')?
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
                            ? allDoctor.find((framework) => framework.value === value)?.label
                            : `Select a ${searchFilter}`}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                        <Command>
                        <CommandInput placeholder={`Select a ${searchFilter}`} />
                        <CommandEmpty>No framework found.</CommandEmpty>
                        <CommandGroup>
                            {allDoctor && allDoctor.map((framework) => (
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
                (searchFilter === 'Medicine')?
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
                            ? allMedicine.find((framework) => framework.value === value)?.label
                            : `Select a ${searchFilter}`}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                        <Command>
                        <CommandInput placeholder={`Select a ${searchFilter}`} />
                        <CommandEmpty>No framework found.</CommandEmpty>
                        <CommandGroup>
                            {allMedicine && allMedicine.map((framework) => (
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
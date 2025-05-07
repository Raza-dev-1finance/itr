import { useEffect, useRef, useState } from "react";
import "./index.css";
type DropdownProps = {
    cls?: string,
    options: string[],
    placeholder?: string,
    onInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
    handleOptionClick: (s: string) => void,
    handleInputBlur?: () => void
    value: string
}
export default function Dropdown({ cls, options, placeholder, onInputChange, value, handleOptionClick, handleInputBlur }: DropdownProps) {
    const [open, setOpen] = useState<boolean>(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);
    const inputRef = useRef(null);

    function handleInputFocus(e: React.FocusEvent<HTMLInputElement>) {
        setOpen(true)
    }

    useEffect(() => {
        if (open) {
            function handleClickOutside(event: MouseEvent) {
                if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                    setOpen(false);
                }
            }

            document.addEventListener("click", handleClickOutside);
            return () => {
                document.removeEventListener("click", handleClickOutside);
            };
        }
    }, [open])
    function handleBlur() {
        if(open) {
            setTimeout(() => setOpen(false), 100)
        }
        if(handleInputBlur) {
            setTimeout(() => handleInputBlur(), 100)
        }
    }
    return (
        <div ref={dropdownRef} className={`${cls} Custom-DropDownMainContainer`}>
            <div className="flex DropDownInput">
                <input onBlur={handleBlur} onFocus={handleInputFocus} onChange={onInputChange} ref={inputRef} value={value} className="w-full" placeholder={placeholder || "Select an option"} />
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 12.2307C9.89957 12.2307 9.80609 12.2147 9.71956 12.1827C9.63302 12.1506 9.55076 12.0956 9.47277 12.0176L5.72758 8.2724C5.61219 8.15703 5.55317 8.012 5.5505 7.83732C5.54782 7.66266 5.60685 7.51496 5.72758 7.39424C5.84831 7.2735 5.99467 7.21313 6.16667 7.21313C6.33867 7.21313 6.48503 7.2735 6.60575 7.39424L10 10.7885L13.3943 7.39424C13.5096 7.27885 13.6547 7.21982 13.8293 7.21716C14.004 7.21447 14.1517 7.2735 14.2724 7.39424C14.3932 7.51496 14.4535 7.66132 14.4535 7.83332C14.4535 8.00532 14.3932 8.15168 14.2724 8.2724L10.5272 12.0176C10.4492 12.0956 10.367 12.1506 10.2804 12.1827C10.1939 12.2147 10.1004 12.2307 10 12.2307Z" fill="#0A0A0A" />
                </svg>
            </div>
            {
                open ? (
                    <div style={{ boxShadow: '0px 2px 8px 0px rgba(0, 0, 0, 0.02)' }} className='w-full overflow-x-scroll max-h-[250px] absolute top-[55px] border-[1px] border-[#61625E] bg-white rounded-b-[2px] z-30 DropDownCustomScroll'>
                        {options.map((state, index) => (
                            <>
                                <div
                                    key={index}
                                    className='flex py-[12px] px-[16px] cursor-pointer text-[#171717] font-["Fira Sans"] text-[14px] font-normal leading-5 over hover:bg-[#ededea]'
                                    onClick={() => {handleOptionClick(state); setOpen(false)}}
                                >
                                    {state}
                                </div>
                            </>
                        ))}
                    </div>
                ) : null
            }
        </div>
    )
}
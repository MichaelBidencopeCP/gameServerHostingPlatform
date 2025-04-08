import TextInput from "./textInput";

const noSpinnerClass = `
[appearance:textfield] 
[&::-webkit-outer-spin-button]:appearance-none 
[&::-webkit-inner-spin-button]:appearance-none
`;

export default function NumberInput({label, value, onChange, step=1 }:Readonly<{label:string, value:number, onChange: (value:any) => void, step?:number}>){

    return(
        <TextInput label={label} value={value} step={step} onChange={onChange} type="number" className={"[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"}/>
    )
}
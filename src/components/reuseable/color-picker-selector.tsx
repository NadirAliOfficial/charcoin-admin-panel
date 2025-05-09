import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import ColorPicker from 'react-best-gradient-color-picker';

interface ColorPickerPopoverProps extends React.HTMLAttributes<HTMLDivElement> {
    color: string;
    setColor: React.Dispatch<React.SetStateAction<string>>;
}

const ColorPickerPopover = ({ color, setColor, className }: ColorPickerPopoverProps) => {
    return (
        <Popover  >
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    className={cn("w-full bg-gray-800 border-gray-700 text-white", className)}
                    style={{ background: color }}
                >
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full shadow-xl" side="left">
                <ColorPicker
                    value={color}
                    onChange={setColor}
                    hideColorTypeBtns
                    
                    hideControls
                />
            </PopoverContent>
        </Popover>
    );
};

export default ColorPickerPopover;

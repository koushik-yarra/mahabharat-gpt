"use client";
import { ZoomIn, ZoomOut,Baseline } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTextSize } from "@/hooks/use-text-size";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function TextSizeSelector() {
  const { increaseTextSize, decreaseTextSize, setTextSize } = useTextSize();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="w-9 h-9">
          <Baseline className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Adjust text size</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={decreaseTextSize}>
          <ZoomOut className="mr-2 h-4 w-4" />
          Smaller
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTextSize('text-base')}>
           <Baseline className="mr-2 h-4 w-4" />
          Default
        </DropdownMenuItem>
        <DropdownMenuItem onClick={increaseTextSize}>
          <ZoomIn className="mr-2 h-4 w-4" />
          Larger
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

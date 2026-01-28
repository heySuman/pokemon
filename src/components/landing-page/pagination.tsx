import { Field, FieldLabel } from "@/components/ui/field"
import {
    Pagination,
    PaginationContent,
    PaginationItem,
} from "@/components/ui/pagination"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from "../ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface PaginationProps {
    setRows: (rows: number) => void,
    handlePrevious: () => void,
    handleNext: () => void,
    offset: number
}

export function PaginationCustom({ setRows, handleNext, handlePrevious, offset }: PaginationProps) {
    return (
        <div className="flex items-center justify-center gap-4">
            <Field orientation="horizontal" className="w-fit">
                <FieldLabel htmlFor="select-rows-per-page">Rows per page</FieldLabel>
                <Select defaultValue="10" onValueChange={(val) => setRows(Number(val))}>
                    <SelectTrigger className="w-20" id="select-rows-per-page">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent align="start">
                        <SelectGroup>
                            <SelectItem value="10">10</SelectItem>
                            <SelectItem value="25">25</SelectItem>
                            <SelectItem value="50">50</SelectItem>
                            <SelectItem value="100">100</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </Field>
            <Pagination className="mx-0 w-auto">
                <PaginationContent>
                    <PaginationItem>
                        <Button onClick={handlePrevious} variant={'secondary'} disabled={offset === 0}>
                            <ChevronLeft />
                            Previous
                        </Button>
                    </PaginationItem>
                    <PaginationItem>
                        <Button onClick={handleNext} variant={'secondary'}>
                            Next
                            <ChevronRight />
                        </Button>
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div >
    )
}

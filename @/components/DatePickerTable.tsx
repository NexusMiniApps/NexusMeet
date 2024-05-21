import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Cross1Icon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";

interface DatePickerTableProps {
  selectedDates: Date[];
  handleCancel: (dateToRemove: Date) => void;
  clearError: () => void;
}

const DatePickerTable: React.FC<DatePickerTableProps> = ({
  selectedDates,
  handleCancel,
  clearError,
}) => {
  return (
    <Table className="mx-auto mb-4 w-full max-w-72 text-center">
      <TableBody className="items-center justify-center">
        {selectedDates.length > 0 ? (
          [...selectedDates]
            .sort((a, b) => a.getTime() - b.getTime())
            .map((date, index) => (
              <TableRow
                key={index}
                className="flex h-14 items-center justify-between"
              >
                <TableCell className="flex-1 font-medium">
                  {date.toLocaleString("en-US", { weekday: "short" })}
                </TableCell>
                <TableCell className="flex-1">
                  {date.toLocaleDateString("en-US", {
                    month: "short",
                    day: "2-digit",
                  })}
                </TableCell>
                <TableCell className="flex flex-1 justify-end">
                  <Button
                    className="h-8 w-8"
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      handleCancel(date);
                      clearError();
                    }}
                  >
                    <Cross1Icon className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
        ) : (
          <TableRow>
            <TableCell colSpan={3} className="text-md">
              No dates selected
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default DatePickerTable;

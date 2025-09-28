import { Metadata } from 'next';
import React from 'react';
import { Card, CardContent, CardFooter } from '../ui/components/cards';
import { Button } from '../ui/components/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/components/table';

export const metadata: Metadata = {
  title: 'Attendance',
  description: 'Attendance Page',
};

export const AttendancePage = () => {
  const time = 0;
  const parsedTime = '00:00';

  const attendanceBtnText = () => {
    return 'Entrada';
  };

  return (
    <div className="flex flex-col min-h-full items-center justify-center">
      <Card className="p-4">
        <CardContent className="flex justify-center">
          <span className="text-2xl">{parsedTime}</span>
        </CardContent>
        <CardFooter className="justify-center">
          <Button>{attendanceBtnText()}</Button>
        </CardFooter>
      </Card>

      <Table className="mt-24">
        <TableHeader className="bg-white">
          <TableHead>Head1</TableHead>
          <TableHead>Head2</TableHead>
          <TableHead>Head3</TableHead>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Table cell1</TableCell>
            <TableCell>Table cell2</TableCell>
            <TableCell>Table cell3</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

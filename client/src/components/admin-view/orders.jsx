import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";

const AdminOrdersView = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>All Order</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Order Status</TableHead>
              <TableHead>Order Price</TableHead>
              <TableHead>
                <span className="sr-only">Details</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableCell>12345</TableCell>
            <TableCell>12345</TableCell>
            <TableCell>12345</TableCell>
            <TableCell>12345</TableCell>
            <TableCell>
              <Button>View Details</Button>
            </TableCell>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default AdminOrdersView;

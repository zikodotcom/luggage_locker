import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Globe } from "lucide-react";
import React from "react";

export default function DataTable({
  data,
  fields,
  title,
  description,
  renderDetails,
}) {
  const [expandedRowId, setExpandedRowId] = useState(null);

  const toggleRow = (id) => {
    setExpandedRowId((prev) => (prev === id ? null : id));
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Globe className="h-5 w-5 text-purple-600" />
          {title} ({data.length})
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              {fields.map((field, index) => (
                <TableHead key={index}>{field.label}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length > 0 ? (
              data.map((row) => (
                <React.Fragment key={row.id}>
                  <TableRow>
                    {fields.map((field, index) => (
                      <TableCell key={index}>
                        {field.render ? field.render(row) : row[field.key]}
                      </TableCell>
                    ))}
                    {renderDetails && (
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleRow(row.id)}
                        >
                          {expandedRowId === row.id ? "Hide" : "Details"}
                        </Button>
                      </TableCell>
                    )}
                  </TableRow>

                  {expandedRowId === row.id && renderDetails && (
                    <TableRow>
                      <TableCell colSpan={fields.length + 1}>
                        <div className="bg-gray-50 p-4 rounded-md border text-sm text-gray-700">
                          {renderDetails(row)}
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))
            ) : (
              <TableRow>
                <TableCell className="text-center" colSpan={fields.length + 1}>
                  No data to display
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

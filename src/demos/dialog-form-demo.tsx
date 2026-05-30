import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DialogForm } from "@/components/ui/dialog-form";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export function DialogFormDemo() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-32 items-center justify-center rounded-md border border-dashed border-zinc-200 bg-zinc-50 p-6">
      <Button onClick={() => setOpen(true)}>Open dialog</Button>
      <DialogForm title="Edit invoice" open={open} onOpenChange={setOpen}>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            setOpen(false);
          }}
        >
          <FieldGroup>
            <FieldSet>
              <FieldLegend>Invoice Details</FieldLegend>
              <FieldDescription>
                Update the invoice metadata, customer, and payment timeline.
              </FieldDescription>
              <FieldGroup>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field>
                    <FieldLabel htmlFor="dialog-invoice-number">
                      Invoice Number
                    </FieldLabel>
                    <Input
                      id="dialog-invoice-number"
                      name="invoiceNumber"
                      defaultValue="INV-2026-0042"
                      required
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="dialog-invoice-status">
                      Status
                    </FieldLabel>
                    <Select name="status" defaultValue="sent">
                      <SelectTrigger
                        id="dialog-invoice-status"
                        className="w-full"
                      >
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="draft">Draft</SelectItem>
                          <SelectItem value="sent">Sent</SelectItem>
                          <SelectItem value="paid">Paid</SelectItem>
                          <SelectItem value="overdue">Overdue</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </Field>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field>
                    <FieldLabel htmlFor="dialog-issue-date">
                      Issue Date
                    </FieldLabel>
                    <Input
                      id="dialog-issue-date"
                      name="issueDate"
                      type="date"
                      defaultValue="2026-05-31"
                      required
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="dialog-due-date">Due Date</FieldLabel>
                    <Input
                      id="dialog-due-date"
                      name="dueDate"
                      type="date"
                      defaultValue="2026-06-30"
                      required
                    />
                  </Field>
                </div>
                <Field>
                  <FieldLabel htmlFor="dialog-client-name">
                    Client Name
                  </FieldLabel>
                  <Input
                    id="dialog-client-name"
                    name="clientName"
                    defaultValue="Acme Industries"
                    required
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="dialog-client-email">
                    Client Email
                  </FieldLabel>
                  <Input
                    id="dialog-client-email"
                    name="clientEmail"
                    type="email"
                    defaultValue="billing@acme.example"
                    required
                  />
                  <FieldDescription>
                    Invoice updates and receipts will be sent to this address.
                  </FieldDescription>
                </Field>
              </FieldGroup>
            </FieldSet>
            <FieldSeparator />
            <FieldSet>
              <FieldLegend>Line Item</FieldLegend>
              <FieldDescription>
                Adjust the billed work and totals for this invoice.
              </FieldDescription>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="dialog-line-description">
                    Description
                  </FieldLabel>
                  <Input
                    id="dialog-line-description"
                    name="lineDescription"
                    defaultValue="Design system implementation"
                    required
                  />
                </Field>
                <div className="grid gap-4 sm:grid-cols-3">
                  <Field>
                    <FieldLabel htmlFor="dialog-line-quantity">
                      Quantity
                    </FieldLabel>
                    <Input
                      id="dialog-line-quantity"
                      name="quantity"
                      type="number"
                      min="1"
                      defaultValue="32"
                      required
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="dialog-line-rate">Rate</FieldLabel>
                    <Input
                      id="dialog-line-rate"
                      name="rate"
                      type="number"
                      min="0"
                      step="0.01"
                      defaultValue="125.00"
                      required
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="dialog-tax-rate">Tax</FieldLabel>
                    <Select name="taxRate" defaultValue="8">
                      <SelectTrigger id="dialog-tax-rate" className="w-full">
                        <SelectValue placeholder="Tax" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="0">0%</SelectItem>
                          <SelectItem value="5">5%</SelectItem>
                          <SelectItem value="8">8%</SelectItem>
                          <SelectItem value="10">10%</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </Field>
                </div>
                <Field>
                  <FieldLabel htmlFor="dialog-invoice-notes">Notes</FieldLabel>
                  <Textarea
                    id="dialog-invoice-notes"
                    name="notes"
                    defaultValue="Payment is due within 30 days. Thank you for your business."
                    className="resize-none"
                  />
                </Field>
                <Field orientation="horizontal">
                  <Checkbox id="dialog-send-reminder" name="sendReminder" />
                  <FieldLabel
                    htmlFor="dialog-send-reminder"
                    className="font-normal"
                  >
                    Send a payment reminder 3 days before the due date
                  </FieldLabel>
                </Field>
              </FieldGroup>
            </FieldSet>
            <Field orientation="horizontal" className="justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Save invoice</Button>
            </Field>
          </FieldGroup>
        </form>
      </DialogForm>
    </div>
  );
}

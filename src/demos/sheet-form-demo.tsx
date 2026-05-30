import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import { SheetForm } from "@/components/ui/sheet-form";
import { Textarea } from "@/components/ui/textarea";

export function SheetFormDemo() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-32 items-center justify-center rounded-md border border-dashed border-zinc-200 bg-zinc-50 p-6">
      <Button onClick={() => setOpen(true)}>Open sheet</Button>
      <SheetForm title="Create invoice" open={open} onOpenChange={setOpen}>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            setOpen(false);
          }}
        >
          <FieldGroup>
            <FieldSet>
              <FieldLegend>Customer</FieldLegend>
              <FieldDescription>
                Add the billing contact and delivery details for the invoice.
              </FieldDescription>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="sheet-customer-company">
                    Company Name
                  </FieldLabel>
                  <Input
                    id="sheet-customer-company"
                    name="company"
                    placeholder="Acme Industries"
                    required
                  />
                </Field>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field>
                    <FieldLabel htmlFor="sheet-contact-name">
                      Contact Name
                    </FieldLabel>
                    <Input
                      id="sheet-contact-name"
                      name="contactName"
                      placeholder="Jane Doe"
                      required
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="sheet-contact-email">
                      Contact Email
                    </FieldLabel>
                    <Input
                      id="sheet-contact-email"
                      name="contactEmail"
                      type="email"
                      placeholder="billing@example.com"
                      required
                    />
                  </Field>
                </div>
                <Field>
                  <FieldLabel htmlFor="sheet-billing-address">
                    Billing Address
                  </FieldLabel>
                  <Textarea
                    id="sheet-billing-address"
                    name="billingAddress"
                    placeholder="123 Market St, Suite 400, San Francisco, CA"
                    className="resize-none"
                  />
                </Field>
              </FieldGroup>
            </FieldSet>
            <FieldSeparator />
            <FieldSet>
              <FieldLegend>Invoice</FieldLegend>
              <FieldDescription>
                Configure the invoice number, terms, and amount before sending.
              </FieldDescription>
              <FieldGroup>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field>
                    <FieldLabel htmlFor="sheet-invoice-number">
                      Invoice Number
                    </FieldLabel>
                    <Input
                      id="sheet-invoice-number"
                      name="invoiceNumber"
                      placeholder="INV-2026-0043"
                      required
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="sheet-payment-terms">
                      Payment Terms
                    </FieldLabel>
                    <Select name="paymentTerms" defaultValue="net-30">
                      <SelectTrigger
                        id="sheet-payment-terms"
                        className="w-full"
                      >
                        <SelectValue placeholder="Select terms" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="due-on-receipt">
                            Due on receipt
                          </SelectItem>
                          <SelectItem value="net-15">Net 15</SelectItem>
                          <SelectItem value="net-30">Net 30</SelectItem>
                          <SelectItem value="net-60">Net 60</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </Field>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field>
                    <FieldLabel htmlFor="sheet-issue-date">
                      Issue Date
                    </FieldLabel>
                    <Input
                      id="sheet-issue-date"
                      name="issueDate"
                      type="date"
                      required
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="sheet-due-date">Due Date</FieldLabel>
                    <Input
                      id="sheet-due-date"
                      name="dueDate"
                      type="date"
                      required
                    />
                  </Field>
                </div>
                <Field>
                  <FieldLabel htmlFor="sheet-line-description">
                    Line Item
                  </FieldLabel>
                  <Input
                    id="sheet-line-description"
                    name="lineDescription"
                    placeholder="Monthly platform subscription"
                    required
                  />
                </Field>
                <div className="grid gap-4 sm:grid-cols-3">
                  <Field>
                    <FieldLabel htmlFor="sheet-quantity">Quantity</FieldLabel>
                    <Input
                      id="sheet-quantity"
                      name="quantity"
                      type="number"
                      min="1"
                      placeholder="1"
                      required
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="sheet-unit-price">
                      Unit Price
                    </FieldLabel>
                    <Input
                      id="sheet-unit-price"
                      name="unitPrice"
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="299.00"
                      required
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="sheet-discount">Discount</FieldLabel>
                    <Select name="discount" defaultValue="none">
                      <SelectTrigger id="sheet-discount" className="w-full">
                        <SelectValue placeholder="Discount" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="none">None</SelectItem>
                          <SelectItem value="5">5%</SelectItem>
                          <SelectItem value="10">10%</SelectItem>
                          <SelectItem value="15">15%</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </Field>
                </div>
                <Field orientation="horizontal">
                  <Checkbox id="sheet-email-invoice" name="emailInvoice" />
                  <FieldLabel
                    htmlFor="sheet-email-invoice"
                    className="font-normal"
                  >
                    Email this invoice to the customer after creating it
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
              <Button type="submit">Create invoice</Button>
            </Field>
          </FieldGroup>
        </form>
      </SheetForm>
    </div>
  );
}

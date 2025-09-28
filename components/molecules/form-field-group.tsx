import { FormInput } from "@/components/atoms/form-input"
import { FormSelect } from "@/components/atoms/form-select"
import { PasswordField } from "@/components/molecules/password-field"
import { EmailField } from "@/components/molecules/email-field"

interface FormFieldGroupProps {
  fields: Array<{
    id: string
    label: string
    type?: string
    placeholder?: string
    required?: boolean
    options?: { value: string; label: string }[]
  }>
  onPasswordValidationChange?: (isValid: boolean) => void
  onEmailValidationChange?: (isValid: boolean) => void
}

export function FormFieldGroup({ fields, onPasswordValidationChange, onEmailValidationChange }: FormFieldGroupProps) {
  return (
    <div className="space-y-4">
      {fields.map((field) => (
        <div key={field.id}>
          {field.options ? (
            <FormSelect
              id={field.id}
              label={field.label}
              placeholder={field.placeholder}
              required={field.required}
              options={field.options}
            />
          ) : field.type === "password" ? (
            <PasswordField
              id={field.id}
              label={field.label}
              placeholder={field.placeholder}
              required={field.required}
              onValidationChange={onPasswordValidationChange}
            />
          ) : field.type === "email" ? (
            <EmailField
              id={field.id}
              label={field.label}
              placeholder={field.placeholder}
              required={field.required}
              onValidationChange={onEmailValidationChange}
            />
          ) : (
            <FormInput
              id={field.id}
              label={field.label}
              type={field.type}
              placeholder={field.placeholder}
              required={field.required}
            />
          )}
        </div>
      ))}
    </div>
  )
}

// with a form control a server actions
import {
  type DetailedHTMLProps,
  type FormHTMLAttributes,
  forwardRef,
  useImperativeHandle,
  useRef
} from 'react'

export const ClientFormAction = forwardRef(
  (
    props: DetailedHTMLProps<
      FormHTMLAttributes<HTMLFormElement>,
      HTMLFormElement
    >,
    ref
  ) => {
    const buttonRef = useRef<HTMLButtonElement>(null)
    useImperativeHandle(ref, () => ({
      server: () => buttonRef.current!.click()
    }))
    return (
      <form {...props} className="opacity-0 fixed top-[300vh] left-[300vw]">
        <button type="submit" ref={buttonRef}>
          submit
        </button>
      </form>
    )
  }
)

ClientFormAction.displayName = 'ClientFormAction'
